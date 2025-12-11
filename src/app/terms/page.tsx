import Link from 'next/link'

export default function TermsOfService() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 card-shadow">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-gray-600">Last updated: July 12, 2025</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using Magic WRX (&quot;the Service&quot;), you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              Magic WRX provides a website building platform that allows users to create, customize, and deploy 
              professional websites using our templates and tools. Our services include:
            </p>
            <ul>
              <li>Website building and customization tools</li>
              <li>Professional templates and themes</li>
              <li>Hosting and domain services</li>
              <li>E-commerce and payment processing</li>
              <li>Customer support and documentation</li>
            </ul>

            <h2>3. User Accounts</h2>
            <p>
              To access certain features of our service, you must create an account. You are responsible for:
            </p>
            <ul>
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Providing accurate and complete information</li>
              <li>Notifying us immediately of any unauthorized use</li>
            </ul>

            <h2>4. Subscription and Payment</h2>
            <p>
              Our service offers both free and paid subscription plans. By subscribing to a paid plan, you agree to:
            </p>
            <ul>
              <li>Pay all fees associated with your chosen plan</li>
              <li>Provide accurate billing information</li>
              <li>Authorize recurring charges for subscription renewals</li>
              <li>Cancel your subscription before the next billing cycle to avoid charges</li>
            </ul>

            <h2>5. Acceptable Use</h2>
            <p>You agree not to use our service to:</p>
            <ul>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Distribute malware, viruses, or harmful code</li>
              <li>Engage in spam or unsolicited communications</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use the service for illegal or harmful purposes</li>
            </ul>

            <h2>6. Content and Intellectual Property</h2>
            <p>
              You retain ownership of content you create using our service. However, you grant us a license to:
            </p>
            <ul>
              <li>Host and display your content as part of our service</li>
              <li>Use your content for service improvement and support</li>
              <li>Backup and store your content for service delivery</li>
            </ul>
            <p>
              Our templates, tools, and platform remain our intellectual property.
            </p>

            <h2>7. Privacy and Data Protection</h2>
            <p>
              Your privacy is important to us. Our collection and use of personal information is governed by our 
              Privacy Policy, which is incorporated into these terms by reference.
            </p>

            <h2>8. Service Availability</h2>
            <p>
              We strive to maintain high service availability but cannot guarantee uninterrupted access. We may:
            </p>
            <ul>
              <li>Perform maintenance and updates</li>
              <li>Modify or discontinue features</li>
              <li>Suspend service for violations of these terms</li>
            </ul>

            <h2>9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Magic WRX shall not be liable for any indirect, incidental, 
              special, consequential, or punitive damages, including but not limited to loss of profits, data, or use.
            </p>

            <h2>10. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Magic WRX from any claims, damages, or expenses arising from 
              your use of the service or violation of these terms.
            </p>

            <h2>11. Termination</h2>
            <p>
              We may terminate or suspend your account at any time for violations of these terms. You may cancel 
              your account at any time through your account settings.
            </p>

            <h2>12. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify users of material changes 
              via email or through our platform.
            </p>

            <h2>13. Governing Law</h2>
            <p>
              These terms are governed by the laws of [Your Jurisdiction]. Any disputes shall be resolved in 
              the courts of [Your Jurisdiction].
            </p>

            <h2>14. Contact Information</h2>
            <p>
              For questions about these terms, please contact us:
            </p>
            <ul>
              <li>Email: legal@magicwrx.com</li>
              <li>Address: Magic WRX Studios, [Your Address]</li>
            </ul>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <Link
                href="/privacy"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Privacy Policy
              </Link>
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Back to Home →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 