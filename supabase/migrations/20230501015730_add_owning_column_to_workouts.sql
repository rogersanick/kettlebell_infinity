SET search_path = public, auth;

ALTER TABLE workouts ADD column user_id uuid NOT NULL DEFAULT auth.uid();

ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY workouts_auth_insert ON workouts
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY workouts_private_select ON workouts FOR SELECT USING (user_id = auth.uid());

CREATE POLICY workouts_private_delete ON workouts FOR DELETE USING (user_id = auth.uid());