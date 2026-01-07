package com.infosys.inventoryApplication.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.infosys.inventoryApplication.bean.InventoryUser;
import com.infosys.inventoryApplication.dao.InventoryUserRepository;
import java.util.List;

@Service
public class InventoryUserService implements UserDetailsService {
	
	@Autowired
	private InventoryUserRepository repository;
	private String role;
	private InventoryUser user;
	private String email;
	private String userId;
	
	public String getRole() {
		return role;
	}
	public InventoryUser getUser() {
		return user;
	}
	public String getEmail() {
		return email;
	}
	public String getUserId() {
		return userId;
	}
	//To save a new user in database
	public void save(InventoryUser user) {
		repository.save(user);
	}
	//To validate an existing user
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		this.user=repository.findById(username).get();
		this.userId=user.getUsername();
		this.role=user.getRole();
		return this.user;
	}
	
	public List<String> getUsersByRole(String role){
		return repository.getUsersByRole(role);
	}
	
}
