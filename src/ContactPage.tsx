import { useEffect, type FormEvent, type PointerEvent as ReactPointerEvent } from 'react'

const image = (name: string) => `/images/home/${name}`

const contactImages = {
  hero: image('ChatGPT%20Image%20Sept%203%202026%20(3)%20(1).webp'),
  detail: image('ChatGPT%20Image%20Sept%203%202026%20(1).webp'),
}

function ContactPage() {
  useEffect(() => {
    document.title = 'Contact | INLIGHT International'
    window.scrollTo(0, 0)
  }, [])

  const moveLight = (event: ReactPointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--light-x', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--light-y', `${event.clientY - rect.top}px`)
  }

  const submitBrief = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') || '')
    const email = String(data.get('email') || '')
    const company = String(data.get('company') || '')
    const project = String(data.get('project') || '')
    const message = String(data.get('message') || '')

    const subject = encodeURIComponent(`Project inquiry from ${name || company || 'INLIGHT website'}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nProject type: ${project}\n\nProject brief:\n${message}`,
    )

    window.location.href = `mailto:info@inlightii.com?subject=${subject}&body=${body}`
  }

  return (
    <div className="page contact-page">
      <header className="page-nav page-nav--light">
        <a className="page-brand" href="/" aria-label="INLIGHT International home">
          <strong>INLIGHT</strong><span>International</span>
        </a>
        <nav>
          <a href="/">Home</a>
          <a href="/blog">Journal</a>
          <a className="is-current" href="/contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="contact-hero" onPointerMove={moveLight}>
          <div className="contact-hero__base">
            <img src={contactImages.hero} alt="Sculptural custom lighting in a refined interior" />
          </div>
          <div className="contact-hero__lit" aria-hidden="true">
            <img src={contactImages.hero} alt="" />
          </div>
          <div className="contact-hero__shade" />

          <div className="contact-hero__content">
            <span className="page-kicker">Start a conversation</span>
            <h1>Bring the idea.<br />We’ll help bring it to light.</h1>
            <p>Custom lighting and décor begins with a good conversation — about the space, the object, the constraints and what should feel exceptional.</p>
            <a className="contact-hero__email" href="mailto:info@inlightii.com">info@inlightii.com <span>↗</span></a>
          </div>

          <div className="contact-hero__hint">Move through the light</div>
        </section>

        <section className="contact-brief page-shell">
          <div className="contact-brief__intro">
            <div>
              <span className="page-index">01 / Project brief</span>
              <h2>Tell us enough to start thinking.</h2>
            </div>
            <p>You do not need a finished specification. A sketch, reference, deadline or simply the problem you are trying to solve is enough to begin.</p>
          </div>

          <div className="contact-brief__layout">
            <form className="contact-form" onSubmit={submitBrief}>
              <label>
                <span>Your name</span>
                <input type="text" name="name" placeholder="Name" required />
              </label>
              <label>
                <span>Email</span>
                <input type="email" name="email" placeholder="you@company.com" required />
              </label>
              <label>
                <span>Company / studio</span>
                <input type="text" name="company" placeholder="Optional" />
              </label>
              <label>
                <span>What are you working on?</span>
                <select name="project" defaultValue="">
                  <option value="" disabled>Select a project type</option>
                  <option>Hospitality</option>
                  <option>Retail</option>
                  <option>Residential</option>
                  <option>Custom lighting</option>
                  <option>Decor / private label</option>
                  <option>Something else</option>
                </select>
              </label>
              <label className="contact-form__message">
                <span>A little about the project</span>
                <textarea name="message" rows={5} placeholder="Scope, timing, quantities, references, constraints — whatever is useful." required />
              </label>
              <button type="submit">Send project brief <span>↗</span></button>
            </form>

            <aside className="contact-aside">
              <div className="contact-aside__image">
                <img src={contactImages.detail} alt="Close detail of glass and brass lighting craftsmanship" />
              </div>
              <div className="contact-aside__details">
                <div><span>Email</span><a href="mailto:info@inlightii.com">info@inlightii.com</a></div>
                <div><span>Best for</span><p>Custom development, sourcing, engineering and manufacturing conversations.</p></div>
              </div>
            </aside>
          </div>
        </section>

        <section className="contact-next page-shell">
          <div className="contact-next__head">
            <span className="page-index">02 / What happens next</span>
            <p>Simple by design.</p>
          </div>
          <div className="contact-next__steps">
            <article><span>01</span><h3>We review.</h3><p>We look at the idea, scope and where INLIGHT can add the most value.</p></article>
            <article><span>02</span><h3>We talk.</h3><p>A focused conversation around design intent, feasibility, timing and next steps.</p></article>
            <article><span>03</span><h3>We define.</h3><p>A clear path from concept through development, production and delivery.</p></article>
          </div>
        </section>

        <section className="contact-close">
          <div className="contact-close__beam" />
          <p>Good light changes a space.</p>
          <a href="mailto:info@inlightii.com">Let’s make something worth noticing. <span>↗</span></a>
        </section>
      </main>

      <footer className="page-footer page-shell">
        <a className="page-brand page-brand--dark" href="/"><strong>INLIGHT</strong><span>International</span></a>
        <div><a href="/blog">Journal</a><a href="mailto:info@inlightii.com">info@inlightii.com</a><span>© {new Date().getFullYear()}</span></div>
      </footer>
    </div>
  )
}

export default ContactPage
