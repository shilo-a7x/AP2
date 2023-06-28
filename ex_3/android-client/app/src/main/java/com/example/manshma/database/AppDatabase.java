package com.example.manshma.database;

import android.content.Context;

import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;

import com.example.manshma.models.Contact;
import com.example.manshma.models.Message;

@Database(entities = {Contact.class, Message.class}, version = 1)
public abstract class AppDatabase extends RoomDatabase {

    private static final String APP_DATABASE_NAME = "app_database";

    private static AppDatabase instance;

    public abstract ContactDao getContactDao();
    public abstract MessageDao getMessageDao();

    public static synchronized AppDatabase getInstance(Context context) {
        if (instance == null) {
            instance = Room.databaseBuilder(context.getApplicationContext(),
                                            AppDatabase.class, APP_DATABASE_NAME)
                           .fallbackToDestructiveMigration()
                           .build();
        }
        return instance;
    }

    public static void destroyInstance(Context context) {
        if (instance != null) {
            instance.close();
            instance = null;
            context.deleteDatabase(APP_DATABASE_NAME);
        }
    }
}
