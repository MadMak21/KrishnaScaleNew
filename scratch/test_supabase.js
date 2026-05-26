const supabaseUrl = "https://nxtapcvyyplrsjyxyzuk.supabase.co";
const supabaseAnonKey = "sb_publishable_YdQRiZcsBmenFJ80ozswAg_Vg0Bw0Pb";

async function runTest() {
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/settings?id=eq.krishna-scale-admin`, {
      headers: {
        "apikey": supabaseAnonKey,
        "Authorization": `Bearer ${supabaseAnonKey}`,
        "Content-Type": "application/json"
      }
    });

    const body = await response.json();
    console.log("DATABASE ROW:", JSON.stringify(body, null, 2));
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

runTest();
