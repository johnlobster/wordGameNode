"use strict";
// main program for node based word guessing game
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = __importStar(require("lodash"));
var word_1 = __importDefault(require("./word"));
var terminal_kit_1 = require("terminal-kit");
// global variables and constants
var wordsArr = [
    "javascript",
    "html",
    "mongo",
    "chrome",
    "node",
    "css"
];
// offsets the instructions from left hand side
var xOffset = 5;
// object to hold x,y locations of inputs and outputs for use by terminal-kit
var termXY = {
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
var maxGuesses = 10;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// functions
// randomly choose a word from wordsArr
function chooseWord() {
    var random = _.random(0, (wordsArr.length - 1));
    theWord = new word_1.default(wordsArr[random]);
}
// clears the screen and then prints out instructions and information
function setupTerminal() {
    terminal_kit_1.terminal.clear();
    // write information to screen
    // title
    terminal_kit_1.terminal.moveTo(termXY.title.x, termXY.title.y);
    terminal_kit_1.terminal.bold("Word Game");
    // instructions
    terminal_kit_1.terminal.moveTo(termXY.instructions.x, termXY.instructions.y);
    terminal_kit_1.terminal("Instructions:\n");
    terminal_kit_1.terminal("         Press keys to guess letters, you have " + maxGuesses + " attempts\n");
    terminal_kit_1.terminal("         press RETURN to guess at the word (takes up 1 attempt)\n");
    terminal_kit_1.terminal("         press control-C to end the game at any time");
    terminal_kit_1.terminal.moveTo(xOffset, termXY.input.y);
    terminal_kit_1.terminal("Type letters");
    terminal_kit_1.terminal.moveTo(xOffset, termXY.chosenLetters.y);
    terminal_kit_1.terminal("Letters chosen ");
    terminal_kit_1.terminal.moveTo(xOffset, termXY.wordSoFar.y);
    terminal_kit_1.terminal("Word so far ");
    // move cursor to input position
    terminal_kit_1.terminal.moveTo(termXY.input.x, termXY.input.y);
}
function showWord() {
    var word = theWord.word2string();
    terminal_kit_1.terminal.moveTo(termXY.wordSoFar.x, termXY.wordSoFar.y);
    terminal_kit_1.terminal(word);
    // want to know how many characters
    terminal_kit_1.terminal("  (" + theWord.letterArr.length + " characters)");
    terminal_kit_1.terminal.moveTo(termXY.input.x, termXY.input.y);
}
function showLettersChosen() {
    terminal_kit_1.terminal.moveTo(termXY.chosenLetters.x, termXY.chosenLetters.y);
    terminal_kit_1.terminal(lettersChosen.join(","));
    terminal_kit_1.terminal.moveTo(termXY.input.x, termXY.input.y);
}
function exitGame(message) {
    // move down 10 lines
    terminal_kit_1.terminal.nextLine(10);
    if (message !== undefined) {
        console.log(String(message));
    }
    // using this exit resets any strange stuff the terminal is doing
    terminal_kit_1.terminal.processExit(0);
}
function incGuess() {
    guesses += 1;
    if (guesses > maxGuesses) {
        // too many guesses
        terminal_kit_1.terminal.moveTo(termXY.chooseAgain.x, termXY.chooseAgain.y);
        terminal_kit_1.terminal("Too many guesses, you lose. ");
        terminal_kit_1.terminal(" Another game ? (Y/n)");
        readWord = true; // not really reading word but disables key event
        terminal_kit_1.terminal.yesOrNo({ yes: ['y', 'Y', 'ENTER'], no: ['n', 'N'] }, function (error, result) {
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
        terminal_kit_1.terminal.moveTo(termXY.guesses.x, termXY.guesses.y);
        terminal_kit_1.terminal(guesses + "/" + maxGuesses + " guesses");
        // move cursor back to input position
        terminal_kit_1.terminal.moveTo(termXY.input.x, termXY.input.y);
    }
}
// function to allow user to make a guess at the whole word
// this still has a BUG
function guessWord() {
    terminal_kit_1.terminal.moveTo(xOffset, termXY.getWord.y);
    terminal_kit_1.terminal("Guess the word ");
    terminal_kit_1.terminal.moveTo(xOffset, termXY.getWord.y + 1);
    terminal_kit_1.terminal("(RETURN to finish)");
    // move cursor to word input position
    terminal_kit_1.terminal.moveTo(termXY.getWord.x, termXY.getWord.y);
    // erase what was there
    terminal_kit_1.terminal("                                     ");
    debugger;
    terminal_kit_1.terminal.moveTo(termXY.getWord.x, termXY.getWord.y);
    // term("Here " + termXY.getWord.x + "," + termXY.getWord.y);
    // term.moveTo(termXY.getWord.x, termXY.getWord.y + 5);
    // turn off the key event listener using global variable
    readWord = true;
    terminal_kit_1.terminal.inputField({}, function (error, input) {
        if (error) {
            exitGame(terminal_kit_1.terminal.red.str("\nAn error occurred reading input field: " + error + "\n"));
        }
        else {
            if (input === theWord.word2FullString()) {
                // guessed right
                readWord = false;
                wordCompleted();
            }
            else {
                // erase the instructions
                terminal_kit_1.terminal.moveTo(xOffset, termXY.getWord.y);
                terminal_kit_1.terminal("                                   ");
                terminal_kit_1.terminal.moveTo(xOffset, termXY.getWord.y + 1);
                terminal_kit_1.terminal("                    ");
                // BUG fix, erase the typing at the key input locations
                terminal_kit_1.terminal.moveTo(termXY.input.x, termXY.input.y);
                terminal_kit_1.terminal("                                ");
                // let user know what happened
                terminal_kit_1.terminal.moveTo(termXY.getWord.x, termXY.getWord.y);
                terminal_kit_1.terminal("Guess \"" + input + "\" was wrong                                  ");
                // move cursor back to input position
                terminal_kit_1.terminal.moveTo(termXY.input.x, termXY.input.y);
                // let the event listener work again
                readWord = false;
            }
        }
    });
}
// function called when a key is pressed in raw mode
function processInput(char) {
    var regexp = new RegExp("[a-z]", "i");
    if (char === "ENTER") {
        // make a guess at the word
        guessWord();
        incGuess();
    }
    else if ((char.length === 1) && (regexp.test(char))) {
        var lcChar = char.toLowerCase();
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
    terminal_kit_1.terminal.moveTo(termXY.getWord.x, termXY.getWord.y);
    terminal_kit_1.terminal("                                          ");
    terminal_kit_1.terminal.moveTo(termXY.chooseAgain.x, termXY.chooseAgain.y);
    terminal_kit_1.terminal("completed word \"" + theWord.word2FullString() + "\"");
    terminal_kit_1.terminal(" Another game ? (Y/n)");
    readWord = true; // not really reading word but disables key event
    terminal_kit_1.terminal.yesOrNo({ yes: ['y', 'Y', 'ENTER'], no: ['n', 'N'] }, function (error, result) {
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
terminal_kit_1.terminal.grabInput(true);
// set watcher on key input
terminal_kit_1.terminal.on('key', function (name, matches, data) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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O0FBQ2YsS0FBSyxFQUFFLENBQUM7QUFFUixzQ0FBc0M7QUFDdEMsdUJBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFckIsMkJBQTJCO0FBQzNCLHVCQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxVQUFVLElBQVcsRUFBRSxPQUFXLEVBQUUsSUFBUTtJQUN2RCxJQUFJLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDbkIsUUFBUSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7S0FDaEQ7U0FDSTtRQUNELGdGQUFnRjtRQUVoRixJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ1gsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3RCO0tBQ0o7QUFDTCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJ3b3JkR2FtZU5vZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBtYWluIHByb2dyYW0gZm9yIG5vZGUgYmFzZWQgd29yZCBndWVzc2luZyBnYW1lXG5cbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xuaW1wb3J0IFdvcmQgZnJvbSBcIi4vd29yZFwiO1xuaW1wb3J0IHt0ZXJtaW5hbCBhcyB0ZXJtfSBmcm9tIFwidGVybWluYWwta2l0XCI7XG5cblxuLy8gZ2xvYmFsIHZhcmlhYmxlcyBhbmQgY29uc3RhbnRzXG5jb25zdCB3b3Jkc0FyciA9IFtcbiAgICBcImphdmFzY3JpcHRcIixcbiAgICBcImh0bWxcIixcbiAgICBcIm1vbmdvXCIsXG4gICAgXCJjaHJvbWVcIixcbiAgICBcIm5vZGVcIixcbiAgICBcImNzc1wiXG5dO1xuXG4vLyBvZmZzZXRzIHRoZSBpbnN0cnVjdGlvbnMgZnJvbSBsZWZ0IGhhbmQgc2lkZVxuY29uc3QgeE9mZnNldCA9IDU7XG4vLyBvYmplY3QgdG8gaG9sZCB4LHkgbG9jYXRpb25zIG9mIGlucHV0cyBhbmQgb3V0cHV0cyBmb3IgdXNlIGJ5IHRlcm1pbmFsLWtpdFxuY29uc3QgdGVybVhZID0ge1xuICAgIGNob3NlbkxldHRlcnM6IHsgeDoyNSwgeToxMn0sXG4gICAgd29yZFNvRmFyOiAgICAgeyB4OjI1LCB5OjE2fSxcbiAgICBnZXRXb3JkOiAgICAgICB7IHg6MjUsIHk6MjB9LFxuICAgIGlucHV0OiAgICAgICAgIHsgeDoyNSwgeToxOH0sXG4gICAgY2hvb3NlQWdhaW46ICAgeyB4OjI1LCB5OjIzfSxcbiAgICBndWVzc2VzOiAgICAgICB7IHg6MjUsIHk6MTF9LFxuICAgIHRpdGxlOiAgICAgICAgIHsgeDozMCwgeToyfSxcbiAgICBpbnN0cnVjdGlvbnM6ICB7IHg6NSwgIHk6NH1cbn07XG5cblxuLy8gY2FuJ3Qgc2VlbSB0byB0dXJuIG9mZiB0aGUgZXZlbnQgbGlzdGVuZXIgc28gdXNpbmcgYSBnbG9iYWwgdmFyaWFibGUgdG8gbWFrZSBpdCBkb2Vzbid0IHJldHVybiBhbnl0aGluZ1xudmFyIHJlYWRXb3JkID0gZmFsc2U7XG4vLyBob2xkcyB0aGUgd29yZCBzZWxlY3RlZCBieSByYW5kb20gZnJvbSB3b3Jkc0FyclxudmFyIHRoZVdvcmQ6V29yZDtcblxuLy8gYXJyYXkgdG8gaG9sZCB0aGUgbGV0dGVycyBjaG9zZW5cbnZhciBsZXR0ZXJzQ2hvc2VuOnN0cmluZ1tdID0gW107XG5cbi8vIG51bWJlciBvZiBndWVzc2VzIGFuZCBtYXggYWxsb3dlZFxudmFyIGd1ZXNzZXM6bnVtYmVyID0gLTE7IC8vIHJlZmVyZW5jZWQgdGhyb3VnaCBpbmNHdWVzc2VzIGZ1bmN0aW9uIHdoaWNoIGFsd2F5cyBpbmNyZW1lbnRzIHNvIHN0YXJ0IGF0IC0xXG5jb25zdCBtYXhHdWVzc2VzOm51bWJlciA9IDEwO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gZnVuY3Rpb25zXG5cbi8vIHJhbmRvbWx5IGNob29zZSBhIHdvcmQgZnJvbSB3b3Jkc0FyclxuZnVuY3Rpb24gY2hvb3NlV29yZCAoKSB7XG4gICAgbGV0IHJhbmRvbSA9IF8ucmFuZG9tKDAsICh3b3Jkc0Fyci5sZW5ndGggLTEgKSk7XG4gICAgdGhlV29yZCA9IG5ldyBXb3JkKHdvcmRzQXJyW3JhbmRvbV0pO1xuICAgIFxufVxuXG4vLyBjbGVhcnMgdGhlIHNjcmVlbiBhbmQgdGhlbiBwcmludHMgb3V0IGluc3RydWN0aW9ucyBhbmQgaW5mb3JtYXRpb25cbmZ1bmN0aW9uIHNldHVwVGVybWluYWwoKTp2b2lkIHtcbiAgICB0ZXJtLmNsZWFyKCk7XG4gICAgLy8gd3JpdGUgaW5mb3JtYXRpb24gdG8gc2NyZWVuXG4gICAgLy8gdGl0bGVcbiAgICB0ZXJtLm1vdmVUbyh0ZXJtWFkudGl0bGUueCwgdGVybVhZLnRpdGxlLnkpO1xuICAgIHRlcm0uYm9sZChcIldvcmQgR2FtZVwiKTtcbiAgICAvLyBpbnN0cnVjdGlvbnNcbiAgICB0ZXJtLm1vdmVUbyh0ZXJtWFkuaW5zdHJ1Y3Rpb25zLngsIHRlcm1YWS5pbnN0cnVjdGlvbnMueSk7XG4gICAgdGVybShcIkluc3RydWN0aW9uczpcXG5cIik7XG4gICAgdGVybShcIiAgICAgICAgIFByZXNzIGtleXMgdG8gZ3Vlc3MgbGV0dGVycywgeW91IGhhdmUgXCIgKyBtYXhHdWVzc2VzICsgXCIgYXR0ZW1wdHNcXG5cIik7XG4gICAgdGVybShcIiAgICAgICAgIHByZXNzIFJFVFVSTiB0byBndWVzcyBhdCB0aGUgd29yZCAodGFrZXMgdXAgMSBhdHRlbXB0KVxcblwiKTtcbiAgICB0ZXJtKFwiICAgICAgICAgcHJlc3MgY29udHJvbC1DIHRvIGVuZCB0aGUgZ2FtZSBhdCBhbnkgdGltZVwiKTtcbiAgICB0ZXJtLm1vdmVUbyh4T2Zmc2V0LHRlcm1YWS5pbnB1dC55KTtcbiAgICB0ZXJtKFwiVHlwZSBsZXR0ZXJzXCIpO1xuICAgIHRlcm0ubW92ZVRvKHhPZmZzZXQsIHRlcm1YWS5jaG9zZW5MZXR0ZXJzLnkpO1xuICAgIHRlcm0oXCJMZXR0ZXJzIGNob3NlbiBcIik7XG4gICAgdGVybS5tb3ZlVG8oeE9mZnNldCwgdGVybVhZLndvcmRTb0Zhci55KTtcbiAgICB0ZXJtKFwiV29yZCBzbyBmYXIgXCIpO1xuICAgIC8vIG1vdmUgY3Vyc29yIHRvIGlucHV0IHBvc2l0aW9uXG4gICAgdGVybS5tb3ZlVG8odGVybVhZLmlucHV0LngsIHRlcm1YWS5pbnB1dC55KTtcblxufVxuXG5cbmZ1bmN0aW9uIHNob3dXb3JkKCk6dm9pZCB7XG4gICAgbGV0IHdvcmQ6c3RyaW5nID0gdGhlV29yZC53b3JkMnN0cmluZygpO1xuICAgIHRlcm0ubW92ZVRvKHRlcm1YWS53b3JkU29GYXIueCwgdGVybVhZLndvcmRTb0Zhci55KTtcbiAgICB0ZXJtKHdvcmQpO1xuICAgIC8vIHdhbnQgdG8ga25vdyBob3cgbWFueSBjaGFyYWN0ZXJzXG4gICAgdGVybShcIiAgKFwiICsgdGhlV29yZC5sZXR0ZXJBcnIubGVuZ3RoICsgXCIgY2hhcmFjdGVycylcIik7XG4gICAgdGVybS5tb3ZlVG8odGVybVhZLmlucHV0LngsIHRlcm1YWS5pbnB1dC55KTtcbn1cblxuZnVuY3Rpb24gc2hvd0xldHRlcnNDaG9zZW4gKCk6dm9pZCB7XG4gICAgdGVybS5tb3ZlVG8odGVybVhZLmNob3NlbkxldHRlcnMueCwgdGVybVhZLmNob3NlbkxldHRlcnMueSk7XG4gICAgdGVybSggbGV0dGVyc0Nob3Nlbi5qb2luKFwiLFwiKSk7XG4gICAgdGVybS5tb3ZlVG8odGVybVhZLmlucHV0LngsIHRlcm1YWS5pbnB1dC55KTtcbn1cblxuZnVuY3Rpb24gZXhpdEdhbWUobWVzc2FnZT86IGFueSk6IHZvaWQge1xuICAgIC8vIG1vdmUgZG93biAxMCBsaW5lc1xuICAgIHRlcm0ubmV4dExpbmUoMTApO1xuICAgIGlmIChtZXNzYWdlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc29sZS5sb2coU3RyaW5nKG1lc3NhZ2UpKTtcbiAgICB9XG4gICAgLy8gdXNpbmcgdGhpcyBleGl0IHJlc2V0cyBhbnkgc3RyYW5nZSBzdHVmZiB0aGUgdGVybWluYWwgaXMgZG9pbmdcbiAgICB0ZXJtLnByb2Nlc3NFeGl0KDApO1xufVxuXG5mdW5jdGlvbiBpbmNHdWVzcygpOnZvaWQge1xuICAgIGd1ZXNzZXMgKz0gMTtcbiAgICBpZiAoZ3Vlc3NlcyA+IG1heEd1ZXNzZXMpIHtcbiAgICAgICAgLy8gdG9vIG1hbnkgZ3Vlc3Nlc1xuICAgICAgICB0ZXJtLm1vdmVUbyh0ZXJtWFkuY2hvb3NlQWdhaW4ueCwgdGVybVhZLmNob29zZUFnYWluLnkpO1xuICAgICAgICB0ZXJtKFwiVG9vIG1hbnkgZ3Vlc3NlcywgeW91IGxvc2UuIFwiKTtcbiAgICAgICAgdGVybShcIiBBbm90aGVyIGdhbWUgPyAoWS9uKVwiKTtcbiAgICAgICAgcmVhZFdvcmQgPSB0cnVlOyAvLyBub3QgcmVhbGx5IHJlYWRpbmcgd29yZCBidXQgZGlzYWJsZXMga2V5IGV2ZW50XG4gICAgICAgIHRlcm0ueWVzT3JObyh7IHllczogWyd5JywgJ1knLCAnRU5URVInXSwgbm86IFsnbicsICdOJ10gfSwgZnVuY3Rpb24gKGVycm9yLCByZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZWFkV29yZCA9IGZhbHNlOyAvLyByZS1lbmFibGVkIGtleSBldmVudFxuICAgICAgICAgICAgICAgIHN0YXJ0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBleGl0R2FtZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRlcm0ubW92ZVRvKHRlcm1YWS5ndWVzc2VzLngsIHRlcm1YWS5ndWVzc2VzLnkpO1xuICAgICAgICB0ZXJtKGd1ZXNzZXMgKyBcIi9cIiArIG1heEd1ZXNzZXMgKyBcIiBndWVzc2VzXCIpO1xuICAgICAgICAvLyBtb3ZlIGN1cnNvciBiYWNrIHRvIGlucHV0IHBvc2l0aW9uXG4gICAgICAgIHRlcm0ubW92ZVRvKHRlcm1YWS5pbnB1dC54LCB0ZXJtWFkuaW5wdXQueSk7XG4gICAgICAgIFxuICAgIH1cbn1cblxuLy8gZnVuY3Rpb24gdG8gYWxsb3cgdXNlciB0byBtYWtlIGEgZ3Vlc3MgYXQgdGhlIHdob2xlIHdvcmRcbi8vIHRoaXMgc3RpbGwgaGFzIGEgQlVHXG5mdW5jdGlvbiBndWVzc1dvcmQoKTp2b2lkIHtcbiAgICB0ZXJtLm1vdmVUbyh4T2Zmc2V0LCB0ZXJtWFkuZ2V0V29yZC55KTtcbiAgICB0ZXJtKFwiR3Vlc3MgdGhlIHdvcmQgXCIpO1xuICAgIHRlcm0ubW92ZVRvKHhPZmZzZXQsIHRlcm1YWS5nZXRXb3JkLnkgKyAxKTtcbiAgICB0ZXJtKFwiKFJFVFVSTiB0byBmaW5pc2gpXCIpO1xuICAgIC8vIG1vdmUgY3Vyc29yIHRvIHdvcmQgaW5wdXQgcG9zaXRpb25cbiAgICB0ZXJtLm1vdmVUbyh0ZXJtWFkuZ2V0V29yZC54LCB0ZXJtWFkuZ2V0V29yZC55KTtcbiAgICAvLyBlcmFzZSB3aGF0IHdhcyB0aGVyZVxuICAgIHRlcm0oXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIpO1xuICAgIGRlYnVnZ2VyO1xuICAgIHRlcm0ubW92ZVRvKHRlcm1YWS5nZXRXb3JkLngsIHRlcm1YWS5nZXRXb3JkLnkpO1xuICAgIC8vIHRlcm0oXCJIZXJlIFwiICsgdGVybVhZLmdldFdvcmQueCArIFwiLFwiICsgdGVybVhZLmdldFdvcmQueSk7XG4gICAgLy8gdGVybS5tb3ZlVG8odGVybVhZLmdldFdvcmQueCwgdGVybVhZLmdldFdvcmQueSArIDUpO1xuICAgIC8vIHR1cm4gb2ZmIHRoZSBrZXkgZXZlbnQgbGlzdGVuZXIgdXNpbmcgZ2xvYmFsIHZhcmlhYmxlXG4gICAgcmVhZFdvcmQgPSB0cnVlO1xuICAgIHRlcm0uaW5wdXRGaWVsZCh7fSxmdW5jdGlvbiAoZXJyb3I6IGFueSwgaW5wdXQ6IHN0cmluZykge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGV4aXRHYW1lKHRlcm0ucmVkLnN0cihcIlxcbkFuIGVycm9yIG9jY3VycmVkIHJlYWRpbmcgaW5wdXQgZmllbGQ6IFwiICsgZXJyb3IgKyBcIlxcblwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiggaW5wdXQgPT09IHRoZVdvcmQud29yZDJGdWxsU3RyaW5nKCkpIHtcbiAgICAgICAgICAgICAgICAvLyBndWVzc2VkIHJpZ2h0XG4gICAgICAgICAgICAgICAgcmVhZFdvcmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB3b3JkQ29tcGxldGVkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBlcmFzZSB0aGUgaW5zdHJ1Y3Rpb25zXG4gICAgICAgICAgICAgICAgdGVybS5tb3ZlVG8oeE9mZnNldCwgdGVybVhZLmdldFdvcmQueSk7XG4gICAgICAgICAgICAgICAgdGVybShcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgIHRlcm0ubW92ZVRvKHhPZmZzZXQsIHRlcm1YWS5nZXRXb3JkLnkgKyAxKTtcbiAgICAgICAgICAgICAgICB0ZXJtKFwiICAgICAgICAgICAgICAgICAgICBcIik7XG4gICAgICAgICAgICAgICAgLy8gQlVHIGZpeCwgZXJhc2UgdGhlIHR5cGluZyBhdCB0aGUga2V5IGlucHV0IGxvY2F0aW9uc1xuICAgICAgICAgICAgICAgIHRlcm0ubW92ZVRvKHRlcm1YWS5pbnB1dC54LCB0ZXJtWFkuaW5wdXQueSk7XG4gICAgICAgICAgICAgICAgdGVybShcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgIC8vIGxldCB1c2VyIGtub3cgd2hhdCBoYXBwZW5lZFxuICAgICAgICAgICAgICAgIHRlcm0ubW92ZVRvKHRlcm1YWS5nZXRXb3JkLngsIHRlcm1YWS5nZXRXb3JkLnkpO1xuICAgICAgICAgICAgICAgIHRlcm0oXCJHdWVzcyBcXFwiXCIgKyBpbnB1dCArIFwiXFxcIiB3YXMgd3JvbmcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgIC8vIG1vdmUgY3Vyc29yIGJhY2sgdG8gaW5wdXQgcG9zaXRpb25cbiAgICAgICAgICAgICAgICB0ZXJtLm1vdmVUbyh0ZXJtWFkuaW5wdXQueCwgdGVybVhZLmlucHV0LnkpO1xuICAgICAgICAgICAgICAgIC8vIGxldCB0aGUgZXZlbnQgbGlzdGVuZXIgd29yayBhZ2FpblxuICAgICAgICAgICAgICAgIHJlYWRXb3JkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gICAgICBcbiAgICB9KTtcbn1cbi8vIGZ1bmN0aW9uIGNhbGxlZCB3aGVuIGEga2V5IGlzIHByZXNzZWQgaW4gcmF3IG1vZGVcbmZ1bmN0aW9uIHByb2Nlc3NJbnB1dCggY2hhcjpzdHJpbmcpOnZvaWQge1xuICAgIGNvbnN0IHJlZ2V4cCA9IG5ldyBSZWdFeHAoXCJbYS16XVwiLCBcImlcIik7XG4gICAgaWYgKCBjaGFyID09PSBcIkVOVEVSXCIpIHtcbiAgICAgICAgLy8gbWFrZSBhIGd1ZXNzIGF0IHRoZSB3b3JkXG4gICAgICAgIGd1ZXNzV29yZCgpO1xuICAgICAgICBpbmNHdWVzcygpO1xuICAgIH1cbiAgICBlbHNlIGlmICggKGNoYXIubGVuZ3RoID09PSAxKSAmJiAocmVnZXhwLnRlc3QoY2hhcikpKSB7XG4gICAgICAgIGNvbnN0IGxjQ2hhciA9IGNoYXIudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgLy8gY2hlY2sgdG8gc2VlIHdoZXRoZXIgbGV0dGVyIGhhcyBhbHJlYWR5IGJlZW4gc2VsZWN0ZWRcbiAgICAgICAgaWYgKF8uaW5kZXhPZihsZXR0ZXJzQ2hvc2VuLGxjQ2hhcikgPiAtMSkge1xuICAgICAgICAgICAgLy8gZG9uJ3QgcHJvY2VzcyBhbnl0aGluZyBiZWNhdXNlIGxldHRlciBoYXMgYWxyZWFkeSBiZWVuIHNlbGVjdGVkXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpbmNHdWVzcygpO1xuICAgICAgICAgICAgdGhlV29yZC5jaGVja0NoYXIobGNDaGFyKTtcbiAgICAgICAgICAgIGxldHRlcnNDaG9zZW4ucHVzaChsY0NoYXIpO1xuICAgICAgICAgICAgLy8gY2hlY2sgdG8gc2VlIGlmIHdvcmQgaXMgY29tcGxldGVkXG4gICAgICAgICAgICBpZiAodGhlV29yZC53b3JkMnN0cmluZygpLmluY2x1ZGVzKFwiX1wiKSkge1xuICAgICAgICAgICAgICAgIC8vIG5vdCBjb21wbGV0ZWRcbiAgICAgICAgICAgICAgICBzaG93V29yZCgpO1xuICAgICAgICAgICAgICAgIHNob3dMZXR0ZXJzQ2hvc2VuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzaG93V29yZCgpO1xuICAgICAgICAgICAgICAgIHNob3dMZXR0ZXJzQ2hvc2VuKCk7XG4gICAgICAgICAgICAgICAgd29yZENvbXBsZXRlZCgpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gYW55IG90aGVyIGtleSBwcmVzc2VkIGRvZXMgbm90aGluZyAgXG59XG5cbmZ1bmN0aW9uIHdvcmRDb21wbGV0ZWQoKTp2b2lkIHtcbiAgICAvLyBlcmFzZSBndWVzc2VkIHdvcmRcbiAgICB0ZXJtLm1vdmVUbyh0ZXJtWFkuZ2V0V29yZC54LCB0ZXJtWFkuZ2V0V29yZC55KTtcbiAgICB0ZXJtKFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIpO1xuICAgIHRlcm0ubW92ZVRvKHRlcm1YWS5jaG9vc2VBZ2Fpbi54LCB0ZXJtWFkuY2hvb3NlQWdhaW4ueSk7XG4gICAgdGVybShcImNvbXBsZXRlZCB3b3JkIFxcXCJcIisgdGhlV29yZC53b3JkMkZ1bGxTdHJpbmcoKSArIFwiXFxcIlwiKTtcbiAgICB0ZXJtKFwiIEFub3RoZXIgZ2FtZSA/IChZL24pXCIpO1xuICAgIHJlYWRXb3JkID0gdHJ1ZTsgLy8gbm90IHJlYWxseSByZWFkaW5nIHdvcmQgYnV0IGRpc2FibGVzIGtleSBldmVudFxuICAgIHRlcm0ueWVzT3JObyh7IHllczogWyd5JywgJ1knLCdFTlRFUiddLCBubzogWyduJywgJ04nXSB9LCBmdW5jdGlvbiAoZXJyb3IsIHJlc3VsdCkge1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICByZWFkV29yZCA9IGZhbHNlOyAvLyByZS1lbmFibGVkIGtleSBldmVudFxuICAgICAgICAgICAgc3RhcnQoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGV4aXRHYW1lKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbn1cblxuZnVuY3Rpb24gc3RhcnQoKTp2b2lkIHsgIFxuICAgIGNob29zZVdvcmQoKTtcbiAgICBsZXR0ZXJzQ2hvc2VuID0gW107XG4gICAgZ3Vlc3NlcyA9IC0xOyAvLyByZWZlcmVuY2VkIHRocm91Z2ggaW5jR3Vlc3NlcyBmdW5jdGlvbiB3aGljaCBhbHdheXMgaW5jcmVtZW50cyBzbyBzdGFydCBhdCAtMVxuICAgIHNldHVwVGVybWluYWwoKTtcbiAgICBzaG93V29yZCgpO1xuICAgIHNob3dMZXR0ZXJzQ2hvc2VuKCk7XG4gICAgaW5jR3Vlc3MoKTsgLy8gaW5jcmVtZW50cyB0byAwIGFuZCBkaXNwbGF5cyBudW1iZXIgb2YgZ3Vlc3Nlc1xuXG4gICAgLy8gYWZ0ZXIgc2V0dXAsIHByb2dyYW0gaXMgZHJpdmVuIGJ5IGtleSBwcmVzc2VzXG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBtYWluIHByb2dyYW1cbnN0YXJ0KCk7XG5cbi8vIHNldCB0ZXJtaW5hbCB1cCB0byByZWFkIGtleSBwcmVzc2VzXG50ZXJtLmdyYWJJbnB1dCh0cnVlKTtcblxuLy8gc2V0IHdhdGNoZXIgb24ga2V5IGlucHV0XG50ZXJtLm9uKCdrZXknLCBmdW5jdGlvbiAobmFtZTpzdHJpbmcsIG1hdGNoZXM6YW55LCBkYXRhOmFueSkge1xuICAgIGlmIChuYW1lID09PSAnQ1RSTF9DJykge1xuICAgICAgICBleGl0R2FtZShcIkNvbnRyb2wgQyBwcmVzc2VkIC0gZXhpdGluZyBnYW1lXCIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCIna2V5JyBldmVudDpcIiArIG5hbWUgKyBcIiBtYXRjaGVzIFwiICsgbWF0Y2hlcyArIFwiIGRhdGEgXCIgKyBkYXRhKTtcbiAgICAgICAgXG4gICAgICAgIGlmICghcmVhZFdvcmQpIHtcbiAgICAgICAgICAgIHByb2Nlc3NJbnB1dChuYW1lKTtcbiAgICAgICAgfSBcbiAgICB9XG59KTtcblxuXG5cbiJdfQ==
