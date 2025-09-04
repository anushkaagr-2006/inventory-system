import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const EditProduct = ({ productId, onClose, refreshList }) => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    category: ""
  });
  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", productId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data());
      }
    };
    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "products", productId);
      await updateDoc(docRef, {
        ...product,
        price: Number(product.price),
        quantity: Number(product.quantity)
      });
      alert("Product updated successfully!");
      refreshList();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error updating product");
    }
  };

  return (
    <div style={{ background: "#f0f0f0", padding: "20px", margin: "20px auto", maxWidth: "400px" }}>
      <h3>Edit Product</h3>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          required
        />
        <button type="submit">Update</button>
        <button type="button" onClick={onClose} style={{ marginLeft: "10px" }}>Cancel</button>
      </form>
    </div>
  );
};

export default EditProduct;
