import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
  });
  const [open, setOpen] = useState(false); // modal open state

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async () => {
    try {
      await addDoc(collection(db, "products"), {
        ...product,
        price: Number(product.price),
        quantity: Number(product.quantity),
        timestamp: serverTimestamp(),
      });
      alert("Product added successfully!");
      setProduct({ name: "", price: "", quantity: "", category: "" });
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        sx={{ mb: 2 }}
      >
        Add New Product
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <TextField
            label="Product Name"
            name="name"
            value={product.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Price (₹)"
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Quantity"
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Category"
            name="category"
            value={product.category}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddProduct} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddProduct;
