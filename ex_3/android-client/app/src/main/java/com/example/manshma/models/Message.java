package com.example.manshma.models;

import androidx.annotation.NonNull;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity(tableName = "messages")
public class Message {

    @PrimaryKey
    @NonNull
    private String id;

    @NonNull
    private String contactId;

    private String content;

    private String created;

    private User sender;

}
