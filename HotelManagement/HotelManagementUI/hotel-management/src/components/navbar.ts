// import { renderHome } from "../pages/home";
// import { renderOrders } from "../pages/orders";
// import { renderWallet } from "../pages/wallet";
// import { renderMedicines } from "../pages/medicines";
// import { renderPurchase } from "../pages/purchase";
import * as APICALLS from "../api/apicalls";
import { renderBookingHistory } from "../pages/bookingHistory";
import { renderBookRooms } from "../pages/bookRoom";
import { renderHome } from "../pages/home";
import { renderRooms } from "../pages/rooms";
import { renderUserDetails } from "../pages/userDetails";
import { renderWallet } from "../pages/wallet";
import { renderWishList } from "../pages/wishList";

export function renderNavbar(container: HTMLElement, rerenderApp: () => void) {
  const nav = document.createElement("div");
  nav.className = "navbar";
  nav.innerHTML = `
    <button data-page="home">HOME</button>
    <button data-page="customerProfile">CUSTOMER PROFILE</button>
    <button data-page="roomDetails">ROOM DETAILS</button>
    <button data-page="recharge">RECHARGE</button>
    <button data-page="bookRoom">BOOK ROOM</button>
    <button data-page="wishList">WISH LIST</button>
    <button data-page="bookingHistory">BOOKING HISTORY</button>
    <button id="logout">LOGOUT</button>
  `;

  nav.querySelectorAll("button[data-page]").forEach(btn =>
    btn.addEventListener("click", () => {
      const page = btn.getAttribute("data-page")!;
      renderPage(container, page);
    })
  );

  nav.querySelector("#logout")!.addEventListener("click",async() => {
    await APICALLS.logout();
    rerenderApp();
  });

  container.appendChild(nav);
}

export function renderPage(container: HTMLElement, page: string) {
  const content = document.createElement("div");
  content.className = "page";

  switch (page) {
    case "home":
      renderHome(content);
      break;
    case "customerProfile":
      renderUserDetails(content);
      break;
    case "roomDetails":
      renderRooms(content);
      break;
    case "recharge":
      renderWallet(content);
      break;
    case "bookRoom":
      renderBookRooms(content);
      break;
    case "wishList":
      renderWishList(content);
      break;
    case "bookingHistory":
      renderBookingHistory(content);
      break;
    default:
      content.innerText = "Page not found.";
  }

  const oldPage = container.querySelector(".page");
  if (oldPage) container.removeChild(oldPage);
  container.appendChild(content);
}
