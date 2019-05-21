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

// offsets the instructions from left hand side
const xOffset = 5;
// object to hold x,y locations of inputs and outputs for use by terminal-kit
const termXY = {
    chosenLetters: { x:25, y:12},
    wordSoFar:     { x:25, y:16},
    getWord:       { x:25, y:20},
    input:         { x:25, y:18},
    chooseAgain:   { x:25, y:23},
    guesses:       { x:25, y:11},
    title:         { x:30, y:2},
    instructions:  { x:5,  y:4}
};


// can't seem to turn off the event listener so using a global variable to make it doesn't return anything
var readWord = false;
// holds the word selected by random from wordsArr
var theWord:Word;

// array to hold the letters chosen
var lettersChosen:string[] = [];

// number of guesses and max allowed
var guesses:number = -1; // referenced through incGuesses function which always increments so start at -1
const maxGuesses:number = 10;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// functions

// randomly choose a word from wordsArr
function chooseWord () {
    let random = _.random(0, (wordsArr.length -1 ));
    theWord = new Word(wordsArr[random]);
    
}

// clears the screen and then prints out instructions and information
function setupTerminal():void {
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

function incGuess():void {
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
function guessWord():void {
    term.moveTo(xOffset, termXY.getWord.y);
    term("Guess the word ");
    term.moveTo(xOffset, termXY.getWord.y + 1);
    term("(RETURN to finish)");
    // move cursor to word input position
    term.moveTo(termXY.getWord.x, termXY.getWord.y);
    // erase what was there
    term("                                     ");
    debugger;
    term.moveTo(termXY.getWord.x, termXY.getWord.y);
    // term("Here " + termXY.getWord.x + "," + termXY.getWord.y);
    // term.moveTo(termXY.getWord.x, termXY.getWord.y + 5);
    // turn off the key event listener using global variable
    readWord = true;
    term.inputField({},function (error: any, input: string) {
        if (error) {
            exitGame(term.red.str("\nAn error occurred reading input field: " + error + "\n"));
        }
        else {
            if( input === theWord.word2FullString()) {
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
function processInput( char:string):void {
    const regexp = new RegExp("[a-z]", "i");
    if ( char === "ENTER") {
        // make a guess at the word
        guessWord();
        incGuess();
    }
    else if ( (char.length === 1) && (regexp.test(char))) {
        const lcChar = char.toLowerCase();
        // check to see whether letter has already been selected
        if (_.indexOf(lettersChosen,lcChar) > -1) {
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

function wordCompleted():void {
    // erase guessed word
    term.moveTo(termXY.getWord.x, termXY.getWord.y);
    term("                                          ");
    term.moveTo(termXY.chooseAgain.x, termXY.chooseAgain.y);
    term("completed word \""+ theWord.word2FullString() + "\"");
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



