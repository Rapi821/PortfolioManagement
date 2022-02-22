--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: competition_members; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.competition_members (
    member_id integer NOT NULL,
    user_id integer NOT NULL,
    competition_id integer NOT NULL
);


ALTER TABLE public.competition_members OWNER TO postgres;

--
-- Name: competitionMembers_DepotID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."competitionMembers_DepotID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."competitionMembers_DepotID_seq" OWNER TO postgres;

--
-- Name: competitionMembers_DepotID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."competitionMembers_DepotID_seq" OWNED BY public.competition_members.member_id;


--
-- Name: competition_member_depot_lines; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.competition_member_depot_lines (
    depot_line_id integer NOT NULL,
    isin character varying NOT NULL,
    buy_price numeric NOT NULL,
    count numeric NOT NULL,
    competition_id integer NOT NULL,
    member_id integer NOT NULL,
    CONSTRAINT buy_price_not_negative CHECK ((buy_price > (0)::numeric)),
    CONSTRAINT count_not_negative CHECK ((count > (0)::numeric))
);


ALTER TABLE public.competition_member_depot_lines OWNER TO postgres;

--
-- Name: competition_member_depot_lines_depot_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.competition_member_depot_lines_depot_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.competition_member_depot_lines_depot_id_seq OWNER TO postgres;

--
-- Name: competition_member_depot_lines_depot_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.competition_member_depot_lines_depot_id_seq OWNED BY public.competition_member_depot_lines.depot_line_id;


--
-- Name: competitions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.competitions (
    competition_id integer NOT NULL,
    creation_date date NOT NULL,
    title character varying NOT NULL,
    starting_money integer DEFAULT 100000,
    active boolean DEFAULT true,
    end_date date,
    owner_id integer NOT NULL,
    competition_code character varying(10) NOT NULL
);


ALTER TABLE public.competitions OWNER TO postgres;

--
-- Name: competitions_competition_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.competitions_competition_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.competitions_competition_id_seq OWNER TO postgres;

--
-- Name: competitions_competition_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.competitions_competition_id_seq OWNED BY public.competitions.competition_id;


--
-- Name: depot_records; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.depot_records (
    depot_records_id integer NOT NULL,
    member_id integer NOT NULL,
    price numeric NOT NULL,
    count numeric NOT NULL,
    buy_sell character varying NOT NULL,
    isin character varying NOT NULL,
    date date NOT NULL,
    CONSTRAINT check_if_buy_or_sell CHECK ((((buy_sell)::text ~~ 'buy'::text) OR ((buy_sell)::text ~~ 'sell'::text))),
    CONSTRAINT dr_count_not_negative CHECK ((count > (0)::numeric)),
    CONSTRAINT dr_price_not_negative CHECK ((price > (0)::numeric))
);


ALTER TABLE public.depot_records OWNER TO postgres;

--
-- Name: depotRecords_depot_records_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."depotRecords_depot_records_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."depotRecords_depot_records_id_seq" OWNER TO postgres;

--
-- Name: depotRecords_depot_records_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."depotRecords_depot_records_id_seq" OWNED BY public.depot_records.depot_records_id;


--
-- Name: user_sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_sessions (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.user_sessions OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    email character varying NOT NULL,
    firstname character varying NOT NULL,
    lastname character varying NOT NULL,
    password character varying NOT NULL,
    user_id integer NOT NULL,
    CONSTRAINT isemail CHECK (((email)::text ~~ '%_@__%.__%'::text))
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: TABLE users; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.users IS 'Table of all Users';


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.user_id;


--
-- Name: competition_member_depot_lines depot_line_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competition_member_depot_lines ALTER COLUMN depot_line_id SET DEFAULT nextval('public.competition_member_depot_lines_depot_id_seq'::regclass);


--
-- Name: competition_members member_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competition_members ALTER COLUMN member_id SET DEFAULT nextval('public."competitionMembers_DepotID_seq"'::regclass);


--
-- Name: competitions competition_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competitions ALTER COLUMN competition_id SET DEFAULT nextval('public.competitions_competition_id_seq'::regclass);


--
-- Name: depot_records depot_records_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.depot_records ALTER COLUMN depot_records_id SET DEFAULT nextval('public."depotRecords_depot_records_id_seq"'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: competition_member_depot_lines; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.competition_member_depot_lines (depot_line_id, isin, buy_price, count, competition_id, member_id) FROM stdin;
7	0000	24600.12	1	1	3
51	0000	20000	1	10	18
9	0000	3286.92	1	0	0
30	0000	28506.2	1	0	2
32	0000	10000	1	19	5
8	0000	6774.52	1	0	1
54	DE000A1EWWW0	499.22	2.18	20	6
33	0000	14500.78	1	20	6
49	US5949181045	4013.60	50	0	8
36	0000	10998.8	1	0	8
55	DE0008404005	999.75	4.65	21	7
34	0000	99000.2499999999999	1	21	7
\.


--
-- Data for Name: competition_members; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.competition_members (member_id, user_id, competition_id) FROM stdin;
0	0	0
1	1	0
2	2	0
3	1	1
5	8	19
6	8	20
7	8	21
8	8	0
18	8	10
\.


--
-- Data for Name: competitions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.competitions (competition_id, creation_date, title, starting_money, active, end_date, owner_id, competition_code) FROM stdin;
0	2021-11-17	Test-Competition	50000	t	2022-06-17	3	7H9OBF01YM
1	2021-12-01	Test-Competiion-2	25000	t	2022-12-01	2	3LB81ZCVYD
2	2021-12-02	Test-3	100000	t	\N	2	CJMTUDLUOT
10	2021-12-02	CRUD-POST-Competition	20000	t	2022-12-01	4	V12FO3FWNY
19	2022-01-22	Raphis Aktien Game	10000	t	2023-01-01	8	KZ39K54T8J
20	2022-01-22	Competition ohne Enddatum	15000	t	\N	8	44DJ71ETN0
21	2022-01-22	Competition mit zu wenig Startgeld	100000	t	\N	8	NMXR6K7EYH
\.


--
-- Data for Name: depot_records; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.depot_records (depot_records_id, member_id, price, count, buy_sell, isin, date) FROM stdin;
10	1	298.76	5	buy	US5949181045	2022-01-23
11	8	298.76	5	buy	US5949181045	2022-01-23
14	8	298.76	5	buy	US5949181045	2022-02-15
15	8	298.76	5	buy	US5949181045	2022-02-15
16	8	298.76	5	buy	US5949181045	2022-02-15
17	8	298.76	5	buy	US5949181045	2022-02-15
18	8	100	10	buy	US5949181045	2022-02-15
19	8	100	10	buy	US5949181045	2022-02-15
20	8	100	10	buy	US5949181045	2022-02-15
21	8	100	10	buy	US5949181045	2022-02-15
22	8	100	10	buy	US5949181045	2022-02-15
23	8	100	10	buy	US5949181045	2022-02-15
24	8	100	10	buy	US5949181045	2022-02-15
25	8	100	10	buy	US5949181045	2022-02-15
26	8	100	10	buy	US5949181045	2022-02-15
27	8	100	10	buy	US5949181045	2022-02-15
28	8	100	10	buy	US5949181045	2022-02-15
29	8	100	10	buy	US5949181045	2022-02-15
30	8	100	10	buy	US5949181045	2022-02-15
31	8	100	10	buy	US5949181045	2022-02-15
32	8	100	10	buy	US5949181045	2022-02-15
33	8	100	10	buy	US5949181045	2022-02-16
34	8	100	10	buy	US5949181045	2022-02-16
35	8	100	10	buy	US5949181045	2022-02-16
36	8	100	10	buy	US5949181045	2022-02-16
37	8	100	10	buy	US5949181045	2022-02-16
38	8	100	10	buy	US5949181045	2022-02-16
39	8	100	10	buy	US5949181045	2022-02-16
40	8	100	10	buy	US5949181045	2022-02-16
41	8	100	10	buy	US5949181045	2022-02-18
42	8	100	10	buy	US5949181045	2022-02-18
43	8	100	10	buy	US5949181045	2022-02-18
44	8	100	10	buy	US5949181045	2022-02-18
45	8	100	10	buy	US5949181045	2022-02-18
46	8	100	10	buy	US5949181045	2022-02-18
47	8	100	10	buy	US5949181045	2022-02-18
48	8	100	10	buy	US5949181045	2022-02-18
49	8	100	10	buy	US5949181045	2022-02-18
50	8	100	10	buy	US5949181045	2022-02-18
51	8	100	10	buy	US5949181045	2022-02-18
52	8	100	10	buy	US5949181045	2022-02-18
53	8	100	10	buy	US5949181045	2022-02-18
54	8	100	10	buy	US5949181045	2022-02-18
55	8	100	10	buy	US5949181045	2022-02-18
56	8	100	10	buy	US5949181045	2022-02-18
57	8	100	10	buy	US5949181045	2022-02-18
58	8	100	10	buy	US5949181045	2022-02-18
60	8	100	10	buy	US5949181045	2022-02-18
77	8	100	10	buy	US5949181045	2022-02-18
78	8	1000	1	sell	US5949181045	2022-02-18
79	8	1000	1	sell	US5949181045	2022-02-18
80	8	1000	1	sell	US5949181045	2022-02-18
81	8	1000	1	sell	US5949181045	2022-02-18
82	8	1000	1	sell	US5949181045	2022-02-18
83	8	1000	1	sell	US5949181045	2022-02-18
84	8	100	10	buy	US5949181045	2022-02-18
85	8	100	10	buy	US5949181045	2022-02-18
86	8	100	10	buy	US5949181045	2022-02-18
87	8	100	10	buy	US5949181045	2022-02-18
88	8	100	10	buy	US5949181045	2022-02-18
89	8	100	10	buy	US5949181045	2022-02-18
90	8	100	10	buy	US5949181045	2022-02-18
91	8	100	10	buy	US5949181045	2022-02-18
92	8	100	10	buy	US5949181045	2022-02-18
93	8	100	10	buy	US5949181045	2022-02-18
94	8	100	10	buy	US5949181045	2022-02-18
95	8	100	10	buy	US5949181045	2022-02-18
96	8	100	10	buy	US5949181045	2022-02-18
97	8	1000	1	sell	US5949181045	2022-02-18
98	8	1000	1	sell	US5949181045	2022-02-18
99	8	1000	1	sell	US5949181045	2022-02-18
100	8	1000	1	sell	US5949181045	2022-02-18
101	8	1000	1	sell	US5949181045	2022-02-18
102	8	1000	1	sell	US5949181045	2022-02-18
103	8	1000	1	sell	US5949181045	2022-02-18
104	8	1000	1	sell	US5949181045	2022-02-18
105	8	1000	1	sell	US5949181045	2022-02-18
106	8	1000	1	sell	US5949181045	2022-02-18
107	8	1000	1	sell	US5949181045	2022-02-18
108	8	1000	1	sell	US5949181045	2022-02-18
109	8	1000	1	sell	US5949181045	2022-02-18
110	8	1000	1	sell	US5949181045	2022-02-18
111	8	100	10	buy	US5949181045	2022-02-18
112	8	100	10	buy	US5949181045	2022-02-18
113	8	100	10	buy	US5949181045	2022-02-18
114	8	100	10	buy	US5949181045	2022-02-18
115	8	100	10	buy	US5949181045	2022-02-18
116	8	100	10	buy	US5949181045	2022-02-18
117	8	100	10	buy	US5949181045	2022-02-18
118	8	100	10	buy	US5949181045	2022-02-18
119	8	100	10	buy	US5949181045	2022-02-18
120	8	100	10	buy	US5949181045	2022-02-18
121	8	100	10	buy	US5949181045	2022-02-18
122	8	100	10	buy	US5949181045	2022-02-18
123	8	100	10	buy	US5949181045	2022-02-18
124	8	100	10	buy	US5949181045	2022-02-18
125	8	1000	1	sell	US5949181045	2022-02-18
126	8	1000	1	sell	US5949181045	2022-02-18
127	8	1000	1	sell	US5949181045	2022-02-18
128	8	1000	1	sell	US5949181045	2022-02-18
129	8	1000	1	sell	US5949181045	2022-02-18
130	8	1000	1	sell	US5949181045	2022-02-18
131	8	1000	1	sell	US5949181045	2022-02-18
132	8	1000	1	sell	US5949181045	2022-02-18
133	8	1000	1	sell	US5949181045	2022-02-18
134	8	1000	1	sell	US5949181045	2022-02-18
135	8	1000	1	sell	US5949181045	2022-02-18
136	8	1000	1	sell	US5949181045	2022-02-18
137	8	1000	1	sell	US5949181045	2022-02-18
138	8	1000	1	sell	US5949181045	2022-02-18
139	8	1000	1	sell	US5949181045	2022-02-18
140	8	100	10	buy	US5949181045	2022-02-18
141	8	100	10	sell	US5949181045	2022-02-18
142	8	100	10	buy	US5949181045	2022-02-18
143	8	100	10	buy	US5949181045	2022-02-18
144	8	100	10	sell	US5949181045	2022-02-18
145	8	100	10	buy	US5949181045	2022-02-20
146	8	100	10	buy	US5949181045	2022-02-20
147	8	100.12	10	buy	US5949181045	2022-02-20
148	7	215	4.65	buy	DE0008404005	2022-02-20
\.


--
-- Data for Name: user_sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_sessions (sid, sess, expire) FROM stdin;
2Y_mi_uGn_BzVDaVhaKGQoMXPKBjz9CA	{"cookie":{"originalMaxAge":2592000000,"expires":"2022-03-18T12:14:54.755Z","secure":false,"httpOnly":true,"path":"/"},"user":{"email":"wolfsberger.r03@htlwienwest.at","firstname":"Raphael","lastname":"Wolfsberger","password":"test123","user_id":8}}	2022-03-18 13:35:43
WfvjWusWxafDprkPbSpI_yIQoAixrt0l	{"cookie":{"originalMaxAge":2592000000,"expires":"2022-03-12T11:03:41.436Z","secure":false,"httpOnly":true,"path":"/"},"user":{"email":"wolfsberger.r03@htlwienwest.at","firstname":"Raphael","lastname":"Wolfsberger","password":"test123","user_id":8}}	2022-03-23 21:56:38
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (email, firstname, lastname, password, user_id) FROM stdin;
bilge.m01@htlwienwest.at	Mohammed Elyesa	Bilge	yu30e?NV!	0
brucker.j03@htlwienwest.at	Julian	Brucker	bSMMr#y6D	1
devall.s03@htlwienwest.at	Sebastian	de Vall	qHV3#ctbt	2
alfred.reisenberger@htlwienwest.at	Alfred	Reisenberger	1Rrj?xKZL	3
tina.jankowetz@htlwienwest.at	Tina	Jankowtz	@6o4#hwWQ	4
gocic.g02@htlwienwest.at	Gabriel	Gocic-Bogic	$iA?fmE9t	5
wolfsberger.r03@htlwienwest.at	Raphael	Wolfsberger	test123	8
\.


--
-- Name: competitionMembers_DepotID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."competitionMembers_DepotID_seq"', 21, true);


--
-- Name: competition_member_depot_lines_depot_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.competition_member_depot_lines_depot_id_seq', 55, true);


--
-- Name: competitions_competition_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.competitions_competition_id_seq', 21, true);


--
-- Name: depotRecords_depot_records_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."depotRecords_depot_records_id_seq"', 148, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 10, true);


--
-- Name: competition_member_depot_lines competitionmemberdepots_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competition_member_depot_lines
    ADD CONSTRAINT competitionmemberdepots_pk PRIMARY KEY (depot_line_id);


--
-- Name: competition_members competitionmembers_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competition_members
    ADD CONSTRAINT competitionmembers_pk PRIMARY KEY (member_id);


--
-- Name: competitions competitions_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competitions
    ADD CONSTRAINT competitions_pk PRIMARY KEY (competition_id);


--
-- Name: depot_records depotrecords_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.depot_records
    ADD CONSTRAINT depotrecords_pk PRIMARY KEY (depot_records_id);


--
-- Name: competition_member_depot_lines isin_member_comp_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competition_member_depot_lines
    ADD CONSTRAINT isin_member_comp_unique UNIQUE (isin, member_id, competition_id);


--
-- Name: user_sessions session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_sessions
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: competition_members user_member_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competition_members
    ADD CONSTRAINT user_member_unique UNIQUE (user_id, competition_id);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (user_id);


--
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_session_expire" ON public.user_sessions USING btree (expire);


--
-- Name: competitions_competition_code_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX competitions_competition_code_uindex ON public.competitions USING btree (competition_code);


--
-- Name: competition_member_depot_lines CompetitionMemberDepots_CompetitionID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competition_member_depot_lines
    ADD CONSTRAINT "CompetitionMemberDepots_CompetitionID_fkey" FOREIGN KEY (competition_id) REFERENCES public.competitions(competition_id);


--
-- Name: competition_member_depot_lines CompetitionMemberDepots_MemberID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competition_member_depot_lines
    ADD CONSTRAINT "CompetitionMemberDepots_MemberID_fkey" FOREIGN KEY (member_id) REFERENCES public.competition_members(member_id);


--
-- Name: competition_members CompetitionMembers_CompetitionID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competition_members
    ADD CONSTRAINT "CompetitionMembers_CompetitionID_fkey" FOREIGN KEY (competition_id) REFERENCES public.competitions(competition_id);


--
-- Name: competition_members CompetitionMembers_UserID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competition_members
    ADD CONSTRAINT "CompetitionMembers_UserID_fkey" FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: competitions Competitions_OwnerID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competitions
    ADD CONSTRAINT "Competitions_OwnerID_fkey" FOREIGN KEY (owner_id) REFERENCES public.users(user_id);


--
-- Name: depot_records fk_member_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.depot_records
    ADD CONSTRAINT fk_member_id FOREIGN KEY (member_id) REFERENCES public.competition_members(member_id);


--
-- Name: TABLE competition_members; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.competition_members TO read_only;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.competition_members TO read_write;


--
-- Name: SEQUENCE "competitionMembers_DepotID_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT USAGE ON SEQUENCE public."competitionMembers_DepotID_seq" TO read_write;


--
-- Name: TABLE competition_member_depot_lines; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.competition_member_depot_lines TO read_only;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.competition_member_depot_lines TO read_write;


--
-- Name: SEQUENCE competition_member_depot_lines_depot_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT USAGE ON SEQUENCE public.competition_member_depot_lines_depot_id_seq TO read_write;


--
-- Name: TABLE competitions; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.competitions TO read_only;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.competitions TO read_write;


--
-- Name: SEQUENCE competitions_competition_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT USAGE ON SEQUENCE public.competitions_competition_id_seq TO read_write;


--
-- Name: TABLE depot_records; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.depot_records TO read_only;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.depot_records TO read_write;


--
-- Name: SEQUENCE "depotRecords_depot_records_id_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT USAGE ON SEQUENCE public."depotRecords_depot_records_id_seq" TO read_write;


--
-- Name: TABLE user_sessions; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.user_sessions TO read_write;


--
-- Name: TABLE users; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.users TO read_only;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.users TO read_write;


--
-- Name: SEQUENCE users_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT USAGE ON SEQUENCE public.users_id_seq TO read_write;


--
-- PostgreSQL database dump complete
--

