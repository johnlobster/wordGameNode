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
// object to hold x,y locations of inputs and outputs for use by terminal-kit
const termXY = {
    chosenLetters: { x: 10, y: 10 },
    wordSoFar: { x: 10, y: 12 },
    getWord: { x: 10, y: 15 },
    input: { x: 10, y: 13 }
};
// can't seem to turn off the event listener so using a global variable to make it not reurn anything
var readWord = false;
// holds the word selected by random from wordsArr
var theWord;
// array to hold the letters chosen
var lettersChosen = [];
// randomly choose a word from wordsArr
function chooseWord() {
    let random = _.random(0, (wordsArr.length - 1));
    theWord = new Word(wordsArr[random]);
}
// clears the screen and then prints out all the information
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
function exitGame(message) {
    term.nextLine(10);
    if (message !== undefined) {
        console.log(message);
    }
    term.processExit(0);
}
function guessWord() {
    console.log("Guess a word");
    // turn off the key event listener using global variable
    readWord = true;
    term.inputField(function (error, input) {
        if (error) {
            // term.red.bold("\nAn error occurred reading input field: " + error + "\n");
            exitGame("\nAn error occurred reading input field: " + error + "\n");
        }
        else {
            console.log("\nInput was " + input);
            if (input === theWord.word2FullString()) {
                wordCompleted();
            }
            else {
                console.log("Guess was wrong");
            }
        }
        // let the event listener work again
        readWord = false;
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
    console.log(" Another game ? (Y/n)");
    readWord = true; // not really reading word but disables key event
    term.yesOrNo({ yes: ['y', 'ENTER'], no: ['n'] }, function (error, result) {
        if (result) {
            readWord = false; // re-enabled key event
            start();
        }
        else {
            exitGame();
        }
    });
}
function start() {
    setupTerminal();
    chooseWord();
    // after setup, program is driven by key presses
}
// showWord();
// showLettersChosen();
// getInput();
start();
console.log(theWord);
// set terminal up to read key presses
term.grabInput(true);
// set watcher on key input
term.on('key', function (name, matches, data) {
    if (name === 'CTRL_C') {
        exitGame("Control C pressed - exiting game");
    }
    else {
        // console.log("'key' event:" + name + " matches " + matches + " data " + data);
        if (!readWord) {
            processInput(name);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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IGJhc2VkIHdvcmQgZ3Vlc3NpbmcgZ2FtZVxyXG5cclxuaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCBXb3JkIGZyb20gXCIuL3dvcmRcIjtcclxuaW1wb3J0IHt0ZXJtaW5hbCBhcyB0ZXJtfSBmcm9tIFwidGVybWluYWwta2l0XCI7XHJcblxyXG5cclxuLy8gZ2xvYmFsIHZhcmlhYmxlcyBhbmQgY29uc3RhbnRzXHJcbmNvbnN0IHdvcmRzQXJyID0gW1xyXG4gICAgXCJqYXZhc2NyaXB0XCIsXHJcbiAgICBcImh0bWxcIixcclxuICAgIFwibW9uZ29cIixcclxuICAgIFwiY2hyb21lXCIsXHJcbiAgICBcIm5vZGVcIixcclxuICAgIFwiY3NzXCJcclxuXTtcclxuXHJcbi8vIG9iamVjdCB0byBob2xkIHgseSBsb2NhdGlvbnMgb2YgaW5wdXRzIGFuZCBvdXRwdXRzIGZvciB1c2UgYnkgdGVybWluYWwta2l0XHJcbmNvbnN0IHRlcm1YWSA9IHtcclxuICAgIGNob3NlbkxldHRlcnM6IHsgeDogMTAsIHk6IDEwfSxcclxuICAgIHdvcmRTb0ZhcjogeyB4OjEwLCB5OjEyfSxcclxuICAgIGdldFdvcmQ6IHsgeDoxMCwgeToxNX0sXHJcbiAgICBpbnB1dDogeyB4OjEwLCB5OjEzfVxyXG59O1xyXG5cclxuLy8gY2FuJ3Qgc2VlbSB0byB0dXJuIG9mZiB0aGUgZXZlbnQgbGlzdGVuZXIgc28gdXNpbmcgYSBnbG9iYWwgdmFyaWFibGUgdG8gbWFrZSBpdCBub3QgcmV1cm4gYW55dGhpbmdcclxudmFyIHJlYWRXb3JkID0gZmFsc2U7XHJcbi8vIGhvbGRzIHRoZSB3b3JkIHNlbGVjdGVkIGJ5IHJhbmRvbSBmcm9tIHdvcmRzQXJyXHJcbnZhciB0aGVXb3JkOldvcmQ7XHJcblxyXG4vLyBhcnJheSB0byBob2xkIHRoZSBsZXR0ZXJzIGNob3NlblxyXG52YXIgbGV0dGVyc0Nob3NlbjpzdHJpbmdbXSA9IFtdO1xyXG5cclxuLy8gcmFuZG9tbHkgY2hvb3NlIGEgd29yZCBmcm9tIHdvcmRzQXJyXHJcbmZ1bmN0aW9uIGNob29zZVdvcmQgKCkge1xyXG4gICAgbGV0IHJhbmRvbSA9IF8ucmFuZG9tKDAsICh3b3Jkc0Fyci5sZW5ndGggLTEgKSk7XHJcbiAgICB0aGVXb3JkID0gbmV3IFdvcmQod29yZHNBcnJbcmFuZG9tXSk7XHJcbiAgICBcclxufVxyXG5cclxuLy8gY2xlYXJzIHRoZSBzY3JlZW4gYW5kIHRoZW4gcHJpbnRzIG91dCBhbGwgdGhlIGluZm9ybWF0aW9uXHJcbmZ1bmN0aW9uIHNldHVwVGVybWluYWwoKTp2b2lkIHtcclxuICAgIHRlcm0uY2xlYXIoKTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHNob3dXb3JkKCk6dm9pZCB7XHJcbiAgICBsZXQgd29yZDpzdHJpbmcgPSB0aGVXb3JkLndvcmQyc3RyaW5nKCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIldvcmQgc28gZmFyIFwiICsgd29yZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dMZXR0ZXJzQ2hvc2VuICgpOnZvaWQge1xyXG4gICAgY29uc29sZS5sb2coIFwiTGV0dGVycyBjaG9zZW4gXCIgK2xldHRlcnNDaG9zZW4uam9pbihcIixcIikpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBleGl0R2FtZShtZXNzYWdlPzogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0ZXJtLm5leHRMaW5lKDEwKTtcclxuICAgIGlmIChtZXNzYWdlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBcclxuICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcclxuICAgIH1cclxuICAgIHRlcm0ucHJvY2Vzc0V4aXQoMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGd1ZXNzV29yZCgpOnZvaWQge1xyXG4gICAgY29uc29sZS5sb2coXCJHdWVzcyBhIHdvcmRcIik7XHJcbiAgICAvLyB0dXJuIG9mZiB0aGUga2V5IGV2ZW50IGxpc3RlbmVyIHVzaW5nIGdsb2JhbCB2YXJpYWJsZVxyXG4gICAgcmVhZFdvcmQgPSB0cnVlO1xyXG4gICAgdGVybS5pbnB1dEZpZWxkKGZ1bmN0aW9uIChlcnJvcjogYW55LCBpbnB1dDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgIC8vIHRlcm0ucmVkLmJvbGQoXCJcXG5BbiBlcnJvciBvY2N1cnJlZCByZWFkaW5nIGlucHV0IGZpZWxkOiBcIiArIGVycm9yICsgXCJcXG5cIik7XHJcbiAgICAgICAgICAgIGV4aXRHYW1lKFwiXFxuQW4gZXJyb3Igb2NjdXJyZWQgcmVhZGluZyBpbnB1dCBmaWVsZDogXCIgKyBlcnJvciArIFwiXFxuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJcXG5JbnB1dCB3YXMgXCIgKyBpbnB1dCk7XHJcbiAgICAgICAgICAgIGlmKCBpbnB1dCA9PT0gdGhlV29yZC53b3JkMkZ1bGxTdHJpbmcoKSkge1xyXG4gICAgICAgICAgICAgICAgd29yZENvbXBsZXRlZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHdWVzcyB3YXMgd3JvbmdcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gbGV0IHRoZSBldmVudCBsaXN0ZW5lciB3b3JrIGFnYWluXHJcbiAgICAgICAgcmVhZFdvcmQgPSBmYWxzZTtcclxuICAgIH0pO1xyXG59XHJcbi8vIGZ1bmN0aW9uIGNhbGxlZCB3aGVuIGEga2V5IGlzIHByZXNzZWQgaW4gcmF3IG1vZGVcclxuZnVuY3Rpb24gcHJvY2Vzc0lucHV0KCBjaGFyOnN0cmluZyk6dm9pZCB7XHJcbiAgICBjb25zdCByZWdleHAgPSBuZXcgUmVnRXhwKFwiW2Etel1cIiwgXCJpXCIpO1xyXG4gICAgaWYgKCBjaGFyID09PSBcIkVOVEVSXCIpIHtcclxuICAgICAgICAvLyBtYWtlIGEgZ3Vlc3MgYXQgdGhlIHdvcmRcclxuICAgICAgICBndWVzc1dvcmQoKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKCAoY2hhci5sZW5ndGggPT09IDEpICYmIChyZWdleHAudGVzdChjaGFyKSkpIHtcclxuICAgICAgICBjb25zdCBsY0NoYXIgPSBjaGFyLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJ2YWxpZCBpbnB1dCBcIiArIGNoYXIpO1xyXG4gICAgICAgIC8vIGNoZWNrIHRvIHNlZSB3aGV0aGVyIGxldHRlciBoYXMgYWxyZWFkeSBiZWVuIHNlbGVjdGVkXHJcbiAgICAgICAgaWYgKF8uaW5kZXhPZihsZXR0ZXJzQ2hvc2VuLGxjQ2hhcikgPiAwKSB7XHJcbiAgICAgICAgICAgIC8vIGRvbid0IHByb2Nlc3MgYW55dGhpbmcgYmVjYXVzZSBsZXR0ZXIgaGFzIGFscmVhZHkgYmVlbiBzZWxlY3RlZFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhlV29yZC5jaGVja0NoYXIobGNDaGFyKTtcclxuICAgICAgICAgICAgbGV0dGVyc0Nob3Nlbi5wdXNoKGxjQ2hhcik7XHJcbiAgICAgICAgICAgIC8vIGNoZWNrIHRvIHNlZSBpZiB3b3JkIGlzIGNvbXBsZXRlZFxyXG4gICAgICAgICAgICBpZiAodGhlV29yZC53b3JkMnN0cmluZygpLmluY2x1ZGVzKFwiX1wiKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gbm90IGNvbXBsZXRlZFxyXG4gICAgICAgICAgICAgICAgc2hvd1dvcmQoKTtcclxuICAgICAgICAgICAgICAgIHNob3dMZXR0ZXJzQ2hvc2VuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3b3JkQ29tcGxldGVkKCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBhbnkgb3RoZXIga2V5IHByZXNzZWQgZG9lcyBub3RoaW5nICBcclxufVxyXG5cclxuZnVuY3Rpb24gd29yZENvbXBsZXRlZCgpOnZvaWQge1xyXG4gICAgY29uc29sZS5sb2coXCJjb21wbGV0ZWQgd29yZFwiKTtcclxuICAgIHNob3dXb3JkKCk7XHJcbiAgICBzaG93TGV0dGVyc0Nob3NlbigpO1xyXG4gICAgY29uc29sZS5sb2coXCIgQW5vdGhlciBnYW1lID8gKFkvbilcIik7XHJcbiAgICByZWFkV29yZCA9IHRydWU7IC8vIG5vdCByZWFsbHkgcmVhZGluZyB3b3JkIGJ1dCBkaXNhYmxlcyBrZXkgZXZlbnRcclxuICAgIHRlcm0ueWVzT3JObyh7IHllczogWyd5JywgJ0VOVEVSJ10sIG5vOiBbJ24nXSB9LCBmdW5jdGlvbiAoZXJyb3IsIHJlc3VsdCkge1xyXG4gICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgcmVhZFdvcmQgPSBmYWxzZTsgLy8gcmUtZW5hYmxlZCBrZXkgZXZlbnRcclxuICAgICAgICAgICAgc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGV4aXRHYW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBcclxufVxyXG5cclxuZnVuY3Rpb24gc3RhcnQoKTp2b2lkIHtcclxuICAgIHNldHVwVGVybWluYWwoKTtcclxuICAgIGNob29zZVdvcmQoKTtcclxuICAgIC8vIGFmdGVyIHNldHVwLCBwcm9ncmFtIGlzIGRyaXZlbiBieSBrZXkgcHJlc3Nlc1xyXG59XHJcblxyXG5cclxuXHJcbi8vIHNob3dXb3JkKCk7XHJcbi8vIHNob3dMZXR0ZXJzQ2hvc2VuKCk7XHJcbi8vIGdldElucHV0KCk7XHJcblxyXG5zdGFydCgpO1xyXG5cclxuY29uc29sZS5sb2codGhlV29yZCk7XHJcbi8vIHNldCB0ZXJtaW5hbCB1cCB0byByZWFkIGtleSBwcmVzc2VzXHJcbnRlcm0uZ3JhYklucHV0KHRydWUpO1xyXG5cclxuLy8gc2V0IHdhdGNoZXIgb24ga2V5IGlucHV0XHJcbnRlcm0ub24oJ2tleScsIGZ1bmN0aW9uIChuYW1lOnN0cmluZywgbWF0Y2hlczphbnksIGRhdGE6YW55KSB7XHJcbiAgICBpZiAobmFtZSA9PT0gJ0NUUkxfQycpIHtcclxuICAgICAgICBleGl0R2FtZShcIkNvbnRyb2wgQyBwcmVzc2VkIC0gZXhpdGluZyBnYW1lXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCIna2V5JyBldmVudDpcIiArIG5hbWUgKyBcIiBtYXRjaGVzIFwiICsgbWF0Y2hlcyArIFwiIGRhdGEgXCIgKyBkYXRhKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoIXJlYWRXb3JkKSB7XHJcbiAgICAgICAgICAgIHByb2Nlc3NJbnB1dChuYW1lKTtcclxuICAgICAgICB9IFxyXG4gICAgfVxyXG59KTtcclxuXHJcblxyXG5cclxuIl19
