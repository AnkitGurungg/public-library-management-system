package com.csplms.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import com.csplms.dto.responseAPI.ResponseAPI;
import org.springframework.http.ResponseEntity;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import com.fasterxml.jackson.databind.JsonMappingException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.servlet.resource.NoResourceFoundException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(ResourceEntityNotFoundException.class)
    public ResponseEntity<ResponseAPI> resourceNotFoundException(ResourceEntityNotFoundException ex) {
        return new ResponseEntity<>(new ResponseAPI(ex.getMessage(), false), HttpStatus.OK);
    }

    @ExceptionHandler(ResourceListNotFoundException.class)
    public ResponseEntity<ResponseAPI> nullExceptionHandler(ResourceListNotFoundException ex) {
        return new ResponseEntity<>(new ResponseAPI(ex.getMessage(), false), HttpStatus.OK);
    }

    @ExceptionHandler(IndexBoundsException.class)
    public ResponseEntity<ResponseAPI> indexBoundsExceptionHandler(IndexBoundsException ex) {
        return new ResponseEntity<>(new ResponseAPI(ex.getMessage(), false), HttpStatus.PAYLOAD_TOO_LARGE);
    }

    @ExceptionHandler(ResourceAlreadyExistsException.class)
    public ResponseEntity<ResponseAPI> resourceAlreadyExistsExceptionHandler(ResourceAlreadyExistsException ex) {
        return new ResponseEntity<>(new ResponseAPI(ex.getMessage(), false), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(BorrowException.class)
    public ResponseEntity<ResponseAPI> borrowExceptionHandler(BorrowException ex) {
        return new ResponseEntity<>(new ResponseAPI(ex.getMessage(), false), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidBorrowException.class)
    public ResponseEntity<ResponseAPI> invalidBorrowExceptionHandler(InvalidBorrowException ex) {
        return new ResponseEntity<>(new ResponseAPI(ex.getMessage(), false), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ForeignKeyViolationException.class)
    public ResponseEntity<ResponseAPI> foreignKeyViolationExceptionHandler(ForeignKeyViolationException ex) {
        return new ResponseEntity<>(new ResponseAPI(ex.getMessage(), false), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(NotAvailableException.class)
    public ResponseEntity<ResponseAPI> notAvailableExceptionHandler(NotAvailableException ex) {
        return new ResponseEntity<>(new ResponseAPI(ex.getMessage(), false), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(UserNotPresentException.class)
    public ResponseEntity<ResponseAPI> userNotFoundExceptionHandler(UserNotPresentException ex) {
        return new ResponseEntity<>(new ResponseAPI(ex.getMessage(), false), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(JsonMappingException.class)
    public ResponseEntity<ResponseAPI> jsonMappingExceptionHandler(JsonMappingException ex) {
        return new ResponseEntity<>(new ResponseAPI(ex.getMessage(), false), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ResponseAPI> unauthorizedExceptionHandler(UnauthorizedException ex) {
        return new ResponseEntity<>(new ResponseAPI(ex.getMessage(), false), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(UniqueKeyViolationException.class)
    public ResponseEntity<ResponseAPI> uniqueKeyViolationExceptionHandler(UniqueKeyViolationException ex) {
        return new ResponseEntity<>(new ResponseAPI(ex.getMessage(), false), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(MailFailedException.class)
    public ResponseEntity<ResponseAPI> mailExceptionHandler(MailFailedException ex) {
        return new ResponseEntity<>(new ResponseAPI(ex.getMessage(), false), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(PasswordNotMatchedException.class)
    public ResponseEntity<ResponseAPI> passwordChangeExceptionHandler(PasswordNotMatchedException ex) {
        return new ResponseEntity<>(new ResponseAPI(ex.getMessage(), false), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ResponseAPI> badCredentialsExceptionExceptionHandler(BadCredentialsException ex) {
        return new ResponseEntity<>(new ResponseAPI("Invalid username or password", false), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<ResponseAPI> expiredJwtExceptionHandler(ExpiredJwtException ex) {
        return new ResponseEntity<>(new ResponseAPI(ex.getMessage(), false), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler({ MalformedJwtException.class, UnsupportedJwtException.class, SignatureException.class })
    public ResponseEntity<ResponseAPI> jwtExceptionHandler(Exception ex) {
        return new ResponseEntity<>(new ResponseAPI("Invalid token", false), HttpStatus.NOT_ACCEPTABLE);
    }

    @ExceptionHandler(OTPTimeFailedException.class)
    public ResponseEntity<ResponseAPI> otpTimeFailedExceptionHandler(OTPTimeFailedException ex) {
        return new ResponseEntity<>(new ResponseAPI(ex.getMessage(), false), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(MailNotVerifiedException.class)
    public ResponseEntity<ResponseAPI> otpTimeFailedExceptionHandler(MailNotVerifiedException ex) {
        return new ResponseEntity<>(new ResponseAPI(ex.getMessage(), false), HttpStatus.PRECONDITION_REQUIRED);
    }

    @ExceptionHandler(UpdateBookException.class)
    public ResponseEntity<ResponseAPI> updateBookExceptionHandler(UpdateBookException ex) {
        return new ResponseEntity<>(new ResponseAPI(ex.getMessage(), false), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(UpdateShelfException.class)
    public ResponseEntity<ResponseAPI> UpdateShelfExceptionHandler(UpdateShelfException ex) {
        return new ResponseEntity<>(new ResponseAPI(ex.getMessage(), false), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(KhaltiPaymentInitiateFailedException.class)
    public ResponseEntity<ResponseAPI> initiateKhaltiPaymentExceptionHandler(KhaltiPaymentInitiateFailedException ex) {
        return new ResponseEntity<>(new ResponseAPI(ex.getMessage(), ex.isStatus()), HttpStatus.SERVICE_UNAVAILABLE);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseAPI> exceptionHandler(Exception ex) {
        System.err.println("EX: " + ex);

        if (ex instanceof AuthorizationDeniedException authorizationDeniedException){
            logger.warn(authorizationDeniedException.getMessage());
            return new ResponseEntity<>(new ResponseAPI(authorizationDeniedException.getMessage(), false), HttpStatus.FORBIDDEN);
        }

        if (ex instanceof NoResourceFoundException noResourceFoundException){
            return new ResponseEntity<>(new ResponseAPI(noResourceFoundException.getMessage(), false), HttpStatus.NOT_FOUND);
        }

        if (ex instanceof HttpRequestMethodNotSupportedException hrmnse) {
            return new ResponseEntity<>(new ResponseAPI(hrmnse.getMessage(), false), HttpStatus.METHOD_NOT_ALLOWED);
        }

        if (ex instanceof DataIntegrityViolationException dive){
            if (dive.getMostSpecificCause().toString().contains("uk_email")){
                return new ResponseEntity<>(new ResponseAPI("Already used email", false), HttpStatus.CONFLICT);
            }
            if (dive.getMostSpecificCause().toString().contains("uk_shelf_name")){
                return new ResponseEntity<>(new ResponseAPI("Name already used", false), HttpStatus.CONFLICT);
            }
            return new ResponseEntity<>(new ResponseAPI(ex.getMessage(), false), HttpStatus.CONFLICT);
        }
        if (ex instanceof UsernameNotFoundException usernameNotFoundException){
            return new ResponseEntity<>(new ResponseAPI(usernameNotFoundException.getMessage(), false), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(new ResponseAPI(ex.getMessage(), false), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
