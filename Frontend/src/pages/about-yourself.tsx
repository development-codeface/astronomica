import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type QuestionMode = 'single' | 'multiple'

type Question = {
  id: string
  title: string
  helperText: string
  mode: QuestionMode
  options: string[]
}

const questions: Question[] = [
  {
    id: 'learning-style',
    title: 'How do you learn best?',
    helperText: 'Select one option that best matches your preference.',
    mode: 'single',
    options: [
      'Structured lessons with a clear plan',
      'Short practice sessions every day',
      'Learning by solving real questions',
      'Watching concepts explained visually',
      'Mixing different study styles',
    ],
  },
  {
    id: 'study-rhythm',
    title: 'When do you usually study best?',
    helperText: 'Select one option that best matches your routine.',
    mode: 'single',
    options: [
      'Early mornings before school',
      'Afternoons after classes',
      'Evenings with focused sessions',
      'Weekends with longer study blocks',
      'My schedule changes every week',
    ],
  },
  {
    id: 'challenge-area',
    title: 'What slows your progress the most?',
    helperText: 'Select all the options that apply to you.',
    mode: 'multiple',
    options: [
      'Running out of time during practice',
      'Losing focus while studying',
      'Forgetting formulas and rules',
      'Not knowing what to revise next',
      'Feeling overwhelmed by the syllabus',
    ],
  },
  {
    id: 'support-style',
    title: 'What kind of support helps you most?',
    helperText: 'Select one option that best matches your preference.',
    mode: 'single',
    options: [
      'Daily reminders to stay on track',
      'A weekly study plan to follow',
      'Step-by-step concept explanations',
      'Performance insights after practice',
      'Motivation and accountability',
    ],
  },
  {
    id: 'focus-sections',
    title: 'Which sections need the most attention?',
    helperText: 'Select all the options that apply to you.',
    mode: 'multiple',
    options: [
      'Reading comprehension',
      'Grammar and writing',
      'Algebra and problem solving',
      'Data analysis',
      'Test-taking strategy',
    ],
  },
  {
    id: 'prep-stage',
    title: 'Where are you in your SAT journey?',
    helperText: 'Select one option that best describes you.',
    mode: 'single',
    options: [
      'I am just getting started',
      'I have studied a little already',
      'I am preparing consistently now',
      'I am close to my exam date',
      'I am retaking the test',
    ],
  },
  {
    id: 'main-priority',
    title: 'What is your main priority right now?',
    helperText: 'Select one option that best matches your preference.',
    mode: 'single',
    options: [
      'Improve my SAT score significantly',
      'Reach a specific target score',
      'Study more efficiently',
      'Understand concepts better',
      'Just getting started / exploring',
    ],
  },
  {
    id: 'goal-now',
    title: "What's your goal right now?",
    helperText: 'Select the options that match your preferences.',
    mode: 'multiple',
    options: [
      'Improve my SAT score significantly',
      'Reach a specific target score',
      'Study more efficiently',
      'Understand concepts better',
      'Just getting started / exploring',
    ],
  },
  {
    id: 'study-tools',
    title: 'Which study tools do you want most?',
    helperText: 'Select all the options that apply to you.',
    mode: 'multiple',
    options: [
      'Adaptive quizzes',
      'Revision checklists',
      'Practice test reviews',
      'Smart study reminders',
      'Progress reports',
    ],
  },
  {
    id: 'confidence-level',
    title: 'How confident do you feel today?',
    helperText: 'Select one option that best reflects how you feel.',
    mode: 'single',
    options: [
      'Very confident and motivated',
      'Mostly confident with a few gaps',
      'Somewhat unsure and need direction',
      'Overwhelmed and need a clear plan',
      'Just exploring my options',
    ],
  },
]

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-[linear-gradient(145deg,#2847df,#3f72ff)] shadow-[0_16px_30px_rgba(49,88,245,0.26)]">
        <span className="font-['Space_Grotesk',sans-serif] text-lg font-bold text-white">A</span>
      </div>
      <div>
        <p className="font-['Space_Grotesk',sans-serif] text-[1.3rem] font-bold tracking-[-0.05em] text-slate-950">
          Astronomica
        </p>
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Onboarding Flow</p>
      </div>
    </div>
  )
}

function BackIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path
        d="M11 7 6 12l5 5M7 12h11"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

function ChevronLeftIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path
        d="M14.5 7 9.5 12l5 5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path
        d="m9.5 7 5 5-5 5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  )
}

function SparkIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path
        d="M12 3.75 13.78 8.2l4.45 1.78-4.45 1.79L12 16.2l-1.78-4.43-4.45-1.79 4.45-1.78L12 3.75Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="m18.5 15.5.8 2 .95.4-.95.38-.8 1.97-.8-1.97-.95-.38.95-.4.8-2Z"
        fill="currentColor"
      />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
      <path
        d="m5 12 4.2 4.2L19 6.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />
    </svg>
  )
}

function SelectionIndicator({
  mode,
  selected,
}: {
  mode: QuestionMode
  selected: boolean
}) {
  if (mode === 'single') {
    return (
      <span
        className={cx(
          'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition',
          selected ? 'border-[#3158f5] bg-white' : 'border-slate-300 bg-white',
        )}
      >
        <span
          className={cx(
            'h-2.5 w-2.5 rounded-full transition',
            selected ? 'bg-[#3158f5]' : 'bg-transparent',
          )}
        />
      </span>
    )
  }

  return (
    <span
      className={cx(
        'flex h-5 w-5 shrink-0 items-center justify-center rounded-[0.45rem] border transition',
        selected
          ? 'border-[#3158f5] bg-[#3158f5] text-white'
          : 'border-slate-300 bg-white text-transparent',
      )}
    >
      <CheckIcon />
    </span>
  )
}

function AboutYourselfPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string[]>>({})
  const navigate = useNavigate()

  const currentQuestion = questions[currentQuestionIndex]
  const selectedAnswers = answers[currentQuestion.id] ?? []
  const answeredQuestions = questions.filter((question) => (answers[question.id] ?? []).length > 0).length
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100)
  const isCurrentQuestionComplete = selectedAnswers.length > 0
  const selectedProfileNotes = Object.values(answers).flat().slice(0, 5)

  const handleOptionSelect = (option: string) => {
    setAnswers((current) => {
      const currentSelections = current[currentQuestion.id] ?? []

      if (currentQuestion.mode === 'single') {
        return {
          ...current,
          [currentQuestion.id]: [option],
        }
      }

      return {
        ...current,
        [currentQuestion.id]: currentSelections.includes(option)
          ? currentSelections.filter((item) => item !== option)
          : [...currentSelections, option],
      }
    })
  }

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((index) => Math.max(index - 1, 0))
  }

  const handleNextQuestion = () => {
    if (!isCurrentQuestionComplete) {
      return
    }

    if (currentQuestionIndex === questions.length - 1) {
      navigate('/dashboard')
      return
    }

    setCurrentQuestionIndex((index) => Math.min(index + 1, questions.length - 1))
  }

  const handleLeave = () => {
    if (window.history.length > 1) {
      navigate(-1)
      return
    }

    navigate('/login')
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f3f6fb] text-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(49,88,245,0.10),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(139,227,255,0.14),_transparent_24%),linear-gradient(180deg,_#f4f7fb_0%,_#fbfcfe_100%)]" />
      <div className="absolute inset-0 opacity-[0.2] [background-image:radial-gradient(#d4dcf0_0.7px,transparent_0.7px)] [background-position:0_0] [background-size:18px_18px]" />
      <div className="absolute left-[-5rem] top-24 h-64 w-64 rounded-full bg-white/75 blur-3xl" />
      <div className="absolute bottom-[-6rem] right-[-4rem] h-72 w-72 rounded-full bg-[#dce6ff]/80 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1360px] flex-col px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
        <header className="flex items-center justify-between gap-4">
          <BrandMark />

          <button
            className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm font-medium text-slate-600 shadow-[0_12px_30px_rgba(15,23,42,0.05)] backdrop-blur-xl transition hover:bg-white hover:text-slate-900"
            onClick={handleLeave}
            type="button"
          >
            <BackIcon />
            Back
          </button>
        </header>

        <main className="mt-6 grid flex-1 gap-5 lg:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="flex flex-col gap-5 rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.76)_0%,rgba(255,255,255,0.56)_100%)] p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#eef2ff] px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#3158f5]">
                <SparkIcon />
                Study Profile
              </span>
              <h1 className="mt-4 font-['Space_Grotesk',sans-serif] text-[2rem] font-bold leading-[1.02] tracking-[-0.06em] text-slate-950">
                Build a cleaner SAT dashboard around your routine.
              </h1>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                We use these same study questions to personalise your quick actions, ongoing course view, and daily focus inside Astronomica.
              </p>
            </div>

            <div className="rounded-[1.6rem] bg-[#0f172a] p-5 text-white shadow-[0_20px_40px_rgba(15,23,42,0.16)]">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/42">
                    Progress
                  </p>
                  <p className="mt-2 text-[2.3rem] font-semibold tracking-[-0.05em]">
                    {progressPercent}%
                  </p>
                </div>
                <div className="rounded-[1rem] bg-white/10 px-3 py-2 text-right">
                  <p className="text-xs text-white/48">Answered</p>
                  <p className="mt-1 text-lg font-semibold">
                    {answeredQuestions}/{questions.length}
                  </p>
                </div>
              </div>

              <div className="mt-4 h-2.5 rounded-full bg-white/10">
                <div
                  className="h-2.5 rounded-full bg-[linear-gradient(90deg,#8be3ff_0%,#ffffff_100%)]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200/70 bg-white/76 p-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold text-slate-900">Question track</h2>
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                  {currentQuestionIndex + 1} of {questions.length}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                {questions.map((question, index) => {
                  const state =
                    index === currentQuestionIndex
                      ? 'current'
                      : (answers[question.id] ?? []).length > 0
                        ? 'done'
                        : 'upcoming'

                  return (
                    <div
                      className={cx(
                        'flex items-center gap-3 rounded-[1rem] border px-3 py-3',
                        state === 'current'
                          ? 'border-[#d7ddff] bg-[#f3f6ff]'
                          : state === 'done'
                            ? 'border-emerald-100 bg-emerald-50/70'
                            : 'border-slate-200/70 bg-slate-50/70',
                      )}
                      key={question.id}
                    >
                      <span
                        className={cx(
                          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold',
                          state === 'current'
                            ? 'bg-[#3158f5] text-white'
                            : state === 'done'
                              ? 'bg-emerald-500 text-white'
                              : 'bg-white text-slate-400',
                        )}
                      >
                        {state === 'done' ? <CheckIcon /> : index + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-slate-900">{question.title}</p>
                        <p className="mt-1 text-xs text-slate-500">
                          {state === 'current'
                            ? 'Current step'
                            : state === 'done'
                              ? 'Completed'
                              : 'Upcoming'}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200/70 bg-white/76 p-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold text-slate-900">Selected profile</h2>
                <span className="text-xs font-medium text-slate-400">Live summary</span>
              </div>

              {selectedProfileNotes.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedProfileNotes.map((note) => (
                    <span
                      className="inline-flex rounded-full border border-[#dbe4ff] bg-[#f6f8ff] px-3 py-1.5 text-xs font-medium text-slate-600"
                      key={note}
                    >
                      {note}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm leading-6 text-slate-500">
                  Your answers will appear here as you move through the onboarding questions.
                </p>
              )}
            </div>
          </aside>

          <section className="flex flex-col rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.82)_0%,rgba(255,255,255,0.62)_100%)] p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl sm:p-6 lg:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 pb-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#3158f5]">
                  Personalise your workspace
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Answer each question once and we will use it across the same dashboard content.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className={cx(
                    'flex h-11 w-11 items-center justify-center rounded-[1rem] border transition',
                    currentQuestionIndex === 0
                      ? 'cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900',
                  )}
                  disabled={currentQuestionIndex === 0}
                  onClick={handlePreviousQuestion}
                  type="button"
                >
                  <ChevronLeftIcon />
                </button>
                <button
                  className={cx(
                    'flex h-11 items-center justify-center gap-2 rounded-[1rem] px-4 text-sm font-semibold transition',
                    isCurrentQuestionComplete
                      ? 'bg-[linear-gradient(135deg,#3158f5_0%,#2038c9_100%)] text-white shadow-[0_18px_34px_rgba(49,88,245,0.24)] hover:translate-y-[-1px]'
                      : 'bg-slate-100 text-slate-400',
                  )}
                  disabled={!isCurrentQuestionComplete}
                  onClick={handleNextQuestion}
                  type="button"
                >
                  {currentQuestionIndex === questions.length - 1 ? 'Finish setup' : 'Save and continue'}
                  <ChevronRightIcon />
                </button>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex rounded-full bg-[#eef2ff] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#3158f5]">
                  Question {currentQuestionIndex + 1}
                </span>
                <span className="inline-flex rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-500">
                  {currentQuestion.mode === 'multiple' ? 'Multiple choice' : 'Single choice'}
                </span>
              </div>

              <h2 className="mt-5 max-w-[46rem] font-['Space_Grotesk',sans-serif] text-[2rem] font-bold leading-[1.05] tracking-[-0.06em] text-slate-950 sm:text-[2.4rem]">
                {currentQuestion.title}
              </h2>
              <p className="mt-3 max-w-[40rem] text-sm leading-7 text-slate-500 sm:text-base">
                {currentQuestion.helperText}
              </p>
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedAnswers.includes(option)

                return (
                  <button
                    aria-pressed={isSelected}
                    className={cx(
                      'group flex min-h-[7.25rem] w-full items-start gap-4 rounded-[1.4rem] border px-4 py-4 text-left transition',
                      isSelected
                        ? 'border-[#cfdbff] bg-[linear-gradient(180deg,#f7f9ff_0%,#edf3ff_100%)] shadow-[0_16px_34px_rgba(49,88,245,0.10)]'
                        : 'border-slate-200/80 bg-white/80 hover:border-[#c7d2fe] hover:bg-white',
                    )}
                    key={option}
                    onClick={() => handleOptionSelect(option)}
                    type="button"
                  >
                    <SelectionIndicator mode={currentQuestion.mode} selected={isSelected} />
                    <div>
                      <p className="text-sm font-semibold leading-6 text-slate-900">{option}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {currentQuestion.mode === 'multiple'
                          ? 'Tap to add or remove this preference.'
                          : 'Choose this as your current best match.'}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="mt-8 rounded-[1.5rem] border border-slate-200/75 bg-slate-50/70 p-4 sm:p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Answer status</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {isCurrentQuestionComplete
                      ? `${selectedAnswers.length} option${selectedAnswers.length > 1 ? 's' : ''} selected for this step.`
                      : 'Choose at least one option to continue.'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className={cx(
                      'flex h-11 items-center justify-center gap-2 rounded-[1rem] border px-4 text-sm font-medium transition',
                      currentQuestionIndex === 0
                        ? 'cursor-not-allowed border-slate-100 bg-white text-slate-300'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300',
                    )}
                    disabled={currentQuestionIndex === 0}
                    onClick={handlePreviousQuestion}
                    type="button"
                  >
                    <ChevronLeftIcon />
                    Previous
                  </button>

                  <button
                    className={cx(
                      'flex h-11 items-center justify-center gap-2 rounded-[1rem] px-4 text-sm font-semibold transition',
                      isCurrentQuestionComplete
                        ? 'bg-[linear-gradient(135deg,#3158f5_0%,#2038c9_100%)] text-white shadow-[0_18px_34px_rgba(49,88,245,0.24)] hover:translate-y-[-1px]'
                        : 'bg-slate-200 text-slate-400',
                    )}
                    disabled={!isCurrentQuestionComplete}
                    onClick={handleNextQuestion}
                    type="button"
                  >
                    {currentQuestionIndex === questions.length - 1 ? 'Go to dashboard' : 'Next question'}
                    <ChevronRightIcon />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default AboutYourselfPage
