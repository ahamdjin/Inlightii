import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const images = {
  hero: 'https://static.wixstatic.com/media/f966c5_f5c26bacf0344b40bb73374524a6ec4c~mv2.jpg',
  detail: 'https://static.wixstatic.com/media/f966c5_67fc1a9ac30e49579b635922484197ab~mv2.jpg',
  retail: 'https://static.wixstatic.com/media/f966c5_c9051b9cb24040a292319d97979a8ad9~mv2.jpg',
  object: 'https://static.wixstatic.com/media/f966c5_d816dcd11ce24139ab6cc38c360f7203~mv2.jpg',
  edition: 'https://static.wixstatic.com/media/f966c5_8ee547c47d0544a5b9a3595901150709~mv2.jpg',
  pendry: 'https://static.wixstatic.com/media/f966c5_cd67b5ccef1440f69bbe3fe498b72e9f~mv2.png',
  enclave: 'https://static.wixstatic.com/media/f966c5_ead36c42e6c140d39e34967de2fefe4e~mv2.jpg',
}

const differences = [
  ['01', 'Quality over quantity'],
  ['02', 'Global supply chain network'],
  ['03', 'Extensive industry expertise'],
  ['04', 'End-to-end manufacturing'],
]

const process = [
  {
    number: '01',
    title: 'Concept',
    copy: 'A strong idea starts with proportion, material, mood and the way light should inhabit a space.',
    image: images.object,
  },
  {
    number: '02',
    title: 'Engineering',
    copy: 'Design intent is translated into a buildable object with precision, performance and repeatability in mind.',
    image: images.detail,
  },
  {
    number: '03',
    title: 'Manufacturing',
    copy: 'A global network and disciplined production process bring complex forms into physical reality.',
    image: images.retail,
  },
  {
    number: '04',
    title: 'Refinement',
    copy: 'Materials, finishes, detailing and quality control are treated as part of the design — not an afterthought.',
    image: images.pendry,
  },
  {
    number: '05',
    title: 'Installation',
    copy: 'The final object disappears into the architecture and the light becomes part of the atmosphere.',
    image: images.edition,
  },
]

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>
}

function App() {
  const root = useRef<HTMLDivElement>(null)
  const processImageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    })

    lenis.on('scroll', ScrollTrigger.update)
    const update = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
      lenis.destroy()
    }
  }, [])

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduceMotion) return

      gsap.from('.hero__eyebrow, .hero__title-line, .hero__meta, .hero__scroll', {
        opacity: 0,
        y: 24,
        duration: 1.15,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.15,
      })

      gsap.to('.hero__media img', {
        yPercent: 12,
        scale: 1.04,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      })

      gsap.to('.hero__content', {
        yPercent: 18,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: '35% top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          y: 46,
          opacity: 0,
          duration: 1.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 84%',
            once: true,
          },
        })
      })

      gsap.utils.toArray<HTMLElement>('.image-reveal').forEach((wrapper) => {
        const image = wrapper.querySelector('img')
        if (!image) return
        gsap.fromTo(
          image,
          { scale: 1.09 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: wrapper,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.4,
            },
          },
        )
      })

      const processItems = gsap.utils.toArray<HTMLElement>('.process__step')
      processItems.forEach((item, index) => {
        ScrollTrigger.create({
          trigger: item,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => changeProcessImage(index),
          onEnterBack: () => changeProcessImage(index),
          toggleClass: { targets: item, className: 'is-active' },
        })
      })

      function changeProcessImage(index: number) {
        const img = processImageRef.current
        if (!img || img.dataset.index === String(index)) return
        const next = process[index]

        gsap.to(img, {
          opacity: 0,
          scale: 1.025,
          duration: 0.28,
          ease: 'power2.out',
          onComplete: () => {
            img.src = next.image
            img.dataset.index = String(index)
            gsap.fromTo(
              img,
              { opacity: 0, scale: 1.035 },
              { opacity: 1, scale: 1, duration: 0.75, ease: 'power3.out' },
            )
          },
        })
      }

      ScrollTrigger.refresh()
    },
    { scope: root },
  )

  return (
    <div ref={root} className="site-shell">
      <header className="nav">
        <a className="brand" href="#top" aria-label="INLIGHT International home">
          <span>INLIGHT</span>
          <small>International</small>
        </a>
        <nav className="nav__links" aria-label="Primary navigation">
          <a href="#difference">Company</a>
          <a href="#process">Capabilities</a>
          <a href="#work">Gallery</a>
        </nav>
        <a className="nav__contact" href="mailto:info@inlightii.com">
          Contact <Arrow />
        </a>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero__media image-reveal">
            <img src={images.hero} alt="Luxury hospitality interior illuminated by custom lighting" />
            <div className="hero__veil" />
          </div>
          <div className="hero__content page-pad">
            <p className="hero__eyebrow">Design · Engineering · Manufacturing</p>
            <h1 className="hero__title">
              <span className="hero__title-line">Crafted to a</span>
              <span className="hero__title-line hero__title-line--serif">higher standard.</span>
            </h1>
            <div className="hero__bottom">
              <p className="hero__meta">Quality lighting and décor for spaces where every detail matters.</p>
              <span className="hero__scroll">Scroll to discover <span>↓</span></span>
            </div>
          </div>
        </section>

        <section className="statement section-screen page-pad">
          <div className="statement__index" data-reveal>01 / Approach</div>
          <div className="statement__body">
            <p className="kicker" data-reveal>Beauty, backed by precision.</p>
            <h2 data-reveal>
              We shape ideas into objects — and objects into <em>atmosphere.</em>
            </h2>
            <p className="statement__copy" data-reveal>
              INLIGHT brings design thinking, engineering discipline and global manufacturing together under one roof.
            </p>
          </div>
        </section>

        <section className="difference section-screen page-pad" id="difference">
          <div className="section-heading" data-reveal>
            <span>02 / The difference</span>
            <h2>Built differently.</h2>
          </div>
          <div className="difference__rows">
            {differences.map(([number, title]) => (
              <a className="difference-row" href="#process" key={number}>
                <span className="difference-row__number">{number}</span>
                <span className="difference-row__title">{title}</span>
                <Arrow />
              </a>
            ))}
          </div>
        </section>

        <section className="work" id="work">
          <div className="work__intro section-screen page-pad">
            <div data-reveal>
              <span className="kicker">03 / Selected work</span>
              <h2>Light, made architectural.</h2>
            </div>
            <p data-reveal>
              From statement pieces to the details that quietly complete a room, every object is designed to belong to its environment.
            </p>
          </div>

          <article className="project project--full">
            <div className="project__image image-reveal">
              <img src={images.edition} alt="The New York EDITION luxury interior" />
            </div>
            <div className="project__meta page-pad">
              <div><span>Hospitality</span><h3>The New York EDITION</h3></div>
              <a href="https://www.inlightii.com/gallery" target="_blank" rel="noreferrer">Explore gallery <Arrow /></a>
            </div>
          </article>

          <article className="project project--split page-pad">
            <div className="project__image project__image--portrait image-reveal">
              <img src={images.object} alt="Decorative lighting object detail" />
            </div>
            <div className="project__copy" data-reveal>
              <span className="kicker">Objects with presence</span>
              <h3>Designed down to the quietest detail.</h3>
              <p>Form, finish and material are considered together — so the fixture feels inevitable in the space around it.</p>
              <a href="https://www.inlightii.com/gallery" target="_blank" rel="noreferrer">View lighting & décor <Arrow /></a>
            </div>
          </article>
        </section>

        <section className="clients section-screen page-pad">
          <div className="section-heading clients__heading" data-reveal>
            <span>04 / Who we work with</span>
            <h2>For those who notice the details.</h2>
          </div>
          <div className="clients__grid">
            {[
              ['Upscale retailers', images.retail],
              ['Boutique designers', images.edition],
              ['Five-star brands', images.pendry],
            ].map(([title, image], index) => (
              <article className="client-card" key={title}>
                <img src={image} alt="" />
                <div className="client-card__shade" />
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <Arrow />
              </article>
            ))}
          </div>
        </section>

        <section className="process page-pad" id="process">
          <div className="process__sticky">
            <div className="process__sticky-copy">
              <span className="kicker">05 / From idea to object</span>
              <h2>One continuous process.</h2>
              <p>Creative intent stays connected to technical reality from the first sketch to the finished space.</p>
            </div>
            <div className="process__visual image-reveal">
              <img ref={processImageRef} data-index="0" src={process[0].image} alt="INLIGHT process detail" />
            </div>
          </div>
          <div className="process__steps">
            {process.map((step) => (
              <article className="process__step" key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="principle section-screen">
          <div className="principle__media image-reveal">
            <img src={images.enclave} alt="Refined interior lighting detail" />
          </div>
          <div className="principle__overlay page-pad">
            <span className="kicker" data-reveal>06 / Our standard</span>
            <h2 data-reveal>Quality isn't a feature.<br /><em>It's the standard.</em></h2>
          </div>
        </section>

        <section className="contact section-screen page-pad">
          <div className="contact__top">
            <span className="kicker" data-reveal>07 / Start a project</span>
            <p data-reveal>Designers, retailers and global brands come to INLIGHT when the solution needs to be beautiful, reliable and buildable.</p>
          </div>
          <a className="contact__link" href="mailto:info@inlightii.com" data-reveal>
            <span>Have something extraordinary in mind?</span>
            <Arrow />
          </a>
          <footer>
            <div className="brand brand--footer"><span>INLIGHT</span><small>International</small></div>
            <div><a href="mailto:info@inlightii.com">info@inlightii.com</a><span>© {new Date().getFullYear()} INLIGHT International</span></div>
          </footer>
        </section>
      </main>
    </div>
  )
}

export default App
