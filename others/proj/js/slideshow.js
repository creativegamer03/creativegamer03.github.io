// slideshow.js

// Following code is from W3 Schools example code for creating a slideshow:

let slideIndex = [1,1,1,1];
let slideId = ['persianSlides', 'siameseSlides', 'munchkinSlides', 'ragdollSlides']
let dotId = ['dot1', 'dot2', 'dot3', 'dot4']
showSlides(1, 0);
showSlides(1, 1);
showSlides(1, 2);
showSlides(1, 3);

// Next/previous controls
function plusSlides(n, no) {
	showSlides(slideIndex[no] += n, no);
}

// Thumbnail image controls
function currentSlide(n, no) {
	showSlides(slideIndex[no] = n, no);
}

function showSlides(n, no) {
	let i;
	let slides = document.getElementsByClassName(slideId[no]);
	let dots = document.getElementsByClassName(dotId[no]);
	if (n > slides.length) {slideIndex[no] = 1}
	if (n < 1) {slideIndex[no] = slides.length}
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	// dots[slideIndex-1].className = "dot active";
	// for (i = 0; i < dots.length && i != slideIndex; i++) {
	// 	dots[i].classname = "dot";
	// }
	for (i = 0; i < dots.length; i++) {
		$(dots[i]).removeClass("active");
	}
	$(dots[slideIndex[no]-1]).addClass("active");
	slides[slideIndex[no]-1].style.display = "flex";
}