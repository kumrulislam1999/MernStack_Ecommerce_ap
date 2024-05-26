import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/AdminMenu/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";

export default function CreateCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // CategoryFormHandleSubmit Create Category
  const categoryHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name }
      );
      if (data.success) {
        toast.success(`${data.category.name} is Created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  // Get All Category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went wrong in getting Category ");
    }
  };

  // Essential Recycling UseEffect
  useEffect(() => {
    getAllCategory();
  }, []);

  // CategoryUpdateHandler Update Category
  const categoryUpdateHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is Updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in Updating Category");
    }
  };

  // CategoryDeleteHandler Delete Category
  const categoryDeleteHandler = async (pid) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${pid}`
      );
      if (data.success) {
        toast.success(`Category is Deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in Updating Category");
    }
  };

  return (
    <Layout title={"Create Category - Online Shop"}>
      <div id="createCategory">
        <Container>
          <Row className="rowBox">
            <Col lg="3">
              <AdminMenu />
            </Col>
            <Col lg="9" className="g-0">
              <div className="contentBox">
                <h2>Manage Category</h2>
                <div className="addCategoryBox">
                  <CategoryForm
                    categoryHandleSubmit={categoryHandleSubmit}
                    value={name}
                    setValue={setName}
                  />
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th className="col">Name</th>
                      <th className="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories?.map((c) => (
                      <tr key={c._id}>
                        <td>{c.name}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              categoryDeleteHandler(c._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Modal
                  onCancel={() => setVisible(false)}
                  footer={null}
                  open={visible}
                >
                  <CategoryForm
                    value={updatedName}
                    setValue={setUpdatedName}
                    categoryHandleSubmit={categoryUpdateHandler}
                  />
                </Modal>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
