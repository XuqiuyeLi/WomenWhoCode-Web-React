package com.example.reactserver

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.http.HttpStatus
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import javax.sql.DataSource

@Configuration
class WebSecurityConfig(
        private val dataSource: DataSource
) : WebSecurityConfigurerAdapter() {
    override fun configure(http: HttpSecurity) {
        http.csrf().disable()

        http.authorizeRequests()
                .antMatchers(HttpMethod.POST, "/api/events").authenticated()
                .antMatchers(HttpMethod.DELETE, "/api/events/*").authenticated()
                .anyRequest().permitAll()

        http.exceptionHandling()
                .authenticationEntryPoint { _, response, _ ->
                    response.sendError(HttpStatus.FORBIDDEN.value())
                }


        http.formLogin()
                .successHandler { _, response, _ ->
                    response.status = HttpStatus.OK.value()
                }
                .failureHandler { _, response, _ ->
                    response.status = HttpStatus.UNAUTHORIZED.value()
                }
                .loginProcessingUrl("/api/login")
                .permitAll()
    }

    override fun configure(auth: AuthenticationManagerBuilder) {
        auth.jdbcAuthentication()
                .dataSource(dataSource)
                .passwordEncoder(passwordEncoder())
                .usersByUsernameQuery(
                        "SELECT username, password, enabled from users where username = ?")
                .authoritiesByUsernameQuery(
                        "SELECT u.username, a.authority " +
                                "FROM authorities a, users u " +
                                "WHERE u.username = ? " +
                                "AND u.id = a.user_id"
                )
    }

    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }
}