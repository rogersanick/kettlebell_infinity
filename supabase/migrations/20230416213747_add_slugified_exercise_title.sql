-- Drop column for slugified exercise title
ALTER TABLE exercises
ADD COLUMN title_slug character varying(255) not null;