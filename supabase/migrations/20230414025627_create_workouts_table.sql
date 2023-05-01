create table workouts (
  id bigint primary key generated always as identity,
  created_at timestamptz default now(),
  title character varying(255) not null,
  description text not null,
  duration smallint not null,
  segmentsWithExercises jsonb not null,
  muscles_targeted character varying[] not null,
  difficulty character varying(255) not null,
  is_body_weight boolean not null,
  is_explosive boolean,
  requires_walking_room boolean, 
  requires_double_bells boolean
);