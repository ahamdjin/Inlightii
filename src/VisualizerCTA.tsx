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
      aria-label={isZh ? '上传空间图片，为你的空间匹配 INLIGHT 灯具' : 'Upload your space and discover an INLIGHT light'}
    >
      <span className="visualizer-cta__light" aria-hidden="true"><i /></span>
      <span className="visualizer-cta__desktop">{isZh ? '点亮你的空间' : 'Light Your Space'}</span>
      <span className="visualizer-cta__mobile">{isZh ? '点亮空间' : 'Light Your Space'}</span>
      <span className="visualizer-cta__arrow" aria-hidden="true">↗</span>
    </a>
  )
}

export default VisualizerCTA
