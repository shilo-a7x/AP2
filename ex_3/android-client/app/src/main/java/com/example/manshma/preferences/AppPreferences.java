package com.example.manshma.preferences;

import android.content.Context;
import android.content.SharedPreferences;

public class AppPreferences {
    private static final String APP_PREFERENCES_NAME = "MyAppPrefs";
    public static final String KEY_USERNAME = "username";
    public static final String KEY_TOKEN = "token";
    public static final String KEY_SERVER_ADDRESS = "server_address";
    public static final String KEY_DARK_MODE = "dark_mode";
    // Add more keys as needed

    private SharedPreferences sharedPreferences;

    public AppPreferences(Context context) {
        sharedPreferences = context.getSharedPreferences(APP_PREFERENCES_NAME, Context.MODE_PRIVATE);
    }

    public void saveString(String key, String value) {
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString(key, value);
        editor.apply();
    }
    public void saveBoolean(String key, boolean value) {
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putBoolean(key, value);
        editor.apply();
    }

    public String getString(String key) {
        return sharedPreferences.getString(key, getDefaultStringValue(key));
    }
    public boolean getBoolean(String key) {
        return sharedPreferences.getBoolean(key, getDefaultBooleanValue(key));
    }

    public void remove(String key) {
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.remove(key);
        editor.apply();
    }

    private String getDefaultStringValue(String key) {
        switch (key) {
            case KEY_SERVER_ADDRESS:
                return "http://10.0.2.2:5000";
            case KEY_USERNAME:
            case KEY_TOKEN:
            default:
                return null;
        }
    }
    private boolean getDefaultBooleanValue(String key) {
        switch (key) {
            case KEY_DARK_MODE:
            default:
                return false;
        }
    }
}
