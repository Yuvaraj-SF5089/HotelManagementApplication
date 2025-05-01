
export interface User{
    userID:number;
    userName: string;
    mobileNumber:string;
    aadharNumber:string;
    email:string;
    address:string;
    foodType:string;
    gender:string;
    amount:number;
    password:string;
    profilePhoto:string;
}
export const foodTypeOptions: string[] = ["Veg","NonVeg"];
export const GenderOptions:string[] = ["Male","Female","Others"];
export const roomTypeOptions:string[] = ["Standard","Delux","Suit"];
export const bookingStatus:string[] = ["Booked","Cancelled"];

export interface RoomDetails{
    roomID:number;
    roomType:string;
    numberOfBeds:number;
    pricePerDay:number;
    roomImage:string;
}
export interface RoomSelection{
    selectionID:number;
    wishListID:number;
    bookingID:number;
    roomID:number;
    stayingDateFrom:Date;
    stayingDateTo:Date;
    price:number;
    numberOfDays:number;
}
export interface WishList{
    wishListID:number;
    userID:number;
    roomID:number;
    priceOfRoom:number;
    fromDate:Date;
    toDate:Date;
}
export interface BookingDetails{
    bookingID:number;
    userID:number;
    totalPrice:string;
    dateOfBooking:Date;
    status:string;
}

