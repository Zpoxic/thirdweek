package com.example.thirdweek.domain;

import lombok.Getter;

@Getter
public class PostcardRequestDto {
    private Long id;
    private String title;
    private String username;
    private String contents;
}
