
// load foundation
$(document).foundation();

jQuery.fn.extend({
	goTo: function () {
		$('html, body').animate({
			scrollTop: $(this).offset().top + 'px'
		}, 'slow');
		return this;
	}
});

// Functions to run at document load
$(function() {
	
	var limit = $(window).height();

	var $tBarContent = $('.tab-bar-wrapper-content');

	// Vars for sticking nav to top
	var $tabBar = $('.tab-bar');
		tabBarStyle = "display-bar-top";
		main = $('.main-wrapper').height();
		homeStyle = tabBarStyle + "-home";
		inHome = true;

	// Vars for changing nav while scrolling (about)
	var $about = $('#about');
		aboutOffsetFromTop = $about.offset().top;
		aboutHeight = $about.height();
		aboutStyle = tabBarStyle + "-about";

	// Vars for changing nav while scrolling (about)
	var $projects = $('#projects');
		projectsStyle = tabBarStyle + "-projects";
		projectsOffsetFromTop = $projects.offset().top;
		projectsHeight = $projects.height();

	// Vars for changing nav while scrolling (about)
	var $contact = $('#contact');
		contactStyle = tabBarStyle + "-contact";
		contactOffsetFromTop = $contact.offset().top;
		contactHeight = $contact.height();

	if($(window).scrollTop() > main) {
		if(inHome) {
			$tabBar.removeClass(homeStyle);
			$tabBar.css({"top" : "0", "bottom" : ""});
			console.log("run thing");
		}
	}

	$(window).scroll(function() {
		var scrollT = $(this).scrollTop();

	if($(window).scrollTop() > main + $(window).height() ) {
		if(inHome) {
			$tabBar.removeClass(homeStyle);
			$tabBar.css({"top" : "0", "bottom" : ""});
		}
	}

	// Opacity change for smooth transition
	if(scrollT <= limit) {
		$tBarContent.css({"opacity" : (1 - scrollT/limit)})
		$tabBar.css({"top" : "", "bottom" : "20px"});
		inHome = true;
	}  else if(scrollT >= limit*2) {
		$tBarContent.css({"opacity" : (1 + scrollT/limit)})
	}

		if($(this).scrollTop() > (aboutOffsetFromTop/1.25)
			&& $(this).scrollTop() < (aboutOffsetFromTop) + aboutHeight){
			$tabBar.addClass(aboutStyle + " " + tabBarStyle);
		} else {
			$tabBar.removeClass(aboutStyle);
		}

		if($(this).scrollTop() > (projectsOffsetFromTop/1.25)
			&& $(this).scrollTop() < (projectsOffsetFromTop) + projectsHeight){
				$tabBar.addClass(projectsStyle + " " + tabBarStyle);
				$("#splyttr").addClass("animated fadeInRight");
				$("#splyttr").css({"display" : "flex"});
				setTimeout(function () {
					$("#ngtodo").css({"display" : "flex"});
					$("#ngtodo").addClass("animated fadeInLeft");
				}, 300);
				setTimeout(function () {
					$("#asi").css({"display" : "flex"});
					$("#asi").addClass("animated fadeInRight");
				}, 500);
		} else {
			$tabBar.removeClass(projectsStyle);
		}

		if($(this).scrollTop() > (contactOffsetFromTop/1.25)
			&& $(this).scrollTop() < (contactOffsetFromTop) + contactHeight){
			$tabBar.addClass(contactStyle + " " + tabBarStyle);
		} else {
			$tabBar.removeClass(contactStyle);
		}

	});


	$("#about-ref").click(function() {
		$("#about").goTo();
		setTimeout(function () {
			if(inHome)
				$('.tab-bar').removeClass(homeStyle);
		}, 300);
	});

	$("#projects-ref").click(function() {
		$("#projects").goTo();
		setTimeout(function () {
			if(inHome)
				$('.tab-bar').removeClass(homeStyle);
				$tabBar.css({"top" : "0", "bottom" : ""});
		}, 300);
	});

	$("#contact-ref").click(function() {
		$("#contact").goTo();
		setTimeout(function () {
			if(inHome)
				$('.tab-bar').removeClass(homeStyle);
				$tabBar.css({"top" : "0", "bottom" : ""});
		}, 300);
	});

	$("#home-ref").click(function() {
		$("#main").goTo();
		setTimeout(function () {
			$tabBar.css({"bottom" : "20px", "top" : ""});
			$('.tab-bar').addClass(homeStyle);
			$('.tab-bar').removeClass(tabBarStyle);
		}, 500);
	});

});


// detect if element has entered view
function elemHasEnteredView(element){

	// Detect window top bound and offset
	var viewTopOffset = $(window).scrollTop() + $(window).height();

    // Detect element top bound
    var elemTopOffset = $(element).offset().top;

    return (elemTopOffset <= viewTopOffset);
}

function elemHasLeftView(element) {

	// Detect window top bound and offset
	var viewTopOffset = $(window).scrollTop(); 

	return (element <= viewTopOffset)

}

// fade in element
function fadeInElements(elements){
	$(elements).each(function(element){
		setTimeout(function(){
			$(elements).eq(element).addClass('animated fadeInUp');
		}, 200 * element)
	});
}

