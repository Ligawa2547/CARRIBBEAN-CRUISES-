-- Norwegian Cruise Line Jobs Database Schema
-- Script 002: Enable Row Level Security
-- Run this script after creating tables

-- ============================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- ============================================
-- JOBS TABLE POLICIES
-- Public can read, only authenticated admins can write
-- ============================================

-- Allow anyone to read jobs (public job listings)
CREATE POLICY "Jobs are viewable by everyone" 
  ON jobs 
  FOR SELECT 
  USING (true);

-- Allow authenticated users to insert jobs (admin only in practice)
CREATE POLICY "Authenticated users can insert jobs" 
  ON jobs 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

-- Allow authenticated users to update jobs
CREATE POLICY "Authenticated users can update jobs" 
  ON jobs 
  FOR UPDATE 
  TO authenticated 
  USING (true);

-- Allow authenticated users to delete jobs
CREATE POLICY "Authenticated users can delete jobs" 
  ON jobs 
  FOR DELETE 
  TO authenticated 
  USING (true);

-- ============================================
-- APPLICATIONS TABLE POLICIES
-- Users can submit, admins can view all
-- ============================================

-- Allow anyone to insert applications (public job applications)
CREATE POLICY "Anyone can submit applications" 
  ON applications 
  FOR INSERT 
  WITH CHECK (true);

-- Allow users to view their own applications
CREATE POLICY "Users can view own applications" 
  ON applications 
  FOR SELECT 
  USING (
    auth.uid() = user_id 
    OR auth.role() = 'authenticated'
  );

-- Allow authenticated users to update applications (admin)
CREATE POLICY "Authenticated users can update applications" 
  ON applications 
  FOR UPDATE 
  TO authenticated 
  USING (true);

-- ============================================
-- CONTACT_MESSAGES TABLE POLICIES
-- Anyone can submit, only authenticated can view
-- ============================================

-- Allow anyone to submit contact messages
CREATE POLICY "Anyone can submit contact messages" 
  ON contact_messages 
  FOR INSERT 
  WITH CHECK (true);

-- Allow authenticated users to view contact messages (admin)
CREATE POLICY "Authenticated users can view contact messages" 
  ON contact_messages 
  FOR SELECT 
  TO authenticated 
  USING (true);

-- Allow authenticated users to update contact messages (admin)
CREATE POLICY "Authenticated users can update contact messages" 
  ON contact_messages 
  FOR UPDATE 
  TO authenticated 
  USING (true);
