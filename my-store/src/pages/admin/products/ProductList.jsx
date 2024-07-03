import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("desc");
  const productsPerPage = 5;

  function getProducts() {
    let url = `http://localhost:4000/products?_sort=${sortField}&_order=${sortOrder}&_page=${currentPage}&_limit=${productsPerPage}`;
    // let url = `http://localhost:4000/products?_sort=id&_order=desc&_page=${currentPage}&_limit=${productsPerPage}`;
    if (searchQuery) {
      url += `&q=${searchQuery}`;
    }
    fetch(url)
      .then((response) => {
        if (response.ok) {
          const totalCount = response.headers.get("X-Total-Count");
          setTotalPages(Math.ceil(totalCount / productsPerPage));
          return response.json();
        }

        throw new Error();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        alert("Unable to fetch the data", error);
      });
  }

  useEffect(() => {
    getProducts();
  }, [searchQuery, currentPage, sortField, sortOrder]);

  function handleDelete(id) {
    fetch("http://localhost:4000/products/" + id, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        alert("Product deleted successfully");
        getProducts();
      })
      .catch((error) => {
        alert("Unable to delete the product", error);
      });
  }

  function handlePageChange(newPage) {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  }

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Products</h2>

      <div className="row mb-3">
        <div className="col">
          <Link
            className="btn btn-primary me-1"
            to="/admin/products/create"
            role="button"
          >
            Create Product
          </Link>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={getProducts}
          >
            Refresh
          </button>
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Sort By</label>
          <select
            className="form-select"
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <option value="id">ID</option>
            <option value="name">Name</option>
            <option value="brand">Brand</option>
            <option value="category">Category</option>
            <option value="price">Price</option>
            <option value="createdAt">Created At</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Order</label>
          <select
            className="form-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Price</th>
            <th>Image</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <tr key={index}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>
                  <img
                    src={
                      "http://localhost:4000/images/" + product.imageFileName
                    }
                    width="100"
                    alt="image"
                  />
                </td>
                <td>{product.createdAt.slice(0, 10)}</td>
                <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                  <Link
                    className="btn btn-info btn-sm me-1"
                    to={"/admin/products/view/" + product.id}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-primary btn-sm me-1"
                    to={"/admin/products/update/" + product.id}
                  >
                    Update
                  </Link>

                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="d-flex justify-content-between">
        <button
          className="btn btn-outline-secondary"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-outline-secondary"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
