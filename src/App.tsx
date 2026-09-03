import { useEffect, useRef, useState } from 'react'
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
  { number: '01', title: 'Quality over quantity', note: 'A tighter standard for materials, finish and final execution.', image: images.detail },
  { number: '02', title: 'Global supply chain', note: 'A manufacturing network built around capability, consistency and scale.', image: images.retail },
  { number: '03', title: 'Industry expertise', note: 'Design and production knowledge shaped by complex hospitality and retail work.', image: images.edition },
  { number: '04', title: 'End-to-end manufacturing', note: 'From development and prototyping through production and quality control.', image: images.object },
]

const projects = [
  { title: 'The New York EDITION', type: 'Hospitality', image: images.edition },
  { title: 'Pendry', type: 'Hospitality', image: images.pendry },
  { title: 'Custom objects & details', type: 'Lighting + Décor', image: images.object },
]

const process = [
  { number: '01', title: 'Design & development', copy: 'Ideas are shaped around proportion, material, performance and the atmosphere the finished piece should create.', image: images.object },
  { number: '02', title: 'Engineering', copy: 'Design intent becomes buildable through technical development, detailing and production-minded problem solving.', image: images.detail },
  { number: '03', title: 'Prototyping', copy: 'Scale, finish and construction are tested in the real world before a concept moves into repeatable production.', image: images.retail },
  { number: '04', title: 'Manufacturing', copy: 'A global supply network brings together the right processes, materials and specialists for each piece.', image: images.pendry },
  { number: '05', title: 'Quality assurance', copy: 'The final standard is checked in the details — finish, consistency, performance and readiness for the space.', image: images.enclave },
]

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>
}

function App() {
  const root = useRef<HTMLDivElement>(null)
  const processImageRef = useRef<HTMLImageElement>(null)
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
          <div className="hero__copy shell">
            <p className="eyebrow light" data-hero>Design · Engineering · Manufacturing</p>
            <h1 data-hero>Crafted to a <em>higher standard.</em></h1>
            <div className="hero__footer" data-hero>
              <p>Quality lighting and décor for hospitality, retail and design-led spaces.</p>
              <span>Scroll <span className="down">↓</span></span>
            </div>
          </div>
        </section>

        <section className="intro screen shell">
          <div className="section-label" data-reveal><span>01</span><span>About INLIGHT</span></div>
          <div className="intro__content">
            <h2 data-reveal>We are part design studio, part engineering partner, part manufacturer.</h2>
            <div className="intro__aside" data-reveal>
              <p>That mix is the point.</p>
              <p>It lets us protect an idea from the first conversation through the realities of production and the final space.</p>
            </div>
          </div>
        </section>

        <section className="difference screen shell" id="difference">
          <div className="section-label" data-reveal><span>02</span><span>How we are different</span></div>
          <div className="difference__layout">
            <div className="difference__list" data-reveal>
              {differences.map((item, index) => (
                <button
                  className={`difference-item ${activeDifference === index ? 'is-active' : ''}`}
                  key={item.number}
                  onMouseEnter={() => setActiveDifference(index)}
                  onFocus={() => setActiveDifference(index)}
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
            <div className="difference__visual" data-reveal>
              <img src={differences[activeDifference].image} alt="INLIGHT capability detail" />
              <span>{differences[activeDifference].title}</span>
            </div>
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
            <img src={images.enclave} alt="Finished lighting within an interior" />
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
