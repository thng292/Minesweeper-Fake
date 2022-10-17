import React, { FC, useState } from 'react'
import Difficulties, { DifficultiesDetail, MenuText } from './GameLogic/GameConstraints.js'
import GameLogic from './GameLogic/GameLogic.js'
import GameStates from './GameLogic/GameState.js'
import MineBoard from './GameUI/Board.js'
import GameInfo, { toTime } from './Utils/GameInfo.js'
import GameMenu from './Utils/GameMenu'
let gameLogic = new GameLogic()
let currDiff = DifficultiesDetail.Normal
let initBoard = gameLogic.newGame(currDiff)
let started = false
let showMenu = false
let showDiffMenu = false

const MinesweeperFake: FC<{}> = () => {
    let [_, update] = useState(false)
    let [ctime, changetime] = useState<number>(0)
    let [board, changeBoard] = useState(initBoard)
    let gameState = gameLogic.getGameState()
    let stateText = "Menu"
    if (gameState == GameStates.SOLVED) {
        stateText = "You Won In " + toTime(ctime)
        started = false
        showMenu = true
    } else if (gameState == GameStates.OVER) {
        stateText = "You Lose In " + toTime(ctime)
        started = false
        showMenu = true
    }
    if (started) {
        setTimeout(() => {
            // console.log(ctime)
            changetime(ctime + 1)
        }, 1000)
    }
    return <>
        <GameInfo
            difficulty={"Normal"}
            flagged={gameLogic.getFlagged()}
            noBombs={gameLogic.getBomb()}
            currTime={ctime}
            onLClick={() => {
                showMenu = true
                started = false
                update(!_)
            }}
        />  
        <GameMenu
            show={showMenu}
            onClickHandle={[
                () => {
                    showMenu = false
                    showDiffMenu = true
                    changetime(0);
                    update(!_)
                }, //Change Diff
                () => {
                    initBoard = gameLogic.newGame(currDiff);
                    changetime(0);
                    showMenu = false
                    changeBoard(initBoard)
                },// New Game
                () => {
                    initBoard = gameLogic.restartGame()
                    showMenu = false
                    changetime(0);
                    changeBoard(initBoard)
                },// Restart
            ]}
            text={MenuText}
            title={stateText}
            onClose={() => {
                showMenu = false
                started = true
                    update(!_)
                }
            }
        />
        <GameMenu
            show={showDiffMenu}
            onClose={() => {
                showDiffMenu = false
                started = true
                update(!_)
            }}
            title={"Choose Difficulty"}
            text={[
                DifficultiesDetail.Easy.name + " " + DifficultiesDetail.Easy.w + 'x' + DifficultiesDetail.Easy.h + '(' + DifficultiesDetail.Easy.bombs + ')',
                DifficultiesDetail.Normal.name + " " + DifficultiesDetail.Normal.w + 'x' + DifficultiesDetail.Normal.h + '(' + DifficultiesDetail.Normal.bombs + ')',
                DifficultiesDetail.Hard.name + " " + DifficultiesDetail.Hard.w + 'x' + DifficultiesDetail.Hard.h + '(' + DifficultiesDetail.Hard.bombs + ')',
                DifficultiesDetail.Crazy.name + " " + DifficultiesDetail.Crazy.w + 'x' + DifficultiesDetail.Crazy.h + '(' + DifficultiesDetail.Crazy.bombs + ')',
            ]}
            onClickHandle={[
                () => {
                    initBoard = gameLogic.newGame(DifficultiesDetail.Easy)
                    currDiff = DifficultiesDetail.Easy
                    showDiffMenu = false
                    changeBoard(initBoard)
                },
                () => {
                    initBoard = gameLogic.newGame(DifficultiesDetail.Normal)
                    currDiff = DifficultiesDetail.Normal
                    showDiffMenu = false
                    changeBoard(initBoard)
                },
                () => {
                    initBoard = gameLogic.newGame(DifficultiesDetail.Hard)
                    currDiff = DifficultiesDetail.Hard
                    showDiffMenu = false
                    changeBoard(initBoard)
                },
                () => {
                    initBoard = gameLogic.newGame(DifficultiesDetail.Crazy)
                    currDiff = DifficultiesDetail.Crazy
                    changeBoard(initBoard)
                    showDiffMenu = false
                },
            ]}
        />
        <MineBoard
            GBoard={board}
            OnLClick={(x, y, e) => {
                e.preventDefault()
                if (gameState == GameStates.UNSOLVED) {
                    changeBoard(gameLogic.updateBoardL(x, y).map((row) => row.map(item => item)))
                    started = true
                }
            }} OnRClick={(x, y, e) => {
                e.preventDefault()
                if (gameState == GameStates.UNSOLVED) {
                    changeBoard(gameLogic.updateBoardR(x, y).map((row) => row.map(item => item)))
                    started = true
                }
        }} Difficulty={currDiff}/>
    </>
}

export default MinesweeperFake