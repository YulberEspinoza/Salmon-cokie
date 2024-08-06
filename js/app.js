"use strict";

const tbody = document.getElementById("table-body");
const formNewStore = document.getElementById("newStore");

function Location(
  locationName,
  address,
  contactoInfo,
  workingHours,
  minClientPerHour,
  maxClientPerHour,
  agvCookiePerSale,
  cookieEachHour
) {
  this.locationName = locationName;
  this.address = address;
  this.contactoInfo = contactoInfo;
  this.workingHours = workingHours;
  this.minClientPerHour = minClientPerHour;
  this.maxClientPerHour = maxClientPerHour;
  this.agvCookiePerSale = agvCookiePerSale;
  this.cookieEachHour = cookieEachHour; // Esto es el el estimate
}

Location.prototype.estimate = function () {
  this.cookieEachHour = estimateSale(this); // esto hace referencia y toma los valores de el sale
};

Location.prototype.render = function () {
  const storeTr = document.createElement("tr");
  const storeTd = document.createElement("td");
  storeTd.textContent = this.locationName;
  storeTr.appendChild(storeTd);
  tbody.appendChild(storeTr);

  let total = 0;

  for (let k = 0; k < hours.length; k++) {
    const hoursTd = document.createElement("td");

    this.estimate();
    hoursTd.textContent = this.cookieEachHour[k];
    storeTr.appendChild(hoursTd);
    total += this.cookieEachHour[k];
  }

  const totalTd = document.createElement("td");
  totalTd.textContent = total;
  storeTr.appendChild(totalTd);
};

const seattle = new Location(
  "seattle",
  "2901 3rd Ave #300, Seattle,Wa 98121",
  "555-555-555",
  "6am-7pm",
  23,
  65,
  6.3,
  []
);
const tokio = new Location(
  "tokio",
  "1 Chome-1-2 Oshiage, Sumida City, Tokyo",
  "444-444-444",
  "6am-7pm",
  3,
  24,
  1.2,
  []
);
const dubai = new Location(
  "dubai",
  "1 Sheinkh Mohammed Bin Rashid Bvld -Dubai",
  "333-333-333",
  "6am-7pm",
  11,
  38,
  3.7,
  []
);
const paris = new Location(
  "paris",
  "Champ de Mars, 5 Avenue France, 7005, Paris",
  "222-222-222",
  "6am-7pm",
  20,
  38,
  2.3,
  []
);
const lima = new Location(
  "lima",
  "Ca. Gral. Borgoña cuadra 8, Miraflores, 15074, Lima",
  "111-111-111",
  "6am-7pm",
  2,
  16,
  4.6,
  []
);

const hours = [
  "6am",
  "7am",
  "8am",
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
  "6pm",
  "7pm",
];
const stores = [seattle, tokio, dubai, paris, lima];

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function estimateSale(store) {
  const sale = [];
  for (let i = 0; i < hours.length; i++) {
    const numCustomers = random(store.minClientPerHour, store.maxClientPerHour);
    const hoursSale = Math.ceil(numCustomers * store.agvCookiePerSale);
    sale.push(hoursSale);
  }
  return sale;
}

const hederRowContainer = document.getElementById("header-row-container");
for (let i = 0; i < hours.length; i++) {
  const th = document.createElement("th");
  th.textContent = hours[i];
  hederRowContainer.appendChild(th);
}
const thExtra = document.createElement("th");
thExtra.textContent = "Total";
hederRowContainer.appendChild(thExtra);

seattle.render();
tokio.render();
dubai.render();
paris.render();
lima.render();

function renderIndex(params) {
  const fill = document.getElementById("fill");
  const location = document.createElement("section");
  location.classList.add("location");
  fill.appendChild(location);
  const tittle = document.createElement("h2");
  tittle.textContent = params.locationName;
  location.appendChild(tittle);
  const address = document.createElement("p");
  address.textContent = "Location: " + params.address;
  location.appendChild(address);
  const contactoInfo = document.createElement("p");
  contactoInfo.textContent = "Contacto: " + params.contactoInfo;
  location.appendChild(contactoInfo);
  const workingHours = document.createElement("p");
  workingHours.textContent = "Horario: " + params.workingHours;
  location.appendChild(workingHours);
}

function run(params) {
  for (let i = 0; i < stores.length; i++) {
    stores[i].estimate();
    renderIndex(stores[i]);
  }
}
