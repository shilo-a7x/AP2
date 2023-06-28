package com.example.manshma.database;

import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.OnConflictStrategy;
import androidx.room.Query;

import com.example.manshma.models.Message;

import java.util.List;

@Dao
public interface MessageDao {
    @Query("SELECT * FROM messages")
    List<Message> getAllMessages();

    @Query("SELECT * FROM messages WHERE contactId = :contactId")
    List<Message> getMessagesByContactId(int contactId);

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void insertMessage(Message... message);

    // Add other necessary CRUD operations
}
