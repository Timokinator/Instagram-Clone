// Bitte hier Code eingeben
let menus = ['Pizza Speciale'];
let prices = [8.50];
let amounts = [2];

function getValueFromInput(ID) {
  return document.getElementById(ID).value;
  }
  
 function getMenuFromInput() {
   return getValueFromInput('menu').trim();
 }
 
 function getPriceFromInput() {
   return +getValueFromInput('price');  
 }

function onAddMenu() {
  let essen1 = getMenuFromInput();
  let essen = getMenuIndex(essen1);
  
  if (essen == -1) {
  menus.push(getMenuFromInput());
  prices.push(getPriceFromInput());
  amounts.push(+1);
  } else {
    amounts[essen] += 1;
  };
  }
  
  function getMenuIndex(menu) {
    return menus.indexOf(menu);
  }