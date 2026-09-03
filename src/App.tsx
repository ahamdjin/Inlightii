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
  qualityOpen: 'https://images.unsplash.com/photo-1764961576606-ffb05ace4062?auto=format&fit=crop&w=1800&q=88',
  expertiseOpen: 'https://images.unsplash.com/photo-1773127962331-299cf7663a0b?auto=format&fit=crop&w=1800&q=88',
}

const content = {
  en: {
    nav: { company: 'Company', gallery: 'Gallery', capabilities: 'Capabilities', journal: 'Journal', contact: 'Contact', language: '中文' },
    hero: {
      eyebrow: 'Design · Engineering · Manufacturing',
      title: 'Crafted to a higher standard.',
      body: 'Quality lighting and décor for hospitality, retail and design-led spaces.',
      scroll: 'Scroll',
    },
    about: {
      label: 'About INLIGHT',
      title: 'We are part design studio, part engineering partner, part manufacturer.',
      lead: 'That mix is the point.',
      body: 'It lets us protect an idea from the first conversation through the realities of production and the final space.',
      reveal: 'Under the surface',
      hint: 'Move to reveal',
      finished: 'Finished space',
      making: 'Design · Engineering · Making',
    },
    difference: {
      label: 'How we are different',
      title: 'Four things we refuse to separate.',
      hint: 'Move across the principles',
      items: [
        { number: '01', title: 'Quality over quantity', note: 'A tighter standard for materials, finish and final execution.', meta: 'Material · Finish · Detail', image: images.qualityOpen },
        { number: '02', title: 'Global supply chain', note: 'A manufacturing network built around capability, consistency and scale.', meta: 'Network · Capability · Scale', image: images.supply },
        { number: '03', title: 'Industry expertise', note: 'Design and production knowledge shaped by complex hospitality and retail work.', meta: 'Hospitality · Retail · Custom', image: images.expertiseOpen },
        { number: '04', title: 'End-to-end manufacturing', note: 'From development and prototyping through production and quality control.', meta: 'Prototype · Production · QA', image: images.aboutTechnical },
      ],
    },
    work: {
      label: 'Selected work',
      title: 'Sometimes the best thing we can do is let the work speak.',
      body: 'Custom lighting and décor developed to feel native to the spaces they inhabit.',
      projects: [
        { title: 'Hospitality environments', type: 'Selected work', image: images.expertise },
        { title: 'Retail & display', type: 'Selected work', image: images.retail },
        { title: 'Lighting & décor', type: 'Selected work', image: images.standard },
      ],
    },
    process: {
      label: 'From idea to object',
      titleA: 'Creative on one side.',
      titleB: 'Technical on the other.',
      body: 'One continuous process connects the two.',
      items: [
        { number: '01', title: 'Design & development', copy: 'Ideas are shaped around proportion, material, performance and the atmosphere the finished piece should create.', image: images.aboutFinished },
        { number: '02', title: 'Engineering', copy: 'Design intent becomes buildable through technical development, detailing and production-minded problem solving.', image: images.aboutTechnical },
        { number: '03', title: 'Prototyping', copy: 'Scale, finish and construction are tested in the real world before a concept moves into repeatable production.', image: images.quality },
        { number: '04', title: 'Manufacturing', copy: 'A global supply network brings together the right processes, materials and specialists for each piece.', image: images.supply },
        { number: '05', title: 'Quality assurance', copy: 'The final standard is checked in the details — finish, consistency, performance and readiness for the space.', image: images.quality },
      ],
    },
    standard: {
      label: 'Our standard',
      body: 'Our job is not to make something that simply photographs well.',
      titleA: 'It has to be beautiful.',
      titleB: 'It also has to work.',
    },
    contact: {
      label: 'Start a conversation',
      prompt: 'Have something particular in mind?',
      action: "Let's talk",
    },
  },
  zh: {
    nav: { company: '关于我们', gallery: '项目', capabilities: '能力', journal: '日志', contact: '联系', language: 'EN' },
    hero: {
      eyebrow: '设计 · 工程 · 制造',
      title: '以更高标准，打造每一件作品。',
      body: '为酒店、零售与设计型空间提供高品质定制照明与装饰解决方案。',
      scroll: '向下',
    },
    about: {
      label: '关于 INLIGHT',
      title: '我们既是设计工作室，也是工程合作伙伴，更是制造者。',
      lead: '这种融合，正是我们的优势。',
      body: '从最初的想法，到工程实现、生产制造，再到最终空间，我们让设计意图始终保持完整。',
      reveal: '表面之下',
      hint: '移动查看',
      finished: '完成空间',
      making: '设计 · 工程 · 制造',
    },
    difference: {
      label: '我们的不同',
      title: '四件我们从不割裂的事。',
      hint: '移过每一项查看',
      items: [
        { number: '01', title: '品质，而非数量', note: '对材料、表面处理与最终细节保持更严格的标准。', meta: '材料 · 表面 · 细节', image: images.qualityOpen },
        { number: '02', title: '全球供应链', note: '围绕能力、一致性与规模建立的制造网络。', meta: '网络 · 能力 · 规模', image: images.supply },
        { number: '03', title: '行业经验', note: '来自复杂酒店、零售与定制项目的设计及生产经验。', meta: '酒店 · 零售 · 定制', image: images.expertiseOpen },
        { number: '04', title: '端到端制造', note: '从开发、打样到生产与质量控制，贯穿完整流程。', meta: '打样 · 生产 · 品控', image: images.aboutTechnical },
      ],
    },
    work: {
      label: '精选项目',
      title: '有时候，让作品本身说话，就是最好的表达。',
      body: '为每一个空间量身打造，让照明与装饰仿佛原本就属于那里。',
      projects: [
        { title: '酒店与餐饮空间', type: '精选项目', image: images.expertise },
        { title: '零售与展示空间', type: '精选项目', image: images.retail },
        { title: '照明与装饰', type: '精选项目', image: images.standard },
      ],
    },
    process: {
      label: '从想法到成品',
      titleA: '一边是创意。',
      titleB: '另一边是技术。',
      body: '一套连续的流程，将两者真正连接起来。',
      items: [
        { number: '01', title: '设计与开发', copy: '围绕比例、材料、性能与最终空间氛围，将最初的想法逐步塑造成完整方案。', image: images.aboutFinished },
        { number: '02', title: '工程深化', copy: '通过技术开发、结构细化与面向生产的解决方案，让设计真正可实现。', image: images.aboutTechnical },
        { number: '03', title: '原型与打样', copy: '在进入稳定生产前，对尺度、表面处理与结构进行真实测试。', image: images.quality },
        { number: '04', title: '制造', copy: '通过全球供应网络，为每个项目匹配合适的工艺、材料与制造能力。', image: images.supply },
        { number: '05', title: '质量保证', copy: '从表面、稳定性到性能，对最终成品进行细致检查，确保它真正适合最终空间。', image: images.quality },
      ],
    },
    standard: {
      label: '我们的标准',
      body: '我们的工作，不只是做出一件在照片里好看的作品。',
      titleA: '它必须足够美。',
      titleB: '也必须真正好用。',
    },
    contact: {
      label: '开始交流',
      prompt: '有一个特别的项目正在构思吗？',
      action: '联系我们',
    },
  },
}

type Language = keyof typeof content

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>
}

function App({ language = 'en' }: { language?: Language }) {
  const root = useRef<HTMLDivElement>(null)
  const processImageRef = useRef<HTMLImageElement>(null)
  const [activeDifference, setActiveDifference] = useState<number | null>(null)
  const copy = content[language]
  const isZh = language === 'zh'

  useEffect(() => {
    document.documentElement.lang = isZh ? 'zh-CN' : 'en'
    document.title = isZh ? 'INLIGHT International｜设计 · 工程 · 制造' : 'INLIGHT International'

    const lenis = new Lenis({ duration: 1, smoothWheel: true, wheelMultiplier: 0.88 })
    lenis.on('scroll', ScrollTrigger.update)
    const update = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
      lenis.destroy()
    }
  }, [isZh])

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
          img.src = copy.process.items[index].image
          img.dataset.index = String(index)
          gsap.fromTo(img, { opacity: 0, scale: 1.018 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' })
        },
      })
    }

    ScrollTrigger.refresh()
  }, { scope: root, dependencies: [language], revertOnUpdate: true })

  const hasFinePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

  const moveIntroLens = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!hasFinePointer()) return
    const stage = event.currentTarget
    const rect = stage.getBoundingClientRect()
    gsap.to(stage, {
      '--lens-x': `${event.clientX - rect.left}px`,
      '--lens-y': `${event.clientY - rect.top}px`,
      duration: 0.34,
      ease: 'power3.out',
      overwrite: 'auto',
    })
  }

  const moveDifferenceLight = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!hasFinePointer()) return
    const stage = event.currentTarget
    const rect = stage.getBoundingClientRect()
    stage.style.setProperty('--light-x', `${event.clientX - rect.left}px`)
    stage.style.setProperty('--light-y', `${event.clientY - rect.top}px`)
  }

  const closeDifferenceOnLeave = () => {
    if (hasFinePointer()) setActiveDifference(null)
  }

  return (
    <div className={`site ${isZh ? 'site--zh' : ''}`} ref={root}>
      <header className="nav">
        <a className="brand" href={isZh ? '/zh/#top' : '/#top'} aria-label="INLIGHT International home">
          <strong>INLIGHT</strong><span>International</span>
        </a>
        <nav className="nav__links" aria-label="Primary navigation">
          <a href="#difference">{copy.nav.company}</a>
          <a href="#work">{copy.nav.gallery}</a>
          <a href="#process">{copy.nav.capabilities}</a>
          <a href="/blog">{copy.nav.journal}</a>
          <a href={isZh ? '/' : '/zh/'}>{copy.nav.language}</a>
        </nav>
        <a className="nav__contact" href={isZh ? '#contact' : '/contact'}>{copy.nav.contact} <Arrow /></a>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero__image" data-image-shift>
            <img src={images.hero} alt={isZh ? '精致酒店空间中的定制照明' : 'Custom lighting in a refined hospitality interior'} />
            <div className="hero__shade" />
          </div>
          <div className="hero__copy shell" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', paddingTop: '76px', paddingBottom: '42px' }}>
            <p className="eyebrow light" data-hero style={{ marginBottom: '18px' }}>{copy.hero.eyebrow}</p>
            <h1 data-hero style={{ margin: '0 0 18px', maxWidth: isZh ? '760px' : '680px', fontSize: 'clamp(34px, 3.6vw, 52px)', lineHeight: 1.05, letterSpacing: isZh ? '-0.015em' : '-0.03em', fontWeight: 300 }}>
              {copy.hero.title}
            </h1>
            <div className="hero__footer" data-hero style={{ flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <p style={{ textAlign: 'center', width: 'min(440px, 100%)', fontSize: '12px' }}>{copy.hero.body}</p>
              <span>{copy.hero.scroll} <span className="down">↓</span></span>
            </div>
          </div>
        </section>

        <section className="intro screen shell">
          <div className="section-label" data-reveal><span>01</span><span>{copy.about.label}</span></div>
          <div className="intro__experience">
            <div className="intro__copy">
              <h2 data-reveal>{copy.about.title}</h2>
              <div className="intro__aside" data-reveal>
                <p>{copy.about.lead}</p>
                <p>{copy.about.body}</p>
              </div>
            </div>

            <div className="intro__lens-stage" data-reveal onPointerMove={moveIntroLens} onPointerEnter={(event) => hasFinePointer() && event.currentTarget.classList.add('is-active')} onPointerLeave={(event) => event.currentTarget.classList.remove('is-active')}>
              <img className="intro__lens-base" src={images.aboutFinished} alt="INLIGHT finished lighting environment" />
              <div className="intro__lens-overlay" aria-hidden="true"><img src={images.aboutTechnical} alt="" /></div>
              <div className="intro__lens-ring" aria-hidden="true"><span>{copy.about.reveal}</span></div>
              <div className="intro__lens-hint" aria-hidden="true">{copy.about.hint} <span>↗</span></div>
              <div className="intro__lens-caption"><span>{copy.about.finished}</span><span>{copy.about.making}</span></div>
            </div>
          </div>
        </section>

        <section className="difference screen shell difference--expand" id="difference" onPointerLeave={closeDifferenceOnLeave}>
          <div className="section-label" data-reveal><span>02</span><span>{copy.difference.label}</span></div>
          <div className="difference__head" data-reveal>
            <p>{copy.difference.title}</p>
            <span>{copy.difference.hint}</span>
          </div>

          <div className="difference-expand" data-reveal>
            {copy.difference.items.map((item, index) => {
              const isOpen = activeDifference === index
              return (
                <article className={`difference-row ${isOpen ? 'is-open' : ''}`} key={item.number}>
                  <button
                    className="difference-row__trigger"
                    type="button"
                    aria-expanded={isOpen}
                    onPointerEnter={() => hasFinePointer() && setActiveDifference(index)}
                    onFocus={() => setActiveDifference(index)}
                    onClick={() => setActiveDifference(isOpen ? null : index)}
                  >
                    <span className="difference-row__number">{item.number}</span>
                    <strong>{item.title}</strong>
                    <span className="difference-row__mark" aria-hidden="true">{isOpen ? '—' : '+'}</span>
                  </button>

                  <div className="difference-row__reveal" aria-hidden={!isOpen}>
                    <div className="difference-row__reveal-inner">
                      <div className="difference-row__visual" onPointerMove={moveDifferenceLight}>
                        <img src={item.image} alt="" />
                        <div className="difference-row__light" aria-hidden="true" />
                        <div className="difference-row__content">
                          <p>{item.note}</p>
                          <span>{item.meta}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="work" id="work">
          <div className="work__intro screen shell">
            <div className="section-label light" data-reveal><span>03</span><span>{copy.work.label}</span></div>
            <div className="work__intro-copy">
              <h2 data-reveal>{copy.work.title}</h2>
              <p data-reveal>{copy.work.body}</p>
            </div>
          </div>

          {copy.work.projects.map((project, index) => (
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
            <div className="section-label"><span>04</span><span>{copy.process.label}</span></div>
            <h2>{copy.process.titleA}<br /><em>{copy.process.titleB}</em></h2>
            <p>{copy.process.body}</p>
          </div>

          <div className="process__body">
            <div className="process__sticky">
              <div className="process__image" data-image-shift>
                <img ref={processImageRef} data-index="0" src={copy.process.items[0].image} alt="INLIGHT process" />
              </div>
            </div>
            <div className="process__steps">
              {copy.process.items.map((step) => (
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
            <div className="section-label light" data-reveal><span>05</span><span>{copy.standard.label}</span></div>
            <div className="standard__statement" data-reveal>
              <p>{copy.standard.body}</p>
              <h2>{copy.standard.titleA}<br />{copy.standard.titleB}</h2>
            </div>
          </div>
        </section>

        <section className="contact screen shell" id="contact">
          <div className="section-label" data-reveal><span>06</span><span>{copy.contact.label}</span></div>
          <div className="contact__center" data-reveal>
            <p>{copy.contact.prompt}</p>
            <a href="mailto:info@inlightii.com">{copy.contact.action} <Arrow /></a>
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
