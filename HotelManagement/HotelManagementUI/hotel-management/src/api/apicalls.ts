import { BookingDetails, RoomDetails, User, WishList } from "../models/models";
let url = "http://localhost:5019/api/hotelmanagement";

export async function checkUser(email: string): Promise<boolean> {
    let apiURL = `${url}usercontroller/${email}`;
    let response = await fetch(apiURL);
    if (!response.ok) {
        // throw new Error("Fail to fetch data");
        return false;
    }
    return await response.json();
}

export async function login(email: string, password: string): Promise<boolean> {
    const response = await fetch(`${url}/auth/login`, {
        method: "POST",
        credentials: "include", // <--- Important!
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        return false;
    }
    return true;

}

export async function isAuthenticated(): Promise<any> {
    try {
        const response = await fetch(`${url}/auth/me`, {
            method: "GET",
            credentials: "include", // Ensure cookies are sent with the request
        });

        if (response.ok) {
            const data = await response.json();
            return {
                success: true,
                email: data.email,
                name: data.name
            };
        }

        return { success: false }; // If not authenticated, return false
    } catch (error) {
        //console.error("Error fetching user credentials:", error);
        return { success: false }; // Return false in case of an error
    }
}

export function logout(): Promise<void> {
    return fetch(`${url}/auth/logout`, {
        method: "POST",
        credentials: "include",
    }).then(() => { });
}

export async function addNewUser(user: User): Promise<string> {
    let apiURL = `${url}/usercontroller/newUser/${user}`;
    let response = await fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    if (!response.ok) {
        throw new Error("Fail to add data");
    }
    return await response.text();
}
export async function getIndividualUser(email: string): Promise<User | null> {
    let apiURL = `${url}/usercontroller/${email}`;
    let response = await fetch(apiURL);
    if (!response.ok) {
        return null;
    }
    //returns true if the customer is already exist
    return await response.json();
}
export async function rechargeWalletBalance(userID: number, amount: number): Promise<void> {

    let apiURL = `${url}/usercontroller/recharge/${userID}/${amount}`;
    let response = await fetch(apiURL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error("Fail to update data");
    }
}
export async function fetchRooms(): Promise<RoomDetails[]>{
    let apiURL=`${url}/roomcontroller/get/rooms`;
    let response=await fetch(apiURL);
    if (!response.ok) {
        throw new Error("Fail to fetch data");
    }
    return await response.json();
}
export async function getIndividualRoom(roomID: number): Promise<RoomDetails | null> {
    let apiURL = `${url}/roomcontroller/get/room/${roomID}`;
    let response = await fetch(apiURL);
    if (!response.ok) {
        return null;
    }
    //returns medicine
    return await response.json();
}
export async function addNewRoom(room: RoomDetails): Promise<string> {
    let apiURL = `${url}/roomcontroller/add/newroom`;
    let response = await fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(room)
    });

    if (!response.ok) {
        throw new Error("Fail to add data");
    }
    return await response.text();
}

export async function editRoomDetail(room: RoomDetails): Promise<void> {
    let apiURL = `${url}/roomcontroller/edit/room`;
    let response = await fetch(apiURL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(room)
    });
    if (!response.ok) {
        throw new Error("Fail to update data");
    }
}

export async function deleteRoomDetail(roomID: number): Promise<void> {

    const response = await fetch(`${url}/roomcontroller/delete/room/${roomID}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete contact');
    }
}

export async function AddToWishList(wishList:WishList):Promise<string> {
    let apiURL=`${url}/roomcontroller/add/wishlist`;
    const response=await fetch(apiURL,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(wishList)

    });
    if(!response.ok)
    {
        throw new Error("failed to update");
    }
    return response.text();
}

export async function fetchOrders(userID:number): Promise<BookingDetails[]> {
    let apiURL = `${url}/bookingcontroller/bookings/${userID}`;
    let response = await fetch(apiURL);
    if (!response.ok) {
        throw new Error("Fail to fetch data");
    }
    return await response.json();
}

export async function getIndividualOrder(bookingID: number): Promise<BookingDetails | null> {
    let apiURL = `${url}/bookingcontroller/selectedRoom/${bookingID}`;
    let response = await fetch(apiURL);
    if (!response.ok) {
        return null;
    }
    //returns medicine
    return await response.json();
}

export async function cancelOrder(userID: number, bookingID: number): Promise<void> {
    let apiURL = `${url}/bookingcontroller/cancelbooking/${bookingID}/${userID}`;
    let response = await fetch(apiURL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error("Fail to update data");
    }
}

export async function fetchWishLists(userID:number): Promise<WishList[]> {
    let apiURL = `${url}/wishlistcontroller/get/wishList/${userID}`;
    let response = await fetch(apiURL);
    if (!response.ok) {
        throw new Error("Fail to fetch data");
    }
    return await response.json();
}

export async function deleteWishList(wishListID:number) {
    const response = await fetch(`${url}/wishlistcontroller/delete/wishlist/${wishListID}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete contact');
    }
    
}
export async function bookIndvidualRoom(wishListID:number,userID:number):Promise<string> {
    const response=await fetch(`${url}/wishlistcontroller/confirm/booking/${wishListID}/${userID}`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        }
    });
    if(!response.ok){
        throw new Error('Failed to book room');
    }
    return response.text();
}

export async function bookAllRooms(userID:number):Promise<string> {
    const response=await fetch(`${url}/wishlistcontroller/confirm/bookingall/${userID}`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        }
    });
    if(!response.ok)
    {
        throw new Error('Failed to book rooms');
    }
    return response.text();
    
}