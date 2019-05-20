// class for  word game
// 
import Letter from "./letter";


export default class  Word  {
    letterArr:Letter[];
    constructor(newWord: string) {
        this.letterArr = [];
        for (let i = 0; i < newWord.length; i++) {
            this.letterArr.push(new Letter(newWord.substr(i, 1)));
        }
    }
    word2string():string {
        let result = "";
        for (let i = 0; i < this.letterArr.length; i++) {
            result += this.letterArr[i].returnChar();
        }
        return result;
    }
    checkChar( char:string):void {
        for (let i = 0; i < this.letterArr.length; i++) {
            this.letterArr[i].check(char);
        }
    }
    word2FullString():string {
        let result = "";
        for (let i = 0; i < this.letterArr.length; i++) {
            result += this.letterArr[i].char;
        }
        return result;
    }
}

