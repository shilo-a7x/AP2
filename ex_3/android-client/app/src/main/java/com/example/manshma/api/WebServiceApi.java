package com.example.manshma.api;

import com.example.manshma.models.User;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;


public interface WebServiceApi {
    @POST("/api/Users")
    Call<Void> register(@Body User user);

}
