using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HotelManagementAPI.Models
{
    [Table("users", Schema = "public")]
    public class User
    {
        [Key]
        public int UserID { get; set; }
        public string UserName { get; set; }
        public string MobileNumber { get; set; }
        public string AadharNumber { get; set; }
        public string Password{get;set;}
        public string Email { get; set; }
        public string Address { get; set; }
        public string FoodType { get; set; }
        public string Gender { get; set; }
        public double Amount { get; set; }
        public string ProfilePhoto{get;set;}
    }
}