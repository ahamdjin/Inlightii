import { useEffect, type FormEvent, type PointerEvent as ReactPointerEvent } from 'react'

const image = (name: string) => `/images/home/${name}`

const contactImages = {
  hero: image('ChatGPT%20Image%20Sept%203%202026%20(3)%20(1).webp'),
  detail: image('ChatGPT%20Image%20Sept%203%202026%20(1).webp'),
}

type Language = 'en' | 'zh'

const copy = {
  en: {
    nav: { home: 'Home', journal: 'Journal', contact: 'Contact', language: '中文' },
    hero: {
      kicker: 'Start a conversation',
      title: <>Bring the idea.<br />We’ll help bring it to light.</>,
      body: 'Custom lighting and décor begins with a good conversation — about the space, the object, the constraints and what should feel exceptional.',
      hint: 'Move through the light',
    },
    brief: {
      index: '01 / Project brief',
      title: 'Tell us enough to start thinking.',
      intro: 'You do not need a finished specification. A sketch, reference, deadline or simply the problem you are trying to solve is enough to begin.',
      fields: {
        name: 'Your name',
        namePlaceholder: 'Name',
        email: 'Email',
        company: 'Company / studio',
        companyPlaceholder: 'Optional',
        project: 'What are you working on?',
        projectPlaceholder: 'Select a project type',
        projectOptions: ['Hospitality', 'Retail', 'Residential', 'Custom lighting', 'Decor / private label', 'Something else'],
        message: 'A little about the project',
        messagePlaceholder: 'Scope, timing, quantities, references, constraints — whatever is useful.',
        submit: 'Send project brief',
      },
      bestFor: 'Best for',
      bestForBody: 'Custom development, sourcing, engineering and manufacturing conversations.',
    },
    next: {
      index: '02 / What happens next',
      lead: 'Simple by design.',
      steps: [
        { number: '01', title: 'We review.', body: 'We look at the idea, scope and where INLIGHT can add the most value.' },
        { number: '02', title: 'We talk.', body: 'A focused conversation around design intent, feasibility, timing and next steps.' },
        { number: '03', title: 'We define.', body: 'A clear path from concept through development, production and delivery.' },
      ],
    },
    close: { lead: 'Good light changes a space.', action: 'Let’s make something worth noticing.' },
    labels: { email: 'Email' },
  },
  zh: {
    nav: { home: '首页', journal: '日志', contact: '联系', language: 'EN' },
    hero: {
      kicker: '开始交流',
      title: <>把想法带来。<br />我们让它真正成为光。</>,
      body: '定制照明与装饰，始于一次好的沟通——关于空间、作品、限制条件，以及什么才值得被做到更好。',
      hint: '移动，穿过光线',
    },
    brief: {
      index: '01 / 项目简介',
      title: '告诉我们足够的信息，让思考可以开始。',
      intro: '你不需要先准备完整规格。一张草图、一张参考图、一个时间节点，甚至只是你正在尝试解决的问题，都足以开始。',
      fields: {
        name: '姓名',
        namePlaceholder: '姓名',
        email: '邮箱',
        company: '公司 / 工作室',
        companyPlaceholder: '选填',
        project: '你正在进行什么项目？',
        projectPlaceholder: '选择项目类型',
        projectOptions: ['酒店与餐饮', '零售', '住宅', '定制照明', '装饰 / 私牌', '其他'],
        message: '简单介绍一下项目',
        messagePlaceholder: '范围、时间、数量、参考、限制条件——任何有帮助的信息都可以。',
        submit: '发送项目简介',
      },
      bestFor: '适合讨论',
      bestForBody: '定制开发、采购、工程深化与制造相关项目。',
    },
    next: {
      index: '02 / 接下来会发生什么',
      lead: '刻意保持简单。',
      steps: [
        { number: '01', title: '我们先审阅。', body: '了解想法、项目范围，以及 INLIGHT 最能创造价值的地方。' },
        { number: '02', title: '然后交流。', body: '围绕设计意图、可行性、时间与下一步进行一次聚焦的沟通。' },
        { number: '03', title: '最后明确路径。', body: '从概念、开发到生产与交付，形成清晰可执行的路线。' },
      ],
    },
    close: { lead: '好的光，会改变一个空间。', action: '一起做一件值得被记住的作品。' },
    labels: { email: '邮箱' },
  },
}

function ContactPage({ language = 'en' }: { language?: Language }) {
  const isZh = language === 'zh'
  const text = copy[language]
  const base = isZh ? '/zh' : ''

  useEffect(() => {
    document.documentElement.lang = isZh ? 'zh-CN' : 'en'
    document.title = isZh ? '联系 | INLIGHT International' : 'Contact | INLIGHT International'
    window.scrollTo(0, 0)
  }, [isZh])

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

    const subject = encodeURIComponent(isZh ? `来自 ${name || company || 'INLIGHT 网站'} 的项目咨询` : `Project inquiry from ${name || company || 'INLIGHT website'}`)
    const body = encodeURIComponent(
      isZh
        ? `姓名: ${name}\n邮箱: ${email}\n公司: ${company}\n项目类型: ${project}\n\n项目简介:\n${message}`
        : `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nProject type: ${project}\n\nProject brief:\n${message}`,
    )

    window.location.href = `mailto:info@inlightii.com?subject=${subject}&body=${body}`
  }

  return (
    <div className={`page contact-page ${isZh ? 'page--zh' : ''}`}>
      <header className="page-nav page-nav--light">
        <a className="page-brand" href={`${base}/`} aria-label="INLIGHT International home">
          <strong>INLIGHT</strong><span>International</span>
        </a>
        <nav>
          <a href={`${base}/`}>{text.nav.home}</a>
          <a href={`${base}/blog`}>{text.nav.journal}</a>
          <a className="is-current" href={`${base}/contact`}>{text.nav.contact}</a>
          <a href={isZh ? '/contact' : '/zh/contact'}>{text.nav.language}</a>
        </nav>
      </header>

      <main>
        <section className="contact-hero" onPointerMove={moveLight}>
          <div className="contact-hero__base">
            <img src={contactImages.hero} alt={isZh ? '精致室内空间中的雕塑感定制照明' : 'Sculptural custom lighting in a refined interior'} />
          </div>
          <div className="contact-hero__lit" aria-hidden="true">
            <img src={contactImages.hero} alt="" />
          </div>
          <div className="contact-hero__shade" />

          <div className="contact-hero__content">
            <span className="page-kicker">{text.hero.kicker}</span>
            <h1>{text.hero.title}</h1>
            <p>{text.hero.body}</p>
            <a className="contact-hero__email" href="mailto:info@inlightii.com">info@inlightii.com <span>↗</span></a>
          </div>

          <div className="contact-hero__hint">{text.hero.hint}</div>
        </section>

        <section className="contact-brief page-shell">
          <div className="contact-brief__intro">
            <div>
              <span className="page-index">{text.brief.index}</span>
              <h2>{text.brief.title}</h2>
            </div>
            <p>{text.brief.intro}</p>
          </div>

          <div className="contact-brief__layout">
            <form className="contact-form" onSubmit={submitBrief}>
              <label>
                <span>{text.brief.fields.name}</span>
                <input type="text" name="name" placeholder={text.brief.fields.namePlaceholder} required />
              </label>
              <label>
                <span>{text.brief.fields.email}</span>
                <input type="email" name="email" placeholder="you@company.com" required />
              </label>
              <label>
                <span>{text.brief.fields.company}</span>
                <input type="text" name="company" placeholder={text.brief.fields.companyPlaceholder} />
              </label>
              <label>
                <span>{text.brief.fields.project}</span>
                <select name="project" defaultValue="">
                  <option value="" disabled>{text.brief.fields.projectPlaceholder}</option>
                  {text.brief.fields.projectOptions.map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>
              <label className="contact-form__message">
                <span>{text.brief.fields.message}</span>
                <textarea name="message" rows={5} placeholder={text.brief.fields.messagePlaceholder} required />
              </label>
              <button type="submit">{text.brief.fields.submit} <span>↗</span></button>
            </form>

            <aside className="contact-aside">
              <div className="contact-aside__image">
                <img src={contactImages.detail} alt={isZh ? '玻璃与黄铜照明工艺细节' : 'Close detail of glass and brass lighting craftsmanship'} />
              </div>
              <div className="contact-aside__details">
                <div><span>{text.labels.email}</span><a href="mailto:info@inlightii.com">info@inlightii.com</a></div>
                <div><span>{text.brief.bestFor}</span><p>{text.brief.bestForBody}</p></div>
              </div>
            </aside>
          </div>
        </section>

        <section className="contact-next page-shell">
          <div className="contact-next__head">
            <span className="page-index">{text.next.index}</span>
            <p>{text.next.lead}</p>
          </div>
          <div className="contact-next__steps">
            {text.next.steps.map((step) => <article key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.body}</p></article>)}
          </div>
        </section>

        <section className="contact-close">
          <div className="contact-close__beam" />
          <p>{text.close.lead}</p>
          <a href="mailto:info@inlightii.com">{text.close.action} <span>↗</span></a>
        </section>
      </main>

      <footer className="page-footer page-shell">
        <a className="page-brand page-brand--dark" href={`${base}/`}><strong>INLIGHT</strong><span>International</span></a>
        <div><a href={`${base}/blog`}>{text.nav.journal}</a><a href="mailto:info@inlightii.com">info@inlightii.com</a><span>© {new Date().getFullYear()}</span></div>
      </footer>
    </div>
  )
}

export default ContactPage
