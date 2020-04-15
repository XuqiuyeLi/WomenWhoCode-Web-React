package com.example.reactserver.event

import org.hamcrest.CoreMatchers.equalTo
import org.hamcrest.MatcherAssert.assertThat
import org.junit.jupiter.api.Test
import java.time.LocalDateTime

class EventRepositoryTest {
    private lateinit var subject: EventRepository

    @Test
    fun `getAllEvents returns all events`() {
        subject = EventRepository()
        val events = subject.getAllEvents()

        assertThat(events.size, equalTo(2))
        assertThat(events, equalTo(
                listOf(
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
                )))
    }
}