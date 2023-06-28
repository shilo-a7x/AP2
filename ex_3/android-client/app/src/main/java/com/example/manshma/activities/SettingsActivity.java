package com.example.manshma.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import com.example.manshma.R;
import com.example.manshma.databinding.ActivitySettingsBinding;
import com.example.manshma.preferences.AppPreferences;

public class SettingsActivity extends AppCompatActivity {

    private ActivitySettingsBinding binding;
    private AppPreferences preferences;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_settings);
        binding = ActivitySettingsBinding.inflate(getLayoutInflater());
        View view = binding.getRoot();
        setContentView(view);
        preferences = new AppPreferences(this);
        binding.editTextServerAddress.setText(preferences.getString(AppPreferences.KEY_SERVER_ADDRESS));
        binding.switchDarkMode.setChecked(preferences.getBoolean(AppPreferences.KEY_DARK_MODE));
        binding.buttonSave.setOnClickListener(v -> saveSettings());
    }

    private void saveSettings() {
        String serverAddress = binding.editTextServerAddress.getText().toString();
        boolean darkModeEnabled = binding.switchDarkMode.isChecked();
        String previousServerAddress = preferences.getString(AppPreferences.KEY_SERVER_ADDRESS);
        if (!serverAddress.equals(previousServerAddress)) {
            // Server address has changed, force logout
            preferences.remove(AppPreferences.KEY_USERNAME);
            preferences.remove(AppPreferences.KEY_TOKEN);
            preferences.saveString(AppPreferences.KEY_SERVER_ADDRESS, serverAddress);
            // TODO
            // Initialize your database or perform any necessary cleanup here

            // Redirect to the login screen
            startActivity(new Intent(this, LoginActivity.class));
            finish();
            Toast.makeText(this, "Server address changed, logging you out", Toast.LENGTH_SHORT).show();
            return;
        }
        preferences.saveString(AppPreferences.KEY_SERVER_ADDRESS, serverAddress);
        preferences.saveBoolean(AppPreferences.KEY_DARK_MODE, darkModeEnabled);
        Toast.makeText(this, "Settings saved", Toast.LENGTH_SHORT).show();
        finish();
    }
}