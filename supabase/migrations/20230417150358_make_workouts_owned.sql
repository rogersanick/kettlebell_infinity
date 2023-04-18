-- Drop column for slugified exercise title
ALTER TABLE exercises
ADD COLUMN owner_id character varying(255) not null;