var GP = {
    // Global events
    common: {
        vars: {
            $body: $('body'),
            $html: $('html'),
            $overlay: $('#latest_news-wrapper'),
            $lMain: $("#l_main"),
            $lNav: $("#l_navigation"),
            $darkenMain: $("#l_content--darken"),
            $darkenNav: $("#l_navigation-primary--darken"),
            $menu: $('.about_menu').find('a'),
            $section: $('.about-wrapper'),
            $horizontalSecondaryNav: $("#l_navigation-secondary-horizontal"),
            $verticalSecondaryNav: $("#l_navigation-secondary-vertical"),
            $headerButton: $('.header_button, .header_button--right, .header_button--left'),
            $headerInfoButton: $('#header_button-info'),
            $shareButton: $('#header_button-share'),
            $bannerArrow: $('#landing_page-banner'),
            $navHeaderExplore: $("#nav-header-explore"),
            $navHeaderMore: $('#nav-header-more'),
            $buttonNavigation: $("#header_button-navigation"),
            rightScroll: null,
            isTouch: null
        },

        init: function() {

            var v = GP.common.vars;

            // Tweak $.fn.scrollTop to return the first childs position top if the element isn't scrollable
            var scrollTopFn = $.fn.scrollTop;

            var scrollTop = function() {
                var args = Array.prototype.slice.call(arguments),
                    scroller = this.data('scroller');

                if (!scroller) {
                    return scrollTopFn.apply(this, args);
                } else {
                    if (args.length > 0) {
                        scroller.scrollTo(0, args[0], 0);
                    } else {
                        var top = scroller.y;
                        console.log(top);

                        return -top;
                    }
                }

            };

            $.fn.scrollTop = scrollTop;

            v.$body.one('mouseover', function() {
                v.isTouch = v.isTouch || false;
                if (!v.isTouch) {
                    v.$body.trigger('gp:inputdetected:mouse');
                }
            }).one('touchstart', function() {
                v.isTouch = v.isTouch || true;
                if (v.isTouch) {
                    v.$body.trigger('gp:inputdetected:touch');
                }
            });

            v.$darkenMain.on('click', this._mainClose);
            v.$darkenNav.on('click', this._navClose);

            v.$buttonNavigation.on('click', function() {
                GP.common.activate(this);
                v.$lMain.toggleClass("active-nav");
            });

            v.$navHeaderMore.on('click', function() {
                GP.common.activate(this);
            });

            v.$navHeaderExplore.on('click', function() {
                GP.common.activate(this);
                v.$lMain.toggleClass("active-nav-countries");
            });

            (v.$headerButton).on('click', this._headerActive);

            $('#content_filter-item-menu').on('click', function() {
                GP.common.activate(this);
                v.$lMain.toggleClass("active-nav");
                $('#header_button-navigation').addClass('active');
            });

            $(window).on('load', function() {
                v.rightScroll = GP.common.CreateScroll();
            });


            $('#l_content-inner').scroll(this.isAtTop);

            v.$navHeaderMore.on('click', this._more);

            var causeRepaintsOn = $("h1, h2, h3, p, .content_item-headline");

            $(window).resize(function() {
                causeRepaintsOn.css("z-index", 1);
            });


            v.$shareButton.on('click', function() {
                GP.common.activate(this);
            });


            // Event Handler For Mobile Nave Handler
            if ($('#l_navigation-handle').length > 0) {
                $('#l_navigation-handle').on('click', function() {
                    if (v.$verticalSecondaryNav.hasClass('active')) {
                        v.$verticalSecondaryNav.removeClass('active');
                    } else {
                        v.$verticalSecondaryNav.addClass('active');
                    }
                });

                $('#l_content').on('click', function() {
                    if (v.$verticalSecondaryNav.hasClass('active')) {
                        v.$verticalSecondaryNav.removeClass('active');
                    }
                });
            }

            v.$verticalSecondaryNav.find('.btn-nav_handle').on('click', function() {
                GP.articles._toggleQueueActive();
            });

        }, // END init

        isMobile: function() {
            var windowWidth = $(window).width();
            return windowWidth < 768;
        },
        isAtTop: function() {
            var v = GP.common.vars;
            var $scrollTop = $(this).scrollTop();
            if ($scrollTop > 0) {
                v.$body.addClass("scrolling");
            } else {
                v.$body.removeClass("scrolling");
            }
        },
        showOverlay: function() {
            var v = this.vars;
            v.$body.toggleClass('overflow-hidden');
            v.$html.toggleClass('overflow-hidden');

            if (v.$overlay.hasClass('is-visible')) {
                v.$overlay.removeClass('is-visible');
            } else {
                v.$overlay.addClass('is-visible');
            }
        },
        _headerActive: function() {
            var v = GP.common.vars;

            var isLatestButton = $(this).is('#js-header_button-latest');
            if (isLatestButton) {
                GP.common.showOverlay();
            } else {
                v.$overlay.removeClass('is-visible');
            }

            var isNavHeaderExplore = $(this).is('#nav-header-explore'),
                $lMain = $("#l_main");

            if (isNavHeaderExplore) {
                if ($lMain.hasClass('active-nav-countries')) {
                    $lMain.removeClass('active-nav-countries');
                } else {
                    $lMain.addClass('active-nav-countries');
                }
            } else {
                $lMain.removeClass('active-nav-countries');
            }

            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            } else {
                v.$headerButton.removeClass('active');
                $(this).addClass('active');
            }

            if (!($(this).is('#header_button-info'))) {
                $('#info_list-wrapper').removeClass('active');
            }

            if (!($(this).is('#header_button-share'))) {
                $('#fullscreen_social').removeClass('active');
            }

        },
        activate: function(el) {
            var activate = $("#" + $(el).data('activate'));
            activate.toggleClass('active');
        },
        bodyActivate: function(el) {
            var activate = $(el).data('activate');
            $('body').toggleClass(activate + "-active");
        },
        _more: function() {
            var moreList = $(this).next(".nav-group-more-list");
            moreList.toggleClass("active");
        },
        /*clone: function() {
            var storiesClone = $copy.clone(true);

            window.setTimeout(function() {
                storiesClone.addClass("item-copy");
                storiesClone.removeAttr('id');
                $copy.parent().append(storiesClone);
            }, 500);

            window.setTimeout(function() {
                storiesClone.addClass("show");
            }, 510);
        },*/
        /* _showMenu: function() {
            var list = $(this).next();
            if (list.hasClass('active')) {
                list.removeClass('active');
            } else {
                list.addClass('active');
            }
        },*/
        _mainClose: function() {
            var v = GP.common.vars;
            v.$lMain.removeClass("active-nav");
            v.$darkenMain.removeClass('active');
            v.$body.removeClass('overflow-hidden');
            v.$html.removeClass('overflow-hidden');
            v.$buttonNavigation.removeClass('active');
        },
        _navClose: function() {
            var v = GP.common.vars;
            v.$lMain.removeClass("active-nav-countries");
            v.$darkenNav.removeClass('active');
        },
        CreateScroll: function() {
            var rightScroll;
            var v = GP.common.vars;

            v.$lcontent = $('#l_content');

            if (Modernizr.touch || true) {

                if ($('#l_content').length > 0) {
                    rightScroll = new IScroll('#l_content', {
                        scrollbars: true,
                        mouseWheel: true,
                        interactiveScrollbars: true,
                        shrinkScrollbars: 'clip',
                        fadeScrollbars: true,
                        useTransform: true,
                        useTransition: true,
                        probeType: 3,
                        disableMouse: true,
                        disablePointer: true,
                        bounce: false,
                        deceleration: 0.0005
                    });

                    var updateBodyClass = function() {
                        if ( !! v.$lcontent.data('scrollMonitor')) {
                            scrollMonitor.update(v.$lcontent);
                        }
                        v.$body.toggleClass('scrolling', this.y !== 0 && this.directionY >= 0);
                    };

                    var updateBodyClassTimer;
                    var updateScrolling = function() {
                        clearTimeout(updateBodyClassTimer);
                        updateBodyClassTimer = setTimeout($.proxy(updateBodyClass, this), 1000 / 60);
                    };

                    rightScroll.on('scroll', updateScrolling);
                    rightScroll.on('scrollStart', updateBodyClass);
                    rightScroll.on('scrollEnd', updateBodyClass);

                    $('#l_content').data('scroller', rightScroll);
                }
/*
                if ($('#l_navigation').length > 0) {
                    v.navScroll = new IScroll('#l_navigation', {
                        scrollbars: true,
                        mouseWheel: true,
                        interactiveScrollbars: true,
                        shrinkScrollbars: 'scale',
                        fadeScrollbars: true,
                        click: true

                    });
                }*/
            }

            if (v.$verticalSecondaryNav.length > 0) {
                v.leftScroll = new IScroll(v.$verticalSecondaryNav[0], {
                    scrollbars: true,
                    mouseWheel: true,
                    interactiveScrollbars: true,
                    shrinkScrollbars: 'scale',
                    fadeScrollbars: true,
                    scrollX: false,
                    scrollY: true,
                    click: true
                });
            }

            if (v.$horizontalSecondaryNav.length > 0) {
                v.topScroll = new IScroll('#l_navigation-secondary-horizontal', {
                    eventPassthrough: true,
                    scrollbars: true,
                    mouseWheel: true,
                    interactiveScrollbars: true,
                    shrinkScrollbars: 'scale',
                    fadeScrollbars: true,
                    scrollX: true,
                    scrollY: false
                });
            }


            // document.addEventListener('touchmove', function(e) {
            //     e.preventDefault();
            // }, false);

            return rightScroll;

        }
    },

    homepage: {
        init: function() {
            var v = GP.common.vars;
        }
    },
    landing: {
        init: function() {
            var v = GP.common.vars,
                stream = v.$verticalSecondaryNav.children(),
                streamClone = stream.clone(true);

            v.$horizontalSecondaryNav.append(streamClone);
            v.$horizontalSecondaryNav.children().addClass("horizontal");

            v.$bannerArrow.on('click', function() {
                GP.common.activate(this);
            });

        }
    },
    articles: {
        init: function() {
            var v = GP.common.vars,
                stream = v.$verticalSecondaryNav.children(),
                streamClone = stream.clone(true);

            v.$horizontalSecondaryNav.append(streamClone);
            v.$horizontalSecondaryNav.children().addClass("horizontal");

            $(".article_stream-item").on("click", this._menuClick);


            $(window).on('load', function() {
                $('.article-wrapper').each(GP.articles._Monitor);

                GP.common.vars.leftScroll.on('flick', function() {
                    GP.articles._toggleQueueActive(this.distX > 0);
                });
            });

            $("#fancybox-manual-c").on('click', function() {
                $.fancybox.open([{
                    href: 'https://farm4.staticflickr.com/3685/13539935244_6189577f80_h.jpg',
                    title: 'Vroin rhoncus sem lobortis, iaculis tellus sit amet, gravida nibh. Vestibulum placerat quis turpis nec molestie. Etiam ac leo non magna bibendum tincidunt. Morbi rhoncus et diam nec commodo. Quisque nulla erat, pretium ac elit vel, faucibus vulputate erat.'
                }, {
                    href: 'http://farm4.staticflickr.com/3742/12148226023_6013bf72be_h.jpg',
                    title: 'Vroin rhoncus sem lobortis, iaculis tellus sit amet, gravida nibh. Vestibulum placerat quis turpis nec molestie. Etiam ac leo non magna bibendum tincidunt. Morbi rhoncus et diam nec commodo. Quisque nulla erat, pretium ac elit vel, faucibus vulputate erat.'
                }, {
                    href: 'https://farm4.staticflickr.com/3701/13541521543_9712f82f2c_b.jpg',
                    title: 'Vroin rhoncus sem lobortis, iaculis tellus sit amet, gravida nibh. Vestibulum placerat quis turpis nec molestie. Etiam ac leo non magna bibendum tincidunt. Morbi rhoncus et diam nec commodo. Quisque nulla erat, pretium ac elit vel, faucibus vulputate erat.'

                }], {

                    local : this,
                    padding: [50, 0, 20, 0],
                    margin      : [15, 15, 40, 15],
                    nextEffect  : 'fade',
                    prevEffect  : 'fade',
                    helpers: {
                        title: {
                            type: 'inside',
                            position: 'bottom'
                        },
                        buttons : {
                          position: 'bottom'
                        }
                    },
                    afterLoad : function(local){
                        //addLinks(local);
                        count(local);
                    },
                    beforeClose : removeLinks
                });
            });


            function count(t) {

              var content =  '<span class="fancybox-counter">' + (t.index + 1) + ' of ' + t.group.length + '</span>';

              if ($('.fancybox-counter').length > 0){
                  $('.fancybox-counter').remove();
                  $("body").append(content);
              }else {
                  $("body").append(content);
              }
            }

            function addLinks(t) {
                var list = $("#links");

                if (!list.length) {
                    list = $('<ul id="links">');

                    for (var i = 0; i < t.group.length; i++) {
                        $('<li data-index="' + i + '"><label></label></li>').click(function() { $.fancybox.jumpto( $(this).data('index'));}).appendTo( list );
                    }

                    list.appendTo( 'body' );
                }

                list.find('li').removeClass('active').eq( t.index ).addClass('active');
            }

            function removeLinks() {
                $("#links").remove();
                $(".fancybox-counter").remove();

            }




        },
        _toggleQueueActive: function(active) {
            var v = GP.common.vars;
            v.$verticalSecondaryNav.toggleClass('active', active);

        },
        _menuClick: function() {
            var scrollTarget = ("#" + $(this).attr('href')),
                scrollNumber = $(scrollTarget).position().top,
                v = GP.common.vars;



            if (!Modernizr.touch && false) {
                $("#l_content-inner").scrollTo($(scrollTarget), 800);
            } else {
                v.rightScroll.scrollTo(0, -scrollNumber, 1000, IScroll.utils.ease.quadratic);
            }

            setTimeout(function() {
                v.$verticalSecondaryNav.removeClass('active');
            }, 1500);

        },
        _Monitor: function(i, el) {
            if (!Modernizr.touch || true) {
                var self = this;
                var v = GP.common.vars;
                var articleMonitor = scrollMonitor.create(el, i === 0 ? {
                    top: 500
                } : {
                    top: 10
                }, $("#l_content")),
                    $topHeadline = $(".header-article_headline"),
                    articleID = $(el).find('.article').attr('id'),
                    $articleStreamItem = $(".article_stream-item");

                var updateActiveArticle = function() {
                    var articleHeadline = $(el).find(".article_headline").text();
                    $topHeadline.text(articleHeadline);

                    $articleStreamItem.each(function(i, el) {
                        var $this = $(this),
                            id = $this.attr("href");
                        //alert(id);
                        if ( !! id && id === articleID) {
                            $this.addClass('active');
                        } else {
                            $this.removeClass('active');
                        }
                    });
                };

                var updateActiveArticleTimer;
                var debouncedCallback = function() {
                    clearTimeout(updateActiveArticleTimer);
                    updateActiveArticleTimer = setTimeout($.proxy(updateActiveArticle, self), 100);
                };

                articleMonitor.fullyEnterViewport(debouncedCallback);

            } else {

            }
        }
    },
    feature: {
        init: function() {
            var v = GP.common.vars;

            /* v.$shareButton.on('click', function() {
                GP.common.activate(this);
            });*/


            $('#feature-navigation').on('click', function() {
                GP.common.activate(this);
                v.$lMain.toggleClass("active-nav");
            });

            $('#feature-chapters').on('click', function() {
                GP.common.bodyActivate(this);
            });

            if ($('#scroll-button').length > 0) {

                $('#scroll-button').on('click touchstart', function() {
                    var body = ($('#feature_article-body-id').position().top) + "px";
                    if (Modernizr.touch) {
                        setTimeout(function() {
                            v.rightScroll.scrollToElement('#feature_article-body-id', 1000, null, null, IScroll.utils.ease.quadratic);
                        }, 0);

                    } else {
                        $('#l_content-inner').scrollTo(body, 800);
                    }
                });
            }
        }
    },
    slideshow: {
        init: function() {



        }
    },
    about: {
        init: function() {
            var v = GP.common.vars;

            var templates = {
                "teamsTemplate": Handlebars.compile($("#teamsTemplate").html())
            };

            for (i = 0, m = teams.length; i < m; i++) {
                var $links = $('#team .about-body');
                $links.append(templates.teamsTemplate(teams[i]));
            }

            v.$menu.on('click', this._aboutSelectSection);

            $(window).on('load', function() {
                if (location.hash !== "") {
                    GP.about._aboutSelectSection();
                }
            });


        },
        _aboutSelectSection: function(e) {
            var v = GP.common.vars;
            var $button = (!e) ? $('.about_menu [href = ' + location.hash + ']') : $(this),
                href = $button.attr('href');

            if (href.match(/^#/)) {
                $("#l_content-inner").scrollTo(0, 400);
                v.$menu.removeClass('active');
                $button.addClass('active');

                v.$section.filter('.active').fadeOut(200, function() {
                    $(this).removeClass('active');
                    $(href).fadeIn(200).addClass('active');
                });

                setTimeout(function() {
                    v.$verticalSecondaryNav.removeClass('active');
                }, 1000);

            }
        }
    }
};

UTIL = {

    fire: function(func, funcname, args) {

        var namespace = GP; // indicate your obj literal namespace here

        funcname = (funcname === undefined) ? 'init' : funcname;
        if (func !== '' && namespace[func] && typeof namespace[func][funcname] == 'function') {
            namespace[func][funcname](args);
        }
    },

    loadEvents: function() {

        var bodyId = document.body.id;

        // hit up common first.
        UTIL.fire('common');

        // do all the classes too.
        $.each(document.body.className.split(/\s+/), function(i, classnm) {
            UTIL.fire(classnm);
            UTIL.fire(classnm, bodyId);
        });

        UTIL.fire('common', 'finalize');

    }
};

// kick it all off here
$(UTIL.loadEvents);