import React from 'react';

class ShowGifs extends React.Component {

  constructor() {
    super();
    this.state = {
      gifs: []
    };
  }

  render() {
    let images = this.props.gifs.map(function(img) {
      return (
        <div key={img.name}>
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
}

ShowGifs.propTypes = {
  gifs: React.PropTypes.array
};

export default ShowGifs;
