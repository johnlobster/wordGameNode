// class for  word game
// 
import Letter from "./letter";

function genLetters (newWord:string):{}[] {
    

}

export default class  Word  {
    letterArr:{}[];
    constructor(newWord: string) {
        this.letterArr = [];
        for (let i = 0; i < newWord.length; i++) {
            var letter: any = new Letter(newWord.substr(i, 1));
            this.letterArr.push(letter);
        }
    }
    word2string():string {
        let result = false;
        for (let i = 0; i < this.letterArr.length; i++) {
        this.letterArr[0].returnChar();
    }
    checkChar( char:string) {""
        let result = false;
        for (let i = 0; i < this.letterArr.length; i++) {
            if ( )

    }
}


// module.exports = Word;