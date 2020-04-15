package com.example.reactserver.event

import java.time.LocalDateTime

class EventRepository {
    private val eventList = listOf(
            Event(
                    "1",
                    "WWC first event",
                    LocalDateTime.of(2020, 6, 2, 19, 30),
                    LocalDateTime.of(2020, 6, 2, 21, 30),
                    "WWC event description",
                    Event.Venue("venueName 1",
                            "address_1",
                            "city1")
            ),
            Event(
                    "2",
                    "WWC second event",
                    LocalDateTime.of(2021, 6, 2, 19, 30),
                    LocalDateTime.of(2021, 6, 2, 21, 30),
                    "WWC second event description",
                    Event.Venue("venueName 2",
                            "address_2",
                            "city2")
            )
    )

    fun getAllEvents(): List<Event> {
        return eventList
    }

}
