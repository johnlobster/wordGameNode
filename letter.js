// class to be used in word game
export default class Letter {
    constructor(letter) {
        this.guessed = false;
        this.char = letter;
    }
    // returns the stored character or '_' if letter not guessed yet
    returnChar() {
        if (this.guessed) {
            return this.char;
        }
        else {
            return ("_");
        }
    }
    // checks the letter, if it is equal, then guessed becomes true
    check(x) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxldHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnQ0FBZ0M7QUFFaEMsTUFBTSxDQUFDLE9BQU8sT0FBTyxNQUFNO0lBRXZCLFlBQVksTUFBYTtRQUd6QixZQUFPLEdBQVcsS0FBSyxDQUFDO1FBRnBCLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxnRUFBZ0U7SUFDaEUsVUFBVTtRQUNOLElBQUssSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNmLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztTQUNwQjthQUNJO1lBQ0QsT0FBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2Y7SUFDTCxDQUFDO0lBQ0QsK0RBQStEO0lBQy9ELEtBQUssQ0FBQyxDQUFTO1FBQ1gsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTtZQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixPQUFPLElBQUksQ0FBQztTQUNmO2FBQ0k7WUFDRCxPQUFPLEtBQUssQ0FBQztTQUNoQjtJQUNMLENBQUM7Q0FDSjtBQUVELG9CQUFvQjtBQUVwQiwyQkFBMkIiLCJmaWxlIjoibGV0dGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gY2xhc3MgdG8gYmUgdXNlZCBpbiB3b3JkIGdhbWVcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExldHRlciB7XHJcbiAgICBjaGFyOnN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKGxldHRlcjpzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmNoYXIgPSBsZXR0ZXI7XHJcbiAgICB9XHJcbiAgICBndWVzc2VkOmJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8vIHJldHVybnMgdGhlIHN0b3JlZCBjaGFyYWN0ZXIgb3IgJ18nIGlmIGxldHRlciBub3QgZ3Vlc3NlZCB5ZXRcclxuICAgIHJldHVybkNoYXIoKTpzdHJpbmcge1xyXG4gICAgICAgIGlmICggdGhpcy5ndWVzc2VkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNoYXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4oXCJfXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0gIFxyXG4gICAgLy8gY2hlY2tzIHRoZSBsZXR0ZXIsIGlmIGl0IGlzIGVxdWFsLCB0aGVuIGd1ZXNzZWQgYmVjb21lcyB0cnVlXHJcbiAgICBjaGVjayh4OiBzdHJpbmcpOmJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLmNoYXIgPT09IHgpIHtcclxuICAgICAgICAgICAgdGhpcy5ndWVzc2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBleHBvcnQgeyBMZXR0ZXJ9O1xyXG5cclxuLy8gbW9kdWxlLmV4cG9ydHMgPSBMZXR0ZXI7Il19
