const inputAdd = [...document.querySelectorAll(".input-header")];
const inputDataR = document.querySelector(".input-dataR");
const btnAdd = document.querySelector(".btn-add");
const blockList = document.querySelector(".table-tbody");
const btnSearch = document.querySelector(".btn-search");
const btnReturn = document.querySelector(".btn-return");
const inputSearch = document.querySelector(".input-search");
let resultRow;

btnAdd.addEventListener("click", (evt) => {
  evt.preventDefault();
  if (checkInput(inputAdd) === false) {
    alert(`Не заполнены поля ввода!`);
    return;
  }
  addData(inputAdd);
  resultRow.appendChild(createDel());
  saveToLocalStore();
});

btnSearch.addEventListener("click", (evt) => {
  evt.preventDefault();
  let newTr = document.querySelector(".block__tr");
  for (let i = 0; i < blockList.rows.length; i++) {
    blockList.rows[i].style.visibility = "hidden";
    blockList.rows[i].style.position = "absolute";
    for (let j = 0; j < newTr.childNodes.length - 1; j++) {
      if (inputSearch.value === blockList.rows[i].childNodes[j].textContent) {
        blockList.rows[i].style.visibility = "visible";
        blockList.rows[i].style.position = "relative";
      }
    }
  }
});

btnReturn.addEventListener("click", (evt) => {
  evt.preventDefault();
  for (let i = 0; i < blockList.rows.length; i++) {
    blockList.rows[i].style.visibility = "visible";
    blockList.rows[i].style.position = "relative";
  }
});

function saveToLocalStore() {
  const dataRows = document.querySelectorAll(".block__tr");
  const data = getData(dataRows);
  localStorage.setItem("key", JSON.stringify(data));
}

function checkInput(input) {
  for (let i = 0; i < input.length; i++) {
    if (input[i].value === "") {
      return false;
    }
  }
  return true;
}

function createRow() {
  let newTr = document.createElement("tr");
  newTr.className = "block__tr";
  return newTr;
}

function createBlock() {
  let newTd = document.createElement("td");
  newTd.className = "block__td";
  return newTd;
}

function createDel() {
  let deleteSpan = document.createElement("i");
  deleteSpan.className = "delet-span fas fa-trash-alt";
  deleteSpan.addEventListener("click", function () {
    deleteSpan.closest("tr").remove();
    saveToLocalStore();
  });
  return deleteSpan;
}

function addData(items = []) {
  items.forEach((item, index) => {
    if (index === 0) {
      const newRow = createRow();
      blockList.prepend(newRow);
      resultRow = document.querySelector(".block__tr");
    }
    const enterValue = item.value;
    const newCell = createBlock();
    newCell.textContent = enterValue;
    if (index === 6 || index === 7) {
      const date = new Date(enterValue);
      if (date.getDate() <= 9 && date.getMonth() >= 10) {
        newCell.textContent =
          "0" +
          date.getDate() +
          "." +
          (+date.getMonth() + 1) +
          "." +
          date.getFullYear();
      } else if (date.getMonth() <= 9 && date.getDate() >= 10) {
        newCell.textContent =
          date.getDate() +
          "." +
          "0" +
          (+date.getMonth() + 1) +
          "." +
          date.getFullYear();
      } else if (date.getDate() <= 9 && date.getMonth() <= 9) {
        newCell.textContent =
          "0" +
          date.getDate() +
          "." +
          "0" +
          (+date.getMonth() + 1) +
          "." +
          date.getFullYear();
      } else {
        newCell.textContent =
          date.getDate() +
          "." +
          (+date.getMonth() + 1) +
          "." +
          date.getFullYear();
      }
    }
    resultRow.appendChild(newCell);
  });
}

function getCells(row) {
  let cellsContent = [];
  const dataCells = row.querySelectorAll(".block__td");
  dataCells.forEach((item) => {
    cellsContent.push(item.textContent);
  });
  return cellsContent;
}

function getData(rows) {
  let data = [];
  rows.forEach((item, index) => {
    const dataObj = {
      id: index,
      items: [],
    };
    const cells = getCells(item);
    dataObj.items = cells;
    data.push(dataObj);
  });
  return data;
}

function getDataFromStore() {
  const items = localStorage.getItem("key");
  const data = JSON.parse(items);
  data.forEach((obj) => {
    const row = createRow();
    obj.items.forEach((value, index) => {
      const td = createBlock();
      td.textContent = value;
      row.appendChild(td);
      if (index === obj.items.length - 1) {
        const del = createDel();
        row.appendChild(del);
      }
    });
    blockList.appendChild(row);
  });
}

getDataFromStore();
