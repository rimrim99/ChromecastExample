/**
 * @author lucy
 */

Type = function (){
    Type.prototype.toString = function(){
        switch(this){
            case Type.MARU:
                return "マル";
            case Type.BATU:
                return "バツ";
        }
    };
};
Type = {MARU:new Type(),BATU:new Type(),EMPTY:new Type()};

var board = Class.create({
    initialize : function(){
        this.w = 3;
        this.h = 3;
        this.cells = new Array(this.w);
        for (var x = 0; x < this.w; x++) {
            this.cells[x] = new Array(this.h);
            for (var y = 0; y < this.h; y++) {
                this.cells[x][y] = Type.EMPTY;
            }
        }
    }
});

var board;
var turn;

function init(){
    board = new board();
    turn = Type.MARU;
    var table =  new Element("table",{id:"table"});
        for (var y = 0; y < board.h; y++) {
        var tr = new Element("tr");
            for (var x = 0; x < board.w; x++) {
            (function(){
                var _x = x,_y=y;
                tr.insert(
                    (new Element("td",{id: "cell"+(x+y*board.w)})).observe("click",function(){
                        select(_x, _y);
                    }).setStyle("width:80px;height:80px;font-size:50px;margin:0px;border:solid 1px black;text-align:center")
                );
            })();
        }
        table.insert(tr);
    }
    $("gomoku").insert(table);

    paint();
}

function paint(){
    for (var x = 0; x < board.w; x++) {
        for (var y = 0; y < board.h; y++) {
            var piece;
            switch(board.cells[x][y]){
                case Type.MARU:
                piece = "○";
                break;
                case Type.BATU:
                piece ="×";
                break;
                case Type.EMPTY:
                piece ="";
                break;
            }
            $("cell"+(x+y*board.w)).innerHTML=piece;
        }
    }
}

function select(x,y){
    if (board.cells[x][y] == Type.EMPTY) {
        board.cells[x][y] = turn;
        paint();
        if(check()){//終了
            alert(turn+"の勝ち");
        }else{//続行
            turn = (turn == Type.MARU) ? Type.BATU : Type.MARU;
        }
    }else{
        return;
    }
}

function check(){
    var isEnd = false;
    inloop : for (var x = 0; x < board.w; x++) {
        for (var y = 0; y < board.h; y++) {
            for (var dx = -1; dx <= 1; dx++) {
                for (var dy = -1; dy <= 1; dy++) {
                    if (lineCheck(x,y,dx,dy) == 3) {
                        isEnd = true;
                        break inloop;
                    }
                }
            }
        }
    }
    return isEnd;
}

function lineCheck(x,y,dx,dy){
    if (dx == 0 && dy == 0)
        return 0;
    var count = 0;
    var nx = x;
    var ny= y;

    while( (0<=nx && nx <3 && 0<=ny && ny<3) && board.cells[nx][ny] == turn){
        count++;
        nx += dx;
        ny += dy;
    }
    return count;
}
