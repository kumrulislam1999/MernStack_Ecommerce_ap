import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/AdminMenu/AdminMenu";

import { Select } from "antd";
const { Option } = Select;

export default function UpdateProduct() {
  // Product UseState Hooks
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  // Get Single Product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );

      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line
  }, []);
  // Get All Categoris
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  // UseEffect hooks For
  useEffect(() => {
    getAllCategory();
  }, []);

  // UpdateProductHandler Create Product

  const updateProductHander = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // DeleteProductHandler Delete Product
  const deleteProductHandler = async (e) => {
    try {
      let answer = window.prompt("Are you sure want to delete this Product?");
      if (!answer) return;
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
      );

      toast.success(data.message);
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in Deleting Product");
    }
  };

  return (
    <Layout title={"Update Product - Online Shop"}>
      <div id="createProduct">
        <Container>
          <Row className="rowBox">
            <Col lg="3">
              <AdminMenu />
            </Col>
            <Col lg="9" className="g-0">
              <div className="contentBox">
                <div className="profileCart">
                  <h1>Update Product</h1>
                  <div>
                    <Select
                      variant={false}
                      placeholder="Select A Category"
                      size="large"
                      showSearch
                      className="form-select mb-3"
                      onChange={(value) => {
                        setCategory(value);
                      }}
                      value={category}
                    >
                      {categories?.map((c) => (
                        <Option key={c._id} value={c._id}>
                          {c.name}
                        </Option>
                      ))}
                    </Select>
                    <div className="mb-3">
                      <label
                        htmlFor="upload"
                        className="btn btn-outline-secondary col-md-12"
                      >
                        {photo ? photo.name : "Upload Photo"}
                        <input
                          type="file"
                          name="photo"
                          id="upload"
                          accept="image/*"
                          onChange={(e) => setPhoto(e.target.files[0])}
                          hidden
                        />
                      </label>
                    </div>
                    <div className="mb-3">
                      {photo ? (
                        <div className="text-center">
                          <img
                            src={URL.createObjectURL(photo)}
                            alt="Product Photo"
                            className="img img-responsive"
                            style={{
                              width: "300px",
                              height: "250px",
                            }}
                          />
                        </div>
                      ) : (
                        <div className="text-center">
                          <img
                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
                            alt="Product Photo"
                            className="img img-responsive"
                            style={{
                              width: "300px",
                              height: "250px",
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="inputBox">
                      <input
                        type="text"
                        placeholder="Write Product Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="inputBox">
                      <input
                        type="text"
                        placeholder="Write Product Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className="inputBox">
                      <input
                        type="number"
                        placeholder="Write Product Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>

                    <div className="inputBox">
                      <input
                        type="number"
                        placeholder="Write Product Quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </div>
                    <div className="inputBox">
                      <Select
                        variant={false}
                        placeholder="Select Shipping"
                        size="lart"
                        showSearch
                        onChange={(value) => {
                          setShipping(value);
                        }}
                        value={shipping ? "Yes" : "No"}
                      >
                        <Option value="0">No</Option>
                        <Option value="1">Yes</Option>
                      </Select>
                    </div>
                    <div>
                      <button
                        className="btn btn-primary"
                        onClick={updateProductHander}
                      >
                        Update Product
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={deleteProductHandler}
                      >
                        Delete Product
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
