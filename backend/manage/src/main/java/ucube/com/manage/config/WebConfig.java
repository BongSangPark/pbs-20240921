package ucube.com.manage.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
  public static final String ALLOWED_METHOD_NAMES = "GET,POST,HEAD,PUT,DELETE,TRACE,OPTION,PATCH";

  @Override
  public void addCorsMappings(final CorsRegistry registry) {
    registry.addMapping("/**").allowedMethods(ALLOWED_METHOD_NAMES.split(","));
  }

}
