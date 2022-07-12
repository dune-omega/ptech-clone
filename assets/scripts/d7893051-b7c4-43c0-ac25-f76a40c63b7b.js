/**handles:avada-fusion-slider**/
function updateVideoTag() {
    jQuery(".fusion-slider-self-hosted-video-placeholder").each(function (e, i) {
        0 < jQuery(i).next("video").length ||
            jQuery(i).after(function () {
                var t = 'width="1800" height="700"',
                    s = "";
                return (
                    jQuery(i.attributes).each(function (e, i) {
                        switch (i.name) {
                            case "class":
                                break;
                            case "data-ogg":
                                s += i.nodeValue ? '<source src="' + i.nodeValue + '" type="video/ogg">' : "";
                                break;
                            case "data-webm":
                                s += i.nodeValue ? '<source src="' + i.nodeValue + '" type="video/webm">' : "";
                                break;
                            case "data-mp4":
                                s += i.nodeValue ? '<source src="' + i.nodeValue + '" type="video/mp4">' : "";
                                break;
                            default:
                                t += " " + i.name + '="' + i.nodeValue + '"';
                        }
                    }),
                    "<video " + t + ">" + s + "</video>"
                );
            });
    });
}
function avadaFusionSlider(e) {
    e &&
        ((this.$el = jQuery(e)),
        (this.isPostContent = 1 <= this.$el.parents(".post-content").length),
        (this.percentageWidth = !1),
        (this.isParallax = !(cssua.ua.mobile || this.breakpointReached() || this.isPostContent) && 1 === parseInt(this.$el.data("parallax"))),
        (this.isFullHeight = 1 === parseInt(this.$el.parent().data("full_height"))),
        (this.isFullScreen = this.isFullHeight || (!this.isPostContent && 1 === parseInt(this.$el.data("full_screen")))),
        (this.isShortcode = 0 === this.$el.parent("#sliders-container").length),
        (this.headerHeight = jQuery(".fusion-header-wrapper").height()),
        (this.resizeWidth = jQuery(window).width()),
        (this.fullHeightOffset = this.$el.parent().data("offset")),
        (this.isBoxedMode = 0 < jQuery(".layout-boxed-mode").length),
        jQuery("body").hasClass("fusion-builder-live") &&
            !jQuery("body").hasClass("fusion-builder-live-preview-only") &&
            (this.$el.css("width", ""), this.$el.css("margin-left", ""), this.$el.css("margin-right", ""), this.$el.css("left", "")),
        this.setResponsiveTypography(),
        !this.isShortcode && this.isParallax && jQuery(".fusion-header").addClass("fusion-header-backface"),
        this.isFullScreen && (this.$el.css("max-width", "100%"), this.$el.find(".slides, .background").css("width", "100%")),
        this.updateXPosition(),
        this.initFlexslider(),
        jQuery(window).on("fusion-resize-horizontal fusion-resize-vertical fusion-column-resized", this.sliderResize.bind(this)),
        jQuery(window).on("scroll", this.windowScroll.bind(this)));
}
(avadaFusionSlider.prototype.fusionReanimateSlider = function (e) {
    var i = e.find(".slide-content"),
        e = e.siblings(".tfs-scroll-down-indicator");
    jQuery(i).each(function () {
        jQuery(this).stop(!0, !0), jQuery(this).css("margin-top", "50px"), jQuery(this).animate({ opacity: "1", "margin-top": "0" }, 1e3);
    }),
        jQuery(e).each(function () {
            var e = jQuery(this);
            e.stop(!0, !0),
                e.css("opacity", "0"),
                i.offset().top + i.height() + 25 < e.offset().top &&
                    (e.css("padding-bottom", "50px"),
                    setTimeout(function () {
                        e.animate({ opacity: "1", "padding-bottom": "0" }, 500, "easeOutCubic");
                    }, 500));
        });
}),
    (avadaFusionSlider.prototype.getHeaderHeight = function () {
        return this.isShortcode && this.isFullHeight
            ? this.fullHeightOffset
                ? fusion.getHeight(this.fullHeightOffset)
                : 0
            : jQuery(".fusion-tb-header:not( #side-header )").length
            ? jQuery(".fusion-tb-header").height()
            : this.breakpointReached() && jQuery("#side-header").length
            ? jQuery("#side-header").outerHeight()
            : jQuery(".fusion-header-wrapper").height();
    }),
    (avadaFusionSlider.prototype.getWpAdminBarHeight = function () {
        var e = 0;
        return "object" == typeof fusion && "function" == typeof fusion.getAdminbarHeight ? (e = fusion.getAdminbarHeight()) : jQuery("#wpadminbar").length && (e = jQuery("#wpadminbar").height()), e;
    }),
    (avadaFusionSlider.prototype.removeLoader = function () {
        this.$el.parent().find(".fusion-slider-loading").remove();
    }),
    (avadaFusionSlider.prototype.getMaxHeight = function () {
        return (
            Math.max.apply(
                null,
                this.$el
                    .find(".slide-content")
                    .map(function () {
                        return jQuery(this).outerHeight();
                    })
                    .get()
            ) + 40
        );
    }),
    (avadaFusionSlider.prototype.removeTitleSeparators = function (e) {
        "function" == typeof jQuery.fn.fusion_responsive_title_shortcode && jQuery(e.slides.eq(e.currentSlide)).find(".fusion-title").fusion_responsive_title_shortcode();
    }),
    (avadaFusionSlider.prototype.getHeightOnFS = function () {
        var e = !1;
        return (
            this.breakpointReached()
                ? (e = !(1 == avadaFusionSliderVars.mobile_header_transparency && "below" === avadaFusionSliderVars.slider_position.toLowerCase()))
                : this.isParallax || jQuery("#side-header").length
                ? "above" !== avadaFusionSliderVars.slider_position.toLowerCase() || jQuery("#side-header").length || (e = !0)
                : (e = !(1 == avadaFusionSliderVars.header_transparency && "below" === avadaFusionSliderVars.slider_position.toLowerCase())),
            jQuery(window).height() - this.getWpAdminBarHeight() - (e ? this.getHeaderHeight() : 0)
        );
    }),
    (avadaFusionSlider.prototype.getWidth = function () {
        var e = this.$el.data("slider_width"),
            i = jQuery(this.$el.find("li").get(0));
        return (
            -1 !== e.indexOf("%")
                ? ((e = (e = (e = (e = i.find(".background-image").data("imgwidth")) || cssua.ua.mobile ? e : i.find("video").width()) || 940) < this.$el.data("slider_width") ? this.$el.data("slider_width") : e),
                  (this.percentageWidth = !0))
                : (e = parseInt(e, 10)),
            e
        );
    }),
    (avadaFusionSlider.prototype.getHeight = function (e) {
        var e,
            i = parseInt(this.$el.data("slider_height"), 10),
            t = i / e;
        return (
            t < 0.5 && (t = 0.5),
            (e = this.$el.parent().parent().parent().width()),
            1 <= this.$el.parents(".post-content").length && ((e = this.$el.width()), this.$el.parents(".tab-content").length && (e = this.$el.parents(".tab-content").width() - 60)),
            (i = (i = (i = t * e) > parseInt(this.$el.data("slider_height"), 10) ? parseInt(this.$el.data("slider_height"), 10) : i) < 200 ? 200 : i)
        );
    }),
    (avadaFusionSlider.prototype.fusionFixZindex = function () {
        (jQuery("body").hasClass("fusion-builder-live") && !jQuery("body").hasClass("fusion-builder-live-preview-only")) ||
            ("absolute" !== jQuery(".fusion-header-wrapper").css("position") && jQuery(".fusion-header-wrapper").css("position", "relative"),
            jQuery("#main, .fusion-footer-widget-area, .fusion-footer-copyright-area, .fusion-page-title-bar").css("position", "relative"),
            jQuery("#main, .fusion-footer-widget-area, .fusion-footer-copyright-area, .fusion-page-title-bar").css("z-index", "3"),
            jQuery(".fusion-header-wrapper").css("z-index", "5"));
    }),
    (avadaFusionSlider.prototype.parallaxAdjustments = function () {
        var e,
            e,
            i,
            t = this;
        this.breakpointReached()
            ? this.breakpointReached() &&
              (this.$el.css("position", "relative"),
              this.$el.css("left", "0"),
              this.$el.css("margin-left", "0"),
              this.fusionFixZindex(),
              jQuery(".fusion-header-wrapper").css("height", "auto"),
              this.$el.parents(".fusion-slider-container").css("margin-top", ""),
              this.$el.find(".flex-direction-nav li a").css("margin-top", ""),
              this.$el.find(".flex-control-nav").css("bottom", 0),
              (0 !== avadaFusionSliderVars.header_transparency && "0" !== avadaFusionSliderVars.header_transparency && !1 !== avadaFusionSliderVars.header_transparency) ||
                  "below" !== avadaFusionSliderVars.slider_position.toLowerCase() ||
                  this.$el.find(".slide-content-container").each(function () {
                      jQuery(this).css("padding-top", "");
                  }))
            : (this.$el.css("position", "fixed"),
              "absolute" !== jQuery(".fusion-header-wrapper").css("position")
                  ? (jQuery(".fusion-header-wrapper").css("position", "relative"),
                    (i = this.getHeaderHeight() / 2 + "px"),
                    "below" === avadaFusionSliderVars.slider_position.toLowerCase() && this.$el.parents(".fusion-slider-container").css("margin-top", "-" + this.getHeaderHeight() + "px"))
                  : (i = "0"),
              this.$el.find(".flex-direction-nav li a").css("margin-top", i),
              jQuery(".fusion-header-wrapper").css("height", this.getHeaderHeight()),
              this.fusionFixZindex(),
              1 == this.$el.data("full_screen") ? this.$el.find(".flex-control-nav").css("bottom", this.getHeaderHeight() / 2) : this.$el.find(".flex-control-nav").css("bottom", 0),
              this.$el.hasClass("fixed-width-slider") &&
                  ("left" === avadaFusionSliderVars.header_position || "right" === avadaFusionSliderVars.header_position
                      ? ((e = this.isShortcode ? jQuery("#main") : jQuery("#sliders-container")).width() < parseFloat(this.$el.parent().css("max-width"))
                            ? this.$el.css("max-width", e.width())
                            : this.$el.css("max-width", this.$el.parent().css("max-width")),
                        -1 * (e = "left" === avadaFusionSliderVars.header_position ? "-" + (this.$el.width() - jQuery("#side-header").width()) / 2 + "px" : "-" + (this.$el.width() + jQuery("#side-header").width()) / 2 + "px") >
                            this.$el.width() && (e = -1 * this.$el.width()))
                      : (e = "-" + this.$el.width() / 2 + "px"),
                  this.$el.css("left", "50%"),
                  this.$el.css("margin-left", e)),
              (0 !== avadaFusionSliderVars.header_transparency && "0" !== avadaFusionSliderVars.header_transparency && !1 !== avadaFusionSliderVars.header_transparency) ||
                  "below" !== avadaFusionSliderVars.slider_position.toLowerCase() ||
                  this.$el.find(".slide-content-container").each(function () {
                      jQuery(this).css("padding-top", t.getHeaderHeight() + "px");
                  }));
    }),
    (avadaFusionSlider.prototype.updateVideoContainers = function (a, n, e) {
        var r = this;
        (void 0 !== e ? e : this.$el.find("video")).each(function () {
            var e, i, t, s;
            jQuery(this).removeAttr("style"),
                (e = "-" + ((t = (t = (jQuery(this).width() / jQuery(this).height()) * a) < n && !r.$el.hasClass("full-width-slider") ? n : t) - r.$el.width()) / 2 + "px"),
                (i = r.$el.parent().parent().parent().width()),
                t < (i = 1 <= r.$el.parents(".post-content").length ? r.$el.width() : i) && !0 === r.percentageWidth && !r.isFullScreen
                    ? ((t = "100%"), (e = 0))
                    : r.isFullScreen && (s = t < i ? ((t = "100%"), (e = 0), "static") : "absolute"),
                jQuery(this).width(t),
                jQuery(this).css("left", e),
                s && jQuery(this).css("position", s);
        });
    }),
    (avadaFusionSlider.prototype.breakpointReached = function (e) {
        switch (e) {
            case "content":
                return Modernizr.mq("only screen and (max-width: " + avadaFusionSliderVars.content_break_point + "px)");
            case "header":
            default:
                return Modernizr.mq("only screen and (max-width: " + avadaFusionSliderVars.side_header_break_point + "px)");
        }
    }),
    (avadaFusionSlider.prototype.updateHeight = function (e) {
        this.$el.parents(".fusion-slider-container").css("max-height", e), this.$el.parents(".fusion-slider-container").css("height", e), this.$el.css("height", e), this.$el.find(".background, .mobile_video_image").css("height", e);
    }),
    (avadaFusionSlider.prototype.updateXPosition = function () {
        var e;
        ("left" !== avadaFusionSliderVars.header_position && "right" !== avadaFusionSliderVars.header_position) ||
            this.$el.hasClass("fixed-width-slider") ||
            !this.isParallax ||
            (this.$el.css("max-width", jQuery("#wrapper").width() + 1),
            jQuery("body").hasClass("side-header-left")
                ? this.$el.css({ left: "50%", transform: "translateX(calc(" + jQuery("#side-header").width() + "px / 2 - 50%))" })
                : jQuery("body").hasClass("side-header-right") && this.$el.css({ left: "50%", transform: "translateX(calc(" + jQuery("#side-header").width() + "px / -2 - 50%))" })),
            this.isParallax &&
                this.isBoxedMode &&
                "top" === avadaFusionSliderVars.header_position &&
                (this.$el.css("width", jQuery(".layout-boxed-mode #wrapper").width()), (e = "-" + this.$el.width() / 2 + "px"), this.$el.css("left", "50%"), this.$el.css("margin-left", e));
    }),
    (avadaFusionSlider.prototype.maybeUpdateButtons = function () {
        cssua.ua.mobile &&
            this.$el.find(".fusion-button").each(function () {
                jQuery(this).removeClass("button-xlarge button-large button-medium"), jQuery(this).addClass("button-small");
            }),
            this.$el.find("a.button").each(function () {
                jQuery(this).data("old", jQuery(this).attr("class"));
            }),
            this.breakpointReached("content")
                ? this.$el.find(".fusion-button").each(function () {
                      jQuery(this).data("old", jQuery(this).attr("class")), jQuery(this).removeClass("button-xlarge button-large button-medium"), jQuery(this).addClass("button-small");
                  })
                : this.$el.find("a.button").each(function () {
                      jQuery(this).attr("class", jQuery(this).data("old"));
                  });
    }),
    (avadaFusionSlider.prototype.initFlexslider = function () {
        var s = this,
            e = {
                animation: this.$el.data("animation"),
                slideshow: this.$el.data("autoplay"),
                slideshowSpeed: this.$el.data("slideshow_speed"),
                animationSpeed: this.$el.data("animation_speed"),
                controlNav: Boolean("pagination_circles" === this.$el.data("slider_indicator")),
                directionNav: Boolean(Number(this.$el.data("nav_arrows"))),
                animationLoop: Boolean(Number(this.$el.data("loop"))),
                smoothHeight: !0,
                pauseOnHover: !1,
                useCSS: !0,
                video: !0,
                touch: !0,
                prevText: "&#xe61e;",
                nextText: "&#xe620;",
                start: function (e) {
                    var i, t;
                    s.removeLoader(),
                        jQuery(e.slides.eq(e.currentSlide)).find(".slide-content-container").show(),
                        jQuery(e.slides.eq(e.currentSlide)).find(".tfs-scroll-down-indicator").show(),
                        s.removeTitleSeparators(),
                        (i = s.isFullScreen ? 0 : s.getWidth()),
                        (t = s.isFullScreen ? s.getHeightOnFS() : s.getHeight(i)),
                        (t = s.isFullScreen && jQuery(".fusion-top-frame").length ? t - jQuery(".fusion-top-frame").height() - jQuery(".fusion-bottom-frame").height() : t) < s.getMaxHeight() && (t = s.getMaxHeight()),
                        setTimeout(function () {
                            s.$el.find("video").each(function () {
                                jQuery(this).hide(),
                                    s.updateVideoContainers(t, i, jQuery(this)),
                                    jQuery(this).show(),
                                    jQuery(this).on("loadeddata", function () {
                                        jQuery(this).hide(), s.updateVideoContainers(t, i, jQuery(this)), jQuery(this).show();
                                    });
                            });
                        }, 500),
                        s.updateHeight(t),
                        s.maybeUpdateButtons(),
                        s.isParallax && s.parallaxAdjustments(),
                        jQuery(e.slides.eq(e.currentSlide))
                            .find("video")
                            .each(function () {
                                "yes" === jQuery(this).parents("li").attr("data-autoplay") && "function" == typeof jQuery(this)[0].play && jQuery(this)[0].play();
                            }),
                        s.isPostContent ||
                            ("left" !== avadaFusionSliderVars.header_position && "right" !== avadaFusionSliderVars.header_position) ||
                            this.isShortcode ||
                            s.$el
                                .parents("#sliders-container")
                                .find(".slide-content-container")
                                .each(function () {
                                    s.breakpointReached() ||
                                        (jQuery(this).hasClass("slide-content-right")
                                            ? jQuery(this).find(".slide-content").css("margin-right", "100px")
                                            : jQuery(this).hasClass("slide-content-left") && jQuery(this).find(".slide-content").css("margin-left", "100px"));
                                }),
                        s.fusionReanimateSlider(s.$el.find(".slide-content-container")),
                        void 0 !== e.slides && 0 !== e.slides.eq(e.currentSlide).find("iframe").length && playVideoAndPauseOthers(e),
                        s.$el.find(".overlay-link").hide(),
                        jQuery(e.slides.eq(e.currentSlide)).find(".overlay-link").show(),
                        s.$el.find("[data-youtube-video-id], [data-vimeo-video-id]").each(function () {
                            var e = jQuery(this);
                            setTimeout(function () {
                                resizeVideo(e);
                            }, 500);
                        }),
                        jQuery(s.$el).closest("#sliders-container").length && jQuery(document.body).trigger("sticky_kit:recalc"),
                        jQuery.isFunction(jQuery.fn.initElementAnimations) && jQuery(window).initElementAnimations();
                },
                before: function () {
                    s.$el.find(".slide-content-container").hide(), s.$el.find(".tfs-scroll-down-indicator").hide();
                },
                after: function (e) {
                    jQuery(e.slides.eq(e.currentSlide)).find(".slide-content-container").show(),
                        jQuery(e.slides.eq(e.currentSlide)).find(".tfs-scroll-down-indicator").show(),
                        "function" == typeof jQuery.fn.fusion_responsive_title_shortcode && jQuery(e.slides.eq(e.currentSlide)).find(".fusion-title").fusion_responsive_title_shortcode(),
                        s.fusionReanimateSlider(s.$el.find(".slide-content-container")),
                        s.$el.find(".overlay-link").hide(),
                        jQuery(e.slides.eq(e.currentSlide)).find(".overlay-link").show(),
                        jQuery(e.slides.eq(e.currentSlide))
                            .find("[data-youtube-video-id], [data-vimeo-video-id]")
                            .each(function () {
                                resizeVideo(jQuery(this));
                            }),
                        playVideoAndPauseOthers(e),
                        jQuery('[data-spy="scroll"]').each(function () {
                            jQuery(this).scrollspy("refresh");
                        });
                },
            };
        this.$el.flexslider(e);
    }),
    (avadaFusionSlider.prototype.sliderResize = function (e, i) {
        var t,
            s,
            a,
            n,
            r = this,
            s = (t = r.$el.find(".flex-active-slide")).find(".tfs-scroll-down-indicator"),
            a = r.isFullScreen ? 0 : r.getWidth(),
            n = r.isFullScreen ? r.getHeightOnFS() : r.getHeight(a);
        void 0 !== s.offset() && t.find(".slide-content").offset().top + t.find(".slide-content").height() + 25 < s.offset().top ? s.css("opacity", "1") : s.css("opacity", "0"),
            (n = r.isFullScreen && jQuery(".fusion-top-frame").length ? n - jQuery(".fusion-top-frame").height() - jQuery(".fusion-bottom-frame").height() : n) < r.getMaxHeight() && (n = r.getMaxHeight()),
            setTimeout(function () {
                r.updateVideoContainers(n, a);
            }, 100),
            r.updateXPosition(),
            r.updateHeight(n),
            r.maybeUpdateButtons(),
            r.isParallax && r.parallaxAdjustments(),
            Modernizr.mq("only screen and (max-width: 640px)") || r.breakpointReached(),
            r.$el.parents(".fusion-slider-container").css("height", n),
            r.$el.css("height", n),
            r.$el.find(".background, .mobile_video_image").css("height", n);
    }),
    (avadaFusionSlider.prototype.windowScroll = function () {
        this.isParallax &&
            (this.$el.parents("#sliders-container").length && jQuery(window).scrollTop() >= jQuery("#sliders-container").position().top + jQuery("#sliders-container").height()
                ? (cssua.ua.mobile || Modernizr.mq("only screen and (max-width: " + avadaFusionSliderVars.side_header_break_point + "px)") || this.$el.css("position", "static"), this.$el.css("visibility", "hidden"))
                : (cssua.ua.mobile || Modernizr.mq("only screen and (max-width: " + avadaFusionSliderVars.side_header_break_point + "px)") || this.$el.css("position", "fixed"), this.$el.css("visibility", "visible")));
    }),
    (avadaFusionSlider.prototype.setResponsiveTypography = function () {
        var e;
        "function" == typeof fusionSetOriginalTypographyData &&
            ((e = "fusion-slider-" + (e = this.$el.parent().data("id")) !== this.$el.parent().attr("id") ? ".fusion-slider-" + e : "#fusion-slider-" + e),
            void 0 === jQuery(e).data("has-rendered") && (fusionSetOriginalTypographyData(e + " h1, " + e + " h2, " + e + " h3, " + e + " h4, " + e + " h5, " + e + " h6"), jQuery(e).data("has-rendered", !0)));
    }),
    jQuery(document).on("ready fusion-element-render-fusion_fusionslider fusion-partial-header_position fusion-partial-wooslider fusion-partial-fusion_tax_wooslider fusion-partial-slider_type fusion-column-resized", function (e, i) {
        ("ready" === e.type && jQuery("body").hasClass("fusion-builder-live-preview") && void 0 !== i) ||
            (cssua.ua.mobile || updateVideoTag(),
            void 0 !== i
                ? new avadaFusionSlider(jQuery('div[data-cid="' + i + '"]').find(".tfs-slider")[0])
                : jQuery(".tfs-slider").each(function () {
                      new avadaFusionSlider(this);
                  }));
    });