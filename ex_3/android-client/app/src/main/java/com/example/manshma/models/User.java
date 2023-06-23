package com.example.manshma.models;

public class User {
    private String username;
    private String password;
    private String displayName;
    private String profilePic;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
        this.displayName = null;
        this.profilePic = null;
    }

    public User(String username, String password, String displayName, String profilePic) {
        this.username = username;
        this.password = password;
        this.displayName = displayName;
        this.profilePic = profilePic;
    }
}
