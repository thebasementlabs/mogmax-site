export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 px-6 py-20 max-w-[640px] mx-auto w-full">
        <a href="/" className="text-lg font-bold tracking-tight mb-12 block">
          Mog<span className="text-accent">Maxx</span>
        </a>

        <h1 className="font-heading italic text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-secondary mb-10">Effective Date: February 15, 2026</p>

        <p className="text-secondary leading-relaxed mb-10">
          Basement Laboratories ("we", "us", or "our") operates the Bulk or Cut mobile application (the "App"). This Privacy Policy explains what information we collect, how we use it, and your choices regarding your data.
        </p>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>

          <h3 className="font-medium mb-2">1.1 Information You Provide</h3>
          <p className="text-secondary leading-relaxed mb-2">During onboarding and use of the App, you may provide:</p>
          <ul className="text-secondary leading-relaxed list-disc list-inside space-y-1 mb-6">
            <li><strong>Body metrics</strong> — gender, date of birth, height, and weight</li>
            <li><strong>Fitness goals</strong> — whether you want to lose fat or build muscle, and desired transformation magnitude</li>
            <li><strong>Photos</strong> — body photos you upload for AI transformation previews</li>
            <li><strong>Workout data</strong> — exercises, sets, reps, weight, and session history</li>
            <li><strong>Preferences</strong> — unit system (imperial/metric), notification preferences</li>
          </ul>

          <h3 className="font-medium mb-2">1.2 Information Collected Automatically</h3>
          <ul className="text-secondary leading-relaxed list-disc list-inside space-y-1 mb-6">
            <li><strong>Usage analytics</strong> — screens viewed, features used, button taps, and onboarding progress (via Amplitude)</li>
            <li><strong>Attribution data</strong> — how you discovered the App, such as ad campaign or referral source (via Singular)</li>
            <li><strong>Device information</strong> — device model, operating system version, and app version</li>
            <li><strong>Purchase data</strong> — subscription status, transaction identifiers, and purchase timestamps (processed by Apple)</li>
          </ul>

          <h3 className="font-medium mb-2">1.3 Information We Do Not Collect</h3>
          <ul className="text-secondary leading-relaxed list-disc list-inside space-y-1">
            <li>We do not collect your name, email address, phone number, or physical address</li>
            <li>We do not require you to create an account</li>
            <li>We do not collect location data</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-secondary text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 pr-4 font-medium text-white">Data</th>
                  <th className="text-left py-2 font-medium text-white">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr><td className="py-2 pr-4">Body metrics & goals</td><td className="py-2">Personalize your AI transformation preview and workout plans</td></tr>
                <tr><td className="py-2 pr-4">Photos</td><td className="py-2">Generate AI-powered body transformation previews</td></tr>
                <tr><td className="py-2 pr-4">Workout data</td><td className="py-2">Track your exercise history and progress — stored entirely on your device</td></tr>
                <tr><td className="py-2 pr-4">Usage analytics</td><td className="py-2">Improve the App, understand feature usage, and fix bugs</td></tr>
                <tr><td className="py-2 pr-4">Attribution data</td><td className="py-2">Measure advertising effectiveness</td></tr>
                <tr><td className="py-2 pr-4">Purchase data</td><td className="py-2">Manage your subscription and verify purchase status</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">3. Photo Processing</h2>
          <p className="text-secondary leading-relaxed mb-3">
            When you use the AI transformation feature, your photo is sent to Google's Gemini API to generate a transformation preview image. Specifically:
          </p>
          <ul className="text-secondary leading-relaxed list-disc list-inside space-y-1">
            <li>Your photo is transmitted securely (via HTTPS) to Google's servers for processing</li>
            <li>Google processes the image to generate the transformation and returns the result</li>
            <li>We do not store your photos on our own servers — they are stored only on your device</li>
            <li>Google's use of data sent to the Gemini API is governed by{' '}
              <a href="https://policies.google.com/privacy" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">Google's Privacy Policy</a>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">4. Face and Photo Data</h2>
          <p className="text-secondary leading-relaxed mb-3">
            Our app allows you to submit photos of yourself for body transformation visualization and appearance analysis. These photos may contain your face.
          </p>
          <ul className="text-secondary leading-relaxed list-disc list-inside space-y-2">
            <li><strong>Collection:</strong> We collect only the photos you voluntarily provide within the app. We do not use facial recognition, Face ID, or biometric identification technology.</li>
            <li><strong>Use:</strong> Your photos are sent to Google's Gemini API to generate transformation images or appearance analysis scores. No biometric identifiers or facial geometry data is extracted.</li>
            <li><strong>Third-Party Sharing:</strong> Photos are transmitted to Google's Gemini API for processing only. We do not sell, share, or otherwise distribute your photos to any other third party.</li>
            <li><strong>Storage:</strong> Photos are stored locally on your device only. We do not store your photos on any server.</li>
            <li><strong>Retention:</strong> Photos remain on your device until you delete them from the app or uninstall the app. Google does not retain API input data after processing.</li>
            <li><strong>Deletion:</strong> You can delete any photo or result from the app's history at any time.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">5. Third-Party Services</h2>
          <p className="text-secondary leading-relaxed mb-3">
            The App uses the following third-party services that may collect data:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-secondary text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 pr-4 font-medium text-white">Service</th>
                  <th className="text-left py-2 pr-4 font-medium text-white">Purpose</th>
                  <th className="text-left py-2 font-medium text-white">Privacy Policy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="py-2 pr-4">Google Gemini API</td>
                  <td className="py-2 pr-4">AI transformation image generation</td>
                  <td className="py-2"><a href="https://policies.google.com/privacy" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">Link</a></td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Amplitude</td>
                  <td className="py-2 pr-4">Product analytics</td>
                  <td className="py-2"><a href="https://amplitude.com/privacy" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">Link</a></td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Singular</td>
                  <td className="py-2 pr-4">Install attribution & ad measurement</td>
                  <td className="py-2"><a href="https://www.singular.net/privacy-policy/" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">Link</a></td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Apple (App Store, StoreKit)</td>
                  <td className="py-2 pr-4">In-app purchases & subscriptions</td>
                  <td className="py-2"><a href="https://www.apple.com/legal/privacy/" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">Link</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">6. Data Storage & Security</h2>
          <ul className="text-secondary leading-relaxed list-disc list-inside space-y-2">
            <li><strong>On-device storage:</strong> Workout data, preferences, and transformation history are stored locally on your device using SQLite and are never transmitted to our servers.</li>
            <li><strong>No cloud accounts:</strong> The App does not use user accounts, cloud sync, or remote databases. Your workout data exists only on your device.</li>
            <li><strong>Encryption in transit:</strong> All data transmitted to third-party services (Google Gemini, Amplitude, Singular) is encrypted using HTTPS/TLS.</li>
            <li><strong>Data loss:</strong> Because data is stored locally, uninstalling the App will permanently delete your workout history and transformation data.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">7. App Tracking Transparency</h2>
          <p className="text-secondary leading-relaxed">
            The App requests your permission under Apple's App Tracking Transparency framework before collecting any identifier used for ad tracking. You can change this at any time in your device's Settings &gt; Privacy &gt; Tracking.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">8. Device Permissions</h2>
          <p className="text-secondary leading-relaxed mb-3">The App may request the following permissions:</p>
          <ul className="text-secondary leading-relaxed list-disc list-inside space-y-1 mb-3">
            <li><strong>Camera</strong> — to take a photo for AI transformation</li>
            <li><strong>Photo Library</strong> — to select a photo for AI transformation</li>
            <li><strong>Notifications</strong> — to send workout reminders (optional)</li>
            <li><strong>App Tracking Transparency</strong> — for attribution measurement (optional)</li>
          </ul>
          <p className="text-secondary leading-relaxed">
            All permissions are optional. You can revoke them at any time in your device's Settings.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">9. Children's Privacy</h2>
          <p className="text-secondary leading-relaxed">
            The App is not intended for children under 13 (or the applicable age of digital consent in your jurisdiction). We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us and we will delete it.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">10. Data Retention</h2>
          <ul className="text-secondary leading-relaxed list-disc list-inside space-y-1">
            <li><strong>On-device data</strong> is retained until you uninstall the App or clear App data.</li>
            <li><strong>Analytics data</strong> (Amplitude, Singular) is retained according to each provider's data retention policies.</li>
            <li><strong>Photos sent for AI processing</strong> are not retained by us. Google's retention of data sent to the Gemini API is governed by their terms of service.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">11. Your Rights & Choices</h2>
          <p className="text-secondary leading-relaxed mb-3">
            Depending on your jurisdiction (including under CCPA, GDPR, and similar laws), you may have the right to:
          </p>
          <ul className="text-secondary leading-relaxed list-disc list-inside space-y-1 mb-3">
            <li><strong>Access</strong> your personal data</li>
            <li><strong>Delete</strong> your data — you can delete your workout and transformation data by uninstalling the App. For analytics data deletion, contact us.</li>
            <li><strong>Opt out of tracking</strong> — decline the App Tracking Transparency prompt or disable tracking in device Settings</li>
            <li><strong>Opt out of analytics</strong> — contact us to request removal of your analytics data</li>
          </ul>
          <p className="text-secondary leading-relaxed">We do not sell your personal information.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">12. Changes to This Policy</h2>
          <p className="text-secondary leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of material changes by updating the "Effective Date" at the top of this page. Continued use of the App after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">13. Contact Us</h2>
          <p className="text-secondary leading-relaxed">
            If you have questions or concerns about this Privacy Policy, contact us at:
          </p>
          <p className="text-secondary leading-relaxed mt-2">
            Basement Laboratories<br />
            Email:{' '}
            <a href="mailto:info@basementlaboratories.com" className="text-accent hover:underline">
              info@basementlaboratories.com
            </a>
          </p>
        </section>
      </main>

      <footer className="p-6 flex justify-center gap-6">
        <a href="/support" className="text-[13px] text-secondary/60 hover:text-secondary transition-colors">Support</a>
        <a href="https://basementlaboratories.com/terms.html" className="text-[13px] text-secondary/60 hover:text-secondary transition-colors">Terms</a>
        <a href="mailto:jacked@basementlaboratories.com" className="text-[13px] text-secondary/60 hover:text-secondary transition-colors">Contact</a>
      </footer>
    </div>
  )
}
