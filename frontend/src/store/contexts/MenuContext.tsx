import React, { useState, useEffect, createContext } from "react";
import { deleteMenu, updateMenu } from "requests/menu";
import { Menu } from "types/Menu";
import { getStoragedObject } from "utils/store";

interface MenuContextData {
  itens: Menu[];
  setItens: Function;
  updateItem: Function;
  removeItem: Function;
  bag: Menu[];
  addToBag: Function;
  removeFromBag: Function;
  emptyBag: Function;
}

export const MenuContext = createContext<MenuContextData>(
  {} as MenuContextData
);

const MenuProvider = (props: { children: React.ReactNode }) => {
  const [itens, setRawItens] = useState<Menu[]>([]);
  const [bag, setBag] = useState<Menu[]>([]);

  const setItens = (itens: Menu[]) => {
    setRawItens(itens);
    localStorage.setItem("itens", JSON.stringify(itens));
  };

  const addToBag = async (item: Menu) => {
    if (item.quant > 0) {
      bag.push(item);
      setBag([...bag]);
      localStorage.setItem("bag", JSON.stringify(bag));
    }
  };

  const removeFromBag = async (itemToRemove: Menu) => {
    let filteredBag = bag.filter((item) => item.id !== itemToRemove.id);
    setBag(filteredBag);
    localStorage.setItem("bag", JSON.stringify(filteredBag));
  };

  const updateItem = async (item: Menu) => {
    if (!item) return;
    item = normalizeItem(item);
    let updatedItem = await updateMenu(item);
    if (updatedItem) {
      let updatedItens = itens.map((item) => {
        if (item.id === updatedItem.id) {
          item = updatedItem;
        }
        return item;
      });
      setItens(updatedItens);
      localStorage.setItem("bag", JSON.stringify(updatedItens));
    }
  };

  const normalizeItem = (item: Menu) => {
    item.quant = Number(item.quant);
    item.price = Number(item.price);
    return item;
  };

  const removeItem = async (itemToRemove: Menu) => {
    let deletedItem = await deleteMenu(itemToRemove);
    if (deletedItem) {
      let filteredItens = itens.filter((order) => order.id !== itemToRemove.id);
      setItens(filteredItens);
      localStorage.setItem("bag", JSON.stringify(filteredItens));
    }
  };

  const emptyBag = () => {
    setBag([]);
    localStorage.removeItem("bag");
  };

  useEffect(() => {
    const loadStoragedData = () => {
      const storagedBag = getStoragedObject("bag");
      if (storagedBag) setBag(JSON.parse(storagedBag));
    };
    loadStoragedData();
  }, []);

  return (
    <MenuContext.Provider
      value={{
        itens,
        setItens,
        updateItem,
        removeItem,
        bag,
        addToBag,
        removeFromBag,
        emptyBag,
      }}
    >
      {props.children}
    </MenuContext.Provider>
  );
};

export default MenuProvider;
