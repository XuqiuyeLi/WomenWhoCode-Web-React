package com.example.reactserver.event

import org.springframework.stereotype.Repository

@Repository
class EventRepository {
    private val eventList = ArrayList<Event>()

    fun getAllEvents(): List<Event> {
        return eventList
    }

    fun addEvent(newEvent: NewEvent) {
        eventList.add(
                Event(
                        (eventList.size + 1).toString(),
                        newEvent.name,
                        newEvent.startDateTime,
                        newEvent.endDateTime,
                        newEvent.description,
                        newEvent.venueName
                ))
    }
}
