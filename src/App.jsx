import { useEffect, useState } from 'react'
import { profile, education, skills, projects, EMAIL } from './data.js'
import hero from './assets/hero.png'
import about from './assets/about.png'

const links = ['Home', 'About', 'Education', 'Skills', 'Projects', 'Resume', 'Contact']

function Nav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    links.forEach((l) => { const el = document.getElementById(l.toLowerCase()); el && io.observe(el) })
    return () => io.disconnect()
  }, [])
  return (
    <header className="nav">
      <a href="#home" className="logo">MT</a>
      <button className="burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span /><span /><span />
      </button>
      <nav className={open ? 'open' : ''}>
        {links.map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`} className={active === l.toLowerCase() ? 'on' : ''} onClick={() => setOpen(false)}>{l}</a>
        ))}
      </nav>
    </header>
  )
}

const Heading = ({ children, sub }) => (
  <div className="head"><h2>{children}</h2>{sub && <p>{sub}</p>}</div>
)

function Home() {
  return (
    <section id="home" className="hero">
      <div className="hero-text">
        <p className="hi">Hi, I am</p>
        <h1>{profile.name}</h1>
        <p className="role">{profile.role}</p>
        <p className="lead">{profile.intro}</p>
        <div className="cta">
          <a className="btn primary" href="#projects">See my projects</a>
          <a className="btn" href="#contact">Get in touch</a>
        </div>
        <p className="loc">{profile.location}</p>
      </div>
      <div className="hero-photo">
        <div className="glow" />
        <img src={hero} alt="Portrait of Malik Taajdar" />
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="sec about">
      <div className="about-photo"><img src={about} alt="Malik Taajdar standing in a restaurant" loading="lazy" /></div>
      <div>
        <Heading>About me</Heading>
        {profile.about.map((t) => <p key={t} className="body">{t}</p>)}
        <blockquote>{profile.goal}</blockquote>
      </div>
    </section>
  )
}

function Education() {
  return (
    <section id="education" className="sec">
      <Heading sub="Where I have studied and what I am studying now.">Education</Heading>
      <ol className="timeline">
        {education.map((e, i) => (
          <li key={e.title} className={i >= 2 ? 'live' : ''}>
            <h3>{e.title}</h3>
            <p>{e.place}</p>
            <span className="pill">{e.status}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="sec">
      <Heading sub="The tools I use and the skills I am building.">Skills</Heading>
      <div className="skill-grid">
        {Object.entries(skills).map(([group, items]) => (
          <div key={group} className="card">
            <h3>{group}</h3>
            <div className="chips">{items.map((s) => <span key={s}>{s}</span>)}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects" className="sec">
      <Heading sub="Practice work and projects I have built while learning.">Projects</Heading>
      <div className="proj-grid">
        {projects.map((p) => (
          <article key={p.title} className="card proj">
            <h3>{p.title}</h3>
            <p>{p.text}</p>
            <div className="chips small">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Resume() {
  return (
    <section id="resume" className="sec">
      <Heading sub="A one-page summary you can save as PDF.">Resume</Heading>
      <div className="resume card">
        <h3>{profile.name}</h3>
        <p className="muted">{profile.role} · {profile.location}</p>
        <h4>Education</h4>
        <ul>{education.map((e) => <li key={e.title}><b>{e.title}</b>, {e.place} ({e.status})</li>)}</ul>
        <h4>Skills</h4>
        <p>{[...skills['Learning and practising'], ...skills['Tools and technologies']].join(', ')}</p>
        <h4>Projects</h4>
        <ul>{projects.map((p) => <li key={p.title}>{p.title}</li>)}</ul>
        <h4>Career goal</h4>
        <p>{profile.goal}</p>
        <button className="btn primary no-print" onClick={() => window.print()}>Download resume as PDF</button>
      </div>
    </section>
  )
}

function Contact() {
  const [f, setF] = useState({ name: '', email: '', msg: '' })
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    const body = `${f.msg}\n\nFrom: ${f.name} (${f.email})`
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Portfolio message from ' + f.name)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }
  return (
    <section id="contact" className="sec contact">
      <Heading sub="Have a project, an internship or a question? Send me a message.">Contact</Heading>
      <form className="card" onSubmit={submit}>
        <label>Your name<input required value={f.name} onChange={set('name')} /></label>
        <label>Your email<input required type="email" value={f.email} onChange={set('email')} /></label>
        <label>Message<textarea required rows="5" value={f.msg} onChange={set('msg')} /></label>
        <button className="btn primary" type="submit">Send message</button>
        {sent && <p className="ok" role="status">Your email app opened with the message ready to send.</p>}
      </form>
    </section>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Home /><About /><Education /><Skills /><Projects /><Resume /><Contact />
      </main>
      <footer>© {new Date().getFullYear()} {profile.name} · {profile.location}</footer>
    </>
  )
}
