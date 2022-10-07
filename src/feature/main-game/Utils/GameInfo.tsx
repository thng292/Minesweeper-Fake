import React, { FC } from 'react'
import styleNormal from './textStyle.js'

export function toTime(a: number): String {
    let tmp1 = Math.floor(a / 60).toString()
    if (tmp1.length==1) tmp1 = '0'+tmp1
    let tmp2 = (a % 60).toString()
    if (tmp2.length==1) tmp2 = '0'+tmp2
    return "" + tmp1 + ':' + tmp2
}

const GameInfo: FC<{
    difficulty: string,
    flagged: number,
    noBombs: number,
    currTime: number,
    onLClick: ()=>void
}> = (props) => {
    return <div  style={{
        display: 'grid',
        gridTemplateColumns: 'auto auto auto',
        gridTemplateRows: 'auto',
        width: '80%',
        maxWidth: '500px',
        minWidth: '320px',
        backgroundColor: '#f3f4f6',
        borderRadius: '10px',
        margin: '10px',
        cursor: 'pointer'
    }} onClick={props.onLClick}>
        <p style={styleNormal}>Mode: {props.difficulty}</p>
        <p style={styleNormal}>Flagged: {props.flagged}/{props.noBombs}</p>
        <p style={styleNormal}>{toTime(props.currTime)}</p>
    </div>
}

export default GameInfo