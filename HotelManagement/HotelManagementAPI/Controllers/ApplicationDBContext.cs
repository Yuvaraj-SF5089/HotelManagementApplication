using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotelManagementAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace HotelManagementAPI.Controllers
{
    public class ApplicationDBContext:DbContext
    {
        public static List<string> foodoptions=["VEG","NONVEG"];
        public static List<string> roomtypes=["Standard","Delux","Suit"];
        public static List<string> bookingStatus=["Booked","Cancelled"];
        //  public static List<User> users = new List<User>()
        // {
        //     new User() { UserID = 1, UserName = "Ravi", Email = "ravi@gmail.com",  Password = "123", Amount = 1000, MobileNumber = "9876543210",AadharNumber="43535352",Address="chennai", FoodType="VEG",Gender="Male"},
        //     new User() { UserID = 2, UserName = "Yuva", Email = "yuva@gmail.com",  Password = "123", Amount = 1000, MobileNumber = "9876543210",AadharNumber="43535352",Address="chennai", FoodType="NONVEG",Gender="Male"}
        // };
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
    {
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior",true);
    }
    public DbSet<User> users{get;set;}
    public DbSet<RoomDetails> roomDetails{get;set;}
    public DbSet<RoomSelection> roomSelections{get;set;}
    public DbSet<BookingDetails> bookings{get;set;}
    public DbSet<WishList> wishLists{get;set;}
    
        // public static List<RoomDetails> roomdetails=new List<RoomDetails>()
        // {
        //     new RoomDetails(){RoomID=1,RoomType=roomtypes[0],NumberOfBeds=2,PricePerDay=500},
        //     new RoomDetails(){RoomID=2,RoomType=roomtypes[0],NumberOfBeds=2,PricePerDay=700},
        //     new RoomDetails(){RoomID=3,RoomType=roomtypes[0],NumberOfBeds=2,PricePerDay=500},
        //     new RoomDetails(){RoomID=4,RoomType=roomtypes[0],NumberOfBeds=2,PricePerDay=500},
        //     new RoomDetails(){RoomID=5,RoomType=roomtypes[0],NumberOfBeds=2,PricePerDay=500},
        //     new RoomDetails(){RoomID=6,RoomType=roomtypes[1],NumberOfBeds=2,PricePerDay=1000},
        //     new RoomDetails(){RoomID=7,RoomType=roomtypes[1],NumberOfBeds=2,PricePerDay=1000},
        //     new RoomDetails(){RoomID=8,RoomType=roomtypes[1],NumberOfBeds=4,PricePerDay=1400},
        //     new RoomDetails(){RoomID=9,RoomType=roomtypes[1],NumberOfBeds=4,PricePerDay=1400},
        //     new RoomDetails(){RoomID=10,RoomType=roomtypes[2],NumberOfBeds=2,PricePerDay=2000},
        //     new RoomDetails(){RoomID=11,RoomType=roomtypes[2],NumberOfBeds=2,PricePerDay=2000},
        //     new RoomDetails(){RoomID=12,RoomType=roomtypes[2],NumberOfBeds=2,PricePerDay=2000},
        //     new RoomDetails(){RoomID=13,RoomType=roomtypes[2],NumberOfBeds=4,PricePerDay=2500}
        // };

        // public static List<RoomSelection> roomSelections=new List<RoomSelection>()
        // {
        //     new RoomSelection(){SelectionID=1,WishListID=1,BookingID=1,RoomID=1,StayingDateFrom=new DateTime(2024, 11, 11, 6, 0, 0),StayingDateTo=new DateTime(2024, 11, 12, 14, 0, 0),Price=500,NumberOfDays=1,BookingStatus=bookingStatus[0]},
        // };
        // public static List<BookingDetails> bookings=new List<BookingDetails>()
        // {
        //     new BookingDetails(){BookingID=1,UserID=1,TotalPrice=1000,DateOfBooking=new DateTime(2025,04,01),Status=bookingStatus[0]}
        // };
        // public static List<WishList> wishLists=new List<WishList>()
        // {
        //     new WishList(){WishListID=1,UserID=1,RoomID=1,PriceOfRoom=500,FromDate=new DateTime(2025,05,01),ToDate=new DateTime(2025,05,10),}
        // };
    }
}