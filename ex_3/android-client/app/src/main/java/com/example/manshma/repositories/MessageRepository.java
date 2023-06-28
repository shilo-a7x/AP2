package com.example.manshma.repositories;

import android.content.Context;

import androidx.lifecycle.MutableLiveData;

import com.example.manshma.database.AppDatabase;
import com.example.manshma.database.MessageDao;
import com.example.manshma.models.Message;

import java.util.LinkedList;
import java.util.List;

public class MessageRepository {

    private MessageDao messageDao;
    private MessageListData messageListData;


    public MessageRepository(Context context) {
        AppDatabase database = AppDatabase.getInstance(context);
        this.messageDao = database.getMessageDao();
        this.messageListData = new MessageListData();
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

    public MutableLiveData<List<Message>> getMessageListData() {
        return messageListData;
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
