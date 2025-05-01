using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HotelManagementAPI.Models
{
    [Table("roomdetails", Schema = "public")]
    public class RoomDetails
    {
        [Key]
        public int RoomID { get; set; }
        public string RoomType { get; set; }
        public int NumberOfBeds { get; set; }
        public double PricePerDay { get; set; }
        public string RoomImage{get;set;}
    }
}