import React from 'react';
import PlaceholderText from '../Blog/common/PlaceholderText'


const MeCard = ({date}) => {
  if(date) {
    return <LoadedMeCard date={date} />
  } else {
    return <LoadingMeCard />
  }
}

const LoadedMeCard = ({date}) => {
  return ( 
    <div className="me-card">
      <div className="me-card__figure">
        <img src="/profilepic.jpg" alt=""/>
      </div>
      <div className="me-card__info">
        <p className="me-card__name">Sinan Aksay</p>
        <p className="me-card__date">on {date}</p>
      </div>
    </div>
   );
}

const LoadingMeCard = ()  => {
  return ( 
    <div className="me-card">
      <div className="me-card__figure">
        <img alt=""/>
      </div>
      <div className="me-card__info">
        <p className="me-card__name">
          <PlaceholderText length={5} />
        </p>
        <p className="me-card__date"><PlaceholderText length={3} /></p>
      </div>
    </div>
   );
}
 
export default MeCard;