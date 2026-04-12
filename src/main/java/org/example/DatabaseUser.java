package org.example;

import jakarta.persistence.*;

@Entity
public class DatabaseUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(nullable = false, updatable = false)
    private Long id;

//    @Column(nullable = false, unique = true)
    private String userName;

//    @Column(nullable = false)
    private String userPassword;

//    @Column(nullable = false)
    private String role;

    public DatabaseUser() {
    }

    public DatabaseUser(String username, String password, String role) {
        this.userName = username;
        this.userPassword = password;
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String username) {
        this.userName = username;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String password) {
        this.userPassword = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + userName + '\'' +
                ", password='" + userPassword + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}
