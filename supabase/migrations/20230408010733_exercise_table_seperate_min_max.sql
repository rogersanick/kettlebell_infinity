-- Drop the 'rep_durations_seconds' column
ALTER TABLE exercises
DROP COLUMN rep_durations_seconds;

-- Add the 'min_rep_duration' and 'max_rep_duration' columns
ALTER TABLE exercises
ADD COLUMN min_rep_duration smallint,
ADD COLUMN max_rep_duration smallint;