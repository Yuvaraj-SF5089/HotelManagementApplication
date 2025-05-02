using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace HotelManagementAPI.Controllers
{
    [ApiController]
    [Route("api/hotelmanagement/bookingcontroller")]
    public class BookingController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public BookingController(ApplicationDBContext _db)
        {
            _dbContext = _db;
        }
        [HttpGet("bookings/{userID}")]
        public IActionResult GetBookingHistory(int userID)
        {
            var user = _dbContext.users.Find(userID);
            if (user == null)
            {
                return BadRequest("User not found");
            }
            var orders = _dbContext.bookings.Where(x => x.UserID == user.UserID).ToList();
            return Ok(orders);

        }
        [HttpGet("selectedRoom/{bookingID}")]
        public IActionResult GetSelectedRoom(int bookingID)
        {
            var room = _dbContext.roomSelections.Find(bookingID);
            if (room == null)
            {
                return NotFound("No room selected");
            }
            return Ok(room);
        }
        [HttpPut("cancelbooking/{bookingID}/{userID}")]
        public IActionResult CancelBooking(int bookingID, int userID)
        {
            var booking = _dbContext.bookings.Find(bookingID);
            if (booking == null)
            {
                return NotFound("Booking not found");
            }
            var user = _dbContext.users.Find(userID);
            if (user == null)
            {
                return NotFound("user not found");
            }
            user.Amount += booking.TotalPrice;
            booking.Status = ApplicationDBContext.bookingStatus[1];
            _dbContext.SaveChanges();
            var roomSelections=_dbContext.roomSelections.ToList();
            roomSelections.ForEach(room=>{
                room.BookingStatus=ApplicationDBContext.bookingStatus[1];
            });
            _dbContext.SaveChanges();
            return Ok(booking.BookingID);

        }
        [HttpGet("bookedrooms/{bookingID}")]
        public IActionResult GetBookedRooms(int bookingID)
        {
            // var booking = _dbContext.bookings.Find(bookingID);
            // if (booking == null)
            // {
            //     return BadRequest("Booking not found");
            // }
            var rooms=_dbContext.roomSelections.Where(x=>x.BookingID==bookingID).ToList();
            return Ok(rooms);
        }

    }
}