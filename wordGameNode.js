// main program for node based word guessing game
import * as _ from "lodash";
import Word from "./word";
import { terminal as term } from "terminal-kit";
// global variables and constants
const wordsArr = [
    "javascript",
    "html",
    "mongo",
    "chrome",
    "node",
    "css"
];
// holds the word selected by random from wordsArr
var theWord;
var lettersChosen = [];
// randomly choose a word from wordsArr
function chooseWord() {
    let random = _.random(0, (wordsArr.length - 1));
    theWord = new Word(wordsArr[random]);
}
function setupTerminal() {
    term.clear();
}
function showWord() {
    let word = theWord.word2string();
    console.log("Word so far " + word);
}
function showLettersChosen() {
    console.log("Letters chosen " + lettersChosen.join(","));
}
// function getChar ():string {
//     return "e";
// }
// function getInput ():void {
//     let char = getChar();
//     console.log("input char " + char);
//     theWord.checkChar(char);
//     lettersChosen.push(char);
// }
function guessWord() {
    console.log("Guess a word");
    // turn off the event listener, callback required
    term.off("key", function () {
        term.inputField(function (error, input) {
            if (error) {
                term.red.bold("\nAn error occurs: " + error + "\n");
                term.processExit(0);
            }
            else {
                console.log("Input was " + input);
                term.processExit(0);
            }
            // turn the event listener back on
            term.on('key', function (name, matches, data) {
                // console.log("'key' event:" + name + " matches " + matches + " data " + data);
                if (name === 'CTRL_C') {
                    term.processExit(0);
                }
                else {
                    processInput(name);
                }
            });
        });
    });
}
// function called when a key is pressed in raw mode
function processInput(char) {
    const regexp = new RegExp("[a-z]", "i");
    if (char === "ENTER") {
        // make a guess at the word
        guessWord();
    }
    else if ((char.length === 1) && (regexp.test(char))) {
        const lcChar = char.toLowerCase();
        // console.log("valid input " + char);
        // check to see whether letter has already been selected
        if (_.indexOf(lettersChosen, lcChar) > 0) {
            // don't process anything because letter has already been selected
        }
        else {
            theWord.checkChar(lcChar);
            lettersChosen.push(lcChar);
            // check to see if word is completed
            if (theWord.word2string().includes("_")) {
                // not completed
                showWord();
                showLettersChosen();
            }
            else {
                wordCompleted();
            }
        }
    }
    // any other key pressed does nothing  
}
function wordCompleted() {
    console.log("completed word");
    showWord();
    showLettersChosen();
    term.processExit(0);
}
setupTerminal();
chooseWord();
console.log("Word chosen ");
console.log(theWord);
// showWord();
// showLettersChosen();
// getInput();
term.grabInput(true);
// set watcher on key input
term.on('key', function (name, matches, data) {
    // console.log("'key' event:" + name + " matches " + matches + " data " + data);
    if (name === 'CTRL_C') {
        term.processExit(0);
    }
    else {
        processInput(name);
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFFckIsMkJBQTJCO0FBQzNCLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLFVBQVUsSUFBVyxFQUFFLE9BQVcsRUFBRSxJQUFRO0lBQ3ZELGdGQUFnRjtJQUNoRixJQUFJLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDbkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN2QjtTQUNJO1FBQ0QsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3RCO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoid29yZEdhbWVOb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gbWFpbiBwcm9ncmFtIGZvciBub2RlIGJhc2VkIHdvcmQgZ3Vlc3NpbmcgZ2FtZVxyXG5cclxuaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCBXb3JkIGZyb20gXCIuL3dvcmRcIjtcclxuaW1wb3J0IHt0ZXJtaW5hbCBhcyB0ZXJtfSBmcm9tIFwidGVybWluYWwta2l0XCI7XHJcbmltcG9ydCB7IHByb2Nlc3NTY29wZVF1ZXVlIH0gZnJvbSBcIm5leHRnZW4tZXZlbnRzXCI7XHJcblxyXG4vLyBnbG9iYWwgdmFyaWFibGVzIGFuZCBjb25zdGFudHNcclxuY29uc3Qgd29yZHNBcnIgPSBbXHJcbiAgICBcImphdmFzY3JpcHRcIixcclxuICAgIFwiaHRtbFwiLFxyXG4gICAgXCJtb25nb1wiLFxyXG4gICAgXCJjaHJvbWVcIixcclxuICAgIFwibm9kZVwiLFxyXG4gICAgXCJjc3NcIlxyXG5dO1xyXG5cclxuLy8gaG9sZHMgdGhlIHdvcmQgc2VsZWN0ZWQgYnkgcmFuZG9tIGZyb20gd29yZHNBcnJcclxudmFyIHRoZVdvcmQ6V29yZDtcclxuXHJcbnZhciBsZXR0ZXJzQ2hvc2VuOnN0cmluZ1tdID0gW107XHJcbi8vIHJhbmRvbWx5IGNob29zZSBhIHdvcmQgZnJvbSB3b3Jkc0FyclxyXG5mdW5jdGlvbiBjaG9vc2VXb3JkICgpIHtcclxuICAgIGxldCByYW5kb20gPSBfLnJhbmRvbSgwLCAod29yZHNBcnIubGVuZ3RoIC0xICkpO1xyXG4gICAgdGhlV29yZCA9IG5ldyBXb3JkKHdvcmRzQXJyW3JhbmRvbV0pO1xyXG4gICAgXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldHVwVGVybWluYWwoKTp2b2lkIHtcclxuICAgIHRlcm0uY2xlYXIoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1dvcmQoKTp2b2lkIHtcclxuICAgIGxldCB3b3JkOnN0cmluZyA9IHRoZVdvcmQud29yZDJzdHJpbmcoKTtcclxuICAgIGNvbnNvbGUubG9nKFwiV29yZCBzbyBmYXIgXCIgKyB3b3JkKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd0xldHRlcnNDaG9zZW4gKCk6dm9pZCB7XHJcbiAgICBjb25zb2xlLmxvZyggXCJMZXR0ZXJzIGNob3NlbiBcIiArbGV0dGVyc0Nob3Nlbi5qb2luKFwiLFwiKSk7XHJcbn1cclxuXHJcbi8vIGZ1bmN0aW9uIGdldENoYXIgKCk6c3RyaW5nIHtcclxuLy8gICAgIHJldHVybiBcImVcIjtcclxuLy8gfVxyXG5cclxuLy8gZnVuY3Rpb24gZ2V0SW5wdXQgKCk6dm9pZCB7XHJcbi8vICAgICBsZXQgY2hhciA9IGdldENoYXIoKTtcclxuLy8gICAgIGNvbnNvbGUubG9nKFwiaW5wdXQgY2hhciBcIiArIGNoYXIpO1xyXG4vLyAgICAgdGhlV29yZC5jaGVja0NoYXIoY2hhcik7XHJcbi8vICAgICBsZXR0ZXJzQ2hvc2VuLnB1c2goY2hhcik7XHJcbi8vIH1cclxuXHJcbmZ1bmN0aW9uIGd1ZXNzV29yZCgpOnZvaWQge1xyXG4gICAgY29uc29sZS5sb2coXCJHdWVzcyBhIHdvcmRcIik7XHJcbiAgICAvLyB0dXJuIG9mZiB0aGUgZXZlbnQgbGlzdGVuZXIsIGNhbGxiYWNrIHJlcXVpcmVkXHJcbiAgICB0ZXJtLm9mZihcImtleVwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRlcm0uaW5wdXRGaWVsZChmdW5jdGlvbiAoZXJyb3I6IGFueSwgaW5wdXQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHRlcm0ucmVkLmJvbGQoXCJcXG5BbiBlcnJvciBvY2N1cnM6IFwiICsgZXJyb3IgKyBcIlxcblwiKTtcclxuICAgICAgICAgICAgICAgIHRlcm0ucHJvY2Vzc0V4aXQoMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIklucHV0IHdhcyBcIiArIGlucHV0KTtcclxuICAgICAgICAgICAgICAgIHRlcm0ucHJvY2Vzc0V4aXQoMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gdHVybiB0aGUgZXZlbnQgbGlzdGVuZXIgYmFjayBvblxyXG4gICAgICAgICAgICB0ZXJtLm9uKCdrZXknLCBmdW5jdGlvbiAobmFtZTogc3RyaW5nLCBtYXRjaGVzOiBhbnksIGRhdGE6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCIna2V5JyBldmVudDpcIiArIG5hbWUgKyBcIiBtYXRjaGVzIFwiICsgbWF0Y2hlcyArIFwiIGRhdGEgXCIgKyBkYXRhKTtcclxuICAgICAgICAgICAgICAgIGlmIChuYW1lID09PSAnQ1RSTF9DJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlcm0ucHJvY2Vzc0V4aXQoMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSW5wdXQobmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIFxyXG59XHJcbi8vIGZ1bmN0aW9uIGNhbGxlZCB3aGVuIGEga2V5IGlzIHByZXNzZWQgaW4gcmF3IG1vZGVcclxuZnVuY3Rpb24gcHJvY2Vzc0lucHV0KCBjaGFyOnN0cmluZyk6dm9pZCB7XHJcbiAgICBjb25zdCByZWdleHAgPSBuZXcgUmVnRXhwKFwiW2Etel1cIiwgXCJpXCIpO1xyXG4gICAgaWYgKCBjaGFyID09PSBcIkVOVEVSXCIpIHtcclxuICAgICAgICAvLyBtYWtlIGEgZ3Vlc3MgYXQgdGhlIHdvcmRcclxuICAgICAgICBndWVzc1dvcmQoKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKCAoY2hhci5sZW5ndGggPT09IDEpICYmIChyZWdleHAudGVzdChjaGFyKSkpIHtcclxuICAgICAgICBjb25zdCBsY0NoYXIgPSBjaGFyLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJ2YWxpZCBpbnB1dCBcIiArIGNoYXIpO1xyXG4gICAgICAgIC8vIGNoZWNrIHRvIHNlZSB3aGV0aGVyIGxldHRlciBoYXMgYWxyZWFkeSBiZWVuIHNlbGVjdGVkXHJcbiAgICAgICAgaWYgKF8uaW5kZXhPZihsZXR0ZXJzQ2hvc2VuLGxjQ2hhcikgPiAwKSB7XHJcbiAgICAgICAgICAgIC8vIGRvbid0IHByb2Nlc3MgYW55dGhpbmcgYmVjYXVzZSBsZXR0ZXIgaGFzIGFscmVhZHkgYmVlbiBzZWxlY3RlZFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhlV29yZC5jaGVja0NoYXIobGNDaGFyKTtcclxuICAgICAgICAgICAgbGV0dGVyc0Nob3Nlbi5wdXNoKGxjQ2hhcik7XHJcbiAgICAgICAgICAgIC8vIGNoZWNrIHRvIHNlZSBpZiB3b3JkIGlzIGNvbXBsZXRlZFxyXG4gICAgICAgICAgICBpZiAodGhlV29yZC53b3JkMnN0cmluZygpLmluY2x1ZGVzKFwiX1wiKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gbm90IGNvbXBsZXRlZFxyXG4gICAgICAgICAgICAgICAgc2hvd1dvcmQoKTtcclxuICAgICAgICAgICAgICAgIHNob3dMZXR0ZXJzQ2hvc2VuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3b3JkQ29tcGxldGVkKCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBhbnkgb3RoZXIga2V5IHByZXNzZWQgZG9lcyBub3RoaW5nICBcclxufVxyXG5cclxuZnVuY3Rpb24gd29yZENvbXBsZXRlZCgpOnZvaWQge1xyXG4gICAgY29uc29sZS5sb2coXCJjb21wbGV0ZWQgd29yZFwiKTtcclxuICAgIHNob3dXb3JkKCk7XHJcbiAgICBzaG93TGV0dGVyc0Nob3NlbigpO1xyXG4gICAgdGVybS5wcm9jZXNzRXhpdCgwKTtcclxufVxyXG5cclxuc2V0dXBUZXJtaW5hbCgpO1xyXG5jaG9vc2VXb3JkKCk7XHJcbmNvbnNvbGUubG9nKFwiV29yZCBjaG9zZW4gXCIpO1xyXG5jb25zb2xlLmxvZyh0aGVXb3JkKTtcclxuLy8gc2hvd1dvcmQoKTtcclxuLy8gc2hvd0xldHRlcnNDaG9zZW4oKTtcclxuLy8gZ2V0SW5wdXQoKTtcclxuXHJcbnRlcm0uZ3JhYklucHV0KHRydWUpO1xyXG5cclxuLy8gc2V0IHdhdGNoZXIgb24ga2V5IGlucHV0XHJcbnRlcm0ub24oJ2tleScsIGZ1bmN0aW9uIChuYW1lOnN0cmluZywgbWF0Y2hlczphbnksIGRhdGE6YW55KSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcIidrZXknIGV2ZW50OlwiICsgbmFtZSArIFwiIG1hdGNoZXMgXCIgKyBtYXRjaGVzICsgXCIgZGF0YSBcIiArIGRhdGEpO1xyXG4gICAgaWYgKG5hbWUgPT09ICdDVFJMX0MnKSB7XHJcbiAgICAgICAgdGVybS5wcm9jZXNzRXhpdCgwKTtcclxuICAgIH0gXHJcbiAgICBlbHNlIHtcclxuICAgICAgICBwcm9jZXNzSW5wdXQobmFtZSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuXHJcblxyXG4iXX0=
