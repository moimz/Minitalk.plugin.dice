/**
 * 이 파일은 미니톡 주사위 플러그인의 일부입니다. (https://www.minitalk.io)
 *
 * 채팅창을 이용해 주사위를 굴릴 수 있습니다.
 * 
 * @file /plugins/dice/script.js
 * @author Arzz (arzz@arzz.com)
 * @license MIT License
 * @version 1.0.0
 * @modified 2021. 1. 21.
 */
if (Minitalk === undefined) return;

Minitalk.on("connect",function(minitalk) {
	minitalk.ui.printSystemMessage("plugin","[주사위 플러그인] 채팅창에 /주사위 [돌릴 숫자]를 쳐보세요. 주사위 결과가 출력 됩니다.");
});

// 사용자정의 명령어 이벤트를 받아, 주사위 명령어를 처리한다.
Minitalk.on("command",function(minitalk,command,commands) {
	if (command == "주사위") {
		var limit = commands.length == 1 ? commands[0] : 100;
		
		var dice = Math.floor((Math.random() * (limit - 1))) + 1;
		
		Minitalk.socket.sendMessage("dice","/주사위 " + limit,{result:dice});
		
		return true;
	}
});

// 사용자정의 메시지 타입 이벤트를 받아, 화면에 보여준다.
Minitalk.on("printMessage",function(minitalk,message,$content) {
	/**
	 * 내용을 담을 말풍선을 생성한다.
	 */
	var $balloon = $("<div>").attr("data-role","balloon");
	$balloon.append($("<span>").addClass("text").html(Minitalk.ui.decodeMessage(message.message)));
	
	if (message.time === undefined) {
		$balloon.append($("<span>").addClass("time").html('<i class="sending"></i>'));
	} else {
		$balloon.append($("<span>").addClass("time").html($("<time>").attr("datetime",message.time).html(Minitalk.ui.getTime(message.time,Minitalk.dateFormat))));
	}
	
	$content.append($balloon);
	
	/**
	 * 주사위 굴림 결과를 보여준다.
	 */
	var $result = $("<div>").attr("data-role","dice").css("fontSize","12px").css("color","green");
	$result.append("주사위 굴림 결과 <b>" + message.data.result + "</b> 이 나왔습니다.");
	
	$content.append($result);
});