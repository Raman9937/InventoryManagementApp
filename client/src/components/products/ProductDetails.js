import React, { Fragment } from "react";
import Ratting from "./Ratting";

const ProductDetails = props => {
  const {
    addProduct,
    deleteProduct,
    updateProduct,
    cancel,
    values,
    setValues,
    error
  } = props;

  const { name, price, rating, id, isSelect } = values;

  return (
    <Fragment>
      <div className="product_details">
        <div className="navbar navbar-dark bg-primary text-white mb-3">
          <p>Product Details</p>
          {name && <p>{name}</p>}
        </div>

        <div className="product_form">
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="name"
                name="name"
                className="form-control"
                value={name}
                onChange={setValues}
              />
              {error && error.name && <div className="error">{error.name}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Price</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">$</span>
                </div>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  value={price}
                  onChange={setValues}
                />
              </div>
              {error && error.price && (
                <div className="error">{error.price}</div>
              )}
            </div>
            <Ratting value={rating} handelChange={setValues} />

            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-primary"
                onClick={addProduct}
              >
                Add
              </button>
              {isSelect && (
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => updateProduct(id)}
                >
                  Save
                </button>
              )}
              {isSelect && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteProduct(id)}
                >
                  Delete
                </button>
              )}

              <button
                type="button"
                className="btn btn-warning text-white"
                onClick={cancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductDetails;
