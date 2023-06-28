package com.example.manshma.api;

import android.content.Context;

import androidx.annotation.NonNull;

import com.example.manshma.models.User;
import com.example.manshma.preferences.AppPreferences;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class UserApi {
    private final WebServiceApi api;
    private AppPreferences preferences;

    public UserApi(Context context) {
        preferences = new AppPreferences(context);
        Gson gson = new GsonBuilder()
                .setLenient()
                .create();
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(preferences.getString(AppPreferences.KEY_SERVER_ADDRESS))
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build();
        this.api = retrofit.create(WebServiceApi.class);
    }

    public void register(User user, Callback<Void> callback) {
        Call<Void> call = api.register(user);
        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(@NonNull Call<Void> call, @NonNull Response<Void> response) {
                if (response.isSuccessful()) {
                    // Registration successful
                    callback.onResponse(call, response);
                } else {
                    // Other failure case
                    String errorBodyString = getErrorMsg(response.errorBody());
                    callback.onFailure(call, new Throwable("Registration failed: " + errorBodyString));

                }
            }

            @Override
            public void onFailure(@NonNull Call<Void> call, @NonNull Throwable t) {
                // Registration request failed
                callback.onFailure(call, new Throwable("Registration failed: " + t.getMessage()));
            }
        });
    }

    public void login(User user, Callback<String> callback) {
        Call<String> call = api.login(user);
        call.enqueue(new Callback<String>() {
            @Override
            public void onResponse(@NonNull Call<String> call, @NonNull Response<String> response) {
                if (response.isSuccessful()) {
                    String token = response.body();
                    // Registration successful
                    callback.onResponse(call, Response.success(token));
                } else {
                    String errorBodyString = getErrorMsg(response.errorBody());
                    callback.onFailure(call, new Throwable("Login failed: " + errorBodyString));
                }
            }

            @Override
            public void onFailure(@NonNull Call<String> call, @NonNull Throwable t) {
                // Registration request failed
                callback.onFailure(call, new Throwable("Login failed: " + t.getMessage()));
            }
        });
    }

    public void getUser(String username, String token, Callback<User> callback) {
        Call<User> call = api.getUser(username, token);
        call.enqueue(new Callback<User>() {
            @Override
            public void onResponse(@NonNull Call<User> call, @NonNull Response<User> response) {
                if (response.isSuccessful() && response.body() != null) {
                    callback.onResponse(call, Response.success(response.body()));
                } else {
                    String errorBodyString = getErrorMsg(response.errorBody());
                    callback.onFailure(call, new Throwable("Cannot get user: " + errorBodyString));
                }
            }

            @Override
            public void onFailure(@NonNull Call<User> call, @NonNull Throwable t) {
                callback.onFailure(call, new Throwable("Cannot get user: " + t.getMessage()));
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
