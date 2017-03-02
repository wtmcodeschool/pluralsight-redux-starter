import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import ShowGifs from './components/ShowGifs';
import SearchGifs from './components/SearchGifs';
import util from 'util';

const testGifs = [
  {
    name: "cat",
    description: "grumpy cat",
    url: "https://media.giphy.com/media/gSotjAQJmPTJm/giphy.gif"
  }
];

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      images: testGifs
    };
    this.addNewImage = this.addNewImage.bind(this);
  }

  addNewImage(img) {
    testGifs.push(img);
    this.setState({images: testGifs});
  }

  render() {
    return (
      <div>
        <SearchGifs addNewImage={this.addNewImage}/>
        <ShowGifs gifs={this.state.images}/>
      </div>
    );
  }
}

ReactDOM.render(<App/>,
  document.getElementById('app'));
