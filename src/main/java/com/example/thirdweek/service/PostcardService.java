package com.example.thirdweek.service;

import com.example.thirdweek.domain.Postcard;
import com.example.thirdweek.domain.PostcardRepository;
import com.example.thirdweek.domain.PostcardRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class PostcardService {

    private final PostcardRepository postcardRepository;

    @Transactional
    public Long update(Long id, PostcardRequestDto requestDto) { //메소드 생성 = public 반환타입 메소드 이름 (재료 )
        Postcard postcard = postcardRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("아이디가 존재하지 않습니다.")
        );
        postcard.update(requestDto);
        return postcard.getId();
    }
}