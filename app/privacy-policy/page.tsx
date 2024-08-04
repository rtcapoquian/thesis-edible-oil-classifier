import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const PrivacyPolicy: React.FC = () => {
  return (
    <Card className="w-full max-w-3xl mx-auto my-8 p-8 bg-background text-foreground border border-border rounded-lg shadow-sm">
      <CardHeader>
        <CardTitle>Privacy Policy</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          At RejiCode, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you visit our website.
        </p>
        <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
        <p className="mb-4">
          We collect information from you when you visit our website, create an account, or contact us. This information may include:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Personal information such as name, email address, and phone number.</li>
          <li>Usage data such as IP address, browser type, and pages visited.</li>
        </ul>
        <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
        <p className="mb-4">
          We use the information we collect to:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Improve our website and services.</li>
          <li>Respond to inquiries and provide customer support.</li>
          <li>Send periodic updates and promotional materials.</li>
        </ul>
        <h2 className="text-xl font-semibold mb-4">3. Data Security</h2>
        <p className="mb-4">
          We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
        </p>
        <h2 className="text-xl font-semibold mb-4">4. Cookies</h2>
        <p className="mb-4">
          Our website uses cookies to enhance user experience and analyze website traffic. You can manage your cookie preferences through your browser settings.
        </p>
        <h2 className="text-xl font-semibold mb-4">5. Third-Party Links</h2>
        <p className="mb-4">
          Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites.
        </p>
        <h2 className="text-xl font-semibold mb-4">6. Changes to This Policy</h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on our website.
        </p>
        <p>
          If you have any questions about this Privacy Policy, please contact us at <a href="mailto:info@rejicode.com" className="text-blue-500">info@rejicode.com</a>.
        </p>
      </CardContent>
    </Card>
  );
};

export default PrivacyPolicy;
