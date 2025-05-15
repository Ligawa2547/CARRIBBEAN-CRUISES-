"use server"

import { createServerSupabaseClient } from "@/lib/supabase"

interface JobData {
  title: string
  department: string
  description: string
  requirements: string
  salary_range: string
  location: string
}

export async function addHospitalityJobs() {
  const supabase = createServerSupabaseClient()

  // Define all 29 hospitality jobs with detailed information
  const hospitalityJobs: JobData[] = [
    // Hotel Operations & Guest Services
    {
      title: "Hotel Director",
      department: "Hotel Operations",
      description:
        "As Hotel Director, you will oversee all hospitality services onboard our luxury cruise ships. You'll be responsible for managing all hotel departments including housekeeping, food and beverage, guest services, and entertainment to ensure exceptional guest experiences. You'll coordinate with department heads, manage budgets, and implement service standards that align with our company's vision of luxury cruise experiences.",
      requirements:
        "Minimum 10 years of experience in luxury hotel or cruise ship management with at least 5 years in a senior leadership role. Bachelor's degree in Hospitality Management or related field required, Master's preferred. Strong leadership, communication, and problem-solving skills. Experience managing large teams and multiple departments simultaneously. Knowledge of international hospitality standards and regulations.",
      salary_range: "$120,000 - $160,000",
      location: "Miami, Florida",
    },
    {
      title: "Assistant Hotel Director",
      department: "Hotel Operations",
      description:
        "As Assistant Hotel Director, you will support the Hotel Director in overseeing daily hospitality operations across our luxury cruise ships. You'll help manage department heads, assist with budget planning, coordinate staff scheduling, and ensure service excellence throughout all guest-facing departments. You'll also be responsible for handling guest escalations and implementing continuous improvement initiatives.",
      requirements:
        "Minimum 7 years of experience in luxury hospitality or cruise industry with at least 3 years in a management role. Bachelor's degree in Hospitality Management or related field. Excellent organizational and leadership skills. Ability to work under pressure in a fast-paced environment. Strong problem-solving abilities and attention to detail. Experience with hospitality management software systems.",
      salary_range: "$90,000 - $120,000",
      location: "Miami, Florida",
    },
    {
      title: "Guest Services Manager",
      department: "Guest Services",
      description:
        "As Guest Services Manager, you will lead our front desk operations and guest relations team to deliver exceptional service throughout the cruise journey. You'll oversee check-in/check-out procedures, manage guest inquiries and concerns, coordinate with other departments to fulfill guest requests, and ensure all guest-facing staff maintain our high service standards. You'll also analyze guest feedback to implement service improvements.",
      requirements:
        "Minimum 5 years of experience in guest services or front office management, preferably in luxury hospitality or cruise industry. Bachelor's degree in Hospitality Management or related field. Strong leadership and conflict resolution skills. Excellent communication abilities and fluency in English; additional languages are a plus. Experience with property management systems and CRM software. Ability to work flexible hours in a 24/7 operation.",
      salary_range: "$75,000 - $95,000",
      location: "Miami, Florida",
    },
    {
      title: "Front Desk Supervisor",
      department: "Guest Services",
      description:
        "As Front Desk Supervisor, you will oversee our reception team and manage all check-in/check-out processes to ensure a seamless guest experience. You'll train and mentor front desk staff, resolve complex guest issues, manage daily cash handling procedures, and coordinate with other departments to address guest needs. You'll also assist with scheduling, inventory management, and maintaining accurate guest records.",
      requirements:
        "Minimum 3 years of experience in front desk operations, preferably in luxury hospitality or cruise industry. Associate's or Bachelor's degree in Hospitality Management preferred. Proven supervisory experience and ability to train staff. Strong problem-solving skills and attention to detail. Proficiency with property management systems and Microsoft Office. Excellent customer service skills and professional demeanor.",
      salary_range: "$55,000 - $70,000",
      location: "Miami, Florida",
    },
    {
      title: "Receptionist",
      department: "Guest Services",
      description:
        "As a Receptionist on our luxury cruise ships, you will be the first point of contact for our guests, creating positive first impressions through warm, professional service. You'll handle check-in/check-out procedures, respond to guest inquiries, process payments, manage room keys, and coordinate with other departments to fulfill guest requests. You'll also maintain accurate guest records and provide information about onboard services and shore excursions.",
      requirements:
        "Minimum 1-2 years of customer service experience, preferably in hospitality. High school diploma required; Associate's degree in Hospitality preferred. Excellent communication skills and professional appearance. Basic computer proficiency and ability to learn property management systems. Strong attention to detail and problem-solving abilities. Ability to stand for extended periods and work flexible hours.",
      salary_range: "$40,000 - $50,000",
      location: "Miami, Florida",
    },
    {
      title: "Concierge",
      department: "Guest Services",
      description:
        "As a Concierge on our luxury cruise ships, you will provide personalized assistance to guests, particularly our VIP clientele. You'll handle special requests, arrange shore excursions, make dining reservations, organize private events, and provide detailed information about ports of call. You'll anticipate guest needs, resolve concerns promptly, and coordinate with various departments to ensure exceptional guest experiences throughout their voyage.",
      requirements:
        "Minimum 3 years of concierge or guest relations experience in luxury hospitality. Associate's or Bachelor's degree in Hospitality Management preferred. Extensive knowledge of tourism, dining, and entertainment offerings. Excellent communication skills and professional demeanor. Fluency in English; additional languages highly valued. Strong problem-solving abilities and attention to detail. Ability to work flexible hours and maintain composure under pressure.",
      salary_range: "$50,000 - $65,000",
      location: "Miami, Florida",
    },

    // Housekeeping & Laundry Services
    {
      title: "Cabin Steward",
      department: "Housekeeping",
      description:
        "As a Cabin Steward, you will maintain the highest standards of cleanliness and comfort in guest cabins. You'll perform daily cleaning services, make beds, replenish amenities, and ensure cabins meet our luxury standards. You'll also assist guests with special requests, report maintenance issues, and create towel animals and decorative touches to enhance the guest experience. You'll maintain cleaning equipment and manage inventory of supplies for your assigned cabins.",
      requirements:
        "Previous housekeeping experience, preferably in hospitality. High school diploma or equivalent. Strong attention to detail and organizational skills. Physical stamina to perform cleaning duties throughout shift. Excellent customer service skills and professional demeanor. Ability to work independently and as part of a team. Knowledge of cleaning chemicals and safety procedures.",
      salary_range: "$35,000 - $45,000",
      location: "Miami, Florida",
    },
    {
      title: "Housekeeping Supervisor",
      department: "Housekeeping",
      description:
        "As Housekeeping Supervisor, you will oversee a team of cabin stewards and public area attendants to maintain exceptional cleanliness standards throughout the ship. You'll conduct quality inspections, manage staff scheduling, train new team members, and ensure proper inventory of cleaning supplies. You'll also address guest concerns related to housekeeping, coordinate with maintenance for repairs, and implement efficiency improvements in cleaning procedures.",
      requirements:
        "Minimum 3 years of housekeeping experience with at least 1 year in a supervisory role, preferably in hospitality or cruise industry. High school diploma required; Associate's degree preferred. Strong leadership and organizational skills. Attention to detail and quality control expertise. Knowledge of cleaning chemicals, equipment, and safety procedures. Ability to manage inventory and supply ordering. Excellent communication skills and problem-solving abilities.",
      salary_range: "$48,000 - $60,000",
      location: "Miami, Florida",
    },
    {
      title: "Laundry Manager",
      department: "Housekeeping",
      description:
        "As Laundry Manager, you will oversee all onboard laundry operations, ensuring efficient cleaning of guest and crew linens, uniforms, and personal items. You'll manage laundry staff, maintain equipment, implement quality control procedures, and manage inventory of cleaning supplies. You'll also establish workflow processes, monitor productivity metrics, and ensure compliance with safety and environmental regulations for laundry operations.",
      requirements:
        "Minimum 5 years of commercial laundry experience with at least 2 years in a management role. Knowledge of industrial laundry equipment, chemicals, and processes. Experience with inventory management and supply ordering. Strong leadership and organizational skills. Understanding of safety protocols and environmental regulations for laundry operations. Ability to work in hot, humid conditions and manage a physically demanding department. Problem-solving skills and attention to detail.",
      salary_range: "$55,000 - $70,000",
      location: "Miami, Florida",
    },
    {
      title: "Laundry Attendant",
      department: "Housekeeping",
      description:
        "As a Laundry Attendant, you will handle the washing, drying, and pressing of guest and crew garments, linens, and uniforms. You'll operate industrial laundry equipment, sort items by fabric type and color, apply stain removal techniques, fold and organize finished items, and maintain cleanliness in the laundry facility. You'll also track guest laundry orders and ensure timely delivery of completed items.",
      requirements:
        "Previous laundry or dry cleaning experience preferred. High school diploma or equivalent. Knowledge of fabric care and stain removal techniques. Ability to operate industrial washing machines, dryers, and pressing equipment. Physical stamina to stand for extended periods and lift up to 30 pounds. Attention to detail and organizational skills. Ability to work in hot, humid conditions. Basic math skills for measuring cleaning chemicals.",
      salary_range: "$32,000 - $40,000",
      location: "Miami, Florida",
    },
    {
      title: "Public Area Attendant",
      department: "Housekeeping",
      description:
        "As a Public Area Attendant, you will maintain cleanliness and order in all public spaces throughout the ship, including lobbies, corridors, elevators, restaurants, lounges, and deck areas. You'll perform regular cleaning duties, sanitize high-touch surfaces, empty trash receptacles, vacuum carpets, clean glass surfaces, and respond to immediate cleaning needs. You'll also assist with turndown service during evening shifts and support special cleaning projects.",
      requirements:
        "Previous cleaning or housekeeping experience preferred. High school diploma or equivalent. Knowledge of cleaning techniques and products. Physical stamina to perform cleaning duties throughout shift. Ability to lift up to 25 pounds and maneuver cleaning equipment. Attention to detail and quality standards. Flexible schedule to work various shifts. Professional appearance and good communication skills.",
      salary_range: "$30,000 - $38,000",
      location: "Miami, Florida",
    },
    {
      title: "Housekeeping Assistant",
      department: "Housekeeping",
      description:
        "As a Housekeeping Assistant, you will support the housekeeping team with logistics, supplies, and administrative tasks. You'll manage the housekeeping storeroom, distribute cleaning supplies and amenities, track inventory levels, process linen exchanges, maintain equipment, and assist with scheduling and record-keeping. You'll also help coordinate special cleaning projects and support cabin stewards during peak turnover periods.",
      requirements:
        "Previous hospitality or administrative experience preferred. High school diploma or equivalent. Strong organizational and inventory management skills. Basic computer proficiency for record-keeping. Physical ability to lift and transport supplies. Attention to detail and problem-solving abilities. Good communication skills and team-oriented mindset. Knowledge of cleaning products and safety procedures.",
      salary_range: "$32,000 - $42,000",
      location: "Miami, Florida",
    },

    // Food & Beverage Service
    {
      title: "Executive Chef",
      department: "Food & Beverage",
      description:
        "As Executive Chef, you will lead our entire culinary operation across multiple restaurants and dining venues. You'll develop menus, establish food quality standards, manage kitchen staff, control food costs, and ensure compliance with health and safety regulations. You'll also coordinate with the supply chain team for provisioning, train culinary staff, and innovate new dishes that reflect global cuisines while accommodating dietary restrictions and preferences.",
      requirements:
        "Minimum 10 years of culinary experience with at least 5 years in a senior chef role, preferably in luxury hospitality or cruise industry. Culinary degree or equivalent certification. Extensive knowledge of international cuisines and current food trends. Strong leadership and team management skills. Experience with menu development, food cost control, and inventory management. Understanding of health and safety regulations. Creativity and problem-solving abilities. Ability to work under pressure in a fast-paced environment.",
      salary_range: "$100,000 - $140,000",
      location: "Miami, Florida",
    },
    {
      title: "Sous Chef",
      department: "Food & Beverage",
      description:
        "As Sous Chef, you will support the Executive Chef in daily kitchen operations across our dining venues. You'll supervise kitchen staff, ensure food quality and presentation standards, manage inventory and food costs, and maintain kitchen cleanliness and organization. You'll also assist with menu planning, implement recipes consistently, train junior culinary staff, and step in to prepare dishes during peak periods.",
      requirements:
        "Minimum 5 years of culinary experience with at least 2 years in a supervisory role. Culinary degree or equivalent certification. Strong knowledge of cooking techniques and food preparation. Leadership abilities and team management skills. Understanding of food safety and sanitation practices. Experience with inventory management and food cost control. Ability to work under pressure in a fast-paced environment. Physical stamina to stand for extended periods and work in hot kitchen conditions.",
      salary_range: "$70,000 - $90,000",
      location: "Miami, Florida",
    },
    {
      title: "Pastry Chef",
      department: "Food & Beverage",
      description:
        "As Pastry Chef, you will lead our pastry and bakery operations, creating exquisite desserts, pastries, and baked goods for all dining venues. You'll develop dessert menus, produce high-quality items daily, train pastry staff, manage inventory of specialty ingredients, and ensure consistent quality and presentation. You'll also create showpiece desserts for special events and accommodate dietary restrictions with alternative options.",
      requirements:
        "Minimum 5 years of pastry experience with at least 2 years in a leadership role. Culinary degree with pastry specialization or equivalent certification. Expert knowledge of baking techniques, chocolate work, and sugar artistry. Creativity and attention to detail. Experience with large-volume production while maintaining quality. Understanding of food allergies and alternative ingredients. Ability to work early morning shifts and in hot kitchen conditions. Team leadership and training abilities.",
      salary_range: "$65,000 - $85,000",
      location: "Miami, Florida",
    },
    {
      title: "Line Cook",
      department: "Food & Beverage",
      description:
        "As a Line Cook, you will prepare high-quality dishes according to our cruise line's recipes and standards. You'll operate a specific station in the kitchen (grill, sauté, garde manger, etc.), prepare ingredients, cook menu items to order, plate dishes attractively, and maintain cleanliness in your work area. You'll also assist with inventory management, follow food safety protocols, and support other stations during peak periods.",
      requirements:
        "Minimum 2 years of cooking experience, preferably in a high-volume restaurant or hospitality setting. Culinary certificate or equivalent training. Knowledge of cooking techniques and food preparation. Understanding of food safety and sanitation practices. Ability to follow recipes and plate presentations consistently. Physical stamina to stand for extended periods and work in hot conditions. Team-oriented mindset and ability to work under pressure. Flexibility to work various shifts.",
      salary_range: "$40,000 - $55,000",
      location: "Miami, Florida",
    },
    {
      title: "Buffet Supervisor",
      department: "Food & Beverage",
      description:
        "As Buffet Supervisor, you will oversee our buffet operations, ensuring attractive food presentation, efficient service, and high-quality dining experiences. You'll manage buffet staff, coordinate food replenishment with the kitchen, maintain cleanliness and organization of buffet stations, and monitor food temperatures and quality. You'll also assist guests with special dietary needs, implement food waste reduction strategies, and ensure compliance with health and safety standards.",
      requirements:
        "Minimum 3 years of food service experience with at least 1 year in a supervisory role. Culinary or hospitality education preferred. Knowledge of food presentation techniques and buffet operations. Understanding of food safety, temperature control, and sanitation practices. Leadership and team management skills. Customer service orientation and problem-solving abilities. Physical stamina to stand for extended periods. Flexibility to work various shifts in a 7-day operation.",
      salary_range: "$48,000 - $60,000",
      location: "Miami, Florida",
    },
    {
      title: "Waiter/Waitress",
      department: "Food & Beverage",
      description:
        "As a Waiter/Waitress, you will provide exceptional dining service to guests in our restaurants and dining venues. You'll take orders, make menu recommendations, serve food and beverages, anticipate guest needs, and ensure table cleanliness and proper setup. You'll also develop knowledge of menu items and ingredients to answer guest questions, process payments, and coordinate with kitchen staff to ensure timely service.",
      requirements:
        "Minimum 1-2 years of food service experience, preferably in fine dining or hospitality. High school diploma or equivalent. Knowledge of food service techniques and dining etiquette. Excellent customer service skills and professional appearance. Ability to memorize menus and specials. Physical stamina to stand for extended periods and carry trays. Team-oriented mindset and attention to detail. Flexibility to work various shifts in a 7-day operation.",
      salary_range: "$35,000 - $48,000 (plus gratuities)",
      location: "Miami, Florida",
    },
    {
      title: "Restaurant Manager",
      department: "Food & Beverage",
      description:
        "As Restaurant Manager, you will oversee operations for one or more dining venues onboard, ensuring exceptional service and guest satisfaction. You'll manage wait staff and hosts, coordinate with kitchen teams, handle reservations, resolve guest concerns, and maintain quality standards. You'll also analyze performance metrics, implement service improvements, train staff on service protocols, and ensure compliance with health and safety regulations.",
      requirements:
        "Minimum 5 years of restaurant experience with at least 2 years in a management role. Bachelor's degree in Hospitality Management or related field preferred. Strong leadership and team management skills. Excellent customer service orientation and problem-solving abilities. Knowledge of food and beverage service standards and dining trends. Experience with restaurant management software and point-of-sale systems. Ability to work flexible hours in a 7-day operation. Professional appearance and communication skills.",
      salary_range: "$65,000 - $85,000",
      location: "Miami, Florida",
    },
    {
      title: "Room Service Attendant",
      department: "Food & Beverage",
      description:
        "As a Room Service Attendant, you will deliver food and beverages to guest cabins, providing prompt, courteous service. You'll take orders by phone, prepare trays with appropriate settings, deliver items to cabins, set up dining experiences in-room when requested, and process billing. You'll also maintain knowledge of menu offerings, handle special requests, and ensure quality presentation of all delivered items.",
      requirements:
        "Previous food service or hospitality experience preferred. High school diploma or equivalent. Excellent customer service skills and professional appearance. Knowledge of food handling and presentation. Physical stamina to carry trays and navigate ship corridors and stairs. Attention to detail and quality standards. Good communication skills and friendly demeanor. Flexibility to work various shifts in a 24/7 operation.",
      salary_range: "$32,000 - $42,000 (plus gratuities)",
      location: "Miami, Florida",
    },
    {
      title: "Bartender",
      department: "Food & Beverage",
      description:
        "As a Bartender, you will create and serve beverages at our bars and lounges, providing engaging service to enhance the guest experience. You'll mix cocktails according to recipes, serve beer and wine, process payments, maintain bar cleanliness, and manage inventory of spirits and supplies. You'll also develop knowledge of drink offerings to make recommendations, ensure responsible alcohol service, and create a welcoming atmosphere for guests.",
      requirements:
        "Minimum 2 years of bartending experience, preferably in hospitality or upscale establishments. Bartending certification or formal training preferred. Knowledge of classic and contemporary cocktail recipes. Excellent customer service skills and professional appearance. Ability to work quickly during high-volume periods. Basic math skills for cash handling and inventory. Creativity for signature drink creation. Flexibility to work evening and weekend shifts.",
      salary_range: "$38,000 - $52,000 (plus gratuities)",
      location: "Miami, Florida",
    },
    {
      title: "Sommelier",
      department: "Food & Beverage",
      description:
        "As a Sommelier, you will share your wine expertise with guests, enhancing their dining experience through thoughtful wine pairings and recommendations. You'll curate wine lists, conduct wine tastings, train service staff on wine knowledge, manage wine inventory, and ensure proper storage conditions. You'll also develop relationships with guests, providing personalized recommendations based on preferences and building wine package sales.",
      requirements:
        "Minimum 3 years of experience as a sommelier or wine specialist. Sommelier certification (Court of Master Sommeliers or equivalent). Extensive knowledge of wine regions, varietals, and production methods. Experience with wine and food pairing. Excellent communication skills and ability to discuss wine in accessible terms. Sales ability and customer service orientation. Inventory management experience. Professional appearance and demeanor. Flexibility to work evening shifts.",
      salary_range: "$55,000 - $75,000 (plus gratuities)",
      location: "Miami, Florida",
    },
    {
      title: "Bar Server",
      department: "Food & Beverage",
      description:
        "As a Bar Server, you will provide beverage service to guests in our bars, lounges, and pool areas. You'll take drink orders, deliver beverages, process payments, and maintain cleanliness in service areas. You'll also develop knowledge of drink menus to make recommendations, provide attentive service, and assist bartenders during busy periods with garnish preparation and inventory management.",
      requirements:
        "Previous serving experience, preferably in a bar or lounge setting. High school diploma or equivalent. Knowledge of beverage service techniques. Excellent customer service skills and professional appearance. Physical stamina to stand for extended periods and carry drink trays. Basic math skills for cash handling. Team-oriented mindset and attention to detail. Flexibility to work evening and weekend shifts in a 7-day operation.",
      salary_range: "$30,000 - $40,000 (plus gratuities)",
      location: "Miami, Florida",
    },
    {
      title: "Café Barista",
      department: "Food & Beverage",
      description:
        "As a Café Barista, you will prepare and serve specialty coffee beverages, teas, and light café items in our onboard coffee venues. You'll craft espresso-based drinks according to recipes, operate and maintain espresso machines, serve pastries and snacks, process payments, and maintain cleanliness in the café area. You'll also develop knowledge of coffee origins and preparation methods to engage with guests and make recommendations.",
      requirements:
        "Previous barista experience preferred. High school diploma or equivalent. Knowledge of espresso preparation techniques and coffee fundamentals. Ability to operate and maintain espresso machines. Customer service orientation and friendly demeanor. Basic math skills for cash handling. Attention to detail and quality presentation. Physical stamina to stand for extended periods. Flexibility to work various shifts in a 7-day operation.",
      salary_range: "$32,000 - $42,000 (plus gratuities)",
      location: "Miami, Florida",
    },

    // Entertainment & Guest Experience
    {
      title: "Cruise Director",
      department: "Entertainment",
      description:
        "As Cruise Director, you will oversee all entertainment and activities programming onboard, serving as the face of our cruise experience. You'll manage the entertainment team, host major events, make daily announcements, coordinate with performers, and ensure a diverse and engaging activity schedule. You'll also interact extensively with guests, gather feedback to improve programming, and create a vibrant, memorable atmosphere throughout the voyage.",
      requirements:
        "Minimum 5 years of entertainment or hospitality experience with at least 2 years in a leadership role. Bachelor's degree in Entertainment, Hospitality, or related field preferred. Exceptional public speaking and performance skills. Experience in event planning and production. Leadership abilities and team management experience. Outgoing personality with strong interpersonal skills. Creativity and problem-solving abilities. Flexibility to work long hours in a 7-day operation. Professional appearance and high energy level.",
      salary_range: "$75,000 - $95,000",
      location: "Miami, Florida",
    },
    {
      title: "Activities Coordinator",
      department: "Entertainment",
      description:
        "As an Activities Coordinator, you will plan and host a variety of guest activities and events throughout the cruise. You'll organize and lead games, tournaments, classes, parties, and enrichment programs. You'll also prepare activity materials, make announcements, interact enthusiastically with guests, and adapt programming based on guest demographics and interests. You'll work closely with the entertainment team to ensure a cohesive activity schedule.",
      requirements:
        "Previous experience in recreation, entertainment, or hospitality preferred. Bachelor's degree in Recreation, Hospitality, or related field preferred. Public speaking and performance abilities. Outgoing personality and high energy level. Creativity and program development skills. Ability to engage diverse groups of guests. Physical stamina for active programming. Flexibility to work various shifts in a 7-day operation. Professional appearance and excellent communication skills.",
      salary_range: "$40,000 - $55,000",
      location: "Miami, Florida",
    },
    {
      title: "Kids Club Attendant",
      department: "Entertainment",
      description:
        "As a Kids Club Attendant, you will provide supervision and lead age-appropriate activities for children in our youth programs. You'll plan and implement games, crafts, educational activities, and entertainment for different age groups. You'll also maintain facility cleanliness, ensure child safety and security protocols, communicate with parents, and create a fun, welcoming environment for young cruisers.",
      requirements:
        "Previous experience working with children in education, recreation, or childcare. Bachelor's degree in Education, Child Development, or related field preferred. CPR and First Aid certification. Knowledge of age-appropriate activities and child development. Patience and enthusiasm for working with children. Creativity and program planning abilities. High energy level and playful demeanor. Background check and security clearance required. Flexibility to work various shifts in a 7-day operation.",
      salary_range: "$35,000 - $48,000",
      location: "Miami, Florida",
    },
    {
      title: "Spa Manager",
      department: "Guest Experience",
      description:
        "As Spa Manager, you will oversee our onboard spa and wellness facilities, ensuring exceptional service and relaxing experiences for guests. You'll manage spa staff, coordinate appointment scheduling, monitor treatment quality, manage retail product inventory, and implement marketing strategies to drive service bookings. You'll also ensure compliance with health and safety standards, maintain equipment, and create seasonal treatment offerings.",
      requirements:
        "Minimum 5 years of spa experience with at least 2 years in a management role. Certification in massage therapy, esthetics, or related field. Experience with spa operations, retail management, and staff supervision. Knowledge of wellness trends and treatment protocols. Business acumen and sales ability. Customer service orientation and problem-solving skills. Computer proficiency for scheduling and inventory systems. Professional appearance and excellent communication skills.",
      salary_range: "$60,000 - $80,000",
      location: "Miami, Florida",
    },
    {
      title: "Fitness Instructor",
      department: "Guest Experience",
      description:
        "As a Fitness Instructor, you will conduct group fitness classes and personal training sessions in our onboard fitness center. You'll lead a variety of classes such as yoga, spinning, aerobics, and strength training for guests of different fitness levels. You'll also maintain fitness equipment, provide orientations to the gym facilities, offer fitness consultations, and promote a healthy lifestyle through workshops and seminars.",
      requirements:
        "Certification in personal training (ACE, NASM, ISSA, or equivalent). Group fitness instruction experience and specialty certifications (yoga, Pilates, spinning, etc.). Minimum 2 years of fitness industry experience. Knowledge of exercise science, proper form, and safety protocols. Ability to modify exercises for different fitness levels and physical limitations. Energetic teaching style and motivational skills. Professional appearance and excellent communication abilities. CPR and First Aid certification.",
      salary_range: "$40,000 - $55,000",
      location: "Miami, Florida",
    },
  ]

  try {
    // First, check if the jobs table exists
    const { error: tableCheckError } = await supabase.from("jobs").select("id").limit(1)

    // If table doesn't exist, we need to create it
    if (tableCheckError && tableCheckError.message.includes("does not exist")) {
      // Since we can't directly create tables with the Supabase client,
      // we'll create the tables using SQL in the Supabase dashboard
      console.log("Jobs table doesn't exist. Please create it manually in the Supabase dashboard.")

      return {
        success: false,
        error:
          "Jobs table doesn't exist. Please create it using the Supabase dashboard SQL editor with the following SQL:\n\nCREATE TABLE jobs (\n  id SERIAL PRIMARY KEY,\n  title VARCHAR(255) NOT NULL,\n  department VARCHAR(100) NOT NULL,\n  description TEXT NOT NULL,\n  requirements TEXT NOT NULL,\n  salary_range VARCHAR(100),\n  location VARCHAR(100),\n  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP\n);",
      }
    }

    // Check if jobs already exist to avoid duplicates
    const { data: existingJobs } = await supabase
      .from("jobs")
      .select("title")
      .in(
        "title",
        hospitalityJobs.map((job) => job.title),
      )

    const existingTitles = existingJobs?.map((job) => job.title) || []

    // Filter out jobs that already exist
    const newJobs = hospitalityJobs.filter((job) => !existingTitles.includes(job.title))

    if (newJobs.length === 0) {
      return { success: true, message: "All jobs already exist in the database.", added: 0 }
    }

    // Insert new jobs
    const { error, data } = await supabase.from("jobs").insert(newJobs)

    if (error) {
      console.error("Error adding hospitality jobs:", error)
      return { success: false, error: error.message }
    }

    return {
      success: true,
      message: `Successfully added ${newJobs.length} hospitality jobs to the database.`,
      added: newJobs.length,
    }
  } catch (error) {
    console.error("Error in addHospitalityJobs:", error)
    return { success: false, error: String(error) }
  }
}
