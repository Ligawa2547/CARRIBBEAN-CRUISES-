import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link href="/" className="inline-flex items-center text-ocean-600 hover:text-ocean-700 mb-6 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-muted-foreground mb-6">Last Updated: May 10, 2025</p>

      <div className="prose prose-ocean max-w-none">
        <p>
          Caribbean Cruises ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains
          how we collect, use, disclose, and safeguard your information when you visit our website
          www.caribbeancruises.site or use our services.
        </p>

        <h2>1. Information We Collect</h2>
        <h3>1.1 Personal Information</h3>
        <p>We may collect personal information that you voluntarily provide to us when you:</p>
        <ul>
          <li>Create an account</li>
          <li>Apply for job positions</li>
          <li>Book cruise packages</li>
          <li>Contact us</li>
          <li>Subscribe to our newsletter</li>
          <li>Participate in surveys or promotions</li>
        </ul>

        <p>This information may include:</p>
        <ul>
          <li>Name, email address, phone number, and mailing address</li>
          <li>Date of birth and nationality</li>
          <li>Professional information (resume, work experience, qualifications)</li>
          <li>Payment information (processed through secure third-party payment processors)</li>
          <li>Travel preferences and passport information</li>
          <li>Any other information you choose to provide</li>
        </ul>

        <h3>1.2 Automatically Collected Information</h3>
        <p>
          When you visit our website, we may automatically collect certain information about your device and usage,
          including:
        </p>
        <ul>
          <li>IP address, browser type, operating system</li>
          <li>Pages visited, time spent on pages, links clicked</li>
          <li>Referring website, search terms used</li>
          <li>Device information (type, settings, unique identifiers)</li>
        </ul>

        <h3>1.3 Cookies and Similar Technologies</h3>
        <p>
          We use cookies and similar tracking technologies to collect information about your browsing activities. Please
          refer to our <Link href="/cookies-policy">Cookies Policy</Link> for more information.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>We may use the information we collect for various purposes, including to:</p>
        <ul>
          <li>Provide, maintain, and improve our services</li>
          <li>Process job applications and match candidates with suitable positions</li>
          <li>Facilitate cruise bookings and related services</li>
          <li>Communicate with you about our services, promotions, and events</li>
          <li>Respond to your inquiries and provide customer support</li>
          <li>Monitor and analyze usage patterns and trends</li>
          <li>Protect against, identify, and prevent fraud and other illegal activities</li>
          <li>Comply with legal obligations and enforce our terms and policies</li>
        </ul>

        <h2>3. Legal Basis for Processing (for EEA, UK, and Similar Jurisdictions)</h2>
        <p>We process your personal information based on the following legal grounds:</p>
        <ul>
          <li>
            <strong>Contractual Necessity:</strong> To perform our contractual obligations to you, including providing
            our services
          </li>
          <li>
            <strong>Legitimate Interests:</strong> To pursue our legitimate interests in operating and improving our
            business
          </li>
          <li>
            <strong>Consent:</strong> When you have given us consent to process your information for specific purposes
          </li>
          <li>
            <strong>Legal Obligation:</strong> To comply with legal requirements and obligations
          </li>
        </ul>

        <h2>4. Information Sharing and Disclosure</h2>
        <p>We may share your information with:</p>
        <ul>
          <li>
            <strong>Cruise Line Partners:</strong> To facilitate job applications, interviews, and cruise bookings
          </li>
          <li>
            <strong>Service Providers:</strong> Third-party vendors who perform services on our behalf (e.g., payment
            processing, data analysis, email delivery)
          </li>
          <li>
            <strong>Legal and Regulatory Authorities:</strong> When required by law or to protect our rights and safety
          </li>
          <li>
            <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets
          </li>
        </ul>
        <p>
          We do not sell your personal information to third parties for their marketing purposes without your explicit
          consent.
        </p>

        <h2>5. Data Retention</h2>
        <p>
          We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy
          Policy, unless a longer retention period is required or permitted by law. The criteria used to determine our
          retention periods include:
        </p>
        <ul>
          <li>The duration of our ongoing relationship with you</li>
          <li>Legal obligations to retain data for certain periods</li>
          <li>Statute of limitations under applicable law</li>
          <li>Our legitimate business interests</li>
        </ul>

        <h2>6. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal information against
          unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the
          Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
        </p>

        <h2>7. Your Rights and Choices</h2>
        <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
        <ul>
          <li>Access to your personal information</li>
          <li>Correction of inaccurate or incomplete information</li>
          <li>Deletion of your personal information</li>
          <li>Restriction or objection to processing</li>
          <li>Data portability</li>
          <li>Withdrawal of consent</li>
        </ul>
        <p>
          To exercise these rights, please contact us at{" "}
          <a href="mailto:privacy@caribbeancruises.site">privacy@caribbeancruises.site</a>.
        </p>

        <h2>8. International Data Transfers</h2>
        <p>
          Your information may be transferred to, and processed in, countries other than the country in which you
          reside. These countries may have data protection laws that differ from those in your country. We implement
          appropriate safeguards to protect your information when transferred internationally, including using standard
          contractual clauses approved by relevant authorities.
        </p>

        <h2>9. Children's Privacy</h2>
        <p>
          Our services are not directed to individuals under the age of 18. We do not knowingly collect personal
          information from children. If we learn that we have collected personal information from a child, we will take
          steps to delete that information as soon as possible.
        </p>

        <h2>10. Third-Party Links and Services</h2>
        <p>
          Our website may contain links to third-party websites and services. We are not responsible for the privacy
          practices or content of these third parties. We encourage you to review the privacy policies of any
          third-party sites you visit.
        </p>

        <h2>11. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last
          Updated" date. We encourage you to review this Privacy Policy periodically to stay informed about how we are
          protecting your information.
        </p>

        <h2>12. Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us
          at:
        </p>
        <p>
          Caribbean Cruises
          <br />
          Port Everglades Terminal
          <br />
          Fort Lauderdale, FL 33316
          <br />
          United States
          <br />
          <a href="mailto:privacy@caribbeancruises.site">privacy@caribbeancruises.site</a>
          <br />
          Phone: +1 (216) 777-7288
        </p>
      </div>
    </div>
  )
}
