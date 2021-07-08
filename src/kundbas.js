"use strict";
const formKundbasNY = document.querySelector(".createInvoiceForm");
const kundKundbas = document.querySelectorAll("#kundBas-kund");
const customerName = document.querySelector("#kundBas-name");
const customerAddress = document.querySelector("#kundBas-adress");
const customerLocal = document.querySelector("#kundBas-ort");
const customerRef = document.querySelector("#kundBas-ref");
const selectEelement = document.createElement("select");
selectEelement.classList.add("customers-kundBasen");
selectEelement.classList.add("hidden");
newCustomerContainer.append(selectEelement);
const optionStarter = document.createElement("option");
optionStarter.textContent = "mina kunder";
selectEelement.prepend(optionStarter);
const customerSelectEl = document.querySelector(".customers-kundBasen");
const lengthArray = [];
//   set new customer adn store in localStorage
// formKundbasNY.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const dataArr = [...new FormData(formKundbas)];
//   const data = Object.fromEntries(dataArr);
//   const test = Object.values(data);
//   localStorage.setItem(`${localStorage.length + 1}`, test);
//   lengthArray.push(`${localStorage.length + 1}`);
// });

// end of  set new customer adn store in localStorage

//    render customer name to option text
(() => {
  kundKundbas.forEach((el, ind) => {
    let dataArray = localStorage.getItem(ind + 1).split(",");
    el.textContent = dataArray[0];
  });
})();

// end   render customer name to option text
//   -------------------------------------------------------

// set length from localstorage so can render and build option tags based on how many, beacuse localstorage will have many different items
(() => {
  for (let x = 0; x < 50; x++) {
    lengthArray.push(localStorage.getItem(x + 1));
  }
})();

(() => {
  lengthArray.forEach((el, ind) => {
    if (el == null) {
      return;
    } else {
      let html = `
        <option id="kundBas-kund" class="${ind + 1}" value="" data-id="${
        ind + 1
      }">${el.split(",")[0]}</option>
      `;

      customerSelectEl.insertAdjacentHTML("afterbegin", html);
      customerSelectEl.addEventListener("click", () => {
        optionStarter.classList.add("hidden");
      });
      document.querySelectorAll("#kundBas-kund").forEach((el) => {
        el.addEventListener("click", (e) => {
          let current = e.currentTarget.className;
          let keyName = window.localStorage.getItem(current).split(",");

          document.getElementById("kundforetag").value = keyName[0];
          document.querySelector("#customeradress").value = keyName[1];
          document.getElementById("customerlocation").value = keyName[2];
          document.getElementById("customerreferens").value = keyName[3];
        });
      });
    }
  });
})();

// document.querySelector(".kundBas-btn").addEventListener("click", () => {
//   for (let i = 0; i < 4; i++) {
//     formKundbas.elements[i].value = "";
//   }
// });
