package com.csplms.helper;

import org.slf4j.Logger;
import com.csplms.entity.User;
import org.slf4j.LoggerFactory;
import com.csplms.entity.Evidence;
import com.csplms.dto.requestDto.KYCFillUpDto;
import org.springframework.stereotype.Component;
import com.csplms.repository.EvidenceRepository;
import com.csplms.exception.IndexBoundsException;
import org.springframework.web.multipart.MultipartFile;
import com.csplms.exception.ResourceListNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Component
public class SaveEvidencesHelper {

    // Both of the register user and add Librarian use services of this class to save user image, user evidences on file system and database

    private final String ROOT_DIR_STRING = System.getProperty("user.dir");

    private final EvidenceRepository evidenceRepository;
    private static final Logger logger = LoggerFactory.getLogger(SaveEvidencesHelper.class);

    @Autowired
    public SaveEvidencesHelper(EvidenceRepository evidenceRepository) {
        this.evidenceRepository = evidenceRepository;
    }

    public String checkOriginImageName(String originalImageName) {
        if (originalImageName==null || originalImageName.trim().isEmpty()) {
            throw new ResourceListNotFoundException("User image name");
        }
        return originalImageName;
    }

    public String saveUserImageEvidence(MultipartFile userImage) {
        try {
//            Get the original image name
            String originalUserImageName = userImage.getOriginalFilename();

//            Check if the image name is empty
            String checkedOriginImageName = checkOriginImageName(originalUserImageName);

//            Combine uploads directory and image name with project root directory
            Path userImagePath = Path.of(ROOT_DIR_STRING, "uploads", checkedOriginImageName);
            logger.error("userImagePath: " + userImagePath.toString());

//            Save the image
            Files.write(userImagePath, userImage.getBytes());

//            Image path to be saved on db
            Path pathToImage = Path.of("uploads", checkedOriginImageName);
            logger.error("pathToImage: " + pathToImage);

            return pathToImage.toString();
        }
        catch (Exception e) {
            return e.getMessage();
        }
    }

    public ArrayList<String> saveUserEvidences(
            MultipartFile[] userEvidences
    ) {
        try {
            ArrayList<String> userEvidencesPaths = new ArrayList<>();
            for(MultipartFile evidence : userEvidences) {

//                Get the original image name
                String originalEvidenceName = evidence.getOriginalFilename();

//                Check if the image name is empty
                String checkedOriginImageName = checkOriginImageName(originalEvidenceName);

//                Combine uploads directory and image name with project root directory
                Path evidenceImagePath = Path.of(ROOT_DIR_STRING, "uploads", checkedOriginImageName);
                logger.error("evidenceImagePath: " + evidenceImagePath.toString());

//                Save the image
                Files.write(evidenceImagePath, evidence.getBytes());

//                Image path to be saved on db
                Path pathToImage = Path.of("uploads", checkedOriginImageName);
                logger.error("ev pathToImage: " + pathToImage);

//                Add on arraylist
                userEvidencesPaths.add(pathToImage.toString());
            }
            return userEvidencesPaths;
        }
        catch (Exception e) {
            ArrayList<String> error = new ArrayList<>();
            error.add(e.getMessage());
            return error;
        }
    }

    public Evidence saveUserEvidencesOnDB(User user, String userImagePath, List<String> evidencesPaths, KYCFillUpDto kycFillUpDto) {
        if(userImagePath==null || evidencesPaths==null || userImagePath.trim().isEmpty() || evidencesPaths.isEmpty() ) {
            throw new ResourceListNotFoundException("User evidences");
        }
        if (evidencesPaths.size()>2) {
            logger.warn(evidencesPaths.toString());
            logger.warn("Evidences paths are not supported with size: {}", evidencesPaths.size());
            throw new IndexBoundsException("Image", evidencesPaths.size());
        }

        Evidence checkEvidence = evidenceRepository.findByUserId(user.getUserId());
        if (checkEvidence==null) {
            logger.warn("User evidence not found");
            Evidence evidence = new Evidence();
            evidence.setUserImage(userImagePath);
            evidence.setEvidenceOne(evidencesPaths.get(0));
            evidence.setEvidenceTwo(evidencesPaths.get(1));
            evidence.setDocumentType(kycFillUpDto.documentType());
            evidence.setUser(user);
            evidenceRepository.save(evidence);
            evidenceRepository.flush();
            return evidence;
        } else {
            logger.warn("User evidence already exists");
            checkEvidence.setUserImage(userImagePath);
            checkEvidence.setEvidenceOne(evidencesPaths.get(0));
            checkEvidence.setEvidenceTwo(evidencesPaths.get(1));
            checkEvidence.setDocumentType(kycFillUpDto.documentType());
            evidenceRepository.save(checkEvidence);
            evidenceRepository.flush();
            return checkEvidence;
        }
    }
}
