package com.example.manshma.activities;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.example.manshma.api.UserApi;
import com.example.manshma.databinding.ActivityLoginBinding;
import com.example.manshma.models.User;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity {

    private ActivityLoginBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityLoginBinding.inflate(getLayoutInflater());
        View view = binding.getRoot();
        setContentView(view);

        binding.usernameEditText.setOnClickListener(v -> binding.usernameEditText.setError(null));
        binding.passwordEditText.setOnClickListener(v -> binding.passwordEditText.setError(null));

        binding.loginButton.setOnClickListener(v -> loginUser());

        binding.registerLink.setOnClickListener(v -> {
            Intent intent = new Intent(LoginActivity.this, RegisterActivity.class);
            startActivity(intent);
        });
    }

    private void loginUser() {
        String username = binding.usernameEditText.getText().toString().trim();
        String password = binding.passwordEditText.getText().toString().trim();

        // Perform input validation
        if (username.isEmpty() || password.isEmpty()) {
            Toast.makeText(this, "Please fill in all fields", Toast.LENGTH_SHORT).show();
            return;
        }

        User user = new User(username, password);
        UserApi api = new UserApi();

        api.login(user, new Callback<String>() {
            @Override
            public void onResponse(@NonNull Call<String> call, @NonNull Response<String> response) {
                if (response.isSuccessful()) {
                    Toast.makeText(LoginActivity.this, "Login successful!", Toast.LENGTH_SHORT).show();
                    Toast.makeText(LoginActivity.this, response.body(), Toast.LENGTH_SHORT).show();
                }
            }
            @Override
            public void onFailure(@NonNull Call<String> call, @NonNull Throwable t) {
                Toast.makeText(LoginActivity.this, t.getMessage(), Toast.LENGTH_SHORT).show();
                binding.usernameEditText.setOnClickListener(v -> binding.usernameEditText.setError("Wrong field"));
                binding.passwordEditText.setOnClickListener(v -> binding.passwordEditText.setError("Wrong field"));
            }
        });
    }
}