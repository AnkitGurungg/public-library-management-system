package com.csplms.service.Admin;

import com.csplms.dto.requestDto.KYCFillUpDto;
import com.csplms.dto.responseDto.AdminUserDto;
import com.csplms.dto.responseDto.EvidenceDto;
import com.csplms.dto.responseDto.UserDto;
import com.csplms.entity.Evidence;
import com.csplms.entity.User;
import com.csplms.exception.MailFailedException;
import com.csplms.exception.ResourceEntityNotFoundException;
import com.csplms.exception.ResourceListNotFoundException;
import com.csplms.helper.SaveEvidencesHelper;
import com.csplms.mapper.LibrarianMapper;
import com.csplms.repository.UserRepository;
import com.csplms.service.Member.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class LibrarianServiceImpl implements LibrarianService {

    private final UserRepository userRepository;
    private final LibrarianMapper librarianMapper;
    private final SaveEvidencesHelper saveEvidences;
    private final EmailService emailService;

    @Autowired
    public LibrarianServiceImpl(
            UserRepository userRepository,
            LibrarianMapper librarianMapper,
            SaveEvidencesHelper saveEvidences,
            EmailService emailService
    ) {
        this.userRepository = userRepository;
        this.librarianMapper = librarianMapper;
        this.saveEvidences = saveEvidences;
        this.emailService = emailService;
    }

    @Transactional(rollbackFor = {MessagingException.class, MailFailedException.class, Exception.class})
    @Override
    public User addLibrarianUser(
            KYCFillUpDto kycFillUpDto,
            MultipartFile librarianUserImage,
            MultipartFile[] evidenceImages
    ) throws MessagingException, MailFailedException {

//        Password for librarian
        final String librarianPassword = UUID.randomUUID().toString();

//        Save librarian on DB
        User librarianUser = this.librarianMapper.toLibrarianUser(kycFillUpDto, librarianPassword);
        librarianUser = this.userRepository.save(librarianUser);
        userRepository.flush();

//        Saves the image and returns the path where evidence is saved
        String librarianUserImagePath = this.saveEvidences.saveUserImageEvidence(librarianUser, librarianUserImage);
        ArrayList<String> librarianUserEvidencesPath = this.saveEvidences.saveUserEvidences(librarianUser, evidenceImages);

        // Save the Evidence on DB
        Evidence evidence = this.saveEvidences.saveUserEvidencesOnDB(librarianUser, librarianUserImagePath, librarianUserEvidencesPath, kycFillUpDto);
        emailService.librarianAddedMailToLibrarian(librarianUser, evidence, librarianPassword);
        emailService.librarianAddedMailToAdmin(librarianUser, evidence);

        return librarianUser;
    }

    @Override
    public List<AdminUserDto> getAllLibrarians() {
        List<User> librarians = userRepository.getAllLibrarians();
        if (librarians.isEmpty()){
            throw new ResourceListNotFoundException("Librarians");
        }

        List<AdminUserDto> dtoList = new ArrayList<>();
        for (User user : librarians){
            AdminUserDto item = new AdminUserDto(
                    user.getUserId(),
                    user.getName(),
                    user.getEmail(),
                    user.getAddress(),
                    user.getAppliedDate(),
                    user.getVerifiedDate(),
                    user.getContactNumber(),
                    user.isVerified(),
                    user.isPresent(),
                    user.isActive()
            );
            dtoList.add(item);
        }

        return dtoList;
    }

    @Override
    public UserDto getLibrarian(int librarianId) {
        User user = this.userRepository.findById(librarianId).orElseThrow(() -> new ResourceEntityNotFoundException("User", "Id", librarianId));

        if (user != null){
            Evidence evidence = user.getEvidence();

            EvidenceDto evidenceDto = null;
            if (evidence != null){
                evidenceDto = new EvidenceDto(
                        evidence.getEvidenceId(),
                        evidence.getUserImage(),
                        evidence.getEvidenceOne(),
                        evidence.getEvidenceTwo(),
                        evidence.getDocumentType(),
                        evidence.getDescription()
                );
            }
            return new UserDto(
                    user.getUserId(),
                    user.getName(),
                    user.getEmail(),
                    user.getAddress(),
                    user.getAppliedDate(),
                    user.getVerifiedDate(),
                    user.getContactNumber(),
                    user.isVerified(),
                    user.isPresent(),
                    user.isActive(),
                    evidenceDto
            );
        }

        return null;
    }

    @Override
    public Integer restoreMember(Integer userId) {
        User user = this.userRepository.findById(userId).orElseThrow(() -> new ResourceEntityNotFoundException("User", "Id", userId));
        if (user.isPresent()){
            throw new ResourceEntityNotFoundException("User", "Id", userId);
        }

        user.setActive(true);
        user.setVerified(true);
        user.setPresent(true);
        userRepository.save(user);
        userRepository.flush();

        return 1;
    }

    @Override
    public Integer deleteLibrarian(Integer userId) {
        User user = this.userRepository.findById(userId).orElseThrow(() -> new ResourceEntityNotFoundException("User", "Id", userId));
        return this.userRepository.deleteLibrarian(user.getUserId());
    }

}
