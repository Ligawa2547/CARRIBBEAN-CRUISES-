-- Norwegian Cruise Line Jobs Database Schema
-- Script 003: Seed Sample Jobs Data
-- Run this script to add sample job listings (optional)

-- Clear existing sample data (if any)
-- DELETE FROM jobs WHERE title LIKE '%Sample%';

-- Insert sample job listings
INSERT INTO jobs (title, department, description, requirements, salary_range, location) VALUES
(
  'Cruise Ship Captain',
  'Navigation',
  'Lead and command cruise vessel operations ensuring safe and efficient voyages. Responsible for overall ship safety, navigation, and crew management. Oversee all deck operations and maintain compliance with maritime regulations.',
  '- Master Mariner Certificate (Unlimited)\n- Minimum 10 years sea experience\n- 5+ years in senior officer positions\n- STCW certification\n- Excellent leadership and communication skills\n- Crisis management experience',
  '$150,000 - $200,000',
  'Caribbean Routes'
),
(
  'Executive Chef',
  'Food & Beverage',
  'Create exceptional dining experiences for cruise guests. Manage kitchen operations, develop menus, oversee food quality and presentation. Lead culinary team and ensure compliance with health and safety standards.',
  '- Culinary degree or equivalent experience\n- 8+ years culinary experience\n- 3+ years in executive chef role\n- Experience in high-volume operations\n- Knowledge of international cuisines\n- Food safety certification',
  '$80,000 - $120,000',
  'All Routes'
),
(
  'Guest Services Manager',
  'Hospitality',
  'Oversee all guest services operations to ensure exceptional passenger experiences. Handle guest inquiries, resolve complaints, and coordinate with various departments to meet guest needs.',
  '- Bachelor''s degree in Hospitality or related field\n- 5+ years hospitality experience\n- 2+ years in supervisory role\n- Excellent communication skills\n- Multilingual preferred\n- Customer service excellence',
  '$55,000 - $75,000',
  'Mediterranean Routes'
),
(
  'Marine Engineer',
  'Engineering',
  'Maintain and repair ship mechanical systems including propulsion, electrical, and HVAC systems. Ensure all engineering operations comply with maritime safety standards.',
  '- Marine Engineering degree\n- Chief Engineer Certificate of Competency\n- 5+ years marine engineering experience\n- STCW certification\n- Strong troubleshooting skills',
  '$90,000 - $130,000',
  'All Routes'
),
(
  'Entertainment Director',
  'Entertainment',
  'Plan and oversee all entertainment programs and activities aboard the cruise ship. Manage entertainment staff, coordinate shows, and create engaging experiences for guests of all ages.',
  '- Bachelor''s degree in Entertainment, Theater, or related field\n- 5+ years entertainment industry experience\n- Experience managing teams\n- Creative programming skills\n- Strong organizational abilities',
  '$60,000 - $85,000',
  'Alaska Routes'
),
(
  'Spa Manager',
  'Wellness',
  'Manage spa operations including staff scheduling, treatment menu development, and guest satisfaction. Ensure high-quality wellness services and maintain spa equipment and supplies.',
  '- Certification in spa management or cosmetology\n- 4+ years spa experience\n- 2+ years management experience\n- Knowledge of wellness trends\n- Sales and customer service skills',
  '$50,000 - $70,000',
  'Caribbean Routes'
);
