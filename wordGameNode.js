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
// offsets the instructions from left hand side
const xOffset = 5;
// object to hold x,y locations of inputs and outputs for use by terminal-kit
const termXY = {
    chosenLetters: { x: 25, y: 12 },
    wordSoFar: { x: 25, y: 16 },
    getWord: { x: 25, y: 20 },
    input: { x: 25, y: 18 },
    chooseAgain: { x: 25, y: 23 },
    guesses: { x: 25, y: 11 },
    title: { x: 30, y: 2 },
    instructions: { x: 5, y: 4 }
};
// can't seem to turn off the event listener so using a global variable to make it doesn't return anything
var readWord = false;
// holds the word selected by random from wordsArr
var theWord;
// array to hold the letters chosen
var lettersChosen = [];
// number of guesses and max allowed
var guesses = -1; // referenced through incGuesses function which always increments so start at -1
const maxGuesses = 10;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// functions
// randomly choose a word from wordsArr
function chooseWord() {
    let random = _.random(0, (wordsArr.length - 1));
    theWord = new Word(wordsArr[random]);
}
// clears the screen and then prints out instructions and information
function setupTerminal() {
    term.clear();
    // write information to screen
    // title
    term.moveTo(termXY.title.x, termXY.title.y);
    term.bold("Word Game");
    // instructions
    term.moveTo(termXY.instructions.x, termXY.instructions.y);
    term("Instructions:\n");
    term("         Press keys to guess letters, you have " + maxGuesses + " attempts\n");
    term("         press RETURN to guess at the word (takes up 1 attempt)\n");
    term("         press control-C to end the game at any time");
    term.moveTo(xOffset, termXY.input.y);
    term("Type letters");
    term.moveTo(xOffset, termXY.chosenLetters.y);
    term("Letters chosen ");
    term.moveTo(xOffset, termXY.wordSoFar.y);
    term("Word so far ");
    // move cursor to input position
    term.moveTo(termXY.input.x, termXY.input.y);
}
function showWord() {
    let word = theWord.word2string();
    term.moveTo(termXY.wordSoFar.x, termXY.wordSoFar.y);
    term(word);
    // want to know how many characters
    term("  (" + theWord.letterArr.length + " characters)");
    term.moveTo(termXY.input.x, termXY.input.y);
}
function showLettersChosen() {
    term.moveTo(termXY.chosenLetters.x, termXY.chosenLetters.y);
    term(lettersChosen.join(","));
    term.moveTo(termXY.input.x, termXY.input.y);
}
function exitGame(message) {
    // move down 10 lines
    term.nextLine(10);
    if (message !== undefined) {
        console.log(String(message));
    }
    // using this exit resets any strange stuff the terminal is doing
    term.processExit(0);
}
function incGuess() {
    guesses += 1;
    if (guesses > maxGuesses) {
        // too many guesses
        term.moveTo(termXY.chooseAgain.x, termXY.chooseAgain.y);
        term("Too many guesses, you lose. ");
        term(" Another game ? (Y/n)");
        readWord = true; // not really reading word but disables key event
        term.yesOrNo({ yes: ['y', 'Y', 'ENTER'], no: ['n', 'N'] }, function (error, result) {
            if (result) {
                readWord = false; // re-enabled key event
                start();
            }
            else {
                exitGame();
            }
        });
    }
    else {
        term.moveTo(termXY.guesses.x, termXY.guesses.y);
        term(guesses + "/" + maxGuesses + " guesses");
        // move cursor back to input position
        term.moveTo(termXY.input.x, termXY.input.y);
    }
}
// function to allow user to make a guess at the whole word
// this still has a BUG
function guessWord() {
    term.moveTo(xOffset, termXY.getWord.y);
    term("Guess the word ");
    term.moveTo(xOffset, termXY.getWord.y + 1);
    term("(RETURN to finish)");
    // move cursor to word input position
    term.moveTo(termXY.getWord.x, termXY.getWord.y);
    // erase what was there
    term("                                     ");
    term.moveTo(termXY.getWord.x, termXY.getWord.y);
    // term("Here " + termXY.getWord.x + "," + termXY.getWord.y);
    // term.moveTo(termXY.getWord.x, termXY.getWord.y + 5);
    // turn off the key event listener using global variable
    readWord = true;
    term.inputField({}, function (error, input) {
        if (error) {
            exitGame(term.red.str("\nAn error occurred reading input field: " + error + "\n"));
        }
        else {
            if (input === theWord.word2FullString()) {
                // guessed right
                readWord = false;
                wordCompleted();
            }
            else {
                // erase the instructions
                term.moveTo(xOffset, termXY.getWord.y);
                term("                                   ");
                term.moveTo(xOffset, termXY.getWord.y + 1);
                term("                    ");
                // BUG fix, erase the typing at the key input locations
                term.moveTo(termXY.input.x, termXY.input.y);
                term("                                ");
                // let user know what happened
                term.moveTo(termXY.getWord.x, termXY.getWord.y);
                term("Guess \"" + input + "\" was wrong                                  ");
                // move cursor back to input position
                term.moveTo(termXY.input.x, termXY.input.y);
                // let the event listener work again
                readWord = false;
            }
        }
    });
}
// function called when a key is pressed in raw mode
function processInput(char) {
    const regexp = new RegExp("[a-z]", "i");
    if (char === "ENTER") {
        // make a guess at the word
        guessWord();
        incGuess();
    }
    else if ((char.length === 1) && (regexp.test(char))) {
        const lcChar = char.toLowerCase();
        // check to see whether letter has already been selected
        if (_.indexOf(lettersChosen, lcChar) > -1) {
            // don't process anything because letter has already been selected
        }
        else {
            incGuess();
            theWord.checkChar(lcChar);
            lettersChosen.push(lcChar);
            // check to see if word is completed
            if (theWord.word2string().includes("_")) {
                // not completed
                showWord();
                showLettersChosen();
            }
            else {
                showWord();
                showLettersChosen();
                wordCompleted();
            }
        }
    }
    // any other key pressed does nothing  
}
function wordCompleted() {
    // erase guessed word
    term.moveTo(termXY.getWord.x, termXY.getWord.y);
    term("                                          ");
    term.moveTo(termXY.chooseAgain.x, termXY.chooseAgain.y);
    term("completed word \"" + theWord.word2FullString() + "\"");
    term(" Another game ? (Y/n)");
    readWord = true; // not really reading word but disables key event
    term.yesOrNo({ yes: ['y', 'Y', 'ENTER'], no: ['n', 'N'] }, function (error, result) {
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
    chooseWord();
    lettersChosen = [];
    guesses = -1; // referenced through incGuesses function which always increments so start at -1
    setupTerminal();
    showWord();
    showLettersChosen();
    incGuess(); // increments to 0 and displays number of guesses
    // after setup, program is driven by key presses
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// main program
start();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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Q2YsS0FBSyxFQUFFLENBQUM7QUFFUixzQ0FBc0M7QUFDdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUVyQiwyQkFBMkI7QUFDM0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsVUFBVSxJQUFXLEVBQUUsT0FBVyxFQUFFLElBQVE7SUFDdkQsSUFBSSxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQ25CLFFBQVEsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0tBQ2hEO1NBQ0k7UUFDRCxnRkFBZ0Y7UUFFaEYsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNYLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN0QjtLQUNKO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoid29yZEdhbWVOb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gbWFpbiBwcm9ncmFtIGZvciBub2RlIGJhc2VkIHdvcmQgZ3Vlc3NpbmcgZ2FtZVxyXG5cclxuaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCBXb3JkIGZyb20gXCIuL3dvcmRcIjtcclxuaW1wb3J0IHt0ZXJtaW5hbCBhcyB0ZXJtfSBmcm9tIFwidGVybWluYWwta2l0XCI7XHJcblxyXG5cclxuLy8gZ2xvYmFsIHZhcmlhYmxlcyBhbmQgY29uc3RhbnRzXHJcbmNvbnN0IHdvcmRzQXJyID0gW1xyXG4gICAgXCJqYXZhc2NyaXB0XCIsXHJcbiAgICBcImh0bWxcIixcclxuICAgIFwibW9uZ29cIixcclxuICAgIFwiY2hyb21lXCIsXHJcbiAgICBcIm5vZGVcIixcclxuICAgIFwiY3NzXCJcclxuXTtcclxuXHJcbi8vIG9mZnNldHMgdGhlIGluc3RydWN0aW9ucyBmcm9tIGxlZnQgaGFuZCBzaWRlXHJcbmNvbnN0IHhPZmZzZXQgPSA1O1xyXG4vLyBvYmplY3QgdG8gaG9sZCB4LHkgbG9jYXRpb25zIG9mIGlucHV0cyBhbmQgb3V0cHV0cyBmb3IgdXNlIGJ5IHRlcm1pbmFsLWtpdFxyXG5jb25zdCB0ZXJtWFkgPSB7XHJcbiAgICBjaG9zZW5MZXR0ZXJzOiB7IHg6MjUsIHk6MTJ9LFxyXG4gICAgd29yZFNvRmFyOiAgICAgeyB4OjI1LCB5OjE2fSxcclxuICAgIGdldFdvcmQ6ICAgICAgIHsgeDoyNSwgeToyMH0sXHJcbiAgICBpbnB1dDogICAgICAgICB7IHg6MjUsIHk6MTh9LFxyXG4gICAgY2hvb3NlQWdhaW46ICAgeyB4OjI1LCB5OjIzfSxcclxuICAgIGd1ZXNzZXM6ICAgICAgIHsgeDoyNSwgeToxMX0sXHJcbiAgICB0aXRsZTogICAgICAgICB7IHg6MzAsIHk6Mn0sXHJcbiAgICBpbnN0cnVjdGlvbnM6ICB7IHg6NSwgIHk6NH1cclxufTtcclxuXHJcblxyXG4vLyBjYW4ndCBzZWVtIHRvIHR1cm4gb2ZmIHRoZSBldmVudCBsaXN0ZW5lciBzbyB1c2luZyBhIGdsb2JhbCB2YXJpYWJsZSB0byBtYWtlIGl0IGRvZXNuJ3QgcmV0dXJuIGFueXRoaW5nXHJcbnZhciByZWFkV29yZCA9IGZhbHNlO1xyXG4vLyBob2xkcyB0aGUgd29yZCBzZWxlY3RlZCBieSByYW5kb20gZnJvbSB3b3Jkc0FyclxyXG52YXIgdGhlV29yZDpXb3JkO1xyXG5cclxuLy8gYXJyYXkgdG8gaG9sZCB0aGUgbGV0dGVycyBjaG9zZW5cclxudmFyIGxldHRlcnNDaG9zZW46c3RyaW5nW10gPSBbXTtcclxuXHJcbi8vIG51bWJlciBvZiBndWVzc2VzIGFuZCBtYXggYWxsb3dlZFxyXG52YXIgZ3Vlc3NlczpudW1iZXIgPSAtMTsgLy8gcmVmZXJlbmNlZCB0aHJvdWdoIGluY0d1ZXNzZXMgZnVuY3Rpb24gd2hpY2ggYWx3YXlzIGluY3JlbWVudHMgc28gc3RhcnQgYXQgLTFcclxuY29uc3QgbWF4R3Vlc3NlczpudW1iZXIgPSAxMDtcclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbi8vIGZ1bmN0aW9uc1xyXG5cclxuLy8gcmFuZG9tbHkgY2hvb3NlIGEgd29yZCBmcm9tIHdvcmRzQXJyXHJcbmZ1bmN0aW9uIGNob29zZVdvcmQgKCkge1xyXG4gICAgbGV0IHJhbmRvbSA9IF8ucmFuZG9tKDAsICh3b3Jkc0Fyci5sZW5ndGggLTEgKSk7XHJcbiAgICB0aGVXb3JkID0gbmV3IFdvcmQod29yZHNBcnJbcmFuZG9tXSk7XHJcbiAgICBcclxufVxyXG5cclxuLy8gY2xlYXJzIHRoZSBzY3JlZW4gYW5kIHRoZW4gcHJpbnRzIG91dCBpbnN0cnVjdGlvbnMgYW5kIGluZm9ybWF0aW9uXHJcbmZ1bmN0aW9uIHNldHVwVGVybWluYWwoKTp2b2lkIHtcclxuICAgIHRlcm0uY2xlYXIoKTtcclxuICAgIC8vIHdyaXRlIGluZm9ybWF0aW9uIHRvIHNjcmVlblxyXG4gICAgLy8gdGl0bGVcclxuICAgIHRlcm0ubW92ZVRvKHRlcm1YWS50aXRsZS54LCB0ZXJtWFkudGl0bGUueSk7XHJcbiAgICB0ZXJtLmJvbGQoXCJXb3JkIEdhbWVcIik7XHJcbiAgICAvLyBpbnN0cnVjdGlvbnNcclxuICAgIHRlcm0ubW92ZVRvKHRlcm1YWS5pbnN0cnVjdGlvbnMueCwgdGVybVhZLmluc3RydWN0aW9ucy55KTtcclxuICAgIHRlcm0oXCJJbnN0cnVjdGlvbnM6XFxuXCIpO1xyXG4gICAgdGVybShcIiAgICAgICAgIFByZXNzIGtleXMgdG8gZ3Vlc3MgbGV0dGVycywgeW91IGhhdmUgXCIgKyBtYXhHdWVzc2VzICsgXCIgYXR0ZW1wdHNcXG5cIik7XHJcbiAgICB0ZXJtKFwiICAgICAgICAgcHJlc3MgUkVUVVJOIHRvIGd1ZXNzIGF0IHRoZSB3b3JkICh0YWtlcyB1cCAxIGF0dGVtcHQpXFxuXCIpO1xyXG4gICAgdGVybShcIiAgICAgICAgIHByZXNzIGNvbnRyb2wtQyB0byBlbmQgdGhlIGdhbWUgYXQgYW55IHRpbWVcIik7XHJcbiAgICB0ZXJtLm1vdmVUbyh4T2Zmc2V0LHRlcm1YWS5pbnB1dC55KTtcclxuICAgIHRlcm0oXCJUeXBlIGxldHRlcnNcIik7XHJcbiAgICB0ZXJtLm1vdmVUbyh4T2Zmc2V0LCB0ZXJtWFkuY2hvc2VuTGV0dGVycy55KTtcclxuICAgIHRlcm0oXCJMZXR0ZXJzIGNob3NlbiBcIik7XHJcbiAgICB0ZXJtLm1vdmVUbyh4T2Zmc2V0LCB0ZXJtWFkud29yZFNvRmFyLnkpO1xyXG4gICAgdGVybShcIldvcmQgc28gZmFyIFwiKTtcclxuICAgIC8vIG1vdmUgY3Vyc29yIHRvIGlucHV0IHBvc2l0aW9uXHJcbiAgICB0ZXJtLm1vdmVUbyh0ZXJtWFkuaW5wdXQueCwgdGVybVhZLmlucHV0LnkpO1xyXG5cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHNob3dXb3JkKCk6dm9pZCB7XHJcbiAgICBsZXQgd29yZDpzdHJpbmcgPSB0aGVXb3JkLndvcmQyc3RyaW5nKCk7XHJcbiAgICB0ZXJtLm1vdmVUbyh0ZXJtWFkud29yZFNvRmFyLngsIHRlcm1YWS53b3JkU29GYXIueSk7XHJcbiAgICB0ZXJtKHdvcmQpO1xyXG4gICAgLy8gd2FudCB0byBrbm93IGhvdyBtYW55IGNoYXJhY3RlcnNcclxuICAgIHRlcm0oXCIgIChcIiArIHRoZVdvcmQubGV0dGVyQXJyLmxlbmd0aCArIFwiIGNoYXJhY3RlcnMpXCIpO1xyXG4gICAgdGVybS5tb3ZlVG8odGVybVhZLmlucHV0LngsIHRlcm1YWS5pbnB1dC55KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd0xldHRlcnNDaG9zZW4gKCk6dm9pZCB7XHJcbiAgICB0ZXJtLm1vdmVUbyh0ZXJtWFkuY2hvc2VuTGV0dGVycy54LCB0ZXJtWFkuY2hvc2VuTGV0dGVycy55KTtcclxuICAgIHRlcm0oIGxldHRlcnNDaG9zZW4uam9pbihcIixcIikpO1xyXG4gICAgdGVybS5tb3ZlVG8odGVybVhZLmlucHV0LngsIHRlcm1YWS5pbnB1dC55KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZXhpdEdhbWUobWVzc2FnZT86IGFueSk6IHZvaWQge1xyXG4gICAgLy8gbW92ZSBkb3duIDEwIGxpbmVzXHJcbiAgICB0ZXJtLm5leHRMaW5lKDEwKTtcclxuICAgIGlmIChtZXNzYWdlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhTdHJpbmcobWVzc2FnZSkpO1xyXG4gICAgfVxyXG4gICAgLy8gdXNpbmcgdGhpcyBleGl0IHJlc2V0cyBhbnkgc3RyYW5nZSBzdHVmZiB0aGUgdGVybWluYWwgaXMgZG9pbmdcclxuICAgIHRlcm0ucHJvY2Vzc0V4aXQoMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluY0d1ZXNzKCk6dm9pZCB7XHJcbiAgICBndWVzc2VzICs9IDE7XHJcbiAgICBpZiAoZ3Vlc3NlcyA+IG1heEd1ZXNzZXMpIHtcclxuICAgICAgICAvLyB0b28gbWFueSBndWVzc2VzXHJcbiAgICAgICAgdGVybS5tb3ZlVG8odGVybVhZLmNob29zZUFnYWluLngsIHRlcm1YWS5jaG9vc2VBZ2Fpbi55KTtcclxuICAgICAgICB0ZXJtKFwiVG9vIG1hbnkgZ3Vlc3NlcywgeW91IGxvc2UuIFwiKTtcclxuICAgICAgICB0ZXJtKFwiIEFub3RoZXIgZ2FtZSA/IChZL24pXCIpO1xyXG4gICAgICAgIHJlYWRXb3JkID0gdHJ1ZTsgLy8gbm90IHJlYWxseSByZWFkaW5nIHdvcmQgYnV0IGRpc2FibGVzIGtleSBldmVudFxyXG4gICAgICAgIHRlcm0ueWVzT3JObyh7IHllczogWyd5JywgJ1knLCAnRU5URVInXSwgbm86IFsnbicsICdOJ10gfSwgZnVuY3Rpb24gKGVycm9yLCByZXN1bHQpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmVhZFdvcmQgPSBmYWxzZTsgLy8gcmUtZW5hYmxlZCBrZXkgZXZlbnRcclxuICAgICAgICAgICAgICAgIHN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBleGl0R2FtZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB0ZXJtLm1vdmVUbyh0ZXJtWFkuZ3Vlc3Nlcy54LCB0ZXJtWFkuZ3Vlc3Nlcy55KTtcclxuICAgICAgICB0ZXJtKGd1ZXNzZXMgKyBcIi9cIiArIG1heEd1ZXNzZXMgKyBcIiBndWVzc2VzXCIpO1xyXG4gICAgICAgIC8vIG1vdmUgY3Vyc29yIGJhY2sgdG8gaW5wdXQgcG9zaXRpb25cclxuICAgICAgICB0ZXJtLm1vdmVUbyh0ZXJtWFkuaW5wdXQueCwgdGVybVhZLmlucHV0LnkpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBmdW5jdGlvbiB0byBhbGxvdyB1c2VyIHRvIG1ha2UgYSBndWVzcyBhdCB0aGUgd2hvbGUgd29yZFxyXG4vLyB0aGlzIHN0aWxsIGhhcyBhIEJVR1xyXG5mdW5jdGlvbiBndWVzc1dvcmQoKTp2b2lkIHtcclxuICAgIHRlcm0ubW92ZVRvKHhPZmZzZXQsIHRlcm1YWS5nZXRXb3JkLnkpO1xyXG4gICAgdGVybShcIkd1ZXNzIHRoZSB3b3JkIFwiKTtcclxuICAgIHRlcm0ubW92ZVRvKHhPZmZzZXQsIHRlcm1YWS5nZXRXb3JkLnkgKyAxKTtcclxuICAgIHRlcm0oXCIoUkVUVVJOIHRvIGZpbmlzaClcIik7XHJcbiAgICAvLyBtb3ZlIGN1cnNvciB0byB3b3JkIGlucHV0IHBvc2l0aW9uXHJcbiAgICB0ZXJtLm1vdmVUbyh0ZXJtWFkuZ2V0V29yZC54LCB0ZXJtWFkuZ2V0V29yZC55KTtcclxuICAgIC8vIGVyYXNlIHdoYXQgd2FzIHRoZXJlXHJcbiAgICB0ZXJtKFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiKTtcclxuICAgIHRlcm0ubW92ZVRvKHRlcm1YWS5nZXRXb3JkLngsIHRlcm1YWS5nZXRXb3JkLnkpO1xyXG4gICAgLy8gdGVybShcIkhlcmUgXCIgKyB0ZXJtWFkuZ2V0V29yZC54ICsgXCIsXCIgKyB0ZXJtWFkuZ2V0V29yZC55KTtcclxuICAgIC8vIHRlcm0ubW92ZVRvKHRlcm1YWS5nZXRXb3JkLngsIHRlcm1YWS5nZXRXb3JkLnkgKyA1KTtcclxuICAgIC8vIHR1cm4gb2ZmIHRoZSBrZXkgZXZlbnQgbGlzdGVuZXIgdXNpbmcgZ2xvYmFsIHZhcmlhYmxlXHJcbiAgICByZWFkV29yZCA9IHRydWU7XHJcbiAgICB0ZXJtLmlucHV0RmllbGQoe30sZnVuY3Rpb24gKGVycm9yOiBhbnksIGlucHV0OiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgZXhpdEdhbWUodGVybS5yZWQuc3RyKFwiXFxuQW4gZXJyb3Igb2NjdXJyZWQgcmVhZGluZyBpbnB1dCBmaWVsZDogXCIgKyBlcnJvciArIFwiXFxuXCIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmKCBpbnB1dCA9PT0gdGhlV29yZC53b3JkMkZ1bGxTdHJpbmcoKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gZ3Vlc3NlZCByaWdodFxyXG4gICAgICAgICAgICAgICAgcmVhZFdvcmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHdvcmRDb21wbGV0ZWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIGVyYXNlIHRoZSBpbnN0cnVjdGlvbnNcclxuICAgICAgICAgICAgICAgIHRlcm0ubW92ZVRvKHhPZmZzZXQsIHRlcm1YWS5nZXRXb3JkLnkpO1xyXG4gICAgICAgICAgICAgICAgdGVybShcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIpO1xyXG4gICAgICAgICAgICAgICAgdGVybS5tb3ZlVG8oeE9mZnNldCwgdGVybVhZLmdldFdvcmQueSArIDEpO1xyXG4gICAgICAgICAgICAgICAgdGVybShcIiAgICAgICAgICAgICAgICAgICAgXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gQlVHIGZpeCwgZXJhc2UgdGhlIHR5cGluZyBhdCB0aGUga2V5IGlucHV0IGxvY2F0aW9uc1xyXG4gICAgICAgICAgICAgICAgdGVybS5tb3ZlVG8odGVybVhZLmlucHV0LngsIHRlcm1YWS5pbnB1dC55KTtcclxuICAgICAgICAgICAgICAgIHRlcm0oXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiKTtcclxuICAgICAgICAgICAgICAgIC8vIGxldCB1c2VyIGtub3cgd2hhdCBoYXBwZW5lZFxyXG4gICAgICAgICAgICAgICAgdGVybS5tb3ZlVG8odGVybVhZLmdldFdvcmQueCwgdGVybVhZLmdldFdvcmQueSk7XHJcbiAgICAgICAgICAgICAgICB0ZXJtKFwiR3Vlc3MgXFxcIlwiICsgaW5wdXQgKyBcIlxcXCIgd2FzIHdyb25nICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiKTtcclxuICAgICAgICAgICAgICAgIC8vIG1vdmUgY3Vyc29yIGJhY2sgdG8gaW5wdXQgcG9zaXRpb25cclxuICAgICAgICAgICAgICAgIHRlcm0ubW92ZVRvKHRlcm1YWS5pbnB1dC54LCB0ZXJtWFkuaW5wdXQueSk7XHJcbiAgICAgICAgICAgICAgICAvLyBsZXQgdGhlIGV2ZW50IGxpc3RlbmVyIHdvcmsgYWdhaW5cclxuICAgICAgICAgICAgICAgIHJlYWRXb3JkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgICAgXHJcbiAgICB9KTtcclxufVxyXG4vLyBmdW5jdGlvbiBjYWxsZWQgd2hlbiBhIGtleSBpcyBwcmVzc2VkIGluIHJhdyBtb2RlXHJcbmZ1bmN0aW9uIHByb2Nlc3NJbnB1dCggY2hhcjpzdHJpbmcpOnZvaWQge1xyXG4gICAgY29uc3QgcmVnZXhwID0gbmV3IFJlZ0V4cChcIlthLXpdXCIsIFwiaVwiKTtcclxuICAgIGlmICggY2hhciA9PT0gXCJFTlRFUlwiKSB7XHJcbiAgICAgICAgLy8gbWFrZSBhIGd1ZXNzIGF0IHRoZSB3b3JkXHJcbiAgICAgICAgZ3Vlc3NXb3JkKCk7XHJcbiAgICAgICAgaW5jR3Vlc3MoKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKCAoY2hhci5sZW5ndGggPT09IDEpICYmIChyZWdleHAudGVzdChjaGFyKSkpIHtcclxuICAgICAgICBjb25zdCBsY0NoYXIgPSBjaGFyLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgLy8gY2hlY2sgdG8gc2VlIHdoZXRoZXIgbGV0dGVyIGhhcyBhbHJlYWR5IGJlZW4gc2VsZWN0ZWRcclxuICAgICAgICBpZiAoXy5pbmRleE9mKGxldHRlcnNDaG9zZW4sbGNDaGFyKSA+IC0xKSB7XHJcbiAgICAgICAgICAgIC8vIGRvbid0IHByb2Nlc3MgYW55dGhpbmcgYmVjYXVzZSBsZXR0ZXIgaGFzIGFscmVhZHkgYmVlbiBzZWxlY3RlZFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaW5jR3Vlc3MoKTtcclxuICAgICAgICAgICAgdGhlV29yZC5jaGVja0NoYXIobGNDaGFyKTtcclxuICAgICAgICAgICAgbGV0dGVyc0Nob3Nlbi5wdXNoKGxjQ2hhcik7XHJcbiAgICAgICAgICAgIC8vIGNoZWNrIHRvIHNlZSBpZiB3b3JkIGlzIGNvbXBsZXRlZFxyXG4gICAgICAgICAgICBpZiAodGhlV29yZC53b3JkMnN0cmluZygpLmluY2x1ZGVzKFwiX1wiKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gbm90IGNvbXBsZXRlZFxyXG4gICAgICAgICAgICAgICAgc2hvd1dvcmQoKTtcclxuICAgICAgICAgICAgICAgIHNob3dMZXR0ZXJzQ2hvc2VuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzaG93V29yZCgpO1xyXG4gICAgICAgICAgICAgICAgc2hvd0xldHRlcnNDaG9zZW4oKTtcclxuICAgICAgICAgICAgICAgIHdvcmRDb21wbGV0ZWQoKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIGFueSBvdGhlciBrZXkgcHJlc3NlZCBkb2VzIG5vdGhpbmcgIFxyXG59XHJcblxyXG5mdW5jdGlvbiB3b3JkQ29tcGxldGVkKCk6dm9pZCB7XHJcbiAgICAvLyBlcmFzZSBndWVzc2VkIHdvcmRcclxuICAgIHRlcm0ubW92ZVRvKHRlcm1YWS5nZXRXb3JkLngsIHRlcm1YWS5nZXRXb3JkLnkpO1xyXG4gICAgdGVybShcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiKTtcclxuICAgIHRlcm0ubW92ZVRvKHRlcm1YWS5jaG9vc2VBZ2Fpbi54LCB0ZXJtWFkuY2hvb3NlQWdhaW4ueSk7XHJcbiAgICB0ZXJtKFwiY29tcGxldGVkIHdvcmQgXFxcIlwiKyB0aGVXb3JkLndvcmQyRnVsbFN0cmluZygpICsgXCJcXFwiXCIpO1xyXG4gICAgdGVybShcIiBBbm90aGVyIGdhbWUgPyAoWS9uKVwiKTtcclxuICAgIHJlYWRXb3JkID0gdHJ1ZTsgLy8gbm90IHJlYWxseSByZWFkaW5nIHdvcmQgYnV0IGRpc2FibGVzIGtleSBldmVudFxyXG4gICAgdGVybS55ZXNPck5vKHsgeWVzOiBbJ3knLCAnWScsJ0VOVEVSJ10sIG5vOiBbJ24nLCAnTiddIH0sIGZ1bmN0aW9uIChlcnJvciwgcmVzdWx0KSB7XHJcbiAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICByZWFkV29yZCA9IGZhbHNlOyAvLyByZS1lbmFibGVkIGtleSBldmVudFxyXG4gICAgICAgICAgICBzdGFydCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZXhpdEdhbWUoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIFxyXG59XHJcblxyXG5mdW5jdGlvbiBzdGFydCgpOnZvaWQgeyAgXHJcbiAgICBjaG9vc2VXb3JkKCk7XHJcbiAgICBsZXR0ZXJzQ2hvc2VuID0gW107XHJcbiAgICBndWVzc2VzID0gLTE7IC8vIHJlZmVyZW5jZWQgdGhyb3VnaCBpbmNHdWVzc2VzIGZ1bmN0aW9uIHdoaWNoIGFsd2F5cyBpbmNyZW1lbnRzIHNvIHN0YXJ0IGF0IC0xXHJcbiAgICBzZXR1cFRlcm1pbmFsKCk7XHJcbiAgICBzaG93V29yZCgpO1xyXG4gICAgc2hvd0xldHRlcnNDaG9zZW4oKTtcclxuICAgIGluY0d1ZXNzKCk7IC8vIGluY3JlbWVudHMgdG8gMCBhbmQgZGlzcGxheXMgbnVtYmVyIG9mIGd1ZXNzZXNcclxuXHJcbiAgICAvLyBhZnRlciBzZXR1cCwgcHJvZ3JhbSBpcyBkcml2ZW4gYnkga2V5IHByZXNzZXNcclxufVxyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy8gbWFpbiBwcm9ncmFtXHJcbnN0YXJ0KCk7XHJcblxyXG4vLyBzZXQgdGVybWluYWwgdXAgdG8gcmVhZCBrZXkgcHJlc3Nlc1xyXG50ZXJtLmdyYWJJbnB1dCh0cnVlKTtcclxuXHJcbi8vIHNldCB3YXRjaGVyIG9uIGtleSBpbnB1dFxyXG50ZXJtLm9uKCdrZXknLCBmdW5jdGlvbiAobmFtZTpzdHJpbmcsIG1hdGNoZXM6YW55LCBkYXRhOmFueSkge1xyXG4gICAgaWYgKG5hbWUgPT09ICdDVFJMX0MnKSB7XHJcbiAgICAgICAgZXhpdEdhbWUoXCJDb250cm9sIEMgcHJlc3NlZCAtIGV4aXRpbmcgZ2FtZVwiKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiJ2tleScgZXZlbnQ6XCIgKyBuYW1lICsgXCIgbWF0Y2hlcyBcIiArIG1hdGNoZXMgKyBcIiBkYXRhIFwiICsgZGF0YSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCFyZWFkV29yZCkge1xyXG4gICAgICAgICAgICBwcm9jZXNzSW5wdXQobmFtZSk7XHJcbiAgICAgICAgfSBcclxuICAgIH1cclxufSk7XHJcblxyXG5cclxuXHJcbiJdfQ==
