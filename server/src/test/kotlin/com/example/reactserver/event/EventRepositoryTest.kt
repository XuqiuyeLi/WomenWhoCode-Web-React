package com.example.reactserver.event

import org.hamcrest.CoreMatchers.equalTo
import org.hamcrest.CoreMatchers.notNullValue
import org.hamcrest.MatcherAssert.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.jdbc.Sql
import java.time.LocalDateTime


@SpringBootTest
@Sql(scripts = ["classpath:cleardb.sql"])
class EventRepositoryTest {
    @Autowired
    lateinit var subject: EventRepository

    val event1 = NewEvent(
            "WWC first event",
            LocalDateTime.of(2020, 6, 2, 19, 30),
            LocalDateTime.of(2020, 6, 2, 21, 30),
            "WWC event description",
            "venue name")
    val event2 = NewEvent(
            "WWC second event",
            LocalDateTime.of(2021, 6, 2, 19, 30),
            LocalDateTime.of(2021, 6, 2, 21, 30),
            "WWC event description 2",
            "venue name 2")

    @Test
    fun `getAllEvents returns an empty list`() {
        val events = subject.getAllEvents()

        assertThat(events.size, equalTo(0))
    }

    @Test
    fun `add event saves event`() {
        subject.addEvent(event1)
        subject.addEvent(event2)


        val eventList = subject.getAllEvents()
        assertThat(eventList.size, equalTo(2))
        assertThat(eventList[0].id, equalTo("1"))
        assertThat(eventList[0].name, equalTo("WWC first event"))
        assertThat(eventList[0].startDateTime, equalTo(LocalDateTime.of(2020, 6, 2, 19, 30)))
        assertThat(eventList[0].endDateTime, equalTo(LocalDateTime.of(2020, 6, 2, 21, 30)))
        assertThat(eventList[0].description, equalTo("WWC event description"))
        assertThat(eventList[0].venueName, equalTo("venue name"))

        assertThat(eventList[1].id, equalTo("2"))
        assertThat(eventList[1].name, equalTo("WWC second event"))
        assertThat(eventList[1].startDateTime, equalTo(LocalDateTime.of(2021, 6, 2, 19, 30)))
        assertThat(eventList[1].endDateTime, equalTo(LocalDateTime.of(2021, 6, 2, 21, 30)))
        assertThat(eventList[1].description, equalTo("WWC event description 2"))
        assertThat(eventList[1].venueName, equalTo("venue name 2"))
    }

    @Test
    fun `getEventById returns the event with matching id`() {
        subject.addEvent(event1)
        subject.addEvent(event2)


        val eventWithId2 = subject.getEventById("2")


        assertThat(eventWithId2.id, equalTo("2"))
        assertThat(eventWithId2.name, equalTo("WWC second event"))
        assertThat(eventWithId2.startDateTime, equalTo(LocalDateTime.of(2021, 6, 2, 19, 30)))
        assertThat(eventWithId2.endDateTime, equalTo(LocalDateTime.of(2021, 6, 2, 21, 30)))
        assertThat(eventWithId2.description, equalTo("WWC event description 2"))
        assertThat(eventWithId2.venueName, equalTo("venue name 2"))
    }

    @Test
    fun `getEventById throws error if event with matching id not found`() {
        var thrownException: EventNotFoundException? = null
        try {
            subject.getEventById("100")
        } catch (e: EventNotFoundException) {
            thrownException = e
        }

        assertThat(thrownException, notNullValue())
    }

    @Test
    fun `deleteEventById deletes event with matching id`() {
        subject.addEvent(event1)
        subject.addEvent(event2)


        subject.deleteEventById("2")


        var thrownException: EventNotFoundException? = null
        try {
            subject.getEventById("2")
        } catch (e: EventNotFoundException) {
            thrownException = e
        }
        assertThat(thrownException, notNullValue())
        assertThat(subject.getAllEvents().size, equalTo(1))
    }
}