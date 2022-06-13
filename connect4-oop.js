class Game {
    constructor(width = 7, height = 6, p1, p2){
        this.width = width;
        this.height = height;
        this.currPlayer = p1;
        this.players = [p1,p2];
        console.log(this.width);
        this.makeBoard();
        this.makeHTMLBoard();
        this.gameOver = false;
    };
    makeBoard(){
        this.board = []
        for(let y = 0; y < this.height; y++){
            this.board.push(Array.from({ length: this.width}))
        }
    };
    makeHTMLBoard(){
        const board = document.getElementById('board');
        board.innerHTML = '';
        const top = document.createElement('tr');
        top.setAttribute('id', 'column-top');
        this.handleGameClick = this.handleClick.bind(this);
        top.addEventListener('click', this.handleGameClick);
        console.log(this.width);
        for(let x = 0; x < this.width; x++){
            console.log('im working');
            const headCell = document.createElement('td');
            headCell.setAttribute('id', x);
            top.append(headCell);
        }
        console.log(top);
        board.append(top);

        for(let y = 0; y < this.height; y++){
            const row = document.createElement('tr');

            for(let x = 0; x < this.width; x++){
                const cell = document.createElement('td');
                cell.setAttribute('id', `${y}-${x}`);
                row.append(cell);
            }
            board.append(row);
        }
    };
    findSpotforCol(x){
        for (let y = this.height - 1; y >= 0; y--) {
            if (!this.board[y][x]) {
              return y;
            }
          }
          return null;
    };
    placeInTable(y,x){
        const piece = document.createElement('div');
         piece.classList.add('piece');
         piece.style.backgroundColor = this.currPlayer.color;
         piece.style.top = -50 * (y + 2);

        const spot = document.getElementById(`${y}-${x}`);
        spot.append(piece);
    };
    endGame(msg) {
        alert(msg);
        const top = document.querySelector('#column-top');
        top.removeEventListener('click', this.handleGameClick)
    }
    handleClick(evt){
        const x = +evt.target.id;
        const y = this.findSpotforCol(x)
        if(y === null){
            return;
        }
        this.board[y][x] = this.currPlayer
        this.placeInTable(y,x);
        if (this.checkForWin()) {
            this.gameOver = true;
            return this.endGame(`Player ${this.currPlayer.color} won!`)
        }
        if(this.board.every(row => row.every(cell => cell))) {
            return this.endGame('Tie!');
        }
        this.currPlayer = this.currPlayer === this.players[0] ? this.players[1] : this.players[0];
    }
    checkForWin(){
        function _win(cells){
            return cells.every(
                ([y, x]) =>
                  y >= 0 &&
                  y < this.height &&
                  x >= 0 &&
                  x < this.width &&
                  this.board[y][x] === this.currPlayer
              );
        }
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
                const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
                const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
                const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
                if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                    return true;
            }
        }
      }
    } 
}

class Player{
    constructor(color){
        this.color = color;
    }
}

document.getElementById('start-game').addEventListener('click', function(e){
    console.log(e)
    let p1 = new Player(document.getElementById('p1-color').value);
    let p2 = new Player(document.getElementById('p2-color').value);
    new Game(6,7 , p1,p2);
})


