let bookings = [];

function bookTicket(name, price, qtyId) {
  const qty = parseInt(document.getElementById(qtyId).value);
  if (qty > 0) {
    const existing = bookings.find(b => b.name === name);
    if (existing) {
      existing.qty += qty;
      existing.total = existing.qty * existing.price;
    } else {
      bookings.push({ name, price, qty, total: price * qty });
    }
    renderTable();
  }
}

function renderTable() {
  const tableBody = document.querySelector("#ticket-table tbody");
  const totalPriceEl = document.getElementById("total-price");
  tableBody.innerHTML = "";
  let grandTotal = 0;

  bookings.forEach((ticket) => {
    grandTotal += ticket.total;
    const row = `
      <tr>
        <td>${ticket.name}</td>
        <td>${ticket.qty}</td>
        <td>Rs.${ticket.price}</td>
        <td>Rs.${ticket.total}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });

  totalPriceEl.innerText = grandTotal;
}

function proceedToCheckout() {
  if (!bookings || bookings.length === 0) {
    alert("Please add your favourite movies");
    return;
  }

  localStorage.setItem("currentBooking", JSON.stringify(bookings));
  window.location.href = "checkout.html";
}


function saveAsFavourite() {
  localStorage.setItem("favouriteBooking", JSON.stringify(bookings));
  alert("Booking saved as favourite!");
}

function applyFavourite() {
  const fav = localStorage.getItem("favouriteBooking");
  if (fav) {
    bookings = JSON.parse(fav);
    renderTable();
    alert("Favourite booking applied!");
  } else {
    alert("No favourite booking found.");
  }
}
