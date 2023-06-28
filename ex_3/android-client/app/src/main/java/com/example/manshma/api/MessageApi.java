package com.example.manshma.api;

import android.content.Context;

import com.example.manshma.preferences.AppPreferences;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import okhttp3.OkHttpClient;
import okhttp3.Request;
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
}
