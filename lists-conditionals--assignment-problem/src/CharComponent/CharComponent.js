import React from 'react'

const CharComponent = (props) => {
  const style = {
    display: 'inline-block',
    padding: '16px',
    margin: '16px',
    border: '1px solid black',
    textAligh: 'center',
  }
  
  return (
    <div style={style} onClick={props.onClick}>
      {props.char}
    </div>
  )
}

export default CharComponent