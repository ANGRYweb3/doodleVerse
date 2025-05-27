import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-16 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl doodle-border">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 font-doodle">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Terms of Service
            </span>
          </h1>
          
          <div className="space-y-8 text-gray-700 font-doodle-body">
            <div>
              <p className="text-sm text-gray-500 mb-6">Last updated: January 2025</p>
            </div>

            <section>
              <h2 className="text-2xl font-bold mb-4 font-doodle text-gray-800">1. Acceptance of Terms</h2>
              <p className="mb-4 leading-relaxed">
                Welcome to DoodleVerse! By accessing or using our platform, you agree to be bound by these Terms of Service ("Terms"). If you do not agree with any part of these terms, you may not use our service.
              </p>
              <p className="mb-4 leading-relaxed">
                These Terms constitute a legally binding agreement between you and DoodleVerse regarding your use of our AI-powered crypto tools platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 font-doodle text-gray-800">2. Description of Service</h2>
              <p className="mb-4 leading-relaxed">
                DoodleVerse provides AI-powered tools for cryptocurrency analysis, including but not limited to:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>HBAR and cryptocurrency price forecasting</li>
                <li>Portfolio analysis and tracking</li>
                <li>Market sentiment analysis</li>
                <li>Technical indicators and backtesting</li>
                <li>Other AI-driven crypto tools (as we expand)</li>
              </ul>
              <p className="mb-4 leading-relaxed">
                Access to certain features requires holding valid DoodleVerse NFTs from our Early Supporters collection (#1-50).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 font-doodle text-gray-800">3. Eligibility and Account Requirements</h2>
              
              <h3 className="text-lg font-semibold mb-3 font-doodle-fun text-gray-700">3.1 Age Requirements</h3>
              <p className="mb-4 leading-relaxed">
                You must be at least 18 years old to use DoodleVerse. By using our service, you represent and warrant that you meet this age requirement.
              </p>

              <h3 className="text-lg font-semibold mb-3 font-doodle-fun text-gray-700">3.2 Wallet Connection</h3>
              <p className="mb-4 leading-relaxed">
                To access our services, you must connect a compatible Hedera wallet (such as HashPack). You are responsible for:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>Maintaining the security of your wallet and private keys</li>
                <li>All activities that occur through your connected wallet</li>
                <li>Ensuring your wallet software is up to date and secure</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 font-doodle text-gray-800">4. NFT Access and Ownership</h2>
              
              <h3 className="text-lg font-semibold mb-3 font-doodle-fun text-gray-700">4.1 Early Supporters Collection</h3>
              <p className="mb-4 leading-relaxed">
                DoodleVerse Early Supporters NFTs (#1-50) grant unlimited access to all current and future tools on our platform. These benefits include:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>Unlimited use of all AI tools</li>
                <li>Early access to new features</li>
                <li>No usage restrictions or rate limits</li>
                <li>Lifetime access (as long as you hold the NFT)</li>
              </ul>

              <h3 className="text-lg font-semibold mb-3 font-doodle-fun text-gray-700">4.2 NFT Verification</h3>
              <p className="mb-4 leading-relaxed">
                Access is verified through your connected wallet's NFT holdings. You must maintain ownership of a valid NFT to continue accessing premium features.
              </p>

              <h3 className="text-lg font-semibold mb-3 font-doodle-fun text-gray-700">4.3 Future Collections</h3>
              <p className="mb-4 leading-relaxed">
                Future NFT collections may have different access levels and restrictions. Early Supporters (#1-50) will maintain their unlimited access privileges.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 font-doodle text-gray-800">5. Use of AI Tools and Data</h2>
              
              <h3 className="text-lg font-semibold mb-3 font-doodle-fun text-gray-700">5.1 Educational Purpose</h3>
              <p className="mb-4 leading-relaxed">
                Our AI tools are provided for educational and informational purposes only. They are not financial advice, investment recommendations, or trading signals.
              </p>

              <h3 className="text-lg font-semibold mb-3 font-doodle-fun text-gray-700">5.2 No Guarantees</h3>
              <p className="mb-4 leading-relaxed">
                We make no guarantees about:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>Accuracy of predictions or forecasts</li>
                <li>Profitability of any strategies derived from our tools</li>
                <li>Continuous availability of services</li>
                <li>Real-time data accuracy (data may be delayed or contain errors)</li>
              </ul>

              <h3 className="text-lg font-semibold mb-3 font-doodle-fun text-gray-700">5.3 Your Responsibility</h3>
              <p className="mb-4 leading-relaxed">
                You are solely responsible for:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>Your investment and trading decisions</li>
                <li>Conducting your own research (DYOR)</li>
                <li>Understanding the risks involved in cryptocurrency trading</li>
                <li>Complying with applicable laws and regulations in your jurisdiction</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 font-doodle text-gray-800">6. Prohibited Uses</h2>
              <p className="mb-4 leading-relaxed">You agree not to:</p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>Use our service for any illegal or unauthorized purpose</li>
                <li>Attempt to reverse engineer, hack, or disrupt our platform</li>
                <li>Share, sell, or transfer your NFT access without proper ownership transfer</li>
                <li>Use automated tools to excessively query our APIs</li>
                <li>Manipulate or attempt to manipulate our AI models</li>
                <li>Distribute or republish our proprietary tools or data without permission</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 font-doodle text-gray-800">7. Intellectual Property</h2>
              <p className="mb-4 leading-relaxed">
                DoodleVerse and its AI tools, algorithms, design, and content are protected by intellectual property laws. You are granted a limited, non-exclusive, non-transferable license to use our platform for personal, non-commercial purposes only.
              </p>
              <p className="mb-4 leading-relaxed">
                The DoodleVerse name, logo, and all related marks are our trademarks. You may not use our intellectual property without explicit written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 font-doodle text-gray-800">8. Disclaimers and Risk Warnings</h2>
              
              <h3 className="text-lg font-semibold mb-3 font-doodle-fun text-gray-700">8.1 Financial Risks</h3>
              <div className="bg-red-50 p-4 rounded-lg doodle-border border-red-200 mb-4">
                <p className="font-semibold text-red-800 mb-2">⚠️ IMPORTANT RISK WARNING:</p>
                <p className="text-red-700 leading-relaxed">
                  Cryptocurrency trading involves substantial risk of loss. Past performance does not guarantee future results. You may lose some or all of your invested capital. Never invest more than you can afford to lose.
                </p>
              </div>

              <h3 className="text-lg font-semibold mb-3 font-doodle-fun text-gray-700">8.2 AI Limitations</h3>
              <p className="mb-4 leading-relaxed">
                Our AI models have limitations and may:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>Produce incorrect predictions or analyses</li>
                <li>Be affected by market volatility and black swan events</li>
                <li>Require periodic retraining and updates</li>
                <li>Not account for all market factors or external events</li>
              </ul>

              <h3 className="text-lg font-semibold mb-3 font-doodle-fun text-gray-700">8.3 Service Availability</h3>
              <p className="mb-4 leading-relaxed">
                We strive for 24/7 availability but cannot guarantee uninterrupted service. Maintenance, updates, or technical issues may cause temporary downtime.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 font-doodle text-gray-800">9. Limitation of Liability</h2>
              <p className="mb-4 leading-relaxed">
                To the maximum extent permitted by law, DoodleVerse and its team members shall not be liable for any:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>Direct, indirect, incidental, or consequential damages</li>
                <li>Loss of profits, revenue, or data</li>
                <li>Trading losses or investment decisions based on our tools</li>
                <li>Interruption of service or data breaches</li>
                <li>Third-party actions or services</li>
              </ul>
              <p className="mb-4 leading-relaxed">
                Your use of our platform is at your own risk. We provide the service "as is" without warranties of any kind.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 font-doodle text-gray-800">10. Indemnification</h2>
              <p className="mb-4 leading-relaxed">
                You agree to indemnify and hold harmless DoodleVerse, its team members, and affiliates from any claims, damages, or expenses arising from:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>Your use of our platform</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any third-party rights</li>
                <li>Your trading or investment activities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 font-doodle text-gray-800">11. Privacy and Data</h2>
              <p className="mb-4 leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information. By using our service, you consent to our privacy practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 font-doodle text-gray-800">12. Modifications to Service and Terms</h2>
              <p className="mb-4 leading-relaxed">
                We reserve the right to:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>Modify, suspend, or discontinue any part of our service</li>
                <li>Update these Terms with reasonable notice</li>
                <li>Change our fee structure (with advance notice to NFT holders)</li>
                <li>Add or remove features as we develop the platform</li>
              </ul>
              <p className="mb-4 leading-relaxed">
                Significant changes will be communicated through our platform or community channels. Continued use after changes constitutes acceptance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 font-doodle text-gray-800">13. Termination</h2>
              <p className="mb-4 leading-relaxed">
                You may stop using our service at any time by disconnecting your wallet. We may terminate or suspend access for violations of these Terms, illegal activity, or other reasonable causes.
              </p>
              <p className="mb-4 leading-relaxed">
                Upon termination, your right to use the platform ceases, but these Terms remain in effect for any prior use.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 font-doodle text-gray-800">14. Governing Law and Disputes</h2>
              <p className="mb-4 leading-relaxed">
                These Terms are governed by and construed in accordance with applicable laws. Any disputes should first be addressed through good-faith communication with our team.
              </p>
              <p className="mb-4 leading-relaxed">
                For formal disputes, parties agree to attempt resolution through mediation before pursuing litigation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 font-doodle text-gray-800">15. Severability</h2>
              <p className="mb-4 leading-relaxed">
                If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 font-doodle text-gray-800">16. Contact Information</h2>
              <p className="mb-4 leading-relaxed">
                If you have questions about these Terms or need support, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg doodle-border">
                <p className="mb-2"><strong>Email:</strong> support@doodleverse.io</p>
                <p className="mb-2"><strong>Discord:</strong> Join our community server</p>
                <p className="mb-2"><strong>Legal:</strong> legal@doodleverse.io</p>
                <p><strong>Response time:</strong> We aim to respond within 72 hours</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 font-doodle text-gray-800">17. Acknowledgment</h2>
              <p className="mb-4 leading-relaxed">
                By using DoodleVerse, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. You also acknowledge that you understand the risks associated with cryptocurrency trading and that you are using our tools at your own discretion and risk.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService; 