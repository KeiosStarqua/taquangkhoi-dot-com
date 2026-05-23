import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

const skills = {
  languages: ['JavaScript', 'Java', 'Kotlin', 'Python', 'C#', 'Groovy', 'Rust'],
  frontend: ['HTML5', 'CSS3', 'React'],
  backend: ['NestJS'],
  mobile: ['Android', 'Flutter'],
}

function SkillBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[rgba(50,143,151,0.25)] bg-[rgba(79,184,178,0.1)] px-3 py-1 text-xs font-semibold text-[var(--lagoon-deep)]">
      {label}
    </span>
  )
}

function Home() {
  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      {/* Hero */}
      <section className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.32),transparent_66%)]" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(47,106,74,0.18),transparent_66%)]" />

        <p className="island-kicker mb-3">Software Developer &amp; Musician · Vietnam</p>
        <h1 className="display-title mb-5 max-w-3xl text-4xl leading-[1.02] font-bold tracking-tight text-[var(--sea-ink)] sm:text-6xl">
          Tạ Quang Khôi
        </h1>
        <p className="mb-2 max-w-2xl text-base text-[var(--sea-ink-soft)] sm:text-lg">
          coding and loving myself 🥰
        </p>
        <p className="mb-8 max-w-2xl text-base text-[var(--sea-ink-soft)] sm:text-lg">
          I build software at{' '}
          <a
            href="https://github.com/TRUE-TECH"
            target="_blank"
            rel="noreferrer"
          >
            @TRUE-TECH
          </a>
          , craft AI agents, and make music with Ardour. Currently exploring
          quantum programming on the side.
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href="https://github.com/TaQuangKhoi"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-5 py-2.5 text-sm font-semibold text-[var(--lagoon-deep)] no-underline transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.24)]"
          >
            GitHub Profile
          </a>
          <a
            href="/about"
            className="rounded-full border border-[rgba(23,58,64,0.2)] bg-white/50 px-5 py-2.5 text-sm font-semibold text-[var(--sea-ink)] no-underline transition hover:-translate-y-0.5 hover:border-[rgba(23,58,64,0.35)]"
          >
            About Me
          </a>
          <a
            href="https://ko-fi.com/taquangkhoi"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[rgba(23,58,64,0.2)] bg-white/50 px-5 py-2.5 text-sm font-semibold text-[var(--sea-ink)] no-underline transition hover:-translate-y-0.5 hover:border-[rgba(23,58,64,0.35)]"
          >
            ☕ Buy me a coffee
          </a>
        </div>
      </section>

      {/* Status */}
      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            icon: '🤖',
            title: 'AI Agents',
            desc: 'Currently building AI agents and exploring how they can automate complex workflows.',
          },
          {
            icon: '⚛️',
            title: 'Quantum Programming',
            desc: 'Exploring quantum computing concepts and their potential applications.',
          },
          {
            icon: '🎵',
            title: 'Music with Ardour',
            desc: 'Making music as a creative outlet using the open-source Ardour DAW.',
          },
        ].map(({ icon, title, desc }, index) => (
          <article
            key={title}
            className="island-shell feature-card rise-in rounded-2xl p-5"
            style={{ animationDelay: `${index * 90 + 80}ms` }}
          >
            <div className="mb-2 text-2xl">{icon}</div>
            <h2 className="mb-2 text-base font-semibold text-[var(--sea-ink)]">
              {title}
            </h2>
            <p className="m-0 text-sm text-[var(--sea-ink-soft)]">{desc}</p>
          </article>
        ))}
      </section>

      {/* Skills */}
      <section className="island-shell mt-8 rounded-2xl p-6 sm:p-8">
        <p className="island-kicker mb-4">Skills</p>
        <div className="space-y-4">
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--sea-ink-soft)]">
              Languages
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.languages.map((s) => (
                <SkillBadge key={s} label={s} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--sea-ink-soft)]">
              Frontend
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.frontend.map((s) => (
                <SkillBadge key={s} label={s} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--sea-ink-soft)]">
              Backend
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.backend.map((s) => (
                <SkillBadge key={s} label={s} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--sea-ink-soft)]">
              Mobile
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.mobile.map((s) => (
                <SkillBadge key={s} label={s} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="mt-8">
        <p className="island-kicker mb-4">Featured Project</p>
        <a
          href="https://github.com/TaQuangKhoi/vina-doctor"
          target="_blank"
          rel="noreferrer"
          className="island-shell feature-card block rounded-2xl p-6 no-underline sm:p-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="display-title mb-2 text-xl font-bold text-[var(--sea-ink)] sm:text-2xl">
                Vina Doctor 🏥
              </h2>
              <p className="m-0 max-w-xl text-sm leading-6 text-[var(--sea-ink-soft)]">
                An AI-powered Vietnamese medical assistant built for the Qwen AI
                Build Day hackathon. Helps Vietnamese users access health
                information in their native language.
              </p>
            </div>
            <span className="flex-shrink-0 rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.1)] px-3 py-1 text-xs font-semibold text-[var(--lagoon-deep)]">
              AI
            </span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <SkillBadge label="AI" />
            <SkillBadge label="Vietnamese" />
            <SkillBadge label="Medical" />
          </div>
        </a>
      </section>
    </main>
  )
}
