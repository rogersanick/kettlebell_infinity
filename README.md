# README - Supabase Hackathon Project Submission

## Project Name: Kettlebell Infinity

### Project Description (Process):

When the COVID-19 pandemic hit the United States, our team, along with 40 million other American apartment dwellers, found ourselves locked down in cramped quarters. Our routines in disarray, we searched high and low for ways to maintain our health and sanity while stuck inside tiny living spaces fit for sardines.

Lo and behold, we discovered the humble Kettlebell—a small yet mighty strength and conditioning tool with the uncanny ability to hide in a pantry when not in use. The kettlebell promised the world (or at least, a full body workout) to those who could unlock its secrets.

But alas, we couldn't. So began our epic quest to scour YouTube for elusive training videos, seeking guidance from expert kettlebell whisperers hidden away in the far reaches of Eastern Europe. We learned the ancient art of swinging this magnificent orb on a handle.

Fast forward three years, and kettlebells are now the cool kids on the block. Gyms have embraced this Eastern European dumbbell alternative with open arms (and sore muscles). Heck, even the New York Times jumped on the bandwagon and gave kettlebells the [star treatment](https://www.nytimes.com/2023/04/12/well/move/kettlebells-weight-training.html). But here's the catch—while the kettlebell is enjoying its newfound popularity, professional instruction remains rarer than a peaceful comment section on social media.

That's where Kettlebell Infinity comes to the rescue: a powerful and convenient tool to deliver safe, effective kettlebell workouts for all skill levels.

### Product

Kettlebell Infinity, built with Supabase, Next.js, Tailwind CSS and supercharged with AI, enables it's users to develop unique, exciting and _accessible_ on-demand workouts. We adjust for skill-level, the muscles you want to focus on and what equipment you have available. Kettlebell infinity offers a range of fantastic features designed to make your kettlebell workouts engaging, personalized, and enjoyable:

- **AI-Generated Unique and Customizable Workouts**: Utilizing the power of AI, we create workouts tailored to your skill level, target muscle group, and available kettlebell equipment. No more generic workouts; Kettlebell Infinity is all about crafting the perfect workout experience designed just for you.

- **Live Workout Interface**: We've seen the rise of live workout giants like Peloton over the pandemic era, why? Because they're live workout interfaces are incredibly engaging. Inspired by this UX - we've built an engaging interface to lead users through a live workout with the information and video media they need to succeed.

- **On-Demand Exercise Demos**: Need a quick refresher on an exercise? We've got your back! Kettlebell Infinity provides on-demand video demonstrations from our expert coaches, ensuring you have a clear understanding of each exercise's proper form and technique. It's like having a personal coach at your fingertips, ready to assist whenever you need them.
- **Save Workouts for Later**: Discover a workout you can't get enough of? Save it and revisit it anytime you want. With Kettlebell Infinity, you can build a library of your favorite workouts, making it easy to establish a consistent routine and stay on track to crush your fitness goals.
- **(Coming Soon) - Live Workout Interface with AI Assistance**: Immerse yourself in a dynamic, interactive workout experience powered by our AI agent. The AI will guide you through each exercise, providing prompts and encouragement along the way. It's like having your own personal AI trainer cheering you on.

With these AI-driven features, Kettlebell Infinity becomes your ultimate fitness partner, helping you revolutionize your kettlebell workouts and elevate your fitness journey to new heights.

### The Supabase Magic We Used:

In our mission to create Kettlebell Infinity, we tapped into the incredible capabilities of Supabase to deliver a top-notch user experience:

- **Supabase Auth**: We devised a way for users to save their workouts, and in the near future, share them with friends (or rivals, if they fancy a challenge).
- **Supabase Database**: This digital vault stores a wealth of workout plans, AI-generated kettlebell exercise descriptions, and workout progress records for our platform's ever-expanding community of athletes.
- **Supabase Storage**: We recorded our team's demonstrations of each kettlebell exercise (literally over 100 exercises, we are still sore) and securely stored them for your edification and enjoyment. The API + GUI was astonishingly easy to use.
- **Supabase Edge Functions**: We used the OpenAI API in Supabase edge functions to provide our users with a seamless experience, abstracting complexity and sanitizing AI responses without exposing client side access to an expensive API.
- **Supabase Typegen**: All of our work is written in TS. Supabase typegen allowed our dev team to write clean, idiomatic code with as little overhead as you could possibly imagine. Typegen was accessible, effective and a pleasure to work with.

### The OpenAI Magic We Used

In our pursuit of kettlebell greatness, we summoned the mighty power of OpenAI to breathe life into Kettlebell Infinity:

- **Generating Workout Plans**: OpenAI waved its metaphorical wand to conjure up workout plans, ensuring that our users have a variety of options to suit their goals, preferences, and mood.
- **Crafting Exercise Descriptions**: OpenAI put pen to paper (or rather, bytes to database) to create detailed and informative exercise descriptions, making sure users understand the ins and outs of every kettlebell movement.
- **Structuring Exercise Data**: OpenAI meticulously designed the data structure representing all exercises like a master architect. It's like having a massive, well-organized table where each row is a kettlebell exercise, meticulously cataloged for easy reference.
- **Generating and Refining Code**: OpenAI's ChatGPT became our code wizard, helping us write React components and Tailwind CSS with the finesse of a seasoned developer. It's like having a magical coding companion, making Kettlebell Infinity's development process smoother than a well-oiled kettlebell swing.

Behold the OpenAI enchantments that make Kettlebell Infinity the ultimate fitness companion for kettlebell enthusiasts everywhere. With such impressive AI support, we're confident that your workouts will be nothing short of magical.

And so, dear reader, there you have it: the remarkable blend of Supabase technologies that fuels Kettlebell Infinity. We've spared no effort in ensuring your kettlebell workouts are as engaging and enjoyable as possible.

## Sneaky Disclaimer

Oh, by the way, this README is brought to you (in part) by ChatGPT, your friendly AI writing assistant. The dev team behind KB Infinity has poured all their energy into developing this product, with their remaining neurons - they piped in bullet points of information and asked for markdown in return. With some light editing / sanity checking, what you have read has been mostly AI generated. Now, allow me to serenade you with a poem about Supabase, the ultimate backend as a service product.

## Ode to Supabase

In a world of data vast and wide, Supabase stands tall, a beacon of pride.
Firebase once reigned, but now it's clear, An open-source alternative is here.

From Auth to Storage, Database too, Edge Functions make your dreams come true.
And a backend built for a world so new,
Supabase, our love for you is true.

Oh, how they've changed the game we play,
Innovating - they lead the way.
No more lock-ins, no more strife,
Supabase brings our apps to life.

A revolution for the digital age,
Their open-source model takes center stage.
With hearts afire, we sing their praise,
Supabase, you've set our world ablaze.
