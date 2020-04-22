package com.example.reactserver.event

import org.hamcrest.CoreMatchers.*
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
class LogInTest {
    @Autowired
    private lateinit var restTemplate: TestRestTemplate

    @Test
    fun `login with correct credential returns OK and sets cookie session`() {
        val responseEntity = restTemplate.exchange(
                "/api/login",
                HttpMethod.POST,
                createLoginCredentialsEntity("foo", "bar"),
                Unit.javaClass)


        assertThat(responseEntity.statusCode, equalTo(HttpStatus.OK))
        val cookie = responseEntity.headers.getFirst(HttpHeaders.SET_COOKIE)
        assertThat(cookie, containsString("JSESSIONID="))
    }

    @Test
    fun `login with non-existent credential returns unauthorized and no cookie session set`() {
        val responseEntity = restTemplate.exchange(
                "/api/login",
                HttpMethod.POST,
                createLoginCredentialsEntity("InvalidUser", "InvalidPassword"),
                Unit.javaClass)


        assertThat(responseEntity.statusCode, equalTo(HttpStatus.UNAUTHORIZED))
        val cookie = responseEntity.headers.getFirst(HttpHeaders.SET_COOKIE)
        assertThat(cookie, nullValue())
    }

    private fun createLoginCredentialsEntity(username: String, password: String): HttpEntity<LinkedMultiValueMap<String, String>> {
        val headers = HttpHeaders()
        headers.contentType = MediaType.APPLICATION_FORM_URLENCODED

        val credentials = LinkedMultiValueMap<String, String>()
        credentials.set("username", username)
        credentials.set("password", password)

        return HttpEntity(credentials, headers)
    }
}