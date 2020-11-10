var startButton = document.getElementById("start");
var stopButton = document.getElementById("stop");
var resetButton = document.getElementById("reset");
var counterMin = document.getElementById("minutes");
var counterSec = document.getElementById("seconds");
var pc = document.getElementById("pc");
var sc = document.getElementById("sc");
var lc = document.getElementById("lc");
var stop = false;
var victory = new Audio('./res/workLoopComplete.wav');
var defeat = new Audio('./res/breakOver.wav');

resetButton.onclick = function() {
    document.location.reload();
}

startButton.onclick = function() {
    var workMin = parseInt(document.getElementById("wmi").value);
    var shortMin = parseInt(document.getElementById("sbi").value);
    var longMin = parseInt(document.getElementById("lbi").value);
    var loopNum = parseInt(document.getElementById("lni").value);
    var workMinutes = workMin;
    var shortBreak = shortMin;
    var longBreak = longMin;
    var minutes = workMinutes;
    var working = true;
    var onShortBreak = false;
    var onLongBreak = false;
    var workCount = 0;
    var shortBreakCount = 0;
    var longBreakCount = 0;
    var seconds = 0;
    var timer = setInterval(function() {
        if (stop == false) {
            counterMin.innerHTML = minutes;
            if (minutes == 0 && seconds == 0) {
                if (working == true) {
                    workCount++;
                    pc.innerHTML = workCount;
                    victory.play();
                    if (workCount % loopNum != 0) {
                        minutes = shortBreak;
                        onShortBreak = true;
                    }
                    else {
                        minutes = longBreak;
                        onLongBreak = true;
                    }
                    working = false;
                }
                else {
                    if (onShortBreak == true) {
                        shortBreakCount++;
                        sc.innerHTML = shortBreakCount;
                        defeat.play();
                        onShortBreak = false;
                    }
                    else {
                        longBreakCount++;
                        lc.innerHTML = longBreakCount;
                        defeat.play();
                        onLongBreak = false;
                    }
                    working = true;
                    minutes = workMinutes;
                }
            }
            if (seconds == 0) {
                minutes--;
                seconds = 59;
            }
            else {
                seconds--;
            }
            counterMin.innerHTML = minutes;
            if (seconds < 10) {
                counterSec.innerHTML = "0" + seconds;
            }
            else {
                counterSec.innerHTML = seconds;
            }
        }
        else {
            clearInterval(timer);
        }
    }, 1000);
}

stopButton.onclick = function() {
    stop = true;
}
