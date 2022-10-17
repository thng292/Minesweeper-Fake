import Pair, { mkpair } from "../CommonTypes/Pair.js";
import { UnitSquareState } from "../GameUI/UnitSquare.js";
import Difficulties, { BoardDetail, DifficultiesDetail } from "./GameConstraints.js";
import GameStates from "./GameState.js";
import RandBombs from "./RandomBombs.js";

class GameLogic {
    private _board: Pair<number, UnitSquareState>[][] = []
    private _boardBak: Pair<number,UnitSquareState>[][] = []
    private _width = 0
    private _height = 0
    private _noBombs = 0
    private _nodir = 8
    private _flagged = 0
    private _aroundx = [1, 1, 1, 0, 0, -1, -1, -1]
    private _aroundy = [1, 0, -1, 1, -1, 1, 0, -1]
    private _bombs: Pair<number, number>[] = []
    private _isOver = false
    private _progress = 0

    private initBoardZero(): void {
        let tmp: Pair<number, UnitSquareState>[][] = []
        for (let i = 0; i < this._height; i++) {
            tmp.push([])
            for (let j = 0; j < this._width; j++) {
                tmp[i][j] = {
                    fi: 0,
                    se: UnitSquareState.DEFAULT
                }
            }
        }
        //  console.log("tmp",tmp)
        this._board = JSON.parse(JSON.stringify(tmp))
    }

    public getGameState(): GameStates {
        if (this._isOver) return GameStates.OVER
        if (this._flagged === this._noBombs && this._progress==this._width*this._height) return GameStates.SOLVED
        return GameStates.UNSOLVED        
    }

    public getFlagged() {
        return this._flagged
    }

    public getBomb() {
        return this._noBombs
    }

    private checkBound(x: number, y: number): boolean {
        return ((0<=x && x<this._height) && (0<=y && y<this._width))
    }

    public newGame(difficulty: BoardDetail): Pair<number, UnitSquareState>[][] {
        this._isOver = false
        this._progress = 0
        this._width = difficulty.w
        this._height = difficulty.h
        this._noBombs = difficulty.bombs
        this.initBoardZero()
        this._bombs = RandBombs(this._width, this._height, this._noBombs)
        debugger
        for (let i of this._bombs) {
            //console.log(i)
            this._board[i.fi][i.se].fi = -1
            for (let j = 0; j < this._nodir; j++) {
                if (this.checkBound(i.fi + this._aroundx[j], i.se + this._aroundy[j])) {
                    if (this._board[i.fi + this._aroundx[j]][i.se + this._aroundy[j]].fi >= 0) {
                        // console.log(i.fi + this._aroundx[j], i.se + this._aroundy[j])
                        this._board[i.fi + this._aroundx[j]][i.se + this._aroundy[j]].fi++
                    }
                }
            }
        }
        this._boardBak = JSON.parse(JSON.stringify(this._board))
        // console.log(this._board)
        return this._board
    }

    private openAllZeros(x: number, y: number) {
        console.log("Openning",x, y)
        if (this._board[x][y].fi != 0) return 
        for (let i = 0; i < this._nodir; i++) {
            if (this.checkBound(x + this._aroundx[i], y + this._aroundy[i])
            && this._board[x + this._aroundx[i]][y + this._aroundy[i]].se == UnitSquareState.DEFAULT
            ) {
                this._progress++
                this._board[x + this._aroundx[i]][ y + this._aroundy[i]].se = UnitSquareState.OPENED
                this.openAllZeros(x + this._aroundx[i], y + this._aroundy[i])
            }
        }
    }

    public updateBoardR(x: number, y: number): Pair<number, UnitSquareState>[][] {
        if (this._board[x][y].se === UnitSquareState.DEFAULT) {
            this._board[x][y].se = UnitSquareState.FLAGGED
            this._flagged++
            this._progress++
        } else if (this._board[x][y].se === UnitSquareState.FLAGGED) {
            this._board[x][y].se = UnitSquareState.DEFAULT
            this._flagged--
            this._progress--
        }
        console.log(x, y)
        return this._board
    }

    public updateBoardL(x: number, y: number): Pair<number, UnitSquareState>[][] {
        console.log(x, y)
        //bomb
        if (this._board[x][y].se === UnitSquareState.DEFAULT) {
            if (this._board[x][y].fi === -1) {
                console.log("Boom")
                this._board[x][y].se === UnitSquareState.BOOM
                this._isOver = true
                for (let i of this._bombs) {
                    this._board[i.fi][i.se].se = UnitSquareState.BOOM
                }
                for (let i = 0; i < this._height; i++) {
                    for (let j = 0; j < this._width; j++) {
                        if (this._board[i][j].se != UnitSquareState.BOOM)
                            this._board[i][j].se = UnitSquareState.OPENED
                    }
                }
                return this._board
            }
            //open all 0
            this._board[x][y].se = UnitSquareState.OPENED
            this._progress++
            if (this._board[x][y].fi === 0) {
                console.log("Clicked on zeros")
                this.openAllZeros(x, y)
            }
        }
        return this._board
    }

    public restartGame(): Pair<number, UnitSquareState>[][] {
        this._isOver = false
        this._progress = 0
        this._board = JSON.parse(JSON.stringify(this._boardBak))
        return this._board
    }
}

export default GameLogic