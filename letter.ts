// constructor to be used in word game
function Letter() {
    this.char = "";
    this.guessed = false;
    this.isGuessed = function ():string {
        if ( this.isGuessed) {
            return this.char;
        }
        else {
            return("_");
        }
    }  
    this.check = function (x:string):boolean {
        if (this.char === x) {
            this.guessed = true;
            return true;
        }
        else {
            return false;
        }
    }
}

module.exports = Letter;