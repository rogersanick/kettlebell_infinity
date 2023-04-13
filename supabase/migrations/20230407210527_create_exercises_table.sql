create table exercises (
  id bigint primary key generated always as identity,
  created_at timestamptz default now(),
  title character varying(255) not null,
  tagline character varying(255) not null,
  description text not null,
  instructions text not null,
  muscles_targeted character varying[] not null,
  difficulty character varying(255) not null,
  tips_and_tricks text not null,
  max_bodyweight_percentage smallint not null,
  min_bodyweight_percentage smallint not null,
  rep_durations_seconds smallint not null,
  is_body_weight boolean not null
);