import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  MenuItem,
} from "@mui/material";

const categories = ["Electronics", "Fruits", "Personal Care", "Grocery", "Poultry", "Stationery", "Dairy", "Bakery"];

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [editProduct, setEditProduct] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  
  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setProducts(items);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  };

  
  const handleEdit = (product) => {
    setEditProduct(product);
    setOpenEdit(true);
  };

  
  const handleUpdate = async () => {
    const productRef = doc(db, "products", editProduct.id);
    await updateDoc(productRef, {
      name: editProduct.name,
      price: Number(editProduct.price),
      quantity: Number(editProduct.quantity),
      category: editProduct.category,
    });
    setOpenEdit(false);
    fetchProducts();
  };

  const handleChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory ? p.category === filterCategory : true)
  );

  return (
    <div>
      {/* Search & Filter */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 3 }}>
        <TextField
          label="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />
        <TextField
          select
          label="Filter by category"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          fullWidth
        >
          <MenuItem value="">All</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      {/* Products List */}
      {filteredProducts.map((p) => (
        <Card key={p.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{p.name}</Typography>
            <Typography>Price: ₹{p.price}</Typography>
            <Typography>Quantity: {p.quantity}</Typography>
            <Typography>Category: {p.category}</Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <Button variant="contained" color="primary" onClick={() => handleEdit(p)}>
                Edit
              </Button>
              <Button variant="contained" color="error" onClick={() => handleDelete(p.id)}>
                Delete
              </Button>
            </Stack>
          </CardContent>
        </Card>
      ))}

      {/* Edit Modal */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          {editProduct && (
            <>
              <TextField
                label="Product Name"
                name="name"
                value={editProduct.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Price (₹)"
                type="number"
                name="price"
                value={editProduct.price}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Quantity"
                type="number"
                name="quantity"
                value={editProduct.quantity}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                select
                label="Category"
                name="category"
                value={editProduct.category}
                onChange={handleChange}
                fullWidth
                margin="normal"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductList;
