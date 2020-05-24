package com.marasoft.webcampdf.configuration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class CorsConfiguration implements WebMvcConfigurer {
	private static final Logger logger = LoggerFactory.getLogger(CorsConfiguration.class);
	
	@Value("${cors.allowed:none}")
	String allowedCors;
	
    /**
     * Add to the allowed origins the comma-separated urls found in the propery cors.allowed
     * 
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
    	//TODO good for a library
    	if (allowedCors != null && allowedCors.trim().length()>0 && allowedCors != "none") {
    		try {
				CorsRegistration reg = registry.addMapping("/**");
				for(String url: allowedCors.split(",")) {
				    reg.allowedOrigins(url).allowedMethods("GET", "POST","PUT", "DELETE");
				    logger.info("CorsConfiguration added route:"+url);
				}
			} catch (Exception e) {
				logger.error("Error setting cors! check your cors.allowed property");
			}
    	}
    }
}