import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { query, dialect } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are an expert database query optimizer. Analyze SQL queries and return optimization results as JSON.

Given a SQL query and dialect, return ONLY valid JSON (no markdown) with this exact structure:
{
  "optimizedQuery": "the rewritten optimized SQL query",
  "explanation": "2-3 sentence explanation of what was optimized and why",
  "indexRecommendations": [
    {
      "table": "table_name",
      "columns": ["col1", "col2"],
      "type": "B-Tree / Hash / GIN / Composite",
      "impact": "high" | "medium" | "low",
      "reason": "why this index helps",
      "createStatement": "CREATE INDEX idx_name ON table (columns);"
    }
  ],
  "metrics": {
    "estimatedTimeOriginal": number_in_ms,
    "estimatedTimeOptimized": number_in_ms,
    "cpuReductionPercent": number,
    "ioReductionPercent": number,
    "costReductionPercent": number
  },
  "explainPlan": {
    "operation": "Sort / Hash Join / etc",
    "table": "table_name or null",
    "cost": number,
    "rows": number,
    "details": "description of this step",
    "children": [ ...nested nodes with same structure ]
  }
}

Be realistic with estimates. Provide actionable, specific optimizations. The explain plan should represent the OPTIMIZED query's execution plan.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Dialect: ${dialect}\n\nQuery:\n${query}` },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Please try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const aiData = await response.json();
    const content = aiData.choices?.[0]?.message?.content || "";
    
    // Parse JSON from response, handling possible markdown code blocks
    let parsed;
    try {
      const jsonStr = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsed = JSON.parse(jsonStr);
    } catch {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse optimization results");
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-query error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
