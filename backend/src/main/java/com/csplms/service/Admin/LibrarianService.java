package com.csplms.service.Admin;

import com.csplms.dto.responseDto.AdminUserDto;
import com.csplms.dto.responseDto.EvidenceDto;
import com.csplms.dto.responseDto.UserDto;
import com.csplms.entity.Evidence;
import com.csplms.entity.User;
import com.csplms.exception.ResourceEntityNotFoundException;
import com.csplms.exception.ResourceListNotFoundException;
import com.csplms.exception.UserNotPresentException;
import com.csplms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LibrarianService {

    private final UserRepository userRepository;

    @Autowired
    public LibrarianService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

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

    public Integer deleteLibrarian(Integer userId) {
        User user = this.userRepository.findById(userId).orElseThrow(() -> new ResourceEntityNotFoundException("User", "Id", userId));
        return this.userRepository.deleteLibrarian(user.getUserId());
    }

}
