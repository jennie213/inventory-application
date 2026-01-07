package com.infosys.inventoryApplication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.inventoryApplication.bean.InventoryUser;
import com.infosys.inventoryApplication.config.EncoderConfig;
import com.infosys.inventoryApplication.service.InventoryUserService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.util.List;
@RestController
@RequestMapping("/invent/")
@CrossOrigin(origins = "http://localhost:3131", allowCredentials = "true")
public class LoginController {
  @Autowired
  private InventoryUserService service;
  
  @Autowired
  private EncoderConfig econfig;
	
  @Autowired
  private AuthenticationManager authenticationManager;
	
  @PostMapping("/login")
  public void registerNewUser(@RequestBody InventoryUser user) {
		PasswordEncoder bCrypt=econfig.passwordEcoding();
		String encodedPassword=bCrypt.encode(user.getPassword());
		user.setPassword(encodedPassword);
		service.save(user);
	}
@GetMapping("/login/{userId}/{password}")
public String validateUser(@PathVariable String userId,@PathVariable String password) {
	String role="false";
	try {
		 Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userId, password));
	 	    role=service.getRole();
	 	     SecurityContextHolder.getContext().setAuthentication(authentication);
		}catch(Exception ex) {}
	return role;
	}
  

  @GetMapping("/login")
	public InventoryUser getUserDetails() {
		return service.getUser();
	}
  
  @PostMapping("/logout")
	 public ResponseEntity<String> logout(HttpServletRequest request,HttpServletResponse response) {
	        // Clear Spring Security Context
	        SecurityContextHolder.clearContext();
	        // Invalidate session
	        HttpSession session = request.getSession(false);
	        if (session != null) {
	            session.invalidate();
	        }
	        // Delete cookie
	        Cookie cookie = new Cookie("JSESSIONID", null);
	        cookie.setPath("/");
	        cookie.setMaxAge(0);
	        response.addCookie(cookie);
	        return ResponseEntity.ok("Logout successful");
	    }
  
  @GetMapping("/role/{role}")
  List<String> getUsersByRole(@PathVariable String role){
	  return service.getUsersByRole(role);
  }
  
  
  @GetMapping("/user")
    public String getUserId() {
	  return service.getUserId();
  }
 
}
