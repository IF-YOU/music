$(function(){
	

	var database=[];
	
	var makelist=function(){
		$('#divsonglist ul li ').empty();
		$.each(database,function(k,v){
			$('<li index="'+k+'" class="li"><strong class="music_name" title="'+v.title+'">'+v.title+'</strong>  <strong class="singer_name" title="'+v.artist+'">'+v.artist+'</strong> <strong class="play_time">'+v.duration+'</strong>  <div class="list_cp">  <strong class="btn_like" title="喜欢" name="" mid="004fQTu016b9W4"><span>我喜欢</span></strong><strong class="btn_share" title="分享"><span>分享</span></strong> <strong class="btn_fav" title="收藏到歌单"> <span>收藏</span> </strong>  <strong class="btn_del" title="从列表中删除"> <span>删除</span> </strong></li>').appendTo('#cc')
			$('#spansongnum1 span').text(database.length);
		})
	}
	$.getJSON('./database.json').done(function(data){
		database=data;
		makelist();
	})




	//1、play,pause暂停播放
	var audio = $("audio").get(0);
	var btnplay = $("#btnplay");
	var bofang=function(){
		if(audio.paused===true){
			audio.play();
		}else{
			audio.pause();
		}
	}

	//播放
	$('#btnplay').on('click',function(){
		bofang();
	})
	
	//暂停
	audio.onplay=function(){
		$('#btnplay').removeClass('play_bt').addClass('pause_bt');
	}
	audio.onpause=function(){
		$('#btnplay').addClass('play_bt').removeClass('pause_bt');
	}


	//2、音量控制
	$("#spanvolumebar").on('click',function(e){
		audio.volume = e.offsetX/$(this).width();
	})
	$(audio).on('volumechange',function(){
		//进度条控制静音
		if(audio.volume === 0){
			$("#spanmute").removeClass("volume_icon").addClass("volume_mute");
		}else{
			$("#spanmute").removeClass("volume_mute").addClass("volume_icon");
		}
		var left=audio.volume.toFixed(2)*100+"%";
		$('.volume_op').css('left',left);
	})
	

	var yuanlai;
	$('#spanmute').on('click',function(){
		if(audio.volume===0){
			audio.volume=yuanlai;
		}else{
			yuanlai=audio.volume;
			audio.volume=0;
		}
	})


	//播放进度条
	

	audio.ontimeupdate=function(){
		var percent=((audio.currentTime/audio.duration).toFixed(2))*100+'%';
		$('#spanplaybar').css('width',percent);
		$('#spanprogress_op').css('left',percent);
	}


	var currentSong=0;
	var onsongchange=function(){/*页面的改变*/
		audio.play();
		$('#divsonglist li').removeClass('play_current')
		.eq(currentSong).addClass('play_current');	
		$('#music_name').text(database[currentSong].title);
		$('.music_info_main .singer_name').text(database[currentSong].artist);
		$('.play_date').text(database[currentSong].duration);
	}

	$('#divsonglist').on('click','li' ,function(){
		currentSong=$(this).index();
		audio.src=database[currentSong].filename;
		onsongchange();
	})

	$('#divsonglist').on('mouseenter mouseleave','li',function(){
		$(this).toggleClass('play_hover')
	})

	/*下一首*/
	var xiayishou=function(){
		currentSong+=1;
		if(currentSong===database.length){
			currentSong=0;
		}
		audio.src=database[currentSong].filename;
	}
	$('#nextbt').on('click',function(){
		xiayishou();
		onsongchange();
	})
	/*上一首*/
	$('.prev_bt').on('click',function(){

		currentSong-=1;
		if(currentSong===0){
			currentSong=database.length;
		}
		audio.src=database[currentSong].filename;
		onsongchange();
	})

	


	












	//向左向右
	var zhanchai = $(".folded_bt");
	var dakuai = $(".m_player");
	var flag=true;
	zhanchai.on('click',function(){
		if(flag){
			dakuai
			.animate({left:-540},300)
			flag = false;
		}
		else{
			dakuai.animate({left:0},300)
			flag = true;
		}
		
	})
	//展开/隐藏播放列表
	var open = $(".open_list");
	var close = $(".close_list");
	var leibiao = $(".play_list_frame");
	open.click(function(){
		leibiao
		.css({"opacity":1})
		.toggle()
	})
	close.click(function(){
		leibiao
		.css({"opacity":1})
		.toggle()
	})



})