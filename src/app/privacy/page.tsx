import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 card-shadow">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-gray-600">Last updated: July 12, 2025</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, 
              subscribe to our services, or contact us for support. This may include:
            </p>
            <ul>
              <li>Name and email address</li>
              <li>Payment information (processed securely through Stripe)</li>
              <li>Website content and templates you create</li>
              <li>Usage data and analytics</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process payments and manage subscriptions</li>
              <li>Send you important updates and notifications</li>
              <li>Provide customer support</li>
              <li>Analyze usage patterns to improve our platform</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              except as described in this policy. We may share information with:
            </p>
            <ul>
              <li>Service providers who assist in our operations (Stripe, Firebase, etc.)</li>
              <li>Legal authorities when required by law</li>
              <li>Business partners with your explicit consent</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction. This includes:
            </p>
            <ul>
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments</li>
              <li>Access controls and authentication</li>
              <li>Secure payment processing through Stripe</li>
            </ul>

            <h2>5. Cookies and Tracking</h2>
            <p>
              We use cookies and similar technologies to enhance your experience, analyze usage, 
              and provide personalized content. You can control cookie settings through your browser.
            </p>

            <h2>6. Third-Party Services</h2>
            <p>
              Our platform integrates with third-party services including:
            </p>
            <ul>
              <li><strong>Firebase</strong> - Authentication and database services</li>
              <li><strong>Stripe</strong> - Payment processing</li>
              <li><strong>Google Analytics</strong> - Usage analytics</li>
            </ul>
            <p>
              These services have their own privacy policies, which we encourage you to review.
            </p>

            <h2>7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications</li>
              <li>Export your data</li>
            </ul>

            <h2>8. Data Retention</h2>
            <p>
              We retain your information for as long as necessary to provide our services, 
              comply with legal obligations, resolve disputes, and enforce agreements.
            </p>

            <h2>9. Children&apos;s Privacy</h2>
            <p>
              Our services are not intended for children under 13. We do not knowingly collect 
              personal information from children under 13.
            </p>

            <h2>10. International Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. 
              We ensure appropriate safeguards are in place for such transfers.
            </p>

            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any 
              material changes by email or through our platform.
            </p>

            <h2>12. Contact Us</h2>
            <p>
              If you have questions about this privacy policy or our data practices, please contact us:
            </p>
            <ul>
              <li>Email: privacy@magicwrx.com</li>
              <li>Address: Magic WRX Studios, [Your Address]</li>
            </ul>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Back to Home
              </Link>
              <Link
                href="/terms"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                View Terms of Service →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 