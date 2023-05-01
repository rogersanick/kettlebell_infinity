export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      exercises: {
        Row: {
          created_at: string | null;
          description: string;
          difficulty: string;
          id: number;
          instructions: string;
          is_body_weight: boolean;
          is_explosive: boolean | null;
          max_bodyweight_percentage: number;
          max_recommended_reps: number | null;
          min_bodyweight_percentage: number;
          min_recommended_reps: number | null;
          muscles_targeted: string[];
          rep_duration: number | null;
          requires_double_bells: boolean | null;
          requires_walking_room: boolean | null;
          tagline: string;
          tips_and_tricks: string;
          title: string;
          title_slug: string;
        };
        Insert: {
          created_at?: string | null;
          description: string;
          difficulty: string;
          id?: never;
          instructions: string;
          is_body_weight: boolean;
          is_explosive?: boolean | null;
          max_bodyweight_percentage: number;
          max_recommended_reps?: number | null;
          min_bodyweight_percentage: number;
          min_recommended_reps?: number | null;
          muscles_targeted: string[];
          rep_duration?: number | null;
          requires_double_bells?: boolean | null;
          requires_walking_room?: boolean | null;
          tagline: string;
          tips_and_tricks: string;
          title: string;
          title_slug: string;
        };
        Update: {
          created_at?: string | null;
          description?: string;
          difficulty?: string;
          id?: never;
          instructions?: string;
          is_body_weight?: boolean;
          is_explosive?: boolean | null;
          max_bodyweight_percentage?: number;
          max_recommended_reps?: number | null;
          min_bodyweight_percentage?: number;
          min_recommended_reps?: number | null;
          muscles_targeted?: string[];
          rep_duration?: number | null;
          requires_double_bells?: boolean | null;
          requires_walking_room?: boolean | null;
          tagline?: string;
          tips_and_tricks?: string;
          title?: string;
          title_slug?: string;
        };
      };
      workouts: {
        Row: {
          created_at: string | null;
          description: string;
          difficulty: string;
          duration: number;
          id: number;
          is_body_weight: boolean;
          is_explosive: boolean | null;
          muscles_targeted: string[];
          requires_double_bells: boolean | null;
          requires_walking_room: boolean | null;
          segments_with_exercises: Json;
          title: string;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          description: string;
          difficulty: string;
          duration: number;
          id?: never;
          is_body_weight: boolean;
          is_explosive?: boolean | null;
          muscles_targeted: string[];
          requires_double_bells?: boolean | null;
          requires_walking_room?: boolean | null;
          segments_with_exercises: Json;
          title: string;
          user_id?: string;
        };
        Update: {
          created_at?: string | null;
          description?: string;
          difficulty?: string;
          duration?: number;
          id?: never;
          is_body_weight?: boolean;
          is_explosive?: boolean | null;
          muscles_targeted?: string[];
          requires_double_bells?: boolean | null;
          requires_walking_room?: boolean | null;
          segments_with_exercises?: Json;
          title?: string;
          user_id?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
