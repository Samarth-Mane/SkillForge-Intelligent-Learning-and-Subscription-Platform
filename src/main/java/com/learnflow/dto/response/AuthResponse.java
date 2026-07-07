package com.learnflow.dto.response;

import com.learnflow.enums.Role;

public class AuthResponse {
    private String token;
    private String type = "Bearer";
    private UserInfo user;

    public AuthResponse() {}
    public AuthResponse(String token, UserInfo user) {
        this.token = token; this.user = user;
    }

    public String getToken() { return token; }
    public String getType() { return type; }
    public UserInfo getUser() { return user; }
    public void setToken(String token) { this.token = token; }
    public void setType(String type) { this.type = type; }
    public void setUser(UserInfo user) { this.user = user; }

    public static class UserInfo {
        private Long id;
        private String name;
        private String email;
        private Role role;
        private String avatarUrl;

        public UserInfo() {}
        public UserInfo(Long id, String name, String email, Role role, String avatarUrl) {
            this.id = id; this.name = name; this.email = email;
            this.role = role; this.avatarUrl = avatarUrl;
        }

        public Long getId() { return id; }
        public String getName() { return name; }
        public String getEmail() { return email; }
        public Role getRole() { return role; }
        public String getAvatarUrl() { return avatarUrl; }
        public void setId(Long id) { this.id = id; }
        public void setName(String name) { this.name = name; }
        public void setEmail(String email) { this.email = email; }
        public void setRole(Role role) { this.role = role; }
        public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
    }
}
