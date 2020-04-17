CREATE TABLE events(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    start_date_time timestamp NOT NULL,
    end_date_time timestamp NOT NULL,
    description varchar(255) NOT NULL,
    venue_name varchar(255) NOT NULL
)