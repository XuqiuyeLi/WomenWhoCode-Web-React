package com.example.reactserver.event

import java.time.LocalDateTime

data class Event(
        val id: String,
        val name: String,
        val startDateTime: LocalDateTime,
        val endDateTime: LocalDateTime,
        val description: String,
        val venueName: String
)