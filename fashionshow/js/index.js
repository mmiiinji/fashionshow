
//유동적으로 크기 조절
$(function(){


	var winH = $(window).height();

	$("section").css({"height":winH});


});



//section3 슬라이드 애니메이션
$(function(){
	var $slide = $(".reason_list");
	var $arrowBtn = $(".slide_arrow > a");
	var $btn1 = $(".slide_button > li:first-child");
	var $btn2 = $(".slide_button > li:last-child");

	$arrowBtn.on("click",function(){
		$slide.toggleClass("left");
		$btn1.toggleClass("on");
		$btn2.toggleClass("on");
		return false;
	});

	$btn1.on("click",function(){
		$slide.removeClass("left");
		$(this).addClass("on").siblings().removeClass();
		return false;
	});	

	$btn2.on("click",function(){
		$slide.addClass("left");
		$(this).addClass("on").siblings().removeClass();
		return false;
	});	

});





//section5 hashtag 슬라이드---------------------------------------------------------------------
$(function(){
	
	var $slide = $(".slide-wrap")// 슬라이드
	var nowidx = 0;
	var setIntervalId;
	
	var winWidth;
	var slideWidth;


	
	//리사이즈
	$(window).on("load resize", function(){
		winWidth = $(window).width();
		slideWidth = $(window).width()*3;

		MainWidth();
		
	});


	//가로폭 최적화 함수
	function MainWidth(){
		$(".slide-wrap").css({"width":(slideWidth)});
		$(".slide-wrap li").css({"width":(winWidth)});
	}

		
	//윈도우 로드 이벤트
	$(window).on("load",function() {
		$slide.hide().eq(nowidx).addClass("on").show(); // nowidx에 해당하는슬라이드만 노출
		autoPlay();// 자동실행함수호출
	});



	// move 함수
	function move() {
		var left = nowidx*winWidth;
		
		$slide.stop().animate({
			"left" : -left
		},1000,'easeOutQuart');

		oldidx = nowidx;

	}



	// 자동재생 함수
	function autoPlay() {
		setIntervalId = setInterval(function() { // function() =익명함수
			nextidx();
			move();
		}, 5000);
	}

	//자동재생 멈춤 함수
	$('.slide_arrow > a,.hashtag_wrap').on({		
		mouseover:function(){		//wrap에 마우스 오버시
			clearInterval(setIntervalId)	//인터벌 메서드 삭제
		},
		mouseout:function(){	//마우스 아웃시에는
			autoPlay();			//timer를 다시 실행
		}
	});



	// 다음번 인덱스 번호 추출
	function nextidx() {
		if (nowidx > 1) {
			nowidx = 0;
		} else {
			nowidx++;
		}
	}


	// 다음버튼에 대한 클릭이벤트 구문
	$(".hashtag .nav_next").on("click", function(evt) {
		if (nowidx > 1) {
			nowidx = 0;
		} else {
			nowidx++;
		}
		move(); // 위에서 만든 슬라이드 인디케이터 변환함수 호출
		evt.preventDefault();
	});


	// 이전버튼에 대한 클릭이벤트 구문
	$(".hashtag .nav_prev").on("click", function(evt) {
		if (nowidx < 1) {
			nowidx = 2;
		} else {
			nowidx--;
		}
		move(); // 위에서 만든 슬라이드 인디케이터 변환함수 호출
		evt.preventDefault();
	});
	
});







//스크롤시 자동으로 해당 위치에 도달
$(function(){
      
      var nowIdx = 0;   
      var scrollH = 0;
      var $menu = $(".pagination>li>a");//메인메뉴      
      var posSectionTop = [];//section 영역의 시작높이값 저장 배열
      var $sectionCont = $("section");   

	 var aniPlag = false; //페이지가 animate 중인지 표시하는 플래그 변수
	 //true = 애니메이트 하는 중
      

      //section 영역의 시작높이값을 동적으로 배열에 저장
      $sectionCont.each(function(idx){
            posSectionTop[idx] = $(this).offset().top;
      });


      
      //인디케이터 활성화 표시
      function setIndicator(){
         $menu.eq(nowIdx).parent().addClass("on").siblings().removeClass("on");         
      }


      
      //페이지 이동 함수
      function pageMove(){
          
          aniPlag = true; //"이동 중"으로 플래그값 설정

      
          $("html,body").animate({scrollTop:posSectionTop[nowIdx]},400,"easeInOutCubic",function(){
              aniPlag = false; //이동이 끝난 시점에 플래그 값 변경
         });

      }


      
      //메뉴 클릭이벤트 설정      
      $menu.on("click",function(){
         nowIdx = $menu.index($(this));
         pageMove();
         return false;
      });


      //스크롤 높이값에 따른 메뉴 활성화 표시
      $(window).on("scroll",function(){
          
         scrollH = $(this).scrollTop();
         
         for(var i=0;i<$menu.size();i++){
            if(scrollH>=posSectionTop[i]){
               $menu.eq(i).parent().addClass("on").siblings().removeClass("on");
            }
         }
      });

      
      
      //마우스 휠 이벤트 구문
      $(window).on("mousewheel DOMMouseSccroll",function(evt){
       //DOMMouseSccroll : 파이어 폭스 브라우저 전용 이벤트

            var top = $(this).scrollTop()


       
           if(!aniPlag){//페이지 이동중이 아닐때 아래의 코드를 실행하겠다.
             
      
               //휠 방향에 따른 알맞은 인덱스 값 구하기
               if(evt.originalEvent.wheelDelta>0 || evt.originalEvent.detail<0){ //크롬,파이어폭스 순의 조건문
                  prevIdx();//윗방향 마우스 스크롤시 호출
               }else{
                  nextIdx();//아래방향 마우스 스크롤시 호출
               }
      
                  pageMove();
          }else if(!aniPlag){//페이지 이동중이 아닐때 아래의 코드를 실행하겠다.

             
      
               //휠 방향에 따른 알맞은 인덱스 값 구하기
               if(evt.originalEvent.wheelDelta>0 || evt.originalEvent.detail<0){ //크롬,파이어폭스 순의 조건문
                  prevIdx();//윗방향 마우스 스크롤시 호출
               }else{
                  nextIdx();//아래방향 마우스 스크롤시 호출
               }
      
                  pageMove();
          }
      });

      
      //다음인덱스 설정함수
      function nextIdx(){
         if(nowIdx < posSectionTop.length-1){
            nowIdx++;
         }
      }
      
      //이전인덱스 설정함수
      function prevIdx(){
         if(nowIdx > 0){
            nowIdx--;
         }
      }
      
	  var $topBtn = $(".btn-top");//상단버튼
      var position = $("section.download").offset().top;

      $(window).on('scroll', function(){
         var nowScroll = $(this).scrollTop(); 		
         if(nowScroll>position-700){
            $topBtn.fadeIn();
         }else{
            $topBtn.fadeOut();
         }
      });

      $topBtn.on("click",function(){
            $("html,body").stop().animate({"scrollTop":0},1000,'easeOutExpo');
			 nowIdx=0;
            return false;
      });

      
});








//나이스 스크롤
$(function(){
	$(".download").niceScroll({
		cursorcolor:"#000",
		cursorwidth:10,
		cursorborderradius:"10px",
		scrollspeed:10,
		mousescrollstep:200,
		cursoropacitymax:0.5,
		background:"none",
		cursorborder:"none",
		autohidemode:true,
		boxzoom:false,
		smoothscroll:true,
		nativeparentscrolling:true
	}); // MAC like scrollbar
});




//링크없는 앵커태그 무력화
$(function(){

	$(".list_download > li > a,.button").on("click", function(){
		return false;
	});

});