import React from "react";

function HomeSectionCard() {
  return (
    <>
      <div
        className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] 
      mx-3 border border-black"
      >
        <div className="h-[13rem] w-[10rem]">
          <img
            className="object-cover object-top w-full h-full"
            src="https://rukminim2.flixcart.com/image/128/128/xif0q/shirt/j/u/o/s-lstr-white-black-vtexx-original-imagnyewvhdgxgth.jpeg?q=70&crop=false"
            alt=""
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900">Nofilter</h3>
          <p className="mt-2 text-gray-500">Men sloif pure Cotton</p>
        </div>
      </div>
    </>
  );
}

export default HomeSectionCard;
