import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const TermsOfUse: React.FC = () => {
  return (
    <Card className="w-full max-w-3xl mx-auto my-8 p-6 bg-background text-foreground border border-border rounded-lg shadow-sm">
      <CardHeader>
        <CardTitle>Terms of Use</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Welcome to RejiCode! By using our website, you agree to comply with and be bound by the following terms and conditions of use. Please review these terms carefully.
        </p>
        <h2 className="text-xl font-semibold mb-4">1. Use of the Site</h2>
        <p className="mb-4">
          You may use our website only for lawful purposes and in accordance with these terms. You agree not to use the site:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>In any way that violates any applicable local, national, or international law or regulation.</li>
          <li>To transmit or procure the sending of any unsolicited or unauthorized advertising or promotional material.</li>
        </ul>
        <h2 className="text-xl font-semibold mb-4">2. Intellectual Property Rights</h2>
        <p className="mb-4">
          The content, features, and functionality on our website are owned by us or our licensors and are protected by copyright, trademark, and other intellectual property laws.
        </p>
        <h2 className="text-xl font-semibold mb-4">3. Disclaimer of Warranties</h2>
        <p className="mb-4">
          Our website is provided on an &quot;as is&quot; and &quot;as available&quot; basis. We make no representations or warranties of any kind, express or implied, regarding the operation or availability of our website.
        </p>
        <h2 className="text-xl font-semibold mb-4">4. Limitation of Liability</h2>
        <p className="mb-4">
          To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the site.
        </p>
        <h2 className="text-xl font-semibold mb-4">5. Changes to Terms</h2>
        <p className="mb-4">
          We reserve the right to change these terms at any time. Your continued use of the site after any changes constitutes acceptance of the new terms.
        </p>
        <p>
          If you have any questions about these Terms of Use, please contact us at <a href="mailto:info@rejicode.com" className="text-blue-500">info@rejicode.com</a>.
        </p>
      </CardContent>
    </Card>
  );
};

export default TermsOfUse;
