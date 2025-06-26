import React from 'react';
import back1 from "../assets/cover12.jpg";
import back2 from "../assets/cover11.jpg"
import back3 from "../assets/cover9.jpg"
import back4 from "../assets/cover10.jpg"


function Backgound({ heroCount }) {
  const images = [back2, back1, back3, back4];
  const selectedImage = images[heroCount];

  return (
    <div className="absolute w-full h-full top-0 left-0 z-0 bg-black">
      <img
        src={selectedImage}
        alt="Hero background"
        className="w-full h-full object-contain md:object-cover object-center"
      />
    </div>
  );
}

export default Backgound;
