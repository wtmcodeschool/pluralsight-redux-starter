import React from 'react';

class BoxList extends React.Component {

   constructor() {
     super();
     this.state = {boxes: ['one', 'two', 'four']};
   }

   render() {
     return (
       <ul>
       {this.state.boxes.map(function(box) {
         return (
           <li key={box}>{box}</li>
         );}
       )}
       </ul>
     );
   }
}

export default BoxList;
