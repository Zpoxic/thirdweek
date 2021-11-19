package com.example.thirdweek.controller;

import com.example.thirdweek.domain.Postcard;
import com.example.thirdweek.domain.PostcardRepository;
import com.example.thirdweek.domain.PostcardRequestDto;
import com.example.thirdweek.service.PostcardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RequiredArgsConstructor
@RestController
public class PostcardController {
    private final PostcardRepository postcardRepository;
    private final PostcardService postcardService;

    @PostMapping("/api/postcards")
    public Postcard createPostcard(@RequestBody PostcardRequestDto requestDto) { //@RequestBody 요청이 올 때, Body에 넣어달라는 의미
        Postcard postcard = new Postcard(requestDto);
        return postcardRepository.save(postcard);
    }

    @GetMapping("/api/postcards")
    public List<Postcard> readPostcard() {
        return postcardRepository.findAllByOrderByModifiedAtDesc();
    }

    @GetMapping("/api/postcards/{id}")
    public List<Postcard> readDetailPostcard(@PathVariable Long id) {
        return postcardRepository.findAllById(Collections.singleton(id));
    }

    @DeleteMapping("/api/postcards/{id}")
    public Long deletePostcard(@PathVariable Long id){
        postcardRepository.deleteById(id);
        return id;
    }
}
