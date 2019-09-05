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
        public async Task<IActionResult> CreateProduct(ProductsForCreationDto productsForCreationDto)
        {
            var product = _mapper.Map<Product>(productsForCreationDto);

            _repo.Add(product);

            if (await _repo.SaveAll())
            {
                var productToReturn = _mapper.Map<ProductsForCreationDto>(product);
                return CreatedAtRoute("GetMessage", new {id = product.Id}, productToReturn);
            }

            throw new Exception("Creating the message failed on save");
        }
    }
}