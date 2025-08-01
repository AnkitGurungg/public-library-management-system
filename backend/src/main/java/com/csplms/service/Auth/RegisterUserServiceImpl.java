package com.csplms.service.Auth;

import com.csplms.dto.requestDto.KYCFillUpDto;
import com.csplms.dto.responseDto.UserResponseDto;
import com.csplms.entity.User;
import com.csplms.exception.UserNotPresentException;
import com.csplms.mapper.RegisterUserMapper;
import com.csplms.repository.UserRepository;
import com.csplms.helper.SaveEvidencesHelper;
import com.csplms.util.GetAuthUserUtil;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;

@Service
public class RegisterUserServiceImpl implements RegisterUserService {
    private final UserRepository userRepository;
    private final RegisterUserMapper registerUserMapper;
    private final SaveEvidencesHelper saveEvidencesHelper;
    private final GetAuthUserUtil getAuthUserUtil;

    @Autowired
    public RegisterUserServiceImpl(UserRepository userRepository, RegisterUserMapper registerUserMapper, SaveEvidencesHelper saveEvidencesHelper, GetAuthUserUtil getAuthUserUtil) {
        this.userRepository = userRepository;
        this.registerUserMapper = registerUserMapper;
        this.saveEvidencesHelper = saveEvidencesHelper;
        this.getAuthUserUtil = getAuthUserUtil;
    }

    @Transactional
    @Override
    public UserResponseDto registerMemberUser(KYCFillUpDto kycFillUpDto, MultipartFile memberUserImage, MultipartFile[] memberUserEvidences) {
        String email = getAuthUserUtil.getAuthUser();
        User memberUser = userRepository.findUserByEmail(email).orElseThrow(() -> new UserNotPresentException("user"));

        memberUser = this.registerUserMapper.toMemberUser(memberUser, kycFillUpDto);
        memberUser = this.userRepository.save(memberUser);

        // Saves the image and returns the path where evidence is saved
        String memberUserImagePath = this.saveEvidencesHelper.saveUserImageEvidence(memberUserImage);
        ArrayList<String> memberUserEvidencesPath = this.saveEvidencesHelper.saveUserEvidences(memberUserEvidences);

        // Save the Evidence on DB
        saveEvidencesHelper.saveUserEvidencesOnDB(memberUser, memberUserImagePath, memberUserEvidencesPath, kycFillUpDto);
        return registerUserMapper.toUserResponseDto(memberUser);
    }

}
