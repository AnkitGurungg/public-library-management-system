package com.csplms.constant;

public class S3Constants {
    public static final String FORWARD_SLASH = "/";

    // Base folders inside the bucket
    public static final String IMAGES_FOLDER = "images/";

    // Subfolders
    public static final String USERS_FOLDER = "users/";
    public static final String BOOKS_FOLDER = "books/";
    public static final String EVIDENCES_FOLDER = "evidences/";

    // Full paths
    public static final String USERS_IMAGE_FOLDER = IMAGES_FOLDER + USERS_FOLDER;
    public static final String BOOKS_IMAGE_FOLDER = IMAGES_FOLDER + BOOKS_FOLDER;
}
