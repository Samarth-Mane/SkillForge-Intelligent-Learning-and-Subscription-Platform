package com.learnflow.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AuthRequest {

    public static class Login {
        @NotBlank @Email
        private String email;
        @NotBlank @Size(min = 6)
        private String password;

        public Login() {}
        public String getEmail() { return email; }
        public String getPassword() { return password; }
        public void setEmail(String email) { this.email = email; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class Register {
        @NotBlank @Size(min = 2, max = 100)
        private String name;
        @NotBlank @Email
        private String email;
        @NotBlank @Size(min = 8, max = 100)
        private String password;

        public Register() {}
        public String getName() { return name; }
        public String getEmail() { return email; }
        public String getPassword() { return password; }
        public void setName(String name) { this.name = name; }
        public void setEmail(String email) { this.email = email; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class ForgotPassword {
        @NotBlank @Email
        private String email;

        public ForgotPassword() {}
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
    }

    public static class ResetPassword {
        @NotBlank
        private String token;
        @NotBlank @Size(min = 8)
        private String password;

        public ResetPassword() {}
        public String getToken() { return token; }
        public String getPassword() { return password; }
        public void setToken(String token) { this.token = token; }
        public void setPassword(String password) { this.password = password; }
    }
}
