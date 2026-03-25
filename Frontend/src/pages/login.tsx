import { type ChangeEvent, type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthScaffold, { AppleIcon, GoogleIcon } from '../components/AuthScaffold'

type LoginForm = {
  email: string
  password: string
  rememberMe: boolean
}

const initialForm: LoginForm = {
  email: '',
  password: '',
  rememberMe: false,
}

const trustSignals = [
  { label: 'Secure access', value: 'Encrypted' },
  { label: 'Study plan', value: 'Synced daily' },
  { label: 'Progress', value: 'Real-time' },
]

function MailIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path
        d="M4.75 7.25A1.75 1.75 0 0 1 6.5 5.5h11a1.75 1.75 0 0 1 1.75 1.75v9.5a1.75 1.75 0 0 1-1.75 1.75h-11a1.75 1.75 0 0 1-1.75-1.75v-9.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m6 8 6 4.75L18 8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <rect
        height="8.5"
        rx="1.8"
        stroke="currentColor"
        strokeWidth="1.8"
        width="11.5"
        x="6.25"
        y="10.25"
      />
      <path
        d="M8.75 10.25V8.5a3.25 3.25 0 1 1 6.5 0v1.75"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="14.5" fill="currentColor" r="1.1" />
    </svg>
  )
}

function ArrowUpRightIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
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

function LoginPage() {
  const [form, setForm] = useState(initialForm)
  const navigate = useNavigate()

  const handleChange =
    (field: keyof LoginForm) => (event: ChangeEvent<HTMLInputElement>) => {
      const value = field === 'rememberMe' ? event.target.checked : event.target.value

      setForm((current) => ({
        ...current,
        [field]: value,
      }))
    }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate('/about-yourself')
  }

  return (
    <AuthScaffold
      description="Access your personalised study workspace, resume your plan, and keep your SAT progress moving."
      eyebrow="Sign in to"
      footer={
        <p className="text-center text-sm text-slate-500">
          Don&apos;t have an account yet?{' '}
          <Link className="font-semibold text-slate-950 transition hover:text-[#3158f5]" to="/signup">
            Create one
          </Link>
        </p>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-3 rounded-[1.45rem] border border-slate-200/75 bg-slate-50/70 p-3 sm:grid-cols-3">
          {trustSignals.map(({ label, value }) => (
            <div
              className="rounded-[1.1rem] bg-white px-3 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
              key={label}
            >
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                {label}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700" htmlFor="email">
              Email address
            </label>
            <div className="group flex h-14 items-center gap-3 rounded-[1rem] border border-slate-200/80 bg-white px-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)] transition focus-within:border-[#3158f5]/35 focus-within:shadow-[0_12px_30px_rgba(49,88,245,0.10)]">
              <span className="text-slate-400 transition group-focus-within:text-[#3158f5]">
                <MailIcon />
              </span>
              <input
                id="email"
                className="h-full w-full border-none bg-transparent text-[15px] text-slate-900 outline-none placeholder:text-slate-300"
                onChange={handleChange('email')}
                placeholder="you@example.com"
                required
                type="email"
                value={form.email}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700" htmlFor="password">
              Password
            </label>
            <div className="group flex h-14 items-center gap-3 rounded-[1rem] border border-slate-200/80 bg-white px-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)] transition focus-within:border-[#3158f5]/35 focus-within:shadow-[0_12px_30px_rgba(49,88,245,0.10)]">
              <span className="text-slate-400 transition group-focus-within:text-[#3158f5]">
                <LockIcon />
              </span>
              <input
                id="password"
                className="h-full w-full border-none bg-transparent text-[15px] tracking-[0.02em] text-slate-900 outline-none placeholder:text-slate-300"
                onChange={handleChange('password')}
                placeholder="Enter your password"
                required
                type="password"
                value={form.password}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 text-sm max-[430px]:flex-col max-[430px]:items-start">
          <label className="flex items-center gap-3 text-slate-600">
            <span className="relative flex h-5 w-5 items-center justify-center">
              <input
                checked={form.rememberMe}
                className="peer h-5 w-5 appearance-none rounded-[0.45rem] border border-slate-300 bg-white transition checked:border-[#3158f5] checked:bg-[#3158f5]"
                onChange={handleChange('rememberMe')}
                type="checkbox"
              />
              <span className="pointer-events-none absolute text-[0.7rem] font-bold text-white opacity-0 transition peer-checked:opacity-100">
                &#10003;
              </span>
            </span>
            <span>Remember me on this device</span>
          </label>

          <a
            className="font-medium text-slate-500 underline decoration-slate-300 underline-offset-4 transition hover:text-slate-900"
            href="#forgot-password"
          >
            Forgot password?
          </a>
        </div>

        <button
          className="flex h-14 w-full items-center justify-center gap-2 rounded-[1rem] bg-[linear-gradient(135deg,#3158f5_0%,#2038c9_100%)] text-sm font-semibold text-white shadow-[0_18px_34px_rgba(49,88,245,0.26)] transition hover:translate-y-[-1px] hover:shadow-[0_22px_38px_rgba(49,88,245,0.32)] focus:outline-none focus:ring-2 focus:ring-[#3158f5]/25"
          type="submit"
        >
          Enter your workspace
          <ArrowUpRightIcon />
        </button>

        <div className="relative py-1">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200/80" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            className="flex h-[3.25rem] items-center justify-center gap-2 rounded-[1rem] border border-slate-200/80 bg-white px-4 text-sm font-semibold text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.04)] transition hover:border-slate-300 hover:bg-slate-50"
            type="button"
          >
            <GoogleIcon />
            Google
          </button>
          <button
            className="flex h-[3.25rem] items-center justify-center gap-2 rounded-[1rem] border border-slate-200/80 bg-white px-4 text-sm font-semibold text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.04)] transition hover:border-slate-300 hover:bg-slate-50"
            type="button"
          >
            <AppleIcon />
            Apple
          </button>
        </div>

        <div className="rounded-[1.35rem] border border-[#dbe4ff] bg-[linear-gradient(180deg,#f7f9ff_0%,#eef3ff_100%)] p-4">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#3158f5]">
            Student note
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Your onboarding answers, study plan, and dashboard analytics stay connected once you sign in.
          </p>
        </div>
      </form>
    </AuthScaffold>
  )
}

export default LoginPage
