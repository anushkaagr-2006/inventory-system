import React, { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import { Button, Typography } from "@mui/material";
import "./App.css";

function App() {
  const { user, logout } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(true); 
  return (
    <div className={`app-container ${!user ? "auth-bg" : ""}`}>
      {!user ? (
        <div className="auth-wrapper">
          {showLogin ? <Login /> : <Signup />}
          <Typography
            sx={{ mt: 2, cursor: "pointer", textAlign: "center" }}
            onClick={() => setShowLogin(!showLogin)}
          >
            {showLogin
              ? "Don't have an account? Signup"
              : "Already have an account? Login"}
          </Typography>
        </div>
      ) : (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px" }}>
            <Typography variant="h4">Inventory Management System</Typography>
            <Button variant="contained" color="secondary" onClick={logout}>
              Logout
            </Button>
          </div>
          <AddProduct />
          <ProductList />
        </div>
      )}
    </div>
  );
}

export default App;
