using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotelManagementAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace HotelManagementAPI.Controllers
{
    [ApiController]
    [Route("api/hotelmanagement/wishlistcontroller")]
    public class WishListController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public WishListController(ApplicationDBContext _db)
        {
            _dbContext = _db;
        }
        [HttpGet("get/wishList/{userID}")]
        public IActionResult GetWishList(int userID)
        {
            var user = _dbContext.users.Find(userID);
            if (user == null)
            {
                return NotFound();
            }
            var userWishlists = _dbContext.wishLists.Where(x => x.UserID == userID).ToList();
            return Ok(userWishlists);
        }

        [HttpDelete("delete/wishlist/{wishlistID}")]
        public IActionResult DeleteWishList(int wishlistID)
        {
            var wishList = _dbContext.wishLists.Find(wishlistID);
            if (wishList == null)
            {
                return NotFound("Wishlist not found");
            }
            _dbContext.wishLists.Remove(wishList);
            _dbContext.SaveChanges();
            return Ok(wishList.WishListID);
        }
        [HttpPost("confirm/bookingall/{userID}")]
        public async Task<IActionResult> BookAllRooms(int userID)
        {
            var user = _dbContext.users.Find(userID);
            if (user == null)
            {
                return NotFound();
            }
            double totalPrice = 0;
            foreach (WishList wish in _dbContext.wishLists)
            {
                if (userID == wish.UserID)
                {
                    totalPrice += wish.PriceOfRoom;
                }
            }
            if (user.Amount < totalPrice)
            {
                return Ok("false");
            }
            user.Amount -= totalPrice;
            BookingDetails booking = new BookingDetails() { UserID = user.UserID, TotalPrice = totalPrice, DateOfBooking = DateTime.Now, Status = ApplicationDBContext.bookingStatus[0] };

            List<WishList> rooms = _dbContext.wishLists.ToList();
            List<RoomSelection> selectedRooms = _dbContext.roomSelections.ToList();

            foreach (WishList room in rooms)
            {
                bool flag = true;
                foreach (RoomSelection selectedRoom in selectedRooms)
                {
                    if (userID == room.UserID && room.RoomID == selectedRoom.RoomID)
                    {

                        if (selectedRoom.BookingStatus == ApplicationDBContext.bookingStatus[0])
                        {
                            // foreach(WishList wish in _dbContext.wishLists)
                            // {
                            // if(room.UserID==userID)
                            // {
                            if (selectedRoom.StayingDateTo >= room.FromDate)
                            {
                                // return Ok("w"+room.WishListID);
                                // RoomSelection room1 = new RoomSelection() { RoomID = room.RoomID, WishListID = room.WishListID, BookingID = booking.BookingID, StayingDateFrom = room.FromDate, StayingDateTo = room.ToDate, Price = room.PriceOfRoom, NumberOfDays = (room.ToDate - room.FromDate).Days, BookingStatus = ApplicationDBContext.bookingStatus[0] };
                                // _dbContext.roomSelections.Add(room1);
                                flag = false;
                            }
                            // }
                            // }
                        }
                        if (flag == true)
                        {
                            _dbContext.bookings.Add(booking);
                            _dbContext.SaveChanges();
                            RoomSelection room1 = new RoomSelection() { RoomID = room.RoomID, WishListID = room.WishListID, BookingID = booking.BookingID, StayingDateFrom = room.FromDate, StayingDateTo = room.ToDate, Price = room.PriceOfRoom, NumberOfDays = (room.ToDate - room.FromDate).Days, BookingStatus = ApplicationDBContext.bookingStatus[0] };
                            _dbContext.roomSelections.Add(room1);
                            _dbContext.SaveChanges();

                        }
                       
                    }
                }

            }
            // user.Amount-=totalPrice;
            // BookingDetails booking = new BookingDetails() {UserID=user.UserID,TotalPrice=totalPrice,DateOfBooking=DateTime.Now,Status=ApplicationDBContext.bookingStatus[0]};
            // _dbContext.bookings.Add(booking);
            // _dbContext.SaveChanges();
            // foreach (WishList wish in _dbContext.wishLists)
            // {
            //     if (userID == wish.UserID)
            //     {
            //         // foreach(RoomSelection selection in ApplicationDBContext.roomSelections)
            //         // {
            //         // if(selection.RoomID==wish.RoomID && selection.WishListID==wish.WishListID)
            //         // {
            //         //     if(selection.BookingStatus!=ApplicationDBContext.bookingStatus[0])
            //         // {
            //         RoomSelection room1 = new RoomSelection() { RoomID = wish.RoomID, WishListID = wish.WishListID, BookingID = booking.BookingID, StayingDateFrom = wish.FromDate, StayingDateTo = wish.ToDate, Price = wish.PriceOfRoom, NumberOfDays = (wish.ToDate - wish.FromDate).Days, BookingStatus = ApplicationDBContext.bookingStatus[0] };
            //         _dbContext.roomSelections.Add(room1);
            //         // }
            //         // }
            //         // }
            //     }
            // }
            foreach (WishList wish1 in rooms)
            {
                foreach (RoomSelection roomSelection in _dbContext.roomSelections)
                {
                    if (wish1.UserID == userID && wish1.WishListID == roomSelection.WishListID)
                    {
                        _dbContext.wishLists.Remove(wish1);
                    }
                }
            }
            _dbContext.SaveChanges();
            if(booking.BookingID<=0)
            {
                return Ok("failed");
            }
            return Ok(booking.BookingID);

        }
        [HttpPost("confirm/booking/{wishlistID}/{userID}")]
        public IActionResult BookRoom(int wishlistID, int userID)
        {
            var user = _dbContext.users.Find(userID);
            if (user == null)
            {
                return NotFound();
            }
            List<RoomSelection> selectedRooms = _dbContext.roomSelections.ToList();
            List<WishList> wishes = _dbContext.wishLists.ToList();
            foreach (WishList room in wishes)
            {
                foreach (RoomSelection selectedRoom in selectedRooms)
                {
                    if (userID == room.UserID && room.RoomID == selectedRoom.RoomID)
                    {

                        if (selectedRoom.BookingStatus == ApplicationDBContext.bookingStatus[0])
                        {
                            foreach (WishList wish in _dbContext.wishLists)
                            {
                                if (wish.UserID == userID)
                                {
                                    if (selectedRoom.StayingDateTo >= wish.FromDate)
                                    {
                                        return Ok("false");
                                    }
                                }
                            }
                        }
                    }
                }
            }
            var wishlist = _dbContext.wishLists.FirstOrDefault(x => x.WishListID == wishlistID && x.UserID == userID);

            if (user.Amount < wishlist!.PriceOfRoom)
            {
                return Ok("low");
            }
            user.Amount -= wishlist.PriceOfRoom;
            BookingDetails booking = new BookingDetails() { UserID = user.UserID, TotalPrice = wishlist.PriceOfRoom, DateOfBooking = DateTime.Now, Status = ApplicationDBContext.bookingStatus[0] };
            _dbContext.bookings.Add(booking);
            _dbContext.SaveChanges();
            RoomSelection room1 = new RoomSelection() { RoomID = wishlist.RoomID, WishListID = wishlist.WishListID, BookingID = booking.BookingID, StayingDateFrom = wishlist.FromDate, StayingDateTo = wishlist.ToDate, Price = wishlist.PriceOfRoom, NumberOfDays = (wishlist.ToDate - wishlist.FromDate).Days, BookingStatus = ApplicationDBContext.bookingStatus[0] };
            _dbContext.roomSelections.Add(room1);

            _dbContext.wishLists.Remove(wishlist);
            _dbContext.SaveChanges();
            return Ok(booking.BookingID);
        }

    }
}