const VISUALIZER_URL = 'https://inlight-lighting-visualizer.replit.app'

function VisualizerCTA() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const isZh = path === '/zh' || path.startsWith('/zh/')

  return (
    <a
      className="visualizer-cta"
      href={VISUALIZER_URL}
      target="_blank"
      rel="noreferrer"
      aria-label={isZh ? '打开灯光可视化工具' : 'Open the INLIGHT lighting visualizer'}
    >
      <span className="visualizer-cta__desktop">{isZh ? '灯光可视化' : 'Try the Visualizer'}</span>
      <span className="visualizer-cta__mobile">{isZh ? '可视化' : 'Visualizer'}</span>
      <span className="visualizer-cta__arrow" aria-hidden="true">↗</span>
    </a>
  )
}

export default VisualizerCTA
