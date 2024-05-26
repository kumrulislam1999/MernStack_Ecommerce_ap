import React from "react";
import { useSearch } from "../../context/search";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SearchInput() {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  // Handle Search Submit
  const HandleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`
      );

      setValues({ ...values, results: data });

      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="searchBox">
      <form role="search" onSubmit={HandleSearchSubmit}>
        <div className="input_group">
          <input
            type="search"
            placeholder="Search"
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          />
          <button type="submit" className="btn btn-outline-success">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
