package com.example.reactserver.event

import com.nhaarman.mockitokotlin2.mock
import com.nhaarman.mockitokotlin2.whenever
import org.hamcrest.Matchers.`is`
import org.junit.jupiter.api.BeforeEach
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

@WebMvcTest
class EventControllerTest {

    @Autowired
    private lateinit var mvc: MockMvc

    @MockBean
    private lateinit var repo: EventRepository

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
                                Event.Venue("venue name",
                                        "venue address",
                                        "Tokyo")
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
                .andExpect(jsonPath("$[0].venue.name", `is`("venue name")))
                .andExpect(jsonPath("$[0].venue.address", `is`("venue address")))
                .andExpect(jsonPath("$[0].venue.city", `is`("Tokyo")))
    }
}