--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0 (Debian 17.0-1.pgdg120+1)
-- Dumped by pg_dump version 17.0 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.users (id, name, email, password) VALUES ('7dacc1c0-88f7-4e6b-82d1-d5a103de9be6', NULL, 'd@s.com', '$2b$10$SbayYNrwpwloi/ib7oBw9OR/HJ56yRh/q4TptHA5rsh/5wQ94YZYO');


--
-- Data for Name: task_lists; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.task_lists (content, id, user_id) VALUES ('"{\"tasks\":[{\"id\":4,\"content\":\"cookies\",\"position\":1,\"isCompleted\":false},{\"id\":2,\"content\":\"jam\",\"position\":2,\"isCompleted\":false},{\"id\":5,\"content\":\"asdf\",\"isCompleted\":false,\"position\":3}],\"completedTasks\":[],\"userId\":\"7dacc1c0-88f7-4e6b-82d1-d5a103de9be6\",\"title\":\"Groceries\"}"', 3, '7dacc1c0-88f7-4e6b-82d1-d5a103de9be6');


--
-- Name: task_lists_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.task_lists_id_seq', 3, true);


--
-- PostgreSQL database dump complete
--

