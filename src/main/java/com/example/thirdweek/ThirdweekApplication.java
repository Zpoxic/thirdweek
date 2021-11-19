package com.example.thirdweek;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing // Timestamped 사용 가능
@SpringBootApplication
public class ThirdweekApplication {
    public static void main(String[] args) { SpringApplication.run(ThirdweekApplication.class, args); }

}
