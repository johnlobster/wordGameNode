// class to be used in word game

export default class Letter {
    char:string;
    constructor(letter:string) {
        this.char = letter;
    }
    guessed:boolean = false;
    returnChar():string {
        if ( this.guessed) {
            return this.char;
        }
        else {
            return("_");
        }
    }  
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