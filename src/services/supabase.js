import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://fswhsxhtfderrnueplru.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzd2hzeGh0ZmRlcnJudWVwbHJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIwNjg1OTksImV4cCI6MjAyNzY0NDU5OX0.GByFlauPHeP915vKsIR8mY5mJkpt4UK6_AehYRs0uCY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
