package com.example.reactserver

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class ReactServerApplication

fun main(args: Array<String>) {
	runApplication<ReactServerApplication>(*args)
}
