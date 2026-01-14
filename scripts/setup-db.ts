import { Client } from "pg"

const client = new Client({
  connectionString: process.env.POSTGRES_URL,
})

async function main() {
  await client.connect()

  try {
    console.log("Creating tables...")

    // Create jobs table
    await client.query(`
      CREATE TABLE IF NOT EXISTS jobs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        department TEXT NOT NULL,
        description TEXT NOT NULL,
        requirements TEXT NOT NULL,
        salary_range TEXT NOT NULL,
        location TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `)

    // Create applications table
    await client.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        full_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        job_title TEXT NOT NULL,
        resume_url TEXT,
        cover_letter TEXT,
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `)

    console.log("Tables created successfully")
  } catch (err) {
    console.error("Error creating tables:", err)
  } finally {
    await client.end()
  }
}

main()
