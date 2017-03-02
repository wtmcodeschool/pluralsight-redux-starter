import React from 'react';

ShowGifs.propTypes = {
  gifs: React.PropTypes.array
};

export default function ShowGifs(props) {
  let images = props.gifs.map(function(img, index) {
    return (
      <div key={index}>
        <img src={img.url}></img>
        <h3>{img.description}</h3>
      </div>
    );
  });
  return (
    <div>
      {images}
    </div>
  );
}
