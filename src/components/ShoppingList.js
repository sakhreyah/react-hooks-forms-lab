import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchedItem, setSearchedItem] = useState("")
  const [newItems, setNewItems] = useState(items)
  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }
  function handleSearchedItem(event) {
    setSearchedItem(event.target.value)
  }
  function addItem(newItem) {
    setNewItems([...newItems, newItem]);
  }
  const itemsToDisplay = newItems.filter((item) => {
    if (selectedCategory === "All" && searchedItem === "") return true;
    if (selectedCategory === item.category && searchedItem === "") return true;
    return (item.name.includes(searchedItem) && (item.category === selectedCategory || selectedCategory === "All"));
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={addItem} />
      <Filter onCategoryChange={handleCategoryChange} search={searchedItem} onSearchChange={handleSearchedItem} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
