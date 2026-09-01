import Link from "next/link";
import type { ReactNode } from "react";
import { dictionary, t } from "@/content/dictionary";
import {
  focusAreas,
  person,
  researchProjects,
  residency,
  roles,
  awards,
  researchArticleCount,
} from "@/content/profile";
import { sortedArticles } from "@/content/articles";
import { localeHref, type Locale } from "@/lib/i18n";
import { currentPgy } from "@/lib/utils";
import {
  ArrowRightIcon,
  CheckIcon,
  FileTextIcon,
  GlobeIcon,
  PresentationIcon,
  StethoscopeIcon,
  UsersIcon,
} from "./icons";
import { BotanicalMark } from "./botanical-mark";
import { LanguageToggle } from "./language-toggle";
import { PortraitFrame } from "./portrait-frame";
import { SchemePicker } from "./scheme-picker";
import { ThemeToggle } from "./theme-toggle";
import { Reveal } from "./reveal";

const editorialNav = [
  { key: "home", path: "#home" },
  { key: "about", path: "#practice" },
  { key: "clinical", path: "#clinical" },
  { key: "research", path: "#research" },
  { key: "insights", path: "#writing" },
  { key: "cv", path: "/cv" },
  { key: "contact", path: "/contact" },
] as const;

/**
 * A single-page editorial home that mirrors the supplied three-column layout:
 * persistent identity rail, a narrative center column, and a compact CV rail.
 * All biographical copy is pulled from the content layer so the layout can be
 * safely translated without duplicating facts in a component.
 */
export function EditorialHome({ locale }: { locale: Locale }) {
  const d = dictionary.editorialHome;
  const home = dictionary.home;
  const pgy = currentPgy(residency.startYear, residency.endYear);
  const articles = sortedArticles().slice(0, 3);
  const projects = researchProjects.slice(0, 3);
  const focus = focusAreas.slice(0, 4);

  return (
    <div className="editorial-home">
      <header className="editorial-mobile-header" data-editorial-chrome>
        <Link href={localeHref(locale)} className="editorial-wordmark" aria-label={person.displayName}>
          <span>{person.firstName}</span>
          <span>{person.lastName}, <i>{person.credential}</i></span>
        </Link>
        <div className="editorial-mobile-actions">
          <LanguageToggle locale={locale} label={t(dictionary.actions.toggleLanguage, locale)} />
          <ThemeToggle label={t(dictionary.actions.toggleTheme, locale)} />
          <SchemePicker locale={locale} placement="bottom" />
        </div>
      </header>

      <div className="editorial-grid">
        <aside className="editorial-left-rail" aria-label={t(dictionary.nav.menu, locale)}>
          <div>
            <Link href={localeHref(locale)} className="editorial-rail-name" aria-label={person.displayName}>
              <span>{person.firstName}</span>
              <span>{person.lastName}, <i>{person.credential}</i></span>
            </Link>
            <p className="editorial-rail-specialty">
              {t(person.specialty, locale)}<br />
              {t(person.location, locale)}
            </p>
          </div>

          <nav className="editorial-nav" aria-label={t(dictionary.nav.menu, locale)}>
            {editorialNav.map((item) => (
              <Link key={item.key} href={item.path.startsWith("#") ? item.path : localeHref(locale, item.path)}>
                <span className="editorial-nav-dot" aria-hidden />
                {t(dictionary.nav[item.key], locale)}
              </Link>
            ))}
          </nav>

          <div className="editorial-rail-bottom">
            <div className="editorial-language-row">
              <LanguageToggle locale={locale} label={t(dictionary.actions.toggleLanguage, locale)} />
              <ThemeToggle label={t(dictionary.actions.toggleTheme, locale)} />
              <SchemePicker locale={locale} placement="top" />
            </div>
            <blockquote>
              <p>“{t(d.railQuote, locale)}”</p>
              <cite>{t(d.railQuoteAttribution, locale)}</cite>
            </blockquote>
          </div>
        </aside>

        <div className="editorial-main">
          <section id="home" className="editorial-hero editorial-rule-section">
            <Reveal className="editorial-hero-copy">
              <div className="editorial-kicker">
                <span className="editorial-kicker-dot" aria-hidden />
                {t(home.heroBadge, locale)}
              </div>
              <h1>
                <span>{t(home.heroLine1, locale)}</span>
                <em>{t(home.heroLine2, locale)}</em>
                <span>{t(home.heroLine3, locale)}</span>
              </h1>
              <p className="editorial-lede">{t(home.heroSub, locale)}</p>
              <div className="editorial-actions">
                <Link href="#research" className="editorial-button editorial-button-dark">
                  {t(home.heroCtaPrimary, locale)} <ArrowRightIcon width={15} height={15} />
                </Link>
                <Link href={localeHref(locale, "/contact")} className="editorial-button editorial-button-outline">
                  {t(home.heroCtaSecondary, locale)}
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.16} className="editorial-hero-visual">
              <div className="editorial-hero-art" aria-hidden>
                <OrbitalArt />
              </div>
              <PortraitFrame
                src="/portrait.webp"
                alt={`${person.displayName}, ${t(person.role, locale)}`}
                locale={locale}
                className="editorial-portrait-window"
                frameClassName="editorial-portrait-window-inner"
              />
              <div className="editorial-photo-caption">
                <span>{t(person.role, locale)}</span>
                <strong>{residency.hospital}</strong>
                <small>{pgy !== null ? `PGY-${pgy}` : t(home.eyebrow, locale)} · {t(person.location, locale)}</small>
              </div>
            </Reveal>
          </section>

          <section id="practice" className="editorial-practice editorial-rule-section">
            <Reveal className="editorial-practice-art" aria-hidden>
              <PracticeArt />
              <span>{t(d.practiceArtLabel, locale)}</span>
            </Reveal>
            <Reveal delay={0.08} className="editorial-section-copy">
              <p className="editorial-eyebrow">{t(d.practiceEyebrow, locale)}</p>
              <h2>{t(d.practiceTitle, locale)}</h2>
              <p>{t(d.practiceBody, locale)}</p>
              <Link href={localeHref(locale, "/about")} className="editorial-text-link">
                {t(d.practiceLink, locale)} <ArrowRightIcon width={14} height={14} />
              </Link>
            </Reveal>
          </section>

          <section id="clinical" className="editorial-clinical editorial-rule-section">
            <Reveal>
              <p className="editorial-eyebrow">{t(d.clinicalEyebrow, locale)}</p>
              <h2>{t(d.clinicalTitle, locale)}</h2>
            </Reveal>
            <div className="editorial-focus-grid">
              {focus.map((item, i) => (
                <Reveal key={item.id} as="article" delay={i * 0.05} className="editorial-focus-card">
                  <span className="editorial-focus-icon" aria-hidden>
                    {i === 0 ? <StethoscopeIcon width={22} height={22} /> : i === 1 ? <CheckIcon width={22} height={22} /> : i === 2 ? <GlobeIcon width={22} height={22} /> : <UsersIcon width={22} height={22} />}
                  </span>
                  <h3>{t(item.title, locale)}</h3>
                  <p>{t(item.body, locale)}</p>
                </Reveal>
              ))}
            </div>
            <Link href={localeHref(locale, "/clinical")} className="editorial-text-link">
              {t(d.clinicalLink, locale)} <ArrowRightIcon width={14} height={14} />
            </Link>
          </section>

          <section id="research" className="editorial-research editorial-rule-section">
            <div className="editorial-section-heading-row">
              <Reveal>
                <p className="editorial-eyebrow">{t(d.researchEyebrow, locale)}</p>
                <h2>{t(d.researchTitle, locale)}</h2>
                <p className="editorial-section-intro">{t(d.researchBody, locale)}</p>
              </Reveal>
              <BotanicalMark className="editorial-botanical" />
            </div>
            <div className="editorial-research-grid">
              {projects.map((project, i) => (
                <Reveal key={project.id} delay={i * 0.06} className="editorial-research-card">
                  <span className="editorial-card-index">0{i + 1}</span>
                  <h3>{t(project.title, locale)}</h3>
                  <p>{t(project.body, locale)}</p>
                  <span className="editorial-mini-link">{t(dictionary.actions.readMore, locale)} <ArrowRightIcon width={13} height={13} /></span>
                </Reveal>
              ))}
            </div>
            <Link href={localeHref(locale, "/research")} className="editorial-text-link">
              {t(d.researchLink, locale)} <ArrowRightIcon width={14} height={14} />
            </Link>
          </section>

          <section id="writing" className="editorial-writing editorial-rule-section">
            <Reveal className="editorial-section-heading-row editorial-writing-heading">
              <div>
                <p className="editorial-eyebrow">{t(d.writingEyebrow, locale)}</p>
                <h2>{t(d.writingTitle, locale)}</h2>
                <p className="editorial-section-intro">{t(d.writingBody, locale)}</p>
              </div>
              <Link href={localeHref(locale, "/insights")} className="editorial-text-link">{t(d.writingLink, locale)} <ArrowRightIcon width={14} height={14} /></Link>
            </Reveal>
            <div className="editorial-article-grid">
              {articles.map((article, i) => (
                <Reveal key={article.slug} delay={i * 0.06} className="editorial-article-card">
                  <span className="editorial-article-meta">{article.date.replace("-", " · ")} · {article.readMinutes} min</span>
                  <h3>{t(article.title, locale)}</h3>
                  <p>{t(article.dek, locale)}</p>
                  <Link href={localeHref(locale, `/insights/${article.slug}`)} aria-label={`${t(dictionary.actions.readMore, locale)}: ${t(article.title, locale)}`}>
                    {t(dictionary.actions.readMore, locale)} <ArrowRightIcon width={13} height={13} />
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="story" className="editorial-story editorial-rule-section">
            <Reveal className="editorial-story-copy">
              <p className="editorial-eyebrow">{t(d.storyEyebrow, locale)}</p>
              <h2>{t(d.storyTitle, locale)}</h2>
              <p>{t(d.storyBody, locale)}</p>
              <Link href={localeHref(locale, "/about")} className="editorial-text-link">{t(d.storyLink, locale)} <ArrowRightIcon width={14} height={14} /></Link>
            </Reveal>
            <Reveal delay={0.1} className="editorial-story-card">
              <span className="editorial-story-mark">JB</span>
              <p>“{t(d.storyQuote, locale)}”</p>
              <span>{t(d.railQuoteAttribution, locale)}</span>
            </Reveal>
          </section>

          <footer className="editorial-main-footer">
            <span>{person.displayName}</span>
            <span>{t(d.siteNote, locale)}</span>
            <span>© {new Date().getFullYear()}</span>
          </footer>
        </div>

        <aside className="editorial-right-rail" aria-label={t(d.atAGlance, locale)}>
          <section className="editorial-rail-section">
            <p className="editorial-rail-heading">{t(d.atAGlance, locale)}</p>
            <RailFact icon={<UsersIcon width={19} height={19} />} title={t(person.role, locale)} detail={`${residency.hospital} · ${residency.location}`} />
            <RailFact icon={<PresentationIcon width={19} height={19} />} title={t(roles[2]?.title ?? "", locale)} detail={roles[2]?.organization ?? ""} />
            <RailFact icon={<FileTextIcon width={19} height={19} />} title={`${researchArticleCount} ${t(home.statArticles, locale)}`} detail={t(d.researchEyebrow, locale)} />
            <RailFact icon={<GlobeIcon width={19} height={19} />} title={t(d.drivesItems[3] ?? "", locale)} detail={person.languages.map((language) => t(language, locale)).join(" · ")} />
          </section>

          <section className="editorial-rail-section">
            <p className="editorial-rail-heading">{t(d.drivesTitle, locale)}</p>
            <ul className="editorial-drives-list">
              {d.drivesItems.map((item, i) => (
                <li key={item.en}>
                  <span className="editorial-drive-icon" aria-hidden>{i === 0 ? "♡" : i === 1 ? "◷" : i === 2 ? "▤" : "♧"}</span>
                  <span><strong>{t(item, locale)}</strong><small>{t(d.drivesDetails[i] ?? "", locale)}</small></span>
                </li>
              ))}
            </ul>
          </section>

          <section className="editorial-rail-section editorial-roles-section">
            <p className="editorial-rail-heading">{t(d.rolesTitle, locale)}</p>
            {roles.map((role) => (
              <div key={role.id} className="editorial-role-item">
                <strong>{t(role.title, locale)}</strong>
                <span>{role.organization}</span>
                {role.note && <small>{t(role.note, locale)}</small>}
              </div>
            ))}
          </section>

          <section className="editorial-rail-section editorial-achievements">
            <p className="editorial-rail-heading">{t(d.achievementsTitle, locale)}</p>
            {awards.map((award) => (
              <div key={award.id} className="editorial-achievement-item">
                <CheckIcon width={15} height={15} aria-hidden />
                <span>{t(award.label, locale)}<small>{award.note ? t(award.note, locale) : award.issuer}</small></span>
              </div>
            ))}
          </section>

          <div className="editorial-rail-cta">
            <p>{t(d.bottomCta, locale)}</p>
            <Link href={localeHref(locale, "/contact")} className="editorial-rail-button">{t(d.bottomCtaLink, locale)}</Link>
          </div>
        </aside>
      </div>

      <section className="editorial-bottom-cta">
        <div>
          <p>{t(d.bottomCta, locale)}</p>
          <span>{t(d.bottomCtaSub, locale)}</span>
        </div>
        <Link href={localeHref(locale, "/contact")} className="editorial-button editorial-button-light">{t(d.bottomCtaLink, locale)} <ArrowRightIcon width={15} height={15} /></Link>
      </section>
    </div>
  );
}

function RailFact({ icon, title, detail }: { icon: ReactNode; title: string; detail: string }) {
  return (
    <div className="editorial-rail-fact">
      <span className="editorial-fact-icon" aria-hidden>{icon}</span>
      <span><strong>{title}</strong><small>{detail}</small></span>
    </div>
  );
}

function OrbitalArt() {
  return (
    <svg viewBox="0 0 420 520" fill="none" preserveAspectRatio="xMidYMid slice">
      <circle cx="220" cy="235" r="175" stroke="currentColor" strokeWidth="1" opacity=".32" />
      <circle cx="220" cy="235" r="132" stroke="currentColor" strokeWidth="1" opacity=".25" />
      <circle cx="220" cy="235" r="84" stroke="currentColor" strokeWidth="1" opacity=".2" />
      <path d="M28 430C100 330 170 286 270 255C321 239 368 196 398 88" stroke="currentColor" strokeWidth="1.2" opacity=".36" />
      <path d="M34 78C132 134 194 172 253 258C294 318 322 379 390 442" stroke="currentColor" strokeWidth="1" opacity=".22" />
      <circle cx="310" cy="102" r="5" fill="currentColor" opacity=".65" />
      <circle cx="89" cy="389" r="3" fill="currentColor" opacity=".48" />
    </svg>
  );
}

function PracticeArt() {
  return (
    <svg viewBox="0 0 240 220" fill="none" preserveAspectRatio="xMidYMid meet">
      <rect x="20" y="18" width="170" height="168" fill="currentColor" opacity=".08" />
      <path d="M76 170V82C76 52 92 35 119 35C146 35 162 52 162 82V170" stroke="currentColor" strokeWidth="1.2" />
      <path d="M65 170H174M58 186H181" stroke="currentColor" strokeWidth="1.2" />
      <path d="M173 186C177 158 185 127 201 103" stroke="currentColor" strokeWidth="1" />
      <path d="M189 144C171 137 163 126 162 110C178 116 189 126 192 140M192 125C201 111 211 101 224 96C218 113 207 124 194 132" stroke="currentColor" strokeWidth="1" />
      <path d="M35 172V109C35 101 41 96 49 96H60V172M29 172H67" stroke="currentColor" strokeWidth="1" />
      <path d="M34 119H63" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
