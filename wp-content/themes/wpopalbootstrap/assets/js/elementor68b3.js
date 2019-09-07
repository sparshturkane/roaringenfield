jQuery(document).ready(function($) {
    $(document).ready(function() {
        if ( window.elementorFrontend ) {

            elementorFrontend.hooks.addAction('frontend/element_ready/opal-gallery-albums.default', ($scope) => { 
                if( $scope.find(".elementor-opal-gallery-albums").length > 0 ){ 
                    $scope.find('.elementor-galerry_album').each(function() {
                        $(this).magnificPopup({
                            delegate : 'a',
                            type     : 'image',
                            tLoading : 'Loading image #%curr%...',
                            mainClass: 'mfp-img-mobile',
                            gallery  : {
                                enabled           : true,
                                navigateByImgClick: true,
                                preload           : [0, 1]
                            },
                            image    : {
                                tError  : '<a href="%url%">The image #%curr%</a> could not be loaded.',
                                titleSrc: function (item) {
                                    return item.el.attr('title');
                                }
                            }
                        });
                    });
                }
            });

            elementorFrontend.hooks.addAction('frontend/element_ready/opal-upcoming-event.default', ($scope) => { 
                if( $scope.find(".elementor-event-slick-slider").length > 0 ){ 
                    var $event_slick = $('.elementor-event-slick-slider'); 
                    $event_slick.each( function(i, el){
                        var $this = $(el),
                        //Setters
                        setSlidesToShow = $this.data('slides-show'),
                        setSlidesToScroll = $this.data('slides-scroll'),
                        setDot = $this.data('pagination'),
                        setAutoplay = $this.data('autoplay'),
                        setAnimation = $this.data('animation'),
                        setEasing = $this.data('easing'),
                        setFade = $this.data('fade'),
                        setSpeed = $this.data('speed'),
                        setSlidesRows = $this.data('rows'),
                        setPauseOnHover = $this.data('pause-hover'),
                        setRtl = $this.data('rtl'),
                        setTabletColumns = $this.data('table-columns'),
                        setMobileColumns = $this.data('mobile-columns')
                        $this.slick({
                            autoplay: setAutoplay ? true : false,
                            autoplaySpeed: setSpeed ? setSpeed : 3000,
                            cssEase: setAnimation ? setAnimation : 'ease',
                            easing: setEasing ? setEasing : 'linear',
                            fade: setFade ? true : false,
                            infinite:  true ,
                            slidesToShow: setSlidesToShow ? setSlidesToShow : 1,
                            slidesToScroll: setSlidesToScroll ? setSlidesToScroll : 1,
                            pauseOnHover: setPauseOnHover ? true : false,
                            rows: setSlidesRows ? setSlidesRows : 1,
                            rtl: setRtl ? true : false,
                            dots: setDot ? true : false,
                            adaptiveHeight: true,

                            responsive: [
                                {
                                breakpoint: 1023,
                                settings: {
                                slidesToShow: setTabletColumns ? setTabletColumns : 2 ,
                                infinite: true,
                                }
                                },
                                {
                                breakpoint: 767,
                                settings: {
                                slidesToShow: setMobileColumns ? setMobileColumns : 1 ,
                                }
                                },
                            ]
                        });
                    });

                    $.fn.PBR_CountDown = function( options ) {
                        return this.each(function() { 
                            // get instance of the PBR_CountDown.
                            new  $.PBR_CountDown( this, options ); 
                        });
                     }
                    $.PBR_CountDown = function( obj, options ){
                        
                        this.options = $.extend({
                                autoStart           : true,
                                LeadingZero:false,
                                DisplayFormat:"<div>%%D%% Days</div><div>%%H%% Hrs</div><div>%%M%% Mins</div><div>%%S%% Secs</div>",
                                FinishMessage:"Expired",
                                CountActive:true,
                                TargetDate:null
                        }, options || {} );
                        if( this.options.TargetDate == null || this.options.TargetDate == '' ){
                            return ;
                        }
                        this.timer  = null;
                        this.element = obj;
                        this.CountStepper = -1;
                        this.CountStepper = Math.ceil(this.CountStepper);
                        this.SetTimeOutPeriod = (Math.abs(this.CountStepper)-1)*1000 + 990;
                        var dthen = new Date(this.options.TargetDate);
                        var dnow = new Date();
                        if( this.CountStepper > 0 ) {
                            ddiff = new Date(dnow-dthen);
                        }
                        else {
                             ddiff = new Date(dthen-dnow);
                        }
                        gsecs = Math.floor(ddiff.valueOf()/1000); 
                        this.CountBack(gsecs, this);

                    };
                     $.PBR_CountDown.fn =  $.PBR_CountDown.prototype;
                     $.PBR_CountDown.fn.extend =  $.PBR_CountDown.extend = $.extend;
                     $.PBR_CountDown.fn.extend({
                        calculateDate:function( secs, num1, num2 ){
                              var s = ((Math.floor(secs/num1))%num2).toString();
                              if ( this.options.LeadingZero && s.length < 2) {
                                    s = "0" + s;
                              }
                              return "<b>" + s + "</b>";
                        },
                        CountBack:function( secs, self ){
                             if (secs < 0) {
                                self.element.innerHTML = '<div class="lof-labelexpired"> '+self.options.FinishMessage+"</div>";
                                return;
                              }
                              clearInterval(self.timer);
                              DisplayStr = self.options.DisplayFormat.replace(/%%D%%/g, self.calculateDate( secs,86400,100000) );
                              DisplayStr = DisplayStr.replace(/%%H%%/g, self.calculateDate(secs,3600,24));
                              DisplayStr = DisplayStr.replace(/%%M%%/g, self.calculateDate(secs,60,60));
                              DisplayStr = DisplayStr.replace(/%%S%%/g, self.calculateDate(secs,1,60));
                              self.element.innerHTML = DisplayStr;
                              if (self.options.CountActive) {
                                   self.timer = null;
                                 self.timer =  setTimeout( function(){
                                    self.CountBack((secs+self.CountStepper),self);          
                                },( self.SetTimeOutPeriod ) );
                             }
                        }
                                    
                    });
                    $(document).ready(function(){
                        $('[data-countdown="event_countdown"]').each(function(index, el) {
                            var $this = $(this);
                            var $date = $this.data('date').split("-");
                            $this.PBR_CountDown({
                                TargetDate:$date[0]+"/"+$date[1]+"/"+$date[2]+" "+$date[3]+":"+$date[4]+":"+$date[5],
                                DisplayFormat:"<div class=\"countdown-times\"><div class=\"day\"><span>%%D%% DAYS </span></div><div class=\"hours\"><span>%%H%% HRS </span></div><div class=\"minutes\"><span>%%M%% MINS </span></div><div class=\"seconds\"><span>%%S%% SECS </span></div></div>",
                                FinishMessage: "Expired"
                            });
                        });
                    });
                }

            });
        } 
        
    });       
});