  function createWindow(url, title = '', x = 100, y = 100) {
    let win

    if($(window).width() > 700) {
      win = $(`
      <div class="window">
        <div class="window-topbar">
          <div class="buttons">
            <button>x</button>
            <button>+</button>
          </div>
          <div class="title">${title}</div>
          <div class="holder"></div>
        </div>
        <iframe src="${url}"></iframe>
      </div>
      `)
    } else {
      win = $(`
      <div class="window">
        <div class="window-topbar">
          <div class="buttons">
            <button>x</button>
          </div>
          <div class="title">${title}</div>
          <div class="holder"></div>
        </div>
        <iframe src="${url}"></iframe>
      </div>
      `)
    }

    if($(window).width() > 700) {
      let top = y - 100 > 0 ? y - 100 : 0
      let left = x - 100 > 0 ? x - 100 : 0
      win.css('top', top)
      win.css('left', left)
    }

    $('main').append(win)
    $('.window').draggable()
    $('.window').each((_, w) => {

      $(w).find('.buttons').children().first().click(() => {
        $(w).hide()
      })

      if($(window).height() > 700) {
        $(w).find('.buttons').children().eq(1).click((e) => {
          if($(w).find('iframe').css('height') === '600px') {
            $(w).css('left', 0)
            $(w).css('top', 0)
            $(w).css('width', '100%')
            $(w).css('height', '100%')
            $(w).find('iframe').css('height', '100%');
            $(w).find('iframe').css('width', '100%');
            $(e.target).text('-')
          } else {
            $(w).css('left', x - 100)
            $(w).css('top', y - 100)
            $(w).css('width', '500px')
            $(w).css('height', '500px')
            $(w).find('iframe').css('height', '500px');
            $(w).find('iframe').css('width', '500px');
            $(e.target).text('+')
          }
        })
      }
    })
  }

  const exclude = ['./map.html', './trash.html']

  function handleOpenFolder(e) {
    const { x, y } = e.target.getBoundingClientRect()
    const { url, title } = $(e.target).data()
    if($(window).width() < 700 || exclude.includes(url)) {
      createWindow(url, title, 10, 10)
    } else {
      createWindow(url, title, x, y)
    }
  }

  function handleLargeScreen() {
    $('.folder').draggable()
    $(".window").each((_, d) => {
      $(d).css('height', '500px')
      $(d).css('width', '500px')
    })
  }

  function handleSmallScreen() {
    $(".folder").each((_, d) => {
      $(d).css('top', '')
      $(d).css('left', '')
    })
    $(".window").each((_, d) => {
      $(d).css('top', '0px')
      $(d).css('left', '0px')
      $(d).css('height', '100%')
      $(d).css('width', '100%')
    })
  }

  function setup() {
    if($(window).width() < 700){
      handleSmallScreen()
    } else {
      handleLargeScreen()
    }
  }

  addEventListener("resize", setup)

  setup()

  $('.folder').not('.icon').click(handleOpenFolder)
  $('.insta-icon').click(() => window.open('https://instagram.com'))
  $('.email-icon').click(() => window.open('mailto:example@mail.com'))
  $('.cv-container').click(() => {
    createWindow('./cv.html', 'cv')
  })
