package com.csplms.service.Member;

import com.csplms.config.AwsProperties;
import com.csplms.dto.responseDto.BookDto;
import org.slf4j.Logger;
import com.csplms.entity.*;
import org.slf4j.LoggerFactory;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.core.io.*;
import org.springframework.mail.MailException;
import com.csplms.exception.MailFailedException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.NoSuchKeyException;
import software.amazon.awssdk.services.s3.model.S3Exception;

import java.io.IOException;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;

@Service
public class EmailServiceImpl implements EmailService {

    @Value("${spring.mail.username}")
    private String from;

    @Value("${admin.email}")
    private String adminMail;

    @Value("${admin.name}")
    private String adminName;

    @Value("${fine.rate}")
    private long perDayFineAmount;

    @Value("${frontend.base-url}")
    private String frontendBaseUrl;

    private final S3Client s3Client;
    private final AwsProperties awsProperties;
    private final JavaMailSender javaMailSender;

    private static final Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);

    @Autowired
    public EmailServiceImpl(JavaMailSender javaMailSender, S3Client s3Client, AwsProperties awsProperties) {
        this.javaMailSender = javaMailSender;
        this.s3Client = s3Client;
        this.awsProperties = awsProperties;
    }

    @Override
    public InputStreamSource getImageAsInputStream(String objectKey) throws MailFailedException {
        // Fetch image from S3 and return it as InputStreamSource for email attachment
        try (
                ResponseInputStream<GetObjectResponse> s3Object =
                        s3Client.getObject(GetObjectRequest.builder().bucket(awsProperties.getS3BucketName())
                                .key(objectKey)
                                .build());
        ) {
            // Read all bytes from the S3 object
            byte[] bytes = s3Object.readAllBytes();
            return new ByteArrayResource(bytes);
        } catch (NoSuchKeyException e) {
            // Object does not exist in the bucket
            throw new MailFailedException("Image not found in S3");
        } catch (IOException | S3Exception e) {
            // Failed to read object or any other S3-related exception
            throw new MailFailedException("Unable to read image from S3. Please try again");
        }
    }

    @Override
    public void newBookMail(BookDto book, String[] mails) throws MailException, MessagingException, MailFailedException, IOException {
        try {
            if (book == null || book.title() == null) {
                throw new MailFailedException("Book title cannot be null.");
            }
            if (mails == null || mails.length == 0) {
                throw new MailFailedException("Recipient list cannot be empty.");
            }

//            Use the url stored in db to get image from s3
            InputStreamSource image = getImageAsInputStream(book.imageURL());

            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            mimeMessageHelper.setFrom(from);
            mimeMessageHelper.setTo(mails);
            mimeMessageHelper.setSubject("Discover Our Latest Addition: " + book.title());

            // Format dates
            SimpleDateFormat dateFormat = new SimpleDateFormat("MMMM d, yyyy");
            String publishedDate = book.publishedDate() != null ? dateFormat.format(book.publishedDate()) : "N/A";
            String addedDate = book.addedDate() != null ? dateFormat.format(book.addedDate()) : "N/A";

            // HTML email content
            String htmlContent = """
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body {
                            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                            background-color: #f4f4f4;
                            margin: 0;
                            padding: 0;
                            font-size: 16px;
                            line-height: 1.6;
                            color: #333333;
                        }
                        .container {
                            max-width: 700px;
                            margin: 20px auto;
                            background-color: #ffffff;
                            border-radius: 8px !important;
                            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            background-color: #206ea6;
                            color: #ffffff;
                            padding: 20px;
                            text-align: center;
                            border-top-left-radius: 8px;
                            border-top-right-radius: 8px; 
                        }
                        .header img {
                            max-width: 150px;
                            height: auto;
                            border-radius: 5px;
                        }
                        .header h1 {
                            margin: 10px 0 0;
                            font-size: 26px;
                            font-weight: 500;
                        }
                        .content {
                            padding: 25px;
                        }
                        .intro {
                            font-size: 15px;
                            font-weight: 500;
                            margin-bottom: 10px;
                        }
                        .announcement {
                            font-size: 14px;
                            font-weight: 400;
                            margin-bottom: 10px;
                            line-height: 1.8;
                        }
                        .closing {
                            font-size: 14px;
                            font-weight: 400;
                            margin-bottom: 10px;
                            line-height: 1.8;
                        }
                        .book-details {
                            margin: 20px 0;
                            background-color: #e6f0fa;
                            padding: 20px;
                            border-radius: 5px;
                        }
                        .book-details h2 {
                            font-family: Georgia, serif;
                            color: #206ea6;
                            font-size: 22px;
                            font-weight: normal;
                            margin: 0 0 10px;
                        }
                        .book-details p {
                            margin: 8px 0;
                            font-size: 15px;
                        }
                        .cta-button {
                            display: inline-block;
                            padding: 12px 25px;
                            margin: 20px 0;
                            background-color: #206ea6;
                            color: #ffffff !important;
                            text-decoration: none;
                            border-radius: 5px;
                            font-weight: 500;
                            text-align: center;
                        }
                        .footer {
                            background-color: #f4f4f4;
                            padding: 15px;
                            text-align: center;
                            font-size: 13px;
                            color: #666666;
                            border-bottom-left-radius: 8px; 
                            border-bottom-right-radius: 8px;
                        }
                        .footer a {
                            color: #206ea6;
                            text-decoration: none;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>New Book Arrival!</h1>
                        </div>
                        <div class="content">
                            <p class="intro">Dear Member,</p>
                            <p class="announcement">We are delighted to announce a new addition to the CSPLMS collection!</p>
                            <div class="book-details">
                                <h2>%s</h2>
                                <p><strong>Author:</strong> %s</p>
                                <p><strong>Genre:</strong> %s</p>
                                <p><strong>Published Date:</strong> %s</p>
                                <p><strong>Added On:</strong> %s</p>
                                <p><strong>Description:</strong> %s</p>
                            </div>
                            <p class="closing">Explore this exciting book at our library! Thank you for being with us.</p>
                            <a href="%s/books/book/%s" class="cta-button">View Book Details</a>
                            <p>Warm Regards,<br>CSPLMS Team<br>Pokhara-29, Bhandardhik</p>
                        </div>
                        <div class="footer">
                            <p>© 2025 CSPLMS. All rights reserved. | <a href="%s">Visit our website</a></p>
                        </div>
                    </div>
                </body>
                </html>
                """.formatted(
                    book.title(),
                    book.author() != null ? book.author() : "N/A",
                    book.categoryName() != null ? book.categoryName() : "N/A",
                    publishedDate,
                    addedDate,
                    book.description() != null ? book.description().substring(0, Math.min(book.description().length(), 200)) + "..." : "No description available",
                    frontendBaseUrl,
                    book.bookId(),
                    frontendBaseUrl
            );

            // Fallback email with plain text
            String plainText = """
                Dear Member,
                
                We are delighted to announce a new addition to the CSPLMS collection!
                
                Book Details:
                Title: %s
                Author: %s
                Genre: %s
                Published Date: %s
                Added On: %s
                Description: %s
                
                Explore this exciting book at our library! Thank you for being with us.
                
                Warm Regards,
                CSPLMS Team
                Pokhara-29, Bhandardhik
                """.formatted(
                    book.title(),
                    book.author() != null ? book.author() : "N/A",
                    book.categoryName() != null ? book.categoryName() : "N/A",
                    publishedDate,
                    addedDate,
                    book.description() != null ? book.description().substring(0, Math.min(book.description().length(), 200)) + "..." : "No description available"
            );

            mimeMessageHelper.setText(plainText, htmlContent);
            mimeMessageHelper.addAttachment("New book title" , image, "image/png");
            javaMailSender.send(mimeMessage);
        } catch (MailException | MessagingException ex) {
            throw new MailFailedException("Failed to send new book arrival mail");
        } catch (Exception ex) {
            throw ex;
        }
    }

//    @Override
//    public void newBookMail(Book book, String[] mails) throws MailException, MessagingException, MailFailedException, IOException {
//        try {
//            if (book == null || book.getTitle() == null) {
//                throw new MailFailedException("Book title cannot be null.");
//            }
//            if (mails == null || mails.length == 0) {
//                throw new MailFailedException("Recipient list cannot be empty.");
//            }
//
////            Use the url stored in db to get image from s3
//            InputStreamSource image = getImageAsInputStream(book.getImageURL());
//
//            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
//            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
//            mimeMessageHelper.setFrom(from);
//            mimeMessageHelper.setTo(mails);
//            mimeMessageHelper.setSubject("Discover Our Latest Addition: " + book.getTitle());
//
//            // Format dates
//            SimpleDateFormat dateFormat = new SimpleDateFormat("MMMM d, yyyy");
//            String publishedDate = book.getPublishedDate() != null ? dateFormat.format(book.getPublishedDate()) : "N/A";
//            String addedDate = book.getAddedDate() != null ? dateFormat.format(book.getAddedDate()) : "N/A";
//
//            // HTML email content
//            String htmlContent = """
//                <!DOCTYPE html>
//                <html>
//                <head>
//                    <meta charset="UTF-8">
//                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                    <style>
//                        body {
//                            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
//                            background-color: #f4f4f4;
//                            margin: 0;
//                            padding: 0;
//                            font-size: 16px;
//                            line-height: 1.6;
//                            color: #333333;
//                        }
//                        .container {
//                            max-width: 700px;
//                            margin: 20px auto;
//                            background-color: #ffffff;
//                            border-radius: 8px !important;
//                            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//                        }
//                        .header {
//                            background-color: #206ea6;
//                            color: #ffffff;
//                            padding: 20px;
//                            text-align: center;
//                            border-top-left-radius: 8px;
//                            border-top-right-radius: 8px;
//                        }
//                        .header img {
//                            max-width: 150px;
//                            height: auto;
//                            border-radius: 5px;
//                        }
//                        .header h1 {
//                            margin: 10px 0 0;
//                            font-size: 26px;
//                            font-weight: 500;
//                        }
//                        .content {
//                            padding: 25px;
//                        }
//                        .intro {
//                            font-size: 15px;
//                            font-weight: 500;
//                            margin-bottom: 10px;
//                        }
//                        .announcement {
//                            font-size: 14px;
//                            font-weight: 400;
//                            margin-bottom: 10px;
//                            line-height: 1.8;
//                        }
//                        .closing {
//                            font-size: 14px;
//                            font-weight: 400;
//                            margin-bottom: 10px;
//                            line-height: 1.8;
//                        }
//                        .book-details {
//                            margin: 20px 0;
//                            background-color: #e6f0fa;
//                            padding: 20px;
//                            border-radius: 5px;
//                        }
//                        .book-details h2 {
//                            font-family: Georgia, serif;
//                            color: #206ea6;
//                            font-size: 22px;
//                            font-weight: normal;
//                            margin: 0 0 10px;
//                        }
//                        .book-details p {
//                            margin: 8px 0;
//                            font-size: 15px;
//                        }
//                        .cta-button {
//                            display: inline-block;
//                            padding: 12px 25px;
//                            margin: 20px 0;
//                            background-color: #206ea6;
//                            color: #ffffff !important;
//                            text-decoration: none;
//                            border-radius: 5px;
//                            font-weight: 500;
//                            text-align: center;
//                        }
//                        .footer {
//                            background-color: #f4f4f4;
//                            padding: 15px;
//                            text-align: center;
//                            font-size: 13px;
//                            color: #666666;
//                            border-bottom-left-radius: 8px;
//                            border-bottom-right-radius: 8px;
//                        }
//                        .footer a {
//                            color: #206ea6;
//                            text-decoration: none;
//                        }
//                    </style>
//                </head>
//                <body>
//                    <div class="container">
//                        <div class="header">
//                            <h1>New Book Arrival!</h1>
//                        </div>
//                        <div class="content">
//                            <p class="intro">Dear Member,</p>
//                            <p class="announcement">We are delighted to announce a new addition to the CSPLMS collection!</p>
//                            <div class="book-details">
//                                <h2>%s</h2>
//                                <p><strong>Author:</strong> %s</p>
//                                <p><strong>Genre:</strong> %s</p>
//                                <p><strong>Published Date:</strong> %s</p>
//                                <p><strong>Added On:</strong> %s</p>
//                                <p><strong>Description:</strong> %s</p>
//                            </div>
//                            <p class="closing">Explore this exciting book at our library! Thank you for being with us.</p>
//                            <a href="%s/books/book/%s" class="cta-button">View Book Details</a>
//                            <p>Warm Regards,<br>CSPLMS Team<br>Pokhara-29, Bhandardhik</p>
//                        </div>
//                        <div class="footer">
//                            <p>© 2025 CSPLMS. All rights reserved. | <a href="%s">Visit our website</a></p>
//                        </div>
//                    </div>
//                </body>
//                </html>
//                """.formatted(
//                    book.getTitle(),
//                    book.getAuthor() != null ? book.getAuthor() : "N/A",
//                    book.getCategory() != null ? book.getCategory().getName() : "N/A",
//                    publishedDate,
//                    addedDate,
//                    book.getDescription() != null ? book.getDescription().substring(0, Math.min(book.getDescription().length(), 200)) + "..." : "No description available",
//                    frontendBaseUrl,
//                    book.getBookId(),
//                    frontendBaseUrl
//            );
//
//            // Fallback email with plain text
//            String plainText = """
//                Dear Member,
//
//                We are delighted to announce a new addition to the CSPLMS collection!
//
//                Book Details:
//                Title: %s
//                Author: %s
//                Genre: %s
//                Published Date: %s
//                Added On: %s
//                Description: %s
//
//                Explore this exciting book at our library! Thank you for being with us.
//
//                Warm Regards,
//                CSPLMS Team
//                Pokhara-29, Bhandardhik
//                """.formatted(
//                    book.getTitle(),
//                    book.getAuthor() != null ? book.getAuthor() : "N/A",
//                    book.getCategory() != null ? book.getCategory().getName() : "N/A",
//                    publishedDate,
//                    addedDate,
//                    book.getDescription() != null ? book.getDescription().substring(0, Math.min(book.getDescription().length(), 200)) + "..." : "No description available"
//            );
//
//            mimeMessageHelper.setText(plainText, htmlContent);
//            mimeMessageHelper.addAttachment("New book title" , image, "image/png");
//            javaMailSender.send(mimeMessage);
//        } catch (MailException | MessagingException ex) {
//            throw new MailFailedException("Failed to send new book arrival mail");
//        } catch (Exception ex) {
//            throw ex;
//        }
//    }

    @Override
    public void sendOtpEmail(String userEmail, String otp) throws MailException, MessagingException, MailFailedException {
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setFrom(from);
            mimeMessageHelper.setTo(userEmail);
            mimeMessageHelper.setSubject("CSPLMS OTP Verification");

            // HTML email content
            String htmlContent = """
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        background-color: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                        overflow: hidden;
                    }
                    .header {
                        background-color: #206ea6;
                        color: #ffffff;
                        padding: 20px;
                        text-align: center;
                    }
                    .header h1 {
                        margin: 0;
                        font-size: 24px;
                    }
                    .content {
                        padding: 20px;
                        line-height: 1.6;
                        color: #333333;
                    }
                    .otp {
                        font-size: 24px;
                        font-weight: bold;
                        color: #206ea6;
                        text-align: center;
                        margin: 20px 0;
                        background-color: #e6f0fa;
                        padding: 10px;
                        border-radius: 5px;
                    }
                    .warning {
                        color: #d32f2f;
                        font-weight: bold;
                        text-align: center;
                        margin: 15px 0;
                    }
                    .footer {
                        background-color: #f4f4f4;
                        padding: 10px;
                        text-align: center;
                        font-size: 12px;
                        color: #666666;
                    }
                    .footer a {
                        color: #206ea6;
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>LMS OTP Verification</h1>
                    </div>
                    <div class="content">
                        <p>Dear User,</p>
                        <p>Thank you for registering with our Library. To complete your registration, please use the following One-Time Password (OTP):</p>
                        <div class="otp">%s</div>
                        <p class="warning">Never share your OTP with anyone. We never call or ask for your OTP.</p>
                        <p>If you did not initiate this request, please contact our support team immediately.</p>
                        <p>Best regards,<br>CSPLMS Team</p>
                    </div>
                    <div class="footer">
                        <p>© 2025 LMS. All rights reserved. | <a href="%s">Visit our website</a></p>
                    </div>
                </div>
            </body>
            </html>
            """.formatted(otp, frontendBaseUrl);

//            Fallback email with plain text
            String plainText = """
            Dear User,
            
            Thank you for registering with our Library.
            Your OTP is: %s
            
            Never share your OTP with anyone. We never call or ask for your OTP.
            If you did not initiate this request, please contact our support team immediately.
           
            Best regards,
            CSPLMS Team
            """.formatted(otp);

            mimeMessageHelper.setText(plainText, htmlContent);
            javaMailSender.send(mimeMessage);
        } catch (Exception ex) {
            if (ex instanceof MailException || ex instanceof MessagingException) {
                throw new MailFailedException("Failed to send OTP. Please try again later.");
            }
            throw ex;
        }
    }

    @Override
    public void bookBorrowedMailToMember(User user, Book book, Borrow borrow) throws MailException, MailFailedException, MessagingException {
        try {
            // Validate inputs
            if (user == null || user.getEmail() == null || user.getName() == null) {
                throw new MailFailedException("User information cannot be null.");
            }
            if (book == null || book.getTitle() == null || book.getImageURL() == null) {
                throw new MailFailedException("Book information or image URL cannot be null.");
            }
            if (borrow == null || borrow.getBorrowDate() == null || borrow.getDueDate() == null) {
                throw new MailFailedException("Borrow information cannot be null.");
            }

            InputStreamSource bookImage = getImageAsInputStream(book.getImageURL());

            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            mimeMessageHelper.setFrom(from);
            mimeMessageHelper.setTo(user.getEmail());
            mimeMessageHelper.setSubject("Congratulations! You've Borrowed a Book from CSPLMS");

            // Format dates
            SimpleDateFormat dateFormat = new SimpleDateFormat("MMMM d, yyyy");
            String borrowDate = dateFormat.format(borrow.getBorrowDate());
            String dueDate = dateFormat.format(borrow.getDueDate());

            // HTML email content
            String htmlContent = """
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {
                        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                        font-size: 16px;
                        line-height: 1.6;
                        color: #333333;
                    }
                    .container {
                        max-width: 700px;
                        margin: 20px auto;
                        background-color: #ffffff;
                        border-radius: 8px !important;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        background-color: #206ea6;
                        color: #ffffff;
                        padding: 20px;
                        text-align: center;
                        border-top-left-radius: 8px;
                        border-top-right-radius: 8px;
                    }
                    .header h1 {
                        margin: 10px 0 0;
                        font-size: 26px;
                        font-weight: 600;
                    }
                    .content {
                        padding: 25px;
                    }
                    .intro {
                        font-size: 15px;
                        font-weight: 500;
                        margin-bottom: 10px;
                    }
                    .announcement {
                        font-size: 14px;
                        font-weight: 400;
                        margin-bottom: 10px;
                        line-height: 1.8;
                    }
                    .book-details {
                        margin: 20px 0;
                        background-color: #e6f0fa;
                        padding: 20px;
                        border-radius: 5px;
                    }
                    .book-details h2 {
                        font-family: Georgia, serif;
                        color: #206ea6;
                        font-size: 22px;
                        font-weight: normal;
                        margin: 0 0 10px;
                    }
                    .book-details p {
                        margin: 8px 0;
                        font-size: 15px;
                    }
                    .cta-button {
                        display: inline-block;
                        padding: 12px 25px;
                        margin: 20px 0;
                        background-color: #206ea6;
                        color: #ffffff !important;
                        text-decoration: none;
                        border-radius: 5px;
                        font-weight: 600;
                        text-align: center;
                    }
                    .closing {
                        font-size: 14px;
                        font-weight: 400;
                        margin-bottom: 10px;
                        line-height: 1.8;
                    }
                    .footer {
                        background-color: #f4f4f4;
                        padding: 15px;
                        text-align: center;
                        font-size: 13px;
                        color: #666666;
                        border-bottom-left-radius: 8px;
                        border-bottom-right-radius: 8px;
                    }
                    .footer a {
                        color: #206ea6;
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Book Borrow Confirmation!</h1>
                    </div>
                    <div class="content">
                        <p class="intro">Dear %s,</p>
                        <p class="announcement">Congratulations! You have successfully borrowed a book from the CSPLMS collection.</p>
                        <div class="book-details">
                            <h2>%s</h2>
                            <p><strong>Author:</strong> %s</p>
                            <p><strong>Genre:</strong> %s</p>
                            <p><strong>Borrow Date:</strong> %s</p>
                            <p><strong>Due Date:</strong> %s</p>
                        </div>
                        <p class="announcement">Attached is the book’s cover image for your reference. Please ensure the book is returned by the due date to avoid any late fees.</p>
                        <p class="closing" style="color: red !important;"><strong>Note:</strong> If this was not you please contact the team as soon as possible.</p>
                        <a href="%s/books/book/%s" class="cta-button">View Book Details</a>
                        <p class="closing">Enjoy your reading! Thank you for being a valued member of CSPLMS.</p>
                        <p class="closing">Warm Regards,<br>CSPLMS Team<br>Pokhara-29, Bhandardhik</p>
                    </div>
                    <div class="footer">
                        <p>© 2025 CSPLMS. All rights reserved. | <a href="%s">Visit our website</a></p>
                    </div>
                </div>
            </body>
            </html>
            """.formatted(
                    user.getName(),
                    book.getTitle(),
                    book.getAuthor() != null ? book.getAuthor() : "N/A",
                    book.getCategory() != null ? book.getCategory().getName() : "N/A",
                    borrowDate,
                    dueDate,
                    frontendBaseUrl,
                    book.getBookId(),
                    frontendBaseUrl
            );

            // Fallback plain text
            String plainText = """
            Dear %s,
            
            Congratulations! You have successfully borrowed a book from the CSPLMS collection.
            
            Book Details:
            Title: %s
            Author: %s
            Genre: %s
            Borrow Date: %s
            Due Date: %s
            
            Attached is the book’s cover image for your reference. Please ensure the book is returned by the due date to avoid any late fees.
            
            View book details here: %s/books/book/%s
            
            Enjoy your reading! Thank you for being a valued member of CSPLMS.
            
            Warm Regards,
            CSPLMS Team
            Pokhara-29, Bhandardhik
            © 2025 CSPLMS. All rights reserved.
            """.formatted(
                    user.getName(),
                    book.getTitle(),
                    book.getAuthor() != null ? book.getAuthor() : "N/A",
                    book.getCategory() != null ? book.getCategory().getName() : "N/A",
                    borrowDate,
                    dueDate,
                    frontendBaseUrl,
                    book.getBookId()
            );

            mimeMessageHelper.setText(plainText, htmlContent);
            mimeMessageHelper.addAttachment("Book Cover - " + book.getTitle(), bookImage, "image/png");
            javaMailSender.send(mimeMessage);
        } catch (MailException | MessagingException ex) {
            throw new MailFailedException("Failed to send book borrowed confirmation email");
        } catch (Exception ex) {
            throw ex;
        }
    }

    @Override
    public void bookEarlyReturnedMailToMember(User user, Book book, Return returns) throws MailException, MailFailedException, MessagingException {
        try {
            // Validate inputs
            if (user == null || user.getEmail() == null || user.getName() == null) {
                throw new MailFailedException("User information cannot be null.");
            }
            if (book == null || book.getTitle() == null || book.getImageURL() == null) {
                throw new MailFailedException("Book information or image URL cannot be null.");
            }
            if (returns == null || returns.getBorrows() == null || returns.getBorrows().getBorrowDate() == null ||
                    returns.getBorrows().getDueDate() == null || returns.getReturnDate() == null) {
                throw new MailFailedException("Return or borrow information cannot be null.");
            }

            InputStreamSource bookImage = getImageAsInputStream(book.getImageURL());

            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            mimeMessageHelper.setFrom(from);
            mimeMessageHelper.setTo(user.getEmail());
            mimeMessageHelper.setSubject("Thank You for Returning The Book!");

            // Format dates
            SimpleDateFormat dateFormat = new SimpleDateFormat("MMMM d, yyyy");
            String borrowDate = dateFormat.format(returns.getBorrows().getBorrowDate());
            String dueDate = dateFormat.format(returns.getBorrows().getDueDate());
            String returnDate = dateFormat.format(returns.getReturnDate());

            // HTML email content
            String htmlContent = """
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {
                        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                        font-size: 16px;
                        line-height: 1.6;
                        color: #333333;
                    }
                    .container {
                        max-width: 700px;
                        margin: 20px auto;
                        background-color: #ffffff;
                        border-radius: 8px !important;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        background-color: #206ea6;
                        color: #ffffff;
                        padding: 20px;
                        text-align: center;
                        border-top-left-radius: 8px;
                        border-top-right-radius: 8px;
                    }
                    .header h1 {
                        margin: 10px 0 0;
                        font-size: 26px;
                        font-weight: 600;
                    }
                    .content {
                        padding: 25px;
                    }
                    .intro {
                        font-size: 15px;
                        font-weight: 500;
                        margin-bottom: 10px;
                    }
                    .announcement {
                        font-size: 14px;
                        font-weight: 400;
                        margin-bottom: 10px;
                        line-height: 1.8;
                    }
                    .book-details {
                        margin: 20px 0;
                        background-color: #e6f0fa;
                        padding: 20px;
                        border-radius: 5px;
                    }
                    .book-details h2 {
                        font-family: Georgia, serif;
                        color: #206ea6;
                        font-size: 22px;
                        font-weight: normal;
                        margin: 0 0 10px;
                    }
                    .book-details p {
                        margin: 8px 0;
                        font-size: 15px;
                    }
                    .cta-button {
                        display: inline-block;
                        padding: 12px 25px;
                        margin: 20px 0;
                        background-color: #206ea6;
                        color: #ffffff !important;
                        text-decoration: none;
                        border-radius: 5px;
                        font-weight: 600;
                        text-align: center;
                    }
                    .closing {
                        font-size: 14px;
                        font-weight: 400;
                        margin-bottom: 10px;
                        line-height: 1.8;
                    }
                    .footer {
                        background-color: #f4f4f4;
                        padding: 15px;
                        text-align: center;
                        font-size: 13px;
                        color: #666666;
                        border-bottom-left-radius: 8px;
                        border-bottom-right-radius: 8px;
                    }
                    .footer a {
                        color: #206ea6;
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Book Return Confirmation!</h1>
                    </div>
                    <div class="content">
                        <p class="intro">Dear %s,</p>
                        <p class="announcement">Thank you for returning the book! We appreciate your timeliness.</p>
                        <div class="book-details">
                            <h2>%s</h2>
                            <p><strong>Author:</strong> %s</p>
                            <p><strong>Genre:</strong> %s</p>
                            <p><strong>Borrow Date:</strong> %s</p>
                            <p><strong>Due Date:</strong> %s</p>
                            <p><strong>Returned Date:</strong> %s</p>
                        </div>
                        <p class="announcement">Attached is the book’s cover image for your reference. We hope you enjoyed your reading!</p>
                        <a href="%s" class="cta-button">Explore More Books</a>
                        <p class="closing">Thank you for being a valued member. We look forward to your next visit!</p>
                        <p class="closing">Warm Regards,<br>CSPLMS Team<br>Pokhara-29, Bhandardhik</p>
                    </div>
                    <div class="footer">
                        <p>© 2025 CSPLMS. All rights reserved. | <a href="%s">Visit our website</a></p>
                    </div>
                </div>
            </body>
            </html>
            """.formatted(
                    user.getName(),
                    book.getTitle(),
                    book.getAuthor() != null ? book.getAuthor() : "N/A",
                    book.getCategory() != null ? book.getCategory().getName() : "N/A",
                    borrowDate,
                    dueDate,
                    returnDate,
                    frontendBaseUrl,
                    frontendBaseUrl
            );

            // Fallback plain text
            String plainText = """
            Dear %s,
            
            Thank you for returning the book! We appreciate your timeliness.
            
            Book Details:
            Title: %s
            Author: %s
            Genre: %s
            Borrow Date: %s
            Due Date: %s
            Returned Date: %s
            
            Attached is the book’s cover image for your reference. We hope you enjoyed your reading!
            
            Explore more books here: %s/books
            
            Thank you for being a valued member. We look forward to your next visit!
            
            Warm Regards,
            CSPLMS Team
            Pokhara-29, Bhandardhik
            © 2025 CSPLMS. All rights reserved.
            """.formatted(
                    user.getName(),
                    book.getTitle(),
                    book.getAuthor() != null ? book.getAuthor() : "N/A",
                    book.getCategory() != null ? book.getCategory().getName() : "N/A",
                    borrowDate,
                    dueDate,
                    returnDate,
                    frontendBaseUrl
            );

            mimeMessageHelper.setText(plainText, htmlContent);
            mimeMessageHelper.addAttachment("Book - " + book.getTitle(), bookImage, "image/png");
            javaMailSender.send(mimeMessage);
        } catch (MailException | MessagingException ex) {
            logger.error("Failed to send book early returned confirmation mail: {}", ex.getMessage());
            throw new MailFailedException("Failed to send book returned confirmation mail");
        } catch (Exception ex) {
            logger.error("Unknown Server Error: {}", ex.getMessage());
            throw ex;
        }
    }

    @Override
    public void bookLateReturnedMailToMember(User user, Book book, Return returns, Fine fine) throws MailException, MailFailedException, MessagingException {
        try {
            // Validate inputs
            if (user == null || user.getEmail() == null || user.getName() == null) {
                throw new MailFailedException("User information cannot be null.");
            }
            if (book == null || book.getTitle() == null || book.getImageURL() == null) {
                throw new MailFailedException("Book information cannot be null.");
            }
            if (returns == null || returns.getBorrows() == null || returns.getBorrows().getBorrowDate() == null ||
                    returns.getBorrows().getDueDate() == null || returns.getReturnDate() == null) {
                throw new MailFailedException("Return or borrow information cannot be null.");
            }
            if (fine == null) {
                throw new MailFailedException("Fine information cannot be null.");
            }

            InputStreamSource bookImage = getImageAsInputStream(book.getImageURL());

            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            mimeMessageHelper.setFrom(from);
            mimeMessageHelper.setTo(user.getEmail());
            mimeMessageHelper.setSubject("Book Return Confirmation and Fine Notice!");

            // Format dates
            SimpleDateFormat dateFormat = new SimpleDateFormat("MMMM d, yyyy");
            String borrowDate = dateFormat.format(returns.getBorrows().getBorrowDate());
            String dueDate = dateFormat.format(returns.getBorrows().getDueDate());
            String returnDate = dateFormat.format(returns.getReturnDate());

            // Format fine amount
            DecimalFormat decimalFormat = new DecimalFormat("#,##0.00");
            String perDayRate = decimalFormat.format(perDayFineAmount);
            String totalFineAmount = decimalFormat.format(fine.getTotalFine());

            // HTML email content
            String htmlContent = """
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {
                        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                        font-size: 16px;
                        line-height: 1.6;
                        color: #333333;
                    }
                    .container {
                        max-width: 700px;
                        margin: 20px auto;
                        background-color: #ffffff;
                        border-radius: 8px !important;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        background-color: #206ea6;
                        color: #ffffff;
                        padding: 20px;
                        text-align: center;
                        border-top-left-radius: 8px;
                        border-top-right-radius: 8px;
                    }
                    .header h1 {
                        margin: 10px 0 0;
                        font-size: 26px;
                        font-weight: 600;
                    }
                    .content {
                        padding: 25px;
                    }
                    .intro {
                        font-size: 15px;
                        font-weight: 500;
                        margin-bottom: 10px;
                    }
                    .announcement {
                        font-size: 14px;
                        font-weight: 400;
                        margin-bottom: 10px;
                        line-height: 1.8;
                    }
                    .book-details {
                        margin: 20px 0;
                        background-color: #e6f0fa;
                        padding: 20px;
                        border-radius: 5px;
                    }
                    .book-details h2 {
                        font-family: Georgia, serif;
                        color: #206ea6;
                        font-size: 22px;
                        font-weight: normal;
                        margin: 0 0 10px;
                    }
                    .book-details p {
                        margin: 8px 0;
                        font-size: 15px;
                    }
                    .fine-details {
                        margin: 20px 0;
                        background-color: #ffe6e6;
                        padding: 20px;
                        border-radius: 5px;
                    }
                    .fine-details h2 {
                        font-family: Georgia, serif;
                        color: #a62020;
                        font-size: 22px;
                        font-weight: normal;
                        margin: 0 0 10px;
                    }
                    .fine-details p {
                        margin: 8px 0;
                        font-size: 15px;
                    }
                    .cta-button {
                        display: inline-block;
                        padding: 12px 25px;
                        margin: 20px 0;
                        background-color: #206ea6;
                        color: #ffffff !important;
                        text-decoration: none;
                        border-radius: 5px;
                        font-weight: 600;
                        text-align: center;
                    }
                    .closing {
                        font-size: 14px;
                        font-weight: 400;
                        margin-bottom: 10px;
                        line-height: 1.8;
                    }
                    .footer {
                        background-color: #f4f4f4;
                        padding: 15px;
                        text-align: center;
                        font-size: 13px;
                        color: #666666;
                        border-bottom-left-radius: 8px;
                        border-bottom-right-radius: 8px;
                    }
                    .footer a {
                        color: #206ea6;
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Book Return Confirmation!</h1>
                    </div>
                    <div class="content">
                        <p class="intro">Dear %s,</p>
                        <p class="announcement">Thank you for returning the book. We regret to inform you that the book was returned after the due date, resulting in a fine.</p>
                        <div class="book-details">
                            <h2>%s</h2>
                            <p><strong>Author:</strong> %s</p>
                            <p><strong>Genre:</strong> %s</p>
                            <p><strong>Borrow Date:</strong> %s</p>
                            <p><strong>Due Date:</strong> %s</p>
                            <p><strong>Returned Date:</strong> %s</p>
                        </div>
                        <div class="fine-details">
                            <h2>Fine Details</h2>
                            <p><strong>Per Day Rate:</strong> Rs. %s</p>
                            <p><strong>Total Fine Amount:</strong> Rs. %s</p>
                        </div>
                        <p class="announcement">Attached is the book’s cover image for your reference. Please complete the fine as soon as possbile to continue enjoying our library services.</p>
                        <a href="%s/member/profile/fines" class="cta-button">View Fine Details</a>
                        <p class="closing">We appreciate your understanding and continued support. Thank you for being a valued member.</p>
                        <p class="closing">Warm Regards,<br>CSPLMS Team<br>Pokhara-29, Bhandardhik</p>
                    </div>
                    <div class="footer">
                        <p>© 2025 CSPLMS. All rights reserved. | <a href="%s">Visit our website</a></p>
                    </div>
                </div>
            </body>
            </html>
            """.formatted(
                    user.getName(),
                    book.getTitle(),
                    book.getAuthor() != null ? book.getAuthor() : "N/A",
                    book.getCategory() != null ? book.getCategory().getName() : "N/A",
                    borrowDate,
                    dueDate,
                    returnDate,
                    perDayRate,
                    totalFineAmount,
                    frontendBaseUrl,
                    frontendBaseUrl
            );

            // Fallback plain text
            String plainText = """
            Dear %s,
            
            Thank you for returning your book to the CSPLMS collection. We regret to inform you that the book was returned after the due date, resulting in a fine.
            
            Book Details:
            Title: %s
            Author: %s
            Genre: %s
            Borrow Date: %s
            Due Date: %s
            Returned Date: %s
            
            Fine Details:
            Per Day Rate: Rs. %s
            Fine Amount: Rs. %s
            
            Attached is the book’s cover image for your reference. Please settle the fine at your earliest convenience to continue enjoying our library services.
            
            View fine details here: %s/member/profile/fines
            
            We appreciate your understanding and continued support. Thank you for being a valued member of CSPLMS.
            
            Warm Regards,
            CSPLMS Team
            Pokhara-29, Bhandardhik
            © 2025 CSPLMS. All rights reserved.
            """.formatted(
                    user.getName(),
                    book.getTitle(),
                    book.getAuthor() != null ? book.getAuthor() : "N/A",
                    book.getCategory() != null ? book.getCategory().getName() : "N/A",
                    borrowDate,
                    dueDate,
                    returnDate,
                    perDayRate,
                    totalFineAmount,
                    frontendBaseUrl
            );

            mimeMessageHelper.setText(plainText, htmlContent);
            mimeMessageHelper.addAttachment("Book Cover - " + book.getTitle(), bookImage, "image/png");
            javaMailSender.send(mimeMessage);
        } catch (MailException | MessagingException ex) {
            throw new MailFailedException("Failed to send book late returned confirmation email");
        } catch (Exception ex) {
            throw ex;
        }
    }

    @Override
    public void dueDateExtendedMailToMember(User user, Book book, Borrow borrow) throws MailException, MailFailedException, MessagingException {
        try {
            // Validate inputs
            if (user == null || user.getEmail() == null || user.getName() == null) {
                throw new MailFailedException("User information cannot be null.");
            }
            if (book == null || book.getTitle() == null || book.getImageURL() == null) {
                throw new MailFailedException("Book information or image URL cannot be null.");
            }
            if (borrow == null || borrow.getBorrowDate() == null || borrow.getDueDate() == null) {
                throw new MailFailedException("Borrow information cannot be null.");
            }

            InputStreamSource bookImage = getImageAsInputStream(book.getImageURL());

            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            mimeMessageHelper.setFrom(from);
            mimeMessageHelper.setTo(user.getEmail());
            mimeMessageHelper.setSubject("Due Date Extension Confirmation for Your Borrowed Book!");

            // Format dates
            SimpleDateFormat dateFormat = new SimpleDateFormat("MMMM d, yyyy");
            String borrowDate = dateFormat.format(borrow.getBorrowDate());
            String dueDate = dateFormat.format(borrow.getDueDate());

            // HTML email content
            String htmlContent = """
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {
                        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                        font-size: 16px;
                        line-height: 1.6;
                        color: #333333;
                    }
                    .container {
                        max-width: 700px;
                        margin: 20px auto;
                        background-color: #ffffff;
                        border-radius: 8px !important;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        background-color: #206ea6;
                        color: #ffffff;
                        padding: 20px;
                        text-align: center;
                        border-top-left-radius: 8px;
                        border-top-right-radius: 8px;
                    }
                    .header h1 {
                        margin: 10px 0 0;
                        font-size: 26px;
                        font-weight: 600;
                    }
                    .content {
                        padding: 25px;
                    }
                    .intro {
                        font-size: 15px;
                        font-weight: 500;
                        margin-bottom: 10px;
                    }
                    .announcement {
                        font-size: 14px;
                        font-weight: 400;
                        margin-bottom: 10px;
                        line-height: 1.8;
                    }
                    .book-details {
                        margin: 20px 0;
                        background-color: #e6f0fa;
                        padding: 20px;
                        border-radius: 5px;
                    }
                    .book-details h2 {
                        font-family: Georgia, serif;
                        color: #206ea6;
                        font-size: 22px;
                        font-weight: normal;
                        margin: 0 0 10px;
                    }
                    .book-details p {
                        margin: 8px 0;
                        font-size: 15px;
                    }
                    .note {
                        margin: 20px 0;
                        background-color: #fff8e1;
                        padding: 15px;
                        border-radius: 5px;
                        font-size: 14px;
                        color: #856404;
                    }
                    .cta-button {
                        display: inline-block;
                        padding: 12px 25px;
                        margin: 20px 0;
                        background-color: #206ea6;
                        color: #ffffff !important;
                        text-decoration: none;
                        border-radius: 5px;
                        font-weight: 600;
                        text-align: center;
                    }
                    .closing {
                        font-size: 14px;
                        font-weight: 400;
                        margin-bottom: 10px;
                        line-height: 1.8;
                    }
                    .footer {
                        background-color: #f4f4f4;
                        padding: 15px;
                        text-align: center;
                        font-size: 13px;
                        color: #666666;
                        border-bottom-left-radius: 8px;
                        border-bottom-right-radius: 8px;
                    }
                    .footer a {
                        color: #206ea6;
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Due Date Extension Confirmation!</h1>
                    </div>
                    <div class="content">
                        <p class="intro">Dear %s,</p>
                        <p class="announcement">We are pleased to confirm that the due date for your borrowed book has been successfully extended.</p>
                        <div class="book-details">
                            <h2>%s</h2>
                            <p><strong>Author:</strong> %s</p>
                            <p><strong>Genre:</strong> %s</p>
                            <p><strong>Borrow Date:</strong> %s</p>
                            <p><strong>New Due Date:</strong> %s</p>
                        </div>
                        <div class="note">
                            <p><strong>Note:</strong> Please be aware that due date extensions are allowed only once per borrowing. Ensure the book is returned by the new due date to avoid any fines.</p>
                        </div>
                        <p class="announcement">Attached is the book’s cover image for your reference.</p>
                        <a href="%s/books/book/%s" class="cta-button">View Book Details</a>
                        <p class="closing">Enjoy your reading! Thank you for being a valued member.</p>
                        <p class="closing">Warm Regards,<br>CSPLMS Team<br>Pokhara-29, Bhandardhik</p>
                    </div>
                    <div class="footer">
                        <p>© 2025 CSPLMS. All rights reserved. | <a href="%s">Visit our website</a></p>
                    </div>
                </div>
            </body>
            </html>
            """.formatted(
                    user.getName(),
                    book.getTitle(),
                    book.getAuthor() != null ? book.getAuthor() : "N/A",
                    book.getCategory() != null ? book.getCategory().getName() : "N/A",
                    borrowDate,
                    dueDate,
                    frontendBaseUrl,
                    book.getBookId(),
                    frontendBaseUrl
            );

            // Fallback plain text
            String plainText = """
            Dear %s,
            
            We are pleased to confirm that the due date for your borrowed book has been successfully extended.
            
            Book Details:
            Title: %s
            Author: %s
            Genre: %s
            Borrow Date: %s
            New Due Date: %s
            
            Note: Please be aware that due date extensions are allowed only once per borrowing. Ensure the book is returned by the new due date to avoid any fines.
            
            Attached is the book’s cover image for your reference.
            
            View book details here: %s/books/book/%s
            
            Enjoy your reading! Thank you for being a valued member of CSPLMS.
            
            Warm Regards,
            CSPLMS Team
            Pokhara-29, Bhandardhik
            © 2025 CSPLMS. All rights reserved.
            """.formatted(
                    user.getName(),
                    book.getTitle(),
                    book.getAuthor() != null ? book.getAuthor() : "N/A",
                    book.getCategory() != null ? book.getCategory().getName() : "N/A",
                    borrowDate,
                    dueDate,
                    frontendBaseUrl,
                    book.getBookId()
            );

            mimeMessageHelper.setText(plainText, htmlContent);
            mimeMessageHelper.addAttachment("Book Cover - " + book.getTitle(), bookImage, "image/png");
            javaMailSender.send(mimeMessage);
        } catch (MailException | MessagingException ex) {
            throw new MailFailedException("Failed to send due date extended confirmation email");
        } catch (Exception ex) {
            throw ex;
        }
    }

    @Override
    public void borrowDeletedMailToMember(User user, Book book, Borrow borrow) throws MailException, MailFailedException, MessagingException {
        try {
            // Validate inputs
            if (user == null || user.getEmail() == null || user.getName() == null) {
                throw new MailFailedException("User information cannot be null.");
            }
            if (book == null || book.getTitle() == null || book.getImageURL() == null) {
                throw new MailFailedException("Book information or image URL cannot be null.");
            }
            if (borrow == null || borrow.getBorrowDate() == null) {
                throw new MailFailedException("Borrow information cannot be null.");
            }

            InputStreamSource bookImage = getImageAsInputStream(book.getImageURL());

            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            mimeMessageHelper.setFrom(from);
            mimeMessageHelper.setTo(user.getEmail());
            mimeMessageHelper.setSubject("Apology for Mistaken Borrow Record!");

            // Format dates
            SimpleDateFormat dateFormat = new SimpleDateFormat("MMMM d, yyyy");
            String borrowDate = dateFormat.format(borrow.getBorrowDate());

            // HTML email content
            String htmlContent = """
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {
                        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                        font-size: 16px;
                        line-height: 1.6;
                        color: #333333;
                    }
                    .container {
                        max-width: 700px;
                        margin: 20px auto;
                        background-color: #ffffff;
                        border-radius: 8px !important;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        background-color: #206ea6;
                        color: #ffffff;
                        padding: 20px;
                        text-align: center;
                        border-top-left-radius: 8px;
                        border-top-right-radius: 8px;
                    }
                    .header h1 {
                        margin: 10px 0 0;
                        font-size: 26px;
                        font-weight: 600;
                    }
                    .content {
                        padding: 25px;
                    }
                    .intro {
                        font-size: 15px;
                        font-weight: 500;
                        margin-bottom: 10px;
                    }
                    .announcement {
                        font-size: 14px;
                        font-weight: 400;
                        margin-bottom: 10px;
                        line-height: 1.8;
                    }
                    .book-details {
                        margin: 20px 0;
                        background-color: #e6f0fa;
                        padding: 20px;
                        border-radius: 5px;
                    }
                    .book-details h2 {
                        font-family: Georgia, serif;
                        color: #206ea6;
                        font-size: 22px;
                        font-weight: normal;
                        margin: 0 0 10px;
                    }
                    .book-details p {
                        margin: 8px 0;
                        font-size: 15px;
                    }
                    .note {
                        margin: 20px 0;
                        background-color: #fff8e1;
                        padding: 15px;
                        border-radius: 5px;
                        font-size: 14px;
                        color: #856404;
                    }
                    .cta-button {
                        display: inline-block;
                        padding: 12px 25px;
                        margin: 20px 0;
                        background-color: #206ea6;
                        color: #ffffff !important;
                        text-decoration: none;
                        border-radius: 5px;
                        font-weight: 600;
                        text-align: center;
                    }
                    .closing {
                        font-size: 14px;
                        font-weight: 400;
                        margin-bottom: 10px;
                        line-height: 1.8;
                    }
                    .footer {
                        background-color: #f4f4f4;
                        padding: 15px;
                        text-align: center;
                        font-size: 13px;
                        color: #666666;
                        border-bottom-left-radius: 8px;
                        border-bottom-right-radius: 8px;
                    }
                    .footer a {
                        color: #206ea6;
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Apology for Mistaken Borrow Record!</h1>
                    </div>
                    <div class="content">
                        <p class="intro">Dear %s,</p>
                        <p class="announcement">We sincerely apologize for the inconvenience caused. A book was mistakenly recorded as borrowed under your account and this record has been removed now.</p>
                        <div class="book-details">
                            <h2>%s</h2>
                            <p><strong>Author:</strong> %s</p>
                            <p><strong>Genre:</strong> %s</p>
                            <p><strong>Borrow Date:</strong> %s</p>
                        </div>
                        <div class="note">
                            <p><strong>Note:</strong> No action is required from you as the borrowing record has been corrected. Please contact us if you have any questions or need further assistance.</p>
                        </div>
                        <p class="announcement">Attached is the book’s cover image for your reference.</p>
                        <a href="%s" class="cta-button">Explore More Books</a>
                        <p class="closing">We value your presence and are committed to provide a seamless experience. Thank you for your understanding.</p>
                        <p class="closing">Warm Regards,<br>CSPLMS Team<br>Pokhara-29, Bhandardhik</p>
                    </div>
                    <div class="footer">
                        <p>© 2025 CSPLMS. All rights reserved. | <a href="%s">Visit our website</a></p>
                    </div>
                </div>
            </body>
            </html>
            """.formatted(
                    user.getName(),
                    book.getTitle(),
                    book.getAuthor() != null ? book.getAuthor() : "N/A",
                    book.getCategory() != null ? book.getCategory().getName() : "N/A",
                    borrowDate,
                    frontendBaseUrl,
                    frontendBaseUrl
            );

            // Fallback plain text
            String plainText = """
            Dear %s,
            
            We sincerely apologize for the inconvenience caused. A book was mistakenly recorded as borrowed under your name, and this record has been removed from your account.
            
            Book Details:
            Title: %s
            Author: %s
            Genre: %s
            Borrow Date: %s
            
            Note: No action is required from you, as the borrowing record has been corrected. Please contact us if you have any questions or need further assistance.
            
            Attached is the book’s cover image for your reference.
            
            Explore more books here: %s/books
            
            We value your membership and are committed to ensuring a seamless experience. Thank you for your understanding.
            
            Warm Regards,
            CSPLMS Team
            Pokhara-29, Bhandardhik
            © 2025 CSPLMS. All rights reserved.
            """.formatted(
                    user.getName(),
                    book.getTitle(),
                    book.getAuthor() != null ? book.getAuthor() : "N/A",
                    book.getCategory() != null ? book.getCategory().getName() : "N/A",
                    borrowDate,
                    frontendBaseUrl
            );

            mimeMessageHelper.setText(plainText, htmlContent);
            mimeMessageHelper.addAttachment("Book - " + book.getTitle(), bookImage, "image/png");
            javaMailSender.send(mimeMessage);
        } catch (MailException | MessagingException ex) {
            logger.error("Failed to send mistaken borrow record apology email: {}", ex.getMessage());
            throw new MailFailedException("Failed to send mistaken borrow record apology email");
        } catch (Exception ex) {
            logger.error("Unexpected Server Error: {}", ex.getMessage());
            throw ex;
        }
    }

    @Override
    public void finePaidMail(User user, Book book, Borrow borrow, Return bookReturn, Payment payment) throws MailException, MessagingException, MailFailedException {
        try {
            // Validate inputs
            if (user == null || user.getEmail() == null || user.getName() == null) {
                throw new MailFailedException("User information cannot be null.");
            }
            if (book == null || book.getTitle() == null || book.getImageURL() == null) {
                throw new MailFailedException("Book information or image URL cannot be null.");
            }
            if (borrow == null || borrow.getBorrowDate() == null || borrow.getDueDate() == null) {
                throw new MailFailedException("Borrow information cannot be null.");
            }
            if (bookReturn == null || bookReturn.getReturnDate() == null) {
                throw new MailFailedException("Book return information cannot be null.");
            }
            if (payment == null || payment.getAmount() == null || payment.getDate() == null) {
                throw new MailFailedException("Payment information cannot be null.");
            }

            InputStreamSource bookImage = getImageAsInputStream(book.getImageURL());

            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            mimeMessageHelper.setFrom(from);
            mimeMessageHelper.setTo(user.getEmail());
            mimeMessageHelper.setSubject("Thank You for Paying Your Fine!");

            // Format dates
            SimpleDateFormat dateFormat = new SimpleDateFormat("MMMM d, yyyy");
            String borrowDate = dateFormat.format(borrow.getBorrowDate());
            String dueDate = dateFormat.format(borrow.getDueDate());
            String returnDate = dateFormat.format(bookReturn.getReturnDate());
            String paymentDate = dateFormat.format(payment.getDate());

            // Format payment amount
            DecimalFormat decimalFormat = new DecimalFormat("#,##0.00");
            String paymentAmount = decimalFormat.format(payment.getAmount());

            // HTML email content
            String htmlContent = """
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {
                        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                        font-size: 16px;
                        line-height: 1.6;
                        color: #333333;
                    }
                    .container {
                        max-width: 700px;
                        margin: 20px auto;
                        background-color: #ffffff;
                        border-radius: 8px !important;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        background-color: #206ea6;
                        color: #ffffff;
                        padding: 20px;
                        text-align: center;
                        border-top-left-radius: 8px;
                        border-top-right-radius: 8px;
                    }
                    .header h1 {
                        margin: 10px 0 0;
                        font-size: 26px;
                        font-weight: 600;
                    }
                    .content {
                        padding: 25px;
                    }
                    .intro {
                        font-size: 15px;
                        font-weight: 500;
                        margin-bottom: 10px;
                    }
                    .announcement {
                        font-size: 14px;
                        font-weight: 400;
                        margin-bottom: 10px;
                        line-height: 1.8;
                    }
                    .book-details {
                        margin: 20px 0;
                        background-color: #e6f0fa;
                        padding: 20px;
                        border-radius: 5px;
                    }
                    .book-details h2 {
                        font-family: Georgia, serif;
                        color: #206ea6;
                        font-size: 22px;
                        font-weight: normal;
                        margin: 0 0 10px;
                    }
                    .book-details p {
                        margin: 8px 0;
                        font-size: 15px;
                    }
                    .payment-details {
                        margin: 20px 0;
                        background-color: #e6ffee;
                        padding: 20px;
                        border-radius: 5px;
                    }
                    .payment-details h2 {
                        font-family: Georgia, serif;
                        color: #206ea6;
                        font-size: 22px;
                        font-weight: normal;
                        margin: 0 0 10px;
                    }
                    .payment-details p {
                        margin: 8px 0;
                        font-size: 15px;
                    }
                    .cta-button {
                        display: inline-block;
                        padding: 12px 25px;
                        margin: 20px 0;
                        background-color: #206ea6;
                        color: #ffffff !important;
                        text-decoration: none;
                        border-radius: 5px;
                        font-weight: 600;
                        text-align: center;
                    }
                    .closing {
                        font-size: 14px;
                        font-weight: 400;
                        margin-bottom: 10px;
                        line-height: 1.8;
                    }
                    .footer {
                        background-color: #f4f4f4;
                        padding: 15px;
                        text-align: center;
                        font-size: 13px;
                        color: #666666;
                        border-bottom-left-radius: 8px;
                        border-bottom-right-radius: 8px;
                    }
                    .footer a {
                        color: #206ea6;
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Fine Payment Confirmation!</h1>
                    </div>
                    <div class="content">
                        <p class="intro">Dear %s,</p>
                        <p class="announcement">Thank you for clearing your fine. We appreciate your payment and continued support.</p>
                        <div class="book-details">
                            <h2>%s</h2>
                            <p><strong>Author:</strong> %s</p>
                            <p><strong>Genre:</strong> %s</p>
                            <p><strong>Borrow Date:</strong> %s</p>
                            <p><strong>Due Date:</strong> %s</p>
                            <p><strong>Returned Date:</strong> %s</p>
                        </div>
                        <div class="payment-details">
                            <h2>Payment Details</h2>
                            <p><strong>Amount Paid:</strong> %s</p>
                            <p><strong>Payment Date:</strong> %s</p>
                        </div>
                        <p class="announcement">Attached is the book’s cover image for your reference.</p>
                        <a href="%s" class="cta-button">Explore More Books</a>
                        <p class="closing">We value your presence and look forward to serving you again. Thank you for being a part of CSPLMS!</p>
                        <p class="closing">Warm Regards,<br>CSPLMS Team<br>Pokhara-29, Bhandardhik</p>
                    </div>
                    <div class="footer">
                        <p>© 2025 CSPLMS. All rights reserved. | <a href="%s">Visit our website</a></p>
                    </div>
                </div>
            </body>
            </html>
            """.formatted(
                    user.getName(),
                    book.getTitle(),
                    book.getAuthor() != null ? book.getAuthor() : "N/A",
                    book.getCategory() != null ? book.getCategory().getName() : "N/A",
                    borrowDate,
                    dueDate,
                    returnDate,
                    paymentAmount,
                    paymentDate,
                    frontendBaseUrl,
                    frontendBaseUrl
            );

            // Fallback plain text
            String plainText = """
            Dear %s,
            
            Thank you for settling your fine with CSPLMS. We appreciate your prompt payment and continued support.
            
            Book Details:
            Title: %s
            Author: %s
            Genre: %s
            Borrow Date: %s
            Due Date: %s
            Return Date: %s
            
            Payment Details:
            Amount Paid: Nrs. %s
            Payment Date: %s
            
            Attached is the book’s cover image for your reference.
            
            Explore more books here: %s/books
            
            We value your membership and look forward to serving you again. Thank you for being a part of CSPLMS!
            
            Warm Regards,
            CSPLMS Team
            Pokhara-29, Bhandardhik
            © 2025 CSPLMS. All rights reserved.
            """.formatted(
                    user.getName(),
                    book.getTitle(),
                    book.getAuthor() != null ? book.getAuthor() : "N/A",
                    book.getCategory() != null ? book.getCategory().getName() : "N/A",
                    borrowDate,
                    dueDate,
                    returnDate,
                    paymentAmount,
                    paymentDate,
                    frontendBaseUrl
            );

            mimeMessageHelper.setText(plainText, htmlContent);
            mimeMessageHelper.addAttachment("Book : " + book.getTitle(), bookImage, "image/png");
            javaMailSender.send(mimeMessage);
        } catch (MailException | MessagingException ex) {
            logger.error("Failed to send fine paid mail: {}", ex.getMessage());
            throw new MailFailedException("Failed to send fine paid confirmation email");
        } catch (Exception ex) {
            logger.error("Unexpected Server Error: {}", ex.getMessage());
            throw ex;
        }
    }

    @Override
    public void librarianAddedMailToLibrarian(User librarianUser, Evidence evidence, String librarianPassword) throws MailException, MessagingException, MailFailedException {
        try {
            // Validate inputs
            if (librarianUser == null || librarianUser.getEmail() == null || librarianUser.getName() == null) {
                throw new MailFailedException("Librarian information cannot be null.");
            }
            if (evidence == null || evidence.getUserImage() == null || evidence.getEvidenceOne() == null || evidence.getEvidenceTwo() == null) {
                throw new MailFailedException("Evidence images cannot be null.");
            }

            InputStreamSource userImage = getImageAsInputStream(evidence.getUserImage());
            InputStreamSource evidenceOne = getImageAsInputStream(evidence.getEvidenceOne());
            InputStreamSource evidenceTwo = getImageAsInputStream(evidence.getEvidenceTwo());

            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            mimeMessageHelper.setFrom(from);
            mimeMessageHelper.setTo(librarianUser.getEmail());
            mimeMessageHelper.setSubject("Welcome to CSPLMS Teams!");

            // HTML email content
            String htmlContent = """
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body {
                            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                            background-color: #f4f4f4;
                            margin: 0;
                            padding: 0;
                            font-size: 16px;
                            line-height: 1.6;
                            color: #333333;
                        }
                        .container {
                            max-width: 700px;
                            margin: 20px auto;
                            background-color: #ffffff;
                            border-radius: 8px !important;
                            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            background-color: #206ea6;
                            color: #ffffff;
                            padding: 20px;
                            text-align: center;
                            border-top-left-radius: 8px;
                            border-top-right-radius: 8px;
                        }
                        .header h1 {
                            margin: 10px 0 0;
                            font-size: 26px;
                            font-weight: 600;
                        }
                        .content {
                            padding: 25px;
                        }
                        .intro {
                            font-size: 15px;
                            font-weight: 500;
                            margin-bottom: 10px;
                        }
                        .announcement {
                            font-size: 14px;
                            font-weight: 400;
                            margin-bottom: 10px;
                            line-height: 1.8;
                        }
                        .credentials {
                            margin: 20px 0;
                            background-color: #e6f0fa;
                            padding: 20px;
                            border-radius: 5px;
                        }
                        .credentials h2 {
                            font-family: Georgia, serif;
                            color: #206ea6;
                            font-size: 22px;
                            font-weight: normal;
                            margin: 0 0 10px;
                        }
                        .credentials p {
                            margin: 8px 0;
                            font-size: 15px;
                        }
                        .cta-button {
                            display: inline-block;
                            padding: 10px 22px;
                            margin: 7px 0;
                            background-color: #206ea6;
                            color: #ffffff !important;
                            text-decoration: none;
                            border-radius: 5px;
                            font-weight: 600;
                            text-align: center;
                        }
                        .closing {
                            font-size: 12px;
                            font-weight: 400;
                            margin-bottom: 7px;
                            line-height: 1.8;
                        }
                        .footer {
                            background-color: #f4f4f4;
                            padding: 15px;
                            text-align: center;
                            font-size: 13px;
                            color: #666666;
                            border-bottom-left-radius: 8px;
                            border-bottom-right-radius: 8px;
                        }
                        .footer a {
                            color: #206ea6;
                            text-decoration: none;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Welcome to CSPLMS!</h1>
                        </div>
                        <div class="content">
                            <p class="intro">Dear %s,</p>
                            <p class="announcement">We are thrilled to welcome you to the CSPLMS team as a librarian!</p>
                            <p class="announcement">Your account has been successfully created by our system administrator. You can now log in to the system to begin managing library resources.</p>
                            <div class="credentials">
                                <h2>Your Login Credentials</h2>
                                <p><strong>Email:</strong> %s</p>
                                <p><strong>Password:</strong> %s</p>
                            </div>
                            <p class="announcement">Attached are your picture and the two supporting documents provided during registration. Please review them for accuracy.</p>
                            <a href="%s" class="cta-button">Log In</a>
                            <p class="closing">We look forward to your contributions at the library. Thank you for joining us!</p>
                            <p class="closing">Warm Regards,<br>CSPLMS Team<br>Pokhara-29, Bhandardhik</p>
                        </div>
                        <div class="footer">
                            <p>© 2025 CSPLMS. All rights reserved. | <a href="%s">Visit our website</a></p>
                        </div>
                    </div>
                </body>
                </html>
                """.formatted(
                    librarianUser.getName(),
                    librarianUser.getEmail(),
                    librarianPassword,
                    frontendBaseUrl,
                    frontendBaseUrl
            );

            // Fallback plain text
            String plainText = """
                Dear %s,
                
                We are thrilled to welcome you as a new librarian to the CSPLMS team!
                
                Your account has been successfully created by our system administrator. You can now log in to the system to begin managing library resources.
                
                Your Login Credentials:
                Email: %s
                Password: %s
                
                Attached are your picture and the two supporting documents provided during registration. Please review them for accuracy.
                
                Log in here: %s
                
                We look forward to your contributions to our library community. Thank you for joining us!
                
                Warm Regards,
                CSPLMS Team
                Pokhara-29, Bhandardhik
                © 2025 CSPLMS. All rights reserved.
                """.formatted(
                    librarianUser.getName(),
                    librarianUser.getEmail(),
                    librarianPassword,
                    frontendBaseUrl
            );

            mimeMessageHelper.setText(plainText, htmlContent);
            mimeMessageHelper.addAttachment("Profile Image - " + librarianUser.getName(), userImage, "image/png");
            mimeMessageHelper.addAttachment("Evidence One - " + librarianUser.getName(), evidenceOne, "image/png");
            mimeMessageHelper.addAttachment("Evidence Two - " + librarianUser.getName(), evidenceTwo, "image/png");

            javaMailSender.send(mimeMessage);
            logger.info("Librarian added email sent successfully to: {}", librarianUser.getEmail());
        } catch (MailException | MessagingException ex) {
            logger.error("Failed to send librarian added email: {}", ex.getMessage());
            throw new MailFailedException("Failed to send librarian welcome email");
        } catch (Exception ex) {
            logger.error("Unexpected error in librarian added email: {} {} {}", ex.getMessage(), ex.getCause(), ex.getLocalizedMessage());
            throw ex;
        }
    }

    @Override
    public void librarianAddedMailToAdmin(User librarianUser, Evidence evidence) throws MailException, MessagingException, MailFailedException {
        try {
            // Validate inputs
            if (librarianUser == null || librarianUser.getName() == null || librarianUser.getEmail() == null) {
                throw new MailFailedException("Librarian user information cannot be null.");
            }
            if (evidence == null || evidence.getUserImage() == null || evidence.getEvidenceOne() == null || evidence.getEvidenceTwo() == null) {
                throw new MailFailedException("Evidence images cannot be null.");
            }
            if (adminMail == null || adminName == null) {
                throw new MailFailedException("Admin email or name cannot be null.");
            }

            InputStreamSource userImage = getImageAsInputStream(evidence.getUserImage());
            InputStreamSource evidenceOne = getImageAsInputStream(evidence.getEvidenceOne());
            InputStreamSource evidenceTwo = getImageAsInputStream(evidence.getEvidenceTwo());

            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            mimeMessageHelper.setFrom(from);
            mimeMessageHelper.setTo(adminMail);
            mimeMessageHelper.setSubject("New Librarian Added to CSPLMS!");

            // HTML email content
            String htmlContent = """
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {
                        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                        font-size: 16px;
                        line-height: 1.6;
                        color: #333333;
                    }
                    .container {
                        max-width: 700px;
                        margin: 20px auto;
                        background-color: #ffffff;
                        border-radius: 8px !important;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        background-color: #206ea6;
                        color: #ffffff;
                        padding: 20px;
                        text-align: center;
                        border-top-left-radius: 8px;
                        border-top-right-radius: 8px;
                    }
                    .header h1 {
                        margin: 10px 0 0;
                        font-size: 26px;
                        font-weight: 600;
                    }
                    .content {
                        padding: 25px;
                    }
                    .intro {
                        font-size: 15px;
                        font-weight: 500;
                        margin-bottom: 10px;
                    }
                    .announcement {
                        font-size: 14px;
                        font-weight: 400;
                        margin-bottom: 10px;
                        line-height: 1.8;
                    }
                    .librarian-details {
                        margin: 20px 0;
                        background-color: #e6f0fa;
                        padding: 20px;
                        border-radius: 5px;
                    }
                    .librarian-details h2 {
                        font-family: Georgia, serif;
                        color: #206ea6;
                        font-size: 22px;
                        font-weight: normal;
                        margin: 0 0 10px;
                    }
                    .librarian-details p {
                        margin: 8px 0;
                        font-size: 15px;
                    }
                    .cta-button {
                        display: inline-block;
                        padding: 12px 25px;
                        margin: 20px 0;
                        background-color: #206ea6;
                        color: #ffffff !important;
                        text-decoration: none;
                        border-radius: 5px;
                        font-weight: 600;
                        text-align: center;
                    }
                    .closing {
                        font-size: 14px;
                        font-weight: 400;
                        margin-bottom: 10px;
                        line-height: 1.8;
                    }
                    .footer {
                        background-color: #f4f4f4;
                        padding: 15px;
                        text-align: center;
                        font-size: 13px;
                        color: #666666;
                        border-bottom-left-radius: 8px;
                        border-bottom-right-radius: 8px;
                    }
                    .footer a {
                        color: #206ea6;
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>New Librarian Added!</h1>
                    </div>
                    <div class="content">
                        <p class="intro">Dear %s,</p>
                        <p class="announcement">We are pleased to confirm that a new librarian account has been successfully added to the CSPLMS.</p>
                        <div class="librarian-details">
                            <h2>Librarian Details</h2>
                            <p><strong>Name:</strong> %s</p>
                            <p><strong>Email:</strong> %s</p>
                            <p><strong>Contact:</strong> %s</p>
                        </div>
                        <p class="announcement">Attached are the librarian's picture and the two supporting documents provided during registration. Please review them for accuracy.</p>
                        <a href="%s/admin/librarians" class="cta-button">View Librarian</a>
                        <p class="closing">Thank you for overseeing the CSPLMS.</p>
                        <p class="closing">Best Regards,<br>CSPLMS Team<br>Pokhara-29, Bhandardhik</p>
                    </div>
                    <div class="footer">
                        <p>© 2025 CSPLMS. All rights reserved. | <a href="%s">Visit our website</a></p>
                    </div>
                </div>
            </body>
            </html>
            """.formatted(
                    adminName,
                    librarianUser.getName(),
                    librarianUser.getEmail(),
                    librarianUser.getContactNumber() != null ? librarianUser.getContactNumber() : "N/A",
                    frontendBaseUrl,
                    frontendBaseUrl
            );

            // Fallback plain text
            String plainText = """
            Dear %s,
            
            This is to confirm that a new librarian account has been successfully added to the System.
            
            Librarian Details:
            Name: %s
            Email: %s
            Contact: %s
            
            Attached are the librarian's picture and the two supporting documents provided during registration. Please review them for accuracy.
            
            View the librarian here: %s/admin/librarians
            
            Thank you for overseeing the CSPLMS.
            
            Best Regards,
            CSPLMS Team
            Pokhara-29, Bhandardhik
            © 2025 CSPLMS. All rights reserved.
            """.formatted(
                    adminName,
                    librarianUser.getName(),
                    librarianUser.getEmail(),
                    librarianUser.getContactNumber() != null ? librarianUser.getContactNumber() : "N/A",
                    frontendBaseUrl
            );

            mimeMessageHelper.setText(plainText, htmlContent);
            mimeMessageHelper.addAttachment("Profile Image - " + librarianUser.getName(), userImage, "image/png");
            mimeMessageHelper.addAttachment("Evidence One - " + librarianUser.getName(), evidenceOne, "image/png");
            mimeMessageHelper.addAttachment("Evidence Two - " + librarianUser.getName(), evidenceTwo, "image/png");
            javaMailSender.send(mimeMessage);
        } catch (MailException | MessagingException ex) {
            throw new MailFailedException("Failed to send librarian added notification email");
        } catch (Exception ex) {
            throw ex;
        }
    }

}
