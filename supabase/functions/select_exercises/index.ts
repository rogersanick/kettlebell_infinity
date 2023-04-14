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
    const { segments, exercises } = await req.json()

    // Initial Prompt, get workout and segments
    const initialResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user", content: selectExercisesForSegmentsPrompt(segments, exercises)
      }],
    });

    const selectedExercises = JSON.parse(initialResponse.data.choices[0].message!.content!) as unknown as string[][];

    return new Response(JSON.stringify(selectedExercises), {
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
export const selectExercisesForSegmentsPrompt = (segments: string, exercises: string) => {
  return `
  Only respond with valid JSON in this format: string[][]
   
  Choose exercises from the provided list of exercises for each of these segments: ${segments}.
  Include 2-3 exercises with a maximum of 3 for EMOM and a 3-5 exercises with a maximum of 5 for AMRAP.

  Exercises: """   
    ${exercises}
  """
  `;
}

// To invoke:

// First run: supabase functions serve select_exercises

// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
// --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
// --header 'Content-Type: application/json' \
// --data '{
//   "duration": "30",
//   "tags": ["aggressive", "intense"],
//   "muscle_groups": ["abs", "shoulders", "grip", "hamstrings"]
// }'