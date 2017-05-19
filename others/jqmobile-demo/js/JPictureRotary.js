	(function($){
	//�����ⲿ�ӿ�
	$.fn.JPictureRotary = function(options){

	//��ʼ��ȫ�ֱ���
	var defaults = {
		auto : false, //�Ƿ��Զ���ת
		delay: 3,	//ÿ��ͼƬͣ��ʱ��
		animationSpeed: "normal", //�����л��ٶ�
		statue_contrls: true, //�Ƿ���ʾ԰��
		boucles: 0,
	};

	/*
	��չ����
	*/
	var options = $.extend(defaults, options);

	/*
	�������ڵ��µ�����Ԫ��
	*/
	// this.each(function(event){
		
		if($("li", diapo).length > 1){
			/*
		��������һ��div��
		*/
		var diapo = $(this);
		var width = 0;
		var height = 0;
		var current_slide = 0;

		diapo.wrap("<div class='JPictureRotary'></div>");


		/*
		�������ͼƬ
		*/
		$(document).on("swipeleft",".JPictureRotary", function(options, event)
		{
			prev();
			return false; //ȡ��ð��
		});

		$(document).on("swiperight", ".JPictureRotary", function(options, event)
		{
			next();
			return false;
		});


		function init(){


			width = $("li:first-child img", diapo).width();
			height = $("li:first-child img", diapo).height();

			diapo.width(width);
			diapo.height(height);
			diapo.parent().width(width);
			diapo.parent().height(height);

			//��ʾԲ��
			diapo.siblings(".JPictureRotary_status").show();
			$("#JPictureRotary_bullet_"+(parseInt($("li", diapo).index($("li:first-child", diapo)))+1), diapo.siblings()).addClass("active");
		}

		/*
		 ͼƬ��ת����
		 */
		 var inter = "";

		 inter = setInterval(function(){displayDiaporama(options)}, (options.delay*1000));

		 $("li", diapo).hide();
		 $("li:first-child", diapo).addClass("active").fadeIn(options.animationSpeed, init);

	/*
	���Բ��
	*/
	diapo.after("<div class='JPictureRotary_status'></div>");

	$("li", diapo).each(function(){
		i = parseInt($("li", diapo).index($(this))+1);
		$(this).attr("id", "JPictureRotary_image_"+i);
		$(".JPictureRotary_status", diapo.parent()).append("<a id='JPictureRotary_bullet_"+i+"' href='#'>Image "+i+"</a>");
	})

	
	//Բ�������ʾ
	// var bulletCount = $(".JPictureRotary li").length;
	// //  100 - (8*n+ 6)/2	
	//  $(".JPictureRotary_status", diapo.parent()).css("margin-left", 50-(bulletCount-1)*4+"%");
	//$(".JPictureRotary_status", diapo.parent()).css("margin-left", -($(".JPictureRotary_status", diapo.parent()).width()/2));


	function nextImage(options, elt)
	{
		clearInterval(inter);

		$("li.active", diapo).fadeOut(options.animationSpeed).removeClass("active");
		$(".JPictureRotary_status a", diapo.parent()).removeClass("active");

		id = elt.attr("id").split("_")[2];
		$("li#JPictureRotary_image_"+id, diapo).addClass("active").fadeIn(options.animationSpeed);

		$("#JPictureRotary_bullet_"+id, diapo.siblings()).addClass("active");

		if(options.boucles == 0 || (options.boucles > 0 && (diapo.data("current_slide")/diapo.children().length) < options.boucles ))
			inter = setInterval(function(){displayDiaporama(options)}, (options.delay*1000));
		else
			$(".pause", diapo.siblings()).remove();

	}

	function displayDiaporama(options)
	{
		current_slide++;
		diapo.data("current_slide", current_slide);
		next();
	}

	function next()
	{

		if(!$("li.active", diapo).is(":last-child"))
			elt =  $("li.active", diapo).next();
		else
			elt =  $("li:first-child", diapo);
		nextImage(options, elt);
	}

	function prev()
	{
		if(!$("li.active", diapo).is(":first-child"))
			elt =  $("li.active", diapo).prev();
		else
			elt =  $("li:last-child", diapo);
		nextImage(options, elt);
	}

	// function resize() {       
	// 	var newWidth = $(window).width();
	// 	 $(".JPictureRotary li img").css({display:"block",padding: "0", margin: "0", width: newWidth, height:"auto"});
	// }

	// $(window).resize(resize);
}
// });
	return this;

};
})(jQuery);