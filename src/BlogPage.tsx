import { useEffect, type PointerEvent as ReactPointerEvent } from 'react'

const image = (name: string) => `/images/home/${name}`

const journalImages = {
  feature: image('ChatGPT%20Image%20Sept%203%202026.webp'),
  material: image('ChatGPT%20Image%20Sept%203%202026%20(1).webp'),
  studio: image('ChatGPT%20Image%20Sept%203%202026%20(5).webp'),
  hospitality: image('ChatGPT%20Image%20Sept%203%202026%20(2)%20(1).webp'),
  retail: image('ChatGPT%20Image%20Sept%203%202026%20(2).webp'),
  process: image('ChatGPT%20Image%20Sept%203%202026%20(3).webp'),
}

const posts = [
  {
    number: '01',
    category: 'Light',
    title: 'Why good lighting is felt before it is noticed',
    excerpt: 'A look at proportion, reflection, warmth and the quiet decisions that shape atmosphere.',
    image: journalImages.hospitality,
    read: '5 min read',
  },
  {
    number: '02',
    category: 'Material',
    title: 'The details that separate an object from a product',
    excerpt: 'Glass, metal, finish and tolerance — where perceived quality is actually built.',
    image: journalImages.material,
    read: '4 min read',
  },
  {
    number: '03',
    category: 'Making',
    title: 'What changes when design stays close to manufacturing',
    excerpt: 'Why fewer handoffs can protect an idea all the way from sketch to shipment.',
    image: journalImages.studio,
    read: '6 min read',
  },
  {
    number: '04',
    category: 'Hospitality',
    title: 'Designing lighting for spaces people remember',
    excerpt: 'The relationship between decorative fixtures, architecture and the mood of a room.',
    image: journalImages.feature,
    read: '5 min read',
  },
  {
    number: '05',
    category: 'Retail',
    title: 'When the fixture becomes part of the display',
    excerpt: 'A retail environment works best when light and product presentation feel like one system.',
    image: journalImages.retail,
    read: '4 min read',
  },
  {
    number: '06',
    category: 'Process',
    title: 'Prototype early. Learn while changes are still cheap.',
    excerpt: 'The practical value of seeing scale, construction and finish in the real world before production.',
    image: journalImages.process,
    read: '3 min read',
  },
]

function BlogPage() {
  useEffect(() => {
    document.title = 'Journal | INLIGHT International'
    window.scrollTo(0, 0)
  }, [])

  const moveGlow = (event: ReactPointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--glow-x', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--glow-y', `${event.clientY - rect.top}px`)
  }

  return (
    <div className="page blog-page" id="journal">
      <header className="page-nav page-nav--dark">
        <a className="page-brand page-brand--dark" href="/" aria-label="INLIGHT International home">
          <strong>INLIGHT</strong><span>International</span>
        </a>
        <nav>
          <a href="/">Home</a>
          <a className="is-current" href="/blog">Journal</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="blog-hero page-shell" onPointerMove={moveGlow}>
          <div className="blog-hero__glow" aria-hidden="true" />
          <div className="blog-hero__top">
            <span className="page-kicker">INLIGHT Journal</span>
            <span>Light · Material · Making</span>
          </div>
          <div className="blog-hero__center">
            <h1>Notes on the things behind<br />a better finished object.</h1>
            <p>Observations from the space between design, engineering and manufacturing.</p>
          </div>
          <div className="blog-hero__bottom"><span>Ideas, process and perspective</span><span>Scroll ↓</span></div>
        </section>

        <section className="blog-feature page-shell">
          <div className="blog-feature__label"><span>Featured</span><span>01 / Journal</span></div>
          <article className="blog-feature__article">
            <div className="blog-feature__image" onPointerMove={moveGlow}>
              <img src={journalImages.feature} alt="Sculptural lighting in a refined hospitality interior" />
              <div className="blog-feature__light" aria-hidden="true" />
              <span className="blog-feature__hover">Open story ↗</span>
            </div>
            <div className="blog-feature__copy">
              <div><span>Perspective · 7 min read</span><span>September 2026</span></div>
              <h2>Beautiful is only half the job.</h2>
              <p>The strongest lighting pieces live comfortably in two worlds: they have to create emotion in the finished space, and they have to survive the practical realities of engineering, production and use.</p>
              <button type="button">Read the story <span>↗</span></button>
            </div>
          </article>
        </section>

        <section className="blog-index page-shell" id="articles">
          <div className="blog-index__head">
            <span className="page-index">02 / Latest</span>
            <div className="blog-index__filters"><button className="is-active">All</button><button>Light</button><button>Material</button><button>Making</button></div>
          </div>

          <div className="blog-grid">
            {posts.map((post) => (
              <article className="blog-card" key={post.number}>
                <div className="blog-card__image">
                  <img src={post.image} alt="" />
                  <span>{post.number}</span>
                </div>
                <div className="blog-card__meta"><span>{post.category}</span><span>{post.read}</span></div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <button type="button">Read article <span>↗</span></button>
              </article>
            ))}
          </div>
        </section>

        <section className="blog-note page-shell">
          <span className="page-index">03 / A small note</span>
          <div>
            <p>We are interested in the entire life of an object.</p>
            <h2>Not only how it looks under perfect light — but how it gets there.</h2>
          </div>
          <a href="/contact">Start a conversation <span>↗</span></a>
        </section>
      </main>

      <footer className="page-footer page-shell">
        <a className="page-brand page-brand--dark" href="/"><strong>INLIGHT</strong><span>International</span></a>
        <div><a href="/contact">Contact</a><a href="mailto:info@inlightii.com">info@inlightii.com</a><span>© {new Date().getFullYear()}</span></div>
      </footer>
    </div>
  )
}

export default BlogPage
