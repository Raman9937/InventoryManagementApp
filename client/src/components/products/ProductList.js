import React from "react";

const ProductList = props => {
  const { data, active, productListClick } = props;
  return (
    <div className="product__list">
      <div className="navbar navbar-dark bg-primary text-white mb-3">
        Products
      </div>
      <div className="list">
        <ul>
          {data.map(product => (
            <li
              className={`d-flex justify-content-between ${
                product.id === active ? "active" : ""
              }`}
              key={product.id}
              onClick={() => productListClick(product.id)}
            >
              <p>{product.name}</p>
              <p>${product.price}</p>
            </li>
          ))}
          {data && data.length < 1 ? <li>No Product avalible</li> : null}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
