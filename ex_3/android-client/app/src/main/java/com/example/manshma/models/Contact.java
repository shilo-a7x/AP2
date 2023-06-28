package com.example.manshma.models;

import androidx.annotation.NonNull;
import androidx.room.Embedded;
import androidx.room.Entity;
import androidx.room.Ignore;
import androidx.room.PrimaryKey;
import androidx.room.RoomWarnings;

@SuppressWarnings({RoomWarnings.PRIMARY_KEY_FROM_EMBEDDED_IS_DROPPED,
                   RoomWarnings.INDEX_FROM_EMBEDDED_ENTITY_IS_DROPPED})
@Entity(tableName = "contacts")
public class Contact {

    @PrimaryKey
    @NonNull
    private String id;
    @Embedded(prefix = "user_")
    private User user;
    @Embedded(prefix = "last_message_")
    private Message lastMessage;

    public Contact(@NonNull String id, User user, Message lastMessage) {
        this.id = id;
        this.user = user;
        this.lastMessage = lastMessage;
    }

    @Ignore
    public Contact(@NonNull String id, User user) {
        this.id = id;
        this.user = user;
        this.lastMessage = null;
    }

    @NonNull
    public String getId() {
        return id;
    }

    public void setId(@NonNull String id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Message getLastMessage() {
        return lastMessage;
    }

    public void setLastMessage(Message lastMessage) {
        this.lastMessage = lastMessage;
    }
}
