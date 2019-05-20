// main program for node based word guessing game

import * as _ from "lodash";
import Word from "./word";
import {terminal as term} from "terminal-kit";
import { processScopeQueue } from "nextgen-events";

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
var theWord:Word;

var lettersChosen:string[] = [];
// randomly choose a word from wordsArr
function chooseWord () {
    let random = _.random(0, (wordsArr.length -1 ));
    theWord = new Word(wordsArr[random]);
    
}

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

// function getChar ():string {
//     return "e";
// }

// function getInput ():void {
//     let char = getChar();
//     console.log("input char " + char);
//     theWord.checkChar(char);
//     lettersChosen.push(char);
// }

function guessWord():void {
    console.log("Guess a word");
    // turn off the event listener, callback required
    term.off("key", function(){
        term.inputField(function (error: any, input: string) {
            if (error) {
                term.red.bold("\nAn error occurs: " + error + "\n");
                term.processExit(0);
            }
            else {
                console.log("Input was " + input);
                term.processExit(0);
            }
            // turn the event listener back on
            term.on('key', function (name: string, matches: any, data: any) {
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
term.on('key', function (name:string, matches:any, data:any) {
    // console.log("'key' event:" + name + " matches " + matches + " data " + data);
    if (name === 'CTRL_C') {
        term.processExit(0);
    } 
    else {
        processInput(name);
    }
});



