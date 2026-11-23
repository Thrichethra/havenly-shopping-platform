using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Final_Project.Models
{
    public class Category
    {
        public int CID { get; set; }

        public string CatName { get; set; }
        SqlConnection connection = new SqlConnection(DbConnection.connectionstring);

        // CREATE Function
        public string SaveCategoryFunction(Category category)
        {
            try
            {
                //open the connectivity
                connection.Open();

                SqlCommand cmd = new SqlCommand("EXEC spCreateCategory '" + category.CatName + "'", connection);
                int generatedCID = Convert.ToInt32(cmd.ExecuteScalar());

                //close connectivity
                connection.Close();
                return $"Category saved successfully with CID: {generatedCID}";
            }
            catch (Exception ex)
            {
                return $"Error: {ex.Message}";
            }
        }

        // UPDATE Function
        public string UpdateCategoryFunction(Category category)
        {
            try
            {
                //open the connectivity
                connection.Open();

                SqlCommand cmd = new SqlCommand("EXEC spUpdateCategory " + category.CID + ", '" + category.CatName + "'", connection);
                cmd.ExecuteNonQuery();

                //close connectivity
                connection.Close();
                return $"Category updated successfully with CID: {category.CID}";
            }
            catch (Exception ex)
            {
                return $"Error: {ex.Message}";
            }
        }

        //DELETE Function
        public string DeleteCategoryFunction(Category category)
        {
            try
            {
                //open the connectivity
                connection.Open();

                SqlCommand cmd = new SqlCommand("EXEC spDeleteCategory '" + category.CatName + "'", connection);
                cmd.ExecuteNonQuery();

                //close connectivity
                connection.Close();
                return $"Category deleted successfully: {category.CatName}";
            }
            catch (Exception ex)
            {
                return $"Error: {ex.Message}";
            }
        }

        //Read Function
        public string ReadCategoryFunction()
        {
            try
            {
                List<Category> categories = new List<Category>();

                using (SqlConnection connection = new SqlConnection(DbConnection.connectionstring))
                {
                    connection.Open();

                    string query = "SELECT * FROM Category";
                    SqlCommand cmd;

                    cmd = new SqlCommand(query, connection);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            categories.Add(new Category
                            {
                                CID = reader.GetInt32(0),
                                CatName = reader.GetString(1)
                            });
                        }
                    }
                }

                return JsonConvert.SerializeObject(categories);
            }
            catch (Exception ex)
            {
                return JsonConvert.SerializeObject(new { error = $"Error: {ex.Message}" });
            }

        }
    }
}