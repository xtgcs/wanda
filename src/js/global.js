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
        _functions.initSwiper();
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
            $(".tt-header").addClass("stick fadeInDown animated");
        } else {
            $(".tt-header").removeClass("stick fadeInDown animated");
        }
    };
    var initIterator = 0;
    _functions.initSwiper = function () {
        $('.swiper-container').not('.initialized').each(function () {
            var $t = $(this);
            var index = 'swiper-unique-id-' + initIterator;
            $t.addClass('swiper-' + index + ' initialized').attr('id', index);
            $t.find('.swiper-pagination').addClass('swiper-pagination-' + index);
            $t.find('.swiper-button-prev').addClass('swiper-button-prev-' + index);
            $t.find('.swiper-button-next').addClass('swiper-button-next-' + index);
            var slidesPerViewVar = ($t.data('slides-per-view')) ? $t.data('slides-per-view') : 1;
            if (slidesPerViewVar != 'auto') slidesPerViewVar = parseInt(slidesPerViewVar, 10);
            swipers['swiper-' + index] = new Swiper('.swiper-' + index, {
                pagination: '.swiper-pagination-' + index,
                paginationClickable: true,
                nextButton: '.swiper-button-next-' + index,
                prevButton: '.swiper-button-prev-' + index,
                slidesPerView: slidesPerViewVar,
                autoHeight: ($t.is('[data-auto-height]')) ? parseInt($t.data('auto-height'), 10) : 0,
                loop: ($t.is('[data-loop]')) ? parseInt($t.data('loop'), 10) : 0,
                autoplay: ($t.is('[data-autoplay]')) ? parseInt($t.data('autoplay'), 10) : 5000,
                breakpoints: ($t.is('[data-breakpoints]')) ? {
                    767: {
                        slidesPerView: parseInt($t.attr('data-xs-slides'), 10)
                    },
                    991: {
                        slidesPerView: parseInt($t.attr('data-sm-slides'), 10)
                    },
                    1199: {
                        slidesPerView: parseInt($t.attr('data-md-slides'), 10)
                    }
                } : {},
                initialSlide: ($t.is('[data-ini]')) ? parseInt($t.data('ini'), 10) : 0,
                speed: ($t.is('[data-speed]')) ? parseInt($t.data('speed'), 10) : 1500,
                keyboardControl: true,
                mousewheelControl: ($t.is('[data-mousewheel]')) ? parseInt($t.data('mousewheel'), 10) : 0,
                mousewheelReleaseOnEdges: true,
                spaceBetween: ($t.is('[data-space-between]')) ? parseInt($t.data('space-between'), 10) : 0,
                direction: ($t.is('[data-direction]')) ? $t.data('direction') : 'horizontal',
                onSlideChangeEnd: function (swiper) {
                    var animationBlocks = $t.find('.swiper-slide-active .text-animation');
                    for (var i = 0; i < animationBlocks.length; ++i) {
                        $(animationBlocks[i]).addClass('animated ' + $(animationBlocks[i]).attr("data-animation"));
                    }
                },
                onSlideChangeStart: function (swiper) {
                    var animationBlocks = $t.find('.swiper-slide-active .text-animation');
                    for (var i = 0; i < animationBlocks.length; ++i) {
                        $(animationBlocks[i]).removeClass('animated ' + $(animationBlocks[i]).attr("data-animation"));
                    }
                },
            });
            swipers['swiper-' + index].update();
            initIterator++;
        });
        $('.swiper-container.swiper-control-top').each(function () {
            swipers['swiper-' + $(this).attr('id')].params.control = swipers['swiper-' + $(this).parent().find('.swiper-control-bottom').attr('id')];
        });
        $('.swiper-container.swiper-control-bottom').each(function () {
            swipers['swiper-' + $(this).attr('id')].params.control = swipers['swiper-' + $(this).parent().find('.swiper-control-top').attr('id')];
        });
    };
    $('.cmn-toggle-switch').on('click',
        function (e) {
            $(this).toggleClass('active');
            $(this).parents('header').find('.toggle-block').slideToggle();
            e.preventDefault();
        });
    $('.main-nav .menu-toggle').on('click',
        function (e) {
            $(this).closest('li').toggleClass('select').siblings('.select').removeClass('select');
            $(this).closest('li').siblings('.parent').find('ul').slideUp();
            $(this).closest('a').siblings('ul').slideToggle();
            e.preventDefault();
        });
    $('.tt-load-more').on('click',
        function (e) {
            var $cloneHtml = $(this).closest('.tt-block').find('.row:first-child').clone();
            $(this).parent().prev().prev().append($cloneHtml); e.preventDefault();
        });
    var tabFinish = 0;
    $('.tt-nav-tab-item').on('click',
        function (e) {
            var $t = $(this);
            if (tabFinish || $t.hasClass('active')) e.preventDefault();
            tabFinish = 1;
            $t.closest('.tt-nav-tab').find('.tt-nav-tab-item').removeClass('active');
            $t.addClass('active');
            var index = $t.parent().parent().find('.tt-nav-tab-item').index(this);
            $t.parents('.tt-tab-wrapper').find('.tt-tab-select select option:eq(' + index + ')').prop('selected', true);
            $t.closest('.tt-tab-wrapper').find('.tt-tab-info:visible').fadeOut(500,
                function () {
                    var $tabActive = $t.closest('.tt-tab-wrapper').find('.tt-tab-info').eq(index);
                    $tabActive.css('display', 'block').css('opacity', '0');
                    $tabActive.animate({
                        opacity: 1
                    });
                    tabFinish = 0;
                });
        });
    $('.tt-tab-select select').on('change',
        function (e) {
            var $t = $(this);
            if (tabFinish) e.preventDefault();
            tabFinish = 1;
            var index = $t.find('option').index($(this).find('option:selected'));
            $t.closest('.tt-tab-wrapper').find('.tt-nav-tab-item').removeClass('active');
            $t.closest('.tt-tab-wrapper').find('.tt-nav-tab-item:eq(' + index + ')').addClass('active');
            $t.closest('.tt-tab-wrapper').find('.tt-tab-info:visible').fadeOut(500,
                function () {
                    var $tabActive = $t.closest('.tt-tab-wrapper').find('.tt-tab-info').eq(index);
                    $tabActive.css('display', 'block').css('opacity', '0');
                    $tabActive.animate({
                        opacity: 1
                    });
                    tabFinish = 0;
                });
        });
    var hash = location.hash.replace('#', '');
    if (hash) {
        hashTab();
    }
    function hashTab() {
        var $tabSel = $('.tt-nav-tab-item[data-tab="' + hash + '"]').addClass('active');
        $tabSel.closest('.tt-nav-tab').find('.tt-nav-tab-item').removeClass('active');
        $tabSel.addClass('active');
        var index = $tabSel.parent().parent().find('.tt-nav-tab-item').index($tabSel);
        $tabSel.parents('.tt-tab-wrapper').find('.tt-tab-select select option:eq(' + index + ')').prop('selected', true);
        $tabSel.closest('.tt-tab-wrapper').find('.tt-tab-info:visible').fadeOut(500,
            function () {
                var $tabActive = $tabSel.closest('.tt-tab-wrapper').find('.tt-tab-info').eq(index);
                $tabActive.css('display', 'block').css('opacity', '0');
                $tabActive.animate({
                    opacity: 1
                });
            });
    }
    $(window).on("hashchange",
        function () {
            if (window.location.hash) {
                hash = location.hash.replace('#', '');
                hashTab();
            }
        });
    $('.tt-accordeon-title').on('click',
        function () {
            $(this).closest('.tt-accordeon').find('.tt-accordeon-title').not(this).removeClass('active').next().slideUp();
            $(this).toggleClass('active').next().slideToggle();
        });
    var activityIndicatorOn = function () {
        $('<div id="imagelightbox-loading"><div></div></div>').appendTo('body');
    };
    var activityIndicatorOff = function () {
        $('#imagelightbox-loading').remove();
    };
    var closeButtonOn = function (instance) {
        $('<button type="button" id="imagelightbox-close" title="Close"></button>').appendTo('body').on('click touchend',
            function () {
                $(this).remove();
                instance.quitImageLightbox();
                return false;
            });
    };
    var closeButtonOff = function () {
        $('#imagelightbox-close').remove();
    };
    var overlayOn = function () {
        $('<div id="imagelightbox-overlay"></div>').appendTo('body');
    };
    var overlayOff = function () {
        $('#imagelightbox-overlay').remove();
    };
    var captionOff = function () {
        $('#imagelightbox-caption').remove();
    };
    var captionOn = function () {
        var description = $('a[href="' + $('#imagelightbox').attr('src') + '"]').data('title');
        if (description.length) $('<div id="imagelightbox-caption">' + description + '</div>').appendTo('body');
    };
    var arrowsOn = function (instance, selector) {
        var $arrows = $('<button type="button" class="imagelightbox-arrow imagelightbox-arrow-left"><i class="fa fa-chevron-left"></i></button><button type="button" class="imagelightbox-arrow imagelightbox-arrow-right"><i class="fa fa-chevron-right"></i></button>');
        $arrows.appendTo('body');
        $arrows.on('click touchend',
            function (e) {
                e.preventDefault();
                var $this = $(this);
                if ($this.hasClass('imagelightbox-arrow-left')) {
                    instance.loadPreviousImage();
                } else {
                    instance.loadNextImage();
                }
                return false;
            });
    };
    var arrowsOff = function () {
        $('.imagelightbox-arrow').remove();
    };
    var selectorG = '.lightbox';
    if ($(selectorG).length) {
        var instanceG = $(selectorG).imageLightbox({
            quitOnDocClick: false,
            onStart: function () {
                arrowsOn(instanceG, selectorG);
                overlayOn();
                closeButtonOn(instanceG);
            },
            onEnd: function () {
                arrowsOff();
                captionOff();
                overlayOff();
                closeButtonOff();
                activityIndicatorOff();
            },
            onLoadStart: function () {
                captionOff();
                activityIndicatorOn();
            },
            onLoadEnd: function () {
                $('.imagelightbox-arrow').css('display', 'block');
                captionOn();
                activityIndicatorOff();
            }
        });
    }
    // $('.barfiller1').barfiller({
    //     barColor: '#f2c21a'
    // });
    // var owl = $('.owl-carousel1');
    // owl.owlCarousel({
    //     margin: 30,
    //     nav: true,
    //     loop: true,
    //     autoplay: true,
    //     autoplayTimeout: 1000,
    //     autoplayHoverPause: true,
    //     responsive: {
    //         0: {
    //             items: 1,
    //         },
    //         600: {
    //             margin: 0,
    //             items: 2
    //         },
    //         767: {
    //             margin: 30,
    //             items: 2,
    //         },
    //         1000: {
    //             items: 3
    //         }
    //     }
    // });
    // $('.play').on('click',
    //     function () {
    //         owl.trigger('play.owl.autoplay', [1000])
    //     });
    // $('.stop').on('click',
    //     function () {
    //         owl.trigger('stop.owl.autoplay')
    //     });
    // var owl = $('.owl-carousel2');
    // owl.owlCarousel({
    //     margin: 0,
    //     nav: true,
    //     loop: true,
    //     autoplay: true,
    //     autoplayTimeout: 1000,
    //     autoplayHoverPause: true,
    //     responsive: {
    //         0: {
    //             items: 1
    //         },
    //         414: {
    //             items: 2
    //         },
    //         600: {
    //             items: 3
    //         },
    //         1000: {
    //             items: 4
    //         },
    //         1200: {
    //             items: 5
    //         }
    //     }
    // });
    // var owl = $('.owl-carousel10');
    // owl.owlCarousel({
    //     margin: 30,
    //     nav: true,
    //     loop: true,
    //     autoplay: true,
    //     autoplayTimeout: 1000,
    //     autoplayHoverPause: true,
    //     responsive: {
    //         0: {
    //             items: 1,
    //         },
    //         600: {
    //             margin: 0,
    //             items: 2
    //         },
    //         767: {
    //             margin: 30,
    //             items: 2,
    //         },
    //         1000: {
    //             items: 3
    //         }
    //     }
    // });
    // var owl = $('.owl-carousel11');
    // owl.owlCarousel({
    //     margin: 30,
    //     nav: true,
    //     loop: true,
    //     autoplay: true,
    //     autoplayTimeout: 1000,
    //     autoplayHoverPause: true,
    //     responsive: {
    //         0: {
    //             items: 1,
    //         },
    //         600: {
    //             margin: 30,
    //             items: 2
    //         },
    //         767: {
    //             margin: 30,
    //             items: 2,
    //         },
    //         1000: {
    //             items: 4
    //         }
    //     }
    // });
    // var owl = $('.owl-carousel12');
    // owl.owlCarousel({
    //     margin: 30,
    //     nav: true,
    //     loop: true,
    //     autoplay: true,
    //     autoplayTimeout: 1000,
    //     autoplayHoverPause: true,
    //     responsive: {
    //         0: {
    //             items: 1,
    //         },
    //         600: {
    //             margin: 0,
    //             items: 1
    //         },
    //         767: {
    //             margin: 30,
    //             items: 1,
    //         },
    //         1000: {
    //             items: 1
    //         }
    //     }
    // });
    // var owl = $('.owl-carousel15');
    // owl.owlCarousel({
    //     margin: 30,
    //     nav: true,
    //     loop: true,
    //     autoplay: true,
    //     autoplayTimeout: 1000,
    //     autoplayHoverPause: true,
    //     responsive: {
    //         0: {
    //             items: 1,
    //         },
    //         600: {
    //             margin: 0,
    //             items: 3
    //         },
    //         767: {
    //             margin: 30,
    //             items: 4,
    //         },
    //         1000: {
    //             items: 5
    //         }
    //     }
    // });
    // var owl = $('.owl-carousel17');
    // owl.owlCarousel({
    //     margin: 30,
    //     nav: true,
    //     loop: true,
    //     autoplay: true,
    //     autoplayTimeout: 1000,
    //     autoplayHoverPause: true,
    //     responsive: {
    //         0: {
    //             items: 1,
    //         },
    //         600: {
    //             margin: 0,
    //             items: 3
    //         },
    //         767: {
    //             margin: 30,
    //             items: 3,
    //         },
    //         1000: {
    //             items: 4
    //         }
    //     }
    // });
    // $('.owl-carousel3 ').owlCarousel({
    //     loop: true,
    //     margin: 10,
    //     nav: true,
    //     loop: true,
    //     nav: true,
    //     autoplay: true,
    //     smartSpeed: 1500,
    //     autoplayHoverPause: false,
    //     fluidSpeed: true,
    //     responsive: {
    //         0: {
    //             items: 1,
    //         },
    //         600: {
    //             items: 1,
    //         },
    //         1000: {
    //             items: 1,
    //         }
    //     }
    // });
    // $(".owl-prev").html('<i class="icofont icofont-thin-left"></i>');
    // $(".owl-next").html('<i class="icofont icofont-thin-right"></i>');
    // $('.owl-carousel4 ').owlCarousel({
    //     loop: true,
    //     margin: 30,
    //     loop: true,
    //     dots: true,
    //     autoplay: true,
    //     smartSpeed: 1500,
    //     pagination: false,
    //     navigation: true,
    //     autoplayHoverPause: false,
    //     fluidSpeed: true,
    //     responsive: {
    //         0: {
    //             items: 1,
    //         },
    //         767: {
    //             items: 2,
    //         },
    //         992: {
    //             items: 3,
    //         }
    //     }
    // });
    // $('.owl-carousel5 ').owlCarousel({
    //     nav: true,
    //     loop: true,
    //     margin: 30,
    //     dots: true,
    //     autoplay: true,
    //     smartSpeed: 1500,
    //     pagination: false,
    //     navigation: true,
    //     autoplayHoverPause: false,
    //     fluidSpeed: true,
    //     responsive: {
    //         0: {
    //             items: 1,
    //         },
    //         600: {
    //             items: 1,
    //         },
    //         991: {
    //             items: 1,
    //         }
    //     }
    // });
    // $('.owl-carousel6 ').owlCarousel({
    //     margin: 30,
    //     loop: true,
    //     dots: true,
    //     nav: true,
    //     autoplay: true,
    //     smartSpeed: 1500,
    //     pagination: false,
    //     navigation: true,
    //     autoplayHoverPause: false,
    //     fluidSpeed: true,
    //     responsive: {
    //         0: {
    //             items: 1,
    //         },
    //         414: {
    //             items: 1,
    //         },
    //         767: {
    //             items: 1,
    //         },
    //         991: {
    //             items: 2,
    //         }
    //     }
    // });
    // $(".owl-prev").html('<i class="icofont icofont-rounded-left"></i>');
    // $(".owl-next").html('<i class="icofont icofont-rounded-right"></i>');
    // $('.owl-carousel8 ').owlCarousel({
    //     margin: 30,
    //     loop: true,
    //     dots: true,
    //     nav: true,
    //     autoplay: true,
    //     responsive: {
    //         0: {
    //             items: 1,
    //         },
    //         414: {
    //             items: 1,
    //         },
    //         767: {
    //             items: 1,
    //         },
    //         991: {
    //             items: 2,
    //         }
    //     }
    // });
    // $(".owl-prev").html('<i class="fa fa-angle-left"></i>');
    // $(".owl-next").html('<i class="fa fa-angle-right"></i>');
    // var owl = $('.owl-carousel7');
    // owl.owlCarousel({
    //     margin: 0,
    //     nav: true,
    //     loop: true,
    //     autoplay: true,
    //     autoplayTimeout: 1000,
    //     autoplayHoverPause: true,
    //     responsive: {
    //         0: {
    //             items: 1
    //         },
    //         500: {
    //             items: 2
    //         },
    //         650: {
    //             items: 2
    //         },
    //         767: {
    //             items: 3
    //         },
    //         1000: {
    //             items: 2
    //         },
    //         1200: {
    //             items: 5
    //         }
    //     }
    // });
    // $('.play').on('click',
    //     function () {
    //         owl.trigger('play.owl.autoplay', [1000])
    //     });
    // $('.stop').on('click',
    //     function () {
    //         owl.trigger('stop.owl.autoplay')
    //     });
    // $('.strip_05 .border-left22 h2').each(function () {
    //     $(this).prop('Counter', 0).animate({
    //         Counter: $(this).text()
    //     },
    //         {
    //             duration: 25000,
    //             easing: 'swing',
    //             step: function (now) {
    //                 $(this).text(Math.ceil(now));
    //             }
    //         });
    // });
    // $(window).scroll(function () {
    //     if ($(this).scrollTop() > 100) {
    //         $('#mkdf-back-to-top').addClass('on');
    //     } else {
    //         $('#mkdf-back-to-top').removeClass('on');
    //     }
    // });
    // $('#mkdf-back-to-top').click(function () {
    //     $("html, body").animate({
    //         scrollTop: 0
    //     },
    //         600);
    //     return false;
    // });
    // $('.barfiller1').barfiller({
    //     barColor: '#fb5b21'
    // });
    // $('.input-number-increment').click(function () {
    //     var $input = $(this).parents('.input-number-group').find('.input-number');
    //     var val = parseInt($input.val(), 10);
    //     $input.val(val + 1);
    // });
    // $('.input-number-decrement').click(function () {
    //     var $input = $(this).parents('.input-number-group').find('.input-number');
    //     var val = parseInt($input.val(), 10);
    //     $input.val(val - 1);
    // });

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
    var agreement = localStorage.getItem('agreement');
    if (agreement == 'hide') {
        $('.footer_bottom').hide();
        $('.footer_h').hide();
    } else {
        $('.footer_bottom').show();
        $('.footer_h').show();
    }
    $('.result').click(function () {
        localStorage.setItem('agreement', 'hide');
        $('.footer_bottom').hide();
        $('.footer_h').hide();
    })

    //about页面点击更多
    // $('.company_content_more').click(function () {
    //     $('.company_img ').css('float', 'left');
    //     $('.company_content_box').css({ 'max-height': 'none', 'overflow': 'auto' });
    // })
    // var texts = $(".company_m_content").text().length;
    // if (texts > 500) {
    //     var String = $(".company_m_content").text().substr(0, 200);
    //     $(".company_m_content").text(String);
    //     $('.company_m').append('<div class="company_m_more"> <span>More</span><img src="asset/img/about/about_icon.png" alt=""></div>');
    // }

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

});