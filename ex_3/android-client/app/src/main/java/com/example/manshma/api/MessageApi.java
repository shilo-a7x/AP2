package com.example.manshma.api;

import android.content.Context;

import androidx.annotation.NonNull;

import com.example.manshma.models.Contact;
import com.example.manshma.models.Message;
import com.example.manshma.models.SendMessage;
import com.example.manshma.preferences.AppPreferences;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;

import java.util.List;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MessageApi {
    protected WebServiceApi api;
    protected AppPreferences preferences;

    public MessageApi(Context context) {
        preferences = new AppPreferences(context);
        Gson gson = new GsonBuilder()
                .setLenient()
                .create();
        OkHttpClient client = new OkHttpClient.Builder()
                .addInterceptor(chain -> {
                    Request newRequest = chain.request().newBuilder()
                                              .header("Authorization",
                                                      "Bearer " + preferences.getString(AppPreferences.KEY_TOKEN))
                                              .build();
                    return chain.proceed(newRequest);
                })
                .build();
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(preferences.getString(AppPreferences.KEY_SERVER_ADDRESS))
                .addConverterFactory(GsonConverterFactory.create(gson))
                .client(client)
                .build();
        this.api = retrofit.create(WebServiceApi.class);
    }


    public void getMessages(String chatId, Callback<List<Message>> callback) {
        Call<List<Message>> call = api.getMessages(chatId);
        call.enqueue(new Callback<List<Message>>() {
            @Override
            public void onResponse(@NonNull Call<List<Message>> call, @NonNull Response<List<Message>> response) {
                if (response.isSuccessful()) {
                    // Registration successful
                    callback.onResponse(call, Response.success(response.body()));
                } else {
                    String errorBodyString = getErrorMsg(response.errorBody());
                    callback.onFailure(call, new Throwable("Failed to fetch messages: " + errorBodyString));
                }
            }

            @Override
            public void onFailure(@NonNull Call<List<Message>> call, @NonNull Throwable t) {
                callback.onFailure(call, new Throwable("Failed to fetch messages: " + t.getMessage()));
            }
        });
    }

    public void sendMessage(String chatId, SendMessage msg, Callback<Message> callback) {
        Call<Message> call = api.sendMessage(chatId, msg);
        call.enqueue(new Callback<Message>() {
            @Override
            public void onResponse(@NonNull Call<Message> call, @NonNull Response<Message> response) {
                if (response.isSuccessful()) {
                    // Registration successful
                    callback.onResponse(call, Response.success(response.body()));
                } else {
                    String errorBodyString = getErrorMsg(response.errorBody());
                    callback.onFailure(call, new Throwable("Failed to send message: " + errorBodyString));
                }
            }

            @Override
            public void onFailure(@NonNull Call<Message> call, @NonNull Throwable t) {
                callback.onFailure(call, new Throwable("Failed to send messages: " + t.getMessage()));
            }
        });
    }

    private String getErrorMsg(ResponseBody errorBody) {
        String NOT_FOUND = "Error message not found";
        if (errorBody == null) {
            return NOT_FOUND;
        }
        try {
            String errorBodyString = errorBody.string();
            Gson gson = new Gson();
            JsonObject errorJson = gson.fromJson(errorBodyString, JsonObject.class);
            if (!errorJson.has("message")) {
                return NOT_FOUND;
            }
            return errorJson.get("message").getAsString();
        } catch (Exception e) {
            return NOT_FOUND;
        }
    }
}
