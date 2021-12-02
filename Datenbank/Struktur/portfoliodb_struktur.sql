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
-- Name: all_stocks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.all_stocks (
    stock_id integer NOT NULL,
    isin character varying,
    name character varying
);


ALTER TABLE public.all_stocks OWNER TO postgres;

--
-- Name: all_stocks_stock_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.all_stocks_stock_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.all_stocks_stock_id_seq OWNER TO postgres;

--
-- Name: all_stocks_stock_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.all_stocks_stock_id_seq OWNED BY public.all_stocks.stock_id;


--
-- Name: competition_members; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.competition_members (
    member_id integer NOT NULL,
    user_id integer,
    competition_id integer
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
-- Name: competition_stocks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.competition_stocks (
    competition_stocks_id integer NOT NULL,
    isin character varying NOT NULL,
    competition_id integer,
    stock_id integer
);


ALTER TABLE public.competition_stocks OWNER TO postgres;

--
-- Name: competitionStocks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."competitionStocks_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."competitionStocks_id_seq" OWNER TO postgres;

--
-- Name: competitionStocks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."competitionStocks_id_seq" OWNED BY public.competition_stocks.competition_stocks_id;


--
-- Name: competition_member_depot_lines; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.competition_member_depot_lines (
    depot_line_id integer NOT NULL,
    isin character varying NOT NULL,
    buy_price numeric NOT NULL,
    count integer NOT NULL,
    competition_id integer,
    member_id integer,
    buy_date date NOT NULL
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
    owner_id integer
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
    depot_id integer NOT NULL,
    date date NOT NULL,
    price numeric NOT NULL,
    count integer NOT NULL,
    buy_sell character varying NOT NULL,
    isin character varying,
    CONSTRAINT check_if_buy_or_sell CHECK ((((buy_sell)::text ~~ 'buy'::text) OR ((buy_sell)::text ~~ 'sell'::text)))
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
-- Name: all_stocks stock_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.all_stocks ALTER COLUMN stock_id SET DEFAULT nextval('public.all_stocks_stock_id_seq'::regclass);


--
-- Name: competition_member_depot_lines depot_line_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competition_member_depot_lines ALTER COLUMN depot_line_id SET DEFAULT nextval('public.competition_member_depot_lines_depot_id_seq'::regclass);


--
-- Name: competition_members member_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competition_members ALTER COLUMN member_id SET DEFAULT nextval('public."competitionMembers_DepotID_seq"'::regclass);


--
-- Name: competition_stocks competition_stocks_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competition_stocks ALTER COLUMN competition_stocks_id SET DEFAULT nextval('public."competitionStocks_id_seq"'::regclass);


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
-- Data for Name: all_stocks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.all_stocks (stock_id, isin, name) FROM stdin;
0	US0378331005	Apple
1	US5949181045	Microsoft
2	US0231351067	Amazon
3	0000	CURRENT MONEY
\.


--
-- Data for Name: competition_member_depot_lines; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.competition_member_depot_lines (depot_line_id, isin, buy_price, count, competition_id, member_id, buy_date) FROM stdin;
1	US0378331005	133.44	10	0	0	2021-11-17
2	US5949181045	300.10	5	0	2	2021-11-17
3	US0378331005	140.15	5	0	0	2021-12-02
4	US0378331005	132.12	8	0	1	2021-12-01
5	US5949181045	295.45	3	1	3	2021-11-25
7	0000	49704.55	1	1	3	2021-11-25
8	0000	24624.24	1	0	1	2021-11-24
\.


--
-- Data for Name: competition_members; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.competition_members (member_id, user_id, competition_id) FROM stdin;
0	0	0
1	1	0
2	2	0
3	1	1
\.


--
-- Data for Name: competition_stocks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.competition_stocks (competition_stocks_id, isin, competition_id, stock_id) FROM stdin;
2	US5949181045	0	1
1	US0378331005	0	0
4	0000	1	3
\.


--
-- Data for Name: competitions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.competitions (competition_id, creation_date, title, starting_money, active, end_date, owner_id) FROM stdin;
0	2021-11-17	Test-Competition	50000	t	2022-06-17	3
1	2021-12-01	Test-Competiion-2	25000	t	2022-12-01	2
\.


--
-- Data for Name: depot_records; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.depot_records (depot_records_id, depot_id, date, price, count, buy_sell, isin) FROM stdin;
1	1	2021-11-17	133.44	10	buy	US0378331005
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
-- Name: all_stocks_stock_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.all_stocks_stock_id_seq', 2, true);


--
-- Name: competitionMembers_DepotID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."competitionMembers_DepotID_seq"', 3, true);


--
-- Name: competitionStocks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."competitionStocks_id_seq"', 5, true);


--
-- Name: competition_member_depot_lines_depot_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.competition_member_depot_lines_depot_id_seq', 8, true);


--
-- Name: competitions_competition_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.competitions_competition_id_seq', 1, false);


--
-- Name: depotRecords_depot_records_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."depotRecords_depot_records_id_seq"', 1, true);


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
-- Name: competition_stocks competitionstocks_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competition_stocks
    ADD CONSTRAINT competitionstocks_pk PRIMARY KEY (competition_stocks_id);


--
-- Name: depot_records depotrecords_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.depot_records
    ADD CONSTRAINT depotrecords_pk PRIMARY KEY (depot_records_id);


--
-- Name: all_stocks table_name_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.all_stocks
    ADD CONSTRAINT table_name_pk PRIMARY KEY (stock_id);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (user_id);


--
-- Name: competitionstocks_isin_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX competitionstocks_isin_uindex ON public.competition_stocks USING btree (isin);


--
-- Name: table_name_isin_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX table_name_isin_uindex ON public.all_stocks USING btree (isin);


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
-- Name: competition_stocks CompetitionStocks_CompetitionID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competition_stocks
    ADD CONSTRAINT "CompetitionStocks_CompetitionID_fkey" FOREIGN KEY (competition_id) REFERENCES public.competitions(competition_id);


--
-- Name: competition_stocks CompetitionStocks_isin_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competition_stocks
    ADD CONSTRAINT "CompetitionStocks_isin_fkey" FOREIGN KEY (isin) REFERENCES public.all_stocks(isin);


--
-- Name: competition_stocks CompetitionStocks_stockID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competition_stocks
    ADD CONSTRAINT "CompetitionStocks_stockID_fkey" FOREIGN KEY (stock_id) REFERENCES public.all_stocks(stock_id);


--
-- Name: competitions Competitions_OwnerID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competitions
    ADD CONSTRAINT "Competitions_OwnerID_fkey" FOREIGN KEY (owner_id) REFERENCES public.users(user_id);


--
-- Name: depot_records DepotRecords_depot_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.depot_records
    ADD CONSTRAINT "DepotRecords_depot_id_fkey" FOREIGN KEY (depot_id) REFERENCES public.competition_member_depot_lines(depot_line_id);


--
-- Name: competition_member_depot_lines competition_member_depot_lines_isin_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competition_member_depot_lines
    ADD CONSTRAINT competition_member_depot_lines_isin_fkey FOREIGN KEY (isin) REFERENCES public.competition_stocks(isin);


--
-- Name: competition_member_depot_lines competition_member_depot_lines_isin_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competition_member_depot_lines
    ADD CONSTRAINT competition_member_depot_lines_isin_fkey1 FOREIGN KEY (isin) REFERENCES public.competition_stocks(isin);


--
-- Name: depot_records depot_records_isin_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.depot_records
    ADD CONSTRAINT depot_records_isin_fkey FOREIGN KEY (isin) REFERENCES public.competition_stocks(isin);


--
-- Name: TABLE all_stocks; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.all_stocks TO read_only;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.all_stocks TO read_write;


--
-- Name: SEQUENCE all_stocks_stock_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT USAGE ON SEQUENCE public.all_stocks_stock_id_seq TO read_write;


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
-- Name: TABLE competition_stocks; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.competition_stocks TO read_only;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.competition_stocks TO read_write;


--
-- Name: SEQUENCE "competitionStocks_id_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT USAGE ON SEQUENCE public."competitionStocks_id_seq" TO read_write;


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
-- Name: TABLE depot_records; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.depot_records TO read_only;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.depot_records TO read_write;


--
-- Name: SEQUENCE "depotRecords_depot_records_id_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT USAGE ON SEQUENCE public."depotRecords_depot_records_id_seq" TO read_write;


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

