//package com.infosys.inventoryApplication.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.Customizer;
//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//
//
//@Configuration
//@EnableMethodSecurity
//public class SystemConfig {
//	
//
//	@Bean
//    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
//	  return configuration.getAuthenticationManager();
//    }
//	
//	
//
//	
//	@Bean
//	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
// 
//	    http
//	     .cors(Customizer.withDefaults())
//	      .csrf(csrf -> csrf.disable())
//	      .authorizeHttpRequests(auth -> auth
//	            .requestMatchers("/invent/login/**").permitAll()
//	            .requestMatchers("/invent/logout").permitAll()
//	            .requestMatchers("/invent/**").permitAll()
//	            .anyRequest().authenticated()
//	      )
//	      .logout(logout -> logout
//	            .logoutUrl("/invent/logout")
//	            .invalidateHttpSession(true)
//	            .deleteCookies("JSESSIONID")
//	            .logoutSuccessHandler((request, response, authentication) -> {
//	                response.setStatus(200);
//	                response.getWriter().write("Logout success");
//	            })
//	      );
// 
//	    return http.build();
//	}
// 
//
//}

package com.infosys.inventoryApplication.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableMethodSecurity
public class SystemConfig {

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("http://localhost:3131"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        config.setAllowCredentials(true);
        config.setAllowedHeaders(Arrays.asList("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(auth -> auth
                    .requestMatchers("/invent/login/**").permitAll()
                    .requestMatchers("/invent/logout").permitAll()
                    .requestMatchers("/invent/**").permitAll()
                    
            )
            .formLogin(form -> form
                    .loginProcessingUrl("/invent/login")
                    .permitAll()
            )
            .logout(logout -> logout
                    .logoutUrl("/invent/logout")
                    .deleteCookies("JSESSIONID")
            );

        return http.build();
    }
}
