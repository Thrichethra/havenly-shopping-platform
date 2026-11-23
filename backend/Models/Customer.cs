using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Web;

namespace Final_Project.Models
{
    public class Customer
    {
        public int CSID { get; set; }
        public string FirstName { get; set; }
        public string Address { get; set; }
        public int Contact { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Message { get; set; }


        SqlConnection connection = new SqlConnection(DbConnection.connectionstring);

        public string SaveCustomerFunction(Customer customer)
        {
            try
            {
                //open the connectivity
                connection.Open();

                SqlCommand cmd = new SqlCommand("EXEC SPCreateCustomer '" + customer.FirstName + "' ,'" + customer.Address + "' ,'" + customer.Contact + "', '" + customer.UserName + "', '" + customer.Password + "'", connection);
                int generatedCSID = Convert.ToInt32(cmd.ExecuteScalar());

                //close connectivity
                connection.Close();

                if (generatedCSID == -1)
                    return "Username already exists";
                else
                    return $"Customer created successfully with CSID: {generatedCSID}";
            }
            catch (Exception ex)
            {
                return $"Error: {ex.Message}";
            }
        }
        public string UpdateCustomerFunction(Customer customer)
        {
            try
            {
                connection.Open();
                SqlCommand cmd = new SqlCommand("EXEC SPUpdateCustomer '" + customer.CSID + "','" + customer.FirstName + "' ,'" + customer.Address + "' ,'" + customer.Contact + "', '" + customer.UserName + "', '" + customer.Password + "'", connection);
                cmd.ExecuteNonQuery();

                connection.Close();
                return $"Customer updated successfully with CSID: {customer.CSID}";
            }
            catch (Exception ex)
            {
                return $"Error: {ex.Message}";
            }
        }
        public string DeleteCustomerFunction(Customer customer)
        {
            try
            {
                connection.Open();
                SqlCommand cmd = new SqlCommand("EXEC SPDeleteCustomer '" + customer.CSID + "', '" + customer.UserName + "'", connection);
                cmd.ExecuteNonQuery();

                connection.Close();
                return $"Customer deleted successfully";
            }
            catch (Exception ex)
            {
                return $"Error:{ex.Message}";
            }
        }
        public Customer ValidateCustomer(Customer customer)
        {
            try
            {
                connection.Open();
                SqlCommand cmd = new SqlCommand("spValidateCustomer", connection);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@UserName", customer.UserName);
                cmd.Parameters.AddWithValue("@Password", customer.Password);

                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.Read())
                {
                    string message = reader["Message"].ToString();

                    if (message == "Login successful")
                    {
                        customer.CSID = Convert.ToInt32(reader["CSID"]);
                        customer.FirstName = reader["FirstName"].ToString();
                        customer.Address = reader["Address"].ToString();
                        customer.Contact = Convert.ToInt32(reader["Contact"]);
                        customer.UserName = reader["UserName"].ToString();
                        customer.Password = null;
                        customer.Message = message;
                    }
                    else
                    {
                        customer = new Customer
                        {
                            Message = message
                        };
                    }
                }
                connection.Close();
                return customer;
            }
            catch (Exception ex)
            {
                connection.Close();
                return new Customer
                {
                    Message = $"Error: {ex.Message}"
                };
            }
        }
    }
}