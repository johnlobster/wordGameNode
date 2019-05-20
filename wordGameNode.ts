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
    chosenLetters: { x: 10, y: 10},
    wordSoFar: { x:10, y:12},
    getWord: { x:10, y:15},
    input: { x:10, y:13}
};

// can't seem to turn off the event listener so using a global variable to make it not reurn anything
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
}


function showWord():void {
    let word:string = theWord.word2string();
    console.log("Word so far " + word);
}

function showLettersChosen ():void {
    console.log( "Letters chosen " +lettersChosen.join(","));
}

function exitGame(message?: string): void {
    term.nextLine(10);
    if (message !== undefined) {
        
        console.log(message);
    }
    term.processExit(0);
}

function guessWord():void {
    console.log("Guess a word");
    // turn off the key event listener using global variable
    readWord = true;
    term.inputField(function (error: any, input: string) {
        if (error) {
            // term.red.bold("\nAn error occurred reading input field: " + error + "\n");
            exitGame("\nAn error occurred reading input field: " + error + "\n");
        }
        else {
            console.log("\nInput was " + input);
            if( input === theWord.word2FullString()) {
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
                wordCompleted();
                
            }
            
        }
    }
    // any other key pressed does nothing  
}

function wordCompleted():void {
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

function start():void {
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



