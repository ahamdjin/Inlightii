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

type Language = 'en' | 'zh'

const copy = {
  en: {
    nav: { home: 'Home', journal: 'Journal', contact: 'Contact', language: '中文' },
    hero: {
      kicker: 'INLIGHT Journal',
      topics: 'Light · Material · Making',
      title: <>Notes on the things behind<br />a better finished object.</>,
      body: 'Observations from the space between design, engineering and manufacturing.',
      bottom: 'Ideas, process and perspective',
      scroll: 'Scroll ↓',
    },
    feature: {
      label: 'Featured',
      index: '01 / Journal',
      hover: 'Open story ↗',
      meta: 'Perspective · 7 min read',
      date: 'September 2026',
      title: 'Beautiful is only half the job.',
      body: 'The strongest lighting pieces live comfortably in two worlds: they have to create emotion in the finished space, and they have to survive the practical realities of engineering, production and use.',
      action: 'Read the story',
    },
    latest: '02 / Latest',
    filters: ['All', 'Light', 'Material', 'Making'],
    noteIndex: '03 / A small note',
    noteLead: 'We are interested in the entire life of an object.',
    noteTitle: 'Not only how it looks under perfect light — but how it gets there.',
    noteAction: 'Start a conversation',
    readArticle: 'Read article',
    posts: [
      { number: '01', category: 'Light', title: 'Why good lighting is felt before it is noticed', excerpt: 'A look at proportion, reflection, warmth and the quiet decisions that shape atmosphere.', image: journalImages.hospitality, read: '5 min read' },
      { number: '02', category: 'Material', title: 'The details that separate an object from a product', excerpt: 'Glass, metal, finish and tolerance — where perceived quality is actually built.', image: journalImages.material, read: '4 min read' },
      { number: '03', category: 'Making', title: 'What changes when design stays close to manufacturing', excerpt: 'Why fewer handoffs can protect an idea all the way from sketch to shipment.', image: journalImages.studio, read: '6 min read' },
      { number: '04', category: 'Hospitality', title: 'Designing lighting for spaces people remember', excerpt: 'The relationship between decorative fixtures, architecture and the mood of a room.', image: journalImages.feature, read: '5 min read' },
      { number: '05', category: 'Retail', title: 'When the fixture becomes part of the display', excerpt: 'A retail environment works best when light and product presentation feel like one system.', image: journalImages.retail, read: '4 min read' },
      { number: '06', category: 'Process', title: 'Prototype early. Learn while changes are still cheap.', excerpt: 'The practical value of seeing scale, construction and finish in the real world before production.', image: journalImages.process, read: '3 min read' },
    ],
  },
  zh: {
    nav: { home: '首页', journal: '日志', contact: '联系', language: 'EN' },
    hero: {
      kicker: 'INLIGHT 日志',
      topics: '光 · 材料 · 制造',
      title: <>关于一件更好成品<br />背后的思考。</>,
      body: '记录设计、工程与制造交汇处的观察与思考。',
      bottom: '想法、过程与视角',
      scroll: '向下 ↓',
    },
    feature: {
      label: '精选',
      index: '01 / 日志',
      hover: '阅读文章 ↗',
      meta: '观点 · 7 分钟阅读',
      date: '2026年9月',
      title: '好看，只完成了一半。',
      body: '真正优秀的照明作品需要同时存在于两个世界：它既要在最终空间里创造情绪，也要经得起工程、生产与长期使用的现实考验。',
      action: '阅读全文',
    },
    latest: '02 / 最新文章',
    filters: ['全部', '光', '材料', '制造'],
    noteIndex: '03 / 一点想法',
    noteLead: '我们关心一件作品完整的生命周期。',
    noteTitle: '不仅是它在完美光线下看起来如何，更包括它如何一步步走到那里。',
    noteAction: '开始交流',
    readArticle: '阅读文章',
    posts: [
      { number: '01', category: '光', title: '为什么好的照明往往先被感受到，之后才被注意到', excerpt: '从比例、反射、色温，到那些悄无声息塑造氛围的细节决定。', image: journalImages.hospitality, read: '5 分钟阅读' },
      { number: '02', category: '材料', title: '让一件物件真正成为产品的，是这些细节', excerpt: '玻璃、金属、表面处理与公差——品质感真正被建立起来的地方。', image: journalImages.material, read: '4 分钟阅读' },
      { number: '03', category: '制造', title: '当设计始终靠近制造，事情会发生什么变化', excerpt: '更少的交接，如何从草图到出货一路保护最初的设计意图。', image: journalImages.studio, read: '6 分钟阅读' },
      { number: '04', category: '酒店', title: '为让人记住的空间设计照明', excerpt: '装饰灯具、建筑与空间情绪之间的关系。', image: journalImages.feature, read: '5 分钟阅读' },
      { number: '05', category: '零售', title: '当灯具本身也成为展示的一部分', excerpt: '当光与产品陈列像一个完整系统那样协同，零售空间才真正成立。', image: journalImages.retail, read: '4 分钟阅读' },
      { number: '06', category: '流程', title: '尽早打样，在修改仍然成本较低时学习', excerpt: '在量产前真实看到尺度、结构与表面处理，所带来的实际价值。', image: journalImages.process, read: '3 分钟阅读' },
    ],
  },
}

function BlogPage({ language = 'en' }: { language?: Language }) {
  const isZh = language === 'zh'
  const text = copy[language]
  const base = isZh ? '/zh' : ''

  useEffect(() => {
    document.documentElement.lang = isZh ? 'zh-CN' : 'en'
    document.title = isZh ? '日志 | INLIGHT International' : 'Journal | INLIGHT International'
    window.scrollTo(0, 0)
  }, [isZh])

  const moveGlow = (event: ReactPointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--glow-x', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--glow-y', `${event.clientY - rect.top}px`)
  }

  return (
    <div className={`page blog-page ${isZh ? 'page--zh' : ''}`} id="journal">
      <header className="page-nav page-nav--dark">
        <a className="page-brand page-brand--dark" href={`${base}/`} aria-label="INLIGHT International home">
          <strong>INLIGHT</strong><span>International</span>
        </a>
        <nav>
          <a href={`${base}/`}>{text.nav.home}</a>
          <a className="is-current" href={`${base}/blog`}>{text.nav.journal}</a>
          <a href={`${base}/contact`}>{text.nav.contact}</a>
          <a href={isZh ? '/blog' : '/zh/blog'}>{text.nav.language}</a>
        </nav>
      </header>

      <main>
        <section className="blog-hero page-shell" onPointerMove={moveGlow}>
          <div className="blog-hero__glow" aria-hidden="true" />
          <div className="blog-hero__top">
            <span className="page-kicker">{text.hero.kicker}</span>
            <span>{text.hero.topics}</span>
          </div>
          <div className="blog-hero__center">
            <h1>{text.hero.title}</h1>
            <p>{text.hero.body}</p>
          </div>
          <div className="blog-hero__bottom"><span>{text.hero.bottom}</span><span>{text.hero.scroll}</span></div>
        </section>

        <section className="blog-feature page-shell">
          <div className="blog-feature__label"><span>{text.feature.label}</span><span>{text.feature.index}</span></div>
          <article className="blog-feature__article">
            <div className="blog-feature__image" onPointerMove={moveGlow}>
              <img src={journalImages.feature} alt={isZh ? '精致酒店空间中的雕塑感照明' : 'Sculptural lighting in a refined hospitality interior'} />
              <div className="blog-feature__light" aria-hidden="true" />
              <span className="blog-feature__hover">{text.feature.hover}</span>
            </div>
            <div className="blog-feature__copy">
              <div><span>{text.feature.meta}</span><span>{text.feature.date}</span></div>
              <h2>{text.feature.title}</h2>
              <p>{text.feature.body}</p>
              <button type="button">{text.feature.action} <span>↗</span></button>
            </div>
          </article>
        </section>

        <section className="blog-index page-shell" id="articles">
          <div className="blog-index__head">
            <span className="page-index">{text.latest}</span>
            <div className="blog-index__filters">{text.filters.map((filter, index) => <button className={index === 0 ? 'is-active' : ''} key={filter}>{filter}</button>)}</div>
          </div>

          <div className="blog-grid">
            {text.posts.map((post) => (
              <article className="blog-card" key={post.number}>
                <div className="blog-card__image">
                  <img src={post.image} alt="" />
                  <span>{post.number}</span>
                </div>
                <div className="blog-card__meta"><span>{post.category}</span><span>{post.read}</span></div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <button type="button">{text.readArticle} <span>↗</span></button>
              </article>
            ))}
          </div>
        </section>

        <section className="blog-note page-shell">
          <span className="page-index">{text.noteIndex}</span>
          <div>
            <p>{text.noteLead}</p>
            <h2>{text.noteTitle}</h2>
          </div>
          <a href={`${base}/contact`}>{text.noteAction} <span>↗</span></a>
        </section>
      </main>

      <footer className="page-footer page-shell">
        <a className="page-brand page-brand--dark" href={`${base}/`}><strong>INLIGHT</strong><span>International</span></a>
        <div><a href={`${base}/contact`}>{text.nav.contact}</a><a href="mailto:info@inlightii.com">info@inlightii.com</a><span>© {new Date().getFullYear()}</span></div>
      </footer>
    </div>
  )
}

export default BlogPage
