package com.example.manshma.activities;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.ImageDecoder;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.util.Base64;
import android.view.View;
import android.widget.Toast;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.example.manshma.api.UserApi;
import com.example.manshma.databinding.ActivityRegisterBinding;
import com.example.manshma.models.User;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.regex.Pattern;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class RegisterActivity extends AppCompatActivity {

    private ActivityRegisterBinding binding;
    private String base64ProfilePic;

    private ActivityResultLauncher<Intent> galleryLauncher;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityRegisterBinding.inflate(getLayoutInflater());
        View view = binding.getRoot();
        setContentView(view);

        binding.usernameEditText.setOnClickListener(v -> binding.usernameEditText.setError(null));
        binding.passwordEditText.setOnClickListener(v -> binding.passwordEditText.setError(null));
        binding.confirmPasswordEditText.setOnClickListener(v -> binding.confirmPasswordEditText.setError(null));
        binding.displayNameEditText.setOnClickListener(v -> binding.displayNameEditText.setError(null));

        binding.registerButton.setOnClickListener(v -> register());
        binding.uploadImageButton.setOnClickListener(v -> {
            binding.uploadImageButton.setError(null);
            openGallery();
        });

        binding.loginLink.setOnClickListener(v -> {
            Intent intent = new Intent(RegisterActivity.this, LoginActivity.class);
            startActivity(intent);
            finish();
        });

        // Initialize the ActivityResultLauncher for gallery selection
        galleryLauncher = registerForActivityResult(new ActivityResultContracts.StartActivityForResult(), result -> {
            if (result.getResultCode() == RESULT_OK && result.getData() != null) {
                Uri selectedImageUri = result.getData().getData();
                try {
                    ImageDecoder.Source src = ImageDecoder.createSource(getContentResolver(), selectedImageUri);
                    Bitmap bitmap = ImageDecoder.decodeBitmap(src);
                    if (bitmap != null) {
                        base64ProfilePic = convertBitmapToBase64(bitmap);
                    } else {
                        binding.uploadImageButton.setError("");
                        Toast.makeText(this, "Invalid image file", Toast.LENGTH_SHORT).show();
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                    binding.uploadImageButton.setError("");
                    Toast.makeText(this, "Failed to load image", Toast.LENGTH_SHORT).show();
                }
            } else {
                binding.uploadImageButton.setError("");
                Toast.makeText(this, "No image selected", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void register() {
        String username = binding.usernameEditText.getText().toString().trim();
        String password = binding.passwordEditText.getText().toString().trim();
        String confirmPassword = binding.confirmPasswordEditText.getText().toString().trim();
        String displayName = binding.displayNameEditText.getText().toString().trim().replaceAll("\\s+", " ");

        // Perform input validation
        if (username.isEmpty() || password.isEmpty() || confirmPassword.isEmpty() || displayName.isEmpty()) {
            Toast.makeText(this, "Please fill in all fields", Toast.LENGTH_SHORT).show();
            return;
        }

        if (username.length() < 3 || !username.matches("^[a-zA-Z0-9]+$")) {
            binding.usernameEditText.setError("Username must be at least 3 characters alphanumeric only");
            return;
        }

        if (password.length() < 6 || !isValidPassword(password)) {
            binding.passwordEditText.setError(
                    "Invalid password, must be at least 6 characters, alphanumeric only with at least 1 number, 1 " +
                    "uppercase and 1 lowercase");
            return;
        }

        if (!password.equals(confirmPassword)) {
            binding.confirmPasswordEditText.setError("Passwords do not match");
            return;
        }

        if (displayName.length() < 3 || !isValidDisplayName(displayName)) {
            binding.displayNameEditText.setError(
                    "Invalid display name, must be at least 3 characters, only of letters, numbers, spaces, hyphens, " +
                    "apostrophes, periods, dots, and commas");
            return;
        }

        if (base64ProfilePic == null || base64ProfilePic.isEmpty()) {
            Toast.makeText(this, "Please upload a profile picture", Toast.LENGTH_SHORT).show();
            return;
        }

        User user = new User(username, password, displayName, base64ProfilePic);
        UserApi api = new UserApi();

        api.register(user, new Callback<Void>() {
            @Override
            public void onResponse(@NonNull Call<Void> call, @NonNull Response<Void> response) {
                if (response.isSuccessful()) {
                    Toast.makeText(RegisterActivity.this, "Registration successful!", Toast.LENGTH_SHORT).show();
                    Intent intent = new Intent(RegisterActivity.this, LoginActivity.class);
                    startActivity(intent);
                    finish();
                }
            }
            @Override
            public void onFailure(@NonNull Call<Void> call, @NonNull Throwable t) {
                Toast.makeText(RegisterActivity.this, t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });



        // TODO
        // Move to the next screen (e.g., ContactsActivity)
//        Intent intent = new Intent(this, ContactsActivity.class);
//        startActivity(intent);
//        finish();
    }

    private boolean isValidPassword(String password) {
        String passwordPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z0-9]+$";
        Pattern pattern = Pattern.compile(passwordPattern);
        return pattern.matcher(password).matches();
    }

    private boolean isValidDisplayName(String displayName) {
        String displayNamePattern = "^[a-zA-Z0-9\\s\\-'.,]+$";
        Pattern pattern = Pattern.compile(displayNamePattern);
        return pattern.matcher(displayName).matches();
    }

    private void openGallery() {
        Intent intent = new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
        galleryLauncher.launch(intent);
    }

    private String convertBitmapToBase64(Bitmap bitmap) {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.JPEG, 70, outputStream);
        byte[] imageBytes = outputStream.toByteArray();
        return "data:image/jpeg;base64," + Base64.encodeToString(imageBytes, Base64.NO_WRAP);
    }
}
