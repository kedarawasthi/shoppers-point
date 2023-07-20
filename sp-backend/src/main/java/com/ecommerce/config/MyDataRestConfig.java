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

import com.ecommerce.entity.Country;
import com.ecommerce.entity.Order;
import com.ecommerce.entity.Product;
import com.ecommerce.entity.ProductCategory;
import com.ecommerce.entity.State;

import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer{
	
	@Value("${allowed.origins}")
	private String[] theAllowedOrigins;
	
	private EntityManager entityManager;
	
	@Autowired
	public MyDataRestConfig(EntityManager entityManager) 
	{
		this.entityManager=entityManager;
	}

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
		HttpMethod[] theUnsupportedActions= {HttpMethod.PUT,HttpMethod.POST,HttpMethod.DELETE,HttpMethod.PATCH};
		disableHttpMethods(Product.class, config, theUnsupportedActions);
		disableHttpMethods(ProductCategory.class, config, theUnsupportedActions);
		disableHttpMethods(Country.class, config, theUnsupportedActions);
		disableHttpMethods(State.class, config, theUnsupportedActions);
		disableHttpMethods(Order.class, config, theUnsupportedActions);
		
		//call an internal method to expose the ids
		exposeIds(config); 
		
		//Configure cors mapping
		cors.addMapping(config.getBasePath()+"/**").allowedOrigins(theAllowedOrigins);
		
	}
	
	private void disableHttpMethods(Class theClass,RepositoryRestConfiguration config,HttpMethod[] theUnsupportedActions) {
		config.getExposureConfiguration()
		.forDomainType(theClass)
		.withItemExposure((metadata,httpMethods)->httpMethods.disable(theUnsupportedActions))
		.withCollectionExposure((metadata,httpMethods)->httpMethods.disable(theUnsupportedActions));
		
	}
	
	//call an internal method to expose the ids
	 private void exposeIds(RepositoryRestConfiguration config) 
	 {
		 //expose entity  ids
		 
		 /// get list of all entity types from entity manager
		 Set<EntityType<?>> entities=entityManager.getMetamodel().getEntities();
		 
		 ///Create an array of entity types
		 List<Class> entityClasses=new ArrayList<>();
		 
		 ///get the entity types for the entities
		 for(EntityType tempEntityType:entities) 
		 {
			 entityClasses.add(tempEntityType.getJavaType());
		 }
		 
		 ///expose the enitty ids for the arry of entity/domain types
		 Class[] domainTypes=entityClasses.toArray(new Class[0]);
		 config.exposeIdsFor(domainTypes);
		 
	 }
	

}
