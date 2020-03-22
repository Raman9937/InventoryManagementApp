import React, { Fragment } from "react";

const Ratting = props => {
  const { value, handelChange } = props;
  return (
    <Fragment>
      <div className="ratting">
        <div className="navbar navbar-dark bg-primary text-white mb-3">
          Rating
        </div>

        <div className="form-group">
          <select
            value={value}
            onChange={handelChange}
            className="form-control"
            id="exampleFormControlSelect1"
            name="rating"
          >
            <option value="">Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
      </div>
    </Fragment>
  );
};

export default Ratting;
