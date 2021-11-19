package com.example.thirdweek.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

public interface PostcardRepository extends JpaRepository<Postcard, Long> {
    List<Postcard> findAllByOrderByModifiedAtDesc();
}