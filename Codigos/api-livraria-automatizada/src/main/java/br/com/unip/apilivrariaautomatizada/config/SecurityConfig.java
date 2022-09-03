package br.com.unip.apilivrariaautomatizada.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final CorsFilter corsFilter;
    private final AuthService authService;

    @Override //Para configurar autenticação
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(authService).passwordEncoder(new BCryptPasswordEncoder());
    }

    @Override  //Para configurar recursos estáticos (js, css, img)
    public void configure(WebSecurity web) throws Exception {
    }

    @Override //Para configurar autorização
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers(HttpMethod.GET, "/livro").permitAll()
                .antMatchers(HttpMethod.GET, "/livro/*").permitAll()
                .antMatchers(HttpMethod.GET, "/genero").permitAll()
                .anyRequest().authenticated()
                .and().formLogin()
                .and()
                .addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class);
    }

    public static void main(String[] args) {
        System.out.println(new BCryptPasswordEncoder().encode("12345"));
    }
}


