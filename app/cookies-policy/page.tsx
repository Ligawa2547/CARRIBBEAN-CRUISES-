import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function CookiesPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link href="/" className="inline-flex items-center text-ocean-600 hover:text-ocean-700 mb-6 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <h1 className="text-3xl font-bold mb-6">Cookies Policy</h1>
      <p className="text-muted-foreground mb-6">Last Updated: May 10, 2025</p>

      <div className="prose prose-ocean max-w-none">
        <p>
          This Cookies Policy explains how Caribbean Cruises ("we," "our," or "us") uses cookies and similar
          technologies on our website www.caribbeancruises.site. This policy should be read alongside our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>, which explains how we use personal information.
        </p>

        <h2>1. What Are Cookies?</h2>
        <p>
          Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit
          websites. They are widely used to make websites work more efficiently, provide a better user experience, and
          give website owners information about how their sites are used.
        </p>
        <p>
          Other similar technologies, such as web beacons, clear GIFs, pixel tags, and local storage, may also be used
          for similar purposes. In this policy, we refer to all these technologies as "cookies."
        </p>

        <h2>2. Types of Cookies We Use</h2>
        <p>We use the following types of cookies on our website:</p>

        <h3>2.1 Essential Cookies</h3>
        <p>
          These cookies are necessary for the website to function properly. They enable basic functions like page
          navigation, secure areas access, and form submissions. The website cannot function properly without these
          cookies, and they cannot be disabled in our systems.
        </p>
        <table className="border-collapse border border-slate-300 w-full mb-6">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 p-2 text-left">Cookie Name</th>
              <th className="border border-slate-300 p-2 text-left">Purpose</th>
              <th className="border border-slate-300 p-2 text-left">Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 p-2">XSRF-TOKEN</td>
              <td className="border border-slate-300 p-2">
                Security - Helps protect against cross-site request forgery
              </td>
              <td className="border border-slate-300 p-2">Session</td>
            </tr>
            <tr>
              <td className="border border-slate-300 p-2">session</td>
              <td className="border border-slate-300 p-2">Maintains user session information</td>
              <td className="border border-slate-300 p-2">2 hours</td>
            </tr>
            <tr>
              <td className="border border-slate-300 p-2">cookie_consent</td>
              <td className="border border-slate-300 p-2">Stores your cookie consent preferences</td>
              <td className="border border-slate-300 p-2">1 year</td>
            </tr>
          </tbody>
        </table>

        <h3>2.2 Performance and Analytics Cookies</h3>
        <p>
          These cookies collect information about how visitors use our website, such as which pages they visit most
          often and if they receive error messages. They help us improve website performance and user experience. All
          information collected by these cookies is aggregated and anonymous.
        </p>
        <table className="border-collapse border border-slate-300 w-full mb-6">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 p-2 text-left">Cookie Name</th>
              <th className="border border-slate-300 p-2 text-left">Purpose</th>
              <th className="border border-slate-300 p-2 text-left">Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 p-2">_ga</td>
              <td className="border border-slate-300 p-2">Google Analytics - Distinguishes unique users</td>
              <td className="border border-slate-300 p-2">2 years</td>
            </tr>
            <tr>
              <td className="border border-slate-300 p-2">_gid</td>
              <td className="border border-slate-300 p-2">Google Analytics - Identifies user session</td>
              <td className="border border-slate-300 p-2">24 hours</td>
            </tr>
            <tr>
              <td className="border border-slate-300 p-2">_gat</td>
              <td className="border border-slate-300 p-2">Google Analytics - Throttles request rate</td>
              <td className="border border-slate-300 p-2">1 minute</td>
            </tr>
          </tbody>
        </table>

        <h3>2.3 Functional Cookies</h3>
        <p>
          These cookies enable enhanced functionality and personalization, such as remembering your preferences and
          settings. They may be set by us or by third-party providers whose services we have added to our pages.
        </p>
        <table className="border-collapse border border-slate-300 w-full mb-6">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 p-2 text-left">Cookie Name</th>
              <th className="border border-slate-300 p-2 text-left">Purpose</th>
              <th className="border border-slate-300 p-2 text-left">Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 p-2">user_preferences</td>
              <td className="border border-slate-300 p-2">Remembers your site preferences (e.g., language, theme)</td>
              <td className="border border-slate-300 p-2">1 year</td>
            </tr>
            <tr>
              <td className="border border-slate-300 p-2">recently_viewed_jobs</td>
              <td className="border border-slate-300 p-2">Tracks recently viewed job listings</td>
              <td className="border border-slate-300 p-2">30 days</td>
            </tr>
          </tbody>
        </table>

        <h3>2.4 Targeting and Advertising Cookies</h3>
        <p>
          These cookies are used to track visitors across websites to display relevant advertisements based on their
          browsing habits. They remember that you have visited our site and may share this information with other
          organizations, such as advertisers.
        </p>
        <table className="border-collapse border border-slate-300 w-full mb-6">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 p-2 text-left">Cookie Name</th>
              <th className="border border-slate-300 p-2 text-left">Purpose</th>
              <th className="border border-slate-300 p-2 text-left">Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 p-2">_fbp</td>
              <td className="border border-slate-300 p-2">Facebook Pixel - Tracks conversions from Facebook ads</td>
              <td className="border border-slate-300 p-2">3 months</td>
            </tr>
            <tr>
              <td className="border border-slate-300 p-2">IDE</td>
              <td className="border border-slate-300 p-2">
                Google DoubleClick - Used for targeted advertising purposes
              </td>
              <td className="border border-slate-300 p-2">1 year</td>
            </tr>
          </tbody>
        </table>

        <h2>3. Third-Party Cookies</h2>
        <p>
          Some cookies are placed by third parties on our website. These third parties may include analytics providers
          (like Google), advertising networks, and social media platforms. These third parties may use cookies, web
          beacons, and similar technologies to collect information about your use of our website and other websites.
        </p>
        <p>
          We do not control these third parties or their use of cookies. Please refer to the privacy policies of these
          third parties for more information about how they use cookies:
        </p>
        <ul>
          <li>
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Google Analytics
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/policy.php" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </li>
        </ul>

        <h2>4. Cookie Management</h2>
        <h3>4.1 Cookie Consent</h3>
        <p>
          When you first visit our website, you will be shown a cookie banner that allows you to accept or decline
          non-essential cookies. You can change your preferences at any time by clicking on the "Cookie Settings" link
          in the footer of our website.
        </p>

        <h3>4.2 Browser Settings</h3>
        <p>
          Most web browsers allow you to control cookies through their settings. You can usually find these settings in
          the "Options" or "Preferences" menu of your browser. The following links may help you understand how to manage
          cookies in common browsers:
        </p>
        <ul>
          <li>
            <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">
              Google Chrome
            </a>
          </li>
          <li>
            <a
              href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a
              href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
              target="_blank"
              rel="noopener noreferrer"
            >
              Safari
            </a>
          </li>
          <li>
            <a
              href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
              target="_blank"
              rel="noopener noreferrer"
            >
              Microsoft Edge
            </a>
          </li>
        </ul>
        <p>
          Please note that restricting cookies may impact the functionality of our website and your user experience.
        </p>

        <h3>4.3 Do Not Track</h3>
        <p>
          Some browsers have a "Do Not Track" feature that signals to websites that you visit that you do not want your
          online activity tracked. Due to the lack of a common understanding of how to interpret the DNT signal, our
          website does not currently respond to DNT signals.
        </p>

        <h2>5. Legal Basis for Processing (for EEA, UK, and Similar Jurisdictions)</h2>
        <p>
          The legal basis for processing information through cookies depends on the type of cookie and the purpose for
          which it is used:
        </p>
        <ul>
          <li>
            <strong>Essential cookies:</strong> Processed on the basis of contractual necessity (to provide the services
            you request) and our legitimate interests in ensuring the security and proper functioning of our website.
          </li>
          <li>
            <strong>Performance, functional, and targeting cookies:</strong> Processed on the basis of your consent,
            which you can withdraw at any time.
          </li>
        </ul>

        <h2>6. Changes to This Cookies Policy</h2>
        <p>
          We may update this Cookies Policy from time to time to reflect changes in technology, regulation, or our
          business practices. Any changes will be posted on this page with an updated "Last Updated" date. We encourage
          you to check this page periodically for any changes.
        </p>

        <h2>7. Contact Us</h2>
        <p>
          If you have any questions or concerns about our use of cookies or this Cookies Policy, please contact us at:
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
