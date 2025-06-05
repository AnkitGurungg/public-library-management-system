package com.csplms.service.Admin;

import com.csplms.dto.requestDto.KYCFillUpDto;
import com.csplms.entity.User;
import com.csplms.entity.Evidence;
import com.csplms.util.EmailUtil;
import jakarta.mail.MessagingException;
import com.csplms.repository.UserRepository;
import com.csplms.mapper.AddLibrarianMapper;
import com.csplms.helper.SaveEvidencesHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import com.csplms.exception.MailFailedException;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.UUID;

@Service
public class AddLibrarianService {

    private static final Logger logger = LoggerFactory.getLogger(AddLibrarianService.class);
    private final UserRepository userRepository;
    private final AddLibrarianMapper addLibrarianMapper;
    private final SaveEvidencesHelper saveEvidences;
    private final EmailUtil emailUtil;

    @Autowired
    public AddLibrarianService(UserRepository userRepository, AddLibrarianMapper addLibrarianMapper, SaveEvidencesHelper saveEvidencesHelper, EmailUtil emailUtil) {
        this.userRepository = userRepository;
        this.addLibrarianMapper = addLibrarianMapper;
        this.saveEvidences = saveEvidencesHelper;
        this.emailUtil = emailUtil;
    }

    @Transactional(rollbackFor = {MessagingException.class, MailFailedException.class, Exception.class})
    public User addLibrarianUser(
            KYCFillUpDto kycFillUpDto,
            MultipartFile librarianUserImage,
            MultipartFile[] evidenceImages
    ) throws MessagingException, MailFailedException {

//        Password for librarian
        final String librarianPassword = UUID.randomUUID().toString();

//        Save librarian on DB
        User librarianUser = this.addLibrarianMapper.toLibrarianUser(kycFillUpDto, librarianPassword);
        librarianUser = this.userRepository.save(librarianUser);
        userRepository.flush();

//        Saves the image and returns the path where evidence is saved
        String librarianUserImagePath = this.saveEvidences.saveUserImageEvidence(librarianUserImage);
        ArrayList<String> librarianUserEvidencesPath = this.saveEvidences.saveUserEvidences(evidenceImages);

        // Save the Evidence on DB
        Evidence evidence = this.saveEvidences.saveUserEvidencesOnDB(librarianUser, librarianUserImagePath, librarianUserEvidencesPath, kycFillUpDto);
        emailUtil.librarianAddedMailToLibrarian(librarianUser, evidence, librarianPassword);
        emailUtil.librarianAddedMailToAdmin(librarianUser, evidence);

        return librarianUser;
    }

}
