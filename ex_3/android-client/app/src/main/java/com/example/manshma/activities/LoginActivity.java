package com.example.manshma.activities;

import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.example.manshma.R;
import com.example.manshma.api.UserApi;
import com.example.manshma.databinding.ActivityLoginBinding;
import com.example.manshma.models.User;
import com.example.manshma.preferences.AppPreferences;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity {

    private ActivityLoginBinding binding;
    private AppPreferences preferences;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityLoginBinding.inflate(getLayoutInflater());
        View view = binding.getRoot();
        setSupportActionBar(binding.toolbar);
        setContentView(view);

        preferences = new AppPreferences(LoginActivity.this);

        String token = preferences.getString(AppPreferences.KEY_TOKEN);
        String username = preferences.getString(AppPreferences.KEY_USERNAME);
        if (token != null && username != null) {
            UserApi api = new UserApi(this);
            api.getUser(username, token, new Callback<User>() {
                @Override
                public void onResponse(@NonNull Call<User> call, @NonNull Response<User> response) {
                    if (response.isSuccessful()) {
                        startActivity(new Intent(LoginActivity.this, ContactsActivity.class));
                    }
                }

                @Override
                public void onFailure(@NonNull Call<User> call, @NonNull Throwable t) {

                }
            });
        }

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
        UserApi api = new UserApi(this);

        api.login(user, new Callback<String>() {
            @Override
            public void onResponse(@NonNull Call<String> call, @NonNull Response<String> response) {
                if (response.isSuccessful()) {
                    Toast.makeText(LoginActivity.this, "Login successful!", Toast.LENGTH_SHORT).show();
                    preferences.saveString(AppPreferences.KEY_USERNAME, username);
                    preferences.saveString(AppPreferences.KEY_TOKEN, response.body());
                    startActivity(new Intent(LoginActivity.this, ContactsActivity.class));
                }
            }
            @Override
            public void onFailure(@NonNull Call<String> call, @NonNull Throwable t) {
                Toast.makeText(LoginActivity.this, t.getMessage(), Toast.LENGTH_SHORT).show();
                binding.usernameEditText.setError("Wrong field");
                binding.passwordEditText.setError("Wrong field");
            }
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_logister, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();

        if (id == R.id.action_settings) {
            // Open the settings screen
            Intent intent = new Intent(this, SettingsActivity.class);
            startActivity(intent);
            return true;
        }

        return super.onOptionsItemSelected(item);
    }


}