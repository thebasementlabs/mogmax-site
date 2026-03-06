export default function Support() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 px-6 py-20 max-w-[640px] mx-auto w-full">
        <a href="/" className="text-lg font-bold tracking-tight mb-12 block">
          Mog<span className="text-accent">Maxx</span>
        </a>

        <h1 className="font-heading italic text-4xl font-bold mb-10">Support</h1>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
          <p className="text-secondary leading-relaxed">
            For any questions, issues, or feedback, email us at{' '}
            <a href="mailto:jacked@basementlaboratories.com" className="text-accent hover:underline">
              jacked@basementlaboratories.com
            </a>
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3">FAQ</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-1">How does MogMaxx work?</h3>
              <p className="text-secondary leading-relaxed">
                MogMaxx uses AI to visualize body transformations, helping you see what your future physique could look like based on your goals.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Is MogMaxx available on Android?</h3>
              <p className="text-secondary leading-relaxed">
                MogMaxx is currently available on iOS only. We're exploring Android support for the future.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">How do I cancel my subscription?</h3>
              <p className="text-secondary leading-relaxed">
                You can manage or cancel your subscription through your Apple ID settings: Settings &gt; Apple ID &gt; Subscriptions.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">How do I request a refund?</h3>
              <p className="text-secondary leading-relaxed">
                Refunds are handled by Apple. Visit{' '}
                <a href="https://reportaproblem.apple.com" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
                  reportaproblem.apple.com
                </a>{' '}
                to request a refund for any in-app purchase.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">My transformation didn't look right</h3>
              <p className="text-secondary leading-relaxed">
                For best results, use a well-lit photo with a clear view of your body. If you're still having issues, reach out to us and we'll help.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">What iOS version do I need?</h3>
              <p className="text-secondary leading-relaxed">
                MogMaxx requires iOS 16.0 or later. The app is compatible with iPhone and iPad.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">How do I delete my account?</h3>
              <p className="text-secondary leading-relaxed">
                To delete your account and all associated data, go to Settings within the app and tap "Delete Account." Alternatively, email us at{' '}
                <a href="mailto:jacked@basementlaboratories.com" className="text-accent hover:underline">
                  jacked@basementlaboratories.com
                </a>{' '}
                with the subject line "Account Deletion Request" and we'll process it within 48 hours.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3">Report a Bug</h2>
          <p className="text-secondary leading-relaxed mb-3">
            Found something broken? Email us at{' '}
            <a href="mailto:jacked@basementlaboratories.com?subject=Bug%20Report" className="text-accent hover:underline">
              jacked@basementlaboratories.com
            </a>{' '}
            with the following info to help us fix it faster:
          </p>
          <ul className="text-secondary leading-relaxed list-disc list-inside space-y-1">
            <li>Your device model and iOS version</li>
            <li>What you were doing when the issue occurred</li>
            <li>A screenshot or screen recording if possible</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3">Response Time</h2>
          <p className="text-secondary leading-relaxed">
            We typically respond within 24 hours.
          </p>
        </section>
      </main>

      <footer className="p-6 flex justify-center gap-6">
        <a href="/privacy" className="text-[13px] text-secondary/60 hover:text-secondary transition-colors">Privacy</a>
        <a href="https://basementlaboratories.com/terms.html" className="text-[13px] text-secondary/60 hover:text-secondary transition-colors">Terms</a>
        <a href="mailto:jacked@basementlaboratories.com" className="text-[13px] text-secondary/60 hover:text-secondary transition-colors">Contact</a>
      </footer>
    </div>
  )
}
