import React from 'react'

const validationComponent = (props) => {
  const validation = props.textLength < 5 ? 'Text too short' : 'Text too long';
  
  return (
    <p>{validation}</p>
  )
}

export default validationComponent;