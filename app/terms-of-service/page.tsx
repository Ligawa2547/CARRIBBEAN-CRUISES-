import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link href="/" className="inline-flex items-center text-ocean-600 hover:text-ocean-700 mb-6 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="text-muted-foreground mb-6">Last Updated: May 10, 2025</p>

      <div className="prose prose-ocean max-w-none">
        <p>
          Please read these Terms of Service ("Terms") carefully before using the website and services offered by
          Caribbean Cruises ("we," "our," or "us").
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using our website at www.caribbeancruises.site and our services, you agree to be bound by
          these Terms and our Privacy Policy. If you do not agree to these Terms, please do not use our services.
        </p>

        <h2>2. Services Description</h2>
        <p>
          Caribbean Cruises provides recruitment services for the cruise industry and offers cruise ticket sales as an
          authorized provider for various cruise lines. Our services include:
        </p>
        <ul>
          <li>Job listings and application processing for cruise ship positions</li>
          <li>Cruise package bookings and related travel services</li>
          <li>Information about cruise lines, ships, and destinations</li>
          <li>Career guidance and resources for maritime professionals</li>
        </ul>

        <h2>3. User Accounts</h2>
        <h3>3.1 Account Creation</h3>
        <p>
          To access certain features of our services, you may need to create an account. You agree to provide accurate,
          current, and complete information during the registration process and to update such information to keep it
          accurate, current, and complete.
        </p>

        <h3>3.2 Account Security</h3>
        <p>
          You are responsible for maintaining the confidentiality of your account credentials and for all activities
          that occur under your account. You agree to notify us immediately of any unauthorized use of your account or
          any other breach of security.
        </p>

        <h3>3.3 Account Termination</h3>
        <p>
          We reserve the right to suspend or terminate your account and access to our services at our sole discretion,
          without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third
          parties, or for any other reason.
        </p>

        <h2>4. Job Application Services</h2>
        <h3>4.1 Application Process</h3>
        <p>
          When you apply for a job through our services, you authorize us to share your application materials with
          relevant cruise line partners. You represent that all information provided in your application is accurate,
          complete, and up-to-date.
        </p>

        <h3>4.2 No Guarantee of Employment</h3>
        <p>
          We do not guarantee that you will receive job offers or employment through our services. Hiring decisions are
          made solely by the cruise line partners based on their own criteria and needs.
        </p>

        <h3>4.3 Background Checks and Verification</h3>
        <p>
          You acknowledge that cruise line employers may conduct background checks, verify credentials, and request
          additional information as part of their hiring process. By applying for positions through our services, you
          consent to such verification processes.
        </p>

        <h2>5. Cruise Booking Services</h2>
        <h3>5.1 Booking Process</h3>
        <p>
          When you book a cruise through our services, you enter into a contract with the cruise line, not with
          Caribbean Cruises. We act as an authorized agent for the cruise lines. All bookings are subject to the cruise
          line's terms and conditions, which will be provided to you during the booking process.
        </p>

        <h3>5.2 Pricing and Payments</h3>
        <p>
          All prices are quoted in US dollars unless otherwise specified. Prices may change without notice until your
          booking is confirmed. Payment processing is handled securely through third-party payment processors.
        </p>

        <h3>5.3 Cancellations and Refunds</h3>
        <p>
          Cancellation policies and refund eligibility are determined by the cruise line's terms and conditions. We
          recommend purchasing travel insurance to protect against unforeseen circumstances.
        </p>

        <h2>6. User Conduct</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Violate any applicable laws or regulations</li>
          <li>Infringe upon the rights of others</li>
          <li>Submit false or misleading information</li>
          <li>
            Use our services for unauthorized commercial purposes or to solicit others to join other services or
            websites
          </li>
          <li>Attempt to gain unauthorized access to our systems or user accounts</li>
          <li>
            Engage in any activity that interferes with or disrupts our services or the servers and networks connected
            to our services
          </li>
          <li>Use any robot, spider, or other automated means to access our services</li>
          <li>Transmit any viruses, malware, or other harmful code</li>
        </ul>

        <h2>7. Intellectual Property</h2>
        <h3>7.1 Our Intellectual Property</h3>
        <p>
          All content on our website, including text, graphics, logos, images, audio clips, digital downloads, data
          compilations, and software, is the property of Caribbean Cruises or our content suppliers and is protected by
          international copyright laws. The compilation of all content on our website is our exclusive property and is
          protected by international copyright laws.
        </p>

        <h3>7.2 Limited License</h3>
        <p>
          We grant you a limited, non-exclusive, non-transferable, and revocable license to access and use our services
          for personal, non-commercial purposes. This license does not include the right to:
        </p>
        <ul>
          <li>Modify or copy our materials</li>
          <li>Use the materials for any commercial purpose</li>
          <li>Attempt to decompile or reverse engineer any software contained on our website</li>
          <li>Remove any copyright or other proprietary notations from the materials</li>
          <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
        </ul>

        <h2>8. Disclaimer of Warranties</h2>
        <p>
          OUR SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE DISCLAIM ALL WARRANTIES OF ANY KIND,
          WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS
          FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
        </p>
        <p>
          WE DO NOT WARRANT THAT OUR SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE, OR THAT DEFECTS, IF
          ANY, WILL BE CORRECTED. WE MAKE NO WARRANTIES ABOUT THE ACCURACY, RELIABILITY, COMPLETENESS, OR TIMELINESS OF
          THE CONTENT, SERVICES, SOFTWARE, TEXT, GRAPHICS, LINKS, OR COMMUNICATIONS PROVIDED ON OR THROUGH OUR SERVICES.
        </p>

        <h2>9. Limitation of Liability</h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL CARIBBEAN CRUISES, ITS AFFILIATES,
          OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, OR CRUISE LINE PARTNERS BE LIABLE FOR ANY INDIRECT, PUNITIVE,
          INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF
          PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO YOUR USE OF, OR
          INABILITY TO USE, OUR SERVICES.
        </p>
        <p>
          OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING FROM OR RELATING TO THESE TERMS OR YOUR USE OF OUR SERVICES
          SHALL NOT EXCEED THE AMOUNT PAID BY YOU, IF ANY, FOR ACCESSING OUR SERVICES DURING THE TWELVE (12) MONTHS
          IMMEDIATELY PRECEDING THE DATE OF THE CLAIM.
        </p>

        <h2>10. Indemnification</h2>
        <p>
          You agree to indemnify, defend, and hold harmless Caribbean Cruises, its affiliates, officers, directors,
          employees, agents, and cruise line partners from and against any and all claims, liabilities, damages, losses,
          costs, expenses, or fees (including reasonable attorneys' fees) that arise from or relate to:
        </p>
        <ul>
          <li>Your use of our services</li>
          <li>Your violation of these Terms</li>
          <li>Your violation of any rights of another person or entity</li>
          <li>Your conduct in connection with our services</li>
        </ul>

        <h2>11. Governing Law and Dispute Resolution</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the State of Florida, without
          regard to its conflict of law provisions. Any dispute arising from or relating to these Terms or your use of
          our services shall be subject to the exclusive jurisdiction of the state and federal courts located in Broward
          County, Florida.
        </p>
        <p>
          For any dispute you have with us, you agree to first contact us and attempt to resolve the dispute informally.
          If we are unable to resolve the dispute informally, we each agree to resolve any claim, dispute, or
          controversy through binding arbitration in accordance with the rules of the American Arbitration Association.
        </p>

        <h2>12. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. We will provide notice of significant changes by
          posting the updated Terms on our website with a new "Last Updated" date. Your continued use of our services
          after such changes constitutes your acceptance of the new Terms.
        </p>

        <h2>13. Severability</h2>
        <p>
          If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or
          eliminated to the minimum extent necessary so that the Terms will otherwise remain in full force and effect
          and enforceable.
        </p>

        <h2>14. Entire Agreement</h2>
        <p>
          These Terms, together with our Privacy Policy and any other legal notices published by us on our website,
          constitute the entire agreement between you and Caribbean Cruises concerning our services.
        </p>

        <h2>15. Contact Information</h2>
        <p>If you have any questions about these Terms, please contact us at:</p>
        <p>
          Caribbean Cruises
          <br />
          Port Everglades Terminal
          <br />
          Fort Lauderdale, FL 33316
          <br />
          United States
          <br />
          <a href="mailto:legal@caribbeancruises.site">legal@caribbeancruises.site</a>
          <br />
          Phone: +1 (216) 777-7288
        </p>
      </div>
    </div>
  )
}
