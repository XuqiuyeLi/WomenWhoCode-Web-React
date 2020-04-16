package com.example.reactserver.event

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class EventController(val repository: EventRepository) {

    @GetMapping("/api/events")
    fun getAllEvents(): List<Event> {
        return repository.getAllEvents()
    }

    @PostMapping("/api/events")
    fun addEvent(@RequestBody newEvent: NewEvent) {
        repository.addEvent(newEvent)
    }
}