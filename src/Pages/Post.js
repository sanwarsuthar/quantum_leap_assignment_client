import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Modal from "react-modal";
import Layout from "../Components/Layout";
import useRequest from "../hooks/useRequest";

const Post = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setError,
  } = useForm();

  const {
    handleSubmit: handleSubmitUpdate,
    register: registerUpdate,
    formState: { errors: errorUpdate },
    reset: resetUpdate,
  } = useForm();

  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);

  const { request: requestCreate, response: responseCreate } = useRequest();

  const { request: requestData, response: responseData } = useRequest();

  const { request: requestDelete, response: responseDelete } = useRequest();

  const { request: requestUpdate, response: responseUpdate } = useRequest();

  const STATUS_OPTIONS = ["draft", "published", "scheduled"];

  const [editData, setEditData] = useState({
    title: "",
    _id: "",
    content: "",
    status: "",
  });

  const openCreateModal = () => setIsOpenCreateModal(true);

  const closeAddModal = () => {
    setIsOpenCreateModal(false);
  };

  const openUpdateModal = () => setIsOpenUpdateModal(true);

  const closeUpdateModal = () => {
    setIsOpenUpdateModal(false);
  };

  const onSubmitAddForm = (data) => {
    requestCreate("POST", "posts", data);
  };

  useEffect(() => {
    if (responseCreate) {
      if (responseCreate?.status) {
        toast.success(responseCreate?.message);
        setData((prevData) => [...prevData, responseCreate.post]);
        reset();
        setIsOpenCreateModal(false);
      }
    }
  }, [responseCreate]);

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    requestData("GET", "posts/my-posts");
  }, []);

  useEffect(() => {
    if (responseData) {
      setData(responseData?.posts);
    }
  }, [responseData]);

  const filteredData = data?.filter(
    (item) =>
      item?.content?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      item?.status?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      item?.title?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  const deleteHandler = (id) => {
    requestDelete("DELETE", `posts/${id}`, { id });
  };

  useEffect(() => {
    if (responseDelete) {
      setData((prevData) =>
        prevData.filter((post) => post._id !== responseDelete.id)
      );
      toast.success(responseDelete?.message);
    }
  }, [responseDelete]);

  const editHandler = (item) => {
    resetUpdate();
    console.log(item, "editData");
    openUpdateModal();

    setEditData(item);
  };

  const onSubmitUpdateForm = (data) => {
 
    requestUpdate("PUT", `posts/${editData?._id}`, data);
  };

  useEffect(() => {
    if (responseUpdate) {
      if (responseUpdate?.status) {
        toast.success(responseUpdate?.message);
        setData((prevData) =>
          prevData.map((post) =>
            post._id === responseUpdate.post._id ? responseUpdate.post : post
          )
        );
        reset();
        setIsOpenUpdateModal(false);
      }
    }
  }, [responseUpdate]);
  return (
    <Layout>
      <div className="dashboard-wrapper">
        <div className="container mt-4">
          <h2>My Posts List</h2>
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-6 d-flex justify-content-end">
              <button
                className=" btn-sm btn-primary py-0 "
                onClick={openCreateModal}
              >
                Add Post
              </button>
            </div>
          </div>
          <div className="row">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title </th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData?.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={item?._id || index}>
                      <td>{index + 1}</td>
                      <td>{item.title}</td>
                      <td>{item.content}</td>
                      <td>{item.status}</td>
                      <td>
                        {" "}
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => editHandler(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteHandler(item?._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <Modal
          isOpen={isOpenCreateModal}
          onRequestClose={closeAddModal}
          className="modification-request-modal"
        >
          <div className="modal-header">
            <h1 className="modal-title">Add Post</h1>
            <button
              className="close-button"
              onClick={closeAddModal}
              aria-label="Close Modal"
            >
              &times;
            </button>
          </div>
          <div className="modal-body">
            <form
              className="form_input_box"
              onSubmit={handleSubmit(onSubmitAddForm)}
            >
              <div className="row">
                <div className="col-12">
                  <div className="form-group floating-group">
                    <label className="floating-label">Title</label>
                    <input
                      type="text"
                      className="form-control floating-control"
                      placeholder="Enter Title"
                      {...register("title", {
                        required: "Title field is required.",
                        setValueAs: (v) => v.trim(),
                      })}
                    />
                    {errors?.title && (
                      <span className="invalid-feedback">
                        {errors.title.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-group floating-group">
                    <label className="floating-label">Description</label>
                    <textarea
                      className="form-control floating-control"
                      placeholder="Enter Description"
                      {...register("content", {
                        required: "Description field is required.",
                        setValueAs: (v) => v.trim(),
                      })}
                    />
                    {errors?.content && (
                      <span className="invalid-feedback">
                        {errors.content.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-group floating-group">
                    <label className="floating-label">Status</label>
                    <select
                      className="form-control floating-control"
                      {...register("status", {
                        required: "Status field is required.",
                      })}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select Status
                      </option>
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors?.status && (
                      <span className="invalid-feedback">
                        {errors.status.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-6">
                  <div className="button-box">
                    <button type="submit" className="btn-primary w-100">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Modal>

        <Modal
          isOpen={isOpenUpdateModal}
          onRequestClose={closeUpdateModal}
          className="modification-request-modal"
        >
          <div className="modal-header">
            <h1 className="modal-title">Update Post</h1>
            <button
              className="close-button"
              onClick={closeUpdateModal}
              aria-label="Close Modal"
            >
              &times;
            </button>
          </div>
          <div className="modal-body">
            <form
              className="form_input_box"
              onSubmit={handleSubmitUpdate(onSubmitUpdateForm)}
            >
              <div className="row">
                <div className="col-12">
                  <div className="form-group floating-group">
                    <label className="floating-label">Title</label>
                    <input
                      type="text"
                      className="form-control floating-control"
                      placeholder="Enter Title"
                      defaultValue={editData?.title}
                      {...registerUpdate("title", {
                        required: "Title field is required.",
                        setValueAs: (v) => v.trim(),
                      })}
                    />
                    {errors?.title && (
                      <span className="invalid-feedback">
                        {errors.title.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-group floating-group">
                    <label className="floating-label">Description</label>
                    <textarea
                      className="form-control floating-control"
                      placeholder="Enter Description"
                      defaultValue={editData?.content}
                      {...registerUpdate("content", {
                        required: "Description field is required.",
                        setValueAs: (v) => v.trim(),
                      })}
                    />
                    {errors?.content && (
                      <span className="invalid-feedback">
                        {errors.content.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-group floating-group">
                    <label className="floating-label">Status</label>
                    <select
                      className="form-control floating-control"
                      defaultValue={editData?.status || ""}
                      {...registerUpdate("status", {
                        required: "Status field is required.",
                      })}
                    >
                      <option value="" disabled>
                        Select Status
                      </option>
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors?.status && (
                      <span className="invalid-feedback">
                        {errors.status.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-6">
                  <div className="button-box">
                    <button type="submit" className="btn-primary btn-sm w-100">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};
export default Post;
