package com.example.reactserver.event

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException

@RestController
class EventController(val repository: EventRepository) {

    @GetMapping("/api/events")
    fun getAllEvents(): List<Event> {
        return repository.getAllEvents()
    }

    @GetMapping("/api/events/{id}")
    fun getEvent(@PathVariable id: String): Event {
        try {
            return repository.getEventById(id)
        } catch (e: EventNotFoundException) {
            throw ResponseStatusException(HttpStatus.NOT_FOUND)
        }
    }

    @DeleteMapping("api/events/{id}")
    fun deleteEvent(@PathVariable id: String) {
        repository.deleteEventById(id)
    }

    @PostMapping("/api/events")
    fun addEvent(@RequestBody newEvent: NewEvent) {
        repository.addEvent(newEvent)
    }
}