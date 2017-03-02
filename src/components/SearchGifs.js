import React from 'react';

class SearchGifs extends React.Component {

  constructor() {
    super();
    this.state = {
      name: "",
      url: "",
      description: ""
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleNewGif = this.handleNewGif.bind(this);
  }

  handleNameChange(e) {
    this.setState({name: e.target.value});
  }
  handleUrlChange(e) {
    this.setState({url: e.target.value});
  }
  handleDescriptionChange(e) {
    this.setState({
      description: e.target.value});
  }

  handleNewGif(event) {
    event.preventDefault();
    this.props.addNewImage(this.state);
  }

  render() {
    return (
      <form method="" role="form">
          <legend>Add New Gif</legend>

          <div className="form-group">
            <input onChange={this.handleNameChange} value={this.state.name} type="text" className="form-control" id="keyword" placeholder="keyword"/>
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
