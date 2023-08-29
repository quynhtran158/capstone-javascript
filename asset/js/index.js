window.onscroll = function () { scrollFunction() };

function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		$(".navbar-container")[0].classList = "navbar-container scroll"
	} else {
		$(".navbar-container")[0].classList = "navbar-container"
	}
}