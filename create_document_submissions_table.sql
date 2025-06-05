-- Create document_submissions table
CREATE TABLE IF NOT EXISTS document_submissions (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  email VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  employee_id VARCHAR(100),
  job_offer_letter_url TEXT,
  direct_deposit_form_url TEXT,
  contract_url TEXT,
  additional_documents JSONB DEFAULT '[]',
  status VARCHAR(50) DEFAULT 'pending',
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by VARCHAR(255),
  notes TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_document_submissions_user_id ON document_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_document_submissions_email ON document_submissions(email);
CREATE INDEX IF NOT EXISTS idx_document_submissions_status ON document_submissions(status);
CREATE INDEX IF NOT EXISTS idx_document_submissions_submitted_at ON document_submissions(submitted_at);

-- Enable RLS (Row Level Security)
ALTER TABLE document_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy for users to see their own submissions
CREATE POLICY "Users can view their own document submissions" ON document_submissions
  FOR SELECT USING (auth.uid() = user_id OR email = auth.jwt() ->> 'email');

-- Create policy for users to insert their own submissions
CREATE POLICY "Users can insert their own document submissions" ON document_submissions
  FOR INSERT WITH CHECK (auth.uid() = user_id OR email = auth.jwt() ->> 'email');

-- Create policy for admins to view all submissions
CREATE POLICY "Admins can view all document submissions" ON document_submissions
  FOR ALL USING (auth.jwt() ->> 'email' = 'wilsonligawa3@gmail.com');
