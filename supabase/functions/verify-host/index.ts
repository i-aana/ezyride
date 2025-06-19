import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import bcrypt from "https://esm.sh/bcryptjs@2.4.3";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { username, password } = await req.json();
    console.log("Login attempt for:", username);

    const { data: host, error } = await supabase
      .from("hosts")
      .select("id, password_hash")
      .eq("username", username)
      .single();

    if (error) {
      console.error("Supabase error:", error.message);
    }

    console.log("Fetched host from DB:", host);

    if (error || !host) {
      console.warn("Host not found or query failed");
      return new Response(JSON.stringify({ success: false, reason: "host-not-found" }), {
        status: 401,
        headers: corsHeaders,
      });
    }

    const match = bcrypt.compareSync(password, host.password_hash);
    console.log("Password match result:", match);

    return new Response(JSON.stringify({ success: match }), {
      status: match ? 200 : 401,
      headers: corsHeaders,
    });
  } catch (err) {
    console.error("Login error:", err.message);
    return new Response(JSON.stringify({ success: false, error: "Internal error" }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});
