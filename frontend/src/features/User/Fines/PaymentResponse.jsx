import GLOBAL_SERVICE from "@/services/GlobalServices";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const PaymentResponse = () => {
  const location = useLocation();
  
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const params = new URLSearchParams(location.search);
      const data = {
        status: params.get("status"),
        pidx: params.get("pidx"),
        txnId: params.get("txnId"),
        tidx: params.get("tidx"),
        total_amount: params.get("total_amount"),
        purchase_order_id: params.get("purchase_order_id"),
        purchase_order_name: params.get("purchase_order_name"),
      };
      setPaymentData(data);

      try {
        const res = await GLOBAL_SERVICE.post(
          "/api/v1/mla/payments/khalti/verify",
          data
        );
        // console.log(res);

      } catch (error) {
        console.error(error);
      }

      setLoading(false);
      console.log("Payment Response Data:", data);
    };

    fetchData();
  }, []);

  return (
    <div className="flex-1 ml-64 p-3">
      {loading && (
        <div>
          <h2>Processing...</h2>
        </div>
      )}

      <div>
        <h1>Payment Response</h1>
        <p>Status: {paymentData.status}</p>
        <p>PIDX: {paymentData.pidx}</p>
        <p>Transaction ID: {paymentData.txnId}</p>
        <p>TIDX: {paymentData.tidx}</p>
        <p>Total Amount: {paymentData.total_amount}</p>
        <p>Purchase Order ID: {paymentData.purchase_order_id}</p>
        <p>Purchase Order Name: {paymentData.purchase_order_name}</p>
      </div>
    </div>
  );
};
