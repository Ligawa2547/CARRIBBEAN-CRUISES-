"use server"

import { supabase } from "@/lib/supabase"

interface JobData {
  title: string
  department: string
  description: string
  requirements: string
  salary_range: string
  location: string
}

export async function addElectronicsJobs() {
  // Remove this line:
  // const supabase = createServerSupabaseClient()

  // Define all electronics department jobs with detailed information
  const electronicsJobs: JobData[] = [
    {
      title: "Chief Electronics Officer",
      department: "Electronics",
      description:
        "As Chief Electronics Officer, you will lead the electronics department and oversee all electronic systems onboard the cruise ship. You'll manage a team of electronics technicians, coordinate maintenance schedules, ensure regulatory compliance, and optimize system performance. You'll be responsible for the ship's navigation equipment, communication systems, entertainment technology, and safety electronics. You'll work closely with the Chief Engineer and IT Manager to ensure seamless integration of all electronic and technical systems.",
      requirements:
        "Bachelor's degree in Electronics Engineering or related field. Professional certification in maritime electronics. Minimum 8+ years of experience with marine electronics, including 3+ years in a supervisory role. Extensive knowledge of navigation systems, radar, satellite communications, and entertainment technology. Strong leadership and project management skills. Problem-solving abilities and technical expertise. STCW certification and relevant maritime qualifications. Experience with regulatory compliance and safety standards.",
      salary_range: "$90,000 - $120,000",
      location: "Various cruise ships worldwide",
    },
    {
      title: "Senior Electronics Officer",
      department: "Electronics",
      description:
        "As Senior Electronics Officer, you will assist the Chief Electronics Officer in managing electronic systems throughout the vessel. You'll supervise junior electronics technicians, coordinate maintenance activities, troubleshoot complex issues, and ensure proper functioning of critical electronic equipment. You'll also maintain documentation, assist with inventory management, conduct training for technical staff, and assume responsibility for the electronics department in the Chief Electronics Officer's absence.",
      requirements:
        "Bachelor's degree in Electronics Engineering or related field. Professional certification in maritime electronics. Minimum 5+ years of experience with marine electronics. Thorough knowledge of navigation systems, communication equipment, and entertainment technology. Strong technical and leadership skills. Experience with planned maintenance systems and regulatory compliance. STCW certification and relevant maritime qualifications. Advanced troubleshooting and diagnostic abilities.",
      salary_range: "$75,000 - $95,000",
      location: "Various cruise ships worldwide",
    },
    {
      title: "Navigation Electronics Specialist",
      department: "Electronics",
      description:
        "As Navigation Electronics Specialist, you will maintain and repair electronic navigation equipment essential for safe ship operations. You'll service radar systems, electronic chart display systems (ECDIS), global positioning systems (GPS), automatic identification systems (AIS), and other bridge electronics. You'll also perform preventive maintenance, troubleshoot technical issues, maintain spare parts inventory, and ensure compliance with maritime regulations. You'll work closely with the bridge team to ensure reliable operation of critical navigation systems.",
      requirements:
        "Associate's or Bachelor's degree in Electronics or related field. Certification in marine navigation electronics. Minimum 3+ years of experience with marine navigation systems. In-depth knowledge of radar, ECDIS, GPS, and AIS technologies. Experience with calibration and testing of navigation equipment. Strong troubleshooting and diagnostic skills. Understanding of maritime regulations regarding navigation equipment. STCW certification and basic safety training.",
      salary_range: "$65,000 - $85,000",
      location: "Various cruise ships worldwide",
    },
    {
      title: "Communication Systems Technician",
      department: "Electronics",
      description:
        "As Communication Systems Technician, you will maintain and repair the ship's communication equipment. You'll service satellite communication systems, VHF/MF/HF radios, GMDSS equipment, internal telephone networks, and crew communication devices. You'll also perform preventive maintenance, troubleshoot connectivity issues, coordinate with satellite service providers, and ensure reliable communications at sea. You'll work closely with the bridge team and IT department to maintain critical communication links for both operational and passenger services.",
      requirements:
        "Associate's or Bachelor's degree in Electronics or Telecommunications. GMDSS Maintainer's license or equivalent certification. Minimum 3+ years of experience with maritime communication systems. Knowledge of satellite communications, radio equipment, and networking. Experience with VSAT, Inmarsat, and other maritime communication platforms. Strong troubleshooting and diagnostic skills. Understanding of maritime regulations regarding communication equipment. STCW certification and basic safety training.",
      salary_range: "$60,000 - $80,000",
      location: "Various cruise ships worldwide",
    },
    {
      title: "Entertainment Systems Technician",
      department: "Electronics",
      description:
        "As Entertainment Systems Technician, you will maintain and operate electronic entertainment systems throughout the ship. You'll service audio-visual equipment, theater technology, cinema systems, digital signage, and guest entertainment platforms. You'll also troubleshoot technical issues, perform system upgrades, support live productions, and ensure high-quality entertainment experiences. You'll work closely with the entertainment department to provide technical support for shows, events, and guest activities.",
      requirements:
        "Associate's degree or technical training in Electronics or Audio-Visual Technology. Certification in entertainment systems or AV equipment. Minimum 3+ years of experience with professional AV systems. Knowledge of sound systems, video equipment, lighting control, and media servers. Experience with digital content distribution and management. Strong troubleshooting and customer service skills. Ability to work under pressure in a live entertainment environment. Flexibility to work evenings and event schedules in a 7-day operation.",
      salary_range: "$55,000 - $75,000",
      location: "Various cruise ships worldwide",
    },
    {
      title: "Broadcast Electronics Technician",
      department: "Electronics",
      description:
        "As Broadcast Electronics Technician, you will maintain and operate the ship's television and radio broadcasting systems. You'll service satellite TV receivers, content distribution networks, in-cabin entertainment systems, and digital signage platforms. You'll also troubleshoot reception issues, perform system updates, manage channel lineups, and ensure quality service to guest areas. You'll work closely with the entertainment and IT departments to deliver media content throughout the vessel.",
      requirements:
        "Associate's degree or technical training in Electronics or Broadcast Technology. Certification in broadcast systems or related field. Minimum 2+ years of experience with television or radio broadcasting systems. Knowledge of RF distribution, satellite reception, and content management. Experience with head-end systems and digital encoders/decoders. Strong troubleshooting and diagnostic skills. Understanding of content licensing and distribution requirements. Customer service orientation and attention to detail.",
      salary_range: "$50,000 - $70,000",
      location: "Various cruise ships worldwide",
    },
    {
      title: "Security Systems Technician",
      department: "Electronics",
      description:
        "As Security Systems Technician, you will maintain and operate the ship's electronic security systems. You'll service CCTV cameras, access control systems, alarm panels, security scanners, and monitoring equipment. You'll also troubleshoot technical issues, perform system updates, maintain video archives, and ensure reliable operation of all security electronics. You'll work closely with the security department to provide technical support for safety and security operations throughout the vessel.",
      requirements:
        "Associate's degree or technical training in Electronics or Security Systems. Certification in security systems or related field. Minimum 2+ years of experience with electronic security equipment. Knowledge of CCTV, access control, and alarm systems. Experience with security monitoring software and equipment. Strong troubleshooting and diagnostic skills. Understanding of maritime security requirements and ISPS code. Discretion and confidentiality when handling security matters. Security clearance and background check required.",
      salary_range: "$55,000 - $75,000",
      location: "Various cruise ships worldwide",
    },
    {
      title: "Medical Equipment Technician",
      department: "Electronics",
      description:
        "As Medical Equipment Technician, you will maintain and calibrate electronic medical devices in the ship's medical center. You'll service diagnostic equipment, monitoring systems, laboratory instruments, and telemedicine technology. You'll also perform preventive maintenance, troubleshoot technical issues, coordinate with equipment manufacturers, and ensure compliance with medical standards. You'll work closely with the medical team to provide reliable healthcare technology for passenger and crew medical services.",
      requirements:
        "Associate's or Bachelor's degree in Biomedical Engineering or related field. Certification in medical equipment maintenance. Minimum 3+ years of experience with medical devices and equipment. Knowledge of diagnostic equipment, patient monitors, and laboratory instruments. Experience with calibration and testing of medical technology. Strong troubleshooting and diagnostic skills. Understanding of medical regulations and standards. Attention to detail and precision in equipment maintenance. Basic knowledge of healthcare operations and terminology.",
      salary_range: "$60,000 - $80,000",
      location: "Various cruise ships worldwide",
    },
    {
      title: "Automation Systems Specialist",
      department: "Electronics",
      description:
        "As Automation Systems Specialist, you will maintain and optimize electronic control systems throughout the vessel. You'll service building management systems, HVAC controls, power management systems, and automated machinery. You'll also program control logic, troubleshoot system issues, perform software updates, and ensure efficient operation of automated processes. You'll work closely with the engineering department to maintain and improve ship automation for optimal performance and energy efficiency.",
      requirements:
        "Bachelor's degree in Electronics, Automation, or related field. Certification in industrial automation or control systems. Minimum 3+ years of experience with automated control systems. Knowledge of PLCs, SCADA, and building management systems. Experience with programming and configuring control equipment. Strong troubleshooting and analytical skills. Understanding of system integration and network communications. Ability to read and interpret technical drawings and schematics. Experience with energy management and optimization preferred.",
      salary_range: "$65,000 - $85,000",
      location: "Various cruise ships worldwide",
    },
    {
      title: "Power Electronics Specialist",
      department: "Electronics",
      description:
        "As Power Electronics Specialist, you will maintain and troubleshoot electronic power systems throughout the ship. You'll service uninterruptible power supplies (UPS), variable frequency drives (VFDs), power converters, and electronic control circuits. You'll also perform preventive maintenance, analyze power quality, implement energy efficiency measures, and ensure reliable operation of critical power electronics. You'll work closely with the engineering department to maintain stable power for all ship systems and equipment.",
      requirements:
        "Bachelor's degree in Electrical Engineering, Power Electronics, or related field. Certification in power systems or marine electrical equipment. Minimum 3+ years of experience with industrial power electronics. Knowledge of UPS systems, VFDs, and power conversion equipment. Experience with power quality analysis and energy efficiency. Strong troubleshooting and diagnostic skills. Understanding of electrical safety and regulatory requirements. Ability to read and interpret electrical schematics and technical drawings. Experience with marine power systems preferred.",
      salary_range: "$65,000 - $85,000",
      location: "Various cruise ships worldwide",
    },
    {
      title: "Calibration Technician",
      department: "Electronics",
      description:
        "As Calibration Technician, you will ensure the accuracy and reliability of electronic measuring instruments throughout the ship. You'll calibrate navigation equipment, test and measurement devices, sensors, gauges, and monitoring systems. You'll also maintain calibration records, issue certification documents, implement calibration schedules, and ensure compliance with quality standards. You'll work across multiple departments to maintain precision in all measurement-related activities onboard.",
      requirements:
        "Associate's degree or technical training in Electronics or Metrology. Certification in calibration or measurement science. Minimum 2+ years of experience in calibration or precision measurement. Knowledge of calibration procedures and measurement standards. Experience with calibration of various electronic instruments. Strong attention to detail and precision. Understanding of quality management systems and documentation. Ability to maintain accurate records and certification documents. Experience with maritime equipment calibration preferred.",
      salary_range: "$50,000 - $70,000",
      location: "Various cruise ships worldwide",
    },
    {
      title: "Electronics Workshop Supervisor",
      department: "Electronics",
      description:
        "As Electronics Workshop Supervisor, you will manage the ship's electronics repair facility and coordinate technical activities. You'll organize workshop operations, supervise repair technicians, maintain test equipment, and ensure quality standards. You'll also manage spare parts inventory, coordinate with vendors, implement repair procedures, and provide technical guidance to staff. You'll work closely with department heads to prioritize repair activities and maintain electronic equipment throughout the vessel.",
      requirements:
        "Bachelor's degree in Electronics Engineering or related field. Minimum 5+ years of experience in electronics repair and maintenance. Strong knowledge of various electronic systems and repair techniques. Experience with workshop management and inventory control. Leadership abilities and team supervision skills. Organizational skills and attention to detail. Problem-solving abilities and technical expertise. Experience with maritime electronics preferred. STCW certification and basic safety training.",
      salary_range: "$65,000 - $85,000",
      location: "Various cruise ships worldwide",
    },
    {
      title: "Electronics Repair Technician",
      department: "Electronics",
      description:
        "As Electronics Repair Technician, you will diagnose and repair electronic equipment from various departments throughout the ship. You'll troubleshoot circuit boards, replace components, perform soldering work, and test repaired equipment. You'll also maintain repair records, manage spare parts, follow schematic diagrams, and implement quality control procedures. You'll work in the electronics workshop to provide efficient repair services for a wide range of shipboard electronic devices.",
      requirements:
        "Associate's degree or technical training in Electronics Repair. Minimum 2+ years of experience in electronics troubleshooting and repair. Strong soldering skills and component-level repair abilities. Knowledge of electronic test equipment and diagnostic procedures. Experience with circuit board repair and component replacement. Attention to detail and quality workmanship. Ability to read and interpret electronic schematics. Understanding of various electronic systems and equipment. Experience with maritime electronics preferred.",
      salary_range: "$45,000 - $65,000",
      location: "Various cruise ships worldwide",
    },
    {
      title: "Satellite Communications Specialist",
      department: "Electronics",
      description:
        "As Satellite Communications Specialist, you will maintain and optimize the ship's satellite connectivity systems. You'll service VSAT equipment, satellite tracking antennas, network distribution systems, and bandwidth management tools. You'll also troubleshoot connectivity issues, coordinate with satellite service providers, monitor performance metrics, and ensure reliable communications at sea. You'll work closely with the IT department to maintain critical data links for both operational and passenger services.",
      requirements:
        "Bachelor's degree in Electronics, Telecommunications, or related field. Certification in satellite communications or related technology. Minimum 3+ years of experience with satellite communication systems. Knowledge of VSAT, Inmarsat, and maritime satellite platforms. Experience with RF equipment, antenna systems, and network distribution. Strong troubleshooting and diagnostic skills. Understanding of bandwidth management and optimization. Experience with maritime communications regulations. Knowledge of IP networking and connectivity solutions.",
      salary_range: "$65,000 - $85,000",
      location: "Various cruise ships worldwide",
    },
    {
      title: "Audio-Visual Systems Engineer",
      department: "Electronics",
      description:
        "As Audio-Visual Systems Engineer, you will design, install, and maintain complex AV systems throughout the cruise ship. You'll engineer sound systems, video installations, control interfaces, and integrated AV networks. You'll also create technical documentation, perform system commissioning, train users, and develop AV standards. You'll work closely with the entertainment and IT departments to implement advanced audio-visual solutions for theaters, lounges, conference rooms, and public areas.",
      requirements:
        "Bachelor's degree in Audio Engineering, Electronics, or related field. Professional certification in AV systems (CTS, CTS-D, or equivalent). Minimum 5+ years of experience with professional AV systems design. Advanced knowledge of sound, video, lighting, and control systems. Experience with system integration and network-based AV. Strong project management and documentation skills. Ability to read and create technical drawings and specifications. Understanding of acoustics and audio-visual best practices. Experience with maritime or hospitality AV systems preferred.",
      salary_range: "$70,000 - $90,000",
      location: "Various cruise ships worldwide",
    },
    {
      title: "Radar Technician",
      department: "Electronics",
      description:
        "As Radar Technician, you will specialize in the maintenance and repair of the ship's radar systems. You'll service navigation radars, weather radars, radar displays, and associated equipment. You'll also perform preventive maintenance, troubleshoot technical issues, calibrate radar systems, and ensure compliance with maritime regulations. You'll work closely with the bridge team to maintain reliable radar operations essential for safe navigation and collision avoidance.",
      requirements:
        "Associate's or Bachelor's degree in Electronics or related field. Certification in marine radar systems or equivalent. Minimum 3+ years of experience with radar equipment maintenance. In-depth knowledge of marine radar technology and principles. Experience with radar calibration and performance testing. Strong troubleshooting and diagnostic skills. Understanding of maritime regulations regarding radar equipment. STCW certification and basic safety training. Knowledge of X-band and S-band radar systems and their applications.",
      salary_range: "$60,000 - $80,000",
      location: "Various cruise ships worldwide",
    },
    {
      title: "Telecommunications Technician",
      department: "Electronics",
      description:
        "As Telecommunications Technician, you will maintain the ship's internal communication systems. You'll service telephone networks, intercom systems, paging systems, and wireless communication devices. You'll also perform preventive maintenance, troubleshoot connectivity issues, program communication equipment, and ensure reliable internal communications. You'll work closely with various departments to maintain critical communication links throughout the vessel for both operational and emergency purposes.",
      requirements:
        "Associate's degree or technical training in Telecommunications or Electronics. Certification in telecommunications systems or related field. Minimum 2+ years of experience with communication systems. Knowledge of PBX, VoIP, and traditional telephony. Experience with intercom and paging system maintenance. Strong troubleshooting and customer service skills. Understanding of network infrastructure and cabling. Ability to program and configure communication equipment. Experience with maritime communication systems preferred.",
      salary_range: "$50,000 - $70,000",
      location: "Various cruise ships worldwide",
    },
    {
      title: "Electronic Navigation Instructor",
      department: "Electronics",
      description:
        "As Electronic Navigation Instructor, you will train bridge officers and crew on the proper use of electronic navigation equipment. You'll conduct training sessions on radar, ECDIS, GPS, AIS, and other bridge electronics. You'll also develop training materials, assess competency levels, maintain training records, and stay current with technological advancements. You'll work closely with the marine operations department to ensure proper utilization of navigation technology for safe ship operations.",
      requirements:
        "Bachelor's degree in Maritime Studies, Electronics, or related field. Deck officer license or electronics certification. Minimum 5+ years of experience with marine navigation systems. In-depth knowledge of radar, ECDIS, and electronic navigation. Teaching experience or instructional certification preferred. Strong communication and presentation skills. Ability to develop effective training materials. Understanding of maritime regulations and training requirements. STCW certification and relevant maritime qualifications.",
      salary_range: "$65,000 - $85,000",
      location: "Various cruise ships worldwide",
    },
    {
      title: "Electronic Security Consultant",
      department: "Electronics",
      description:
        "As Electronic Security Consultant, you will assess and improve the ship's electronic security systems. You'll conduct security audits, recommend technology upgrades, develop security protocols, and ensure compliance with maritime security regulations. You'll also provide training on security equipment, assist with incident investigations, coordinate with external security agencies, and implement best practices. You'll work closely with the security department to enhance the vessel's overall security posture through effective use of technology.",
      requirements:
        "Bachelor's degree in Security Management, Electronics, or related field. Security certification (CPP, PSP, or equivalent). Minimum 5+ years of experience in electronic security systems. Knowledge of maritime security requirements and ISPS code. Experience with security risk assessment and mitigation. Strong analytical and consulting skills. Understanding of various security technologies and their applications. Ability to develop and document security procedures. Security clearance and background check required.",
      salary_range: "$70,000 - $90,000",
      location: "Various cruise ships worldwide",
    },
    {
      title: "Electronics Quality Assurance Specialist",
      department: "Electronics",
      description:
        "As Electronics Quality Assurance Specialist, you will ensure all electronic systems meet quality standards and regulatory requirements. You'll conduct quality inspections, verify repair work, audit maintenance procedures, and implement quality improvement initiatives. You'll also maintain quality documentation, analyze failure trends, coordinate with classification societies, and ensure compliance with maritime regulations. You'll work across multiple departments to maintain high standards for all electronic equipment and systems.",
      requirements:
        "Bachelor's degree in Electronics, Quality Management, or related field. Quality management certification (ASQ, ISO, or equivalent). Minimum 3+ years of experience in electronics quality assurance. Knowledge of quality management systems and processes. Experience with inspection techniques and quality standards. Strong attention to detail and analytical skills. Understanding of maritime regulations and classification requirements. Ability to develop and implement quality procedures. Experience with maritime electronics preferred.",
      salary_range: "$60,000 - $80,000",
      location: "Various cruise ships worldwide",
    },
    {
      title: "Electronics Inventory Manager",
      department: "Electronics",
      description:
        "As Electronics Inventory Manager, you will oversee the ship's electronic spare parts and equipment inventory. You'll manage stock levels, process requisitions, coordinate with suppliers, and maintain inventory records. You'll also forecast parts needs, implement inventory control procedures, conduct physical inventories, and ensure critical spares availability. You'll work closely with the electronics department to support maintenance activities through efficient inventory management.",
      requirements:
        "Bachelor's degree in Supply Chain Management, Business, or related field. Inventory management certification preferred. Minimum 3+ years of experience in technical inventory management. Knowledge of electronic components and equipment. Experience with inventory management software. Strong organizational and record-keeping skills. Understanding of procurement processes and supplier management. Analytical abilities for forecasting and optimization. Experience with maritime supply chain preferred.",
      salary_range: "$55,000 - $75,000",
      location: "Various cruise ships worldwide",
    },
    {
      title: "Electronics Documentation Specialist",
      department: "Electronics",
      description:
        "As Electronics Documentation Specialist, you will manage technical documentation for all electronic systems onboard. You'll maintain equipment manuals, create maintenance procedures, update system diagrams, and organize electronic records. You'll also develop technical reports, coordinate with manufacturers for documentation, implement document control procedures, and ensure information accessibility. You'll work across multiple departments to maintain comprehensive and accurate technical documentation.",
      requirements:
        "Bachelor's degree in Technical Writing, Electronics, or related field. Technical documentation certification preferred. Minimum 2+ years of experience in technical documentation. Knowledge of electronic systems and terminology. Experience with document management systems. Strong writing and organizational skills. Attention to detail and information accuracy. Ability to create clear technical procedures and diagrams. Understanding of maritime documentation requirements. Proficiency with documentation software and tools.",
      salary_range: "$50,000 - $70,000",
      location: "Various cruise ships worldwide",
    },
    {
      title: "Electronics Project Coordinator",
      department: "Electronics",
      description:
        "As Electronics Project Coordinator, you will manage electronic system installations, upgrades, and major maintenance projects. You'll coordinate project schedules, allocate resources, monitor progress, and ensure quality standards. You'll also liaise with contractors, prepare project documentation, track budgets, and report on project status. You'll work closely with various departments to implement electronic technology projects with minimal disruption to ship operations.",
      requirements:
        "Bachelor's degree in Project Management, Electronics, or related field. Project management certification (PMP or equivalent) preferred. Minimum 3+ years of experience in technical project coordination. Knowledge of electronic systems and installation requirements. Experience with project planning and execution. Strong organizational and communication skills. Ability to coordinate multiple stakeholders and resources. Understanding of maritime operations and constraints. Experience with shipboard projects preferred.",
      salary_range: "$60,000 - $80,000",
      location: "Various cruise ships worldwide",
    },
    {
      title: "Electronics Research and Development Specialist",
      department: "Electronics",
      description:
        "As Electronics R&D Specialist, you will evaluate new technologies and develop innovative solutions for shipboard applications. You'll research emerging electronics, conduct feasibility studies, test new equipment, and recommend technology adoptions. You'll also develop custom electronic solutions, create prototypes, document research findings, and support implementation of new technologies. You'll work closely with various departments to enhance ship operations through technological advancement.",
      requirements:
        "Master's degree in Electronics Engineering or related field. Minimum 5+ years of experience in electronics research or development. Strong knowledge of various electronic systems and technologies. Experience with technology evaluation and testing. Innovation mindset and problem-solving abilities. Technical writing and documentation skills. Understanding of maritime operational needs and constraints. Ability to develop practical applications from research findings. Experience with maritime electronics preferred.",
      salary_range: "$75,000 - $95,000",
      location: "Various cruise ships worldwide",
    },
    {
      title: "Electronics Training Coordinator",
      department: "Electronics",
      description:
        "As Electronics Training Coordinator, you will develop and implement training programs for electronics personnel. You'll assess training needs, create training materials, conduct technical workshops, and evaluate learning outcomes. You'll also maintain training records, coordinate with equipment manufacturers for specialized training, develop competency standards, and ensure regulatory compliance. You'll work closely with the human resources department to enhance the technical capabilities of the electronics team.",
      requirements:
        "Bachelor's degree in Electronics, Education, or related field. Training certification (CTT+ or equivalent) preferred. Minimum 3+ years of experience in electronics with training responsibilities. Knowledge of adult learning principles and training methodologies. Experience with technical curriculum development. Strong presentation and communication skills. Ability to assess technical competencies and learning needs. Understanding of maritime training requirements. Experience with maritime electronics preferred.",
      salary_range: "$55,000 - $75,000",
      location: "Various cruise ships worldwide",
    },
    {
      title: "Electronics Compliance Officer",
      department: "Electronics",
      description:
        "As Electronics Compliance Officer, you will ensure all electronic systems meet regulatory requirements and industry standards. You'll monitor compliance with maritime regulations, conduct internal audits, coordinate external inspections, and implement corrective actions. You'll also maintain compliance documentation, stay current with regulatory changes, provide compliance training, and liaise with classification societies. You'll work across multiple departments to maintain the vessel's regulatory compliance for all electronic systems.",
      requirements:
        "Bachelor's degree in Electronics, Maritime Studies, or related field. Compliance certification or maritime auditor qualification. Minimum 3+ years of experience in maritime compliance or electronics. Knowledge of maritime regulations affecting electronic equipment. Experience with compliance auditing and documentation. Strong attention to detail and analytical skills. Understanding of classification society requirements. Ability to interpret and apply regulatory standards. Experience with maritime electronic systems preferred.",
      salary_range: "$65,000 - $85,000",
      location: "Various cruise ships worldwide",
    },
    {
      title: "Electronics Safety Officer",
      department: "Electronics",
      description:
        "As Electronics Safety Officer, you will ensure safe practices in the installation, operation, and maintenance of electronic equipment. You'll develop safety procedures, conduct risk assessments, investigate incidents, and implement safety improvements. You'll also provide safety training, monitor compliance with safety standards, maintain safety documentation, and promote a safety culture. You'll work closely with the safety department to integrate electronics safety into the vessel's overall safety management system.",
      requirements:
        "Bachelor's degree in Electronics, Safety Management, or related field. Safety certification (NEBOSH, OSHA, or equivalent). Minimum 3+ years of experience in electronics with safety responsibilities. Knowledge of electrical safety standards and best practices. Experience with risk assessment and incident investigation. Strong communication and training abilities. Understanding of maritime safety regulations. Ability to develop and implement safety procedures. Experience with maritime electronics preferred.",
      salary_range: "$60,000 - $80,000",
      location: "Various cruise ships worldwide",
    },
    {
      title: "Electronics Technical Writer",
      department: "Electronics",
      description:
        "As Electronics Technical Writer, you will create and maintain documentation for electronic systems and procedures. You'll write technical manuals, develop standard operating procedures, create troubleshooting guides, and document system configurations. You'll also update existing documentation, translate complex technical information, create visual aids, and ensure documentation accuracy. You'll work closely with electronics personnel to capture their expertise in clear, usable documentation.",
      requirements:
        "Bachelor's degree in Technical Writing, English, Electronics, or related field. Technical writing certification preferred. Minimum 2+ years of experience in technical writing for electronic systems. Knowledge of electronic terminology and concepts. Experience with documentation tools and formats. Strong writing and editing skills. Ability to translate complex technical information for various audiences. Attention to detail and information accuracy. Understanding of documentation standards and best practices. Experience with maritime systems documentation preferred.",
      salary_range: "$50,000 - $70,000",
      location: "Various cruise ships worldwide",
    },
    {
      title: "Electronics Reliability Engineer",
      department: "Electronics",
      description:
        "As Electronics Reliability Engineer, you will analyze and improve the reliability of electronic systems throughout the ship. You'll conduct failure analyses, implement preventive measures, develop reliability standards, and monitor system performance. You'll also analyze maintenance data, recommend design improvements, implement condition monitoring, and develop reliability testing procedures. You'll work across multiple departments to enhance the dependability of all electronic equipment and systems.",
      requirements:
        "Bachelor's degree in Electronics Engineering, Reliability Engineering, or related field. Reliability certification (CRE or equivalent) preferred. Minimum 3+ years of experience in electronics reliability or maintenance. Knowledge of reliability engineering principles and methodologies. Experience with failure analysis and root cause determination. Strong analytical and problem-solving skills. Understanding of preventive and predictive maintenance. Ability to analyze technical data and identify trends. Experience with maritime electronics preferred.",
      salary_range: "$65,000 - $85,000",
      location: "Various cruise ships worldwide",
    },
    {
      title: "Electronics Procurement Specialist",
      department: "Electronics",
      description:
        "As Electronics Procurement Specialist, you will manage the purchasing of electronic equipment, components, and services for the vessel. You'll process purchase requisitions, select suppliers, negotiate contracts, and ensure timely delivery. You'll also evaluate product quality, maintain vendor relationships, coordinate with technical departments, and optimize procurement processes. You'll work closely with the electronics department to support maintenance and upgrade activities through efficient procurement.",
      requirements:
        "Bachelor's degree in Supply Chain Management, Business, or related field. Procurement certification (CPSM or equivalent) preferred. Minimum 3+ years of experience in technical procurement. Knowledge of electronic equipment and components. Experience with procurement systems and processes. Strong negotiation and vendor management skills. Understanding of international shipping and logistics. Ability to evaluate technical specifications and requirements. Experience with maritime procurement preferred.",
      salary_range: "$55,000 - $75,000",
      location: "Various cruise ships worldwide",
    },
  ]

  try {
    // First, check if the jobs table exists
    const { error: tableCheckError } = await supabase.from("jobs").select("id").limit(1)

    // If table doesn't exist, we need to create it
    if (tableCheckError && tableCheckError.message.includes("jobs does not exist")) {
      return {
        success: false,
        error: "Jobs table doesn't exist. Please create it using the Supabase dashboard SQL editor.",
      }
    }

    // Check if jobs already exist to avoid duplicates
    const { data: existingJobs } = await supabase
      .from("jobs")
      .select("title")
      .in(
        "title",
        electronicsJobs.map((job) => job.title),
      )

    const existingTitles = existingJobs?.map((job) => job.title) || []

    // Filter out jobs that already exist
    const newJobs = electronicsJobs.filter((job) => !existingTitles.includes(job.title))

    if (newJobs.length === 0) {
      return { success: true, message: "All electronics jobs already exist in the database.", added: 0 }
    }

    // Insert new jobs in batches to avoid payload size limitations
    const batchSize = 10
    let addedCount = 0
    let error = null

    for (let i = 0; i < newJobs.length; i += batchSize) {
      const batch = newJobs.slice(i, i + batchSize)
      const { error: batchError } = await supabase.from("jobs").insert(batch)

      if (batchError) {
        console.error(`Error adding batch ${i / batchSize + 1}:`, batchError)
        error = batchError
        break
      }

      addedCount += batch.length
    }

    if (error) {
      return { success: false, error: error.message }
    }

    return {
      success: true,
      message: `Successfully added ${addedCount} new electronics jobs to the database.`,
      added: addedCount,
    }
  } catch (error) {
    console.error("Error in addElectronicsJobs:", error)
    return { success: false, error: String(error) }
  }
}
