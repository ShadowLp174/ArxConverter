// ==UserScript==
// @name        ArxConverter
// @description Replaces the ARX price tags in the elite dangerous dlc store with real-world currency price tags
// @namespace   Violentmonkey Scripts
// @match       https://www.elitedangerous.com/store/*
// @grant       none
// @version     1.21
// @author      ShadowLp174
// @description 4.5.2024, 09:51:01
// ==/UserScript==

// PRE-SET CURRENCIES:
/*
0: GBP
1: EUR
2: USD

  Change the number below according to your desired currency
*/
const useCurrency = 0;

const gbpMap = [
  [5000, 299],
  [8400, 499],
  [16800, 959],
  [25500, 1299],
  [51000, 2499],
  [85000, 4499]
];
const eurMap = [
  [5000, 349],
  [8400, 599],
  [16800, 1149],
  [25500, 1599],
  [51000, 2999],
  [85000, 5499]
];
const usdMap = [
  [5000, 399],
  [8400, 699],
  [16800, 1299],
  [25500, 1899],
  [51000, 3799],
  [85000, 5999]
];

const discountMaps = [
  gbpMap,
  eurMap,
  usdMap
]

const currencies = ["£", "€", "$"]


const discountMap = discountMaps[useCurrency];
const currency = currencies[useCurrency];

const convertArx = (arx) => {
  // NOTE: This conversion algorithm only works with currencies that are based on hundreds. For example: 100 cents = 1 euro

  // account for sales: (theoretically obsolete now, but I'll keep it in just to be safe)
  arx = arx.split(" ")
  arx = arx[arx.length - 1] // select last element to display correct price if a sale is displayed

  arx = parseInt(arx.replaceAll(",", ""))

  if (arx === 0) return "0.00";

  // calculate highest discounted tier
  let idx = discountMap.findLastIndex(e => e[0] <= arx)
  console.log(idx, discountMap[idx], arx)
  let price = discountMap[idx][1];
  arx -= discountMap[idx][0];

  // calculate price of remaining arx
  price += (arx * (discountMap[0][1] / discountMap[0][0]))

  price = Math.round(price + Number.EPSILON) / 100; // Number.EPSILON to prevent floating-point errors while dividing

  // append a 0 if there is only 1 decimal for the looks
  price = "" + price;
  price = price.split(".")
  price[1] = (price[1].length < 2) ? price[1] + "0" : price[1]
  return price.join(".")
}

window.addEventListener("load", () => {
  var tags = document.body.getElementsByClassName("o-price")

  for (let i = 0; i < tags.length; i++) {
    let arx = tags[i].children[0].innerText;
    tags[i].children[0].remove();
    arx = arx.split(" ")

    tags[i].children[0].remove(); // remove arx symbol

    // in case this is an item on sale, the original and the discounted price are computed and displayed
    arx.forEach((a, j) => {
      const price = (j === 0 && arx.length > 1) ? document.createElement("strike") : document.createElement("span")
      if (j === 0 && arx.length > 1) price.style = "text-decoration: line-through; opacity: .4; color: #000";

      price.innerText = convertArx(a)
      tags[i].appendChild(price);
      if (j !== 0) {
        price.style.marginLeft = "3px"; // the gap a space would do
      }
    });
    const currencySymbol = document.createElement("span")
    currencySymbol.innerText = currency;
    currencySymbol.style = "margin-left: 4px";
    tags[i].appendChild(currencySymbol)
  }

  //priceElems.map(e => e.innerText = convertArx(e.innerText))
});
