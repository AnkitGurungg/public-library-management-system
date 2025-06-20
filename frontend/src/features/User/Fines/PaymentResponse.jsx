import GLOBAL_SERVICE from "@/services/GlobalServices";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const PaymentResponse = () => {
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [verificationResponse, setVerificationResponse] = useState(null);

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

      try {
        const response = await GLOBAL_SERVICE.post(
          "/api/v1/mla/payments/khalti/verify",
          data
        );
        setVerificationResponse(response);
        console.log(response);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
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
      <br />

      {!loading && (
        <div>
          <h1>Lookup Response JSON</h1>
          <pre>{JSON.stringify(verificationResponse?.data, null, 2)}</pre>
        </div>
      )}
      <br />
    </div>
  );
};
