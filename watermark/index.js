(function(){
  let fileName = ''
  let imgRotate = 0
  let watermarkConf = {
    text:'zjk537 Design',
    height: 100,
    width: 200,
    fontSize: 14,
    rotate: -30,
    color: 'rgba(17, 17, 17, 0.10)'
  }

  $(function() {
    // 阻止浏览器默认行为
    $(document).on({
      dragleave: (e) => e.preventDefault(),
      drop: (e) => e.preventDefault(),
      dragenter: (e) => e.preventDefault(),
      dragover: (e) => e.preventDefault()
    })

    // 检查浏览器是否支持FileReader
    if(typeof FileReader === 'undefined'){
      toast("抱歉，您的浏览器不支持 FileReader")
      $('#loadimage').attr('disabled', 'disabled')
      return
    }

    $('#loadimage').on('change', e => {
      let files = $(e.target).prop('files')
      loadImg(files[0])
    })

    $('.dropbox')[0].addEventListener('drop', (e) => {
      e.stopPropagation()
      e.preventDefault()
      let files = e.dataTransfer.files
      loadImg(files[0])
    })
    $('.closeIt').click((e) => {
      let $sender = $(e.target)
      if($sender.parents('li').hasClass('on')){
        $sender.parents('li').removeClass('on')
      }
    })

    $('#btnZoomin').click(() => {
      let $img = $('.imgbox').children('img')
      if(!$img.length){
        toast('请先导入一张图片')
        return;
      }
      let option = {
        width: $img.width() * 1.2,
        height: $img.height() * 1.2
      }
      $('#imgBox').css(option)
      $img.css(option)
    })

    $('#btnZoomout').click(() => {
      let $img = $('#imgBox').children('img')
      if(!$img.length){
        toast('请先导入一张图片')
        return;
      }
      let option = {
        width: $img.width() * 0.8,
        height: $img.height() * 0.8
      }
      $('#imgBox').css(option)
      $img.css(option)
    })

    $('#btnTrans').click(() => {
      let $img = $('#imgBox').children('img')
      if(!$img.length){
        toast('请先导入一张图片')
        return;
      }
      imgRotate = imgRotate + 90
      let option = {
        transform: `rotate(-${imgRotate}deg)`
      }
      // $img.css(option)
      $('#imgBox').css(option)
    })

    $('#btnWatermark').click((e) => {
      let $sender = $(e.target)
      if($sender.parents('li').hasClass('on')){
        return
      }
      $sender.parents('li').addClass('on')
      // new watermark({ 
      //   container: document.getElementById('imgBox'),
      //   text: '天津社保公积金专用',
      //   color: 'red'
      // })
    })
    $('#btnConfirm').click((e) => {
      $('#imgBox .watermark').remove()
      new watermark({ 
        container: document.getElementById('imgBox'),
        text: $('#txtTitle').val(),
        height: $('#txtHeight').val(),
        width: $('#txtWidth').val(),
        fontSize: $('#txtFont').val(),
        rotate: $('#txtRotate').val(),
        color: $('#txtColor').val()
      })
      $(e.target).parents('li').removeClass('on')
    })

    $('#btnClear').click(() => {
      $('#imgBox .watermark').remove()
    })

    $('#btnExport').click(() => {
      html2canvas(document.getElementById('imgBox')).then(canvas => {
          let imgUrl = canvas.toDataURL('image/png')
          let a = document.createElement('a')
          a.href = imgUrl
          a.download = fileName
          a.click()
          a.remove()
      })
    })
   


  })

  function loadImg(file){
    fileName = file.name
    const $dropbox = $('.dropbox')
    if($dropbox.lenth > 0){
      $dropbox.css("background-image", "url(../static/loading.gif)");
      $dropbox.children("h3, p").hide()
      if(isIE()){
        if (!/\.(jpg|jpeg|png)$/i.test(file.name)) {
          toast("请上传jpeg、jpg、png格式的图片");
          return false
        }
      } else {
        if (!/image\/\w+/.test(file.type)) { // 这里可能判断不到gif 图片
          toast("请上传jpeg、jpg、png格式的图片");
          return false
        }
      }
    }


    
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      let image = document.createElement('img')
      image.src = e.target.result
      image.onload = () => {
        let winW = $(window).width()
        let winH = $(window).height()
        if(winW < image.width){
          image.style.width = winW +'px'
        } else if(winH < image.height){
          image.style.height = winH +'px'
        }
      }
      $('.welcome').hide()
      $('.imgbox').empty().append(image)
      
    }
    $(window).resize(() => adaptive(false))
  }

  function adaptive(reload){
    let docWidth = $(document).width()
  }

})()

function stopBubble(e){
  var evt = e || window.event;
  evt.stopPropagation ? evt.stopPropagation() : (evt.cancelBubble=true);
}

function isIE() {
  return /(msie\s|trident.*rv:)([\w.]+)/.test(navigator.userAgent.toLowerCase())
}

function toast(msg){
  let $toast = document.getElementsByClassName('toast')[0]
  if(!$toast){
    $toast = document.createElement('div')
    $toast.className = 'toast'
    $toast.innerHTML = '<span></span>'
    document.body.appendChild($toast)

    var toasStyle = document.createElement('style');
    toasStyle.innerHTML = `
    .toast{display: none;padding: 25px 5%;left: 50%;top: 50%;
      -webkit-transform: translate(-50%, -50%);transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.6);
      position: fixed;max-width: 80%;border-radius: 6px;color: #fff;
      box-sizing: border-box;text-align: center;z-index: 1000;
      line-height: 20px;word-wrap:break-word;}
    .toast span{font-size: 14px;display:block;text-align: center;}'`
    document.head.appendChild(toasStyle);
  }
  $toast.getElementsByTagName('span')[0].innerText = msg
  $toast.style.display = 'block'
  setTimeout(() => {
    $toast.style.display = 'none'
  }, 1000 * 1.5);
}