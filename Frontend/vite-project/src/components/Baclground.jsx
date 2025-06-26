import React from 'react';
import back1 from "../assets/cover12.jpg";
import back2 from "../assets/cover11.jpg"
import back3 from "../assets/cover9.jpg"
import back4 from "../assets/cover13.jpg"


function Backgound({ heroCount }) {
  const images = [back2, back1, back3, back4];
  const selectedImage = images[heroCount];

  return (
    <div className="absolute w-full h-full top-0 left-0 z-0 bg-white">
    <img
  src={selectedImage}
  alt="Hero background"
  className="w-full h-full object-cover sm:object-center object-top"
/>

    </div>
  );
}


export default Backgound;
