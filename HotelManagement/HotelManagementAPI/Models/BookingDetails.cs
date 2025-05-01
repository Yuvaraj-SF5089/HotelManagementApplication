using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HotelManagementAPI.Models
{
    [Table("bookingdetails", Schema = "public")]
    public class BookingDetails
    {
        [Key]
        public int BookingID { get; set; }
        public int UserID { get; set; }
        public double TotalPrice { get; set; }
        public DateTime DateOfBooking { get; set; }
        public string Status { get; set; }

    }
}