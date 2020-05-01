package com.example.reactserver.event

import org.hamcrest.CoreMatchers.equalTo
import org.hamcrest.MatcherAssert.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.http.*
import org.springframework.test.context.jdbc.Sql
import org.springframework.util.LinkedMultiValueMap


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Sql(scripts = ["classpath:cleardb.sql", "classpath:seed-test-db.sql"])
class LogOutTest {
    @Autowired
    private lateinit var restTemplate: TestRestTemplate

    @Test
    fun `logout request log user out and clears cookie session`() {
        val cookie = loginAndGetSessionCookie()
        val headers = HttpHeaders()
        headers.add("Cookie", cookie)


        val responseEntity = restTemplate.exchange(
                "/api/logout",
                HttpMethod.POST,
                HttpEntity<Unit>(headers),
                Unit.javaClass
        )


        assertThat(responseEntity.statusCode, equalTo(HttpStatus.OK))
        val addEventResponseEntity = restTemplate.exchange(
                "/api/events",
                HttpMethod.POST,
                HttpEntity<Unit>(headers),
                Unit.javaClass
        )
        assertThat(addEventResponseEntity.statusCode, equalTo(HttpStatus.FORBIDDEN))
    }

    private fun loginAndGetSessionCookie(): String? {
        val headers = HttpHeaders()
        headers.contentType = MediaType.APPLICATION_FORM_URLENCODED

        val credentials = LinkedMultiValueMap<String, String>()
        credentials.set("username", "foo")
        credentials.set("password", "bar")

        val entity = restTemplate.exchange(
                "/api/login",
                HttpMethod.POST,
                HttpEntity(credentials, headers),
                Unit.javaClass)

        return entity.headers.getFirst(HttpHeaders.SET_COOKIE)
    }
}