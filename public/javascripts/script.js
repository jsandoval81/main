(function ($) {
    "use strict";
    //==================
    //== MAIN PAGE UI ==
    //==================
    var HEADERSCALE = function (parent, id, nextContainer) {
        var that = this;

        this.parent           = parent;
        this.elem             = document.getElementById(id);
        this.nextContainer    = document.getElementById(nextContainer);
        this.minMobileHeight  = 300;
        this.minDesktopHeight = 500;
        //== Resize container
        this.resizeContainer();
        $(window).resize(function () {
            that.resizeContainer();
        });
    };

    HEADERSCALE.prototype.resizeContainer = function () {
        //== Get current width and height
        this.windowWidth  = $(window).width();
        this.windowHeight = $(window).height();
        this.height       = (this.windowWidth > 550) ? this.windowHeight.limit(this.minDesktopHeight, 1485) : this.windowHeight.limit(this.minMobileHeight, 1485);
        //== Set width and height
        if (this.elem && this.nextContainer) {
            this.elem.style.width  = this.windowWidth + "px";
            this.elem.style.height = this.height + "px";
            //== Offet container
            this.nextContainer.style.marginTop = this.height + "px";
        }
    };

    var SKILLS = function () {
        this.skills = $('.skill-item');
        this.skills.hover(function () {
            //== Skill mouseover
            var $this = $(this);
            $this.addClass("skill-hover");
            TweenMax.fromTo($this.find(".mask"), 0.6, { opacity: 0, display: 'none' }, { opacity: 0.85, display: 'block' });
            TweenMax.fromTo($this.find(".info"), 0.6, { opacity: 0, display: 'none'}, { opacity: 1, display: 'table-cell' });
        }, function () {
            //== Skill mouseout
            var $this = $(this);
            $this.removeClass("skill-hover");
            TweenMax.to($this.find(".mask"), 0.6, { opacity: 0, display: 'none' });
            TweenMax.to($this.find(".info"), 0.6, { opacity: 0, display: 'none' });
        });

        /*this.skills.on("click", function () {
            var url = $(this).find("a").attr("href");
            if (window.open) {
                window.open(url, '_blank');
            } else {
                window.location = url
            }
        })*/

    };

    var slideableElement = function (elem, wheretoanim, css, elemtrigger) {
        this.elem                        = elem;
        this.elemtrigger                 = (typeof elemtrigger === "undefined") ? elem : elemtrigger;
        this.offsetTop                   = this.elemtrigger.offset().top;
        this.elemheight                  = this.elemtrigger.height();
        this.interval                    = null;
        this.timeout                     = null;
        this.previouspercentage          = 0;
        this.percentage                  = 0;
        this.tl                          = new TimelineMax({ smoothChildTiming: true });
        this.tl.staggerFrom(elem, 3, css, 1);
        this.tl.pause();
        this.speed                       = 0.02;
        this.wheretostartanimation       = wheretoanim;
        this.wheretostartanimationnumber = 0;
    };

    slideableElement.prototype.animate = function () {
        var that             = this,
            scrollTop        = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop,
            offsetstartpoint = 0,
            animationstart   = 1,
            animationend     = (that.elemtrigger.height()),
            time,
            animationframe;

        switch (that.wheretostartanimation) {
        case "top":
            that.wheretostartanimationnumber = scrollTop + (Math.floor($(window).height() / 4));
            break;
        case "center":
            that.wheretostartanimationnumber = scrollTop + (Math.floor($(window).height() / 2));
            offsetstartpoint = (that.elemtrigger.height() / 2);
            animationstart = offsetstartpoint;
            break;
        case "bottom":
            that.wheretostartanimationnumber = scrollTop + (Math.floor($(window).height() / 1.15));
            break;
        }

        function draw() {
            var now = new Date().getTime(),
                dt  = now - (time || now);
            if (window.requestAnimationFrame) {
                animationframe = requestAnimationFrame(draw);
            } else {
                window.clearTimeout(that.timeout);
                that.timeout = null;
                that.timeout = setTimeout(function () {
                    draw();
                }, 1);
            }
            time = now;
            // Drawing code goes here
            if (that.percentage > that.previouspercentage) {
                that.previouspercentage = (that.previouspercentage += 0.003 * dt).limit(0, that.percentage);
            } else {
                that.previouspercentage = (that.previouspercentage -= 0.003 * dt).limit(that.percentage, 1);
            }
            that.tl.progress(that.previouspercentage);
            if (that.previouspercentage === that.percentage) {
                if (window.requestAnimationFrame) {
                    cancelAnimationFrame(animationframe);
                } else {
                    window.clearTimeout(that.timeout);
                    that.timeout = null;
                }
                that.previouspercentage = that.percentage;
            }
        }
        if ($.browser.msie && $.browser.version === 10) {
            that.percentage = that.wheretostartanimationnumber - (that.offsetTop - (that.elemtrigger.height() / 2));
            that.percentage = (that.percentage.map(-animationstart, animationend, 0, 100) / 100).limit(0, 1);
            that.tl.progress(that.percentage);
        } else {
            that.percentage = that.wheretostartanimationnumber - (that.elemtrigger.offset().top + offsetstartpoint);
            that.percentage = (that.percentage.map(-animationstart, animationend, 0, 100) / 100).limit(0, 1);
            draw();
        }
    };

    slideableElement.prototype.endAnimation = function () {
        this.elem.attr("style", "");
    };

    var WEBAPP = function () {
        this.isTouch = 'ontouchstart' in window;
        this.isdevice = !!(navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/));
        this.setUpRequestAnimationFrame();
        this.animationarray = [];
        this.header = new HEADERSCALE(this, "header", "content-container");
        this.skills = new SKILLS();
        this.scrollAnimation();
    };

    WEBAPP.prototype.setUpRequestAnimationFrame = function () {
        var vendors = ['ms', 'moz', 'webkit', 'o', ''],
            x = 0;
        for (x = 0; x < vendors.length && !window.requestAnimationFrame; x += 1) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame  = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }
    };

    WEBAPP.prototype.scrollAnimation = function () {
        var that               = this,
            multipleSkillItems = $('.skill-item'),
            $curItem,
            i                  = 0;
        function animateElements() {
            for (i = 0; i < that.animationarray.length; i += 1) {
                that.animationarray[i].animate();
            }
        }
        //== Animate scoll if IE is newer
        if ((!oldieishere) && ($(window).width() >= 768)) {
            //== Initialize skill elements
            for (i = 0; i < multipleSkillItems.length; i += 1) {
                $curItem = $(multipleSkillItems[i]);
                that.animationarray.push(new slideableElement($curItem, "bottom", { css: { scale: 0, opacity: 0 }}));
            }
            //== Animate on scroll
            $(document).on("scroll", window, function () {
                animateElements();
            });
            //== Initialize animations
            animateElements();
        }
    };

    Number.prototype.map = function (istart, istop, ostart, ostop) {
        return ostart + (ostop - ostart) * ((this - istart) / (istop - istart));
    };

    Number.prototype.limit = function (min, max) {
        return Math.min(max, Math.max(min, this));
    };

    $(document).ready(function () {
        //== Initiate object
        var webapp = new WEBAPP();
        //== Apply Masonry
        $('#skills-preview').masonry({
            itemSelector: '.skill-item',
            isResizable:   true,
            isFitWidth:    true,
            isAnimated:    true,
            columnWidth:   1
        });
    });

    //== Stops the font-size, margin, and padding from animating on load
    window.onload = function () {
        $('body').addClass("animate-all");
    };

})(jQuery);
