package com.csplms.service.LibrarianAdmin;

import com.csplms.dto.requestDto.RejectKYCDto;
import com.csplms.dto.responseDto.*;
import com.csplms.entity.Evidence;
import com.csplms.entity.User;
import com.csplms.exception.ResourceListNotFoundException;
import com.csplms.exception.ResourceEntityNotFoundException;
import com.csplms.exception.UserNotPresentException;
import com.csplms.repository.EvidenceRepository;
import com.csplms.repository.UserRepository;
import com.csplms.util.GetAuthUserUtil;
import com.csplms.util.GlobalDateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final GlobalDateUtil globalDateUtil;
    private final EvidenceRepository evidenceRepository;
    private final GetAuthUserUtil getAuthUserUtil;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, GlobalDateUtil globalDateUtil, EvidenceRepository evidenceRepository, GetAuthUserUtil getAuthUserUtil) {
        this.userRepository = userRepository;
        this.globalDateUtil = globalDateUtil;
        this.evidenceRepository = evidenceRepository;
        this.getAuthUserUtil = getAuthUserUtil;
    }

    @Override
    public UserDto getUser(int userId) {
        User user = this.userRepository.findById(userId).orElseThrow(() -> new ResourceEntityNotFoundException("User", "Id", 0));

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
    public UserAccountInfoDto getUserAccountInfo(String email) {
        User user = this.userRepository.findUserByEmail(email).orElseThrow(() -> new ResourceEntityNotFoundException("User", "Id", 0));
        if (!user.isPresent()){
            throw new UserNotPresentException("You are no longer user!!!");
        }

        Evidence evidence = user.getEvidence();
        EvidenceDto evidenceDto = null;

        if (evidence != null) {
            evidenceDto = new EvidenceDto(
                    evidence.getEvidenceId(),
                    evidence.getUserImage(),
                    evidence.getEvidenceOne(),
                    evidence.getEvidenceTwo(),
                    evidence.getDocumentType(),
                    evidence.getDescription()
            );
        }

        return new UserAccountInfoDto(
                user.getUserId(),
                user.getName(),
                user.getEmail(),
                user.getContactNumber(),
                user.getAddress(),
                user.getAppliedDate(),
                user.getVerifiedDate(),
                user.isVerified(),
                user.isProfileUpdated(),
                user.isPresent(),
                evidenceDto
        );
    }

    @Override
    public List<AdminUserDto> getNonVerifiedMembers() {
        List<User> users = this.userRepository.getNonVerifiedMembers();
        if (users.isEmpty()){
            throw new ResourceListNotFoundException("Users");
        }

        List<AdminUserDto> nonVMList = new ArrayList<>();
        for (User user : users){
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
            nonVMList.add(item);
        }

        return nonVMList;
    }

    @Override
    public List<AdminUserDto> getVerifiedMembers() {
        List<User> verifiedMembers = this.userRepository.getVerifiedMembers();
        if (verifiedMembers.isEmpty()){
            throw new ResourceListNotFoundException("Users");
        }

        List<AdminUserDto> vmList = new ArrayList<>();
        for (User user : verifiedMembers){
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
            vmList.add(item);
        }

        return vmList;
    }

    @Override
    public List<UsersForBorrowResponseDto> getAllUsers() {
        List<User> users = this.userRepository.getAllUsers();

        if (users.isEmpty()) {
            throw new ResourceListNotFoundException("Users");
        }

        return users.stream()
                .map(user -> new UsersForBorrowResponseDto(
                        user.getUserId(),
                        user.getName(),
                        user.getEmail()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public Integer deleteUser(Integer userId) {
        User user = this.userRepository.findById(userId).orElseThrow(() -> new ResourceEntityNotFoundException("User", "Id", userId));
        return this.userRepository.deleteUser(user.getUserId());
    }

    @Override
    public User verifyMember(Integer userId) {
//        Get the staff email
        String currentUser = getAuthUserUtil.getAuthUser();
//        Get the staff full object
        User staffUser = userRepository.findUserByEmail(currentUser).orElseThrow(() -> new ResourceEntityNotFoundException("User", "Id", 0));

        User user = this.userRepository.findById(userId).orElseThrow(() -> new ResourceEntityNotFoundException("User", "Id", userId));

        if (!user.isPresent()){
            throw new ResourceEntityNotFoundException("User", "Id", userId);
        }
        user.setVerified(true);
        user.setVerifiedDate(globalDateUtil.getCurrentDate());
        user.setVerifiedBy(staffUser);
        return this.userRepository.save(user);
    }

    @Override
    public User rejectMember(Integer userId, RejectKYCDto rejectKYCDto) {
        User user = this.userRepository.findById(userId).orElseThrow(() -> new ResourceEntityNotFoundException("User", "Id", userId));
        if (!user.isPresent()){
            throw new ResourceEntityNotFoundException("User", "Id", userId);
        }
        user.setVerified(false);
        user.setProfileUpdated(false);

        Evidence evidence = evidenceRepository.findByUserId(user.getUserId());
        evidence.setDescription(rejectKYCDto.description());
        evidenceRepository.save(evidence);
        evidenceRepository.flush();

        return this.userRepository.save(user);
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

}
