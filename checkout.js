window.onload = () => {
  const booking = JSON.parse(localStorage.getItem("currentBooking"));
  const tableBody = document.querySelector("#checkout-table tbody");
  const totalEl = document.getElementById("checkout-total");
  let total = 0;

  booking.forEach(ticket => {
    const row = `
      <tr>
        <td>${ticket.name}</td>
        <td>${ticket.qty}</td>
        <td>Rs.${ticket.price}</td>
        <td>Rs.${ticket.total}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
    total += ticket.total;
  });

  totalEl.innerText = total;

  document.getElementById("payment-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const seats = document.getElementById("seats").value.trim();
    const card = document.getElementById("card").value.trim();

    if (name && email && seats && card) {
      const refNum = Math.floor(Math.random() * 900000 + 100000);
      const msg = `
        Thank you, ${name}! 🎉<br/>
        Your tickets have been booked.<br/>
        Movie Time: 7:00 PM<br/>
        Seat(s): ${seats}<br/>
        Booking Ref: <strong>#${refNum}</strong><br/>
        A confirmation email has been sent to ${email}.
      `;

      document.getElementById("payment-form").style.display = "none";
      document.getElementById("confirmation").style.display = "block";
      document.getElementById("confirmation-msg").innerHTML = msg;

      localStorage.removeItem("currentBooking");
    } else {
      alert("Please fill all required fields.");
    }
  });
}
