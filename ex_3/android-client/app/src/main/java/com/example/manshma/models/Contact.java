package com.example.manshma.models;

import androidx.annotation.NonNull;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity(tableName = "contacts")
public class Contact {

    @PrimaryKey
    @NonNull
    private String id;
    private User user;
    private Message lastMessage;

    public Contact(@NonNull String id, User user, Message lastMessage) {
        this.id = id;
        this.user = user;
        this.lastMessage = lastMessage;
    }

    public Contact(@NonNull String id, User user) {
        this.id = id;
        this.user = user;
        this.lastMessage = null;
    }
}
