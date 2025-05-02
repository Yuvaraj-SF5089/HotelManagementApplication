import { bookingStatus, RoomSelection } from '../models/models';
import * as APICALLS from '../api/apicalls';

export async function renderBookingHistory(container: HTMLElement) {
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
  container.innerHTML = `<h2>Booking History</h2>`;
  const tableContainer = document.createElement("span");
  tableContainer.className="bookinghistory";
  createTable();
  async function createTable() {
    var orders = await APICALLS.fetchOrders(currentUser?.userID||0);
    tableContainer.innerHTML = "";
    const table = document.createElement("table");
    table.border = "1";
    table.style.borderCollapse = "collapse";
    table.style.width = "100%";

    var headerRow = document.createElement("tr") as HTMLTableRowElement;
    headerRow.innerHTML = `
        <th>booking ID</th>
        <th>User Id</th>
        <th>Total Price</th>
        <th>Booking Status</th>
        <th>Date Of Booking</th>
        <th>Action</th>`;
    table.appendChild(headerRow);
    
    orders.forEach((order) => {
      if (order.userID == currentUser!.userID) {
        var row = document.createElement("tr") as HTMLTableRowElement;
        row.innerHTML = `<td>${order.bookingID}</td> <td>${order.userID}</td> <td>${order.totalPrice}</td><td>${order.status}</td> 
              <td>${new Date(order.dateOfBooking).toLocaleDateString()}</td>
              <td>
              <button onclick="ShowBookDetails(${order.bookingID})" id="show">Show Details</button>
              <button onclick="cancelOrder(${order.bookingID})">Cancel</button></td>`;
        table.appendChild(row);
      }
    })
    tableContainer.appendChild(table);
  }
  container.appendChild(tableContainer);

  async function cancelOrder(bookingID: number) {
    var confirmation = confirm("Are you sure you want to cancel this order?");
    if (!confirmation) {
      return;
    }
    var order = await APICALLS.getIndividualOrder(bookingID);
    if (order == null) {
      alert("Order not found");
      return;
    }
    if (order!.status=== bookingStatus[1]) {
      alert("Order already cancelled");
      return;
    }
    await APICALLS.cancelOrder(currentUser!.userID, bookingID);
    // var userChange = await APICALLS.getIndividualUser(currentUser.email, currentUser.password);
    // localStorage.setItem("user", JSON.stringify(userChange));
    alert("Order cancelled successfully");
    createTable();
  }
  async function ShowBookDetails(bookingID : number){
    const overlayer=document.createElement("div");
    overlayer.id="over";
    container.appendChild(overlayer);
    const over=(document.getElementById("over") as HTMLDivElement);
    var rooms:RoomSelection[]=await APICALLS.GetBookedRooms(bookingID);
    if(rooms.length==0)
    {
      alert("No Rooms booked yet !");
      return;
    }
    over.style.display="block";
    var roomdiv=document.createElement("div");
    roomdiv.className="selectedRoom";
    roomdiv.id="sel";
    var btn=document.createElement("div");
    btn.className="btn";
    btn.innerHTML=`
    <span>Booked Rooms</span>
    <button onclick="overlays()">Back</button>`;
    roomdiv.appendChild(btn);
    var table=document.createElement("table") as HTMLTableElement;
    table.border = "1";
    table.style.borderCollapse = "collapse";
    table.style.width = "100%";
    var headerrow=document.createElement("tr");
    headerrow.innerHTML=`
    <th>Room Selection ID</th>
    <th>Booking ID</th>
    <th>Room ID</th>
    <th>Wishlist ID</th>
    <th>From Date</th>
    <th>To Date</th>
    <th>Number of Days</th>
    <th>Price</th>
    <th>Booking Status</th>
    `;
    table.appendChild(headerrow);
    rooms.forEach((room) =>{
      var row=document.createElement("tr");
      row.innerHTML=`
      <td>${room.selectionID}</td>
      <td>${room.bookingID}</td>
      <td>${room.roomID}</td>
      <td>${room.wishListID}</td>
      <td>${new Date(room.stayingDateFrom).toLocaleDateString()}</td>
      <td>${new Date(room.stayingDateTo).toLocaleDateString()}</td>
      <td>${room.numberOfDays}</td>
      <td>${room.price}</td>
      <td>${room.bookingStatus}</td>
      `;
      table.appendChild(row);
    })
    roomdiv.appendChild(table);
    container.appendChild(roomdiv);
  }
  function overlays(){
    const tableview=document.getElementById("sel") as HTMLDivElement;
    const overlayel=document.getElementById("over") as HTMLDivElement;
    overlayel.style.display='none';
    container.removeChild(tableview);
  }
  (window as any).overlays=overlays;
  (window as any).cancelOrder = cancelOrder;
  (window as any).ShowBookDetails=ShowBookDetails;
}