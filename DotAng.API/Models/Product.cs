using System.Collections.Generic;

namespace DotAng.API.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public string Price { get; set; }
        public string Availability { get; set; }
        public string Add_to_cart_url { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }
}