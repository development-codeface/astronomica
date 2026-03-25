import { type ReactNode } from 'react'

type IconProps = {
  className?: string
}

type NavItem = {
  label: string
  Icon: ({ className }: IconProps) => ReactNode
  active?: boolean
}

type DayItem = {
  day: string
  date: string
  active?: boolean
}

type QuickActionTone = 'amber' | 'sky' | 'violet' | 'slate'

type QuickAction = {
  title: string
  Icon: ({ className }: IconProps) => ReactNode
  badge?: string
  tone: QuickActionTone
}

const navItems: NavItem[] = [
  { label: 'Home', Icon: HomeIcon, active: true },
  { label: 'Learn', Icon: LearnIcon },
  { label: 'Practice', Icon: PracticeIcon },
  { label: 'Progress', Icon: ProgressIcon },
  { label: 'Profile', Icon: ProfileIcon },
]

const dayItems: DayItem[] = [
  { day: 'WED', date: '25' },
  { day: 'THU', date: '26', active: true },
  { day: 'FRI', date: '27' },
  { day: 'SAT', date: '28' },
  { day: 'SUN', date: '29' },
  { day: 'MON', date: '30' },
]

const quickActions: QuickAction[] = [
  { title: 'Weak Topics', Icon: WeakTopicsIcon, badge: '3', tone: 'amber' },
  { title: 'Study Plan', Icon: StudyPlanIcon, tone: 'violet' },
  { title: 'Analytics', Icon: AnalyticsIcon, tone: 'sky' },
  { title: 'Quick Quiz', Icon: QuickQuizIcon, tone: 'slate' },
]

const course = {
  title: 'SAT Practise Mock Test',
  subject: 'PHY',
  chapters: '24 Chapters',
  videos: '128 Videos',
  progress: 68,
}

const imageSources = {
  avatar:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80',
  studyHero:
    'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1400&q=80',
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

function surfaceCard(className?: string) {
  return cx(
    'rounded-[1.9rem] border border-white/70 bg-white/[0.72] shadow-[0_22px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl',
    className,
  )
}

function toneClasses(tone: QuickActionTone) {
  switch (tone) {
    case 'amber':
      return {
        badge: 'bg-[#ff9d00] text-white',
        panel: 'bg-[#fff4e8] text-[#f59d0c]',
      }
    case 'sky':
      return {
        badge: 'bg-[#22c7ff] text-white',
        panel: 'bg-[#eefbff] text-[#06b6d4]',
      }
    case 'slate':
      return {
        badge: 'bg-[#35405d] text-white',
        panel: 'bg-[#f0f4fb] text-[#475569]',
      }
    case 'violet':
    default:
      return {
        badge: 'bg-[#6555f4] text-white',
        panel: 'bg-[#f1efff] text-[#5b46f4]',
      }
  }
}

function AvatarImage({ className }: { className?: string }) {
  return <img alt="Amelia" className={className} loading="lazy" src={imageSources.avatar} />
}

function BellIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M12 4.75a4.25 4.25 0 0 0-4.25 4.25v1.22c0 .71-.24 1.4-.68 1.96l-.82 1.03A1.75 1.75 0 0 0 7.62 16h8.76a1.75 1.75 0 0 0 1.37-2.79l-.82-1.03a3.18 3.18 0 0 1-.68-1.96V9A4.25 4.25 0 0 0 12 4.75Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="M10.25 18a1.75 1.75 0 0 0 3.5 0"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function WeakTopicsIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M6.5 8.5 10 12l4-5 3.5 4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="M17.5 7v4.5H13"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="M6 16.5h12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function StudyPlanIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <rect
        height="12"
        rx="2.4"
        stroke="currentColor"
        strokeWidth="1.8"
        width="12"
        x="6"
        y="6"
      />
      <path
        d="M9 10.25h6M9 13.75h4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function AnalyticsIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M5.75 6.5h12.5A1.75 1.75 0 0 1 20 8.25v7.5a1.75 1.75 0 0 1-1.75 1.75H5.75A1.75 1.75 0 0 1 4 15.75v-7.5A1.75 1.75 0 0 1 5.75 6.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M8.5 14.5 10.75 12l2 1.75L15.5 10"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="M12 17.5v2M8.5 19.5h7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function QuickQuizIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M12 4.75 13.67 8l3.58.51-2.59 2.48.62 3.51L12 12.8l-3.28 1.7.62-3.51-2.59-2.48L10.33 8 12 4.75Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <circle cx="18" cy="18" fill="currentColor" r="1.25" />
    </svg>
  )
}

function HomeIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M4.75 10.25 12 4.75l7.25 5.5v8a1.5 1.5 0 0 1-1.5 1.5h-3.5v-5.25h-4.5v5.25h-3.5a1.5 1.5 0 0 1-1.5-1.5v-8Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function LearnIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M6 6.25A2.25 2.25 0 0 1 8.25 4h8.25A1.5 1.5 0 0 1 18 5.5v12.25A2.25 2.25 0 0 0 15.75 20H8.25A2.25 2.25 0 0 1 6 17.75V6.25Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M8.75 8.5h6.5M8.75 12h6.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function PracticeIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="6.75" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="m16.9 7.1-2.4 2.4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function ProgressIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M5.5 17.5h13"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
      <path
        d="M7 15v-3.5M12 15V9M17 15V7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function ProfileIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="8.25" r="3.25" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M6.5 18.25c1.25-2.42 3.2-3.75 5.5-3.75s4.25 1.33 5.5 3.75"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function ChaptersIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M7 5.5h8.75A1.75 1.75 0 0 1 17.5 7.25v11.25H8.75A1.75 1.75 0 0 1 7 16.75V5.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M7 8.5h10.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function VideosIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <rect
        height="11"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
        width="13"
        x="4.75"
        y="6.5"
      />
      <path
        d="m12 12-2.25 1.5v-3L12 12Zm4.75-2 2.5-1.5v7L16.75 14"
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
      />
    </svg>
  )
}

function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
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

function ScoreRing() {
  const progress = 982 / 1200
  const angle = progress * 360

  return (
    <div
      className="flex h-16 w-16 items-center justify-center rounded-full"
      style={{
        background: `conic-gradient(#c9ff77 0deg ${angle}deg, rgba(255,255,255,0.15) ${angle}deg 360deg)`,
      }}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1e285b] text-xs font-semibold text-white">
        82%
      </div>
    </div>
  )
}

function DesktopSidebar() {
  return (
    <aside className="hidden lg:sticky lg:top-8 lg:flex lg:h-[calc(100vh-4rem)] lg:flex-col lg:rounded-[2rem] lg:border lg:border-white/70 lg:bg-[linear-gradient(180deg,rgba(255,255,255,0.84)_0%,rgba(255,255,255,0.68)_100%)] lg:p-5 lg:shadow-[0_22px_60px_rgba(15,23,42,0.08)] lg:backdrop-blur-2xl">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-[linear-gradient(145deg,#3158f5,#5d46f4)] shadow-[0_18px_30px_rgba(49,88,245,0.24)]">
          <span className="font-['Space_Grotesk',sans-serif] text-xl font-bold text-white">A</span>
        </div>
        <div>
          <p className="font-['Space_Grotesk',sans-serif] text-[1.35rem] font-bold tracking-[-0.05em] text-slate-950">
            Astronomica
          </p>
          <p className="text-sm text-slate-500">SAT dashboard</p>
        </div>
      </div>

      <div className="mt-8">
        <p className="px-3 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
          Navigation
        </p>
        <nav className="mt-3 space-y-2">
          {navItems.map(({ label, Icon, active }) => (
            <button
              className={cx(
                'flex w-full items-center gap-3 rounded-[1.15rem] px-3 py-3 text-left text-sm font-medium transition',
                active
                  ? 'bg-[linear-gradient(135deg,#3158f5_0%,#5d46f4_100%)] text-white shadow-[0_14px_28px_rgba(49,88,245,0.22)]'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900',
              )}
              key={label}
              type="button"
            >
              <span
                className={cx(
                  'flex h-10 w-10 items-center justify-center rounded-[0.95rem]',
                  active ? 'bg-white/16 text-white' : 'bg-white text-slate-500',
                )}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto rounded-[1.6rem] bg-[#0f172a] p-4 text-white shadow-[0_20px_40px_rgba(15,23,42,0.16)]">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/42">
          Current Goal
        </p>
        <p className="mt-3 text-lg font-semibold">Reach 1200 with steady daily practice.</p>
        <div className="mt-4 flex items-center justify-between rounded-[1rem] bg-white/8 px-3 py-3 text-sm">
          <span className="text-white/55">Days left</span>
          <span className="font-semibold">18</span>
        </div>
      </div>
    </aside>
  )
}

function DayStrip() {
  return (
    <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {dayItems.map(({ day, date, active }) => (
        <button
          className={cx(
            'flex min-w-[4.9rem] flex-col items-center justify-center rounded-[1.4rem] border px-4 py-3 text-center transition',
            active
              ? 'border-[#ddd7ff] bg-white text-[#5d46f4] shadow-[0_16px_32px_rgba(93,70,244,0.10)]'
              : 'border-slate-200/80 bg-[#f8f9fc] text-slate-400 hover:border-slate-300 hover:text-slate-700',
          )}
          key={`${day}-${date}`}
          type="button"
        >
          <span className="text-[0.68rem] font-semibold tracking-[0.16em]">{day}</span>
          <span className="mt-1 text-[1.25rem] font-semibold">{date}</span>
        </button>
      ))}
    </div>
  )
}

function TopBar() {
  return (
    <section className={surfaceCard('p-5 sm:p-6 lg:p-7')}>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative shrink-0">
              <AvatarImage className="h-14 w-14 rounded-full object-cover shadow-[0_14px_28px_rgba(230,160,172,0.22)]" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[1.18rem] font-semibold text-slate-950 sm:text-[1.3rem]">
                Morning, Amelia <span className="text-[#5d46f4]">+</span>
              </p>
              <p className="text-sm text-slate-500">Feeling Energetic Today!</p>
            </div>
          </div>

          <button
            className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200/80 bg-white text-slate-600 shadow-[0_12px_26px_rgba(15,23,42,0.04)] transition hover:text-slate-900"
            type="button"
          >
            <BellIcon className="h-5 w-5" />
          </button>
        </div>

        <DayStrip />
      </div>
    </section>
  )
}

function QuickActionsCard() {
  return (
    <div className="order-1 lg:order-2">
      <section className="lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-[1.45rem] font-semibold tracking-[-0.03em] text-slate-950">Quick Actions</h2>
          <button className="text-sm font-medium text-slate-500 transition hover:text-slate-900" type="button">
            Show All
          </button>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-3">
          {quickActions.map(({ title, Icon, badge, tone }) => {
            const styles = toneClasses(tone)

            return (
              <button className="text-center" key={title} type="button">
                <span className="relative mx-auto flex h-[4.55rem] w-[4.55rem] items-center justify-center rounded-full bg-white shadow-[0_10px_22px_rgba(15,23,42,0.04)]">
                  <span className={cx('flex h-10 w-10 items-center justify-center rounded-full', styles.panel)}>
                    <Icon className="h-5 w-5" />
                  </span>
                  {badge ? (
                    <span
                      className={cx(
                        'absolute right-0 top-0 inline-flex min-h-[1.45rem] min-w-[1.45rem] items-center justify-center rounded-full px-1 text-[0.62rem] font-bold',
                        styles.badge,
                      )}
                    >
                      {badge}
                    </span>
                  ) : null}
                </span>
                <span className="mt-3 block text-[0.9rem] font-medium leading-5 text-slate-900">{title}</span>
              </button>
            )
          })}
        </div>
      </section>

      <section className={surfaceCard('hidden p-5 sm:p-6 lg:block lg:p-6')}>
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-[1.35rem] font-semibold tracking-[-0.03em] text-slate-950">Quick Actions</h2>
          <button className="text-sm font-medium text-slate-500 transition hover:text-slate-900" type="button">
            Show All
          </button>
        </div>

        <div className="mt-5 grid grid-cols-4 gap-3">
          {quickActions.map(({ title, Icon, badge, tone }) => {
            const styles = toneClasses(tone)

            return (
              <button
                className="rounded-[1.45rem] border border-slate-200/80 bg-white px-3 py-4 text-center shadow-[0_12px_26px_rgba(15,23,42,0.04)] transition hover:border-slate-300 hover:shadow-[0_16px_30px_rgba(15,23,42,0.06)] lg:min-h-[8.5rem]"
                key={title}
                type="button"
              >
                <span className="relative mx-auto flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-full bg-[#f8f9fc]">
                  <span className={cx('flex h-10 w-10 items-center justify-center rounded-full', styles.panel)}>
                    <Icon className="h-5 w-5" />
                  </span>
                  {badge ? (
                    <span
                      className={cx(
                        'absolute right-0 top-0 inline-flex min-h-[1.5rem] min-w-[1.5rem] items-center justify-center rounded-full px-1.5 text-[0.66rem] font-bold',
                        styles.badge,
                      )}
                    >
                      {badge}
                    </span>
                  ) : null}
                </span>
                <span className="mt-3 block text-[0.92rem] font-semibold leading-5 text-slate-900">
                  {title}
                </span>
              </button>
            )
          })}
        </div>
      </section>
    </div>
  )
}

function HeroScoreCard() {
  return (
    <section className="order-2 relative overflow-hidden rounded-[1.9rem] border border-[#5a46f4]/20 bg-[linear-gradient(135deg,#563ce8_0%,#6a49f4_55%,#764fff_100%)] p-5 text-white shadow-[0_28px_70px_rgba(86,60,232,0.26)] sm:p-6 lg:order-1 lg:p-7">
      <div className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/6">
        <ArrowUpRightIcon className="h-5 w-5" />
      </div>

      <div className="relative flex flex-col gap-5">
        <div>
          <p className="text-[1.25rem] font-semibold tracking-[-0.03em] text-white">Projected Score</p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <ScoreRing />
            <div className="flex items-end gap-1">
              <span className="text-[2.7rem] font-bold leading-none tracking-[-0.06em] sm:text-[3.2rem]">
                982
              </span>
              <span className="pb-1 text-[1.45rem] font-semibold text-white/40 sm:text-[1.9rem]">
                /1200
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          <span className="h-2.5 rounded-full bg-[#2ddf3c]" />
          <span className="h-2.5 rounded-full bg-[#38e645]" />
          <span className="h-2.5 rounded-full bg-[#37d23f]" />
          <span className="h-2.5 rounded-full bg-[#39d05d]" />
          <span className="h-2.5 rounded-full bg-[#4cc8ff]" />
          <span className="h-2.5 rounded-full bg-white/85" />
          <span className="h-2.5 rounded-full bg-white" />
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-medium text-[#2fa84a] shadow-[0_10px_20px_rgba(0,0,0,0.08)]">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2fa84a] text-white">
              +
            </span>
            +87 points this Month
          </span>
          <span className="hidden h-8 w-px bg-white/35 sm:block" />
          <span className="inline-flex items-center gap-2 text-white/90">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/16 bg-white/8">
              18
            </span>
            18d Left
          </span>
        </div>
      </div>
    </section>
  )
}

function CourseCard() {
  return (
    <section className={surfaceCard('p-5 sm:p-6')}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[1.35rem] font-semibold tracking-[-0.03em] text-slate-950">Ongoing Courses</h2>
        <button className="text-sm font-medium text-slate-500 transition hover:text-slate-900" type="button">
          Show All
        </button>
      </div>

      <div className="mt-5 rounded-[1.6rem] border border-slate-200/80 bg-white p-5 shadow-[0_14px_30px_rgba(15,23,42,0.04)]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex h-12 min-w-12 items-center justify-center rounded-full bg-[#2158b4] px-4 text-sm font-bold text-white">
                SAT
              </span>
              <div className="min-w-0">
                <h3 className="truncate text-[1.28rem] font-semibold tracking-[-0.03em] text-slate-950">
                  {course.title}
                </h3>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <ChaptersIcon className="h-4 w-4" />
                    {course.chapters}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <VideosIcon className="h-4 w-4" />
                    {course.videos}
                  </span>
                </div>
              </div>
              <span className="inline-flex h-12 min-w-12 items-center justify-center rounded-full bg-[#ff6b1a] px-4 text-sm font-bold text-white lg:ml-auto">
                {course.subject}
              </span>
            </div>

            <div className="mt-5">
              <div className="h-1.5 rounded-full bg-[#ebe9fb]">
                <div
                  className="h-1.5 rounded-full bg-[linear-gradient(90deg,#5d46f4_0%,#6b54ff_100%)]"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-slate-400">Course progress</span>
                <span className="font-semibold text-[#4aa35c]">{course.progress}%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:w-[16rem]">
            <button
              className="flex h-12 items-center justify-center rounded-full border border-slate-200 bg-[#fbfbfc] text-sm font-medium text-slate-700 transition hover:border-slate-300"
              type="button"
            >
              Details
            </button>
            <button
              className="flex h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#5d46f4_0%,#6b54ff_100%)] text-sm font-semibold text-white shadow-[0_14px_28px_rgba(93,70,244,0.22)] transition hover:opacity-95"
              type="button"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function MobileBottomNav() {
  return (
    <nav className="fixed inset-x-4 bottom-4 z-30 rounded-[1.6rem] border border-white/70 bg-white/[0.72] p-2 shadow-[0_18px_45px_rgba(90,102,164,0.18)] backdrop-blur-2xl lg:hidden">
      <div className="grid grid-cols-5 gap-1">
        {navItems.map(({ label, Icon, active }) => (
          <button
            className={cx(
              'flex flex-col items-center gap-1 rounded-[1rem] px-2 py-2 text-[0.7rem] font-medium transition',
              active
                ? 'bg-[#3158f5] text-white shadow-[0_12px_24px_rgba(49,88,245,0.24)]'
                : 'text-slate-500',
            )}
            key={label}
            type="button"
          >
            <Icon className="h-[1.125rem] w-[1.125rem]" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}

function DashboardPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f3f6fb] text-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(49,88,245,0.10),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(139,227,255,0.14),_transparent_24%),linear-gradient(180deg,_#f4f7fb_0%,_#fbfcfe_100%)]" />
      <div className="absolute inset-0 opacity-[0.18] [background-image:radial-gradient(#d4dcf0_0.7px,transparent_0.7px)] [background-position:0_0] [background-size:18px_18px]" />
      <div className="absolute left-[-5rem] top-24 h-64 w-64 rounded-full bg-white/75 blur-3xl" />
      <div className="absolute bottom-[-6rem] right-[-4rem] h-72 w-72 rounded-full bg-[#dce6ff]/80 blur-3xl" />

      <div className="relative mx-auto max-w-[1420px] px-4 pb-28 pt-4 sm:px-6 lg:px-8 lg:py-8">
        <div className="lg:grid lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-6">
          <DesktopSidebar />

          <main className="space-y-6">
            <TopBar />

            <div className="grid gap-6 lg:grid-cols-[minmax(0,0.88fr)_31rem] xl:grid-cols-[minmax(0,0.92fr)_34rem]">
              <HeroScoreCard />
              <QuickActionsCard />
            </div>

            <CourseCard />
          </main>
        </div>
      </div>

      <MobileBottomNav />
    </div>
  )
}

export default DashboardPage
