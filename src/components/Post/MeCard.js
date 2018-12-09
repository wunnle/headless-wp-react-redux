import React from 'react';

const MeCard = ({date}) => {
  return ( 
    <div className="me-card">
      <div className="me-card__figure">
        <img src="https://scontent-mxp1-1.cdninstagram.com/vp/351d5e9e0a5e175fe5c034be16953aa6/5CAE6ED5/t51.2885-19/s150x150/36580909_2067541450163006_3309749369355370496_n.jpg?_nc_ht=scontent-mxp1-1.cdninstagram.com" alt=""/>
      </div>
      <div className="me-card__info">
        <p className="me-card__name">Sinan Aksay</p>
        <p className="me-card__date">on {date}</p>
      </div>
    </div>
   );
}
 
export default MeCard;