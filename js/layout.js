;(function () {
  const pageDom = document.getElementById('website')
  const mainDom = document.querySelector('main')
  const _webHeader = `
<header>
  <h1><a href="./">CSS Tips</a></h1>
  <nav>
    <a href="./">首页</a>
    <a href="./about.html">关于我</a>
    <div id="btn-theme" class="${setThemeIcon()}">
      <div class="sun-rays"></div>
      <div class="main-circle"></div>
      <div class="spread"></div>
    </div>
  </nav>
</header>`

  const _webFooter = `
<footer>
  <h2>Create by <a href="https://github.com/web-abin" rel="nofollow external" target="_blank"/>web-abin</a></h2>
  <a href="https://web-abin.github.io/abinWeb/tools/" rel="nofollow external" target="_blank"/>前端助手</a>
  <a href="https://juejin.cn/user/994399097982728" rel="nofollow external" target="_blank"/>掘金主页</a>
  <a href="https://blog.csdn.net/qq_38974163?type=blog" rel="nofollow external" target="_blank"/>CSDN</a>
</footer>`

  pageDom.insertAdjacentHTML('afterbegin', _webHeader)
  pageDom.insertAdjacentHTML('beforeend', _webFooter)

  document.body.setAttribute(
    'theme',
    window.localStorage.getItem('CSS_TIPS_THEME')
  )
  // 设置主题
  const btnTheme = document.getElementById('btn-theme')
  btnTheme.onclick = function () {
    const newTheme =
      window.localStorage.getItem('CSS_TIPS_THEME') === 'dark'
        ? 'light'
        : 'dark'
    window.localStorage.setItem('CSS_TIPS_THEME', newTheme)
    btnTheme.className = setThemeIcon()

    changeTheme(newTheme)
  }

  function changeTheme(newTheme) {
    if (!'startViewTransition' in document) {
      document.body.setAttribute('theme', newTheme)
      return
    }
    // 创建一个过渡对象
    const transition = document.startViewTransition(() => {
      document.body.setAttribute('theme', newTheme)
    })
    const width = btnTheme.getBoundingClientRect().width // 按钮的宽度
    const height = btnTheme.getBoundingClientRect().height // 按钮的高度
    const x = btnTheme.getBoundingClientRect().x + width / 2 // 按钮的中心x坐标
    const y = btnTheme.getBoundingClientRect().y + height / 2 // 按钮的中心y坐标

    // 计算展开圆的半径
    const tragetRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    // 设置过渡的动画效果
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0% at ${x}px ${y}px)`,
            `circle(${tragetRadius}px at ${x}px ${y}px)`
          ]
        },
        {
          duration: 400,
          // pseudoElement
          // 设置过渡效果的伪元素，这里设置为根元素的伪元素
          // 这样过渡效果就会作用在根元素上
          pseudoElement: '::view-transition-new(root)'
        }
      )
    })
  }

  function setThemeIcon() {
    return window.localStorage.getItem('CSS_TIPS_THEME') === 'light'
      ? 'btn-theme_changed'
      : ''
  }

  // 根据系统主题自动切换
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    setThemeBySystem('dark')
  } else {
    setThemeBySystem('light')
  }
  function setThemeBySystem(theme) {
    if (window.localStorage.getItem('PRE_SYS_THEME') !== theme) {
      changeTheme(theme)
      window.localStorage.setItem('CSS_TIPS_THEME', theme)
      setThemeIcon()
    }
    window.localStorage.setItem('PRE_SYS_THEME', theme)
  }

  window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
    if (e.matches) {
      setThemeBySystem('dark')
    } else {
      setThemeBySystem('light')
    }
  })

  // 添加切换上下篇
  fetch('./map.json')
    // 将响应转换为 JSON
    .then((response) => response.json())
    // 使用 JSON 数据
    .then((data) => {
      var filename = window.location.pathname
        .split('/')
        .pop()
        .replace('.html', '')

      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        if (item.name === filename) {
          const pre = data[i > 0 ? i - 1 : data.length - 1]
          const next = data[i < data.length - 1 ? i + 1 : 0]
          const footerChangePage = `
          <div id="page-change">
            <a href="./${pre.name}.html" title="${pre.desc}">上一篇</a>
            <a href="./${pre.name}.html" title="${next.desc}">下一篇</a>
          </div>
          `
          mainDom.insertAdjacentHTML('beforeend', footerChangePage)
        }
      }
    })
})()
