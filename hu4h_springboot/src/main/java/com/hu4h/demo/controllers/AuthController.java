package com.hu4h.demo.controllers;

import com.hu4h.demo.data.RegisteringUserRepository;
import com.hu4h.demo.data.UserRepository;
import com.hu4h.demo.dtos.ConfirmDTO;
import com.hu4h.demo.dtos.LoginDTO;
import com.hu4h.demo.dtos.RegistrationDTO;
import com.hu4h.demo.models.RegisteringUser;
import com.hu4h.demo.models.Role;
import com.hu4h.demo.models.User;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    @Autowired
    UserRepository userRepository;
    @Autowired
    RegisteringUserRepository registeringUserRepository;

    @PostMapping("register")
    public ResponseEntity<?> register(@Valid @RequestBody RegistrationDTO registrationDTO, Errors errors) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(errors.getAllErrors());
        }
        if (registeringUserRepository.existsByUsername(registrationDTO.getUsername())) {
            return ResponseEntity.badRequest().body("Username is already taken");
        }
        if(registeringUserRepository.existsByEmail(registrationDTO.getEmail())) {
            return ResponseEntity.badRequest().body("Email is already taken");
        }
        Role currRole = Role.values()[Integer.valueOf(registrationDTO.getRole())];
        RegisteringUser registeringUser = new RegisteringUser(registrationDTO.getUsername(), registrationDTO.getEmail(), registrationDTO.getPassword(), currRole);
        registeringUserRepository.save(registeringUser);
        return ResponseEntity.ok().body("User registered successfully and ready to confirmed");
    }

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        Optional<User> currUser = userRepository.findByUsername(loginDTO.getUsername());
        Optional<RegisteringUser> currRegisteringUser = registeringUserRepository.findByUsername(loginDTO.getUsername());
        if (currRegisteringUser.isEmpty()) {return ResponseEntity.badRequest().body("User not found");}
        else {
            if (currUser.isEmpty()) {
                return ResponseEntity.badRequest().body("User is not yet confirmed");
            }
            else {
                String currPassword = loginDTO.getPassword();
                if (currUser.get().getPassword().equals(currPassword)) {
                    return ResponseEntity.badRequest().body("Password is incorrect\n");
                }
                else {
                    return ResponseEntity.ok().body("User logged in successfully");
                }
            }
        }
    }

    @PostMapping("confirm")
    public ResponseEntity<?> confirm(@Valid @RequestBody ConfirmDTO confirmDTO , Errors errors) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(errors.getAllErrors());
        }
        if (confirmDTO.getConfirmUsername().equals("admin")) {
            User admin =  new User(registeringUserRepository.findByUsername(confirmDTO.getUsername()).get());
            userRepository.save(admin);
            return ResponseEntity.ok().body("admin initiated successfully");
        }
        Optional<User> currUser = userRepository.findByUsername(confirmDTO.getUsername());
        if (currUser.isEmpty()) {return ResponseEntity.badRequest().body("Authenticating user not found");}
        else {
            if (userRepository.existsByUsername(confirmDTO.getConfirmUsername())) {
                return ResponseEntity.badRequest().body("User is already confirmed\n");
            }
            String currPassword = confirmDTO.getPassword();
            if (currUser.get().getPassword().equals(currPassword)) {
                return ResponseEntity.badRequest().body("Authenticating password is incorrect");
            }
            else {
                Optional<RegisteringUser> registeringUser = registeringUserRepository.findByUsername(confirmDTO.getConfirmUsername());
                if (registeringUser.isEmpty()) {
                    return ResponseEntity.badRequest().body("User hasn't registered yet");
                }
                else {
                    User newUser = new User(registeringUser.get());
                    userRepository.save(newUser);
                    return ResponseEntity.ok().body("User confirmed successfully");
                }
            }
        }
    }


}
