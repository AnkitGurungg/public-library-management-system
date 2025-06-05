package com.csplms.controller.LibrarianAdmin;

import com.csplms.entity.Shelf;
import com.csplms.service.LibrarianAdmin.ShelfService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.csplms.dto.requestDto.ShelfRequestDto;
import com.csplms.dto.responseDto.ShelfResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/la/shelf")
@EnableMethodSecurity(prePostEnabled = true)
@PreAuthorize("hasAnyAuthority('ROLE_LIBRARIAN', 'ROLE_ADMIN')")
public class ShelfController {

    private final ShelfService shelfService;

    @Autowired
    public ShelfController(ShelfService shelfService) {
        this.shelfService = shelfService;
    }

    @PostMapping("/add")
    public ResponseEntity<ShelfResponseDto> addShelf(@RequestBody ShelfRequestDto shelfRequestDto) {
        return new ResponseEntity<>(this.shelfService.addShelf(shelfRequestDto), HttpStatus.CREATED);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Shelf> getShelf(@PathVariable("id") int shelfId) {
        return new ResponseEntity<>(this.shelfService.getShelf(shelfId), HttpStatus.OK);
    }

    @GetMapping("/get/name/{name}")
    public ResponseEntity<List<Shelf>> getShelfByName(@PathVariable("name") String shelfName) {
        return new ResponseEntity<>(this.shelfService.getShelfByName(shelfName), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Shelf> updateShelf(@PathVariable("id") int shelfId, @RequestBody ShelfRequestDto shelfRequestDto) {
        return new ResponseEntity<>(this.shelfService.updateShelf(shelfId, shelfRequestDto), HttpStatus.OK);
    }

    @PutMapping("/restore/{id}")
    public ResponseEntity<Integer> restoreShelf(@PathVariable("id") int shelfId) {
        return new ResponseEntity<>(this.shelfService.restoreShelf(shelfId), HttpStatus.OK);
    }

    @GetMapping("/get/shelves")
    public ResponseEntity<List<Shelf>> getShelfs() {
        return new ResponseEntity<>(this.shelfService.getShelves(), HttpStatus.OK);
    }

    @GetMapping("/get/available/shelves")
    public ResponseEntity<List<Shelf>> getAllAvailableShelves() {
        return new ResponseEntity<>(this.shelfService.getAllAvailableShelves(), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public Integer deleteShelf(@PathVariable("id") Integer shelfId) {
        return this.shelfService.deleteShelf(shelfId);
    }

}
