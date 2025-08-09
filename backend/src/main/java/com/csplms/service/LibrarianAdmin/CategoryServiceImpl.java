package com.csplms.service.LibrarianAdmin;

import com.csplms.dto.responseDto.AvailableCategoryResponse;
import com.csplms.dto.responseDto.CategoryDto;
import com.csplms.dto.responseDto.CategoryShelfResponse;
import com.csplms.entity.Book;
import com.csplms.entity.Shelf;
import com.csplms.entity.Category;
import com.csplms.entity.User;
import com.csplms.exception.UniqueKeyViolationException;
import com.csplms.mapper.CategoryMapper;
import com.csplms.repository.BookRepository;
import com.csplms.repository.ShelfRepository;
import com.csplms.repository.UserRepository;
import com.csplms.util.GetAuthUserUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import com.csplms.repository.CategoryRepository;
import com.csplms.dto.requestDto.CategoryRequestDto;
import com.csplms.dto.responseDto.CategoryResponseDto;
import com.csplms.exception.ResourceListNotFoundException;
import com.csplms.exception.ResourceEntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    private final BookRepository bookRepository;
    private final ShelfRepository shelfRepository;
    private final GetAuthUserUtil getAuthUserUtil;
    private final UserRepository userRepository;
    private static final Logger logger = LoggerFactory.getLogger(CategoryServiceImpl.class);

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository, CategoryMapper categoryMapper, BookRepository bookRepository, ShelfRepository shelfRepository, GetAuthUserUtil getAuthUserUtil, UserRepository userRepository) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
        this.bookRepository = bookRepository;
        this.shelfRepository = shelfRepository;
        this.getAuthUserUtil = getAuthUserUtil;
        this.userRepository = userRepository;
    }

    @Override
    public CategoryResponseDto addCategory(CategoryRequestDto categoryRequestDto) {
        try {
//            Get the staff email
            String currentUser = getAuthUserUtil.getAuthUser();

//            Get the staff full object
            User user = userRepository.findUserByEmail(currentUser).orElseThrow(() -> new ResourceEntityNotFoundException("User", "Id", 0));

            Category category = categoryMapper.toCategory(categoryRequestDto, user);
            category = categoryRepository.save(category);

            return categoryMapper.toCategoryResponseDto(category);
        } catch (Exception ex) {
            if (ex instanceof DataIntegrityViolationException dive
                    && dive.getCause().toString().contains("uk_categories_name")) {
                throw new UniqueKeyViolationException("Name already used: "+ categoryRequestDto.name());
            }
            throw ex;
        }
    }

    @Override
    public CategoryDto getCategory(int categoryId) {
        Category category = this.categoryRepository.findById(categoryId).orElseThrow(() -> new ResourceEntityNotFoundException("Book", "Id", categoryId));

        if (category != null){
            return new CategoryDto(
                    category.getCategoryId(),
                    category.getName(),
                    category.getStartingNumber(),
                    category.getEndingNumber(),
                    category.getDescription(),
                    category.getAddedDate(),
                    category.isPresent(),

                    category.getAddedBy() != null ? category.getAddedBy().getUserId() : null,
                    category.getAddedBy() != null ? category.getAddedBy().getName() : null
            );
        }
        return null;
    }

    @Override
    public Category updateCategory(int categoryId, CategoryRequestDto categoryRequestDto) {
        try {
            Category category = this.categoryRepository.findById(categoryId).orElseThrow(() -> new ResourceEntityNotFoundException("Book", "Id", categoryId));
            if (!category.isPresent()){
                throw new ResourceEntityNotFoundException("Book", "Id", categoryId);
            }
            category = categoryRepository.save(categoryMapper.toUpdateCategory(categoryRequestDto, category));
            categoryRepository.flush();
            return category;
        } catch (Exception ex) {
            if (ex instanceof DataIntegrityViolationException dive
                    && dive.getCause().toString().contains("uk_categories_name")) {
                throw new UniqueKeyViolationException("Name already used: " + categoryRequestDto.name());
            }
            throw ex;
        }
    }

    // Get all the available categories and shelfs according to category for add book
    @Override
    public List<AvailableCategoryResponse> getAllCategoriesAndShelfs() {
        List<Category> categories = this.categoryRepository.getAllAvailableCategories();
        if (categories.isEmpty()) {
            throw new ResourceListNotFoundException("Categories");
        }

        return categories.stream().map(category -> {
            // Fetch shelves according to category
            List<Shelf> shelves = shelfRepository.selectAllByCategoryId(category.getCategoryId());

            // Map shelves to DTO
            List<CategoryShelfResponse> shelfDTOs = shelves.stream()
                    .map(CategoryShelfResponse::new)
                    .collect(Collectors.toList());

            return new AvailableCategoryResponse(
                    category.getCategoryId(),
                    category.getName(),
                    category.getStartingNumber(),
                    category.getEndingNumber(),
                    category.getDescription(),
                    category.getAddedDate(),
                    category.isPresent(),
                    shelfDTOs
            );
        }).collect(Collectors.toList());
    }

    // Get all available categories to filter books according to category on user side
    @Override
    public List<CategoryResponseDto> getAllAvailableCategories() {
        List<Category> categories = this.categoryRepository.getAllAvailableCategories();
        if (categories.isEmpty()) {
            throw new ResourceListNotFoundException("Categories");
        }

        List<CategoryResponseDto> list = new ArrayList<>();
        for (Category category : categories) {
            CategoryResponseDto item = new CategoryResponseDto(
                    category.getCategoryId(),
                    category.getName(),
                    category.getStartingNumber(),
                    category.getEndingNumber(),
                    category.getDescription(),
                    category.getAddedDate(),
                    category.isPresent()
            );
            list.add(item);
        }

        return list;
    }

//    Get all the categories to display on admin panel
@Override
public List<CategoryResponseDto> getCategories() {
        List<Category> categories = this.categoryRepository.getAllCategories();
        if (categories.isEmpty()) {
            throw new ResourceListNotFoundException("Categories");
        }

        List<CategoryResponseDto> list = new ArrayList<>();
        for (Category category : categories){
            CategoryResponseDto item = new CategoryResponseDto(
                    category.getCategoryId(),
                    category.getName(),
                    category.getStartingNumber(),
                    category.getEndingNumber(),
                    category.getDescription(),
                    category.getAddedDate(),
                    category.isPresent()
            );
            list.add(item);
        }
        return list;
    }

    @Transactional
    @Override
    public Integer deleteCategory(int categoryId) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new ResourceEntityNotFoundException("Book", "id", categoryId));
        if(!category.isPresent()){
            throw new ResourceEntityNotFoundException("Category", "id", categoryId);
        }

        List<Book> books = bookRepository.selectAllDeleteCategoryBooksByCategoryId(categoryId);
        if(!books.isEmpty()){
            for (Book book : books) {
                book.setAvailable(false);
                bookRepository.save(book);
            }
        }

        List<Shelf> shelves = shelfRepository.selectAllDeleteCategoryShelfsByCategoryId(categoryId);
        if(!shelves.isEmpty()){
            for (Shelf shelf : shelves) {
                shelf.setPresent(false);
                shelfRepository.save(shelf);
                shelfRepository.flush();

                List<Book> booksOnShelf = bookRepository.selectAllDeleteShelfBooksByShelfId(shelf.getShelfId());
                logger.warn("delete booksOnShelf: {}", booksOnShelf);
                if (!booksOnShelf.isEmpty()) {
                    logger.info("delete booksOnShelf is not empty:");
                    for (Book book : booksOnShelf) {
                        book.setAvailable(false);
                        bookRepository.save(book);
                        bookRepository.flush();
                    }
                }

            }
        }
        category.setPresent(false);
        categoryRepository.save(category);
        return 1;
    }

    @Transactional
    @Override
    public Integer restoreCategory(int categoryId) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new ResourceEntityNotFoundException("Book", "id", categoryId));
        List<Book> books = bookRepository.selectAllRestoreBooksByCategoryId(categoryId);

        if(!books.isEmpty()){
            for (Book book : books) {
                book.setAvailable(true);
                bookRepository.save(book);
            }
        }

        List<Shelf> shelves = shelfRepository.selectAllRestoreShelfsByCategoryId(categoryId);
        if(!shelves.isEmpty()){
            for (Shelf shelf : shelves) {
                shelf.setPresent(true);
                shelfRepository.save(shelf);

                List<Book> booksOnShelf = bookRepository.selectAllRestoreShelfBooksByShelfId(shelf.getShelfId());
                logger.warn("restore booksOnShelf: {}", booksOnShelf);
                if (booksOnShelf != null && !booksOnShelf.isEmpty()) {
                    logger.warn("restore booksOnShelf is not empty:");
                    for (Book book : booksOnShelf) {
                        book.setAvailable(true);
                        bookRepository.save(book);
                        bookRepository.flush();
                    }
                }
            }
        }
        category.setPresent(true);
        categoryRepository.save(category);
        return 1;
    }

}
