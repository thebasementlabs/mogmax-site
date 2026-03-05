import { Link } from 'react-router-dom'

const tools = [
  {
    title: 'NEW (Cleaner) Ratings Template',
    description: 'Simplified rating template with just PSL and Potential scores',
    href: '/creator/clean-ratings-template',
    isNew: true,
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
  },
  {
    title: 'Original Ratings Template',
    description: 'Full rating cards with all metrics: PSL, Potential, Eyes, Midface, and more',
    href: '/creator/ratings-template',
    isNew: false,
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21z" />
      </svg>
    ),
  },
]

export default function CreatorTools() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <h1 className="font-heading italic text-4xl md:text-5xl font-bold mb-12">Creator Tools</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            to={tool.href}
            className="bg-card border border-border rounded-xl p-8 hover:border-accent/50 transition-colors group"
          >
            <div className="w-14 h-14 rounded-xl bg-background border border-border flex items-center justify-center mb-6 text-secondary">
              {tool.icon}
            </div>
            <h2 className="text-xl font-bold mb-2">
              {tool.isNew && <span className="text-accent">NEW </span>}
              {tool.isNew ? '(Cleaner) Ratings Template' : tool.title}
            </h2>
            <p className="text-secondary text-sm">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
