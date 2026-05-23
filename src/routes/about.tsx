import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <main className="page-wrap px-4 py-12 space-y-6">
      {/* Intro */}
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <p className="island-kicker mb-2">About</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          Hey, I'm Khôi 🥰
        </h1>
        <p className="m-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          I'm a software developer and musician based in Vietnam. I love writing
          code, building things that matter, and making music with open-source
          tools. My GitHub handle is{' '}
          <a
            href="https://github.com/TaQuangKhoi"
            target="_blank"
            rel="noreferrer"
          >
            TaQuangKhoi
          </a>
          , but online I'm often known as <strong>Keios Starqua</strong>.
        </p>
      </section>

      {/* Education */}
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <p className="island-kicker mb-2">Education</p>
        <h2 className="display-title mb-3 text-2xl font-bold text-[var(--sea-ink)]">
          Ba Ria Vung Tau University
        </h2>
        <p className="m-0 text-base leading-8 text-[var(--sea-ink-soft)]">
          Graduate in{' '}
          <span className="font-semibold text-[var(--sea-ink)]">
            Mobile &amp; Game Development
          </span>
          . This is where I got my foundation in mobile development with Android
          and Flutter, and caught the programming bug for good.
        </p>
      </section>

      {/* Current Focus */}
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <p className="island-kicker mb-4">What I'm Up To</p>
        <ul className="m-0 space-y-3 pl-0 list-none text-base text-[var(--sea-ink-soft)]">
          <li className="flex gap-3">
            <span className="flex-shrink-0 text-xl">🤖</span>
            <span>
              Building <strong className="text-[var(--sea-ink)]">AI agents</strong> — automating tasks
              and exploring how intelligent systems can work for people.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 text-xl">⚛️</span>
            <span>
              Exploring{' '}
              <strong className="text-[var(--sea-ink)]">quantum programming</strong> as a long-term
              curiosity project.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 text-xl">📝</span>
            <span>
              Using{' '}
              <a href="https://www.remnote.com/" target="_blank" rel="noreferrer">
                RemNote
              </a>{' '}
              for learning and knowledge management — I'm also a community
              moderator there.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 text-xl">🎵</span>
            <span>
              Making music with{' '}
              <strong className="text-[var(--sea-ink)]">Ardour</strong>, the
              open-source digital audio workstation.
            </span>
          </li>
        </ul>
      </section>

      {/* Open Source */}
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <p className="island-kicker mb-4">Open Source</p>
        <p className="mb-4 text-base text-[var(--sea-ink-soft)]">
          I believe in open source and try to give back where I can.
        </p>
        <div className="space-y-3">
          <a
            href="https://github.com/web-scrobbler/web-scrobbler"
            target="_blank"
            rel="noreferrer"
            className="island-shell feature-card flex items-center gap-4 rounded-xl p-4 no-underline"
          >
            <span className="text-2xl">🎧</span>
            <div>
              <p className="m-0 font-semibold text-[var(--sea-ink)]">
                Web Scrobbler
              </p>
              <p className="m-0 text-sm text-[var(--sea-ink-soft)]">
                Contributing to the browser extension that scrobbles music to
                Last.fm and other services.
              </p>
            </div>
          </a>
          <a
            href="https://github.com/TaQuangKhoi/vina-doctor"
            target="_blank"
            rel="noreferrer"
            className="island-shell feature-card flex items-center gap-4 rounded-xl p-4 no-underline"
          >
            <span className="text-2xl">🏥</span>
            <div>
              <p className="m-0 font-semibold text-[var(--sea-ink)]">
                Vina Doctor
              </p>
              <p className="m-0 text-sm text-[var(--sea-ink-soft)]">
                AI-powered Vietnamese medical assistant — built for Qwen AI
                Build Day.
              </p>
            </div>
          </a>
          <a
            href="https://github.com/TaQuangKhoi/Napkin-Collect-Android"
            target="_blank"
            rel="noreferrer"
            className="island-shell feature-card flex items-center gap-4 rounded-xl p-4 no-underline"
          >
            <span className="text-2xl">📒</span>
            <div>
              <p className="m-0 font-semibold text-[var(--sea-ink)]">
                Napkin-Collect-Android
              </p>
              <p className="m-0 text-sm text-[var(--sea-ink-soft)]">
                Android app to send thoughts directly to napkin.one. 12 stars on
                GitHub.
              </p>
            </div>
          </a>
        </div>
      </section>

      {/* Connect */}
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <p className="island-kicker mb-4">Connect</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              label: 'GitHub',
              href: 'https://github.com/TaQuangKhoi',
              desc: '225 repos, 3.7k stars',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/taquangkhoi/',
              desc: 'Professional profile',
            },
            {
              label: 'X / Twitter',
              href: 'https://x.com/TaLaTaQuangKhoi',
              desc: '@TaLaTaQuangKhoi',
            },
            {
              label: 'Ko-fi',
              href: 'https://ko-fi.com/taquangkhoi',
              desc: 'Buy me a coffee ☕',
            },
            {
              label: 'ORCID',
              href: 'https://orcid.org/0000-0003-2096-7326',
              desc: 'Research identity',
            },
            {
              label: 'Facebook',
              href: 'https://www.facebook.com/keios.starqua/',
              desc: 'keios.starqua',
            },
          ].map(({ label, href, desc }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="island-shell feature-card flex items-center justify-between rounded-xl px-4 py-3 no-underline"
            >
              <span className="font-semibold text-[var(--sea-ink)]">{label}</span>
              <span className="text-sm text-[var(--sea-ink-soft)]">{desc}</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}
