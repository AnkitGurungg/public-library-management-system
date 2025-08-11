package com.csplms.helper;

import com.csplms.config.AwsProperties;
import com.csplms.constant.S3Constants;
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
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.util.ArrayList;
import java.util.List;

@Component
public class SaveEvidencesHelper {

    // Both of the register user and add Librarian use services of this class to save user image, user evidences on file system and database

    private final EvidenceRepository evidenceRepository;
    private final AwsProperties awsProperties;
    private final S3Client s3Client;

    private static final Logger logger = LoggerFactory.getLogger(SaveEvidencesHelper.class);

    @Autowired
    public SaveEvidencesHelper(
            EvidenceRepository evidenceRepository,
            AwsProperties awsProperties,
            S3Client s3Client
    ) {
        this.evidenceRepository = evidenceRepository;
        this.awsProperties = awsProperties;
        this.s3Client = s3Client;
    }

    public String checkOriginImageName(String originalImageName) {
        if (originalImageName == null || originalImageName.trim().isEmpty()) {
            throw new ResourceListNotFoundException("User image name");
        }
        return originalImageName;
    }

//    save user image
    public String saveUserImageEvidence(User user, MultipartFile userImage) {
        try {
            // check the img type like (.jpg .png)
            // S3 Key: images/users/{userId}/profile.jpg
            String key = S3Constants.USERS_IMAGE_FOLDER + user.getUserId() + S3Constants.FORWARD_SLASH + userImage.getOriginalFilename();

            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(awsProperties.getS3BucketName())
                    .key(key)
                    .contentType(userImage.getContentType())
                    .build();

            s3Client.putObject(
                    putObjectRequest,
                    RequestBody.fromBytes(userImage.getBytes())
            );

            return key;
        } catch (Exception e) {
            throw new RuntimeException("Failed to upload user image to S3", e);
        }
    }

//    save evidences
    public ArrayList<String> saveUserEvidences(User user, MultipartFile[] userEvidences) {
        ArrayList<String> keys = new ArrayList<>();
        try {
            for (MultipartFile evidence : userEvidences) {
                String originalFileName = checkOriginImageName(evidence.getOriginalFilename());

                // S3 Key: images/users/{userId}/evidences/evidence1.png
                String key = S3Constants.USERS_IMAGE_FOLDER + user.getUserId() + S3Constants.FORWARD_SLASH + S3Constants.EVIDENCES_FOLDER + originalFileName;

                s3Client.putObject(
                        PutObjectRequest.builder()
                                .bucket(awsProperties.getS3BucketName())
                                .key(key)
                                .contentType(evidence.getContentType())
                                .build(),
                        RequestBody.fromBytes(evidence.getBytes())
                );

                keys.add(key);
            }
            return keys;
        } catch (Exception e) {
            throw new RuntimeException("Failed to upload user evidences to S3", e);
        }
    }

    public Evidence saveUserEvidencesOnDB(User user, String userImagePath, List<String> evidencesPaths, KYCFillUpDto kycFillUpDto) {
        if (userImagePath == null || evidencesPaths == null || userImagePath.trim().isEmpty() || evidencesPaths.isEmpty()) {
            throw new ResourceListNotFoundException("User evidences");
        }
        if (evidencesPaths.size() > 2) {
            logger.warn(evidencesPaths.toString());
            logger.warn("Evidences paths are not supported with size: {}", evidencesPaths.size());
            throw new IndexBoundsException("Image", evidencesPaths.size());
        }

        Evidence checkEvidence = evidenceRepository.findByUserId(user.getUserId());
        if (checkEvidence == null) {
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
