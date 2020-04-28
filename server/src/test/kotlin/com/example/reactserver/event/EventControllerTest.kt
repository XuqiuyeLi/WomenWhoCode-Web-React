package com.example.reactserver.event

import com.nhaarman.mockitokotlin2.doAnswer
import com.nhaarman.mockitokotlin2.verify
import com.nhaarman.mockitokotlin2.whenever
import org.hamcrest.Matchers.`is`
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import java.time.LocalDateTime
import javax.sql.DataSource

@WebMvcTest
class EventControllerTest {

    @Autowired
    private lateinit var mvc: MockMvc

    @MockBean
    private lateinit var repo: EventRepository

    @MockBean
    private lateinit var dataSource: DataSource

    @Test
    fun `get all events returns 200`() {
        mvc.perform(MockMvcRequestBuilders
                .get("/api/events")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
    }

    @Test
    fun `get all events returns all events`() {
        whenever(repo.getAllEvents()).thenReturn(
                listOf(
                        Event(
                                "1",
                                "WWC first event",
                                LocalDateTime.of(2020, 6, 2, 19, 30),
                                LocalDateTime.of(2020, 6, 2, 21, 30),
                                "WWC event description",
                                "venue name"
                        )
                ))


        mvc.perform(MockMvcRequestBuilders
                .get("/api/events")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray)
                .andExpect(jsonPath("$[0].id", `is`("1")))
                .andExpect(jsonPath("$[0].name", `is`("WWC first event")))
                .andExpect(jsonPath("$[0].startDateTime", `is`("2020-06-02T19:30:00")))
                .andExpect(jsonPath("$[0].endDateTime", `is`("2020-06-02T21:30:00")))
                .andExpect(jsonPath("$[0].description", `is`("WWC event description")))
                .andExpect(jsonPath("$[0].venueName", `is`("venue name")))
    }

    @Test
    fun `get event by id returns the event with same id`() {
        whenever(repo.getEventById("event100")).thenReturn(
                Event(
                        "event100",
                        "Event Name",
                        LocalDateTime.of(2020, 6, 2, 19, 30),
                        LocalDateTime.of(2020, 6, 2, 21, 30),
                        "Event Description",
                        "Venue Name"
                )
        )


        mvc.perform(MockMvcRequestBuilders
                .get("/api/events/event100")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id", `is`("event100")))
                .andExpect(jsonPath("$.name", `is`("Event Name")))
                .andExpect(jsonPath("$.startDateTime", `is`("2020-06-02T19:30:00")))
                .andExpect(jsonPath("$.endDateTime", `is`("2020-06-02T21:30:00")))
                .andExpect(jsonPath("$.description", `is`("Event Description")))
                .andExpect(jsonPath("$.venueName", `is`("Venue Name")))
    }

    @Test
    fun `get event by id returns status 404 if no event found`() {
        whenever(repo.getEventById("EventNotExisted"))
                .doAnswer {
                    throw EventNotFoundException()
                }


        mvc.perform(MockMvcRequestBuilders
                .get("/api/events/EventNotExisted")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound)
    }

    @Test
    fun `add event returns 200 and calls repository with right arguments`() {
        mvc.perform(MockMvcRequestBuilders
                .post("/api/events")
                .content("""{
                    |"name": "event name", 
                    |"startDateTime": "2020-06-02T19:30:00", 
                    |"endDateTime": "2020-06-02T21:30:00",
                    |"description": "some description",
                    |"venueName": "venue name"
                |}""".trimMargin())
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk)


        verify(repo).addEvent(NewEvent(
                "event name",
                LocalDateTime.of(2020, 6, 2, 19, 30),
                LocalDateTime.of(2020, 6, 2, 21, 30),
                "some description",
                "venue name"))
    }
}