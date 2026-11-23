using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Final_Project.Models;
using System.Web.Http;

namespace Final_Project.Controllers
{
    public class InvoiceController : ApiController
    {
        [Route("api/service/SaveInvoice")]
        [ActionName("SaveInvoice")]
        [HttpPost]
        public object SaveInvoice([FromBody] Invoice invoice)
        {
            int newInvoiceId = invoice.SaveInvoice(invoice);
            return Ok(new { newInvoiceId = newInvoiceId });
        }
    }
}