package com.example.manshma.api;

import android.content.Context;

import androidx.annotation.NonNull;

import com.example.manshma.models.Contact;
import com.example.manshma.models.User;
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

public class ContactApi {
    protected WebServiceApi api;
    protected AppPreferences preferences;

    public ContactApi(Context context) {
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

    public void getContacts(Callback<List<Contact>> callback) {
        Call<List<Contact>> call = api.getContacts();
        call.enqueue(new Callback<List<Contact>>() {
            @Override
            public void onResponse(@NonNull Call<List<Contact>> call, @NonNull Response<List<Contact>> response) {
                if (response.isSuccessful()) {
                    // Registration successful
                    callback.onResponse(call, Response.success(response.body()));
                } else {
                    String errorBodyString = getErrorMsg(response.errorBody());
                    callback.onFailure(call, new Throwable("Failed to fetch contacts: " + errorBodyString));
                }
            }

            @Override
            public void onFailure(@NonNull Call<List<Contact>> call, @NonNull Throwable t) {
                callback.onFailure(call, new Throwable("Failed to fetch contacts: " + t.getMessage()));
            }
        });
    }

    public void addContact(User contact, Callback<Contact> callback) {
        Call<Contact> call = api.addContact(contact);
        call.enqueue(new Callback<Contact>() {
            @Override
            public void onResponse(@NonNull Call<Contact> call, @NonNull Response<Contact> response) {
                if (response.isSuccessful()) {
                    // Registration successful
                    callback.onResponse(call, Response.success(response.body()));
                } else {
                    String errorBodyString = getErrorMsg(response.errorBody());
                    callback.onFailure(call, new Throwable("Failed to add contact: " + errorBodyString));
                }
            }

            @Override
            public void onFailure(@NonNull Call<Contact> call, @NonNull Throwable t) {
                callback.onFailure(call, new Throwable("Failed to add contact: " + t.getMessage()));
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
