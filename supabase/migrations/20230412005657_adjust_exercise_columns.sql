-- Drop the 'rep_durations_seconds' column
ALTER TABLE exercises
DROP COLUMN min_rep_duration,
DROP COLUMN max_rep_duration;

-- Add the 'min_rep_duration' and 'max_rep_duration' columns
ALTER TABLE exercises
ADD COLUMN max_recommended_reps smallint,
ADD COLUMN min_recommended_reps smallint,
ADD COLUMN rep_duration smallint,
ADD COLUMN requires_walking_room boolean, 
ADD COLUMN requires_double_bells boolean, 
ADD COLUMN is_explosive boolean;
