using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DotAng.API.Data;
using DotAng.API.Dtos;
using DotAng.API.Helpers;
using DotAng.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace DotAng.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;

        public ProductsController(IDatingRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _repo.GetProducts();

            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await _repo.GetProduct(id);

            return Ok(product);
        }

        [HttpPost("create")]
        public async Task<ActionResult<Product>> CreateProduct(Product product)
        {
            _repo.Add(product);
            await _repo.SaveAll();

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id}, product);
        }
    }
}