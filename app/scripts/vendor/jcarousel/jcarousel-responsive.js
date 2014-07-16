(function($) {
    $(function() {
        var $jcarousel = $('.gp_carousel');

            $jcarousel.jcarousel({
                wrap: 'circular'
            });

        $('.gp_carousel-control--prev')
            .jcarouselControl({
                target: '-=1'
            });

        $('.gp_carousel-control--next')
            .jcarouselControl({
                target: '+=1'
            });
    });
})(jQuery);
