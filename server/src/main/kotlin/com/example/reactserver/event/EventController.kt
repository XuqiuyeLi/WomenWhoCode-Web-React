package com.example.reactserver.event

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class EventController {

    @GetMapping("/api/events")
    fun getAllEvents(){
        return
    }
}