INSERT INTO `users` (id, username, password, enabled)
VALUES (1, "foo", "$2y$12$CDeqx50CvVCLHBXVXNU0IuHglZXe/tNJP0/E8dJQQGTG1q3SXI3Ly", true);
INSERT INTO `authorities` (user_id, authority)
VALUES (1, "ROLE_USER");