import $ from 'jquery';
import 'fullpage.js/jquery.fullPage.js';
import TWEEN from 'tween.js';
import 'slick-carousel';

// 幕布效果
class Curtain {
  constructor() {
    this.curtain = $('#curtain');
    this.isFirst = true;
  }

  init() {
    const initialPos = { x: -this.curtain.width(), y: 0 };
    const show = new TWEEN.Tween(initialPos)
      .to({ x: 0, y: 0 }, 1000)
      .easing(TWEEN.Easing.Quartic.In)
      .onUpdate(() => {
        this.curtain.css('left', `${initialPos.x}px`);
      });

    const hidden = new TWEEN.Tween(initialPos)
    .to({ x: -initialPos.x, y: 0 }, 1000)
    .delay(this.isFirst ? 1500 : 500)
    .easing(TWEEN.Easing.Quartic.Out)
    .onUpdate(() => {
      this.curtain.css('left', `${initialPos.x}px`);
    });

    if (this.isFirst) {
      this.isFirst = false;
      initialPos.x = 0;
      hidden.start();
      return;
    }

    show.chain(hidden);
    show.start();
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    TWEEN.update();
  }

  play() {
    this.init();
    this.animate();
  }
}

const curtain = new Curtain($('#curtain'));
let lastPath;

function handleSlick() {
  $('.departments').slick({
    infinite: true,
    dots: true,
    arrows: false,
    adaptiveHeight: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 6000,
  });

  $('.shows').slick({
    centerMode: true,
    centerPadding: '200px',
    slidesToShow: 1,
    arrows: false,
    variableWidth: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 6000,
  });

  $('.graduate').slick({
    infinite: true,
    dots: true,
    arrows: false,
    adaptiveHeight: true,
    speed: 1000,
    autoplay: false,
  });
}

function moveTo(path) {
  if ((path === '1' && lastPath !== '2') || (path === '3' && lastPath !== '4')) {
    curtain.play();
    setTimeout(() => {
      $.fn.fullpage.moveTo(Number(path));
    }, 1000);
  } else {
    $.fn.fullpage.moveTo(Number(path));
  }
  if ((path === '1' || path === '2') && (lastPath !== '1' && lastPath !== '2')) {
    $('.nav-list .show').removeClass('active');
    $('.nav-list .home').addClass('active');
  } else if ((path === '3' || path === '4') && (lastPath !== '3' && lastPath !== '4')) {
    $('.nav-list .home').removeClass('active');
    $('.nav-list .show').addClass('active');
  }
  lastPath = path;
}

function hashListen() {
  const path = document.location.hash.slice(1, 2) || '1';
  curtain.play();
  if (path === '1' || path === '2') {
    $('.show').removeClass('active');
    $('.home').addClass('active');
  } else if (path === '3' || path === '4') {
    $('.home').removeClass('active');
    $('.show').addClass('active');
  }
  lastPath = path;
}

// 二维码展示
function qrcode() {
  $('.wechat').on('mouseover', () => {
    $('.shadow').addClass('shadow-visible');
    $('.wechat-qrcode').addClass('modal-visible');
  }).on('mouseout', () => {
    $('.shadow').removeClass('shadow-visible');
    $('.wechat-qrcode').removeClass('modal-visible');
  });
  $('.weibo').on('mouseover', () => {
    $('.shadow').addClass('shadow-visible');
    $('.weibo-qrcode').addClass('modal-visible');
  }).on('mouseout', () => {
    $('.shadow').removeClass('shadow-visible');
    $('.weibo-qrcode').removeClass('modal-visible');
  });
}

$(document).ready(() => {
  $(window).on('resize', () => {
    $.fn.fullpage.reBuild();
    curtain.play();
  });
  handleSlick();
  $('#homepage').fullpage({
    scrollingSpeed: 600,
  });
  hashListen();
  $.fn.fullpage.setAllowScrolling(false);
  $.fn.fullpage.setKeyboardScrolling(false);
  $('.go1').on('click', () => {
    moveTo('1');
  });
  $('.go2').on('click', () => {
    moveTo('2');
  });
  $('.go3').on('click', () => {
    moveTo('3');
  });
  $('.go4').on('click', () => {
    moveTo('4');
  });
  // 二维码显示
  qrcode();
});
