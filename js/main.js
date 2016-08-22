var a=0;
var $liPage;
var now = { row:1, col:1 }, last = { row:0, col:0};
const towards = { up:1, right:2, down:3, left:4};
var isAnimating = false;
var page_five=true;
window.onload=function(){
	$(".loading").hide();
	/*音乐控制JS*/
    $("#music").click(function(){
		if($(this).attr("class")=="play"){
			$(this).removeClass().addClass("pause");
			$("#myMusic")[0].play();
			$(".audio").addClass("Rot");
		}else if($(this).attr("class")=="pause"){
			$(this).removeClass().addClass("play");
			$("#myMusic")[0].pause();
			$(".audio").removeClass("Rot");
		}
	})
	$(".wrap").css({
		"width":$(window).width(),
		"height":$(window).height()
	})
	get_width();
	$(window).resize(function(){
		get_width();
	});
	$(document).swipe( {
		swipe:function(e,direction) {
			switch (direction){
				case "up":
					if (isAnimating) return;
					if (!page_five) return;
					last.row = now.row;
					last.col = now.col;
					if (last.row !=6) { now.row = last.row+1; now.col = 1; pageMove(towards.up);}
				break;
				case "down":
					if (isAnimating) return;
					if (!page_five) return;
					last.row = now.row;
					last.col = now.col;
					if (last.row!=1) { now.row = last.row-1; now.col = 1; pageMove(towards.down);}
			}
		}
	});
	pagestart();      
};
function pagestart(){
	$(".spe").css({
		"width":$(window).width(),
		"height":$(window).height()
	})
	$(".close").bind("touchstart",function(){
		$(this).parent().parent().addClass("hide");
	})
	$(".p4spe div:not(.p5-4,.p5-5)").on("touchstart",function(){
		var ids = $(this).attr("class");
		$(this).parent().find("div.actives").attr("class",ids);
		$(this).attr("class","actives");
	})
	$(".p4-2").on("touchstart",function(){
		spe(2);
	})
	$(".p4-3").on("touchstart",function(){
		spe(3);
	})
	$(".p4-4").on("touchstart",function(){
		spe(1);
	})
	$(".p10-4").on("touchstart",function(){
		$(".shares").removeClass("hide");
	})
	$(".shares").on("touchstart",function(){
		$(this).addClass("hide");
	})
	$(".home").on("touchstart",function(){
		location.reload();
	})
	$(".p1-2").on("touchstart",function(){
		last.row = now.row;
		last.col = now.col;
		if (last.row !=6) { now.row = last.row+1; now.col = 1; pageMove(towards.up);}
	})
}
//尺寸适应
function get_width(){
	$(".get_width").each(function(index, element) {
		var _width=$(this).find("li:nth-child(1) img").width();
		$(this).css({"width":_width});
	});
}
function spe(a){
	$(".p4spe"+a).removeClass("hide");
	page_five=false;
	$(".p5-4").on("touchstart",function(){
		$(this).parent().addClass("hide");
		page_five=true;
	})
}
function showPage(b){
	$(".job"+b).removeClass("hide");
	$(".join").hide();
	$(".job"+b+" .join").show();
}
$(".join").on("touchstart",function(){
	window.location.href="http://xyz.51job.com//external/apply.aspx?jobid=71721260&ctmid=2618386";
})
//页面跳转
function pageMove(tw){
var lastPage = ".page-"+last.row+"-"+last.col,
	nowPage = ".page-"+now.row+"-"+now.col;
	
	switch(tw) {
		case towards.up:
			outClass = 'pt-page-moveToTop';
			inClass = 'pt-page-moveFromBottom';
			break;
		case towards.right:
			outClass = 'pt-page-moveToRight';
			inClass = 'pt-page-moveFromLeft';
			break;
		case towards.down:
			outClass = 'pt-page-moveToBottom';
			inClass = 'pt-page-moveFromTop';
			break;
		case towards.left:
			outClass = 'pt-page-moveToLeft';
			inClass = 'pt-page-moveFromRight';
			break;
	}
	isAnimating = true;
	$(nowPage).removeClass("hide");
	setTimeout(function(){
		$(lastPage).addClass(outClass);
		$(nowPage).addClass(inClass);
		if(now.row==4){
			var _width=$(".page-"+now.row+"-"+now.col).find("li:nth-child(1) img").width();
			$(".page-"+now.row+"-"+now.col+" .get_width").css({"width":_width});
		}
		if(now.row==5){
			page_five=false;
			setTimeout(function(){
				$(".p9-5").show();
			},500)
			setTimeout(function(){
				$(".p9-7").show();
			},1300)
			setTimeout(function(){
				$(".p9-6").show();
				page_five=true;
			},3500)
			setTimeout(function(){
				$(".p9-8").show();
			},2700)
			setTimeout(function(){
				$(".p9-9").show();
			},2500)
			setTimeout(function(){
				$(".p9-10").show();
			},1600)
		}else{
			$(".p9-5,.p9-6,.p9-7,.p9-8,.p9-9,.p9-10").hide();
		}
		setTimeout(function(){
			$(lastPage).removeClass('page-current');
			$(lastPage).removeClass(outClass);
			$(lastPage).addClass("hide");
			$(lastPage).find("img").addClass("hide");
			
			$(nowPage).addClass('page-current');
			$(nowPage).removeClass(inClass);
			$(nowPage).find("img").removeClass("hide");
			isAnimating = false;
		},700);
	},100)
}
//js判断手机横竖屏判断
function orient() { 
	if (window.orientation == 90 || window.orientation == -90) { 
		$(".portrait").hide();
		$(".cover").show(); 
		$(".fe").hide();
    }
	else if (window.orientation == 0 || window.orientation == 180) { 
		$(".portrait").show();
		$(".cover").hide();
		$(".fe").show();
	}
}
	var timer;
	$(window).bind("orientationchange", function(){
		clearTimeout(timer);
		timer = setTimeout(orient, 300);
	});
orient();
