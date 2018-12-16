import React from 'react';

const LoadingCard = props => {
  return <div className="postCard loadingCard" style={{
    animationDelay: props.animationDelay
  }}>
      <div className="postCard__inner"></div>
  </div>;
};

export default LoadingCard