export function initCardBackground(canvas, { showAnimatedGrid = true } = {}) {
  if (!canvas) return

  const context = canvas.getContext('2d')
  if (!context) return

  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
  const stars = Array.from({ length: 105 }, () => ({
    x: Math.random(),
    y: Math.random(),
    radius: 0.45 + Math.random() * 1.15,
    phase: Math.random() * Math.PI * 2,
    speed: 0.35 + Math.random() * 0.55,
    drift: 0.000004 + Math.random() * 0.000006,
  }))

  let width = 0
  let height = 0
  let pixelRatio = 1
  let frameId = 0
  let lastFrame = 0
  let elapsed = 0
  let lastTime = 0

  const resize = () => {
    const bounds = canvas.getBoundingClientRect()
    width = bounds.width
    height = bounds.height
    pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)
    canvas.width = Math.round(width * pixelRatio)
    canvas.height = Math.round(height * pixelRatio)
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    draw(performance.now(), true)
  }

  const readAccent = () => {
    const color = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim()
    const match = color.match(/^#([\da-f]{3}|[\da-f]{6})$/i)
    if (!match) return '138, 164, 255'
    const value = match[1]
    const full = value.length === 3 ? [...value].map((part) => part + part).join('') : value
    return `${parseInt(full.slice(0, 2), 16)}, ${parseInt(full.slice(2, 4), 16)}, ${parseInt(full.slice(4, 6), 16)}`
  }

  const drawStars = (time) => {
    stars.forEach((star) => {
      const rotation = motionPreference.matches ? 0 : elapsed * star.drift
      const x = (star.x + rotation) % 1
      const y = star.y + Math.sin(rotation * Math.PI * 2 + star.phase) * 0.004
      const twinkle = motionPreference.matches ? 0.56 : 0.36 + (Math.sin(time * 0.00016 * star.speed + star.phase) + 1) * 0.27
      context.globalAlpha = twinkle
      context.fillStyle = document.documentElement.hasAttribute('data-theme') ? '#dce6ff' : '#315fc4'
      context.beginPath()
      context.arc(x * width, y * height, star.radius, 0, Math.PI * 2)
      context.fill()
    })
    context.globalAlpha = 1
  }

  const drawAnimatedGrid = (time) => {
    const accent = readAccent()
    const horizon = height * 0.31
    const depthHeight = height - horizon
    const phase = motionPreference.matches ? 0 : time * 0.00055
    const lanes = 30
    const rows = 25

    context.lineWidth = 0.8
    context.lineCap = 'round'

    for (let lane = -lanes; lane <= lanes; lane += 2) {
      context.beginPath()
      for (let point = 0; point <= 32; point += 1) {
        const depth = point / 32
        const wave = Math.sin(lane * 0.16 + phase + depth * 7.5) * depth * 10
        const ripple = Math.sin(phase * 1.35 + depth * 11 - lane * 0.08) * depth * 5
        const x = width / 2 + lane * width * 0.022 * depth + wave + ripple
        const y = horizon + depth * depthHeight
        if (point === 0) context.moveTo(x, y)
        else context.lineTo(x, y)
      }
      context.strokeStyle = `rgba(${accent}, 0.22)`
      context.stroke()
    }

    for (let row = 0; row <= rows; row += 1) {
      const depth = (row / rows) ** 1.55
      const y = horizon + depth * depthHeight
      context.beginPath()
      for (let point = 0; point <= 64; point += 1) {
        const across = point / 64
        const x = across * width
        const distanceFromCenter = (across - 0.5) * 2
        const wave = Math.sin(distanceFromCenter * 4.6 + phase * 1.5 + depth * 5) * depth * 10
        const ripple = Math.sin(distanceFromCenter * 8 - phase + depth * 10) * depth * 3
        const projectedY = y + wave + ripple
        if (point === 0) context.moveTo(x, projectedY)
        else context.lineTo(x, projectedY)
      }
      context.strokeStyle = `rgba(${accent}, ${0.12 + depth * 0.19})`
      context.stroke()
    }
  }

  function draw(time, force = false) {
    if (!force && !motionPreference.matches && time - lastFrame < 32) {
      frameId = requestAnimationFrame(draw)
      return
    }
    if (lastTime) elapsed += Math.min(time - lastTime, 48)
    lastTime = time
    lastFrame = time

    context.clearRect(0, 0, width, height)
    drawStars(time)
    if (showAnimatedGrid) drawAnimatedGrid(time)

    if (!motionPreference.matches && !document.hidden) frameId = requestAnimationFrame(draw)
    else frameId = 0
  }

  const start = () => {
    if (!frameId) frameId = requestAnimationFrame(draw)
  }

  const onVisibilityChange = () => {
    if (document.hidden) {
      cancelAnimationFrame(frameId)
      frameId = 0
    } else {
      start()
    }
  }

  const onResize = () => resize()
  window.addEventListener('resize', onResize, { passive: true })
  document.addEventListener('visibilitychange', onVisibilityChange)
  motionPreference.addEventListener?.('change', resize)
  resize()
  if (!motionPreference.matches) start()

  return () => {
    cancelAnimationFrame(frameId)
    window.removeEventListener('resize', onResize)
    document.removeEventListener('visibilitychange', onVisibilityChange)
    motionPreference.removeEventListener?.('change', resize)
  }
}
