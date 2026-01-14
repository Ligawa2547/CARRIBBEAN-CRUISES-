import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link href="/" className="inline-flex items-center text-ocean-600 hover:text-ocean-700 mb-6 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <h1 className="text-3xl font-bold mb-6">Disclaimer</h1>
      <p className="text-muted-foreground mb-6">Last Updated: May 10, 2025</p>

      <div className="prose prose-ocean max-w-none">
        <h2>1. General Information</h2>
        <p>
          The information provided on www.caribbeancruises.site ("our website") is for general informational purposes
          only. All information on our website is provided in good faith; however, we make no representation or warranty
          of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or
          completeness of any information on our website.
        </p>

        <h2>2. Recruitment Services</h2>
        <p>
          Caribbean Cruises acts as a recruitment partner for various cruise lines. We facilitate the application
          process by connecting candidates with potential employers in the cruise industry. However:
        </p>
        <ul>
          <li>
            We do not guarantee employment or job placement. Hiring decisions are made solely by the cruise line
            partners based on their own criteria and needs.
          </li>
          <li>
            While we strive to ensure all job listings are accurate and current, we cannot guarantee that all positions
            will remain available throughout the application process.
          </li>
          <li>
            Salary information, job descriptions, and requirements are provided by the cruise lines and may be subject
            to change without notice.
          </li>
          <li>
            We are not responsible for any employment decisions made by cruise lines or for any disputes that may arise
            between applicants and employers.
          </li>
        </ul>

        <h2>3. Cruise Ticket Sales</h2>
        <p>
          As an authorized ticket provider for various cruise lines, we offer cruise packages and related services.
          However:
        </p>
        <ul>
          <li>
            All cruise bookings are subject to the terms and conditions of the respective cruise line, which may include
            specific cancellation policies, refund eligibility, and other important provisions.
          </li>
          <li>
            Prices, itineraries, amenities, and availability are subject to change without notice until a booking is
            confirmed.
          </li>
          <li>
            Images of ships, cabins, and destinations are provided for illustrative purposes only and may not reflect
            the exact experience or accommodations.
          </li>
          <li>
            We are not responsible for any changes to itineraries, cancellations, or other modifications made by cruise
            lines due to weather conditions, operational issues, or other circumstances beyond our control.
          </li>
        </ul>

        <h2>4. External Links</h2>
        <p>
          Our website may contain links to external websites that are not provided or maintained by us. We do not
          guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
        </p>

        <h2>5. Professional Advice</h2>
        <p>
          The information on our website should not be construed as professional advice. Before making any decision or
          taking any action based on information from our website, you should consult with a qualified professional.
        </p>

        <h2>6. Errors and Omissions</h2>
        <p>
          While we strive to keep the information on our website accurate and up-to-date, errors and omissions may
          occur. We reserve the right to correct any errors or omissions, and to change or update information at any
          time without prior notice.
        </p>

        <h2>7. Limitation of Liability</h2>
        <p>
          Under no circumstances shall Caribbean Cruises be liable for any direct, indirect, special, incidental,
          consequential, or punitive damages, including but not limited to, loss of profits, data, use, goodwill, or
          other intangible losses, resulting from:
        </p>
        <ul>
          <li>Your access to or use of or inability to access or use our website</li>
          <li>Any conduct or content of any third party on our website</li>
          <li>Any content obtained from our website</li>
          <li>Unauthorized access, use, or alteration of your transmissions or content</li>
        </ul>

        <h2>8. Indemnification</h2>
        <p>
          You agree to defend, indemnify, and hold harmless Caribbean Cruises, its affiliates, licensors, and service
          providers, and its and their respective officers, directors, employees, contractors, agents, licensors,
          suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards,
          losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your
          violation of this Disclaimer or your use of our website.
        </p>

        <h2>9. Governing Law</h2>
        <p>
          This Disclaimer shall be governed by and construed in accordance with the laws of the State of Florida,
          without regard to its conflict of law provisions.
        </p>

        <h2>10. Changes to This Disclaimer</h2>
        <p>
          We may update this Disclaimer from time to time. We will notify you of any changes by posting the new
          Disclaimer on this page and updating the "Last Updated" date. You are advised to review this Disclaimer
          periodically for any changes.
        </p>

        <h2>11. Contact Us</h2>
        <p>If you have any questions about this Disclaimer, please contact us at:</p>
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
