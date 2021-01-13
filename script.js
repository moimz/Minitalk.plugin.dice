/**
 * 이 파일은 미니톡 주사위 플러그인의 일부입니다. (https://www.minitalk.io)
 *
 * 채팅창을 이용해 주사위를 굴릴 수 있습니다.
 * 
 * @file /plugins/dice/script.js
 * @author Arzz (arzz@arzz.com)
 * @license MIT License
 * @version 1.0.0
 * @modified 2020. 12. 28.
 */
Minitalk.on("connect",function(minitalk) {
	minitalk.ui.printSystemMessage("plugin","[주사위 플러그인] 채팅창에 /주사위 [돌릴 숫자]를 쳐보세요. 주사위 결과가 출력 됩니다.");
});

// 사용자정의 명령어 이벤트를 받아, 주사위 명령어를 처리한다.
Minitalk.on("command",function(minitalk,command,commands) {
	if (command == "주사위") {
		var limit = commands.length == 1 ? commands[0] : 100;
		
		var dice = Math.floor((Math.random() * (limit - 1))) + 1;
		
		Minitalk.socket.sendMessage("/주사위 " + limit);
		Minitalk.socket.sendMessage("주사위를 굴림결과 : [" + dice + "]");
		
		return true;
	}
});