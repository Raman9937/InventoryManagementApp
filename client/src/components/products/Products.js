import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import ProductDetails from "./ProductDetails";
import ProductStock from "./ProductStock";
import axios from "../../axios";
import Spinner from "./../common/Spinner";
import Alert from "./../common/Alert";

const Products = props => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState("");
  const [product, setProduct] = useState(null);
  const [error, setError] = useState({});

  const [values, setValues] = useState({
    name: "",
    price: "",
    rating: "",
    id: "",
    message: "",
    messageType: "",
    isSelect: false
  });

  const logout = () => {
    localStorage.removeItem("userAuth");
    props.setAuth(false);
  };

  //handel change
  const handelChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
    setError({});
  };

  //fade out alert

  const fadeAlert = () => {
    setTimeout(() => {
      setValues({
        id: "",
        name: "",
        price: "",
        rating: "",
        message: "",
        messageType: ""
      });
    }, 2000);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/products")
      .then(res => {
        let data = res.data;
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err.response.data.error.statusCode);
        if (err && err.message === "Network Error") {
          setError({
            networkError: "Network Error"
          });
        } else if (err && err.response.data.error.statusCode === 401) {
          props.setAuth(false);
        }
        setLoading(false);
      });
  }, []);

  //On Product List click

  const productListClick = id => {
    let product = products.filter(p => p.id === id);
    setActive(id);
    setProduct(product);
    let data = product[0];
    setValues({
      ...values,
      id: data.id,
      name: data.name,
      price: data.price,
      rating: data.rating,
      isSelect: true
    });
    setError({});
  };

  //handleValidation
  const handleValidation = () => {
    let isValid = true;
    let error = {};
    const { name, price } = values;
    if (!name) {
      isValid = false;
      error.name = "Name Can't be empty";
    }
    if (!price) {
      isValid = false;
      error.price = "price Can't be empty";
    }
    setError(error);
    return isValid;
  };

  //add product

  const addProduct = () => {
    if (handleValidation()) {
      const { name, price, rating } = values;
      let product = {
        name,
        price,
        rating
      };
      axios
        .post("/api/products", product)
        .then(res => {
          setProducts([...products, res.data]);
          setValues({
            id: "",
            name: "",
            price: "",
            rating: "",
            message: "Product added successfully",
            messageType: "success"
          });
          setError({});
          fadeAlert();
        })
        .catch(err => {
          if (err && err.message === "Network Error") {
            setError({
              networkError: "Network Error"
            });
          }
        });
    }
  };

  //Delect Product

  const deleteProduct = id => {
    if (window.confirm("Want to delete")) {
      axios
        .delete(`/api/products/${id}`)
        .then(res => {
          setProducts(products.filter(product => product.id !== id));
          setProduct(null);
          setValues({
            id: "",
            name: "",
            price: "",
            rating: "",
            message: "Product deleted successfully",
            messageType: "error"
          });
          setError({});
          fadeAlert();
        })
        .catch(err => {
          if (err && err.message === "Network Error") {
            setError({
              networkError: "Network Error"
            });
          }
        });
    } else {
      return;
    }
  };
  //update product

  const updateProduct = id => {
    const { name, price, rating } = values;
    let data = { name, price, rating, id };
    if (handleValidation()) {
      axios
        .put(`/api/products/${id}`, data)
        .then(res => {
          let data = res.data;
          setProducts(
            products.map(product => (product.id === data.id ? data : product))
          );
          setValues({
            ...values,
            message: "Product updated successfully",
            messageType: "success"
          });
          setError({});

          setTimeout(() => {
            setValues({
              ...values,
              message: "",
              messageType: ""
            });
          }, 2000);
        })
        .catch(err => {
          if (err && err.message === "Network Error") {
            setError({
              networkError: "Network Error"
            });
          }
        });
    }
  };

  //cancel
  const cancel = () => {
    setProduct(null);
    setActive("");
    setValues({
      id: "",
      name: "",
      price: "",
      rating: ""
    });
  };

  let productContent;

  if (loading) {
    productContent = <Spinner />;
  } else if (products !== null) {
    productContent = (
      <div className="row mt-5">
        <div className="col-md-4">
          <ProductList
            data={products}
            active={active}
            productListClick={productListClick}
          />
        </div>
        <div className="col-md-8">
          {values.message && (
            <Alert message={values.message} messageType={values.messageType} />
          )}

          {products && products.length ? (
            <ProductStock count={products.length} />
          ) : null}

          <ProductDetails
            data={product}
            addProduct={addProduct}
            deleteProduct={deleteProduct}
            updateProduct={updateProduct}
            cancel={cancel}
            values={values}
            setValues={handelChange}
            error={error}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="products container">
      <nav className="navbar navbar-dark bg-primary text-white mb-3">
        <p className="navbar-brand"> Product Manager</p>
        <button
          className="btn logout_btn my-2 my-sm-0 text-white"
          type="button"
          onClick={logout}
        >
          Logout
        </button>
      </nav>

      {error && error.networkError && (
        <p className="text-center">{error.networkError}</p>
      )}

      {productContent}
    </div>
  );
};

export default Products;
