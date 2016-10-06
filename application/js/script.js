/*jshint jquery:true */
/*global $:true */

var $ = jQuery.noConflict();

$(document).ready(function($) {
	"use strict";

	/* global google: false */
	/*jshint -W018 */
	$(window).imagesLoaded( function(){
		$(window).trigger('resize');
	});

	/*-------------------------------------------------*/
	/* =  browser detect
	/*-------------------------------------------------*/
	try {
		$.browserSelector();
		// Adds window smooth scroll on chrome.
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	}

	/*-------------------------------------------------*/
	/* =  scroll between sections
	/*-------------------------------------------------*/

	$('.navigate-section > li > a[href*=#]').click( function(event) {
		var $this = $(this);
		var offset = -70;
		$.scrollTo( $this.attr('href') , 650, { easing: 'swing' , offset: offset , 'axis':'y' } );
		event.preventDefault();
	});

	/*-------------------------------------------------*/
	/* =  add active state in menu for active section
	/*-------------------------------------------------*/

	$('section').each(function() {
		$(this).waypoint( function( direction ) {
			if( direction === 'down' ) {
				var containerID = $(this).attr('id');
				/* update navigation */
				$('.navigate-section > li > a').removeClass('active');
				$('.navigate-section > li > a[href*=#'+containerID+']').addClass('active');
			}
		} , { offset: '70px' } );
		
		$(this).waypoint( function( direction ) {
			if( direction === 'up' ) {
				var containerID = $(this).attr('id');
				/* update navigation */
				$('.navigate-section > li > a').removeClass('active');
				$('.navigate-section > li > a[href*=#'+containerID+']').addClass('active');
			}
		} , { offset: function() { return -$(this).height() - 64; } });
	});


	/*-------------------------------------------------*/
	/* =  fullwidth carousell
	/*-------------------------------------------------*/
	try {
		var owl = $("#owl-demo").owlCarousel({
			autoPlay: 10000,
			items : 4,
			itemsDesktop : [1199,3],
			itemsDesktopSmall : [979,2]
		});
		// Custom Navigation Events
		$(".owl-arrows .next-link").click(function(event){
			event.preventDefault();
			owl.trigger('owl.next');
		});
		$(".owl-arrows .prev-link").click(function(event){
			event.preventDefault();
			owl.trigger('owl.prev');
		});
	} catch(err) {

	}

	/*-------------------------------------------------*/
	/* =  Animated content
	/*-------------------------------------------------*/

	try {
		/* ================ ANIMATED CONTENT ================ */
        if ($(".animated")[0]) {
            $('.animated').css('opacity', '0');
        }

        $('.triggerAnimation').waypoint(function() {
            var animation = $(this).attr('data-animate');
            $(this).css('opacity', '');
            $(this).addClass("animated " + animation);

        },
                {
                    offset: '75%',
                    triggerOnce: true
                }
        );
	} catch(err) {

	}

	/*-------------------------------------------------*/
	/* =  remove animation in mobile device
	/*-------------------------------------------------*/
	var winDow = $(window);
	if ( winDow.width() < 992 ) {
		$('div.triggerAnimation').removeClass('animated');
		$('div.triggerAnimation').removeClass('triggerAnimation');
	}

	/*-------------------------------------------------*/
	/* =  flexslider
	/*-------------------------------------------------*/

	try {

		var SliderPost = $('.flexslider');

		SliderPost.flexslider({
			slideshowSpeed: 3000,
			easing: "swing"
		});
	} catch(err) {

	}

	/* ---------------------------------------------------------------------- */
	/*	magnific-popup
	/* ---------------------------------------------------------------------- */

	try {
		// Example with multiple objects
		$('.zoom').magnificPopup({
			type: 'image',
			gallery: {
				enabled: true
			}
		});
		// Example with multiple objects
		$('.video').magnificPopup({
			type: 'iframe'
		});

	} catch(err) {

	}
	
	/*-------------------------------------------------*/
	/* = slider Testimonial
	/*-------------------------------------------------*/

	var slidertestimonial = $('.bxslider');
	try{		
		slidertestimonial.bxSlider({
			mode: 'vertical'
		});
	} catch(err) {
	}

	/*-------------------------------------------------*/
	/* =  count increment
	/*-------------------------------------------------*/
	try {
		$('.statistic-post').appear(function() {
			$('.timer').countTo({
				speed: 4000,
				refreshInterval: 60,
				formatter: function (value, options) {
					return value.toFixed(options.decimals);
				}
			});
		});
	} catch(err) {

	}

	/* ---------------------------------------------------------------------- */
	/*	Contact Form
	/* ---------------------------------------------------------------------- */

	var submitContact = $('#submit_contact'),
		message = $('#msg');

	submitContact.on('click', function(e){
		e.preventDefault();

		var $this = $(this);
		
		$.ajax({
			type: "POST",
			url: 'contact.php',
			dataType: 'json',
			cache: false,
			data: $('#contact-form').serialize(),
			success: function(data) {

				if(data.info !== 'error'){
					$this.parents('form').find('input[type=text],textarea,select').filter(':visible').val('');
					message.hide().removeClass('success').removeClass('error').addClass('success').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				} else {
					message.hide().removeClass('success').removeClass('error').addClass('error').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				}
			}
		});
	});

	/*-------------------------------------------------*/
	/* =  Menu - active
	/*-------------------------------------------------*/
	try {
		// Do our DOM lookups beforehand
		var nav_container = $("header");
		var nav = $(".navbar");
		
		var top_spacing = 0;
		var waypoint_offset = -70;

		nav_container.waypoint({
			handler: function(direction) {
				if (direction == 'down') {

					nav_container.css({ 'height':nav.outerHeight() });		
					nav.stop().addClass("active").css("top",-nav.outerHeight()).animate({"top":top_spacing});
					//nav_container.stop().addClass("active").css("top",-nav.outerHeight()).animate({"top":top_spacing});
					
				} else {
					
					nav_container.css({ 'height':'70px' });
					nav.stop().removeClass("active").css("top",nav.outerHeight()+waypoint_offset).animate({"top":""});
					//nav_container.stop().removeClass("active").css("top",nav.outerHeight()+waypoint_offset).animate({"top":""});
					
				}
				
			},
			offset: function() {
				return -nav.outerHeight()-waypoint_offset;
			}
		});
	} catch(err) {

	}

});