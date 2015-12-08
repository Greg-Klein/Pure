$(document).ready(function() {
	// Start listening for scroll to resize navbar
	redimNav();

	// Start listening for menu items click
	$("a[href^='#']").click(function() {
		var e = $(this).attr("href");
		console.log(e);
		scrollTo(e);
		return false;	// return false to prevent default behaviour
	});

	$("#menu__blocker").click(function() {
		hideMenu();
	});

	// Hide loader when document is ready
	$("#loader__square").hide();
	$("#loader").fadeOut();

});


/**
 * Smooth scroll function
 * use: onClick="scrollTo(event, 'target')"
 * example: onClick="scrollTo(event, 'home')"
 */
function scrollTo(target) {
	// hide menu
	hideMenu();
	// scroll to 'target' id
	$("html, body").animate({
        scrollTop: $(target).offset().top
    }, 1000);
    return false;	// return false to prevent default behaviour
}


/**
 * Resize the navbar on scroll
 */
function redimNav() {
	$(window).scroll(function() {
        var e = $("#navigation"),
            color = "41, 67, 92",
            alpha = .6,
            s = $(window).scrollTop(),
            w = $(window).width();
            if(s > 100){
            	e.css({
            		background: "rgba(" + color + ", "+alpha+")",
            		height: "60px"
            	});
            }
            else {
                e.css({
                	background: "rgba(" + color + ", 0)",
                	height: "100px"
                });
            }
        
    });
}

/**
 * Slide the menu to show it
 */
function showMenu() {
	// show menu blocker
	$("#menu__blocker").fadeIn();
	// slide menu
	$("#menu").css({
		transform: "translateX(0)"
	});
	// rotate icon
	setTimeout(function(){
		$("#menu__close").css({
			transform: "rotate(180deg)"
		});
	}, 300);
	// show items
	$("#menu > ul > li").each(function(i) {
		var row = $(this);
		setTimeout(function() {
			row.addClass('fadeInDown');
		}, 100*i);
	});
}

/**
 * Slide the menu to hide it
 */
function hideMenu() {
	// hide menu blocker
	$("#menu__blocker").fadeOut();
	// slide menu
	$("#menu").css({
		transform: "translateX(300px)"
	});
	// rotate icon
	setTimeout(function(){
		$("#menu__close").css({
			transform: "rotate(0deg)"
		});
	}, 300);
	// hide items
	$("#menu > ul > li").each(function(i) {
		var row = $(this);
		setTimeout(function() {
			row.removeClass('fadeInDown');
		}, 100*i);
	});
}