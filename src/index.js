import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import ShowGifs from './components/ShowGifs';
import SearchGifs from './components/SearchGifs';

const testGifs = [
  {
    name: "cat",
    description: "grumpy cat",
    url: "https://media.giphy.com/media/gSotjAQJmPTJm/giphy.gif"
  }
];

class App extends React.Component {
  render() {
    return (
      <div>
        <SearchGifs/>
        <ShowGifs gifs={testGifs}/>
      </div>
    );
  }
}

ReactDOM.render(<App/>,
  document.getElementById('app'));
