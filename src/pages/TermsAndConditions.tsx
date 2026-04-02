import SEO from "@/components/SEO";

export default function TermsAndConditions() {
  return (
    <>
      <SEO
        title="Terms and Conditions"
        description="Terms and Conditions for SpaceBox Concepts services and website usage."
        keywords="terms and conditions, spacebox concepts, legal"
      />
      <div className="pt-28 pb-20 min-h-screen bg-background">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Terms and Conditions</h1>

          <div className="prose prose-sm md:prose-base max-w-none text-muted-foreground space-y-6">
            <p>
              This website is operated by <strong className="text-foreground">SpaceBox Concepts</strong> ("Company", "we", "us", or "our"). By accessing or using our website and services, including making payments through Razorpay, you ("user", "customer", "client") agree to comply with and be bound by the following Terms and Conditions.
            </p>

            <h2 className="text-xl font-semibold text-foreground">1. General</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>By using this website, you agree to be legally bound by these Terms and Conditions.</li>
              <li>We reserve the right to update, modify, or replace any part of these Terms at any time without prior notice.</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground">2. Services</h2>
            <p>SpaceBox Concepts provides interior design and architectural solutions including, but not limited to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Residential Interior Design</li>
              <li>Commercial Interior Design</li>
              <li>Architectural Planning</li>
              <li>3D Visualization & Rendering</li>
              <li>Turnkey Interior Solutions</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground">3. Payments via Razorpay</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>All online payments are processed securely through Razorpay Payment Gateway.</li>
              <li>By initiating a payment, you agree to provide accurate and complete payment details.</li>
              <li>We do not store your card, UPI, or banking details. These are handled by Razorpay as per their security policies.</li>
              <li>Payments once made are non-transferable.</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground">4. Pricing & Taxes</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>All prices for services will be communicated to clients in advance.</li>
              <li>Applicable taxes (such as GST) will be levied as per government regulations.</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground">5. Refund & Cancellation Policy</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Payments made for our services are generally non-refundable once the work has commenced.</li>
              <li>Refund requests may be considered only in exceptional cases and at the sole discretion of SpaceBox Concepts.</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground">6. Intellectual Property</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>All content, logos, and materials on this site are the property of SpaceBox Concepts unless otherwise stated.</li>
              <li>Unauthorized reproduction or distribution is prohibited.</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground">7. Limitation of Liability</h2>
            <p>
              SpaceBox Concepts shall not be liable for any direct, indirect, or consequential damages arising from the use of our website or services.
            </p>

            <h2 className="text-xl font-semibold text-foreground">8. Governing Law</h2>
            <p>
              These Terms shall be governed and interpreted in accordance with the laws of India. Any disputes shall fall under the exclusive jurisdiction of courts in Hyderabad, Telangana.
            </p>

            <h2 className="text-xl font-semibold text-foreground">9. Contact Us</h2>
            <p>For any questions regarding these Terms and Conditions, please contact:</p>
            <div className="bg-muted/50 rounded-lg p-5 space-y-2">
              <p className="font-semibold text-foreground">SpaceBox Concepts</p>
              <p>📍 Plot no.147, V-Pride building, Spring valley road, Kondapur, Serilingampally – 500084</p>
              <p>📧 Email: <a href="mailto:spaceboxconcepts@gmail.com" className="text-secondary hover:underline">spaceboxconcepts@gmail.com</a></p>
              <p>📞 Phone: <a href="tel:+917799101433" className="text-secondary hover:underline">+91 77991 01433</a></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
