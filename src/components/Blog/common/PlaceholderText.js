import React from 'react';

const PlaceholderText = ({length, count = 0, dark}) => {
  let text

  if(count > 0) {
      text = []
      for (let i = 0; i < count; i++) {
          text[i] = <span key={i} className={`placeholder-text ${dark ? 'dark' : ''}`}>{generateRandWord(length)}</span>
      }
  } else {
      text = <span className={`placeholder-text ${dark ? 'dark' : ''}`}>{generateRandWord(length)}</span>
  }


  return <>{text}</>
}

function generateRandWord(length) {
  return '42'.repeat(randomIntFromInterval(length - 2, length + 2))
}

function randomIntFromInterval(min,max) // min and max included
{
  return Math.floor(Math.random()*(max-min+1)+min);
}

export default PlaceholderText