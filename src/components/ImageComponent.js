import React from 'react';
import { Image, Button, Glyphicon, Thumbnail } from 'react-bootstrap';
import { inject, observer} from 'mobx-react';

class ImageComponent extends React.Component {

   constructor() {
     super();

     this.handleAddNewImageToLibrary = this.handleAddNewImageToLibrary.bind(this);
     this.prepareImageComponent = this.prepareImageComponent.bind(this);
     this.handleRemoveImageFromLibrary = this.handleRemoveImageFromLibrary.bind(this);
   }

   handleAddNewImageToLibrary(e){
     this.props.imageStore.saveToLibrary(this.props.imageinfo, this.props.userStore._id, this.props.userStore.username);
     this.props.imageStore.removeFromSearchResults(this.props.imageinfo);
   }

   handleRemoveImageFromLibrary(e){
     this.props.imageStore.removeFromLibrary(this.props.imageinfo);
   }

   prepareImageComponent(){
     const image = <Image height="300" width="300" src={this.props.imageinfo.url} rounded />;

     if(this.props.userStore.isloggedin && this.props.typeofdisplay == "searchresults"){
       return(
         <div>
           {image}
           <Button onClick={this.handleAddNewImageToLibrary} bsStyle="success" block><Glyphicon glyph="plus-sign"/>   Add To Library</Button>
         </div>
       );
     }else if(this.props.typeofdisplay == "searchresults"){
       return(
         <div>
           {image}
         </div>
       );
     }else if((this.props.userStore.isadmin || this.props.imageinfo.user._id == this.props.userStore._id) && this.props.typeofdisplay == "library"){
       return(
         <div>
           {image}
           <p>This image was added by you!</p>
           <Button onClick={this.handleRemoveImageFromLibrary} bsStyle="danger" block><Glyphicon glyph="remove-circle"/>   Delete</Button>
         </div>
       );
     }else{
        return (
          <div>
            {image}
            <p>Image added by: {this.props.imageinfo.user.name}</p>
          </div>);
     }
   }

   render() {
     const imageDivStyle = {height: "375px"};
     let imageComponent = this.prepareImageComponent();

     return (
       <div style={imageDivStyle} className="text-center col-lg-3 col-md-4 col-sm-6">
       {imageComponent}
      </div>
     );
   }
}

ImageComponent.propTypes = {
  imageinfo: React.PropTypes.object,
  typeofdisplay: React.PropTypes.string,
  imageStore: React.PropTypes.object,
  userStore: React.PropTypes.object
};

export default inject("imageStore", "userStore")(observer(ImageComponent));
