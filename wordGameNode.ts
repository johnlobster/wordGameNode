// main program for node based word guessing game

import * as _ from "lodash";
import Word from "./word";
import {terminal as term} from "terminal-kit";


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
    chosenLetters: { x:25, y:10},
    wordSoFar:     { x:25, y:12},
    getWord:       { x:25, y:15},
    input:         { x:25, y:13},
    chooseAgain:   { x:25, y:18}
};

// offsets the instructions from left hand side
const xOffset = 5;
// can't seem to turn off the event listener so using a global variable to make it doesn't return anything
var readWord = false;
// holds the word selected by random from wordsArr
var theWord:Word;

// array to hold the letters chosen
var lettersChosen:string[] = [];

// randomly choose a word from wordsArr
function chooseWord () {
    let random = _.random(0, (wordsArr.length -1 ));
    theWord = new Word(wordsArr[random]);
    
}

// clears the screen and then prints out all the information
function setupTerminal():void {
    term.clear();
    // write information to screen
    term.moveTo(xOffset,termXY.input.y);
    term("Type letters");
    term.moveTo(xOffset, termXY.chosenLetters.y);
    term("Letters chosen ");
    term.moveTo(xOffset, termXY.wordSoFar.y);
    term("Word so far ");
    // move cursor to input position
    term.moveTo(termXY.input.x, termXY.input.y);

}


function showWord():void {
    let word:string = theWord.word2string();
    term.moveTo(termXY.wordSoFar.x, termXY.wordSoFar.y);
    term(word);
    // want to know how many characters
    term("  (" + theWord.letterArr.length + " characters)");
    term.moveTo(termXY.input.x, termXY.input.y);
}

function showLettersChosen ():void {
    term.moveTo(termXY.chosenLetters.x, termXY.chosenLetters.y);
    term( lettersChosen.join(","));
    term.moveTo(termXY.input.x, termXY.input.y);
}

function exitGame(message?: any): void {
    // move down 10 lines
    term.nextLine(10);
    if (message !== undefined) {
        console.log(String(message));
    }
    // using this exit resets any strange stuff the terminal is doing
    term.processExit(0);
}

function guessWord():void {
    term.moveTo(xOffset, termXY.getWord.y);
    term("Guess the word ");
    term.moveTo(xOffset, termXY.getWord.y + 1);
    term("(RETURN to finish)");
    term.moveTo(termXY.getWord.x, termXY.getWord.y);
    // turn off the key event listener using global variable
    readWord = true;
    term.inputField(function (error: any, input: string) {
        if (error) {
            // term.red.bold("\nAn error occurred reading input field: " + error + "\n");
            exitGame(term.red.str("\nAn error occurred reading input field: " + error + "\n"));
        }
        else {
            // console.log("\nInput was " + input);
            if( input === theWord.word2FullString()) {
                readWord = false;
                wordCompleted();
            }
            else {
                term.moveTo(xOffset, termXY.getWord.y);
                term("                                   ");
                term.moveTo(xOffset, termXY.getWord.y + 1);
                term("                    ");
                term.moveTo(termXY.getWord.x, termXY.getWord.y);
                term("Guess " + input + " was wrong                                  ");
                // move cursor back to input position
                term.moveTo(termXY.input.x, termXY.input.y);
            }
        }
        // let the event listener work again
        readWord = false;
    });
}
// function called when a key is pressed in raw mode
function processInput( char:string):void {
    const regexp = new RegExp("[a-z]", "i");
    if ( char === "ENTER") {
        // make a guess at the word
        guessWord();
    }
    else if ( (char.length === 1) && (regexp.test(char))) {
        const lcChar = char.toLowerCase();
        // console.log("valid input " + char);
        // check to see whether letter has already been selected
        if (_.indexOf(lettersChosen,lcChar) > 0) {
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
                showWord();
                showLettersChosen();
                wordCompleted();
                
            }
            
        }
    }
    // any other key pressed does nothing  
}

function wordCompleted():void {
    // erase guessed word
    term.moveTo(termXY.getWord.x, termXY.getWord.y);
    term("                                          ");
    term.moveTo(termXY.chooseAgain.x, termXY.chooseAgain.y);
    term("completed word "+ theWord.word2FullString());
    term(" Another game ? (Y/n)");
    readWord = true; // not really reading word but disables key event
    term.yesOrNo({ yes: ['y', 'Y','ENTER'], no: ['n', 'N'] }, function (error, result) {
        if (result) {
            readWord = false; // re-enabled key event
            start();
        }
        else {
            exitGame();
        }
    });
    
}

function start():void {  
    chooseWord();
    lettersChosen = [];
    setupTerminal();
    showWord();
    showLettersChosen();
    // after setup, program is driven by key presses
}



// showWord();
// showLettersChosen();
// getInput();

start();

// console.log(theWord);

// set terminal up to read key presses
term.grabInput(true);

// set watcher on key input
term.on('key', function (name:string, matches:any, data:any) {
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



