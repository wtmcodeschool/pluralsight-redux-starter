import React from 'react';
import ShowGifs from './ShowGifs';
import SearchGifs from './SearchGifs';
import SearchGiphy from './SearchGiphy';

const testGifs = [
  {
    name: "cat",
    description: "grumpy cat",
    url: "https://media.giphy.com/media/gSotjAQJmPTJm/giphy.gif"
  }
];

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      images: testGifs
    };
    this.addNewImage = this.addNewImage.bind(this);
    this.removePic = this.removePic.bind(this);
  }

  addNewImage(img) {
    testGifs.push(img);
    this.setState({images: testGifs});
  }

  removePic(img){
    let tempArray = this.state.images;
    for(let i=0; i<tempArray.length ; i++){
      if(tempArray[i].name == img.name){
        tempArray.splice(i,1);
      }
    }
    this.setState({images: tempArray});
  }

  render() {
    return (
      <div>
        <SearchGiphy removePic={this.removePic} addNewImage={this.addNewImage}/>
        <SearchGifs addNewImage={this.addNewImage}/>
        <ShowGifs removePic={this.removePic} removeImage={this.addNewImage} gifs={this.state.images} addNewImage={this.addNewImage} noButton/>
      </div>
    );
  }
}

export default App;
