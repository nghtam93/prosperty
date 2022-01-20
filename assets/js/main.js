$(document).ready(function(){


    // Custom function which toggles between sticky class (is-sticky)
    var header_sticky=$('[data-toggle="sticky-onscroll"]')
    $(window).scroll(function(){
        $(this).scrollTop()>1?header_sticky.addClass("is-sticky"):header_sticky.removeClass("is-sticky")
    })


    // Click id a
    var jump=function(e)
    {
        $(document).off("scroll");
        if (e){
           var url = $(this).attr("href");
           var id = url.substring(url.lastIndexOf('/') + 1);
           target = id
        }else{
           var target = location.hash;
        }

        if($(target).offset() != undefined){
            e.preventDefault();
            $('html, body').stop().animate({
                'scrollTop': $(target).offset().top
            });

            location.hash = target;
        }
    }

    $(document).on('click', 'body.home a[href*="#"]', function (e) {
        $(this).closest('nav').find('li').removeClass('active')
        $(this).closest('li').addClass('active')
        //Close menu mb
        $('.menu-mb__btn').removeClass('active')
        $('.nav__mobile').removeClass('active')
        $('body').removeClass('modal-open')
    });


    $('body.home a[href*="#"]').bind("click", jump);

    function isEmpty( el ){
          return !$.trim(el.html())
      }

    new WOW().init();

    /*----Get Header Height ---*/
    function get_header_height() {
        var header_sticky = $("header").outerHeight()
        $('body').css("--header-height",header_sticky+'px')
    }

    setTimeout(function(){
        get_header_height()
    }, 500);

    $( window ).resize(function() {
      get_header_height()
    });


    /*----Back to top---*/
    var back_to_top=$(".back-to-top"),offset=220,duration=500;$(window).scroll(function(){$(this).scrollTop()>offset?back_to_top.addClass("active"):back_to_top.removeClass("active")}),$(document).on("click",".back-to-top",function(o){return o.preventDefault(),$("html, body").animate({scrollTop:0},duration),!1});

     //-------------------------------------------------
    // Menu
    //-------------------------------------------------
    $.fn.dnmenu = function( options ) {

        let thiz = this
        let menu = $(this).attr('data-id')
        let menu_id = '#'+menu

        // Default options
        var settings = $.extend({
            name: 'Menu'
        }, options );

        // get ScrollBar Width
        function getScrollBarWidth () {
            var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
                widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
            $outer.remove();
            return 100 - widthWithScroll;
        };
        let ScrollBarWidth = getScrollBarWidth() + 'px';

        // Create wrap
        // Button click
        thiz.click(function(e){
            e.preventDefault()
            if(thiz.hasClass('active')){
                // $('.dnmenu-backdrop').remove()
                $('body').removeClass('modal-open').css("padding-right","")
                $(menu_id).removeClass('active')
                $(thiz).removeClass('active')
                $('.header.-fix').removeClass('-menu-mb-active')

            } else {
                // $('<div class="dnmenu-backdrop">').appendTo('body')
                // $('body').addClass('modal-open').css("padding-right",ScrollBarWidth)
                $(menu_id).addClass('active')
                $(thiz).addClass('active')
                $('.header.-fix').addClass('-menu-mb-active')

            }
        });

        // Custom close
        $('.js-menu__close').click(function(){
            $('body').removeClass('modal-open')
            $('body').removeClass('modal-open').css("padding-right","")
            $(thiz).removeClass('active')
            $(menu_id).removeClass('active')
        })

        // Menu
        var el= $(menu_id).find(".nav__mobile--ul");
        el.find(".menu-item-has-children>a").after('<button class="nav__mobile__btn"><i></i></button>'),

        el.find(".nav__mobile__btn").on("click",function(e){
            e.stopPropagation(),
            $(this).parent().find('.sub-menu').first().is(":visible")?$(this).parent().removeClass("sub-active"):
            $(this).parent().addClass("sub-active"),
            $(this).parent().find('.sub-menu').first().slideToggle()
        })

        // Apply options
        return;
    };

    $('.menu-mb__btn').dnmenu()


    //
    // ADd button menu children
    var el= $('.account__sidebar').find("ul");
    el.find(".menu-item-has-children>a").after('<button class="nav__mobile__btn"><i></i></button>'),

    el.find(".nav__mobile__btn").on("click",function(e){
        e.stopPropagation(),
        $(this).parent().find('.sub-menu').first().is(":visible")?$(this).parent().removeClass("sub-active"):
        $(this).parent().addClass("sub-active"),
        $(this).parent().find('.sub-menu').first().slideToggle()
    })
    //check home
    if($('body').hasClass( "home" )){

    }


    // Tooltip page account
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    // ClipboardJS
    if($(document).find('.js-item-copy').length !=0){
        let clipboard = new ClipboardJS('.js-item-copy');
        clipboard.on('success', function (e) {
            let trigger_button = e.trigger;
            // update the tooltip title, get the tooltip instance, and show it
            trigger_button.setAttribute('data-bs-original-title', 'Copied!');
            let btn_tooltip = bootstrap.Tooltip.getInstance(trigger_button);
            btn_tooltip.show();
            // reset the tooltip title
            trigger_button.setAttribute('data-bs-original-title', 'Copy to clipboard');
        });
    }


});


