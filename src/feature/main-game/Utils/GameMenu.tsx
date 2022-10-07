import React, { FC } from 'react'
import textStyle from './textStyle.js'

const GameMenu: FC<{
    title: string,
    text: string[],
    show: boolean,
    onClickHandle: (() => void)[],
    onClose: ()=>void
}> = (props) => {
    if (!props.show) {
        return <></>
    }
    return <>
        <div style={{
            backgroundColor: '#cccccccc',
            position: 'absolute',
            zIndex: '1',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '300px',
            minHeight: '300px',
            borderRadius: '10px',
        }}>
            <p style={{
                ...textStyle,
                fontSize: '32px',
                fontWeight: 'Bold',
                margin: '10px'
            }}>{props.title}</p>
            {props.text.map((value, index) => 
                <button
                    key={index}
                    style={{
                        ...textStyle,
                        backgroundColor: 'white',
                        border: '0',
                        borderRadius: '8px',
                        padding: '10px',
                        margin: '5px',
                        cursor: 'pointer',
                        width: '200px'
                    }}
                    onClick={props.onClickHandle[index]}
                >{value}</button>
            )}
            <button style={{
                    ...textStyle,
                    backgroundColor: 'violet',
                    border: '0',
                    borderRadius: '8px',
                    padding: '10px',
                    cursor: 'pointer',
                    width: '200px',
                    margin: '20px 10px',
                }}
                    onClick={props.onClose}>Close</button>
        </div>
    </>
}

export default GameMenu