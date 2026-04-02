import SEO from "@/components/SEO";

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Privacy Policy of SpaceBox Concepts - How we collect, use, and safeguard your information."
        keywords="privacy policy, spacebox concepts, data protection"
      />
      <div className="pt-28 pb-20 min-h-screen bg-background">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>

          <div className="prose prose-sm md:prose-base max-w-none text-muted-foreground space-y-6">
            <p>
              At <strong className="text-foreground">SpaceBox Concepts</strong>, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website or services.
            </p>

            <h2 className="text-xl font-semibold text-foreground">Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Personal details such as name, email address, phone number, and billing information when you contact us or make payments.</li>
              <li>Technical information like IP address, browser type, and device details to enhance your user experience.</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground">How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To deliver our interior design and architectural services.</li>
              <li>To process secure payments through Razorpay Payment Gateway.</li>
              <li>To communicate with you regarding invoices, project updates, and customer support.</li>
              <li>To comply with legal and regulatory obligations.</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground">Data Protection</h2>
            <p>
              We do not store sensitive payment information such as card or banking details. All transactions are securely processed through Razorpay in compliance with their privacy and security policies.
            </p>

            <h2 className="text-xl font-semibold text-foreground">Third-Party Services</h2>
            <p>
              We may use trusted third-party service providers for analytics, communication, or payment processing. These providers are required to protect your information and use it only for the services they provide.
            </p>

            <h2 className="text-xl font-semibold text-foreground">Your Rights</h2>
            <p>
              You have the right to access, update, or request deletion of your personal information by contacting us. We will make every effort to honor such requests promptly.
            </p>

            <h2 className="text-xl font-semibold text-foreground">Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
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
