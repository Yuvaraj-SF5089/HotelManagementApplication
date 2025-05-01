using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.VisualBasic;

namespace HotelManagementAPI.Models
{
    [Table("wishlists", Schema = "public")]
    public class WishList
    {
        [Key]
        public int WishListID { get; set; }
        public int UserID { get; set; }
        public int RoomID { get; set; }
        public double PriceOfRoom { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }

    }
}