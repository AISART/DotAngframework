namespace DotAng.API.Dtos
{
    public class ProductForUpdateDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public string Price { get; set; }
        public string Availability { get; set; }
        public string Add_to_cart_url { get; set; }
    }
}