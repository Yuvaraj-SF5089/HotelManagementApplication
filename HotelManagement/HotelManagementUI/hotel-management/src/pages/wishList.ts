import { bookingStatus } from '../models/models';
import * as APICALLS from '../api/apicalls';

export async function renderWishList(container: HTMLElement) {
  var user = await APICALLS.isAuthenticated();
  if (!user.success) {
    alert("Please login first");
    return;
  }
  var currentUser = await APICALLS.getIndividualUser(user.email);
    if (!currentUser) {
      alert("User not found");
      return;
    }
  container.innerHTML = `<h2>Wish Lists</h2>`;
  const tableContainer = document.createElement("span");
  tableContainer.className="wishList";
  const bookAllContainer=document.createElement("div");
  bookAllContainer.className="book";
  bookAllContainer.innerHTML=`<button id="bookAllBtn" onclick="bookAllRooms(${currentUser!.userID})">Book All</button>`;
  container.appendChild(bookAllContainer);
  createTable();
  async function createTable() {
    var wishlists = await APICALLS.fetchWishLists(currentUser?.userID||0);
    tableContainer.innerHTML = "";
    const table = document.createElement("table");
    table.border = "1";
    table.style.borderCollapse = "collapse";
    table.style.width = "100%";

    var headerRow = document.createElement("tr") as HTMLTableRowElement;
    headerRow.innerHTML = `
        <th>WishList ID</th>
        <th>User ID</th>
        <th>Room ID</th>
        <th>From Date</th>
        <th>To Date</th>
        <th>Price</th>
        <th>Action</th>`;
    table.appendChild(headerRow);
    
    wishlists.forEach((wishlist) => {
      if (wishlist.userID == currentUser!.userID) {
        var row = document.createElement("tr") as HTMLTableRowElement;
        row.innerHTML = `<td>${wishlist.wishListID}</td> <td>${wishlist.userID}</td> <td>${wishlist.roomID}</td><td>${new Date(wishlist.fromDate).toLocaleDateString()}</td> 
              <td>${new Date(wishlist.toDate).toLocaleDateString()}</td><td>${wishlist.priceOfRoom}</td>
              <td>
              <button id="bookRoomBtn" onclick="bookRoom(${wishlist.wishListID},${wishlist.userID})">Book Room</button>
              <button id="delete" onclick="removeItem(${wishlist.wishListID})">Delete</button>
              </td>`;
        table.appendChild(row);
      }
    })
    tableContainer.appendChild(table);
  }
  container.appendChild(tableContainer);

  async function removeItem(wishListID: number) {
    var confirmation = confirm("Are you sure you want to remove this item?");
    if (!confirmation) {
      return;
    }
    // var order = await APICALLS.getIndividualWishList(bookingID);
    // if (order == null) {
    //   alert("Order not found");
    //   return;
    // }
    // if (order!.status=== bookingStatus[1]) {
    //   alert("Order already cancelled");
    //   return;
    // }
    await APICALLS.deleteWishList(wishListID);
    // var userChange = await APICALLS.getIndividualUser(currentUser.email, currentUser.password);
    // localStorage.setItem("user", JSON.stringify(userChange));
    alert("Item Deleted successfully");
    createTable();
  }
  async function bookAllRooms(userID:number) {
    var confirmation=confirm("Are you sure. want to book all rooms");
    if(!confirmation)
    {
      return;
    }
    var response=await APICALLS.bookAllRooms(userID);
    if(response=="false")
    {
      alert("Insufficient balance to book all rooms !");
      return;
    }
    if(response.startsWith('w'))
    {
      alert("Room in Wishlist ID : "+response.replace('w','')+ "not available! Failed to Book Rooms");
      return;
    }
    alert("Rooms Booked Successfully. Booking ID: "+response);
  }
  async function bookRoom(wishListID:number,userID:number) {
    var confirmation=confirm("Are you sure. Want to book room ?");
    if(!confirmation)
    {
      return;
    }
    var response=await APICALLS.bookIndvidualRoom(wishListID,userID);
    if(response==="false")
    {
      alert("Room not available !");
      return;
    }
    if(response==="low")
    {
      alert("Insufficient balance to book !");
      return;
    }
    alert("Booking successfully done. Booking ID: "+response);
    await APICALLS.deleteWishList(wishListID);
  }
  (window as any).removeItem = removeItem;
  (window as any).bookRoom=bookRoom;
  (window as any).bookAllRooms=bookAllRooms;
}