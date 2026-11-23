using Final_Project.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Services.Description;

namespace Final_Project.Controllers
{
    //[EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class CustomerController : ApiController
    {
        //CreateCustomer
        [Route("api/service/SaveCustomer")]
        [ActionName("SaveCustomer")]
        [HttpPost]
        public string SaveCustomer([FromBody] Customer customer)
        {
            if (customer == null)
            {
                return JsonConvert.SerializeObject(new { Message = "Request body is empty or invalid." });
            }

            return customer.SaveCustomerFunction(customer);
        }

        //UpdateCustomer
        [Route("api/service/UpdateCustomer")]
        [ActionName("UpdateCustomer")]
        [HttpPost]
        public string UpdateCustomer([FromBody] Customer customer)
        {
            if (customer == null)
            {
                return JsonConvert.SerializeObject(new { Message = "Invalid request body" });
            }
            return customer.UpdateCustomerFunction(customer);
        }

        //DeleteCustomer
        [Route("api/service/DeleteCustomer")]
        [ActionName("DeleteCustomer")]
        [HttpPost]
        public string DeleteCustomer([FromBody] Customer customer)
        {
            if (customer == null)
            {
                return JsonConvert.SerializeObject(new { Message = "Invalid request body" });
            }
            return customer.DeleteCustomerFunction(customer);
        }

        //Validate Customer
        [Route("api/service/ValidateCustomer")]
        [ActionName("ValidateCustomer")]
        [HttpPost]

        public Customer ValidateCustomer([FromBody] Customer customer)
        {
            return customer.ValidateCustomer(customer);
        }
    }
}