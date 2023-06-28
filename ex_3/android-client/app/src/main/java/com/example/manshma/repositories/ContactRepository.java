package com.example.manshma.repositories;

import android.content.Context;

import androidx.lifecycle.MutableLiveData;

import com.example.manshma.api.ContactApi;
import com.example.manshma.database.AppDatabase;
import com.example.manshma.database.ContactDao;
import com.example.manshma.database.MessageDao;
import com.example.manshma.models.Contact;
import com.example.manshma.models.Message;

import java.util.LinkedList;
import java.util.List;

public class ContactRepository {

    private ContactDao contactDao;
    private ContactListData contactListData;

    private ContactApi contactApi;


    public ContactRepository(Context context) {
        AppDatabase database = AppDatabase.getInstance(context);
        this.contactDao = database.getContactDao();
        this.contactListData = new ContactListData();
        this.contactApi = new ContactApi(context);
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




    public MutableLiveData<List<Contact>> getContactListData() {
        return contactListData;
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


}
