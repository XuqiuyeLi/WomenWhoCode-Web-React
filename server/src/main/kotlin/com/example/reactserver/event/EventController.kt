package com.example.reactserver.event

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException

@RestController
@RequestMapping("/api/events")
class EventController(val repository: EventRepository) {

    @GetMapping
    fun getAllEvents(): List<Event> {
        return repository.getAllEvents()
    }

    @GetMapping("{id}")
    fun getEvent(@PathVariable id: String): Event {
        try {
            return repository.getEventById(id)
        } catch (e: EventNotFoundException) {
            throw ResponseStatusException(HttpStatus.NOT_FOUND)
        }
    }

    @DeleteMapping("{id}")
    fun deleteEvent(@PathVariable id: String) {
        repository.deleteEventById(id)
    }

    @PostMapping
    fun addEvent(@RequestBody newEvent: NewEvent) {
        repository.addEvent(newEvent)
    }
}