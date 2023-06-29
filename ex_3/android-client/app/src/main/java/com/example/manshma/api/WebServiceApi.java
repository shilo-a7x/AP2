package com.example.manshma.api;

import com.example.manshma.models.Contact;
import com.example.manshma.models.Message;
import com.example.manshma.models.SendMessage;
import com.example.manshma.models.User;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.Headers;
import retrofit2.http.POST;
import retrofit2.http.Path;


public interface WebServiceApi {
    @POST("/api/Users")
    Call<Void> register(@Body User user);

    @POST("/api/Tokens")
    Call<String> login(@Body User user);

    @GET("/api/Users/{username}")
    Call<User> getUser(@Path("username") String username, @Header("Authorization") String token);

    @GET("/api/Chats")
    Call<List<Contact>> getContacts();

    @POST("/api/Chats")
    Call<Contact> addContact(@Body User contact);

    @GET("/api/Chats/{id}/Messages")
    Call<List<Message>> getMessages(@Path("id") String chatId);

    @GET("/api/Chats/{id}/Messages")
    Call<Message> sendMessage(@Path("id") String chatId, SendMessage msg);
}
