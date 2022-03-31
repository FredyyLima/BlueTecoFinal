import React from "react";
import "./App.css";
import Login from "./components/Login";
import AuthProvider from "store/contexts/AuthContext";
import { HashRouter, Route, Routes } from "react-router-dom";
import Menu from "components/Menu";
import MenuProvider from "store/contexts/MenuContext";
import TableProvider from "store/contexts/TableContext";
import User from "components/User";
import Item from "components/Item";
import ItensTable from "components/Item/Table";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <MenuProvider>
          <TableProvider>
            <HashRouter>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/user" element={<User />} />
                <Route path="/item" element={<Item />} />
                <Route path="/itens" element={<ItensTable />} />
              </Routes>
            </HashRouter>
          </TableProvider>
        </MenuProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
