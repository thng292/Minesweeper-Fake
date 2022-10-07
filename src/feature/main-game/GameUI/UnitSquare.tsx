import React, { FC } from 'react'
import textStyle from '../Utils/textStyle.js'
import bombUrl from '../../../assets/bomb.png'
import flagUrl from '../../../assets/flag.png'

export enum UnitSquareState {
    DEFAULT=1,
    OPENED,
    FLAGGED,
    BOOM,
}

export interface UnitSquareProps {
    bombsNearBy: number, // -1 if has bomb
    state: UnitSquareState,
    onLClickHandle: (e: React.MouseEvent<HTMLDivElement,MouseEvent>) => void,
    onRClickHandle: (e: React.MouseEvent<HTMLDivElement,MouseEvent>) => void,
}

const UnitSquare: FC<UnitSquareProps> = (props) => {
    let bgcolor = '#5d5e5f'
    if (props.state === UnitSquareState.OPENED) bgcolor = '#cccccc'
    if (props.state === UnitSquareState.BOOM) bgcolor = 'red'
    return (
        <div
            onContextMenu={(e) => props.onRClickHandle(e)}
            onClick={(e) => props.onLClickHandle(e)}
            style={{
                borderRadius: '4px',
                backgroundColor: bgcolor,
                ...textStyle,
                padding: 0,
                lineHeight: '30px',
            }}>
            {(props.state === UnitSquareState.FLAGGED) ? <img src={flagUrl} alt="Flagged" style={{ width: '100%' }} /> : ""}
            {(props.state === UnitSquareState.BOOM) ? <img src={bombUrl} alt="Boom" style={{ width: '100%' }} /> : ""}
            {(props.bombsNearBy && props.state == UnitSquareState.OPENED) ? props.bombsNearBy : ""}
        </div>
    )
}

export default UnitSquare