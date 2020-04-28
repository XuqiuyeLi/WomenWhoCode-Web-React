seed-local-db:
	mysql -u user -ppassword event_finder < seed-db.sql

run:
	./gradlew bootRun

test:
	./gradlew test

run-e2e-test-server:
	SPRING_PROFILES_ACTIVE=e2e ./gradlew bootRun