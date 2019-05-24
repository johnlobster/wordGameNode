"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// class for  word game
// 
var letter_1 = __importDefault(require("./letter"));
var Word = /** @class */ (function () {
    function Word(newWord) {
        this.letterArr = [];
        for (var i = 0; i < newWord.length; i++) {
            this.letterArr.push(new letter_1.default(newWord.substr(i, 1)));
        }
    }
    Word.prototype.word2string = function () {
        var result = "";
        for (var i = 0; i < this.letterArr.length; i++) {
            result += this.letterArr[i].returnChar();
        }
        return result;
    };
    Word.prototype.checkChar = function (char) {
        for (var i = 0; i < this.letterArr.length; i++) {
            this.letterArr[i].check(char);
        }
    };
    Word.prototype.word2FullString = function () {
        var result = "";
        for (var i = 0; i < this.letterArr.length; i++) {
            result += this.letterArr[i].char;
        }
        return result;
    };
    return Word;
}());
exports.default = Word;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx1QkFBdUI7QUFDdkIsR0FBRztBQUNILG9EQUE4QjtBQUc5QjtJQUVJLGNBQVksT0FBZTtRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNwQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNyQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLGdCQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3pEO0lBQ0wsQ0FBQztJQUNELDBCQUFXLEdBQVg7UUFDSSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzVDLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQzVDO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUNELHdCQUFTLEdBQVQsVUFBVyxJQUFXO1FBQ2xCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM1QyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQztJQUNMLENBQUM7SUFDRCw4QkFBZSxHQUFmO1FBQ0ksSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM1QyxNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7U0FDcEM7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBQ0wsV0FBQztBQUFELENBM0JBLEFBMkJDLElBQUEiLCJmaWxlIjoid29yZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGNsYXNzIGZvciAgd29yZCBnYW1lXHJcbi8vIFxyXG5pbXBvcnQgTGV0dGVyIGZyb20gXCIuL2xldHRlclwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzICBXb3JkICB7XHJcbiAgICBsZXR0ZXJBcnI6TGV0dGVyW107XHJcbiAgICBjb25zdHJ1Y3RvcihuZXdXb3JkOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmxldHRlckFyciA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3V29yZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmxldHRlckFyci5wdXNoKG5ldyBMZXR0ZXIobmV3V29yZC5zdWJzdHIoaSwgMSkpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB3b3JkMnN0cmluZygpOnN0cmluZyB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxldHRlckFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICByZXN1bHQgKz0gdGhpcy5sZXR0ZXJBcnJbaV0ucmV0dXJuQ2hhcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgY2hlY2tDaGFyKCBjaGFyOnN0cmluZyk6dm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxldHRlckFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmxldHRlckFycltpXS5jaGVjayhjaGFyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB3b3JkMkZ1bGxTdHJpbmcoKTpzdHJpbmcge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBcIlwiO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZXR0ZXJBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgcmVzdWx0ICs9IHRoaXMubGV0dGVyQXJyW2ldLmNoYXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==
