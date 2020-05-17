var _functions = {};
$(function () {
    "use strict";
    var swipers = [],
        winW,
        winH,
        headerH,
        winScr,
        footerTop,
        _isresponsive,
        _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);
    _functions.pageCalculations = function () {
        winW = $(window).width();
        winH = $(window).height();
    };
    if (_ismobile) $('body').addClass('mobile');
    _functions.pageCalculations();
    $(window).load(function () {
        // _functions.initSwiper();
        $('body').addClass('loaded');
        $('#loader-wrapper').fadeOut();
    });
    _functions.resizeCall = function () {
        _functions.pageCalculations();
    };
    if (!_ismobile) {
        $(window).resize(function () {
            _functions.resizeCall();
        });
    } else {
        window.addEventListener("orientationchange",
            function () {
                _functions.resizeCall();
            },
            false);
    }
    $(window).scroll(function () {
        _functions.scrollCall();
    });
    _functions.scrollCall = function () {
        winScr = $(window).scrollTop();
        if (winScr > 130) {
            $(".m_header").addClass("stick fadeInDown animated");
        } else {
            $(".m_header").removeClass("stick fadeInDown animated");
        }
    };

    $('.cmn-toggle-switch').on('click',
        function (e) {
            $("html").toggleClass('html');
            $("body").toggleClass('html');
            $('.m_header').toggleClass('bottom');
            $(this).toggleClass('active');
            $(this).parents('header').find('.toggle-block').slideToggle();
            e.preventDefault();
        });
    $('.main-nav .menu-toggle').on('click',
        function (e) {
            $("html").removeClass('html');
            $("body").removeClass('html');;
            $('.m_header').removeClass('bottom');
            $(this).closest('li').toggleClass('select').siblings('.select').removeClass('select');
            $(this).closest('li').siblings('.parent').find('ul').slideUp();
            $(this).closest('a').siblings('ul').slideToggle();
            e.preventDefault();
        });

    var magnificPopup = $.magnificPopup.instance;
    $('.close_icon').click(function () {
        magnificPopup.close();
    })

    try {
        var ZoomImage = jQuery('.zoom, .zoom-image');
        ZoomImage.magnificPopup({
            delegate: 'a', // c
            type: 'image',
            closeBtnInside: false,   // 显示关闭按钮
            closeOnBgClick: false, // 点击遮罩透明背景关闭弹出层
            gallery: {
                enabled: true,
            },

        });
    } catch (err) { }

    // 隐私协议显隐控制
    // var agreement = localStorage.getItem('agreement');
    // if (agreement == 'hide') {
    //     $('.footer_bottom').hide();
    //     $('.footer_h').hide();
    // } else {
    //     $('.footer_bottom').show();
    //     $('.footer_h').show();
    // }
    $('.result').click(function () {
        // localStorage.setItem('agreement', 'hide');
        $('.footer_bottom').hide();
        $('.footer_h').hide();
    })


    $('.company_m_more').click(function () {
        if ($(".company_m_content").css('max-height') == 'none') {
            $(".company_m_content").css({ 'max-height': '150px', 'overflow': 'hidden' });
            $('.company_m_more img').css('transform', 'rotate(0)');

        } else {
            $(".company_m_content").css({ 'max-height': 'none', 'overflow': 'auto' });
            $('.company_m_more img').css('transform', 'rotate(180deg)');
        }

    })

    $('.agreement_link').magnificPopup({
        type: 'inline',
        preloader: false,
        closeOnBgClick: false,
        showCloseBtn: false,
        closeBtnInside: false,

    })

    $(".news_nav .item").click(function () {
        //获取点击的元素给其添加样式，讲其兄弟元素的样式移除
        $(this).addClass("active").siblings().removeClass("active");
        //获取选中元素的下标
        var index = $(this).index();
        $(this).parent().siblings().children().eq(index).addClass("active")
            .siblings().removeClass("active");
    });


    $('.list-people h3').on('click', function () {
        console.log('dianjile');
        var idx = $(this).parent().index();
        var status = $(this).next('.txt').css('display');
        if (status == 'none') {
            $('.list-people .txt').slideUp()
            $(this).next('.txt').slideDown(function () {
                $('.list-people li').removeClass('active')
                $(this).parent('li').addClass('active')
            })
        } else {
            $('.list-people .txt').slideUp()
            $('.list-people li').removeClass('active')
        }
    })


    var options = {
        animateThreshold: -300,
        scrollPollInterval: 50
    }
    $('.aniview').AniView(options);


    var mySwiper = new Swiper('.swiper-container', {
        autoplay: 5000,
        loop: true,
        pagination: '.pagination',
    })
});