import React from 'react';
import math from 'mathjs';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import {observer, inject} from 'mobx-react';
import ImageComponent from './ImageComponent';

class SearchGiphy extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      limit: 5,
      random: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
    this.handleRandomChange = this.handleRandomChange.bind(this);
    this.prepareImages = this.prepareImages.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let useableoffset;
    if(this.state.random){
      useableoffset = math.randomInt(1000);
    }
    this.props.imageStore.newGiphySearch(this.state.keyword, this.state.limit, useableoffset);
    this.setState({});
  }

  handleKeywordChange(e) {
    this.setState({keyword: e.target.value});
  }

  handleLimitChange(e) {
    this.setState({limit: e.target.value});
  }

  handleRandomChange(e) {
    if(this.state.random)
    {
      this.setState({
        random: false
      });
    }else{
      this.setState({
        random: true
      });
    }
  }

  prepareImages() {
  return this.props.imageStore.searchresults.map(function(img) {
      return(<ImageComponent
             key={img.name}
             imageinfo={img}
             typeofdisplay="searchresults"/>);
    }, this);
  }

  render() {
    return (
      <div>
        <div className="col-md-3">
        </div>
        <div className="col-md-6 well">
          <form>
              <legend>Search Giphy</legend>
              <div className="form-group">
                <label> Keyword</label>
                <input onChange={this.handleKeywordChange} value={this.state.keyword} type="text" className="form-control" id="keyword" placeholder="keyword"/>
              </div>
              <div className="form-group">
                <label>Limit</label>
                <input onChange={this.handleLimitChange} value={this.state.limit} type="number" className="form-control" id="limit" placeholder="limit"/>
              </div>
              <div className="form-group">
                <label> Randomize</label>
                <input onChange={this.handleRandomChange} value={this.state.random} type="checkbox" id="random"/>
              </div>
              <Button onClick={this.handleSubmit} type="submit" className="btn btn-primary">Submit</Button>
           </form>
         </div>
         <div className="col-md-3">
         </div>
         <div className="col-xs-12 well">
           {this.prepareImages()}
         </div>
       </div>
    );
  }
}

SearchGiphy.propTypes = {
  newGiphySearchResults: React.PropTypes.func,
  imageStore: React.PropTypes.object
};

export default inject("imageStore")(observer(SearchGiphy));
