import "./App.css";

import Login from "./components/Login";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import List from "./components/List";

import Register from "./components/Register";
import CategoryList from "./components/CategoryList";
import AddCategory from "./components/AddCategoey";
import AddProduct from "./components/AddProduct";
import BayList from "./components/BayList";
import AddBuyItem from "./components/AddBuyItem";
import EditProudct from "./components/EditProduct";

function App() {
  return (
    <>
      <NavBar />
      <main className="App-main">
        <Routes>
          <Route path='add-product' element={<AddProduct />} />
          <Route path="" element={<List />} />
          <Route path="list" element={<List />} />
          <Route path="register" element={<Register />} />
          <Route path="categoryList" element={<CategoryList />} />
          <Route path="addCategory" element={<AddCategory />} />
          <Route path="login" element={<Login />} />
          <Route path='bayList/:Id' element={<BayList />}></Route>
          <Route path='editProduct/:Id' element={<EditProudct />}></Route>
          <Route path="addBuyItem" element={<AddBuyItem />}></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
