-- Create document_submissions table
CREATE TABLE IF NOT EXISTS document_submissions (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_number VARCHAR(50),
  position VARCHAR(255),
  start_date DATE,
  additional_info TEXT,
  submission_status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create document_files table
CREATE TABLE IF NOT EXISTS document_files (
  id SERIAL PRIMARY KEY,
  submission_id INTEGER REFERENCES document_submissions(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_type VARCHAR(100),
  file_size INTEGER,
  file_url TEXT,
  document_type VARCHAR(100), -- 'job_offer', 'direct_deposit', 'contract', etc.
  upload_status VARCHAR(50) DEFAULT 'uploaded',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_document_submissions_user_id ON document_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_document_submissions_email ON document_submissions(email);
CREATE INDEX IF NOT EXISTS idx_document_files_submission_id ON document_files(submission_id);

-- Add RLS policies
ALTER TABLE document_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_files ENABLE ROW LEVEL SECURITY;

-- Policy for users to see only their own submissions
CREATE POLICY "Users can view own submissions" ON document_submissions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own submissions" ON document_submissions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own submissions" ON document_submissions
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy for document files
CREATE POLICY "Users can view own document files" ON document_files
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM document_submissions 
      WHERE document_submissions.id = document_files.submission_id 
      AND document_submissions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own document files" ON document_files
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM document_submissions 
      WHERE document_submissions.id = document_files.submission_id 
      AND document_submissions.user_id = auth.uid()
    )
  );
