package com.example.manshma.repositories;

import android.content.Context;

import androidx.lifecycle.MutableLiveData;

import com.example.manshma.database.AppDatabase;
import com.example.manshma.database.ContactDao;
import com.example.manshma.database.MessageDao;
import com.example.manshma.models.Contact;
import com.example.manshma.models.Message;

import java.util.LinkedList;
import java.util.List;

public class ChatRepository {

    private ContactDao contactDao;
    private MessageDao messageDao;
    private ContactListData contactListData;
    private MessageListData messageListData;


    public ChatRepository(Context context) {
        AppDatabase database = AppDatabase.getInstance(context);
        this.contactDao = database.getContactDao();
        this.messageDao = database.getMessageDao();
        this.contactListData = new ContactListData();
        this.messageListData = new MessageListData();
    }

    public void addContact(Contact contact) {
        contactDao.insertContact(contact);
        List<Contact> contactList = this.contactListData.getValue();
        if (contactList == null) {
            contactList = new LinkedList<>();
        }
        contactList.add(contact);
        this.contactListData.setValue(contactList);
    }

    public void addMessage(Message message) {
        messageDao.insertMessage(message);
        List<Message> messageList = this.messageListData.getValue();
        if (messageList == null) {
            messageList = new LinkedList<>();
        }
        messageList.add(message);
        this.messageListData.setValue(messageList);
    }

    public MutableLiveData<List<Contact>> getContactListData() {
        return contactListData;
    }

    public MutableLiveData<List<Message>> getMessageListData() {
        return messageListData;
    }

    class ContactListData extends MutableLiveData<List<Contact>> {
        public ContactListData() {
            super();
            setValue(new LinkedList<>());
        }

        @Override
        protected void onActive() {
            super.onActive();
            new Thread(() -> postValue(contactDao.getAllContacts())).start();
        }
    }
    class MessageListData extends MutableLiveData<List<Message>> {
        public MessageListData() {
            super();
            setValue(new LinkedList<>());
        }

        @Override
        protected void onActive() {
            super.onActive();
            new Thread(() -> postValue(messageDao.getAllMessages())).start();
        }
    }


}
