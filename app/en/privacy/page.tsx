import type { Metadata } from 'next';
import Link from 'next/link';
import { BASE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'WeCalc Technology Privacy Policy. Learn how we collect, use, and protect your personal information in compliance with GDPR and international data protection standards.',
  alternates: { canonical: `${BASE_URL}/en/privacy` },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Privacy Policy | WeCalc Technology',
    description:
      'WeCalc Technology Privacy Policy. Learn how we collect, use, and protect your personal information.',
    url: `${BASE_URL}/en/privacy`,
  },
};

export default function PrivacyPolicyEnPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-gray max-w-none space-y-6 text-gray-600 leading-relaxed text-sm">
          <p className="text-gray-400 text-xs">
            Effective Date: March 2026 &middot; Last Updated: March 2026
          </p>

          {/* 1. Introduction */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              1. Introduction &amp; Company Identity
            </h2>
            <p>
              WeCalc Technology (&ldquo;WeCalc,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo;
              or &ldquo;our&rdquo;) is a technology company headquartered in Beijing, China,
              specializing in micro data center and edge computing solutions. We are committed
              to protecting your privacy and handling your personal data in an open and
              transparent manner.
            </p>
            <p>
              This Privacy Policy explains how we collect, use, disclose, and safeguard your
              information when you visit our website at{' '}
              <a
                href={BASE_URL}
                className="text-brand-600 underline"
              >
                {BASE_URL}
              </a>{' '}
              (the &ldquo;Site&rdquo;), use our products and services, or otherwise interact
              with us. Please read this policy carefully. If you do not agree with the terms of
              this Privacy Policy, please do not access the Site.
            </p>
            <p>
              For the purposes of the EU General Data Protection Regulation (GDPR) and
              applicable data protection laws, the data controller is WeCalc Technology, Beijing,
              China. For questions about data protection, please contact us at{' '}
              <a href="mailto:13426086861@139.com" className="text-brand-600 underline">
                13426086861@139.com
              </a>.
            </p>
          </section>

          {/* 2. Information We Collect */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              2. Information We Collect
            </h2>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              2.1 Personal Information You Provide
            </h3>
            <p>We may collect personal information that you voluntarily provide, including:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Name, email address, telephone number, and company name</li>
              <li>Job title and business address</li>
              <li>Information submitted through contact forms, partnership applications, or service inquiries</li>
              <li>Communication preferences and correspondence records</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              2.2 Usage Data
            </h3>
            <p>When you access our Site, we automatically collect certain information:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Pages visited, time spent on pages, and navigation paths</li>
              <li>Referring URLs and exit pages</li>
              <li>Click-through data and interaction patterns</li>
              <li>Date and time of access</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              2.3 Device Information
            </h3>
            <p>We may collect information about the device you use to access our Site:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>IP address and approximate geolocation</li>
              <li>Browser type and version</li>
              <li>Operating system and platform</li>
              <li>Screen resolution and device identifiers</li>
              <li>Language and time zone settings</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              2.4 Cookies and Tracking Technologies
            </h3>
            <p>
              We use cookies, web beacons, and similar tracking technologies to collect and
              store information. See Section 9 (Cookie Policy) for detailed information.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              2.5 Third-Party Data
            </h3>
            <p>
              We may receive information about you from third-party sources, including business
              partners, analytics providers, and publicly available databases, to supplement the
              information we collect directly.
            </p>
          </section>

          {/* 3. How We Use Your Information */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              3. How We Use Your Information
            </h2>
            <p>We use the information we collect for the following purposes:</p>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              3.1 Service Delivery
            </h3>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Responding to your inquiries and service requests</li>
              <li>Processing partnership applications</li>
              <li>Providing product information and technical support</li>
              <li>Facilitating financing and leasing arrangements</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              3.2 Communication
            </h3>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Sending administrative information, updates, and security alerts</li>
              <li>Responding to comments, questions, and requests</li>
              <li>Providing customer support</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              3.3 Analytics and Improvement
            </h3>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Analyzing usage patterns to improve our Site and services</li>
              <li>Monitoring and analyzing trends, traffic, and user engagement</li>
              <li>Developing new products, services, and features</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              3.4 Legal Compliance
            </h3>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Complying with applicable laws, regulations, and legal processes</li>
              <li>Enforcing our terms and conditions</li>
              <li>Protecting our rights, privacy, safety, or property</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              3.5 Marketing
            </h3>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Sending promotional materials with your prior consent</li>
              <li>Personalizing content and advertisements</li>
              <li>Measuring the effectiveness of marketing campaigns</li>
            </ul>
            <p className="mt-3">
              You may opt out of marketing communications at any time by contacting us at{' '}
              <a href="mailto:13426086861@139.com" className="text-brand-600 underline">
                13426086861@139.com
              </a>.
            </p>
          </section>

          {/* 4. Legal Basis for Processing */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              4. Legal Basis for Processing
            </h2>
            <p>
              If you are located in the European Economic Area (EEA) or the United Kingdom, we
              process your personal data under the following legal bases as defined by the
              General Data Protection Regulation (GDPR):
            </p>
            <ul className="list-disc pl-5 space-y-3 mt-3">
              <li>
                <strong>Consent (Article 6(1)(a) GDPR):</strong> Where you have given clear
                consent for us to process your personal data for a specific purpose, such as
                subscribing to marketing communications.
              </li>
              <li>
                <strong>Contract (Article 6(1)(b) GDPR):</strong> Where processing is necessary
                for the performance of a contract to which you are a party, or to take steps at
                your request prior to entering into a contract.
              </li>
              <li>
                <strong>Legitimate Interest (Article 6(1)(f) GDPR):</strong> Where processing is
                necessary for our legitimate interests or those of a third party, provided that
                such interests are not overridden by your rights. Our legitimate interests include
                improving our services, fraud prevention, and network security.
              </li>
              <li>
                <strong>Legal Obligation (Article 6(1)(c) GDPR):</strong> Where processing is
                necessary for compliance with a legal obligation to which we are subject.
              </li>
            </ul>
          </section>

          {/* 5. Information Sharing and Disclosure */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              5. Information Sharing and Disclosure
            </h2>
            <p>
              We do not sell, rent, or trade your personal information. We may share your
              information in the following circumstances:
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              5.1 Service Providers
            </h3>
            <p>
              We may share your information with trusted third-party service providers who
              perform services on our behalf, including hosting, analytics, email delivery, and
              customer support. These providers are contractually bound to use your data only as
              directed by us and in accordance with this Privacy Policy.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              5.2 Legal Requirements
            </h3>
            <p>
              We may disclose your information if required to do so by law, or in the good faith
              belief that such action is necessary to comply with a legal obligation, protect and
              defend our rights or property, prevent fraud, or protect the personal safety of
              users or the public.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              5.3 Business Transfers
            </h3>
            <p>
              In the event of a merger, acquisition, reorganization, or sale of assets, your
              personal information may be transferred as part of that transaction. We will notify
              you of any such change in ownership or control of your personal information.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              5.4 With Your Consent
            </h3>
            <p>
              We may share your personal information for any other purpose disclosed to you and
              with your explicit consent.
            </p>
          </section>

          {/* 6. International Data Transfers */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              6. International Data Transfers
            </h2>
            <p>
              WeCalc Technology is based in Beijing, China. If you access our Site from outside
              China, please be aware that your information may be transferred to, stored, and
              processed in China, where our servers are located and our central database is
              operated.
            </p>
            <p>
              Where we transfer personal data outside of the European Economic Area (EEA) or
              United Kingdom, we implement appropriate safeguards to ensure that your personal
              data receives an adequate level of protection. These safeguards may include:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Standard Contractual Clauses approved by the European Commission</li>
              <li>Ensuring the recipient country provides an adequate level of data protection</li>
              <li>Obtaining your explicit consent for the transfer</li>
              <li>Implementing supplementary technical and organizational measures</li>
            </ul>
          </section>

          {/* 7. Data Retention */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              7. Data Retention
            </h2>
            <p>
              We retain your personal information only for as long as necessary to fulfill the
              purposes for which it was collected, including to satisfy any legal, accounting, or
              reporting requirements.
            </p>
            <p>The criteria we use to determine retention periods include:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>The duration of our ongoing relationship with you</li>
              <li>Whether there is a legal obligation to which we are subject</li>
              <li>Whether retention is advisable in light of our legal position (such as applicable statutes of limitation, litigation, or regulatory investigations)</li>
              <li>The nature and sensitivity of the data</li>
            </ul>
            <p>
              Contact form submissions and inquiry records are typically retained for up to three
              (3) years. Analytics data may be retained in anonymized or aggregated form
              indefinitely.
            </p>
          </section>

          {/* 8. Your Rights */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              8. Your Rights
            </h2>
            <p>
              Depending on your jurisdiction, you may have the following rights regarding your
              personal data:
            </p>
            <ul className="list-disc pl-5 space-y-3 mt-3">
              <li>
                <strong>Right of Access:</strong> You have the right to request a copy of the
                personal data we hold about you.
              </li>
              <li>
                <strong>Right to Rectification:</strong> You have the right to request
                correction of any inaccurate or incomplete personal data.
              </li>
              <li>
                <strong>Right to Erasure (&ldquo;Right to Be Forgotten&rdquo;):</strong> You
                have the right to request deletion of your personal data, subject to certain
                legal exceptions.
              </li>
              <li>
                <strong>Right to Restriction of Processing:</strong> You have the right to
                request that we restrict the processing of your personal data under certain
                conditions.
              </li>
              <li>
                <strong>Right to Data Portability:</strong> You have the right to receive your
                personal data in a structured, commonly used, and machine-readable format and to
                transmit it to another controller.
              </li>
              <li>
                <strong>Right to Object:</strong> You have the right to object to our processing
                of your personal data, including processing for direct marketing purposes.
              </li>
              <li>
                <strong>Rights Related to Automated Decision-Making:</strong> You have the right
                not to be subject to a decision based solely on automated processing, including
                profiling, which produces legal effects concerning you. We do not currently engage
                in automated decision-making.
              </li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please contact us at{' '}
              <a href="mailto:13426086861@139.com" className="text-brand-600 underline">
                13426086861@139.com
              </a>. We will respond to your request within thirty (30) days. You also have the
              right to lodge a complaint with your local data protection authority.
            </p>
          </section>

          {/* 9. Cookie Policy */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              9. Cookie Policy
            </h2>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              9.1 Types of Cookies We Use
            </h3>
            <ul className="list-disc pl-5 space-y-3 mt-3">
              <li>
                <strong>Strictly Necessary Cookies:</strong> Essential for the operation of our
                Site. These cookies enable core functionality such as page navigation and access
                to secure areas.
              </li>
              <li>
                <strong>Performance and Analytics Cookies:</strong> Help us understand how
                visitors interact with our Site by collecting and reporting information
                anonymously. We may use tools such as Google Analytics.
              </li>
              <li>
                <strong>Functionality Cookies:</strong> Allow our Site to remember choices you
                make (such as language or region) and provide enhanced, personalized features.
              </li>
              <li>
                <strong>Marketing Cookies:</strong> Used to track visitors across websites to
                display relevant advertisements. These cookies may be set by third-party
                advertising partners.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              9.2 Managing Cookies
            </h3>
            <p>
              Most web browsers allow you to control cookies through their settings. You can set
              your browser to refuse cookies, delete existing cookies, or alert you when a cookie
              is being sent. Please note that disabling cookies may affect the functionality of
              our Site.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              9.3 Third-Party Cookies
            </h3>
            <p>
              Some cookies on our Site are placed by third-party services that appear on our
              pages. We do not control the use of these cookies and refer you to the privacy
              policies of the respective third parties for more information.
            </p>
          </section>

          {/* 10. Children's Privacy */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              10. Children&apos;s Privacy
            </h2>
            <p>
              Our Site and services are not directed to individuals under the age of sixteen (16).
              We do not knowingly collect personal information from children under 16. If we
              become aware that we have inadvertently collected personal data from a child under
              16, we will take reasonable steps to delete such information promptly. If you
              believe that we have collected information from a child under 16, please contact us
              immediately at{' '}
              <a href="mailto:13426086861@139.com" className="text-brand-600 underline">
                13426086861@139.com
              </a>.
            </p>
          </section>

          {/* 11. Security Measures */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              11. Security Measures
            </h2>
            <p>
              We implement appropriate technical and organizational security measures to protect
              your personal information against unauthorized access, alteration, disclosure, or
              destruction. These measures include:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>HTTPS/TLS encryption for all data transmitted to and from our Site</li>
              <li>Encryption of personal data at rest where technically feasible</li>
              <li>Strict access controls and role-based permissions for personnel handling personal data</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Incident response procedures and breach notification protocols</li>
              <li>Employee training on data protection and security practices</li>
            </ul>
            <p>
              While we strive to use commercially acceptable means to protect your personal data,
              no method of transmission over the Internet or method of electronic storage is 100%
              secure. We cannot guarantee its absolute security.
            </p>
          </section>

          {/* 12. Changes to This Policy */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              12. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our
              practices, technologies, legal requirements, or other factors. When we make material
              changes, we will:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Post the updated policy on this page with a revised &ldquo;Last Updated&rdquo; date</li>
              <li>Provide prominent notice on our Site (such as a banner notification)</li>
              <li>Where required by law, obtain your consent to the changes</li>
            </ul>
            <p>
              We encourage you to review this Privacy Policy periodically to stay informed about
              how we are protecting your information.
            </p>
          </section>

          {/* 13. Contact Information */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              13. Contact Information
            </h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or
              our data protection practices, please contact our Data Protection Officer:
            </p>
            <ul className="list-none pl-0 space-y-2 mt-3">
              <li><strong>Company:</strong> WeCalc Technology (微算科技)</li>
              <li><strong>Address:</strong> Beijing, China</li>
              <li>
                <strong>Email:</strong>{' '}
                <a href="mailto:13426086861@139.com" className="text-brand-600 underline">
                  13426086861@139.com
                </a>
              </li>
              <li><strong>Phone:</strong> +86-134-2608-6861</li>
            </ul>
            <p className="mt-3">
              We aim to respond to all legitimate requests within thirty (30) days. If your
              request is particularly complex or you have made multiple requests, it may take
              longer, but we will notify you and keep you updated.
            </p>
          </section>

          <div className="border-t border-gray-200 pt-6 mt-10">
            <p className="text-gray-400 text-xs">
              This Privacy Policy is also available in{' '}
              <Link href="/privacy" className="text-brand-600 underline">
                Chinese (中文)
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
