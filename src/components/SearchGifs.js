import React from 'react';

class SearchGifs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      url: "",
      description: ""
    };
    this.handleNewGif = this.handleNewGif.bind(this);
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  handleNewGif(e) {
    e.preventDefault();
    this.props.addNewImage(this.state);
  }

  handleKeywordChange(e) {
    this.setState({name: e.target.value});
  }

  handleUrlChange(e) {
    this.setState({url: e.target.value});
  }

  handleDescriptionChange(e) {
    this.setState({description: e.target.value});
  }

  render() {
    return (
      <form method="" role="form">
          <legend>Add New Gif</legend>

          <div className="form-group">
            <input onChange={this.handleKeywordChange} value={this.state.name} type="text" className="form-control" id="keyword" placeholder="keyword"/>
          </div>

          <div className="form-group">
            <input onChange={this.handleUrlChange} value={this.state.url}type="text" className="form-control" id="url" placeholder="url"/>
          </div>

          <div className="form-group">
            <input onChange={this.handleDescriptionChange} value={this.state.description} type="text" className="form-control" id="description" placeholder="description"/>
          </div>

          <button onClick={this.handleNewGif} type="submit" className="btn btn-primary">Submit</button>
       </form>
    );
  }
}

SearchGifs.propTypes = {
  addNewImage: React.PropTypes.func
};

export default SearchGifs;
