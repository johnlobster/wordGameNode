// class to be used in word game

export default class Letter {
    char:string;
    constructor(letter:string) {
        this.char = letter;
    }
    guessed:boolean = false;
    // returns the stored character or '_' if letter not guessed yet
    returnChar():string {
        if ( this.guessed) {
            return this.char;
        }
        else {
            return("_");
        }
    }  
    // checks the letter, if it is equal, then guessed becomes true
    check(x: string):boolean {
        if (this.char === x) {
            this.guessed = true;
            return true;
        }
        else {
            return false;
        }
    }
}

// export { Letter};

// module.exports = Letter;