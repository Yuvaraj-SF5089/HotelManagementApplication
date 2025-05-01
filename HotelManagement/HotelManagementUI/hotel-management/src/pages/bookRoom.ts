import { RoomDetails, WishList } from '../models/models.ts';
import * as APICALLS from '../api/apicalls';

export function renderBookRooms(container: HTMLElement) {
    const divContainer = document.createElement("span") as HTMLSpanElement;
    divContainer.className = "bookRoomList";
    createList();
    async function createList() {
        var rooms = await APICALLS.fetchRooms();
        rooms.forEach((room) => {
            const div = document.createElement("div") as HTMLDivElement;
            div.className = "cart";
            div.innerHTML = `
                <div>
                <img src="${room.roomImage}" width="35%">
                </div>
                <p>Room Type: ${room.roomType}</p>
                <p>Number of Beds: ${room.numberOfBeds}</p>
                <p>Price Per Day: ${room.pricePerDay}</p>
                <button id="addCartBtn" onclick="addToCart('${room.roomID}','${room.pricePerDay}')">Add to Cart</button>
                `;
            divContainer.appendChild(div);
        });
        container.appendChild(divContainer);
        showDatePickers();
    }
    // let fromDate: string;
    // let toDate: string;
    async function addToCart(roomID:number,pricePerDay:number) {
        const date1 = document.getElementById("fromDate") as HTMLInputElement;
        const date2 = document.getElementById("toDate") as HTMLInputElement;
        const fromDate = date1.value;
        const toDate = date2.value;
        let dateFrom: Date = new Date(fromDate);
        // const a=dateFrom.toISOString().split('T')[0];
        let dateTo: Date = new Date(toDate);
        // const b=dateTo.toISOString().split('T')[0];
        // let wishDate1=new Date(a);

        // let wishDate2=new Date(b);
        if (fromDate === "" || toDate === "") {
            alert("Please choose Date!");
            return;
        }
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
        if (roomID) {
            // alert(dateFrom)
            // alert(dateTo)
            // var totaldays = Number((wishDate2.getTime() - wishDate1.getTime()) / (1000 * 60 * 60 * 24));
            // if (isNaN(totaldays) || !room.pricePerDay) {
            //     alert("Error calculating price. Check room data and dates.");
            //     return
            // }

            // const price = totaldays * room.pricePerDay;
            const wish: WishList = { wishListID: 0, roomID: roomID, fromDate: dateFrom, toDate: dateTo, priceOfRoom:pricePerDay, userID: currentUser.userID };
            var response = await APICALLS.AddToWishList(wish);
            alert(response);
        }
    }
    async function showDatePickers() {
        const dateContainer = document.createElement("div") as HTMLDivElement;
        dateContainer.className = "dateContainer";
        const div = document.createElement("div") as HTMLDivElement;
        div.className = "datediv";
        div.innerHTML = `
        <form>
        <label for="fromDate">From Date:</label> <input type="date" id="fromDate"> <br>
        <label for="toDate">To Date:</label> <input type="date" id="toDate"> <br>
        <button id="save" type="reset">Reset</button>
        </form>
        `;
        dateContainer.appendChild(div);
        container.appendChild(dateContainer);
        // let datefrominput: string;
        // let dateToinput: string;
        // document.getElementById("save")?.addEventListener("click",function(){
        //     const date1=document.getElementById("fromDate") as HTMLInputElement;
        //     const date2=document.getElementById("toDate") as HTMLInputElement;
        //     datefrominput=date1.value;
        //     dateToinput=date2.value;
        //     date1.value="";
        //     // dateContainer.innerHTML="";
        // });

    }
    (window as any).addToCart = addToCart;
    (window as any).showDatePickers = showDatePickers;
}