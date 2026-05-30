import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nxtapcvyyplrsjyxyzuk.supabase.co';
const supabaseAnonKey = 'sb_publishable_YdQRiZcsBmenFJ80ozswAg_Vg0Bw0Pb';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testSupabase() {
  console.log("Testing read...");
  const { data: readData, error: readError } = await supabase
    .from('settings')
    .select('data')
    .eq('id', 'krishna-scale-admin')
    .single();

  if (readError) {
    console.error("Read failed:", readError.message, readError.code);
  } else {
    console.log("Read success. Data length:", JSON.stringify(readData).length);
  }

  console.log("Testing write...");
  const testData = readData ? readData.data : { test: true };
  if (!testData.contactInfo) testData.contactInfo = {};
  testData.contactInfo.testUpdate = Date.now();

  const { data: writeData, error: writeError } = await supabase
    .from('settings')
    .upsert({ id: 'krishna-scale-admin', data: testData });

  if (writeError) {
    console.error("Write failed:", writeError.message, writeError.code);
  } else {
    console.log("Write success!");
  }
}

testSupabase();
