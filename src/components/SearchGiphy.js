import React from 'react';
import math from 'mathjs';
import ShowGifs from "./ShowGifs";

class SearchGiphy extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      limit: 5,
      random: false,
      offset: '0',
      foundImages: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
    this.handleRandomChange = this.handleRandomChange.bind(this);
    this.removeImage = this.removeImage.bind(this);
  }

  handleSubmit(e) {
    if(this.state.random){
      const newrandom = math.randomInt(100);
      this.setState({offset: newrandom});
    }else{
        this.setState({offset: '0'});
    }
    e.preventDefault();
    fetch(`http://api.giphy.com/v1/gifs/search?q=${this.state.keyword}&api_key=dc6zaTOxFJmzC&limit=${this.state.limit}&offset=${this.state.offset}`)
      .then(result => result.json())
      .then(data => this.setState({
        foundImages: this.convertToShowGifs(this.state.keyword, data.data)}));
  }

  convertToShowGifs(keyword, foundImages){
    return foundImages.map(image => ({
      name: image.id,
      url: image.images.original.url,
      description: keyword + " " + image.slug
    }));
  }

  removeImage(img){
    let tempArray = this.state.foundImages;
    for(let i=0; i<tempArray.length ; i++){
      if(tempArray[i].name == img.name){
        tempArray.splice(i,1);
      }
    }
    this.setState({foundImages: tempArray});
  }

  handleKeywordChange(e) {
    this.setState({keyword: e.target.value});
  }

  handleLimitChange(e) {
    this.setState({limit: e.target.value});
  }

  handleRandomChange(e) {
    const newrandom = !this.state.random;
    this.setState({random: newrandom});
  }

  render() {
    return (
      <div>
        <form method="" role="form">
            <legend>Search Giphy</legend>
            <div>thisdiv</div>
            <div className="form-group">
              <input onChange={this.handleKeywordChange} value={this.state.keyword} type="text" className="form-control" id="keyword" placeholder="keyword"/>
              <input onChange={this.handleLimitChange} value={this.state.limit} type="number" className="form-control" id="limit" placeholder="limit"/>
              <input onChange={this.handleRandomChange} value={this.state.random} type="checkbox"j id="random"/> Randomize
            </div>
            <button onClick={this.handleSubmit} type="submit" className="btn btn-primary">Submit</button>
         </form>
         <ShowGifs removePic={this.props.removePic} removeImage={this.removeImage} addNewImage={this.props.addNewImage} gifs={this.state.foundImages} noButton={false} noDeleteButton/>
       </div>
    );
  }
}

SearchGiphy.propTypes = {
  addNewImage: React.PropTypes.func.isRequired,
  removePic: React.PropTypes.func
};

export default SearchGiphy;
