"use strict";

// create form input to set the companie values
const form = document.createElement("form");
document.body.prepend(form);
form.setAttribute("id", "dina-foretags-uppgifter-form");
form.classList.add("hidden");
const build = () => {
  let html;

  html = `
   <div class="grid-container">
        <h3>Dina Företagsuppgifter</h3>
        <img src="" class="customer-logo-img" />
        <input
          type="text"
          name="dittforetag"
          id="dittforetag"
          placeholder="ditt företagsnamn"
        />
        <input
          type="text"
          name="referens"
          id="customer-referens"
          placeholder="er referens på fakturan"
        />
        <input
          type="text"
          name="adress"
          id="customer-adress"
          placeholder="er adress"
        />
        <input
          type="text"
          name="posort"
          id="customer-location"
          placeholder="postnr & ort"
        />

        <input
          type="text"
          name="orgnummer"
          id="orgnummer"
          placeholder="org.nummer"
        />
        <input type="text" name="mobil" id="mobil" placeholder="mobilnummer" />
        <input
          type="text"
          name="fastnummer"
          id="fast"
          placeholder="fastnummer 'valfritt'"
        />
         <input
          type="text"
          name="msg"
          id="msg"
          placeholder="meddelande på fakturan / om utlandskonto så skriv konto, swift och iban här"
        />
        <label for="bankuppgifter">Bank/Konto</label>
        <select name="bankuppgifter" id="customer-bankdetails">
          <option value="Bankgiro">Bankgiro</option>
          <option value="Postgiro">Postgiro</option>
          <option value="bankkonto">Konto</option>
        </select>
        <input
          type="text"
          name="kontouppgifter"
          id="kontouppgifter"
          placeholder="kontonummer enligt val ovan"
        />
      </div>
      <button type="submit" class="skapa">SKAPA</button>
   
  `;
  form.insertAdjacentHTML("afterbegin", html);
};

// end of create form input to set the companie values

// load and display content
window.addEventListener("DOMContentLoaded", build);
// end load content

// set comapnie values to the localStorage

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const dataArr = [...new FormData(form)];
  const data = Object.fromEntries(dataArr);
  localStorage.setItem("foretag", data.dittforetag);
  localStorage.setItem("referens", data.referens);
  localStorage.setItem("adress", data.adress);
  localStorage.setItem("postort", data.posort);
  localStorage.setItem("orgnummer", data.orgnummer);
  localStorage.setItem("mobil", data.mobil);
  localStorage.setItem("fastnummer", data.fastnummer);
  localStorage.setItem("bankval", data.bankuppgifter);
  localStorage.setItem("kontonr", data.kontouppgifter);
  localStorage.setItem("msg", data.msg);
  localStorage.setItem("currency", data.currency);

  setCompanieValues();
  setTimeout(() => {
    form.classList.add("hidden");
    alert(
      "Nu är dina företagsuppgifter inlagda och ligger kvar inför nästa besök: Så nu kan du börja skapa fakturor"
    );
    document.querySelector(".menu-container").classList.remove("hidden");
  }, 500);
});

//end of set comapnie values to the localStorage

// add button clear the localstorage first and hide the menu and show the form to collect data
const addCompanieBtn = document.querySelector(".addForetag");
addCompanieBtn.addEventListener("click", (e) => {
  form.classList.remove("hidden");
  localStorage.clear();
  document.querySelector(".menu-container").classList.add("hidden");
});
// end of add button clear the localstorage first and hide the menu and show the form to collect data
