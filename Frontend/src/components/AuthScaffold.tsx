import { type ReactNode, useState } from 'react'

type AuthScaffoldProps = {
  eyebrow: string
  description: string
  footer: ReactNode
  children: ReactNode
}

const platformSignals = [
  { label: 'Projected score', value: '982' },
  { label: 'Days left', value: '18' },
  { label: 'Course progress', value: '68%' },
]

const platformHighlights = [
  'Adaptive quizzes and quick practice loops',
  'Weekly study plans shaped around your routine',
  'Performance analytics that keep score growth visible',
]

function AstronomicaGlyph() {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-[1rem] bg-[linear-gradient(145deg,#2847df,#3f72ff)] shadow-[0_16px_36px_rgba(49,88,245,0.28)]">
      <span className="absolute inset-[0.18rem] rounded-[0.82rem] border border-white/18" />
      <span className="font-['Space_Grotesk',sans-serif] text-lg font-bold text-white">A</span>
    </div>
  )
}

function AstronomicaMark() {
  return (
    <div className="flex items-center gap-3">
      <AstronomicaGlyph />
      <div>
        <p className="font-['Space_Grotesk',sans-serif] text-[1.45rem] font-bold tracking-[-0.04em] text-slate-950">
          Astronomica
        </p>
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">SAT Prep Platform</p>
      </div>
    </div>
  )
}

function MenuIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 7h14M5 12h14M5 17h14"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 7l10 10M17 7 7 17"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  )
}

function ArrowUpRightIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <path
        d="M8 16 16 8M10 8h6v6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

export function GoogleIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
      <path
        d="M21.805 12.23c0-.72-.065-1.412-.186-2.077H12v3.93h5.498a4.706 4.706 0 0 1-2.04 3.09v2.565h3.303c1.932-1.778 3.044-4.4 3.044-7.509Z"
        fill="#4285F4"
      />
      <path
        d="M12 22c2.76 0 5.077-.915 6.77-2.477l-3.303-2.565c-.915.612-2.084.973-3.467.973-2.659 0-4.912-1.794-5.719-4.208H2.867v2.646A9.998 9.998 0 0 0 12 22Z"
        fill="#34A853"
      />
      <path
        d="M6.281 13.723A5.989 5.989 0 0 1 5.962 12c0-.6.108-1.182.319-1.723V7.631H2.867A9.99 9.99 0 0 0 2 12c0 1.614.387 3.143.867 4.369l3.414-2.646Z"
        fill="#FBBC04"
      />
      <path
        d="M12 6.07c1.5 0 2.847.516 3.908 1.529l2.932-2.932C17.072 3.024 14.756 2 12 2A9.998 9.998 0 0 0 2.867 7.631l3.414 2.646C7.088 7.864 9.341 6.07 12 6.07Z"
        fill="#EA4335"
      />
    </svg>
  )
}

export function AppleIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5 fill-current" viewBox="0 0 24 24">
      <path d="M15.11 5.23c.7-.84 1.16-2 1.04-3.15-1.02.05-2.24.67-2.96 1.5-.64.75-1.2 1.92-1.06 3.04 1.12.09 2.28-.56 2.98-1.39Z" />
      <path d="M18.56 12.71c.02 2.27 1.99 3.03 2.01 3.04-.02.05-.31 1.05-1.03 2.07-.62.89-1.26 1.77-2.27 1.79-.99.02-1.31-.59-2.44-.59-1.12 0-1.48.57-2.42.61-.98.04-1.73-.98-2.35-1.87-1.27-1.83-2.24-5.17-.94-7.42.64-1.12 1.8-1.82 3.06-1.84.96-.02 1.87.64 2.45.64.58 0 1.68-.79 2.83-.67.48.02 1.84.19 2.72 1.47-.07.05-1.61.94-1.59 2.77Z" />
    </svg>
  )
}

function AuthScaffold({ eyebrow, description, footer, children }: AuthScaffoldProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f3f6fb] text-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(49,88,245,0.12),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(139,227,255,0.16),_transparent_24%),linear-gradient(180deg,_#f4f7fb_0%,_#fbfcfe_100%)]" />
      <div className="absolute inset-0 opacity-[0.22] [background-image:radial-gradient(#ccd6eb_0.75px,transparent_0.75px)] [background-position:0_0] [background-size:18px_18px]" />
      <div className="absolute left-[-6rem] top-14 h-60 w-60 rounded-full bg-white/70 blur-3xl" />
      <div className="absolute bottom-[-7rem] right-[-4rem] h-72 w-72 rounded-full bg-[#dce6ff]/80 blur-3xl" />

      <header className="relative z-20 mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-4 py-5 sm:px-6">
        <AstronomicaMark />

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 lg:flex">
          <a className="transition hover:text-slate-950" href="#help">
            Help
          </a>
          <a className="transition hover:text-slate-950" href="#support">
            Contact Support
          </a>
          <a
            className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/65 px-4 py-2 text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.05)] backdrop-blur-xl transition hover:bg-white/85"
            href="#platform"
          >
            Platform Preview
            <ArrowUpRightIcon />
          </a>
        </nav>

        <button
          aria-controls="mobile-nav"
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="flex h-11 w-11 items-center justify-center rounded-[0.95rem] border border-white/70 bg-white/65 text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.05)] backdrop-blur-xl transition hover:bg-white/85 lg:hidden"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          type="button"
        >
          {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </header>

      {isMobileMenuOpen ? (
        <div className="fixed inset-0 z-30 lg:hidden">
          <button
            aria-label="Close navigation menu"
            className="absolute inset-0 bg-slate-950/10 backdrop-blur-[3px]"
            onClick={() => setIsMobileMenuOpen(false)}
            type="button"
          />
          <nav className="absolute right-4 top-20 flex w-56 flex-col rounded-[1.4rem] border border-white/70 bg-white/90 p-2 text-sm font-medium text-slate-700 shadow-[0_18px_50px_rgba(15,23,42,0.12)] backdrop-blur-2xl">
            <a
              className="rounded-[1rem] px-4 py-3 transition hover:bg-slate-50"
              href="#help"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Help
            </a>
            <a
              className="rounded-[1rem] px-4 py-3 transition hover:bg-slate-50"
              href="#support"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Support
            </a>
            <a
              className="mt-1 rounded-[1rem] bg-[#3158f5] px-4 py-3 text-white"
              href="#platform"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Platform Preview
            </a>
          </nav>
        </div>
      ) : null}

      <main className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col gap-6 px-4 pb-10 pt-2 sm:px-6 lg:min-h-[calc(100vh-92px)] lg:flex-row lg:items-stretch lg:pb-6">
        <section className="hidden lg:flex lg:w-[42%] lg:flex-col lg:justify-between lg:rounded-[2rem] lg:border lg:border-white/65 lg:bg-[linear-gradient(180deg,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0.52)_100%)] lg:p-7 lg:backdrop-blur-2xl lg:shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#3158f5]">
              Study with clarity
            </p>
            <h1 className="mt-4 font-['Space_Grotesk',sans-serif] text-[2.7rem] font-bold leading-[1.02] tracking-[-0.06em] text-slate-950">
              A cleaner path from sign-in to score growth.
            </h1>
            <p className="mt-4 max-w-[28rem] text-base leading-7 text-slate-600">
              Astronomica brings planning, practice, and progress together in one professional workspace built for SAT students who want consistent momentum.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {platformSignals.map(({ label, value }) => (
                <div
                  className="rounded-[1.35rem] border border-white/80 bg-white/72 p-4 shadow-[0_12px_28px_rgba(15,23,42,0.05)]"
                  key={label}
                >
                  <p className="text-[0.72rem] uppercase tracking-[0.16em] text-slate-400">{label}</p>
                  <p className="mt-1 text-[1.35rem] font-semibold text-slate-950">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.6rem] border border-slate-200/70 bg-[#0f172a] p-5 text-white shadow-[0_20px_44px_rgba(15,23,42,0.18)]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Platform Focus</p>
              <div className="mt-4 space-y-3">
                {platformHighlights.map((item) => (
                  <div className="flex items-start gap-3" key={item}>
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#8be3ff]" />
                    <p className="text-sm leading-6 text-white/72">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/75 bg-white/72 p-4 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Today&apos;s snapshot</p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-500">Projected Score</p>
                  <p className="mt-1 text-[1.8rem] font-semibold tracking-[-0.04em] text-slate-950">
                    982<span className="text-slate-300">/1200</span>
                  </p>
                </div>
                <div className="rounded-[1.15rem] bg-[#3158f5] px-4 py-3 text-sm font-semibold text-white">
                  18 days left
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-[31rem] rounded-[2rem] border border-white/70 bg-white/84 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl sm:p-7">
            <div className="mb-7 border-b border-slate-200/70 pb-6">
              <div className="flex items-center gap-3 lg:hidden">
                <AstronomicaGlyph />
                <div>
                  <p className="font-['Space_Grotesk',sans-serif] text-[1.25rem] font-bold tracking-[-0.04em] text-slate-950">
                    Astronomica
                  </p>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">SAT Prep Platform</p>
                </div>
              </div>

              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#3158f5]">
                {eyebrow}
              </p>
              <h2 className="mt-2 font-['Space_Grotesk',sans-serif] text-[2.2rem] font-bold tracking-[-0.06em] text-slate-950">
                Astronomica
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>
            </div>

            {children}

            <div className="mt-7 border-t border-slate-200/70 pt-6">{footer}</div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default AuthScaffold
