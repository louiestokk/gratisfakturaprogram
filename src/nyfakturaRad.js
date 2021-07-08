"use strict";
// selecting the container there the new data vill be rendered coh a new line
const artikelNummerContainer = document.querySelector(
  ".artikel-nummer-container"
);
const artikelBeskrivningContainer = document.querySelector(
  ".artikel-beskrivning-container"
);
const artikelAntalContainer = document.querySelector(
  ".artikel-antal-container"
);
const artikelPrisContainer = document.querySelector(".artikel-pris-container");
const artikelBeloppContainer = document.querySelector(
  ".artikel-belopp-container"
);
const newInvoiceLineBtn = document.querySelector(".new-invoice-button");

const newLineContentContainer = document.querySelector(
  ".new-line-content-container"
);
let randomNumber = Math.floor(Math.random() * 1000 + 1000 + 5 + 5);
//end of  selecting the container there the new data vill be rendered coh a new line

// function render new invoice line and display them with data content attached
const renderNewLine = () => {
  const newLineFormToRender = document.createElement("form");
  newLineFormToRender.classList.add("newLineFormToRender");
  let newLineHtmlToRender;

  newLineHtmlToRender = `
    <input
          type="number"
          name="artikelnr"
          id="artikelnr"
          placeholder="Artikelnummer"
        />
          <input
          type="text"
          name="tjanst"
          id="tjanst"
          placeholder="Vara eller Tjänst"
        />
        <input
          type="number"
          name="antal"
          id="antal"
          placeholder="Antal"
        />
        <input
          type="number"
          name="pris"
          id="pris"
          placeholder="Pris"
        />
        <br/>
         <label for="moms">inkl/exkl/utan moms</label>
           <br/>
        <select name="moms" id="moms">
          <option value="exkl">exkl moms</option>
          <option value="inkl">inkl moms</option>
          <option value="ingen">utan moms</option>
        </select>
        <br>
        <label for="currency">Valuta/Crypto</label>
          <br/>
        <select name="currency" id="currency">
          <option value="kronor">SEK</option>
          <option value="euro">EUR</option>
          <option value="usd">USD</option>
          <option value="bitcoin">BITCOIN</option>
          <option value="ethereum">ETHEREUM</option>
        </select>
          <br/>
        <button class="new-line-render-btn">Lägg in</button>
        <button class="new-line-close-btn">Stäng</button>
    `;
  newLineFormToRender.insertAdjacentHTML("afterbegin", newLineHtmlToRender);
  newLineContentContainer.append(newLineFormToRender);
  newLineFormToRender.addEventListener("submit", (e) => {
    e.preventDefault();
  });
  document
    .querySelector(".new-line-render-btn")
    .addEventListener("click", (e) => {
      addNewLineContent(newLineFormToRender, newLineHtmlToRender);
    });
  document
    .querySelector(".new-line-close-btn")
    .addEventListener("click", (e) => {
      newInvoiceLineBtn.classList.remove("hidden");
      document.querySelector(".new-line-paragrafen").style.display = "block";
      document
        .querySelector(".new-line-modal-container")
        .classList.add("hidden");
      newLineContentContainer.innerHTML = "";
    });
};
//end of  function render new invoice line and display them with data content attached
newInvoiceLineBtn.addEventListener("click", (e) => {
  document
    .querySelector(".new-line-modal-container")
    .classList.remove("hidden");
  renderNewLine();
  e.target.classList.add("hidden");
  document.querySelector(".new-line-paragrafen").style.display = "none";
});

const addNewLineContent = (form, data) => {
  randomNumber++;
  let valuta;
  const dataArray = [...new FormData(form)];
  const dataNewLine = Object.fromEntries(dataArray);
  if (dataNewLine.artikelnr == "") dataNewLine.artikelnr = randomNumber;
  if (dataNewLine.currency == "bitcoin")
    valuta = '<i class="fab fa-bitcoin"></i>';
  if (dataNewLine.currency == "ethereum")
    valuta = '<i class="fab fa-ethereum"></i>';
  if (dataNewLine.currency == "kronor") valuta = "kr";
  if (dataNewLine.currency == "euro") valuta = "€";
  if (dataNewLine.currency == "usd") valuta = "$";
  if (dataNewLine.tjanst == "") dataNewLine.tjanst = "Vara/Tjänst Här";
  if (dataNewLine.antal == "") dataNewLine.antal = 1;
  if (dataNewLine.pris == "") dataNewLine.pris = 1000;

  const artikelNumPara = document.createElement("p");
  artikelNumPara.classList.add("artikel-nummer");
  artikelNumPara.innerHTML = `${dataNewLine.artikelnr}`;
  artikelNummerContainer.append(artikelNumPara);

  const artikelBeskPara = document.createElement("p");
  artikelBeskPara.classList.add(".artikel-beskrivning");
  artikelBeskPara.innerHTML = `${dataNewLine.tjanst}`;
  artikelBeskrivningContainer.append(artikelBeskPara);

  const artikelAntalPara = document.createElement("p");
  artikelAntalPara.classList.add("artikel-antal");
  artikelAntalPara.innerHTML = `${parseInt(dataNewLine.antal)}`;
  artikelAntalContainer.append(artikelAntalPara);

  const artikelPrisPara = document.createElement("p");
  artikelPrisPara.classList.add("artikel-pris");
  artikelPrisPara.innerHTML = `${parseInt(dataNewLine.pris)}${valuta}`;
  artikelPrisContainer.append(artikelPrisPara);

  const artikelBeloppPara = document.createElement("p");
  artikelBeloppPara.classList.add("artikel-belopp");
  artikelBeloppPara.innerHTML =
    parseInt(dataNewLine.antal) * parseInt(dataNewLine.pris) + valuta;
  artikelBeloppContainer.append(artikelBeloppPara);

  calculateTotalBillPayment(dataNewLine, valuta);
};
let momsensomligger = document.querySelector(".netto-moms");
let plussamomsenmed = 0;
let theTotalNum = 0;
let inklmoms = 0;
let thetotalmoms = 0;
let nettoVardetAll = document.querySelector(".netto-vard");
let attbetalabelopp = document.querySelector(".tot-vard");
const faktavgiften = document.querySelector(".faktura-avgift");

const calculateTotalBillPayment = (data, valuta) => {
  let num = localStorage.getItem("momsforsta");
  num = parseInt(num);
  let faktfeelocal = localStorage.getItem("sattfakturafee");
  faktfeelocal = parseInt(faktfeelocal);
  const sumArray = [];
  const artikeBeloppen = document.querySelectorAll(".artikel-belopp");
  artikeBeloppen.forEach((el) => {
    theTotalNum = parseInt(el.innerHTML);
    sumArray.push(theTotalNum);
  });
  const sum = sumArray.reduce((sum, number) => {
    const sumtot = sum + number;
    return sumtot;
  }, 0);
  nettoVardetAll.innerHTML = `${sum}${valuta}`;
  attbetalabelopp.innerHTML = `${
    sum + parseInt(faktavgiften.innerHTML)
  }${valuta}`;
  if (data.moms == "exkl") {
    momsensomligger.innerHTML = 0;
    let newArray = sumArray.splice(1);
    const sum2 = newArray.reduce((sum, number) => {
      const sumtot2 = sum + number;
      return sumtot2;
    }, 0);
    thetotalmoms = sum2 * 0.25;
    plussamomsenmed = parseInt(momsensomligger.textContent.replace("kr", ""));
    momsensomligger.innerHTML = `${(thetotalmoms += num)}${valuta}`;
    attbetalabelopp.innerHTML = `${
      parseInt(attbetalabelopp.innerHTML.replace("kr", "")) +
      parseInt(momsensomligger.textContent.replace("kr", ""))
    }${valuta}`;
  }
  if (data.moms == "inkl") {
    const sum3 = sumArray.reduce((sum, number) => {
      const sumtot3 = sum + number;
      return sumtot3;
    }, 0);
    inklmoms = faktfeelocal * 1.25 - faktfeelocal;
    console.log(inklmoms);
    nettoVardetAll.innerHTML = `${sum3 * 0.8}${valuta}`;
    momsensomligger.innerHTML = `${sum3 - sum3 * 0.8 + inklmoms}`;
    attbetalabelopp.innerHTML = `${
      parseInt(nettoVardetAll.innerHTML.replace("kr", "")) +
      parseInt(momsensomligger.textContent.replace("kr", "")) +
      faktfeelocal
    }${valuta}`;
  }
};
