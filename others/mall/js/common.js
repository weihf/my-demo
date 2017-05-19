(function(doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			if (!clientWidth) return;
			docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
		};

	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

//slide menu
$(".category-btn").on("touchend", function() {
	$(".category-menu,.dark").show();
	$(".page").css("position", "absolute");
})
$(".dark").on("touchend", function() {
	$(this).hide();
	$(".category-menu").hide();
})
$(".more").on("touchend", function() {
	$(".header-nav,.more").toggleClass("active");
})
$("#soption,.shopping-cart .add").on("touchend", function() {
	$(".product-property").toggleClass("show");
	$(".product-property_mask").show();
})

$(".product-property_mask").on("touchend", function() {
	$(this).hide();
	$(".product-property").removeClass("show");
})
$(".property-close span").on("touchend", function() {
	$(".product-property").removeClass("show");
})
$(".detail-tab section.desc").show();
$(".detail-nav a").on("touchend", function() {
	$(this).addClass("current").siblings().removeClass("current");
	$(".detail-tab section").hide().eq($(this).index()).show();
})
$(".parameter dl dt").on("touchend", function() {
	$(this).next().toggle();
	$(this).children("span").toggleClass("direct-b");
})
var navHeight=$(".detail-nav").offset().top;
$(window).scroll(function(){
	var scrollHeight=$(this).scrollTop();
	if(scrollHeight>navHeight){
		$(".detail-nav").addClass("fix-top");
		$(".detail-nav").siblings().css("margin-top","2rem");
	}else {
		$(".detail-nav").removeClass("fix-top");
		$(".detail-nav").siblings().css("margin-top","0");
	}
})
