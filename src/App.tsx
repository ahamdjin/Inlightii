import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const homeImage = (name: string) => `/images/home/${name}`

const images = {
  hero: homeImage('ChatGPT%20Image%20Sept%203%202026.webp'),
  aboutFinished: homeImage('ChatGPT%20Image%20Sept%203%202026%20(1)%20(1).webp'),
  quality: homeImage('ChatGPT%20Image%20Sept%203%202026%20(1).webp'),
  retail: homeImage('ChatGPT%20Image%20Sept%203%202026%20(2).webp'),
  expertise: homeImage('ChatGPT%20Image%20Sept%203%202026%20(2)%20(1).webp'),
  standard: homeImage('ChatGPT%20Image%20Sept%203%202026%20(3)%20(1).webp'),
  aboutTechnical: homeImage('ChatGPT%20Image%20Sept%203%202026%20(3).webp'),
  supply: homeImage('ChatGPT%20Image%20Sept%203%202026%20(5).webp'),
}

const differences = [
  { number: '01', title: 'Quality over quantity', note: 'A tighter standard for materials, finish and final execution.', image: images.quality },
  { number: '02', title: 'Global supply chain', note: 'A manufacturing network built around capability, consistency and scale.', image: images.supply },
  { number: '03', title: 'Industry expertise', note: 'Design and production knowledge shaped by complex hospitality and retail work.', image: images.expertise },
  { number: '04', title: 'End-to-end manufacturing', note: 'From development and prototyping through production and quality control.', image: images.aboutTechnical },
]

const projects = [
  { title: 'Hospitality environments', type: 'Selected work', image: images.expertise },
  { title: 'Retail & display', type: 'Selected work', image: images.retail },
  { title: 'Lighting & décor', type: 'Selected work', image: images.standard },
]

const process = [
  { number: '01', title: 'Design & development', copy: 'Ideas are shaped around proportion, material, performance and the atmosphere the finished piece should create.', image: images.aboutFinished },
  { number: '02', title: 'Engineering', copy: 'Design intent becomes buildable through technical development, detailing and production-minded problem solving.', image: images.aboutTechnical },
  { number: '03', title: 'Prototyping', copy: 'Scale, finish and construction are tested in the real world before a concept moves into repeatable production.', image: images.quality },
  { number: '04', title: 'Manufacturing', copy: 'A global supply network brings together the right processes, materials and specialists for each piece.', image: images.supply },
  { number: '05', title: 'Quality assurance', copy: 'The final standard is checked in the details — finish, consistency, performance and readiness for the space.', image: images.quality },
]

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>
}

function App() {
  const root = useRef<HTMLDivElement>(null)
  const processImageRef = useRef<HTMLImageElement>(null)
  const differenceFloatRef = useRef<HTMLDivElement>(null)
  const [activeDifference, setActiveDifference] = useState(0)

  useEffect(() => {
    const lenis = new Lenis({ duration: 1, smoothWheel: true, wheelMultiplier: 0.88 })
    lenis.on('scroll', ScrollTrigger.update)
    const update = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
      lenis.destroy()
    }
  }, [])

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.from('.hero [data-hero]', {
      opacity: 0,
      y: 18,
      duration: 1,
      stagger: 0.08,
      ease: 'power3.out',
      delay: 0.1,
    })

    gsap.to('.hero__image img', {
      yPercent: 8,
      scale: 1.025,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.4 },
    })

    gsap.to('.hero__copy', {
      opacity: 0.35,
      y: 24,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: '55% top', end: 'bottom top', scrub: 1 },
    })

    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
      gsap.from(element, {
        opacity: 0,
        y: 18,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: element, start: 'top 86%', once: true },
      })
    })

    gsap.utils.toArray<HTMLElement>('[data-image-shift]').forEach((wrapper) => {
      const image = wrapper.querySelector('img')
      if (!image) return
      gsap.fromTo(image, { scale: 1.035 }, {
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: wrapper, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
      })
    })

    gsap.utils.toArray<HTMLElement>('.process-step').forEach((item, index) => {
      ScrollTrigger.create({
        trigger: item,
        start: 'top 58%',
        end: 'bottom 42%',
        onEnter: () => changeProcessImage(index),
        onEnterBack: () => changeProcessImage(index),
        toggleClass: { targets: item, className: 'is-active' },
      })
    })

    function changeProcessImage(index: number) {
      const img = processImageRef.current
      if (!img || img.dataset.index === String(index)) return
      gsap.to(img, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.out',
        onComplete: () => {
          img.src = process[index].image
          img.dataset.index = String(index)
          gsap.fromTo(img, { opacity: 0, scale: 1.018 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' })
        },
      })
    }

    ScrollTrigger.refresh()
  }, { scope: root })

  const hasFinePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

  const moveIntroLens = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!hasFinePointer()) return
    const stage = event.currentTarget
    const rect = stage.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    gsap.to(stage, {
      '--lens-x': `${x}px`,
      '--lens-y': `${y}px`,
      duration: 0.34,
      ease: 'power3.out',
      overwrite: 'auto',
    })
  }

  const enterIntroLens = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!hasFinePointer()) return
    event.currentTarget.classList.add('is-active')
  }

  const leaveIntroLens = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.classList.remove('is-active')
  }

  const moveDifferencePreview = (event: ReactPointerEvent<HTMLElement>) => {
    if (!hasFinePointer() || !differenceFloatRef.current) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    gsap.to(differenceFloatRef.current, {
      x: x + 34,
      y: y - 118,
      duration: 0.55,
      ease: 'power3.out',
      overwrite: 'auto',
    })
  }

  const showDifferencePreview = (index: number) => {
    setActiveDifference(index)
    if (!hasFinePointer() || !differenceFloatRef.current) return
    gsap.to(differenceFloatRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.32,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }

  const hideDifferencePreview = () => {
    if (!differenceFloatRef.current) return
    gsap.to(differenceFloatRef.current, {
      opacity: 0,
      scale: 0.96,
      duration: 0.26,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }

  return (
    <div className="site" ref={root}>
      <header className="nav">
        <a className="brand" href="#top" aria-label="INLIGHT International home">
          <strong>INLIGHT</strong><span>International</span>
        </a>
        <nav className="nav__links" aria-label="Primary navigation">
          <a href="#difference">Company</a>
          <a href="#work">Gallery</a>
          <a href="#process">Capabilities</a>
        </nav>
        <a className="nav__contact" href="mailto:info@inlightii.com">Contact <Arrow /></a>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero__image" data-image-shift>
            <img src={images.hero} alt="Custom lighting in a refined hospitality interior" />
            <div className="hero__shade" />
          </div>
          <div
            className="hero__copy shell"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              paddingTop: '76px',
              paddingBottom: '42px',
            }}
          >
            <p className="eyebrow light" data-hero style={{ marginBottom: '18px' }}>Design · Engineering · Manufacturing</p>
            <h1
              data-hero
              style={{
                margin: '0 0 18px',
                maxWidth: '680px',
                fontSize: 'clamp(34px, 3.6vw, 52px)',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                fontWeight: 300,
              }}
            >
              Crafted to a higher standard.
            </h1>
            <div
              className="hero__footer"
              data-hero
              style={{ flexDirection: 'column', alignItems: 'center', gap: '16px' }}
            >
              <p style={{ textAlign: 'center', width: 'min(390px, 100%)', fontSize: '12px' }}>
                Quality lighting and décor for hospitality, retail and design-led spaces.
              </p>
              <span>Scroll <span className="down">↓</span></span>
            </div>
          </div>
        </section>

        <section className="intro screen shell">
          <div className="section-label" data-reveal><span>01</span><span>About INLIGHT</span></div>
          <div className="intro__experience">
            <div className="intro__copy">
              <h2 data-reveal>We are part design studio, part engineering partner, part manufacturer.</h2>
              <div className="intro__aside" data-reveal>
                <p>That mix is the point.</p>
                <p>It lets us protect an idea from the first conversation through the realities of production and the final space.</p>
              </div>
            </div>

            <div
              className="intro__lens-stage"
              data-reveal
              onPointerMove={moveIntroLens}
              onPointerEnter={enterIntroLens}
              onPointerLeave={leaveIntroLens}
            >
              <img className="intro__lens-base" src={images.aboutFinished} alt="Finished INLIGHT lighting environment" />
              <div className="intro__lens-overlay" aria-hidden="true">
                <img src={images.aboutTechnical} alt="" />
              </div>
              <div className="intro__lens-ring" aria-hidden="true">
                <span>Under the surface</span>
              </div>
              <div className="intro__lens-hint" aria-hidden="true">Move to reveal <span>↗</span></div>
              <div className="intro__lens-caption"><span>Finished space</span><span>Design · Engineering · Making</span></div>
            </div>
          </div>
        </section>

        <section
          className="difference screen shell"
          id="difference"
          onPointerMove={moveDifferencePreview}
          onPointerLeave={hideDifferencePreview}
        >
          <div className="section-label" data-reveal><span>02</span><span>How we are different</span></div>
          <div className="difference__head" data-reveal>
            <p>Four things we refuse to separate.</p>
            <span>Move across the principles</span>
          </div>
          <div className="difference__layout">
            <div className="difference__list" data-reveal>
              {differences.map((item, index) => (
                <button
                  className={`difference-item ${activeDifference === index ? 'is-active' : ''}`}
                  key={item.number}
                  onPointerEnter={() => showDifferencePreview(index)}
                  onFocus={() => setActiveDifference(index)}
                  onClick={() => setActiveDifference(index)}
                  type="button"
                >
                  <span className="difference-item__number">{item.number}</span>
                  <span className="difference-item__text">
                    <strong>{item.title}</strong>
                    <small>{item.note}</small>
                  </span>
                  <Arrow />
                </button>
              ))}
            </div>
          </div>

          <div className="difference__float" ref={differenceFloatRef} aria-hidden="true">
            <img key={differences[activeDifference].image} src={differences[activeDifference].image} alt="" />
            <span>{differences[activeDifference].number} / {differences[activeDifference].title}</span>
          </div>

          <div className="difference__mobile-visual">
            <img src={differences[activeDifference].image} alt="INLIGHT capability detail" />
            <span>{differences[activeDifference].title}</span>
          </div>
        </section>

        <section className="work" id="work">
          <div className="work__intro screen shell">
            <div className="section-label light" data-reveal><span>03</span><span>Selected work</span></div>
            <div className="work__intro-copy">
              <h2 data-reveal>Sometimes the best thing we can do is let the work speak.</h2>
              <p data-reveal>Custom lighting and décor developed to feel native to the spaces they inhabit.</p>
            </div>
          </div>

          {projects.map((project, index) => (
            <article className="project screen shell" key={project.title}>
              <div className={`project__frame ${index === 1 ? 'project__frame--contained' : ''}`} data-image-shift>
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project__caption">
                <div><span>{project.type}</span><h3>{project.title}</h3></div>
                <span>0{index + 1} / 03</span>
              </div>
            </article>
          ))}
        </section>

        <section className="process shell" id="process">
          <div className="process__intro" data-reveal>
            <div className="section-label"><span>04</span><span>From idea to object</span></div>
            <h2>Creative on one side.<br /><em>Technical on the other.</em></h2>
            <p>One continuous process connects the two.</p>
          </div>

          <div className="process__body">
            <div className="process__sticky">
              <div className="process__image" data-image-shift>
                <img ref={processImageRef} data-index="0" src={process[0].image} alt="INLIGHT process" />
              </div>
            </div>
            <div className="process__steps">
              {process.map((step) => (
                <article className="process-step" key={step.number}>
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="standard screen">
          <div className="standard__image" data-image-shift>
            <img src={images.standard} alt="Finished lighting within an interior" />
            <div className="standard__shade" />
          </div>
          <div className="standard__copy shell">
            <div className="section-label light" data-reveal><span>05</span><span>Our standard</span></div>
            <div className="standard__statement" data-reveal>
              <p>Our job is not to make something that simply photographs well.</p>
              <h2>It has to be beautiful.<br />It also has to <em>work.</em></h2>
            </div>
          </div>
        </section>

        <section className="contact screen shell">
          <div className="section-label" data-reveal><span>06</span><span>Start a conversation</span></div>
          <div className="contact__center" data-reveal>
            <p>Have something particular in mind?</p>
            <a href="mailto:info@inlightii.com">Let's talk <Arrow /></a>
          </div>
          <footer>
            <div className="brand brand--dark"><strong>INLIGHT</strong><span>International</span></div>
            <div><a href="mailto:info@inlightii.com">info@inlightii.com</a><span>© {new Date().getFullYear()} INLIGHT International</span></div>
          </footer>
        </section>
      </main>
    </div>
  )
}

export default App