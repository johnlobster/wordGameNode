"use strict";
// class to be used in word game
Object.defineProperty(exports, "__esModule", { value: true });
var Letter = /** @class */ (function () {
    function Letter(letter) {
        this.guessed = false;
        this.char = letter;
    }
    // returns the stored character or '_' if letter not guessed yet
    Letter.prototype.returnChar = function () {
        if (this.guessed) {
            return this.char;
        }
        else {
            return ("_");
        }
    };
    // checks the letter, if it is equal, then guessed becomes true
    Letter.prototype.check = function (x) {
        if (this.char === x) {
            this.guessed = true;
            return true;
        }
        else {
            return false;
        }
    };
    return Letter;
}());
exports.default = Letter;
// export { Letter};
// module.exports = Letter;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxldHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsZ0NBQWdDOztBQUVoQztJQUVJLGdCQUFZLE1BQWE7UUFHekIsWUFBTyxHQUFXLEtBQUssQ0FBQztRQUZwQixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQsZ0VBQWdFO0lBQ2hFLDJCQUFVLEdBQVY7UUFDSSxJQUFLLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDcEI7YUFDSTtZQUNELE9BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNmO0lBQ0wsQ0FBQztJQUNELCtEQUErRDtJQUMvRCxzQkFBSyxHQUFMLFVBQU0sQ0FBUztRQUNYLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUU7WUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEIsT0FBTyxJQUFJLENBQUM7U0FDZjthQUNJO1lBQ0QsT0FBTyxLQUFLLENBQUM7U0FDaEI7SUFDTCxDQUFDO0lBQ0wsYUFBQztBQUFELENBekJBLEFBeUJDLElBQUE7O0FBRUQsb0JBQW9CO0FBRXBCLDJCQUEyQiIsImZpbGUiOiJsZXR0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBjbGFzcyB0byBiZSB1c2VkIGluIHdvcmQgZ2FtZVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGV0dGVyIHtcclxuICAgIGNoYXI6c3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IobGV0dGVyOnN0cmluZykge1xyXG4gICAgICAgIHRoaXMuY2hhciA9IGxldHRlcjtcclxuICAgIH1cclxuICAgIGd1ZXNzZWQ6Ym9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLy8gcmV0dXJucyB0aGUgc3RvcmVkIGNoYXJhY3RlciBvciAnXycgaWYgbGV0dGVyIG5vdCBndWVzc2VkIHlldFxyXG4gICAgcmV0dXJuQ2hhcigpOnN0cmluZyB7XHJcbiAgICAgICAgaWYgKCB0aGlzLmd1ZXNzZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hhcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybihcIl9cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSAgXHJcbiAgICAvLyBjaGVja3MgdGhlIGxldHRlciwgaWYgaXQgaXMgZXF1YWwsIHRoZW4gZ3Vlc3NlZCBiZWNvbWVzIHRydWVcclxuICAgIGNoZWNrKHg6IHN0cmluZyk6Ym9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hhciA9PT0geCkge1xyXG4gICAgICAgICAgICB0aGlzLmd1ZXNzZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIGV4cG9ydCB7IExldHRlcn07XHJcblxyXG4vLyBtb2R1bGUuZXhwb3J0cyA9IExldHRlcjsiXX0=
