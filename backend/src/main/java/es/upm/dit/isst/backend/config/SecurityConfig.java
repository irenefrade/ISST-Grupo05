package es.upm.dit.isst.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.*;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
//import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer.FrameOptionsConfig;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import static org.springframework.security.config.Customizer.withDefaults;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {


    @Autowired
    private DataSource dataSource;

    @Bean
    public UserDetailsService userDetailsService() {
        JdbcUserDetailsManager manager = new JdbcUserDetailsManager();
        manager.setDataSource(dataSource);
        return manager;
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                //Protección contra ataques CSRF (debería estar habilitada para aplicaciones web, y se podría deshabilitar para apps)
                .csrf(csrf -> {csrf.disable();})
                //Bloquea CORS por defecto, pero se puede deshabilitar. Se puede fijar a nivel global/controller/handler si esperamos que nuestro cliente cargue datos de distintos sitios)
                //.cors(cors -> {cors.disable();})
                //Fijamos las autorizaciones a cada ruta de mi sistema (de lo más general a lo más específico)
                .authorizeHttpRequests(auth -> {
                    //Permiso para entrar en la consola H2
                    auth.requestMatchers("/h2-console/**").authenticated();
                    auth.requestMatchers("/").permitAll();
                    auth.requestMatchers("/todos").authenticated();
                    auth.requestMatchers("/empleados/**").permitAll();
                    auth.requestMatchers("/horarios/**").permitAll();
                    auth.requestMatchers("/ausencias/**").permitAll();
                   
                   
                })
                //Indicamos que usamos el login por defecto (/login /logout)
                .formLogin(withDefaults());
        //Podemos indicar si usamos formulario de login propio
//            .formLogin(form -> form.loginPage("/login").permitAll());
        http.headers(headers -> headers.frameOptions(FrameOptionsConfig::disable));
        //http.headers().frameOptions().disable();

        return http.build();
    }

    /*
    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails alum = User.withDefaultPasswordEncoder()
            .username("alum")
            .password("alum")
            .roles("ALUM")
            .build();
        UserDetails profe = User.withDefaultPasswordEncoder()
            .username("profe")
            .password("profe")
            .roles("PROF")
            .build(); //Por completar
        UserDetails admin = User.withDefaultPasswordEncoder()
            .username("admin")
            .password("admin")
            .roles("ADMIN")
            .build();
        return new InMemoryUserDetailsManager(admin, alum, profe);
    }
    */
}