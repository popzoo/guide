// 系统环境变量path增加cmdmp3new文件夹
// npm i play-sound
var player = require('play-sound')(opts = {})
var path = require("path");
var fs = require("fs");

// const pathArr = ['bomb.mp3','glassbomb.mp3','metalBomb.mp3','nuclearBomb.mp3','particleBomb.mp3','stoneBomb.mp3','thunderLoud.mp3'];
// date util
function dateFormat(fmt, date) {
    let ret;
    let opt = {
        "Y+": date.getFullYear().toString(),
        "m+": (date.getMonth() + 1).toString(),
        "d+": date.getDate().toString(),
        "H+": date.getHours().toString(),
        "M+": date.getMinutes().toString(),
        "S+": date.getSeconds().toString()
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}

runAudio();//entrance
// delay and judge
function runControl(){
	let curHour = parseInt(dateFormat("HH",new Date()));
	if(curHour>=3&&curHour<=5){//3，4，5点
		let timeGap =  60*1000*(parseInt(Math.random()*10)+15);// here shuould *60s  
		setTimeout(runAudio,timeGap);
	}else{
		setTimeout(runControl,1000*60*3);//3分钟自建一次
		console.log("自检时间【"+new Date().toLocaleString() + "】");
	}
}
// main func
function runAudio(){
	let file = path.join(__dirname, 'audio/'); //file path，__dirname is same with current js dir.
	var nameArr = [];
	fs.readdir(file, function(err, files){
	    (function iterator(i){
	        if(i == files.length) {
	          	console.log(nameArr);
				let num = parseInt(Math.random()*nameArr.length);
				player.play('./audio/'+nameArr[num], function(err){
				  	if (err) throw err;
				})
				// play again
				setTimeout(function(){
					let num1 = parseInt(Math.random()*nameArr.length);
					player.play('./audio/'+nameArr[num1], function(err){
					  	if (err) throw err;
					})
					console.log("***播放时间【"+new Date().toLocaleString() + "】***");
					// callback
					runControl();
				},1500);	          	
	          	return ;
	        }
	      	fs.stat(path.join(file, files[i]), function(err, data){     
	        	if(data.isFile()){               
	        	    nameArr.push(files[i]);
	        	}
	        	iterator(i+1);
	        });   
	    })(0);
	});	
}


