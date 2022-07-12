/**handles:jquery-flexslider**/
!(function (y) {
    var a = !0;
    (y.flexslider = function (v, e) {
        var p = y(v);
        void 0 === e.rtl && "rtl" == y("html").attr("dir") && (e.rtl = !0), (p.vars = y.extend({}, y.flexslider.defaults, e));
        var t,
            o = p.vars.namespace,
            m = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
            r = ("ontouchstart" in window || m || (window.DocumentTouch && document instanceof DocumentTouch)) && p.vars.touch,
            l = "click touchend MSPointerUp keyup",
            c = "",
            f = "vertical" === p.vars.direction,
            h = p.vars.reverse,
            g = 0 < p.vars.itemWidth,
            x = "fade" === p.vars.animation,
            d = "" !== p.vars.asNavFor,
            u = {};
        y.data(v, "flexslider", p),
            (u = {
                init: function () {
                    (p.animating = !1),
                        (p.currentSlide = parseInt(p.vars.startAt || 0, 10)),
                        isNaN(p.currentSlide) && (p.currentSlide = 0),
                        (p.animatingTo = p.currentSlide),
                        (p.atEnd = 0 === p.currentSlide || p.currentSlide === p.last),
                        (p.containerSelector = p.vars.selector.substr(0, p.vars.selector.search(" "))),
                        (p.slides = y(p.vars.selector, p)),
                        (p.container = y(p.containerSelector, p)),
                        (p.count = p.slides.length),
                        (p.syncExists = 0 < y(p.vars.sync).length),
                        "slide" === p.vars.animation && (p.vars.animation = "swing"),
                        (p.prop = f ? "top" : p.vars.rtl ? "marginRight" : "marginLeft"),
                        (p.args = {}),
                        (p.manualPause = !1),
                        (p.stopped = !1),
                        (p.started = !1),
                        (p.startTimeout = null),
                        (p.transitions =
                            !p.vars.video &&
                            !x &&
                            p.vars.useCSS &&
                            (function () {
                                var e = document.createElement("div"),
                                    t = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"],
                                    a;
                                for (a in t) if (void 0 !== e.style[t[a]]) return (p.pfx = t[a].replace("Perspective", "").toLowerCase()), (p.prop = "-" + p.pfx + "-transform"), !0;
                                return !1;
                            })()),
                        (p.isFirefox = -1 < navigator.userAgent.toLowerCase().indexOf("firefox")),
                        (p.ensureAnimationEnd = "") !== p.vars.controlsContainer && (p.controlsContainer = 0 < y(p.vars.controlsContainer).length && y(p.vars.controlsContainer)),
                        "" !== p.vars.manualControls && (p.manualControls = 0 < y(p.vars.manualControls).length && y(p.vars.manualControls)),
                        "" !== p.vars.customDirectionNav && (p.customDirectionNav = 2 === y(p.vars.customDirectionNav).length && y(p.vars.customDirectionNav)),
                        p.vars.randomize &&
                            (p.slides.sort(function () {
                                return Math.round(Math.random()) - 0.5;
                            }),
                            p.container.empty().append(p.slides)),
                        p.doMath(),
                        p.setup("init"),
                        p.vars.controlNav && u.controlNav.setup(),
                        p.vars.directionNav && u.directionNav.setup(),
                        p.vars.keyboard &&
                            (1 === y(p.containerSelector).length || p.vars.multipleKeyboard) &&
                            y(document).on("keyup", function (e) {
                                var e = e.keyCode,
                                    e;
                                p.animating ||
                                    (39 !== e && 37 !== e) ||
                                    ((e = p.vars.rtl ? (37 === e ? p.getTarget("next") : 39 === e && p.getTarget("prev")) : 39 === e ? p.getTarget("next") : 37 === e && p.getTarget("prev")), p.flexAnimate(e, p.vars.pauseOnAction));
                            }),
                        p.vars.mousewheel &&
                            p.on("mousewheel", function (e, t, a, n) {
                                e.preventDefault();
                                var t = t < 0 ? p.getTarget("next") : p.getTarget("prev");
                                p.flexAnimate(t, p.vars.pauseOnAction);
                            }),
                        p.vars.pausePlay && u.pausePlay.setup(),
                        p.vars.slideshow && p.vars.pauseInvisible && u.pauseInvisible.init(),
                        p.vars.slideshow &&
                            (p.vars.pauseOnHover &&
                                p.hover(
                                    function () {
                                        p.manualPlay || p.manualPause || p.pause();
                                    },
                                    function () {
                                        p.manualPause || p.manualPlay || p.stopped || p.play();
                                    }
                                ),
                            (p.vars.pauseInvisible && u.pauseInvisible.isHidden()) || (0 < p.vars.initDelay ? (p.startTimeout = setTimeout(p.play, p.vars.initDelay)) : p.play())),
                        d && u.asNav.setup(),
                        r && p.vars.touch && u.touch(),
                        (!x || (x && p.vars.smoothHeight)) && y(window).on("resize orientationchange focus", u.resize),
                        p.find("img").attr("draggable", "false"),
                        setTimeout(function () {
                            p.vars.start(p);
                        }, 200);
                },
                asNav: {
                    setup: function () {
                        (p.asNav = !0),
                            (p.animatingTo = Math.floor(p.currentSlide / p.move)),
                            (p.currentItem = p.currentSlide),
                            p.slides
                                .removeClass(o + "active-slide")
                                .eq(p.currentItem)
                                .addClass(o + "active-slide"),
                            m
                                ? (v._slider = p).slides.each(function () {
                                      (this._gesture = new MSGesture()),
                                          (this._gesture.target = this).addEventListener(
                                              "MSPointerDown",
                                              function (e) {
                                                  e.preventDefault(), e.currentTarget._gesture && e.currentTarget._gesture.addPointer(e.pointerId);
                                              },
                                              !1
                                          ),
                                          this.addEventListener("MSGestureTap", function (e) {
                                              e.preventDefault();
                                              var t = y(this),
                                                  e = t.index();
                                              y(p.vars.asNavFor).data("flexslider").animating || t.hasClass("active") || ((p.direction = p.currentItem < e ? "next" : "prev"), p.flexAnimate(e, p.vars.pauseOnAction, !1, !0, !0));
                                          });
                                  })
                                : p.slides.on(l, function (e) {
                                      e.preventDefault();
                                      var t = y(this),
                                          e = t.index();
                                      (p.vars.rtl ? -1 * (t.offset().right - y(p).scrollLeft()) : t.offset().left - y(p).scrollLeft()) <= 0 && t.hasClass(o + "active-slide")
                                          ? p.flexAnimate(p.getTarget("prev"), !0)
                                          : y(p.vars.asNavFor).data("flexslider").animating || t.hasClass(o + "active-slide") || ((p.direction = p.currentItem < e ? "next" : "prev"), p.flexAnimate(e, p.vars.pauseOnAction, !1, !0, !0));
                                  });
                    },
                },
                controlNav: {
                    setup: function () {
                        p.manualControls ? u.controlNav.setupManual() : u.controlNav.setupPaging();
                    },
                    setupPaging: function () {
                        var e,
                            t,
                            a = "thumbnails" === p.vars.controlNav ? "control-thumbs" : "control-paging",
                            n = 1,
                            i,
                            s;
                        if (((p.controlNavScaffold = y('<ol class="' + o + "control-nav " + o + a + '"></ol>')), 1 < p.pagingCount))
                            for (var r = 0; r < p.pagingCount; r++) {
                                void 0 === (t = p.slides.eq(r)).attr("data-thumb-alt") && t.attr("data-thumb-alt", ""),
                                    (e = y("<a></a>").attr("href", "#").text(n)),
                                    "thumbnails" === p.vars.controlNav && (e = y("<img/>").attr("src", t.attr("data-thumb"))),
                                    "" !== t.attr("data-thumb-alt") && e.attr("alt", t.attr("data-thumb-alt")),
                                    "thumbnails" === p.vars.controlNav &&
                                        !0 === p.vars.thumbCaptions &&
                                        "" !== (i = t.attr("data-thumbcaption")) &&
                                        void 0 !== i &&
                                        ((s = y("<span></span>")
                                            .addClass(o + "caption")
                                            .text(i)),
                                        e.append(s));
                                var s = y("<li>");
                                e.appendTo(s), s.append("</li>"), p.controlNavScaffold.append(s), n++;
                            }
                        (p.controlsContainer ? y(p.controlsContainer) : p).append(p.controlNavScaffold),
                            u.controlNav.set(),
                            u.controlNav.active(),
                            p.controlNavScaffold.on(l, "a, img", function (e) {
                                var t, a;
                                e.preventDefault(),
                                    ("" !== c && c !== e.type) || ((t = y(this)), (a = p.controlNav.index(t)), t.hasClass(o + "active") || ((p.direction = a > p.currentSlide ? "next" : "prev"), p.flexAnimate(a, p.vars.pauseOnAction))),
                                    "" === c && (c = e.type),
                                    u.setToClearWatchedEvent();
                            });
                    },
                    setupManual: function () {
                        (p.controlNav = p.manualControls),
                            u.controlNav.active(),
                            p.controlNav.on(l, function (e) {
                                var t, a;
                                e.preventDefault(),
                                    ("" !== c && c !== e.type) ||
                                        ((t = y(this)), (a = p.controlNav.index(t)), t.hasClass(o + "active") || (a > p.currentSlide ? (p.direction = "next") : (p.direction = "prev"), p.flexAnimate(a, p.vars.pauseOnAction))),
                                    "" === c && (c = e.type),
                                    u.setToClearWatchedEvent();
                            });
                    },
                    set: function () {
                        var e = "thumbnails" === p.vars.controlNav ? "img" : "a";
                        p.controlNav = y("." + o + "control-nav li " + e, p.controlsContainer || p);
                    },
                    active: function () {
                        p.controlNav
                            .removeClass(o + "active")
                            .eq(p.animatingTo)
                            .addClass(o + "active");
                    },
                    update: function (e, t) {
                        1 < p.pagingCount && "add" === e ? p.controlNavScaffold.append(y('<li><a href="#">' + p.count + "</a></li>")) : (1 === p.pagingCount ? p.controlNavScaffold.find("li") : p.controlNav.eq(t).closest("li")).remove(),
                            u.controlNav.set(),
                            1 < p.pagingCount && p.pagingCount !== p.controlNav.length ? p.update(t, e) : u.controlNav.active();
                    },
                },
                directionNav: {
                    setup: function () {
                        var e = y(
                            '<ul class="' +
                                o +
                                'direction-nav"><li class="' +
                                o +
                                'nav-prev"><a class="' +
                                o +
                                'prev" href="#">' +
                                p.vars.prevText +
                                '</a></li><li class="' +
                                o +
                                'nav-next"><a class="' +
                                o +
                                'next" href="#">' +
                                p.vars.nextText +
                                "</a></li></ul>"
                        );
                        p.customDirectionNav
                            ? (p.directionNav = p.customDirectionNav)
                            : p.controlsContainer
                            ? (y(p.controlsContainer).append(e), (p.directionNav = y("." + o + "direction-nav li a", p.controlsContainer)))
                            : (p.append(e), (p.directionNav = y("." + o + "direction-nav li a", p))),
                            u.directionNav.update(),
                            p.directionNav.on(l, function (e) {
                                var t;
                                e.preventDefault(),
                                    ("" !== c && c !== e.type) || ((t = y(this).hasClass(o + "next") ? p.getTarget("next") : p.getTarget("prev")), p.flexAnimate(t, p.vars.pauseOnAction)),
                                    "" === c && (c = e.type),
                                    u.setToClearWatchedEvent();
                            });
                    },
                    update: function () {
                        var e = o + "disabled";
                        1 === p.pagingCount
                            ? p.directionNav.addClass(e).attr("tabindex", "-1")
                            : p.vars.animationLoop
                            ? p.directionNav.removeClass(e).removeAttr("tabindex")
                            : 0 === p.animatingTo
                            ? p.directionNav
                                  .removeClass(e)
                                  .filter("." + o + "prev")
                                  .addClass(e)
                                  .attr("tabindex", "-1")
                            : p.animatingTo === p.last
                            ? p.directionNav
                                  .removeClass(e)
                                  .filter("." + o + "next")
                                  .addClass(e)
                                  .attr("tabindex", "-1")
                            : p.directionNav.removeClass(e).removeAttr("tabindex");
                    },
                },
                pausePlay: {
                    setup: function () {
                        var e = y('<div class="' + o + 'pauseplay"><a href="#"></a></div>');
                        p.controlsContainer ? (p.controlsContainer.append(e), (p.pausePlay = y("." + o + "pauseplay a", p.controlsContainer))) : (p.append(e), (p.pausePlay = y("." + o + "pauseplay a", p))),
                            u.pausePlay.update(p.vars.slideshow ? o + "pause" : o + "play"),
                            p.pausePlay.on(l, function (e) {
                                e.preventDefault(),
                                    ("" !== c && c !== e.type) || (y(this).hasClass(o + "pause") ? ((p.manualPause = !0), (p.manualPlay = !1), p.pause()) : ((p.manualPause = !1), (p.manualPlay = !0), p.play())),
                                    "" === c && (c = e.type),
                                    u.setToClearWatchedEvent();
                            });
                    },
                    update: function (e) {
                        "play" === e
                            ? p.pausePlay
                                  .removeClass(o + "pause")
                                  .addClass(o + "play")
                                  .html(p.vars.playText)
                            : p.pausePlay
                                  .removeClass(o + "play")
                                  .addClass(o + "pause")
                                  .html(p.vars.pauseText);
                    },
                },
                touch: function () {
                    var n,
                        i,
                        s,
                        r,
                        o,
                        l,
                        e,
                        c,
                        d,
                        u = !1,
                        t = 0,
                        a = 0;
                    m ||
                        ((e = function (e) {
                            p.animating
                                ? e.preventDefault()
                                : (!window.navigator.msPointerEnabled && 1 !== e.touches.length) ||
                                  (p.pause(),
                                  (r = f ? p.h : p.w),
                                  (l = Number(new Date())),
                                  (t = e.touches[0].pageX),
                                  (a = e.touches[0].pageY),
                                  (s =
                                      g && h && p.animatingTo === p.last
                                          ? 0
                                          : g && h
                                          ? p.limit - (p.itemW + p.vars.itemMargin) * p.move * p.animatingTo
                                          : g && p.currentSlide === p.last
                                          ? p.limit
                                          : g
                                          ? (p.itemW + p.vars.itemMargin) * p.move * p.currentSlide
                                          : h
                                          ? (p.last - p.currentSlide + p.cloneOffset) * r
                                          : (p.currentSlide + p.cloneOffset) * r),
                                  (n = f ? a : t),
                                  (i = f ? t : a),
                                  v.addEventListener("touchmove", c, !1),
                                  v.addEventListener("touchend", d, !1));
                        }),
                        (d = function (e) {
                            var t, a;
                            v.removeEventListener("touchmove", c, !1),
                                p.animatingTo !== p.currentSlide ||
                                    u ||
                                    null === o ||
                                    ((a = 0 < (t = h ? -o : o) ? p.getTarget("next") : p.getTarget("prev")),
                                    p.canAdvance(a) && ((Number(new Date()) - l < 550 && 50 < Math.abs(t)) || Math.abs(t) > r / 2)
                                        ? p.flexAnimate(a, p.vars.pauseOnAction)
                                        : !x && p.canAdvance(a) && p.flexAnimate(p.currentSlide, p.vars.pauseOnAction, !0)),
                                v.removeEventListener("touchend", d, !1),
                                p.vars.slideshow && null !== o && Math.abs(t) < 50 && p.play(),
                                (s = o = i = n = null);
                        }),
                        v.addEventListener("touchstart", e, {
                            passive: !0,
                            capture: !(c = function (e) {
                                (t = e.touches[0].pageX),
                                    (a = e.touches[0].pageY),
                                    (o = f ? n - a : (p.vars.rtl ? -1 : 1) * (n - t)),
                                    (!(u = f ? Math.abs(o) < Math.abs(t - i) : Math.abs(o) < Math.abs(a - i)) || 500 < Number(new Date()) - l) &&
                                        (e.preventDefault(),
                                        !x && p.transitions && (p.vars.animationLoop || (o /= (0 === p.currentSlide && o < 0) || (p.currentSlide === p.last && 0 < o) ? Math.abs(o) / r + 2 : 1), p.setProps(s + o, "setTouch")));
                            }),
                        }));
                },
                resize: function () {
                    !p.animating &&
                        p.is(":visible") &&
                        (g || p.doMath(),
                        x
                            ? u.smoothHeight()
                            : g
                            ? (p.slides.width(p.computedW), p.update(p.pagingCount), p.setProps())
                            : f
                            ? (p.viewport.height(p.h), p.setProps(p.h, "setTotal"))
                            : (p.vars.smoothHeight && u.smoothHeight(), p.newSlides.width(p.computedW), p.setProps(p.computedW, "setTotal")));
                },
                smoothHeight: function (e) {
                    var t;
                    (f && !x) || ((t = x ? p : p.viewport), e ? t.animate({ height: p.slides.eq(p.animatingTo).innerHeight() }, e) : t.innerHeight(p.slides.eq(p.animatingTo).innerHeight()));
                },
                sync: function (e) {
                    var t = y(p.vars.sync).data("flexslider"),
                        a = p.animatingTo;
                    switch (e) {
                        case "animate":
                            t.flexAnimate(a, p.vars.pauseOnAction, !1, !0);
                            break;
                        case "play":
                            t.playing || t.asNav || t.play();
                            break;
                        case "pause":
                            t.pause();
                    }
                },
                uniqueID: function (e) {
                    return (
                        e
                            .filter("[id]")
                            .add(e.find("[id]"))
                            .each(function () {
                                var e = y(this);
                                e.attr("id", e.attr("id") + "_clone");
                            }),
                        e
                    );
                },
                pauseInvisible: {
                    visProp: null,
                    init: function () {
                        var e = u.pauseInvisible.getHiddenProp(),
                            e;
                        e &&
                            ((e = e.replace(/[H|h]idden/, "") + "visibilitychange"),
                            document.addEventListener(e, function () {
                                u.pauseInvisible.isHidden() ? (p.startTimeout ? clearTimeout(p.startTimeout) : p.pause()) : !p.started && 0 < p.vars.initDelay ? setTimeout(p.play, p.vars.initDelay) : p.play();
                            }));
                    },
                    isHidden: function () {
                        var e = u.pauseInvisible.getHiddenProp();
                        return !!e && document[e];
                    },
                    getHiddenProp: function () {
                        var e = ["webkit", "moz", "ms", "o"];
                        if ("hidden" in document) return "hidden";
                        for (var t = 0; t < e.length; t++) if (e[t] + "Hidden" in document) return e[t] + "Hidden";
                        return null;
                    },
                },
                setToClearWatchedEvent: function () {
                    clearTimeout(t),
                        (t = setTimeout(function () {
                            c = "";
                        }, 3e3));
                },
            }),
            (p.flexAnimate = function (e, t, a, n, i) {
                if (
                    (p.vars.animationLoop || e === p.currentSlide || (p.direction = e > p.currentSlide ? "next" : "prev"),
                    d && 1 === p.pagingCount && (p.direction = p.currentItem < e ? "next" : "prev"),
                    !p.animating && (p.canAdvance(e, i) || a) && p.is(":visible"))
                ) {
                    if (d && n) {
                        var n = y(p.vars.asNavFor).data("flexslider");
                        if (
                            ((p.atEnd = 0 === e || e === p.count - 1),
                            n.flexAnimate(e, !0, !1, !0, i),
                            (p.direction = p.currentItem < e ? "next" : "prev"),
                            (n.direction = p.direction),
                            Math.ceil((e + 1) / p.visible) - 1 === p.currentSlide || 0 === e)
                        )
                            return (
                                (p.currentItem = e),
                                p.slides
                                    .removeClass(o + "active-slide")
                                    .eq(e)
                                    .addClass(o + "active-slide"),
                                !1
                            );
                        (p.currentItem = e),
                            p.slides
                                .removeClass(o + "active-slide")
                                .eq(e)
                                .addClass(o + "active-slide"),
                            (e = Math.floor(e / p.visible));
                    }
                    var i, e, i, s, e;
                    (p.animating = !0),
                        (p.animatingTo = e),
                        t && p.pause(),
                        p.vars.before(p),
                        p.syncExists && !i && u.sync("animate"),
                        p.vars.controlNav && u.controlNav.active(),
                        g ||
                            p.slides
                                .removeClass(o + "active-slide")
                                .eq(e)
                                .addClass(o + "active-slide"),
                        (p.atEnd = 0 === e || e === p.last),
                        p.vars.directionNav && u.directionNav.update(),
                        e === p.last && (p.vars.end(p), p.vars.animationLoop || p.pause()),
                        x
                            ? r
                                ? (p.slides.eq(p.currentSlide).css({ opacity: 0, zIndex: 1 }), p.slides.eq(e).css({ opacity: 1, zIndex: 2 }), p.wrapup(s))
                                : (p.slides.eq(p.currentSlide).css({ zIndex: 1 }).animate({ opacity: 0 }, p.vars.animationSpeed, p.vars.easing),
                                  p.slides.eq(e).css({ zIndex: 2 }).animate({ opacity: 1 }, p.vars.animationSpeed, p.vars.easing, p.wrapup))
                            : ((s = f ? p.slides.filter(":first").height() : p.computedW),
                              (e = g
                                  ? ((i = p.vars.itemMargin), (i = (p.itemW + i) * p.move * p.animatingTo) > p.limit && 1 !== p.visible ? p.limit : i)
                                  : 0 === p.currentSlide && e === p.count - 1 && p.vars.animationLoop && "next" !== p.direction
                                  ? h
                                      ? (p.count + p.cloneOffset) * s
                                      : 0
                                  : p.currentSlide === p.last && 0 === e && p.vars.animationLoop && "prev" !== p.direction
                                  ? h
                                      ? 0
                                      : (p.count + 1) * s
                                  : h
                                  ? (p.count - 1 - e + p.cloneOffset) * s
                                  : (e + p.cloneOffset) * s),
                              p.setProps(e, "", p.vars.animationSpeed),
                              p.transitions
                                  ? ((p.vars.animationLoop && p.atEnd) || ((p.animating = !1), (p.currentSlide = p.animatingTo)),
                                    p.container.off("webkitTransitionEnd transitionend"),
                                    p.container.on("webkitTransitionEnd transitionend", function () {
                                        clearTimeout(p.ensureAnimationEnd), p.wrapup(s);
                                    }),
                                    clearTimeout(p.ensureAnimationEnd),
                                    (p.ensureAnimationEnd = setTimeout(function () {
                                        p.wrapup(s);
                                    }, p.vars.animationSpeed + 100)))
                                  : p.container.animate(p.args, p.vars.animationSpeed, p.vars.easing, function () {
                                        p.wrapup(s);
                                    })),
                        p.vars.smoothHeight && u.smoothHeight(p.vars.animationSpeed);
                }
            }),
            (p.wrapup = function (e) {
                x || g || (0 === p.currentSlide && p.animatingTo === p.last && p.vars.animationLoop ? p.setProps(e, "jumpEnd") : p.currentSlide === p.last && 0 === p.animatingTo && p.vars.animationLoop && p.setProps(e, "jumpStart")),
                    (p.animating = !1),
                    (p.currentSlide = p.animatingTo),
                    p.vars.after(p);
            }),
            (p.animateSlides = function () {
                !p.animating && a && p.flexAnimate(p.getTarget("next"));
            }),
            (p.pause = function () {
                clearInterval(p.animatedSlides), (p.animatedSlides = null), (p.playing = !1), p.vars.pausePlay && u.pausePlay.update("play"), p.syncExists && u.sync("pause");
            }),
            (p.play = function () {
                p.playing && clearInterval(p.animatedSlides),
                    (p.animatedSlides = p.animatedSlides || setInterval(p.animateSlides, p.vars.slideshowSpeed)),
                    (p.started = p.playing = !0),
                    p.vars.pausePlay && u.pausePlay.update("pause"),
                    p.syncExists && u.sync("play");
            }),
            (p.stop = function () {
                p.pause(), (p.stopped = !0);
            }),
            (p.canAdvance = function (e, t) {
                var a = d ? p.pagingCount - 1 : p.last;
                return !(
                    !t &&
                    (!d || p.currentItem !== p.count - 1 || 0 !== e || "prev" !== p.direction) &&
                    ((d && 0 === p.currentItem && e === p.pagingCount - 1 && "next" !== p.direction) ||
                        (e === p.currentSlide && !d) ||
                        (!p.vars.animationLoop && ((p.atEnd && 0 === p.currentSlide && e === a && "next" !== p.direction) || (p.atEnd && p.currentSlide === a && 0 === e && "next" === p.direction))))
                );
            }),
            (p.getTarget = function (e) {
                return "next" === (p.direction = e) ? (p.currentSlide === p.last ? 0 : p.currentSlide + 1) : 0 === p.currentSlide ? p.last : p.currentSlide - 1;
            }),
            (p.setProps = function (e, t, a) {
                var n,
                    i =
                        ((n = e || (p.itemW + p.vars.itemMargin) * p.move * p.animatingTo),
                        (function () {
                            if (g) return "setTouch" === t ? e : h && p.animatingTo === p.last ? 0 : h ? p.limit - (p.itemW + p.vars.itemMargin) * p.move * p.animatingTo : p.animatingTo === p.last ? p.limit : n;
                            switch (t) {
                                case "setTotal":
                                    return h ? (p.count - 1 - p.currentSlide + p.cloneOffset) * e : (p.currentSlide + p.cloneOffset) * e;
                                case "setTouch":
                                    return e;
                                case "jumpEnd":
                                    return h ? e : p.count * e;
                                case "jumpStart":
                                    return h ? p.count * e : e;
                                default:
                                    return e;
                            }
                        })() *
                            (p.vars.rtl ? 1 : -1) +
                            "px");
                p.transitions &&
                    ((i = p.isFirefox ? (f ? "translate3d(0," + i + ",0)" : "translate3d(" + parseInt(i) + "px,0,0)") : f ? "translate3d(0," + i + ",0)" : "translate3d(" + (p.vars.rtl ? -1 : 1) * parseInt(i) + "px,0,0)"),
                    p.container.css("-" + p.pfx + "-transition-duration", (a = void 0 !== a ? a / 1e3 + "s" : "0s")),
                    p.container.css("transition-duration", a)),
                    (p.args[p.prop] = i),
                    (!p.transitions && void 0 !== a) || p.container.css(p.args),
                    p.container.css("transform", i);
            }),
            (p.setup = function (e) {
                var t, a;
                x
                    ? (p.vars.rtl ? p.slides.css({ width: "100%", float: "right", marginLeft: "-100%", position: "relative" }) : p.slides.css({ width: "100%", float: "left", marginRight: "-100%", position: "relative" }),
                      "init" === e &&
                          (r
                              ? p.slides
                                    .css({ opacity: 0, display: "block", webkitTransition: "opacity " + p.vars.animationSpeed / 1e3 + "s ease", zIndex: 1 })
                                    .eq(p.currentSlide)
                                    .css({ opacity: 1, zIndex: 2 })
                              : 0 == p.vars.fadeFirstSlide
                              ? p.slides.css({ opacity: 0, display: "block", zIndex: 1 }).eq(p.currentSlide).css({ zIndex: 2 }).css({ opacity: 1 })
                              : p.slides.css({ opacity: 0, display: "block", zIndex: 1 }).eq(p.currentSlide).css({ zIndex: 2 }).animate({ opacity: 1 }, p.vars.animationSpeed, p.vars.easing)),
                      p.vars.smoothHeight && u.smoothHeight())
                    : ("init" === e &&
                          ((p.viewport = y('<div class="' + o + 'viewport"></div>')
                              .css({ overflow: "hidden", position: "relative" })
                              .appendTo(p)
                              .append(p.container)),
                          (p.cloneCount = 0),
                          (p.cloneOffset = 0),
                          h && ((a = y.makeArray(p.slides).reverse()), (p.slides = y(a)), p.container.empty().append(p.slides))),
                      p.vars.animationLoop &&
                          !g &&
                          ((p.cloneCount = 2),
                          (p.cloneOffset = 1),
                          "init" !== e && p.container.find(".clone").remove(),
                          u.uniqueID(p.slides.first().clone().addClass("clone").attr("aria-hidden", "true")).appendTo(p.container),
                          u.uniqueID(p.slides.last().clone().addClass("clone").attr("aria-hidden", "true")).prependTo(p.container)),
                      (p.newSlides = y(p.vars.selector, p)),
                      (t = h ? p.count - 1 - p.currentSlide + p.cloneOffset : p.currentSlide + p.cloneOffset),
                      f && !g
                          ? (p.container
                                .height(200 * (p.count + p.cloneCount) + "%")
                                .css("position", "absolute")
                                .width("100%"),
                            setTimeout(
                                function () {
                                    p.newSlides.css({ display: "block" }), p.doMath(), p.viewport.height(p.h), p.setProps(t * p.h, "init");
                                },
                                "init" === e ? 100 : 0
                            ))
                          : (p.container.width(200 * (p.count + p.cloneCount) + "%"),
                            p.setProps(t * p.computedW, "init"),
                            setTimeout(
                                function () {
                                    p.is(":visible") && p.doMath(),
                                        p.vars.rtl && p.isFirefox
                                            ? p.newSlides.css({ width: p.computedW, marginRight: p.computedM, float: "right", display: "block" })
                                            : p.newSlides.css({ width: p.computedW, marginRight: p.computedM, float: "left", display: "block" }),
                                        p.vars.smoothHeight && u.smoothHeight();
                                },
                                "init" === e ? 100 : 0
                            ))),
                    g ||
                        p.slides
                            .removeClass(o + "active-slide")
                            .eq(p.currentSlide)
                            .addClass(o + "active-slide"),
                    p.vars.init(p);
            }),
            (p.doMath = function () {
                var e = p.slides.first(),
                    t = p.vars.itemMargin,
                    a = p.vars.minItems,
                    n = p.vars.maxItems;
                (p.w = (void 0 === p.viewport ? p : p.viewport).width()),
                    p.isFirefox && (p.w = p.width()),
                    (p.h = e.height()),
                    (p.boxPadding = e.outerWidth() - e.width()),
                    g
                        ? ((p.itemT = p.vars.itemWidth + t),
                          (p.itemM = t),
                          (p.minW = a ? a * p.itemT : p.w),
                          (p.maxW = n ? n * p.itemT - t : p.w),
                          (p.itemW = p.minW > p.w ? (p.w - t * (a - 1)) / a : p.maxW < p.w ? (p.w - t * (n - 1)) / n : p.vars.itemWidth > p.w ? p.w : p.vars.itemWidth),
                          (p.visible = Math.floor(p.w / (p.itemW + t))),
                          (p.move = 0 < p.vars.move && p.vars.move < p.visible ? p.vars.move : p.visible),
                          (p.pagingCount = Math.ceil((p.count - p.visible) / p.move + 1)),
                          (p.last = p.pagingCount - 1),
                          (p.limit = 1 === p.pagingCount ? 0 : p.vars.itemWidth > p.w ? p.itemW * (p.count - 1) + t * (p.count - 1) : (p.itemW + t) * p.count - p.w - t))
                        : ((p.itemW = p.w),
                          jQuery(p).children(".flex-viewport").length && p.w !== jQuery(p).children(".flex-viewport").width() && (p.itemW = jQuery(p).children(".flex-viewport").width()),
                          (p.itemM = t),
                          (p.pagingCount = p.count),
                          (p.last = p.count - 1)),
                    (p.computedW = p.itemW - p.boxPadding),
                    (p.computedM = p.itemM);
            }),
            (p.update = function (e, t) {
                p.doMath(),
                    g || (e < p.currentSlide ? (p.currentSlide += 1) : e <= p.currentSlide && 0 !== e && --p.currentSlide, (p.animatingTo = p.currentSlide)),
                    p.vars.controlNav &&
                        !p.manualControls &&
                        (("add" === t && !g) || p.pagingCount > p.controlNav.length
                            ? u.controlNav.update("add")
                            : (("remove" === t && !g) || p.pagingCount < p.controlNav.length) && (g && p.currentSlide > p.last && (--p.currentSlide, --p.animatingTo), u.controlNav.update("remove", p.last))),
                    p.vars.directionNav && u.directionNav.update();
            }),
            (p.addSlide = function (e, t) {
                var e = y(e);
                (p.count += 1),
                    (p.last = p.count - 1),
                    f && h ? (void 0 !== t ? p.slides.eq(p.count - t).after(e) : p.container.prepend(e)) : void 0 !== t ? p.slides.eq(t).before(e) : p.container.append(e),
                    p.update(t, "add"),
                    (p.slides = y(p.vars.selector + ":not(.clone)", p)),
                    p.setup(),
                    p.vars.added(p);
            }),
            (p.removeSlide = function (e) {
                var t = isNaN(e) ? p.slides.index(y(e)) : e;
                --p.count,
                    (p.last = p.count - 1),
                    (isNaN(e) ? y(e, p.slides) : f && h ? p.slides.eq(p.last) : p.slides.eq(e)).remove(),
                    p.doMath(),
                    p.update(t, "remove"),
                    (p.slides = y(p.vars.selector + ":not(.clone)", p)),
                    p.setup(),
                    p.vars.removed(p);
            }),
            (p.destroy = function () {
                var e = "." + p.vars.namespace;
                p.vars.controlNav && p.controlNav.closest(e + "control-nav").remove(),
                    p.vars.directionNav && p.directionNav.closest(e + "direction-nav").remove(),
                    p.vars.pausePlay && p.pausePlay.closest(e + "pauseplay").remove(),
                    p.find(".clone").remove(),
                    p.off(p.vars.eventNamespace),
                    "fade" != p.vars.animation && p.container.unwrap(),
                    p.container.removeAttr("style"),
                    p.container.off(p.vars.eventNamespace),
                    p.slides.removeAttr("style"),
                    p.slides.filter(e + "active-slide").removeClass(p.vars.namespace + "active-slide"),
                    p.slides.off(p.vars.eventNamespace),
                    y(document).off(p.vars.eventNamespace + "-" + p.id),
                    y(window).off(p.vars.eventNamespace + "-" + p.id),
                    p.stop(),
                    p.removeData("flexslider");
            }),
            u.init();
    }),
        y(window).on({
            blur: function (e) {
                a = !1;
            },
            focus: function (e) {
                a = !0;
            },
        }),
        (y.flexslider.defaults = {
            namespace: "flex-",
            selector: ".slides > li",
            animation: "fade",
            easing: "swing",
            direction: "horizontal",
            reverse: !1,
            animationLoop: !0,
            smoothHeight: !1,
            startAt: 0,
            slideshow: !0,
            slideshowSpeed: 7e3,
            animationSpeed: 600,
            initDelay: 0,
            randomize: !1,
            fadeFirstSlide: !0,
            thumbCaptions: !1,
            pauseOnAction: !0,
            pauseOnHover: !1,
            pauseInvisible: !0,
            useCSS: !0,
            touch: !0,
            video: !1,
            controlNav: !0,
            directionNav: !0,
            prevText: "&#xf104;",
            nextText: "&#xf105;",
            keyboard: !0,
            multipleKeyboard: !1,
            mousewheel: !1,
            pausePlay: !1,
            pauseText: "Pause",
            playText: "Play",
            controlsContainer: "",
            manualControls: "",
            customDirectionNav: "",
            sync: "",
            asNavFor: "",
            itemWidth: 0,
            itemMargin: 0,
            minItems: 1,
            maxItems: 0,
            move: 0,
            allowOneSlide: !0,
            isFirefox: !1,
            start: function () {},
            before: function () {},
            after: function () {},
            end: function () {},
            added: function () {},
            removed: function () {},
            init: function () {},
            rtl: !1,
        }),
        (y.fn.flexslider = function (a) {
            if ("object" == typeof (a = void 0 === a ? {} : a))
                return this.each(function () {
                    var e = y(this),
                        t = a.selector || ".slides > li",
                        t = e.find(t);
                    (1 === t.length && !1 === a.allowOneSlide) || 0 === t.length ? (t.fadeIn(400), a.start && a.start(e)) : void 0 === e.data("flexslider") && new y.flexslider(this, a);
                });
            var e = y(this).data("flexslider");
            switch (a) {
                case "play":
                    e.play();
                    break;
                case "pause":
                    e.pause();
                    break;
                case "stop":
                    e.stop();
                    break;
                case "next":
                    e.flexAnimate(e.getTarget("next"), !0);
                    break;
                case "prev":
                case "previous":
                    e.flexAnimate(e.getTarget("prev"), !0);
                    break;
                case "destroy":
                    e.destroy();
                    break;
                default:
                    "number" == typeof a && e.flexAnimate(a, !0);
            }
        });
})(jQuery);
