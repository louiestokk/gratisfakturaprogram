"use strict";
// select elements from fakturamall.html
const logo = document.querySelector("#img");
const logoLabel = document.querySelectorAll(".logoTitle");
const logoContainer = document.querySelector(".logo-container");
const downloadBtn = document.querySelector(".download");
const logoImg = document.querySelector(".uploaded-holder");
const foretagsNamnet = document.querySelector(".foretaget");
const varreferens = document.querySelector(".var-referens");
const faktMsg = document.querySelector(".faktura-messsage");
const foretagAdress = document.querySelector(".foretaget-adress");
const foretagOrt = document.querySelector(".foretaget-postnr");
const foretagFastTele = document.querySelector(".foretag-fast");
const foretagMobilTele = document.querySelector(".foretag-mobil");
const foretagKontoTyp = document.querySelector(".giro-typ");
const foretagKonto = document.querySelector(".giro-nummer");
const foretagOrgNr = document.querySelector(".orgNummer");
let invoiceNr = Math.floor(Math.random() * 10000 + 100000);
let aaaNum = Math.floor(Math.random() * 1000 + 1000 + 10 + 10);
// end of select elements from fakturamall.html

// generate pdf

logo.addEventListener("input", (e) => {
  const url = URL.createObjectURL(e.target.files[0]);
  logoImg.src = url;
  logoImg.classList.add("logo-img");
  logo.classList.add("hidden");
  logoLabel.forEach((el) => {
    el.classList.add("hidden");
  });
});

const generatePdf = () => {
  logo.classList.add("hidden");
  logoLabel.forEach((el) => {
    el.classList.add("hidden");
    document.querySelector(".new-line-paragrafen").style.display = "none";
    document.querySelector(".new-invoice-button").classList.add("hidden");
  });

  setTimeout(() => {
    const element = document.querySelector("#ivoice");
    html2pdf().from(element).save();
  }, 300);
};
downloadBtn.addEventListener("click", generatePdf);

// end generate pdf

// set the users company values to the invoice from localStorage

const setCompanieValues = () => {
  if (localStorage.length > 0) {
    const comapnieName = localStorage.getItem("foretag");
    foretagsNamnet.textContent = comapnieName;
    const ref = localStorage.getItem("referens");
    varreferens.textContent = ref;
    const address = localStorage.getItem("adress");
    foretagAdress.textContent = address;
    const ort = localStorage.getItem("postort");
    foretagOrt.textContent = ort;
    const org = localStorage.getItem("orgnummer");
    foretagOrgNr.textContent = org;
    if (localStorage.getItem("mobil").length > 0) {
      const mobilPhone = localStorage.getItem("mobil");
      foretagMobilTele.textContent = mobilPhone;
    }
    if (localStorage.getItem("fastnummer").length > 0) {
      const fastPhone = localStorage.getItem("fastnummer");
      foretagFastTele.textContent = fastPhone;
    }
    const bankKontoVal = localStorage.getItem("bankval");
    foretagKontoTyp.textContent = bankKontoVal;
    const firmaAccountNr = localStorage.getItem("kontonr");
    foretagKonto.textContent = firmaAccountNr;
    const faktmeddelande = localStorage.getItem("msg");
    faktMsg.textContent = faktmeddelande;
  }
};

setCompanieValues();
// end of set companie values

// create invoice form to collect data about the customer
const createInvoiceBtn = document.querySelector(".skapa-fakt-btn");
const newCustomerContainer = document.querySelector(".newcustomer-modal");
const currentCustomerContainer = document.querySelector(".newcustomer-modal");

const createInvoice = () => {
  document.querySelector(".customers-kundBasen").classList.remove("hidden");
  const createInvoiceForm = document.createElement("form");
  createInvoiceForm.classList.add("createInvoiceForm");
  newCustomerContainer.append(createInvoiceForm);

  let createInvoiceHtml = `
  <h3>Nya Kunduppgifter</h3>
        <input
          type="text"
          name="customerName"
          id="kundforetag"
          placeholder="Företagsnamn"
        />
        <input
          type="text"
          name="adress"
          id="customeradress"
          placeholder="Adress"
        />
        <input
          type="text"
          name="posort"
          id="customerlocation"
          placeholder="postnr & ort"
        />
         <input
          type="text"
          name="referens"
          id="customerreferens"
          placeholder="kundreferens"
        />
        <input type="number" name="betvillkor" id="betvillkor" placeholder="betalningsvillkor dagar netto! om inget anges läggs 30 dagar in automatiskt"/>
        <input
          type="text"
          name="faktavgift"
          id="faktavgift"
          placeholder="fakturavgift om inget anges läggs 0 in automatiskt"
          
        />
         <input
          type="text"
          name="faktnr"
          id="faktnr"
          placeholder="Fakturanummer: 'frivilligt' läggs in automatiskt annars"
        />
         <input
          type="number"
          name="artikelnr"
          id="artikelnr"
          placeholder="Artikelnummer! om inget anges läggs det in automatiskt"
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
         <label for="moms">inkl/exkl/utan moms</label>
        <select name="moms" id="moms">
          <option value="exkl">exkl moms</option>
          <option value="inkl">inkl moms</option>
          <option value="ingen">utan moms</option>
        </select>
        <br>
        <label for="currency">Valuta/Crypto</label>
        <select name="currency" id="currency">
          <option value="kronor">SEK</option>
          <option value="euro">EUR</option>
          <option value="usd">USD</option>
          <option value="bitcoin">BITCOIN</option>
          <option value="ethereum">ETHEREUM</option>
        </select>
        <button class="create-customer-btn">Lägg in</button>
  `;
  createInvoiceForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const dataArr = [...new FormData(createInvoiceForm)];
    const data = Object.fromEntries(dataArr);
    const test = Object.values(data);
    let nyArr = [];
    nyArr.push(test[0]);
    nyArr.push(test[1]);
    nyArr.push(test[2]);
    nyArr.push(test[3]);
    localStorage.setItem(`${localStorage.length + 1}`, nyArr);
    lengthArray.push(`${localStorage.length + 1}`);
  });
  createInvoiceForm.insertAdjacentHTML("afterbegin", createInvoiceHtml);
  document
    .querySelector(".create-customer-btn")
    .addEventListener("click", (e) => {
      addNewCustomer(createInvoiceForm, createInvoiceHtml);
      document.querySelector(".customers-kundBasen").classList.add("hidden");
    });
  document
    .querySelector(".new-invoice-line-container ")
    .classList.remove("hidden");
};

createInvoiceBtn.addEventListener("click", createInvoice);

// end of create invoice data

// set current date to faktura datum at top
var dd = new Date();
var date = dd.toLocaleString().slice(0, 10).replace(",", "");
const invoiceDate = document.querySelector(".current-date");
invoiceDate.innerHTML = `${date}`;
//end of set current date to faktura datum at top

// select elements from fakturamall.html
const invoiceNumber = document.querySelector(".faktura-nummer");
invoiceNumber.innerHTML = `${+invoiceNr}`;
const invoiceCustomerName = document.querySelector(".foretag");
const invoiceCustomerAdress = document.querySelector(".foretags-adress");
const invoiceCustomerPost = document.querySelector(".postnummer-ort");
const invoiceCustomerPerson = document.querySelector(".er-referens");
const customerArtikelNumber = document.querySelector(".artikel-nummer");
const customerServices = document.querySelector(".artikel-beskrivning");
const customerServicesNum = document.querySelector(".artikel-antal");
const customerServicesPrice = document.querySelector(".artikel-pris");
const customerServicesTot = document.querySelector(".artikel-belopp");
const customerNetto = document.querySelector(".netto-vard");
const customerInvoicefee = document.querySelector(".faktura-avgift");
const customerInvoiceTax = document.querySelector(".netto-moms");
const customerRoundValue = document.querySelector(".netto-ores");
const customerTotalBillCost = document.querySelector(".tot-vard");
const customerBillEndDate = document.querySelector(".forfallo-datum");
//end of  select elements from fakturamall.html

// skapa faktura button onclick to create invoive content
function addNewCustomer(form, html) {
  form.classList.add("hide");
  invoiceNr++;
  let valuta;
  let momsNumber = 0;
  let momsValue = 0;
  let nettoValue = 0;
  let invoiceFeeValue = 0;
  let roundValue = 0;
  let totalPaymentCosts = 0;
  const dataArr = [...new FormData(form)];
  const data = Object.fromEntries(dataArr);

  // data.pris = parseInt(data.pris);
  // data.antal = parseInt(data.antal);
  // data.faktavgift = parseInt(data.faktavgift);
  if (data.currency == "bitcoin") valuta = '<i class="fab fa-bitcoin"></i>';
  if (data.currency == "ethereum") valuta = '<i class="fab fa-ethereum"></i>';
  if (data.currency == "kronor") valuta = "kr";
  if (data.currency == "euro") valuta = "€";
  if (data.currency == "usd") valuta = "$";
  if (data.faktavgift == "") data.faktavgift = 0;
  if (data.artikelnr == "") data.artikelnr = aaaNum;
  if (data.betvillkor == "") data.betvillkor = 30;

  invoiceDate.innerHTML = `${data.faktdatum ? data.faktdatum : date}`;
  invoiceNumber.innerHTML = `${data.faktnr ? data.faktnr : invoiceNr}`;
  invoiceCustomerName.innerHTML = `${data.customerName}`;
  invoiceCustomerAdress.innerHTML = `${data.adress}`;
  invoiceCustomerPost.innerHTML = `${data.posort}`;
  invoiceCustomerPerson.innerHTML = `${data.referens}`;
  customerArtikelNumber.innerHTML = `${data.artikelnr}`;
  customerServices.innerHTML = `${data.tjanst}`;
  customerServicesNum.innerHTML = `${data.antal}`;
  customerServicesPrice.innerHTML = `${data.pris}${valuta}`;
  customerServicesTot.innerHTML = `${data.pris * data.antal}${valuta}`;
  customerNetto.innerHTML = `${data.pris * data.antal}${valuta}`;
  invoiceFeeValue = `${+data.faktavgift}`;
  customerInvoicefee.innerHTML = `${+invoiceFeeValue}${valuta}`;
  customerInvoiceTax.innerHTML = `${data.pris * data.antal * 0.25}${valuta}`;
  momsNumber = parseInt(data.faktavgift) - parseInt(data.faktavgift) * 0.8;
  if (data.moms == "inkl") {
    customerNetto.innerHTML = `${data.pris * data.antal * 0.8}${valuta}`;
    customerInvoiceTax.innerHTML = `${
      data.pris * data.antal - data.pris * data.antal * 0.8 + momsNumber
    }${valuta}`;
    customerTotalBillCost.innerHTML = `${
      data.pris * data.antal + parseInt(data.faktavgift)
    }${valuta}`;
    customerInvoicefee.innerHTML =
      parseInt(data.faktavgift) - momsNumber + valuta;
  }
  if (data.moms == "exkl") {
    customerInvoiceTax.innerHTML = `${
      data.pris * data.antal * 0.25 + parseInt(invoiceFeeValue * 0.25)
    }${valuta}`;
    customerTotalBillCost.innerHTML = `${
      (data.pris * data.antal + parseInt(data.faktavgift)) * 1.25
    }${valuta}`;
  }
  if (data.moms == "ingen") {
    customerInvoiceTax.innerHTML = "";
    document.querySelector(".moms-paragraf").innerHTML = "";
    customerTotalBillCost.innerHTML = `${
      data.pris * data.antal + parseInt(data.faktavgift)
    }${valuta}`;
    customerInvoicefee.innerHTML = `${data.faktavgift}${valuta}`;
  }
  localStorage.setItem(
    "momsforsta",
    parseInt(customerInvoiceTax.innerHTML.replace("kr", ""))
  );
  localStorage.setItem(
    "sattfakturafee",
    parseInt(customerInvoicefee.innerHTML.replace("kr", ""))
  );

  calculateBetalningsVillkor(data.betvillkor);
}
// end skapa faktura button onclick to create invoive content

// set the end date to pay the invoice
const calculateBetalningsVillkor = (data) => {
  let d = new Date();
  d.setDate(d.getDate() + parseInt(data));
  d.toLocaleString();
  customerBillEndDate.innerHTML = `${d.toLocaleString().slice(0, 10)}`.replace(
    ",",
    ""
  );
};
// end of set the end date to pay the invoice
