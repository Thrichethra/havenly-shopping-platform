using Final_Project.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Web.Http;

namespace Final_Project.Controllers
{
    public class ProductController : ApiController
    {
        // Read all products
        [Route("api/service/ReadAllProduct")]
        [ActionName("ReadAllProduct")]
        [HttpPost]
        public string ReadAllProduct()
        {
            Product prod = new Product();
            return prod.ReadProductFunction();
        }

        // Read products by category
        [Route("api/service/ReadProductsByCategory")]
        [HttpPost]
        public string ReadProductsByCategory([FromBody] int cid)
        {
            Product prod = new Product();
            return prod.ReadProductByCategory(cid);
        }

        // Read product details by PID
        [Route("api/service/ReadProductDetails")]
        [HttpPost]
        public string ReadProductDetails([FromBody] object request)
        {
            if (request == null)
                return JsonConvert.SerializeObject(new { error = "Request body is null." });

            try
            {
                JObject obj = request as JObject ?? JObject.Parse(request.ToString());

                if (obj["PID"] == null)
                    return JsonConvert.SerializeObject(new { error = "PID is missing in request." });

                int pid = obj["PID"].Value<int>();

                Product prod = new Product();
                return prod.ReadProductDetails(pid);
            }
            catch (Exception ex)
            {
                return JsonConvert.SerializeObject(new { error = $"Error parsing request: {ex.Message}" });
            }
        }
    }
}
