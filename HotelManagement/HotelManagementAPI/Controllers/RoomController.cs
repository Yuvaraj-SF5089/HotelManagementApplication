using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotelManagementAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace HotelManagementAPI.Controllers
{
    [ApiController]
    [Route("api/hotelmanagement/roomcontroller")]
    public class RoomController:ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public RoomController(ApplicationDBContext _db)
        {
            _dbContext= _db;
        }
        [HttpGet("get/rooms")]
        public IActionResult GetRoomDetails()
        {
            return Ok(_dbContext.roomDetails);
        }

        [HttpGet("get/room/{roomID}")]
        public IActionResult GetRoomDetail(int roomID)
        {
            var room = _dbContext.roomDetails.Find(roomID);
            if (room == null)
            {
                return NotFound();
            }
            return Ok(room);
        }

        [HttpPost("add/newroom")]
        public IActionResult AddNewRoom(RoomDetails room)
        {
            if(room==null)
            {
                return NotFound("room not found");
            }
            _dbContext.roomDetails.Add(room);
            _dbContext.SaveChanges();
            return Ok(room.RoomID);
        }

        [HttpPut("edit/room")]
        public IActionResult EditRoom(RoomDetails room)
        {
            if(room==null)
            {
                return NotFound();
            }
            var editRoom=_dbContext.roomDetails.FirstOrDefault(x=>x.RoomID==room.RoomID);
            if(editRoom==null)
            {
                return NotFound("Room not found");
            }
            editRoom.RoomType=room.RoomType;
            editRoom.PricePerDay=room.PricePerDay;
            editRoom.NumberOfBeds=room.NumberOfBeds;
            editRoom.RoomImage=room.RoomImage;
            _dbContext.SaveChanges();
            return Ok(editRoom.RoomID);
        }
        [HttpDelete("delete/room/{roomID}")]
        public IActionResult DeleteRoom(int  roomID)
        {
            var room=_dbContext.roomDetails.Find(roomID);
            if(room==null)
            {
                return NotFound();
            }
            _dbContext.roomDetails.Remove(room);
            _dbContext.SaveChanges();
            return Ok();
        }

        // [HttpGet("available/rooms/{fromDate}/{toDate}")]
        // public IActionResult GetAvailableRooms(DateTime fromDate,DateTime toDate)
        // {
        //     List<RoomDetails> rooms=_dbContext.roomdetails;
        //     List<RoomSelection> selectedRooms=ApplicationDBContext.roomSelections;
        //     List<RoomDetails> availableRooms=new List<RoomDetails>();
        //     foreach(RoomDetails room in rooms)
        //     {
        //         bool flag=false;
        //         foreach(RoomSelection selectedRoom in selectedRooms)
        //         {
        //             if(room.RoomID==selectedRoom.RoomID)
        //             {
                        
        //                 if(selectedRoom.BookingStatus==ApplicationDBContext.bookingStatus[0])
        //                 {
        //                     flag=true;
        //                 }
        //                 else
        //                 {
        //                     if(selectedRoom.StayingDateTo>=fromDate)
        //                     {
        //                         flag=true;
        //                     }
        //                 }

        //             }
        //         }
        //         if(flag==false)
        //         {
        //             availableRooms.Add(room);
        //         }
        //     }
        //     return Ok(availableRooms);
        // }
        // [HttpGet("Check/availability/{roomID}/{fromDate}/{toDate}")]
        // public IActionResult CheckRoomAvailability(int roomID,DateTime fromDate, DateTime toDate)
        // {    
        //     List<RoomDetails>rooms=GetAvailableRooms(fromDate,toDate)
        // }

        //adding room to the wishlist
        [HttpPost("add/wishlist")]
        public IActionResult AddToWishList([FromBody]WishList wishList)
        {
            if(wishList==null)
            {
                return NotFound("WishList has no properties");
            }
            _dbContext.wishLists.Add(wishList);
            _dbContext.SaveChanges();
            return Ok(wishList.WishListID);
        }
    }
}