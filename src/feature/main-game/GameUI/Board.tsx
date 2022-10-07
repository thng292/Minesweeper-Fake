import React, { FC } from 'react'
import Pair from '../CommonTypes/Pair.js'
import Difficulties, { DifficultiesDetail, BoardDetail } from '../GameLogic/GameConstraints.js'
import UnitSquare, { UnitSquareState } from './UnitSquare.js'

function stringMult(a: string, times: number): string {
    // console.log("recalculating board")
    if (times==0) return ""
    if (times==1) return a
    let tmp = stringMult(a,Math.floor(times/2))
    if (times % 2 == 1) {
        return tmp + ' ' + tmp + ' ' + a + ' '
    }
    return tmp + ' ' + tmp + ' '
}

export interface BoardProps {
    GBoard: Pair<number, UnitSquareState>[][],
    Difficulty: BoardDetail
    OnRClick: (x: number, y: number, e: React.MouseEvent<HTMLDivElement,MouseEvent>) => void,
    OnLClick: (x: number, y: number, e: React.MouseEvent<HTMLDivElement,MouseEvent>) => void,
}

let rows = ""
let cols = ""

const MineBoard: FC<BoardProps> = (props) => {
    let boardSize = props.Difficulty
    console.log(boardSize.w, boardSize.h)
    rows = stringMult('30px', boardSize.h)
    cols = stringMult('30px', boardSize.w)
    return (<div style={{
        display: 'grid',
        gap: '3px',
        gridTemplateColumns: cols,
        gridTemplateRows: rows
    }} onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
    }} onContextMenu={(e) => {
        e.stopPropagation()
        e.preventDefault()
        }}>
        {props.GBoard.map((row, i) => row.map((item, j) => {
            return <UnitSquare
            key={i * props.Difficulty.w + j}
            bombsNearBy={item.fi}
            state={item.se}
            onLClickHandle={(e) => props.OnLClick(i, j, e)}
            onRClickHandle={(e) => props.OnRClick(i, j, e)}
        />
        })).flat()}
    </div>)
}

export default MineBoard