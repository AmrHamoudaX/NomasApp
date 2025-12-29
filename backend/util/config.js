import "dotenv/config";

const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 3001;
const SECRET_KEY = process.env.SECRET_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

export { DATABASE_URL, PORT, SECRET_KEY, SUPABASE_URL, SUPABASE_KEY };
