-- Create document_submissions table
CREATE TABLE IF NOT EXISTS document_submissions (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  email VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  employee_id VARCHAR(100),
  position VARCHAR(255),
  department VARCHAR(255),
  start_date DATE,
  
  -- Document URLs
  job_offer_letter_url TEXT,
  job_offer_letter_filename VARCHAR(255),
  direct_deposit_form_url TEXT,
  direct_deposit_form_filename VARCHAR(255),
  contract_url TEXT,
  contract_filename VARCHAR(255),
  passport_copy_url TEXT,
  passport_copy_filename VARCHAR(255),
  medical_certificate_url TEXT,
  medical_certificate_filename VARCHAR(255),
  seaman_book_url TEXT,
  seaman_book_filename VARCHAR(255),
  
  -- Additional documents as JSON array
  additional_documents JSONB DEFAULT '[]',
  
  -- Status and tracking
  status VARCHAR(50) DEFAULT 'pending',
  submission_notes TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by VARCHAR(255),
  admin_notes TEXT,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_document_submissions_user_id ON document_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_document_submissions_email ON document_submissions(email);
CREATE INDEX IF NOT EXISTS idx_document_submissions_status ON document_submissions(status);
CREATE INDEX IF NOT EXISTS idx_document_submissions_submitted_at ON document_submissions(submitted_at);
CREATE INDEX IF NOT EXISTS idx_document_submissions_employee_id ON document_submissions(employee_id);

-- Enable RLS (Row Level Security)
ALTER TABLE document_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own document submissions" ON document_submissions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own document submissions" ON document_submissions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own document submissions" ON document_submissions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all document submissions" ON document_submissions
  FOR ALL USING (auth.jwt() ->> 'email' = 'wilsonligawa3@gmail.com');

-- Create a trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_document_submissions_updated_at 
    BEFORE UPDATE ON document_submissions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
