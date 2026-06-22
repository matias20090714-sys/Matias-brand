-- SQL Migration Script for Matías Brand Member Portal
-- Copy and paste this script into your Supabase project's SQL Editor (https://supabase.com) to create the tables.

-- 1. Create 'matias_users' table
CREATE TABLE IF NOT EXISTS matias_users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    whatsapp TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user',
    status TEXT NOT NULL DEFAULT 'pendiente',
    "regDate" TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create 'matias_notifications' table
CREATE TABLE IF NOT EXISTS matias_notifications (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    "regDate" TEXT NOT NULL,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create 'matias_pdfs' table
CREATE TABLE IF NOT EXISTS matias_pdfs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "uploadDate" TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable public access (disable RLS for simplicity, matching the frontend direct access model)
ALTER TABLE matias_users DISABLE ROW LEVEL SECURITY;
ALTER TABLE matias_notifications DISABLE ROW LEVEL SECURITY;
ALTER TABLE matias_pdfs DISABLE ROW LEVEL SECURITY;

-- 5. Insert default Admin account (so you can log in as Admin immediately)
-- Email: admin@matias.com
-- Password: admin (Make sure to change this if needed, or register and approve your own admin account)
INSERT INTO matias_users (id, name, email, whatsapp, password, role, status, "regDate")
VALUES (
    'admin_seed',
    'Matías Admin',
    'admin@matias.com',
    '092707489',
    'admin',
    'admin',
    'aprobado',
    '21/6/2026'
) ON CONFLICT (email) DO NOTHING;

-- NOTE: To enable file uploads, you must also create a storage bucket in Supabase called 'pdfs' and set its visibility to "Public".
-- You can do this by going to Storage -> New bucket -> Name: "pdfs", Visibility: Public.

-- 6. Storage Policies for 'pdfs' bucket
-- If the policies already exist, we drop them first to prevent errors on re-runs.
DROP POLICY IF EXISTS "Allow Public Uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow Public Read" ON storage.objects;
DROP POLICY IF EXISTS "Allow Public Delete" ON storage.objects;
DROP POLICY IF EXISTS "Allow Public Update" ON storage.objects;

-- Allow anyone to upload files to the 'pdfs' bucket
CREATE POLICY "Allow Public Uploads" ON storage.objects
    FOR INSERT
    TO public
    WITH CHECK (bucket_id = 'pdfs');

-- Allow anyone to read files from the 'pdfs' bucket
CREATE POLICY "Allow Public Read" ON storage.objects
    FOR SELECT
    TO public
    USING (bucket_id = 'pdfs');

-- Allow anyone to delete files from the 'pdfs' bucket
CREATE POLICY "Allow Public Delete" ON storage.objects
    FOR DELETE
    TO public
    USING (bucket_id = 'pdfs');

-- Allow anyone to update/replace files in the 'pdfs' bucket
CREATE POLICY "Allow Public Update" ON storage.objects
    FOR UPDATE
    TO public
    USING (bucket_id = 'pdfs');

