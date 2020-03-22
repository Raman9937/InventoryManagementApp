import React from "react";

const ProductStock = props => {
  return (
    <div className=" bg-secondary text-white mb-3 text-center p-2">
      Product Count : {props.count}
    </div>
  );
};

export default ProductStock;
