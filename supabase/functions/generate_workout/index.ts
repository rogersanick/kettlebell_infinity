/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Configuration, OpenAIApi } from 'https://esm.sh/openai'
import "https://deno.land/x/xhr@0.3.0/mod.ts"

import { corsHeaders } from "../_shared/cors.ts";

const configuration = new Configuration({
  apiKey: Deno.env.get("OPENAI_API_KEY"),
});

const openai = new OpenAIApi(configuration);

/** EDGE FUNCTION DEFINITION */
serve(async (req: any) => {

  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { duration, muscle_groups, skill_level } = await req.json()

    // Initial Prompt, get workout and segments
    const initialResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user", content: generateWorkoutOverviewPrompt(duration, muscle_groups, skill_level)
      }],
    });

    const extractedWorkout = JSON.parse(initialResponse.data.choices[0].message!.content!) as unknown as WorkoutOverview;

    // Sanitize and check duration
    const sanitizedResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user", content: sanitizeAndCheckDuration(extractedWorkout)
      }],
    });
    const extractedSanitizedWorkout = JSON.parse(sanitizedResponse.data.choices[0].message!.content!) as unknown as WorkoutOverview;

    return new Response(JSON.stringify(extractedSanitizedWorkout), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})

/** PROMPT GENERATION */
export const generateWorkoutOverviewPrompt = (duration: number, muscle_groups: string[], skill_level: string) => {
  return `Please define a kettlebell workout plan for an ${skill_level} athlete based on the provided target muscle groups.
      The title must be abstract and exciting. 
      The description should be a short paragraph. 
      Segment titles must be abstract and must NOT mention a specific exercise.
      Segments should be 8 minutes on average and must be at least 5 minutes.
      Longer workout durations should have longer segment durations.
      Only respond with valid JSON conforming to the Typescript type inputted below. 
      The duration of the workout is: ${duration}.
      
      Muscle Groups: “””
        ${muscle_groups}
      “””
      
      Typescript Type: """
        interface WorkoutOverview {
          title: string;
          description: string;
          duration: number;
          segments: {
            title: string;
            type: "AMRAP" | "EMOM"
            duration: number
          }[]
        }
      “””
    `;
}

export const sanitizeAndCheckDuration = (extractedWorkout: any) => {
  return `
    Only respond with edited JSON conforming to the type below:

      Typescript Type: """
      interface WorkoutOverview {
        title: string;
        description: string;
        duration: number;
        segments: {
          title: string;
          type: "AMRAP" | "EMOM"
          duration: number
        }[]
      }
    “””

    Adjust this input: ${JSON.stringify(extractedWorkout)} with the following instructions:
    1. segments MUST be longer than 5 minutes.
    2. Segment durations MUST sum to the workout duration. Remove or add segments as needed. 
  `
}

/** TYPE DEFINITIONS */
export interface WorkoutOverview {
  title: string;
  description: string;
  duration: number;
  segments: {
    title: string;
    type: "AMRAP" | "EMOM"
    duration: number
  }[]
}

// To invoke:

// First run: supabase functions serve generate_workout

// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
// --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
// --header 'Content-Type: application/json' \
// --data '{
//   "duration": "30",
//   "tags": ["aggressive", "intense"],
//   "muscle_groups": ["abs", "shoulders", "grip", "hamstrings"]
// }'