import { createClient } from '@supabase/supabase-js';
import { createCanvas, loadImage } from 'canvas';

const supabaseUrl = 'https://nxtapcvyyplrsjyxyzuk.supabase.co';
const supabaseAnonKey = 'sb_publishable_YdQRiZcsBmenFJ80ozswAg_Vg0Bw0Pb';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function compressBase64(base64Str) {
  if (!base64Str || !base64Str.startsWith('data:image')) return base64Str;
  
  try {
    const img = await loadImage(base64Str);
    const MAX_WIDTH = 600;
    const MAX_HEIGHT = 600;
    let width = img.width;
    let height = img.height;

    if (width > height) {
      if (width > MAX_WIDTH) {
        height = Math.round((height * MAX_WIDTH) / width);
        width = MAX_WIDTH;
      }
    } else {
      if (height > MAX_HEIGHT) {
        width = Math.round((width * MAX_HEIGHT) / height);
        height = MAX_HEIGHT;
      }
    }

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);

    // Compress using WebP? Canvas API might not support WebP output fully in node depending on build. 
    // We'll use JPEG or PNG (with extreme resize) to reduce size.
    // If we use JPEG, we should fill white background first to avoid black on transparent.
    const isTransparent = base64Str.includes('image/png') || base64Str.includes('image/webp');
    
    if (isTransparent) {
      // Still use png to preserve transparency, but resized
      return canvas.toDataURL('image/png');
    } else {
      return canvas.toDataURL('image/jpeg', 0.8);
    }
  } catch (err) {
    console.log("Failed to compress image:", err.message);
    return base64Str;
  }
}

async function fixDatabase() {
  console.log("Fetching huge DB payload...");
  const { data: readData, error: readError } = await supabase
    .from('settings')
    .select('data')
    .eq('id', 'krishna-scale-admin')
    .single();

  if (readError) {
    console.error("Read failed:", readError.message);
    return;
  }

  const settings = readData.data;
  console.log("Original size:", JSON.stringify(settings).length);

  if (settings.products) {
    for (let i = 0; i < settings.products.length; i++) {
      const p = settings.products[i];
      if (p.img) {
        p.img = await compressBase64(p.img);
      }
      if (p.gallery && p.gallery.length > 0) {
        for (let j = 0; j < p.gallery.length; j++) {
          p.gallery[j] = await compressBase64(p.gallery[j]);
        }
      }
    }
  }

  console.log("New compressed size:", JSON.stringify(settings).length);

  console.log("Saving back to DB...");
  const { error: writeError } = await supabase
    .from('settings')
    .upsert({ id: 'krishna-scale-admin', data: settings });

  if (writeError) {
    console.error("Write failed:", writeError.message);
  } else {
    console.log("Write success! Database is compressed.");
  }
}

fixDatabase();
