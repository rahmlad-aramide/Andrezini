function initAndrezini() {
    "use strict";
    //   Background image ------------------
    var a = $(".bg");
    a.each(function (a) {
        if ($(this).attr("data-bg")) $(this).css("background-image", "url(" + $(this).data("bg") + ")");
    });
    //  scrollToFixed------------------
    function n() {
        if ($(".gallery-items").length) {
            var $grid = $(".gallery-items").isotope({
                singleMode: true,
                columnWidth: ".grid-sizer, .grid-sizer-second, .grid-sizer-three",
                itemSelector: ".gallery-item, .gallery-item-second, .gallery-item-three",
                transformsEnabled: true,
                transitionDuration: "700ms",
            });
            $grid.imagesLoaded(function () {
                $grid.isotope("layout");
            });
            $(".gallery-filters").on("click", "a", function (a) {
                a.preventDefault();
                setTimeout(function () {
                    TweenLite.to(window, 0.5, {
                        scrollTo: {
                            y: $("#port-scroll"),
                            offsetY: 160,
                            autoKill: false,
                        }
                    });
                }, 100);
                var b = $(this).attr("data-filter"),
                    dt = $(this).text();
                setTimeout(function () {
                    $grid.isotope({
                        filter: b
                    });

                }, 600);
                setTimeout(function () {

                    hideFilters();
                }, 1600);
                $(".gallery-filters a").removeClass("gallery-filter-active");
                $(this).addClass("gallery-filter-active");

            });
            function updateFilterCounts() {
                // get filtered item elements
                var itemElems = $grid.isotope('getFilteredItemElements');
                var $itemElems = $(".gallery-item");
                $(".gallery-filters a").each(function (i, button) {
                    var $button = $(this);
                    var filterValue = $button.attr('data-filter');
                    if (!filterValue) {
                        return;
                    }
                    var count = $itemElems.filter(filterValue).length;
                    $button.find('.num-pr').text(".0" + count);
                });
            }
            $grid.isotope("on", "layoutComplete", function (a, b) {
                updateFilterCounts();
            });
            var j = $(".gallery-item").length;
            $(".num-all").html(".0" + j);
        }
    }
    n();
    //   Isotope horizontal------------------
    function inithorizontalPortfolio() {
        if ($("#portfolio_horizontal_container").length) {
            var d = $("#portfolio_horizontal_container");
            d.imagesLoaded(function () {
                var f = {
                    itemSelector: ".portfolio_item",
                    layoutMode: "packery",
                    packery: {
                        isHorizontal: true,
                        gutter: 0
                    },
                    resizable: true,
                    transformsEnabled: true,
                    transitionDuration: "700ms"
                };
                var g = {
                    itemSelector: ".portfolio_item",
                    layoutMode: "packery",
                    packery: {
                        isHorizontal: false,
                        gutter: 0
                    },
                    resizable: true,
                    transformsEnabled: true,
                    transitionDuration: "700ms"
                };
                if ($(window).width() < 778) {
                    d.isotope(g);
                    d.isotope("layout");
                    d.removeAttr('style');
                    $(".horizontal-grid-wrap").getNiceScroll().remove();
                } else {
                    d.isotope(f);
                    d.isotope("layout");
                    $(".horizontal-grid-wrap").niceScroll({
                        cursorwidth: "1px",
                        cursorborder: "none",
                        cursorborderradius: "0px",
                        cursorcolor: "#F9BF26",
                        autohidemode: false,
                        touchbehavior: true,
                        bouncescroll: false,
                        scrollspeed: 120,
                        mousescrollstep: 90,
                        grabcursorenabled: true,
                        horizrailenabled: true,
                        preservenativescrolling: true,
                        cursordragontouch: true,
                        railpadding: {
                            right: 0,
                            bottom: 0
                        }
                    });
                }
                $(".gallery-filters").on("click", "a", function (a) {
                    a.preventDefault();
                    $(".horizontal-grid-wrap").animate({
                        scrollLeft: 0
                    }, 500);
                    var b = $(this).attr("data-filter"),
                        dt = $(this).text();
                    setTimeout(function () {
                        d.isotope({
                            filter: b
                        });
                    }, 600);
                    setTimeout(function () {
                        hideFilters();
                    }, 1600);
                    $(".gallery-filters a").removeClass("gallery-filter-active");
                    $(this).addClass("gallery-filter-active");

                });
                function updateFilterCounts() {
                    // get filtered item elements
                    var itemElems = d.isotope('getFilteredItemElements');
                    var $itemElems = $(".portfolio_item");
                    $(".gallery-filters a").each(function (i, button) {
                        var $button = $(this);
                        var filterValue = $button.attr('data-filter');
                        if (!filterValue) {
                            return;
                        }
                        var count = $itemElems.filter(filterValue).length;
                        $button.find('.num-pr').text(".0" + count);
                    });
                }
                d.isotope("on", "layoutComplete", function (a, b) {
                    updateFilterCounts();
                });
                var j = $(".portfolio_item").length;
                $(".num-all").html(".0" + j);
            });
        }
    }
    inithorizontalPortfolio();
    // filters / details------------------
    var gfw = $(".filter-wrap"),
        gfo = $(".filter-overlay"),
        filbtn = $(".filter-btn"),
        gfa = $(".gallery-filters a");
    function showFilters() {
        gfw.fadeIn(1);
        filbtn.removeClass("hid-filter");
        gfo.addClass("vis_overlay");
        setTimeout(function () {
            gfa.each(function (a) {
                var boi = $(this);
                setTimeout(function () {
                    TweenMax.to(boi, 0.5, {
                        force3D: true,
                        ease: Power2.easeOut,
                        opacity: "1",
                        top: "0",
                    });
                }, 130 * a);
            });
        }, 400);
    }
    function hideFilters() {
        filbtn.addClass("hid-filter");
        gfo.removeClass("vis_overlay");
        TweenMax.to(gfa, 0.5, {
            force3D: true,
            ease: Power2.easeOut,
            opacity: "0",
            top: "10px"
        });
        setTimeout(function () {
            gfw.fadeOut(1);
        }, 200);
    }
    filbtn.on("click", function () {
        if ($(this).hasClass("hid-filter")) showFilters();
        else hideFilters();
    });
    gfo.on("click", function () {
        hideFilters();
    });
    $(window).on("load", function () {
        n();
        inithorizontalPortfolio();
    });
    function csselem() {
        $(".fs-slider-item ").css({
            height: $(".fs-slider").outerHeight(true)
        });
        $(".fslider-fw-item").css({
            height: $(".slider-fw").outerHeight(true)
        });
        $(".ms-item_fs").css({
            height: $(".slideshow-container_wrap").outerHeight(true)
        });
    }
    $(window).on("resize", function () {
        csselem();
        inithorizontalPortfolio();
        setUpCarouselSlider();
    });
    csselem();
    //   sliders ------------------
    if ($(".fs-slider").length > 0) {
        var j3 = new Swiper(".fs-slider .swiper-container", {
            preloadImages: false,
            loop: true,
            grabCursor: true,
            speed: 1400,
            spaceBetween: 0,
            effect: "slide",
            mousewheel: true,
            parallax: true,
            pagination: {
                el: '.hero-slider-wrap_pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.hero-slider-button-next',
                prevEl: '.hero-slider-button-prev',
            },
            autoplay: {
                delay: 3500,
                disableOnInteraction: false
            },
            on: {
                init: function () {
                    var fsslideract = $(".fs-slider .swiper-slide-active").data("fsslideropt1"),
                        fsslideract2 = $(".fs-slider .swiper-slide-active").data("fsslideropt2"),
                        fsslideract3 = $(".fs-slider .swiper-slide-active").data("fsslideropt3"),
                        fsslideurl = $(".fs-slider .swiper-slide-active").data("fssurl");
                    $(".opt-one").html(fsslideract);
                    $(".opt-two").html(fsslideract2);
                    $(".opt-three").html(fsslideract3);
                    $(".hero-slider_details_url").attr("href", fsslideurl);
                },
            }
        });
        j3.on("slideChangeTransitionStart", function () {
            sliderDetailsChangeStart();
            $(".slide-progress").css({
                height: 0,
                transition: "height 0s"
            });
        });
        j3.on("slideChangeTransitionEnd", function () {
            sliderDetailsChangeEnd();
            $(".slide-progress").css({
                height: "100%",
                transition: "height 3000ms"
            });
        });
        j3.on('slideChange', function () {
            var csli = j3.realIndex + 1,
                curnum = $('.current_s');
            TweenMax.to(curnum, 0.2, {
                force3D: true,
                y: -10,
                opacity: 0,
                ease: Power2.easeOut,
                onComplete: function () {
                    TweenMax.to(curnum, 0.1, {
                        force3D: true,
                        y: 10
                    });
                    curnum.html(".0" + csli);
                }
            });
            TweenMax.to(curnum, 0.2, {
                force3D: true,
                y: 0,
                delay: 0.3,
                opacity: 1,
                ease: Power2.easeOut
            });
        });
        var totalSlides = j3.slides.length - 2;
        $('.total_s').html(".0" + totalSlides);
    }
    var sliderDetailsItem = $(".hero-slider_details li");
    function sliderDetailsChangeStart() {
        TweenMax.to(sliderDetailsItem, 0.8, {
            force3D: true,
            y: "-30px",
            opacity: "0",
            ease: Power2.easeOut,
            onComplete: function () {
                TweenMax.to(sliderDetailsItem, 0.1, {
                    force3D: true,
                    y: "30px",
                    ease: Power2.easeOut,
                });
                var fsslideract = $(".fs-slider .swiper-slide-active").data("fsslideropt1"),
                    fsslideract2 = $(".fs-slider .swiper-slide-active").data("fsslideropt2"),
                    fsslideract3 = $(".fs-slider .swiper-slide-active").data("fsslideropt3");
                $(".opt-one").html(fsslideract);
                $(".opt-two").html(fsslideract2);
                $(".opt-three").html(fsslideract3);
            }
        });
    }
    function sliderDetailsChangeEnd() {
        sliderDetailsItem.each(function (ace) {
            var bp2 = $(this);
            setTimeout(function () {
                TweenMax.to(bp2, 0.6, {
                    force3D: true,
                    y: "0",
                    opacity: "1",
                    ease: Power2.easeOut
                });
            }, 110 * ace);
        });
    }
    if ($(".serv-carousel").length > 0) {
        var ms1 = new Swiper(".serv-carousel .swiper-container", {
            loop: true,
            grabCursor: true,
            autoHeight: false,
            centeredSlides: true,
            slidesPerView: 3,
            spaceBetween: 2,
            speed: 1400,
            mousewheel: false,
            navigation: {
                nextEl: '.serv-carousel-next',
                prevEl: '.serv-carousel-prev',
            },
            pagination: {
                el: '.serv-pagination',
                clickable: true,
            },
            breakpoints: {
                1064: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
            }
        });
    }
    if ($(".testilider").length > 0) {
        var j5 = new Swiper(".testilider .swiper-container", {
            preloadImages: false,
            slidesPerView: 4,
            spaceBetween: 10,
            loop: true,
            grabCursor: true,
            mousewheel: false,
            pagination: {
                el: '.tc-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.ss-slider-next',
                prevEl: '.ss-slider-prev',
            },
            breakpoints: {
                1300: {
                    slidesPerView: 3,
                },
                768: {
                    slidesPerView: 2,
                    centeredSlides: true,
                },
                640: {
                    slidesPerView: 1,
                },
            }
        });
    }
    if ($(".slider-fw").length > 0) {
        $(".slider-fw_wrap .swiper-slide .bg").each(function () {
            var ccasdc3 = $(this).attr("data-bg");
            $("<div class='thumb-img'><img src='" + ccasdc3 + "'></div>").appendTo(".thumbnail-wrap");
        });
        $(".thumb-img").on('click', function () {
            j5.slideTo($(this).index() + 1, 1);
            hideThumbnails();
        });
        var j5 = new Swiper(".slider-fw .swiper-container", {
            preloadImages: false,
            slidesPerView: 1,
            spaceBetween: 10,
            loop: true,
            grabCursor: true,
            mousewheel: true,
            speed: 1400,
            navigation: {
                nextEl: '.hero-slider-button-next',
                prevEl: '.hero-slider-button-prev',
            },
            pagination: {
                el: '.slider-fw_pagination',
                clickable: true,
            },
            autoplay: {
                delay: 3500,
                disableOnInteraction: false
            },
        });
        j5.on('slideChange', function () {
            var csli = j5.realIndex + 1,
                curnum = $('.hsc_counter-wrap .current');
            TweenMax.to(curnum, 0.2, {
                force3D: true,
                y: -10,
                opacity: 0,
                ease: Power2.easeOut,
                onComplete: function () {
                    TweenMax.to(curnum, 0.1, {
                        force3D: true,
                        y: 10
                    });
                    curnum.html(".0" + csli);
                }
            });
            TweenMax.to(curnum, 0.2, {
                force3D: true,
                y: 0,
                delay: 0.3,
                opacity: 1,
                ease: Power2.easeOut
            });
        });
        var autobtn2 = $(".play-pause_slider2");
        function autoEnd2() {
            autobtn2.removeClass("auto_actslider2");
            j5.autoplay.stop();
        }
        function autoStart2() {
            autobtn2.addClass("auto_actslider2");
            j5.autoplay.start();
        }
        autobtn2.on("click", function () {
            if (autobtn2.hasClass("auto_actslider2")) autoEnd2();
            else autoStart2();
            return false;
        });
        j5.on("slideChangeTransitionStart", function () {
            eqwe();
        });
        j5.on("slideChangeTransitionEnd", function () {
            kpsc();
        });
    }
    function kpsc() {
        $(".fwslide-progress").css({
            width: "100%",
            transition: "width 3000ms"
        });
    }
    function eqwe() {
        $(".fwslide-progress").css({
            width: 0,
            transition: "width 0s"
        });
    };
    function setUpCarouselSlider() {
        $('.fw-carousel .swiper-wrapper').addClass('no-horizontal-slider');
        if ($(".fw-carousel").length > 0) {
            if ($(window).width() >= 1064 && j2 == undefined) {
                var mouseContr = $(".fw-carousel").data("mousecontrol");
                var totalSlides2 = $(".fw-carousel .swiper-slide").length;
                var j2 = new Swiper(".fw-carousel .swiper-container", {
                    preloadImages: false,
                    loop: false,
                    freeMode: false,
                    slidesPerView: 'auto',
                    spaceBetween: 20,
                    grabCursor: true,
                    mousewheel: mouseContr,
                    speed: 1400,
                    direction: "horizontal",
                    scrollbar: {
                        el: '.hs_init',
                        draggable: true,
                    },
                    effect: "slide",

                    navigation: {
                        nextEl: '.ss-slider-next',
                        prevEl: '.ss-slider-prev',
                    },
                    on: {
                        resize: function () {
                            if ($(window).width() < 1064) {
                                j2.update();
                            }
                        },
                    }
                });
                $(".fw-carousel.thumb-contr .swiper-slide img").each(function () {
                    var ccasdc = $(this).attr("src");
                    $("<div class='thumb-img'><img src='" + ccasdc + "'></div>").appendTo(".thumbnail-wrap");
                });
                $(".thumb-img").on('click', function () {
                    j2.slideTo($(this).index(), 500);
                    hideThumbnails();
                });
                $('.fw-carousel-counter').html('01');
                j2.on('slideChange', function () {
                    var csli3 = j2.realIndex + 1,
                        curnum3 = $('.fw-carousel-counter');
                    curnum3.html('.0' + csli3);
                });
            }
            if ($(window).width() < 1064 && j2 !== undefined) {
                j2.destroy();
                j2 = undefined;
                $('.fw-carousel .swiper-wrapper').removeAttr('style').addClass('no-horizontal-slider');
                $('.swiper-slide').removeAttr('style');
            }
        }
    }
    setTimeout(function () {
        setUpCarouselSlider();
    }, 1);
    $(".photo-info-btn").on("click", function () {
        $(".show-info_act").toggleClass("vis-phot_det");
    });
    var thumbcont = $(".thumbnail-container"),
        thumbItrm = $(".thumb-img"),
        stbtn = $(".show_thumbnails");
    function showThumbnails() {
        TweenMax.to(thumbcont, 1.0, {
            force3D: true,
            bottom: 0,
            ease: Expo.easeInOut,
        });
        stbtn.removeClass("unvisthum");
        hideDetails();
        setTimeout(function () {
            $(".thumb-img").addClass("visthumbnails");
        }, 1000);
    }
    function hideThumbnails() {
        $(".thumb-img").removeClass("visthumbnails");
        TweenMax.to(thumbcont, 1.0, {
            force3D: true,
            delay: 0.2,
            top: "100%",
            ease: Expo.easeInOut,
            onComplete: function () {
                TweenMax.to(thumbcont, 0.1, {
                    force3D: true,
                    top: 0,
                    bottom: "100%",
                    ease: Expo.easeInOut
                });
            }
        });
        stbtn.addClass("unvisthum");
    }
    stbtn.on("click", function () {
        if ($(this).hasClass("unvisthum")) showThumbnails();
        else hideThumbnails();
    });
    function showDetails() {
        $(".project-details_inner").fadeIn(1);
        $(".project-details_wrap").addClass("pdv");
        $(".project-details_overlay").fadeIn(500);
        hideThumbnails();
        $(".single-mod-galley").isotope("layout");
    }
    function hideDetails() {
        $(".project-details_wrap").removeClass("pdv");
        $(".project-details_overlay").fadeOut(500);
        setTimeout(function () {
            $(".project-details_inner").fadeOut(1);
        }, 500);
    }
    $(".pr-det_btn").on("click", function () {
        showDetails();
    });
    $(".cpd").on("click", function () {
        hideDetails();
    });
    if ($(".single-slider").length > 0) {
        var j8 = new Swiper(".single-slider .swiper-container", {
            preloadImages: false,
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            autoHeight: true,
            grabCursor: true,
            mousewheel: false,
            pagination: {
                el: '.ss-slider-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.ss-slider-cont-next',
                prevEl: '.ss-slider-cont-prev',
            },
        });
    }
    if ($(".slideshow-container_wrap").length > 0) {
        var ms1 = new Swiper(".slideshow-container_wrap .swiper-container", {
            preloadImages: false,
            loop: true,
            speed: 1400,
            spaceBetween: 0,
            effect: "fade",
            autoplay: {
                delay: 2500,
                disableOnInteraction: false
            },
            pagination: {
                el: '.hero-slider-wrap_pagination',
                clickable: true,
            },
        });
    }
    if ($(".hero-carousel ").length > 0) {
        var totalSlides3 = $(".hero-carousel .swiper-slide").length;
        var heroCarusel = new Swiper(".hero-carousel .swiper-container", {
            preloadImages: false,
            loop: true,
            centeredSlides: true,
            freeMode: false,
            slidesPerView: 3,
            spaceBetween: 6,
            grabCursor: true,
            mousewheel: true,
            parallax: true,
            speed: 1400,
            effect: "slide",
            init: true,
            autoplay: {
                delay: 2222500,
                disableOnInteraction: false
            },
            pagination: {
                el: '.hero-slider-wrap_pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.carousel-btn_control-next',
                prevEl: '.carousel-btn_control-prev',
            },
            breakpoints: {
                1268: {
                    slidesPerView: 2
                },
                768: {
                    slidesPerView: 1,
                    centeredSlides: false,
                },
            }
        });
    }
    //   appear------------------
    $(".stats").appear(function () {
        $(".num").countTo();
    });
    //   lightGallery------------------
    $(".image-popup , .single-popup-image").lightGallery({
        selector: "this",
        cssEasing: "cubic-bezier(0.25, 0, 0.25, 1)",
        download: false,
        counter: false
    });
    var o = $(".lightgallery"),
        p = o.data("looped");
    o.lightGallery({
        selector: ".lightgallery a.popup-image , .lightgallery  a.popgal",
        cssEasing: "cubic-bezier(0.25, 0, 0.25, 1)",
        download: false,
        loop: p,
        counter: false
    });
    $('#html5-videos').lightGallery({
        selector: 'this',
        counter: false,
        download: false,
        zoom: false
    });
    $(".dynamic-gal").on('click', function () {
        var dynamicgal = eval($(this).attr("data-dynamicPath"));
        $(this).lightGallery({
            dynamic: true,
            dynamicEl: dynamicgal,
            download: false,
            loop: false,
            counter: false
        });
    });
    // Share   ------------------
    $(".share-container").share({
        networks: ['facebook', 'pinterest', 'twitter', 'linkedin', 'tumblr']
    });
    var swra = $(".share-wrapper"),
        clsh = $(".close-share-btn"),
        ssbtn = $(".showshare");
    function showShare() {
        ssbtn.addClass("uncl-share");
        swra.removeClass("isShare").addClass("share-wrapper_vis");
        $(".main-header-container").addClass("scdec");
    }
    function hideShare() {
        ssbtn.removeClass("uncl-share");
        swra.addClass("isShare").removeClass("share-wrapper_vis");
        $(".main-header-container").removeClass("scdec");
    }
    clsh.on("click", function () {
        hideShare();
    });
    ssbtn.on("click", function () {
        if (swra.hasClass("isShare")) showShare();
        else hideShare();
    });
    function showServdetails() {
        $(".services-modal-wrap").addClass("serv-m_vis");
        $(".services-modal-overlay").fadeIn(500);
        $('.services-modal-wrap').animate({
            scrollTop: 0
        }, 500);
    }
    function hideServdetails() {
        $(".services-modal-wrap").removeClass("serv-m_vis");
        $(".services-modal-overlay").fadeOut(500);
        $(".serv-details").stop(true, true).css("display", "none");
    }
    $(".s_psl").on("click", function (ec) {
        ec.preventDefault();
        var b = $(this);
        showServdetails();
        $(b.attr("href")).stop(true, true).fadeIn(500);
    });
    $(".cm_ser").on("click", function () {
        hideServdetails();
    });
    //  Map------------------	
    if ($("#map-single").length > 0) {
        var latlog = $('#map-single').data('latlog'),
            popupTextit = $('#map-single').data('popuptext'),
            map = L.map('map-single').setView(latlog, 15);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        var greenIcon = L.icon({
            iconUrl: 'images/marker.png',
            iconSize: [40, 40],
            popupAnchor: [0, -26]
        });
        L.marker(latlog, {
            icon: greenIcon
        }).addTo(map).bindPopup(popupTextit).openPopup();
    }
    $(".fixed-column").scrollToFixed({
        minWidth: 1064,
        zIndex: 12,
        marginTop: 80,
        removeOffsets: true,
        limit: function () {
            var a = $(".limit-box").offset().top - $(".fixed-column").outerHeight(true);
            return a;
        }
    });
    //   Video------------------	
    if ($(".video-holder-wrap").length > 0) {
        function videoint() {
            var w = $(".background-vimeo").data("vim"),
                bvc = $(".background-vimeo"),
                bvmc = $(".media-container"),
                bvfc = $(".background-vimeo iframe "),
                vch = $(".video-container");
            bvc.append('<iframe src="//player.vimeo.com/video/' + w + '?background=1"  frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen ></iframe>');
            $(".video-holder").height(bvmc.height());
            if ($(window).width() > 1024) {
                if ($(".video-holder").length > 0)
                    if (bvmc.height() / 9 * 16 > bvmc.width()) {
                        bvfc.height(bvmc.height()).width(bvmc.height() / 9 * 16);
                        bvfc.css({
                            "margin-left": -1 * $("iframe").width() / 2 + "px",
                            top: "-75px",
                            "margin-top": "0px"
                        });
                    } else {
                        bvfc.width($(window).width()).height($(window).width() / 16 * 9);
                        bvfc.css({
                            "margin-left": -1 * $("iframe").width() / 2 + "px",
                            "margin-top": -1 * $("iframe").height() / 2 + "px",
                            top: "50%"
                        });
                    }
            } else if ($(window).width() < 760) {
                $(".video-holder").height(bvmc.height());
                bvfc.height(bvmc.height());
            } else {
                $(".video-holder").height(bvmc.height());
                bvfc.height(bvmc.height());
            }
            vch.css("width", $(window).width() + "px");
            vch.css("height", Number(720 / 1280 * $(window).width()) + "px");
            if (vch.height() < $(window).height()) {
                vch.css("height", $(window).height() + "px");
                vch.css("width", Number(1280 / 720 * $(window).height()) + "px");
            }
        }
        videoint();
    }
    //   scroll to------------------
    $(".custom-scroll-link").on("click", function () {
        var a = 70;
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") || location.hostname == this.hostname) {
            var b = $(this.hash);
            b = b.length ? b : $("[name=" + this.hash.slice(1) + "]");
            if (b.length) {
                $("html,body").animate({
                    scrollTop: b.offset().top - a
                }, {
                    queue: false,
                    duration: 1200,
                    easing: "easeInOutExpo"
                });
                return false;
            }
        }
    });
    //   Blog filter ------------------
    $(".blog-btn").on("click", function () {
        $(this).parent(".blog-btn-filter").find("ul").slideToggle(500);
        return false;
    });
    $(".scroll-init ul").singlePageNav({
        filter: ":not(.external)",
        updateHash: false,
        offset: 80,
        threshold: 500,
        speed: 1200,
        currentClass: "actscr-link"
    });
    //   Contact form------------------
    var coninw = $(".contact-form-content"),
        coninbtn = $(".contact-form-btn");

    function showConInfo() {
        $(".contact-form-wrap").fadeIn(100);
        coninw.addClass("vis-coninfwrap");
        coninbtn.removeClass("isconin-btn_vis");
    }
    function hideConInfo() {
        coninw.removeClass("vis-coninfwrap");
        coninbtn.addClass("isconin-btn_vis");
        $(".contact-form-wrap").fadeOut(100);
    }
    coninbtn.on("click", function () {
        if ($(this).hasClass("isconin-btn_vis")) showConInfo();
        else hideConInfo();
    });
    $(".act-cf").on("click", function (e) {
        e.preventDefault();
        showConInfo();
    });
    //   Contact form------------------
    $("#contactform").submit(function () {
        var a = $(this).attr("action");
        $("#message").slideUp(750, function () {
            $("#message").hide();
            $("#submit").attr("disabled", "disabled");
            $.post(a, {
                name: $("#name").val(),
                email: $("#email").val(),
                comments: $("#comments").val()
            }, function (a) {
                document.getElementById("message").innerHTML = a;
                $("#message").slideDown("slow");
                $("#submit").removeAttr("disabled");
                if (null != a.match("success")) $("#contactform").slideDown("slow");
            });
        });
        return false;
    });
    $("#contactform input, #contactform textarea").keyup(function () {
        $("#message").slideUp(1500);
    });
    $(".close-cf , .contact-form-overlay").on("click", function (e) {
        e.preventDefault();
        hideConInfo();
        $("#message").slideUp(200);
        $(".custom-form").find("input[type=text], textarea").val("");
    });

}
$(window).on("scroll", function () {
    var a = $(document).height();
    var b = $(window).height();
    var c = $(window).scrollTop();
    var d = c / (a - b) * 100;
    $(".progress-bar").css({
        width: d + "%"
    });
});
$.fn.duplicate = function (a, b) {
    var c = [];
    for (var d = 0; d < a; d++) $.merge(c, this.clone(b).get());
    return this.pushStack(c);
};
$("<span class='share-button-dot'></span>").duplicate(4).appendTo(".share-button");
//  menu  ------------------
$(".nav-button").on("click", function () {
    $(".main-menu").toggleClass("vismobmenu");
    $(this).toggleClass("cmenu");
});

function mobMenuInit() {
    var ww = $(window).width();
    if (ww < 1064) {
        $(".menusb").remove();
        $(".main-menu").removeClass("nav-holder");
        $(".main-menu nav").clone().addClass("menusb").appendTo(".main-menu");
        $(".menusb").menu();
    } else {
        $(".menusb").remove();
        $(".main-menu").addClass("nav-holder");
    }
}
mobMenuInit();
$("#menu2").menu();
var $window = $(window);
$window.on("resize", function () {
    mobMenuInit();
});
$("<div class='page-load'><div class='page-load_bg'><div class='loader loader_each'><span></span></div></div><div class='page-load_bg2 color-bg'></div></div>").appendTo("#main");
//   load animation------------------
function contentAnimShow() {

}
function contentAnimHide() {
    TweenMax.to($(".page-load_bg"), 1.0, {
        force3D: true,
        bottom: "100%",
        ease: Expo.easeInOut
    });
    TweenMax.to($(".page-load_bg2"), 1.2, {
        force3D: true,
        bottom: "100%",
        delay: 0.0,
        ease: Expo.easeInOut,
        onComplete: function () {
            setTimeout(function () {
                $(".page-load").fadeOut(1);
                TweenMax.to($(".page-load_bg2 , .page-load_bg"), 0.0, {
                    force3D: true,
                    bottom: "0",
                    top: "100%"
                });

            }, 10);
        }
    });
}
$('a.ajax').on('click', function () {
    $('nav li a').removeClass('act-link');
    $(this).addClass('act-link');
});


$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">');
document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
});
//   Init Ajax------------------
$(function () {
    readyFunctions();
    $(document).on({
        ksctbCallback: function () {
            readyFunctions();
        }
    });
});
//   Init All Functions------------------
function readyFunctions() {
    initAndrezini();
}