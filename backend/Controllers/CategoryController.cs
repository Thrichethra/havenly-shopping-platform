using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Final_Project.Models;

namespace Final_Project.Controllers
{
    public class CategoryController : ApiController
    {
        //Create: POST
        [Route("api/service/SaveCategory")]
        [ActionName("SaveCategory")]
        [HttpPost]
        public string SaveCategory([FromBody] Category category)
        {
            return category.SaveCategoryFunction(category);
        }

        //Update: POST
        [Route("api/service/UpdateCategory")]
        [ActionName("UpdateCategory")]
        [HttpPost]
        public string UpdateCategory([FromBody] Category category)
        {
            return category.UpdateCategoryFunction(category);
        }

        //Delete: POST
        [Route("api/service/DeleteCategory")]
        [ActionName("DeleteCategory")]
        [HttpPost]
        public string DeleteCategory([FromBody] Category category)
        {

            return category.DeleteCategoryFunction(category);
        }

        //Read: POST
        [Route("api/service/ReadAllCategory")]
        [ActionName("ReadAllCategory")]
        [HttpPost]
        public string ReadAllCategory()
        {
            Category cat = new Category();
            return cat.ReadCategoryFunction();
        }
    }
}