import { Link } from 'react-router-dom'

export default function ExampleContent() {
  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8">
      <div className="max-w-4xl w-full">
        <Link
          to="/creator"
          className="inline-flex items-center gap-1 text-secondary hover:text-primary transition-colors mb-8"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Creator Tools
        </Link>

        <h1 className="font-heading italic text-4xl md:text-5xl font-bold mb-8">Example Content</h1>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/X7BuZPQ4k9U"
              title="Example Content"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  )
}
