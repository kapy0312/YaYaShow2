// 當螢幕寬度小於 600px（手機版），設定 canvas 尺寸為視窗寬度 75%
if (window.innerWidth < 600) {
  let canvasW = window.innerWidth * 0.75;
  let canvasH = canvasW;
  console.log(canvasW);
  $('.mobile-machine #moCanvas').attr('width', canvasW);
  $('.mobile-machine #moCanvas').attr('height', canvasH);
}

// 根據裝置選擇正確的 canvas
var canvas = window.innerWidth > 600
  ? document.getElementById('myCanvas')
  : document.getElementById('moCanvas');

var ctx = canvas.getContext('2d'); // 取得畫布的 2D 畫圖上下文
// 取得每顆球的 DOM 元素
var ballList = [
  document.getElementById('ball1'),
  document.getElementById('ball2'),
  document.getElementById('ball3'),
  document.getElementById('ball4'),
  document.getElementById('ball5')
];

const ballNum = 5;
var awardList = []; // 儲存動畫中的球物件
var timer; // 計時器用來控制動畫
var ballStatus = []; // 每顆球的彈跳次數記錄
var xbottom = 0;
var final = ballNum;

// 當使用者按下 switch 開關
$('.switch').click(function (e) {
  e.preventDefault();

  // 每次點擊後，索引 +1，超過 7 則回到 1
  currentImageIndex = currentImageIndex >= 8 ? 1 : currentImageIndex + 1;

  $(this).addClass('switchRotate'); // 按鈕旋轉動畫
  $('.bodAr').removeClass('bodAr'); // 移除動畫觸發 class（讓機身靜止）

  setTimeout(function () {
    $('.bod .ball').css('z-index', '10');
    ballStatus = [];

    // ✅ 播放彈跳音效（每次建立新實例）
    const Sound_bounce = new Audio('music/音效_轉蛋動畫.mp3');
    Sound_bounce.play();

    init(); // 初始化動畫
    $('.switchRotate').removeClass('switchRotate');
  }, 800);

  // 手機版額外處理：隱藏標題圖、顯示 canvas
  if (window.innerWidth <= 600) {
    $('.head .tit').addClass('opa');
    $('#moCanvas').removeClass('opa');
  }
});

// 初始化球物件並開始動畫
function init() {
  final = ballNum; // 每次初始化時重設 final
  awardList = [];  // 重設球物件列表
  ballStatus = []; // 重設狀態
  for (let i = 0; i < ballNum; i++) {
    awardList[i] = new Ball(i, ballList[i]);
    ballStatus.push({ name: `ball-${i}`, count: 0 });
  }
  window.clearInterval(timer);
  timer = setInterval(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除畫布
    for (let i = 0; i < awardList.length; i++) {
      awardList[i].run(i); // 執行每顆球的動畫
    }

    // ✅ 判斷是否所有球都彈跳完畢
    if (ballStatus.every(ball => ball.count >= 5)) {
      clearInterval(timer); // 停止動畫
      drop();               // 顯示結果
    }
  }, 1);
}


// 定義 Ball 類別（建構球物件）
function Ball(index, img) {
  this.r = window.innerWidth > 600 ? 30 : 10;
  this.x = (canvas.width - this.r * 2) / 2;
  this.y = canvas.height - this.r * 2;
  this.img = img;

  // 隨機產生 X、Y 速度
  do { this.speedX = this.rand(20) - 10; } while (this.speedX < 5);
  do { this.speedY = this.rand(20) - 10; } while (this.speedY < 5);
}

// 定義 Ball 方法
Ball.prototype = {
  rand: function (num) {
    return Math.random() * num;
  },
  run: function (i) {
    // 如果球彈跳次數未滿 5 次
    if (ballStatus[i].count < 5) {
      xbottom = ballStatus[i].count;
      this.x += this.speedX;
      this.y += this.speedY;

      // 邊界反彈判斷
      if (this.x > canvas.width - this.r * 2) this.speedX = -this.speedX;
      if (this.x < 0) this.speedX = Math.abs(this.speedX);
      if (this.y > canvas.height - this.r * 2) { this.speedY = -this.speedY; xbottom++; }
      if (this.y < 0) this.speedY = Math.abs(this.speedY);

      // 畫出球
      let size = window.innerWidth > 600 ? 110 : 40;
      ctx.drawImage(this.img, this.x, this.y, size, size);

      // 更新彈跳次數
      ballStatus[i].count = xbottom;
    }

    // 檢查是否所有球都彈跳完畢
    for (let k = 0; k < ballStatus.length; k++) {
      if (ballStatus[k].count == 5) final--;
    }

    if (final == 0) {
      drop(); // 顯示結果球
    } else {
      final = ballNum;
    }
  }
}

let currentImageIndex = 0;
// 顯示掉出的最終結果球
function drop() {
  window.clearInterval(timer);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let x = Math.floor(5 * Math.random()); // 隨機選 1 顆球
  setTimeout(() => $('.bod .ball').css('z-index', '11'), 1000);

  $('.finalA').removeClass('finalA'); // 移除之前標記

  // 桌機版與手機版分開處理點擊與顯示燈箱
  let $target = window.innerWidth > 600
    ? $('.ball a').eq(x)
    : $('.mobile-machine .ball a').eq(x);

  $target.addClass('finalA');
  $target.click(function (e) {
    const Sound_Wining = new Audio('music/音效_開獎.mp3');
    Sound_Wining.volume = 0.3; // 設定音量為 50%
    Sound_Wining.play();

    e.preventDefault();
    // $('.wrap').append(`
    //   <div class="lightbg">
    //     <div class="lightbox"><p>本日好運指數${x * 20}%喔</p></div>
    //   </div>`);

    $('.wrap').append(`
      <div class="lightbg">
        <div class="lightbox">
          <img src="img/Challenger/P${currentImageIndex}.png" class="img-top">
          <img src="img/Challenger/P${currentImageIndex}_1.png" class="img-bottom">
        </div>
      </div>`);

    closelightbox();

    // 顯示到縮圖區域 thumb1 ~ thumb8
    if (currentImageIndex <= 8) {
      $(`#thumb${currentImageIndex}`).attr('src', `img/Challenger/P${currentImageIndex}.png`);
    }

  });

  // 手機版 canvas 視覺處理
  if (window.innerWidth <= 600) {
    $('.head .tit').removeClass('opa');
    $('#moCanvas').addClass('opa');
  }
}

// 關閉燈箱提示
function closelightbox() {
  document.body.addEventListener('click', function (e) {
    if (e.target.className === 'lightbg' || e.target.className === 'lightbox') {
      $('.lightbg').remove();
    }
  });
}
