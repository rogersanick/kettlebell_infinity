SET search_path = public, auth;

ALTER TABLE workouts ADD column user_id uuid NOT NULL DEFAULT auth.uid();

ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY workouts_auth_insert ON workouts FOR INSERT USING ( auth.uid() = user_id );

CREATE POLICY workouts_private ON workouts USING (user_id = auth.uid());