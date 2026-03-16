import type { Metadata } from 'next';
import Link from 'next/link';
import { BASE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'WeCalc Technology Terms of Service. Understand the terms and conditions governing your use of WeCalc products and services.',
  alternates: { canonical: `${BASE_URL}/en/terms` },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Terms of Service | WeCalc Technology',
    description:
      'WeCalc Technology Terms of Service. Terms and conditions for using WeCalc products and services.',
    url: `${BASE_URL}/en/terms`,
  },
};

export default function TermsOfServiceEnPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        <div className="prose prose-gray max-w-none space-y-6 text-gray-600 leading-relaxed text-sm">
          <p className="text-gray-400 text-xs">
            Effective Date: March 2026 &middot; Last Updated: March 2026
          </p>

          {/* 1. Agreement to Terms */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              1. Agreement to Terms
            </h2>
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding
              agreement between you (&ldquo;User,&rdquo; &ldquo;you,&rdquo; or
              &ldquo;your&rdquo;) and WeCalc Technology (&ldquo;WeCalc,&rdquo;
              &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), a technology company
              headquartered in Beijing, China.
            </p>
            <p>
              By accessing or using our website at{' '}
              <a href={BASE_URL} className="text-brand-600 underline">
                {BASE_URL}
              </a>{' '}
              (the &ldquo;Site&rdquo;), purchasing our products, or utilizing our services, you
              acknowledge that you have read, understood, and agree to be bound by these Terms and
              our{' '}
              <Link href="/en/privacy" className="text-brand-600 underline">
                Privacy Policy
              </Link>,
              which is incorporated herein by reference. If you do not agree to these Terms, you
              must not access or use the Site or our services.
            </p>
          </section>

          {/* 2. Description of Services */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              2. Description of Services
            </h2>
            <p>WeCalc provides the following products and services:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>
                <strong>Micro Data Center Products:</strong> Hardware and software integrated
                solutions including the WeCalc-B (Basic), WeCalc-P (Professional), and WeCalc-E
                (Enterprise) series for local AI computing infrastructure
              </li>
              <li>
                <strong>Website and Information Services:</strong> Product information, technical
                specifications, case studies, and industry insights published on the Site
              </li>
              <li>
                <strong>Consulting and Technical Support:</strong> Pre-sales technical
                consultation, solution architecture, deployment assistance, and post-sales support
              </li>
              <li>
                <strong>Partnership Programs:</strong> Regional distribution, integration
                partnership, and reseller programs
              </li>
              <li>
                <strong>Financing and Leasing:</strong> Equipment financing and leasing
                arrangements facilitated through third-party financial partners
              </li>
            </ul>
          </section>

          {/* 3. User Accounts and Registration */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              3. User Accounts and Registration
            </h2>
            <p>
              Certain features or services may require you to create an account or submit
              registration information. When you do so, you agree to:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and promptly update your information to keep it accurate and current</li>
              <li>Maintain the confidentiality of your account credentials and restrict access to your account</li>
              <li>Accept responsibility for all activities that occur under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>
            <p>
              We reserve the right to suspend or terminate your account at our discretion if we
              reasonably believe that the information you provided is inaccurate, or that you
              have violated these Terms.
            </p>
          </section>

          {/* 4. Intellectual Property Rights */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              4. Intellectual Property Rights
            </h2>
            <p>
              All content, features, and functionality of the Site &mdash; including but not
              limited to text, graphics, logos, icons, images, audio clips, software, data
              compilations, page layout, underlying code, and designs &mdash; are the exclusive
              property of WeCalc Technology or its licensors and are protected by the laws of the
              People&apos;s Republic of China and international intellectual property laws,
              including copyright, trademark, patent, and trade secret laws.
            </p>
            <p>
              The WeCalc name, logo, and all related names, logos, product and service names,
              designs, and slogans are trademarks of WeCalc Technology. You must not use such
              marks without the prior written permission of WeCalc.
            </p>
            <p>
              No right, title, or interest in or to the Site or any content on the Site is
              transferred to you, and all rights not expressly granted are reserved by WeCalc.
            </p>
          </section>

          {/* 5. User Content and Conduct */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              5. User Content and Conduct
            </h2>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              5.1 Acceptable Use
            </h3>
            <p>
              You may use our Site only for lawful purposes and in accordance with these Terms.
              Any information you submit through the Site must be accurate and not misleading.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              5.2 Prohibited Activities
            </h3>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Use the Site in any way that violates any applicable law or regulation</li>
              <li>Impersonate or attempt to impersonate WeCalc, a WeCalc employee, another user, or any other person or entity</li>
              <li>Engage in any conduct that restricts or inhibits anyone&apos;s use or enjoyment of the Site</li>
              <li>Introduce viruses, trojans, worms, logic bombs, or other material that is malicious or technologically harmful</li>
              <li>Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Site, servers, or databases</li>
              <li>Use any robot, spider, scraper, or other automated means to access the Site without our prior written consent</li>
              <li>Collect or harvest any personally identifiable information from the Site</li>
              <li>Use the Site to transmit unsolicited advertising or promotional materials</li>
            </ul>
          </section>

          {/* 6. Product Information and Pricing */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              6. Product Information and Pricing
            </h2>
            <p>
              We make reasonable efforts to ensure the accuracy of product information and pricing
              displayed on our Site. However:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Product specifications, configurations, and images are for reference purposes only and may differ from the actual product</li>
              <li>Prices are subject to change without prior notice and may vary based on configuration, volume, and contract terms</li>
              <li>All final product specifications and pricing shall be governed by the executed purchase or service agreement</li>
              <li>We reserve the right to correct any errors in pricing or product descriptions at any time</li>
            </ul>
          </section>

          {/* 7. Financing and Leasing Terms */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              7. Financing and Leasing Terms
            </h2>
            <p>
              WeCalc may offer financing and leasing options for its products through
              partnerships with third-party financial institutions. The following general terms
              apply:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>All financing and leasing arrangements are subject to credit approval by the relevant financial institution</li>
              <li>Specific terms, conditions, interest rates, and payment schedules will be detailed in separate financing or lease agreements</li>
              <li>WeCalc acts as a facilitator and is not the direct lender or lessor unless explicitly stated otherwise</li>
              <li>Promotional financing terms (such as minimum monthly payments) displayed on the Site are illustrative and subject to the final agreement</li>
              <li>Early termination, default, and other specific provisions will be governed by the executed financing agreement</li>
            </ul>
          </section>

          {/* 8. Partnership Program Terms */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              8. Partnership Program Terms
            </h2>
            <p>
              WeCalc offers partnership programs for qualified businesses. General terms include:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Partnership applications are subject to review and approval at WeCalc&apos;s sole discretion</li>
              <li>Partners must meet and maintain minimum qualifications and performance standards as determined by WeCalc</li>
              <li>Partnership benefits, commission structures, and territorial arrangements will be detailed in separate partnership agreements</li>
              <li>WeCalc reserves the right to modify, suspend, or terminate the partnership program or any partner&apos;s participation at any time</li>
              <li>Partners shall not make unauthorized representations or warranties on behalf of WeCalc</li>
            </ul>
          </section>

          {/* 9. Privacy */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">9. Privacy</h2>
            <p>
              Your use of our Site and services is also governed by our{' '}
              <Link href="/en/privacy" className="text-brand-600 underline">
                Privacy Policy
              </Link>,
              which describes how we collect, use, and protect your personal information. By
              using our Site, you consent to the collection and use of information as described
              in our Privacy Policy.
            </p>
          </section>

          {/* 10. Disclaimers and Limitations of Liability */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              10. Disclaimers and Limitations of Liability
            </h2>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              10.1 &ldquo;As Is&rdquo; Disclaimer
            </h3>
            <p>
              THE SITE AND ALL CONTENT, SERVICES, AND INFORMATION PROVIDED THEREON ARE PROVIDED
              ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS WITHOUT WARRANTIES
              OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED
              WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
              NON-INFRINGEMENT. WECALC DOES NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED,
              ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              10.2 Limitation of Damages
            </h3>
            <p>
              TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL WECALC, ITS
              DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT,
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT
              LIMITATION LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES,
              ARISING OUT OF OR RELATED TO YOUR USE OF OR INABILITY TO USE THE SITE OR SERVICES,
              WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), STATUTE, OR ANY
              OTHER LEGAL THEORY, EVEN IF WECALC HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH
              DAMAGES.
            </p>
            <p>
              In jurisdictions where the exclusion or limitation of liability for consequential
              or incidental damages is not allowed, our liability shall be limited to the greatest
              extent permitted by law.
            </p>
          </section>

          {/* 11. Indemnification */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              11. Indemnification
            </h2>
            <p>
              You agree to defend, indemnify, and hold harmless WeCalc Technology and its
              officers, directors, employees, agents, licensors, and suppliers from and against
              any claims, actions, demands, liabilities, and settlements, including without
              limitation reasonable legal and accounting fees, resulting from or alleged to result
              from your use of the Site or services in a manner that violates or is alleged to
              violate these Terms or any applicable law or regulation.
            </p>
          </section>

          {/* 12. Governing Law and Dispute Resolution */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              12. Governing Law and Dispute Resolution
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the
              People&apos;s Republic of China, without regard to its conflict-of-law provisions.
            </p>
            <p>
              Any dispute arising out of or in connection with these Terms shall first be resolved
              through friendly negotiation. If the dispute cannot be resolved through negotiation
              within thirty (30) days, either party may:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Submit the dispute to the competent People&apos;s Court in Beijing, China, which shall have exclusive jurisdiction; or</li>
              <li>Submit the dispute to the China International Economic and Trade Arbitration Commission (CIETAC) for arbitration in Beijing in accordance with its then-current arbitration rules. The arbitral award shall be final and binding upon both parties.</li>
            </ul>
          </section>

          {/* 13. Force Majeure */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              13. Force Majeure
            </h2>
            <p>
              WeCalc shall not be liable for any failure or delay in performing its obligations
              under these Terms where such failure or delay results from circumstances beyond our
              reasonable control, including but not limited to natural disasters, acts of
              government, war, terrorism, pandemic, epidemic, civil unrest, power outages,
              internet or telecommunications failures, fire, flood, or labor disputes.
            </p>
          </section>

          {/* 14. Severability */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">14. Severability</h2>
            <p>
              If any provision of these Terms is held by a court or other tribunal of competent
              jurisdiction to be invalid, illegal, or unenforceable for any reason, such provision
              shall be eliminated or limited to the minimum extent such that the remaining
              provisions of the Terms will continue in full force and effect.
            </p>
          </section>

          {/* 15. Entire Agreement */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              15. Entire Agreement
            </h2>
            <p>
              These Terms, together with our Privacy Policy and any other legal notices or
              agreements published by WeCalc on the Site, constitute the entire agreement between
              you and WeCalc concerning the Site and supersede all prior and contemporaneous
              understandings, agreements, representations, and warranties, both written and oral,
              regarding the Site. Nothing in these Terms shall affect the terms of any separate
              product purchase, service, financing, or partnership agreement executed between you
              and WeCalc.
            </p>
          </section>

          {/* 16. Changes to Terms */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              16. Changes to Terms
            </h2>
            <p>
              We reserve the right to revise and update these Terms at our sole discretion, at
              any time. All changes are effective immediately when posted and apply to all access
              to and use of the Site thereafter.
            </p>
            <p>
              When we make material changes to these Terms, we will provide notice by posting the
              updated Terms on this page with a revised &ldquo;Last Updated&rdquo; date and, where
              appropriate, providing additional notice through our Site. Your continued use of
              the Site following the posting of revised Terms means you accept and agree to the
              changes.
            </p>
          </section>

          {/* 17. Contact Information */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              17. Contact Information
            </h2>
            <p>
              For any questions or concerns regarding these Terms of Service, please contact us:
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
          </section>

          <div className="border-t border-gray-200 pt-6 mt-10">
            <p className="text-gray-400 text-xs">
              These Terms of Service are also available in{' '}
              <Link href="/terms" className="text-brand-600 underline">
                Chinese (中文)
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
