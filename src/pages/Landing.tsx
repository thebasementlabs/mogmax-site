export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
<h1 className="text-[clamp(40px,8vw,72px)] font-bold leading-[1.05] tracking-[-0.02em] mb-5 max-w-[600px]" style={{ fontFamily: '"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
          Ascend in <span className="text-accent">90</span> days
        </h1>
        <p className="text-[clamp(16px,2.5vw,20px)] text-secondary mb-12">
          Trusted by 10K+ users
        </p>
        <a
          href="https://apps.apple.com/ca/app/bulkorcut-body-visualizer/id6757873783"
          className="transition-opacity hover:opacity-80"
        >
          <img
            src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83"
            alt="Download on the App Store"
            className="h-[54px] w-auto"
          />
        </a>
      </main>
      <footer className="p-6 flex justify-center gap-6">
        <a href="/privacy" className="text-[13px] text-secondary/60 hover:text-secondary transition-colors">Privacy</a>
        <a href="https://basementlaboratories.com/terms.html" className="text-[13px] text-secondary/60 hover:text-secondary transition-colors">Terms</a>
        <a href="mailto:jacked@basementlaboratories.com" className="text-[13px] text-secondary/60 hover:text-secondary transition-colors">Contact</a>
        <a href="/support" className="text-[13px] text-secondary/60 hover:text-secondary transition-colors">Support</a>
      </footer>
    </div>
  )
}
