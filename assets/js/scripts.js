$(window).on('scroll', function () {
	var scroll = $(window).scrollTop();
	if (scroll < 5) {
		$(".header").removeClass("sticky");
	} else {
		$(".header").addClass("sticky");
	}
});

// offcanvs-menu
$('.bar').click(function(){
  $('.offcanvas-wrapper').addClass('active');
});
$('.offcanvas-cls').click(function(){
  $('.offcanvas-wrapper').removeClass('active');
});



// ANIMATION
const expertWrapper = document.querySelectorAll('.expert-wrapper')
expertWrapper.forEach(wrap => {
window.addEventListener('load', ()=>{
	
	let expertContent = wrap.querySelector('.expert-content')
	let expertBody = wrap.querySelectorAll('.expert-body')
	let wrapInner = wrap.querySelector('.expert-inner')
	let navs = wrap.querySelectorAll('.expert-nav li')
	let expertNavBg = wrap.querySelector('.expert-link-bg')
	let counter = 0;

	function expertInit() {		
		wrapInner.style.width = wrap.getBoundingClientRect().width + "px"
		expertContent.style.height = expertBody[0].clientHeight + "px"
		for (let i = 0; i < expertBody.length; i++) {
			expertBody[i].style.left = (expertContent.clientWidth - expertBody[0].clientWidth) / 2 + "px"
		}
		
		let currentNav = navs[counter]
		expertNavBg.style.left = currentNav.offsetLeft + "px"
		expertNavBg.style.width = currentNav.clientWidth + "px"
	}
	window.addEventListener('resize', ()=>{
		setTimeout(() => {
			expertInit()
		}, 500);
	})
	expertInit()

	for (let i = 0; i < expertBody.length; i++) {
		expertBody[i].style.zIndex = i + 1
		expertBody[i].style.position = "absolute"
	}
	
	const animationAmount = navs.length;
	wrap.style.height = wrapInner.clientHeight * (animationAmount - 1) + "px"

	let wrapHeight = wrap.offsetHeight
	let animationPart = wrapHeight / (animationAmount + 1)	

	expertNavBg.style.left = navs[0].offsetLeft + "px"
	expertNavBg.style.width = navs[0].clientWidth + "px"

	function expertNavChange(counter) {
		let currentNav = navs[counter]
		for (let i = 0; i < navs.length; i++) {
			if(currentNav != navs[i]){
				navs[i].classList.remove('active')
			}			
		}
		currentNav.classList.add('active')
		expertNavBg.style.left = currentNav.offsetLeft + "px"
		expertNavBg.style.width = currentNav.clientWidth + "px"
	}

	function experBodyChange(counter) {
		for (let i = 0; i < expertBody.length; i++) {
			if (i <= counter) {				
				expertBody[i].classList.add('active')
			}else{
				expertBody[i].classList.remove('active')
			}
		}
	}

    // sticky menu 
	function offset(elt) {
		var rect = elt.getBoundingClientRect(), bodyElt = document.body;
		return {
		  top: rect.top + bodyElt .scrollTop,
		  left: rect.left + bodyElt .scrollLeft
		}
	  }
	  
	let headerHeight = document.querySelector('.header').clientHeight + 10
	const top = offset(wrap).top - headerHeight;
	const footTop = offset(wrap).top + wrap.offsetHeight - headerHeight;
	const maxY = footTop - wrapInner.offsetHeight

	window.addEventListener("scroll", function(){
		let y = document.scrollingElement.scrollTop;
		if (y > top) {

			if (y >= top + animationPart * (counter + 1) && counter < animationAmount - 1) {
				counter++
				expertNavChange(counter)
				experBodyChange(counter) 
			}
			if (y <= top + animationPart * counter && counter >= 0) {
				counter--
				expertNavChange(counter)
				experBodyChange(counter) 
			}

			if (y < maxY) {
				wrapInner.style.position = "fixed"
				wrapInner.style.top = headerHeight + "px"
			} else {
				wrapInner.style.position = "absolute"
				wrapInner.style.top = (maxY - top)+'px'
			}
		} else {
			wrapInner.style.position = "relative"
			wrapInner.style.top = "0px"
		}
	})
	
})
});


