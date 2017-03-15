import { extendObservable } from 'mobx';
import ImageComponent from '../components/ImageComponent';
import React from 'react';

export default class ImageStore {
  constructor() {
    extendObservable(this, {
      library: [],
      searchresults: []
    });

    this.fetchLibrary = this.fetchLibrary.bind(this);
    this.saveToLibrary = this.saveToLibrary.bind(this);
    this.newGiphySearch = this.newGiphySearch.bind(this);
    this.convertToShowGifs = this.convertToShowGifs.bind(this);
  }

  fetchLibrary(){
    fetch(`/gifs`)
    .then(result => result.json())
    .then(data => {this.library = data;});
  }

  removeFromLibrary(img){
    fetch('/gifs'+img._id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(this.library = this.library.filter(function(x){
      return x._id != img._id;
    }));
  }

  saveToLibrary(incomingimage, userid, username){
    let img = incomingimage;
    img.user._id = userid;
    img.user = {_id: userid, name: username};
    fetch(`/gifs`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: img.name,
        url: img.url,
        description: img.description,
        user: {_id: userid, name: username}
      })
    }).then(result => result.json()).then(res => {img._id = res._id;})
      .then(this.library.push(img));
  }

  newGiphySearch(keyword, limit, offset){
    fetch(`http://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=dc6zaTOxFJmzC&limit=${limit}&offset=${offset}`)
      .then(result => result.json())
      .then(data => this.searchresults = this.convertToShowGifs(keyword, data.data));
  }

  removeFromSearchResults(img){
    this.searchresults = this.searchresults.filter(function(x){
      return x.url != img.url;
    });
  }

  convertToShowGifs(keyword, foundImages){
    return foundImages.map(image => ({
      name: image.id,
      url: image.images.original.url,
      description: keyword + " " + image.slug,
      user: {_id: "notyetadded", name: null}
    }));
  }

}
