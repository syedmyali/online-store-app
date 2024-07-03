import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/products/" + id)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error();
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        alert("Unable to fetch product details", error);
      });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid my-4 ">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-4">
          <div className="card">
            <img
              src={"http://localhost:4000/images/" + product.imageFileName}
              className="card-img-top"
              alt="product"
            />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">
                <strong>Brand:</strong> {product.brand}
              </p>
              <p className="card-text">
                <strong>Category:</strong> {product.category}
              </p>
              <p className="card-text">
                <strong>Price:</strong> ${product.price}
              </p>
              <p className="card-text">
                <strong>Description:</strong> {product.description}
              </p>
              <p className="card-text">
                <strong>Created At:</strong> {product.createdAt.slice(0, 10)}
              </p>
              <Link to="/admin/products" className="btn btn-primary">
                Back to Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
