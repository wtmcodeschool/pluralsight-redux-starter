import React from 'react';
import {observer , inject} from 'mobx-react';
import ImageComponent from './ImageComponent';

class PersonalLibrary extends React.Component {

   constructor() {
     super();
     
     this.prepareImages = this.prepareImages.bind(this);
   }

  prepareImages() {
    return this.props.imageStore.library.map(function(img) {
      if(img.user._id == this.props.userStore._id  || this.props.userStore.isadmin){
        return(<ImageComponent
               key={img._id}
               imageinfo={img}
               typeofdisplay="library"/>
             );
      }else{
        return(null);
      }
    }, this);
  }

   render() {
     return (
       <div className="col-md-12">
        {this.prepareImages()}
       </div>
     );
   }
}

PersonalLibrary.propTypes = {
  imageStore: React.PropTypes.object,
  userStore: React.PropTypes.object
};

export default inject('imageStore', 'userStore')(observer(PersonalLibrary));
