package com.example.manshma.database;

import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.OnConflictStrategy;
import androidx.room.Query;

import com.example.manshma.models.Contact;

import java.util.List;

@Dao
public interface ContactDao {
    @Query("SELECT * FROM contacts")
    List<Contact> getAllContacts();

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void insertContact(Contact... contact);

}
