const shoppingList = document.querySelector(".shopping_list");
const inputTextItem = document.querySelector(".input_text_item");
const addBtn = document.querySelector(".add_btn");

function appendItem() {
  const itemText = inputTextItem.value;

  if (!itemText) {
    inputTextItem.focus();
    return;
  }

  const newItem = createItem(itemText);
  shoppingList.append(newItem);
  inputTextItem.value = "";
  inputTextItem.focus();
  newItem.scrollIntoView();
}

function createItem(text) {
  const item = document.createElement("li");
  item.setAttribute("class", "shopping_item");
  item.innerHTML = `<span class="item_text">${text}</span>`;

  const deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("class", "remove_btn");
  deleteBtn.addEventListener("click", () => item.remove());
  deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;

  item.append(deleteBtn);
  return item;
}

inputTextItem.addEventListener("keyup", (e) => {
  if (e.key == "Enter") appendItem();
});

addBtn.addEventListener("click", () => appendItem());
