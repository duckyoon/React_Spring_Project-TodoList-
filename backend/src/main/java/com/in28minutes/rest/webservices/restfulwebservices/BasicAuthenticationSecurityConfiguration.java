package com.in28minutes.rest.webservices.restfulwebservices;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
public class BasicAuthenticationSecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        return http
                // 요청에 대한 인가 규칙 설정
                .authorizeHttpRequests(
                auth ->
                        auth
                                // CORS 프리플라이트 요청은 인증 없이 허용
                                .requestMatchers(new AntPathRequestMatcher("/**", "OPTIONS")).permitAll()

                                // 그 외 모든 요청은 인증  필요
                                .anyRequest().authenticated()
                     )

                    // HTTP Basic 인증 방식 사용
                    .httpBasic(Customizer.withDefaults())

                    // 세션을 생성하지 않고, 매 요청 시 인증하도록 설정
                    .sessionManagement(
                        session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                    
                    // CORS 활성화
                     .cors(Customizer.withDefaults())
                     // CSRF 보호 기능 비활성화
                    // REST API는 주로 JWT/BasicAuth를 쓰기 때문에 CSRF 토큰 불필요
                    .csrf().disable()

                    // 위에서 설정한 HTTPsECURITY 객체를 빌드해서 SecurityFilterChain 반환
                    .build();
    }
}
