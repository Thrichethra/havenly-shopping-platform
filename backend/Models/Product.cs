using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Final_Project.Models
{
    public class Product
    {
        public int PID { get; set; }
        public string ImageUrl { get; set; }
        public string ItemName { get; set; }
        public int CID { get; set; }
        public decimal Price { get; set; }
        public string Details { get; set; }

        // Read all products
        public string ReadProductFunction()
        {
            try
            {
                List<Product> products = new List<Product>();

                using (SqlConnection connection = new SqlConnection(DbConnection.connectionstring))
                {
                    connection.Open();

                    string query = "SELECT * FROM Products";
                    SqlCommand cmd = new SqlCommand(query, connection);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            products.Add(new Product
                            {
                                PID = reader.GetInt32(0),
                                ImageUrl = reader.GetString(1),
                                ItemName = reader.GetString(2),
                                CID = reader.GetInt32(3),
                                Price = reader.GetDecimal(4),
                                Details = reader.GetString(5)
                            });
                        }
                    }
                }

                return JsonConvert.SerializeObject(products);
            }
            catch (Exception ex)
            {
                return JsonConvert.SerializeObject(new { error = $"Error: {ex.Message}" });
            }
        }

        // Read products by category
        public string ReadProductByCategory(int cid)
        {
            try
            {
                List<Product> products = new List<Product>();

                using (SqlConnection connection = new SqlConnection(DbConnection.connectionstring))
                {
                    connection.Open();

                    string query = "SELECT * FROM Products WHERE CID = @CID";
                    SqlCommand cmd = new SqlCommand(query, connection);
                    cmd.Parameters.AddWithValue("@CID", cid);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            products.Add(new Product
                            {
                                PID = reader.GetInt32(0),
                                ImageUrl = reader.GetString(1),
                                ItemName = reader.GetString(2),
                                CID = reader.GetInt32(3),
                                Price = reader.GetDecimal(4)
                            });
                        }
                    }
                }

                return JsonConvert.SerializeObject(products);
            }
            catch (Exception ex)
            {
                return JsonConvert.SerializeObject(new { error = $"Error: {ex.Message}" });
            }
        }

        // Read full product details by PID
        public string ReadProductDetails(int pid)
        {
            try
            {
                Product product = null;

                using (SqlConnection connection = new SqlConnection(DbConnection.connectionstring))
                {
                    connection.Open();

                    string query = "SELECT PID, ImageUrl, ItemName, Price, Details FROM Products WHERE PID = @PID";
                    SqlCommand cmd = new SqlCommand(query, connection);
                    cmd.Parameters.AddWithValue("@PID", pid);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            product = new Product
                            {
                                PID = reader.GetInt32(0),
                                ImageUrl = reader.GetString(1),
                                ItemName = reader.GetString(2),
                                Price = reader.GetDecimal(3),
                                Details = reader.GetString(4)
                            };
                        }
                    }
                }

                return JsonConvert.SerializeObject(product);
            }
            catch (Exception ex)
            {
                return JsonConvert.SerializeObject(new { error = $"Error: {ex.Message}" });
            }
        }

    }
}