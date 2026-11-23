using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Final_Project.Models
{
    public class Invoice
    {
        public int CSID { get; set; }
        public decimal Total { get; set; }
        public List<InvoiceProductDetails> lstInvProduct { get; set; }
        SqlConnection connection = new SqlConnection(DbConnection.connectionstring);

        public int SaveInvoice(Invoice obj)
        {
            int NewInvID = 0;
            try
            {
                connection.Open();

                SqlCommand cmdInsertHeader = new SqlCommand("EXEC [SPInsertInvoiceHeader]" + obj.CSID + "," + obj.Total + "", connection);
                SqlDataAdapter adp = new SqlDataAdapter(cmdInsertHeader);
                DataSet ds = new DataSet();
                adp.Fill(ds);

                if (ds != null)
                {
                    if (ds.Tables.Count > 0)
                        NewInvID = Convert.ToInt32(ds.Tables[0].Rows[0]["INVID"]);
                }

                foreach (InvoiceProductDetails item in obj.lstInvProduct)
                {
                    SqlCommand cmdInsertDetail = new SqlCommand("EXEC [SPInsertInvoiceDetail]" + NewInvID + "," + item.LineID + "," + item.PID + "," + item.Qty + "," + item.Price + "," + item.Total + "", connection);
                    cmdInsertDetail.ExecuteNonQuery();
                }
                connection.Close();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return NewInvID;
        }
    }
}