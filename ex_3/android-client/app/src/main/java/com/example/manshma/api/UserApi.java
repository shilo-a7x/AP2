package com.example.manshma.api;

import androidx.annotation.NonNull;

import com.example.manshma.models.User;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class UserApi {
    private final WebServiceApi api;

    public UserApi() {
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://10.0.2.2:5000")
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        this.api = retrofit.create(WebServiceApi.class);
    }

    public void registerUser(User user, Callback<Void> callback) {
        Call<Void> call = api.register(user);
        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(@NonNull Call<Void> call, @NonNull Response<Void> response) {
                if (response.isSuccessful()) {
                    // Registration successful
                    callback.onResponse(call, response);
                } else {
                    int statusCode = response.code();
                    if (statusCode == 409) {
                        // Username already taken
                        callback.onFailure(call, new Throwable("Username already taken"));
                    } else {
                        // Other failure case
                        callback.onFailure(call, new Throwable("Registration failed: " + statusCode));
                    }
                }
            }

            @Override
            public void onFailure(@NonNull Call<Void> call, @NonNull Throwable t) {
                // Registration request failed
                callback.onFailure(call, new Throwable("Registration failed: " + t.getMessage()));
            }
        });
    }

}
