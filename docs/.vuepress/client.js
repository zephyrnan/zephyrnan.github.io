import { defineClientConfig } from '@vuepress/client'
import ValineComment from './components/ValineComment.vue'
import PostCard from './components/PostCard.vue'
import { onMounted } from 'vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('ValineComment', ValineComment)
    app.component('PostCard', PostCard)
    console.log('✅ ValineComment 组件已注册')
    console.log('✅ PostCard 组件已注册')
  },
  setup() {
    onMounted(() => {
      console.log('🎨 特效初始化开始...')

      // 检测是否为移动设备
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768

      // 点击特效
      const initClickEffect = () => {
        if (document.getElementById("click-effect-container")) return
        const container = document.createElement('div')
        container.id = 'click-effect-container'
        container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;'
        document.body.appendChild(container)

        const words = ['💙', '🌊', '✨', '💫', '🌟', '⭐', '💎', '🔷', '❤️']

        document.addEventListener('click', (e) => {
          const el = document.createElement('div')
          el.innerHTML = words[Math.floor(Math.random() * words.length)]
          const x = e.clientX + window.pageXOffset
          const y = e.clientY + window.pageYOffset
          el.style.cssText = `position:absolute;left:${x}px;top:${y}px;font-size:24px;pointer-events:none;animation:riseAndFade 1.5s ease-out forwards;user-select:none;z-index:9999;`
          container.appendChild(el)

          setTimeout(() => el.remove(), 1500)
        })

        console.log('✅ 点击特效已加载')
      }

      // 背景粒子特效（性能优化版）
      const initBackgroundEffect = () => {
        if (document.getElementById("bg-canvas")) return
        const canvas = document.createElement('canvas')
        canvas.id = 'bg-canvas'
        canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.8;'
        document.body.insertBefore(canvas, document.body.firstChild)

        const ctx = canvas.getContext('2d')
        let width = canvas.width = window.innerWidth
        let height = canvas.height = window.innerHeight

        console.log('📐 Canvas 尺寸:', width, 'x', height)

        window.addEventListener('resize', () => {
          width = canvas.width = window.innerWidth
          height = canvas.height = window.innerHeight
        })

        const particles = []
        // 根据设备类型调整粒子数量
        const particleCount = isMobile ? 20 : 40

        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            radius: Math.random() * 2 + 1
          })
        }

        console.log('🎯 创建了', particleCount, '个粒子')

        let mouseX = 0, mouseY = 0
        document.addEventListener('mousemove', (e) => {
          mouseX = e.clientX
          mouseY = e.clientY
        })

        const animate = () => {
          ctx.clearRect(0, 0, width, height)

          particles.forEach(p => {
            p.x += p.vx
            p.y += p.vy

            if (p.x < 0 || p.x > width) p.vx *= -1
            if (p.y < 0 || p.y > height) p.vy *= -1

            const dx = mouseX - p.x
            const dy = mouseY - p.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < 100) {
              p.vx += dx * 0.0001
              p.vy += dy * 0.0001
            }

            ctx.beginPath()
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
            ctx.fillStyle = 'rgba(30, 136, 229, 0.6)'
            ctx.fill()
          })

          // 连线优化：减少连线距离，提升性能
          for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
              const dx = particles[i].x - particles[j].x
              const dy = particles[i].y - particles[j].y
              const dist = Math.sqrt(dx * dx + dy * dy)

              if (dist < 120) {
                ctx.beginPath()
                ctx.moveTo(particles[i].x, particles[i].y)
                ctx.lineTo(particles[j].x, particles[j].y)
                ctx.strokeStyle = `rgba(30, 136, 229, ${0.2 * (1 - dist / 120)})`
                ctx.lineWidth = 0.8
                ctx.stroke()
              }
            }
          }

          requestAnimationFrame(animate)
        }

        animate()
        console.log('✅ 背景粒子动画已开始')
      }

      // 返回顶部按钮
      const initBackToTop = () => {
        // 移除所有可能存在的旧按钮（防止重复）
        const oldButtons = document.querySelectorAll('#back-to-top')
        oldButtons.forEach(btn => btn.remove())

        const btn = document.createElement('div')
        btn.id = 'back-to-top'
        btn.innerHTML = '↑'
        btn.style.cssText = `
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 45px;
          height: 45px;
          background: linear-gradient(135deg, #1e88e5 0%, #1565c0 100%);
          color: white;
          border-radius: 50%;
          display: none;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          cursor: pointer;
          z-index: 9998;
          box-shadow: 0 4px 15px rgba(30, 136, 229, 0.4);
          transition: all 0.3s ease;
        `
        document.body.appendChild(btn)

        window.addEventListener('scroll', () => {
          if (window.scrollY > 300) {
            btn.style.display = 'flex'
          } else {
            btn.style.display = 'none'
          }
        })

        btn.addEventListener('click', () => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        })

        btn.addEventListener('mouseenter', () => {
          btn.style.transform = 'scale(1.1) translateY(-3px)'
          btn.style.boxShadow = '0 6px 20px rgba(30, 136, 229, 0.6)'
        })

        btn.addEventListener('mouseleave', () => {
          btn.style.transform = 'scale(1) translateY(0)'
          btn.style.boxShadow = '0 4px 15px rgba(30, 136, 229, 0.4)'
        })

        console.log('✅ 返回顶部按钮已加载')
      }

      // 页面加载进度条
      const initProgressBar = () => {
        if (document.getElementById("reading-progress")) return
        const bar = document.createElement('div')
        bar.id = 'reading-progress'
        bar.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          height: 3px;
          background: linear-gradient(90deg, #1e88e5 0%, #42a5f5 100%);
          z-index: 10000;
          transition: width 0.1s ease;
          box-shadow: 0 2px 4px rgba(30, 136, 229, 0.3);
        `
        document.body.appendChild(bar)

        window.addEventListener('scroll', () => {
          const scrollTop = window.scrollY
          const docHeight = document.documentElement.scrollHeight - window.innerHeight
          const progress = (scrollTop / docHeight) * 100
          bar.style.width = progress + '%'
        })

        console.log('✅ 阅读进度条已加载')
      }

      // 添加动画样式
      const initStyles = () => {
        if (document.getElementById("custom-effects-style")) return
        const style = document.createElement('style')
      style.textContent = `
        @keyframes riseAndFade {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          50% { transform: translateY(-50px) scale(1.2); opacity: 0.8; }
          100% { transform: translateY(-100px) scale(0.8); opacity: 0; }
        }
        html.dark #bg-canvas { opacity: 0.4 !important; }
        html.dark #back-to-top {
          background: linear-gradient(135deg, #42a5f5 0%, #1e88e5 100%) !important;
        }
        #back-to-top:active {
          transform: scale(0.95) !important;
        }
        @media (max-width: 768px) {
          #back-to-top {
            bottom: 20px !important;
            right: 20px !important;
            width: 40px !important;
            height: 40px !important;
            font-size: 20px !important;
          }
        }
      `
      style.id = "custom-effects-style"
        document.head.appendChild(style)
        console.log("✅ 自定义样式已加载")
      }

      
        initStyles()

      // 延迟初始化，确保DOM完全加载
      setTimeout(() => {
        initStyles()
        initClickEffect()
        if (!isMobile || window.innerWidth >= 1024) {
          // 大屏幕或桌面设备才启用粒子效果
          initBackgroundEffect()
        }
        initProgressBar()
        console.log('🎉 所有特效初始化完成！')
      }, 100)
    })
  },
})
