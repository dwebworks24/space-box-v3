import SEO from "@/components/SEO";

export default function RefundPolicy() {
  return (
    <>
      <SEO
        title="Refund Policy"
        description="Refund Policy for SpaceBox Concepts - Learn about our refund process and guidelines."
        keywords="refund policy, spacebox concepts, cancellation"
      />
      <div className="pt-28 pb-20 min-h-screen bg-background">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Refund Policy</h1>

          <div className="prose prose-sm md:prose-base max-w-none text-muted-foreground space-y-6">
            <p>
              At <strong className="text-foreground">SpaceBox Concepts</strong>, we strive to deliver high-quality interior design solutions that meet your expectations. Please read our refund policy carefully before making a purchase.
            </p>

            <h2 className="text-xl font-semibold text-foreground">General Policy</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Payments made for our services are generally non-refundable once the work has commenced.</li>
              <li>All payments are processed securely through Razorpay Payment Gateway.</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground">Exceptional Cases</h2>
            <p>Refund requests may be considered only in exceptional circumstances, such as:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Duplicate payment due to technical issues</li>
              <li>Services not delivered as per the agreed scope (subject to review)</li>
              <li>Project cancellation before work commencement</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground">Refund Process</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To request a refund, please contact us within 7 days of payment.</li>
              <li>Refund requests must be submitted via email with your payment details and reason for the request.</li>
              <li>All refund requests are subject to review and approval by SpaceBox Concepts.</li>
              <li>Approved refunds will be processed within 7–10 business days.</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground">Non-Refundable Items</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Services that have already been delivered</li>
              <li>Custom design work that has been completed</li>
              <li>Third-party fees or licenses purchased on your behalf</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground">Contact Us</h2>
            <p>For refund-related queries, please contact:</p>
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
