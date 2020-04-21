package com.example.reactserver.event

import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Repository

@Repository
class EventRepository(
        private val jdbcTemplate: JdbcTemplate
) {
    private val eventList = ArrayList<Event>()

    fun getAllEvents(): List<Event> {
        return jdbcTemplate.query(
                //language=MySQL
                """SELECT id, name, start_date_time, end_date_time, description, venue_name FROM events;"""
        ) { rs, _ ->
            Event(
                    id = rs.getString("id"),
                    name = rs.getString("name"),
                    startDateTime = rs.getTimestamp("start_date_time").toLocalDateTime(),
                    endDateTime = rs.getTimestamp("end_date_time").toLocalDateTime(),
                    description = rs.getString("description"),
                    venueName = rs.getString("venue_name")
            )
        }
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
        //language=MySQL
        jdbcTemplate.update(
                """INSERT INTO events 
                    (name, start_date_time, end_date_time, description, venue_name) 
                    VALUE (?, ?, ?, ?, ?)
                    """,
                newEvent.name,
                newEvent.startDateTime,
                newEvent.endDateTime,
                newEvent.description,
                newEvent.venueName
        )
    }

    fun getEventById(id: String): Event {
        return jdbcTemplate.query(
                //language=MySQL
                """SELECT id, name, start_date_time, end_date_time, description, venue_name FROM events WHERE id = ?;""",
                arrayOf<Any>(id)
        ) { rs, _ ->
            Event(
                    id = rs.getString("id"),
                    name = rs.getString("name"),
                    startDateTime = rs.getTimestamp("start_date_time").toLocalDateTime(),
                    endDateTime = rs.getTimestamp("end_date_time").toLocalDateTime(),
                    description = rs.getString("description"),
                    venueName = rs.getString("venue_name")
            )
        }.firstOrNull() ?: throw EventNotFoundException()
    }
}

class EventNotFoundException : Throwable("Event not found")