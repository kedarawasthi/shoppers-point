package com.ecommerce.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.ecommerce.entity.Country;
import com.ecommerce.entity.Product;
import com.ecommerce.entity.ProductCategory;
import com.ecommerce.entity.State;

import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;

@Configuration
public class MyAppConfig implements WebMvcConfigurer{
	@Value("${allowed.origins}")
	private String[] theAllowedOrigins;
	
	@Value("${spring.data.rest.base-path}")
	private String basePath;
	
	@Override
	public void addCorsMappings(CorsRegistry cors) {
		// TODO Auto-generated method stub
		cors.addMapping(basePath+"/**").allowedOrigins(theAllowedOrigins);
	}

}
