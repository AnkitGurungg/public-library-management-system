import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import GLOBAL_SERVICE from "@/services/GlobalServices";
import React, { useEffect, useState, useCallback } from "react";
import LoadingComponent from "@/components/Loading/LoadingComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, Clock, RefreshCw, Receipt } from "lucide-react";

const getStatusBadgeVariant = (success) => {
  if (success === true) return "default";
  if (success === false) return "destructive";
  return "secondary";
};

const getStatusText = (paymentStatus, success) => {
  if (success === true && paymentStatus === "Completed") {
    return "Payment Successful";
  }
  return "Payment Failed";
};

const getStatusIcon = (success) => {
  if (success === true) return <CheckCircle className="w-5 h-5" />;
  if (success === false) return <XCircle className="w-5 h-5" />;
  return <Clock className="w-5 h-5" />;
};

export const PaymentResponse = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verificationResponse, setVerificationResponse] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

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
      setVerificationResponse(response.data);
      console.log("Payment verification response:", response);
    } catch (err) {
      console.error("Payment verification error:", err);
      setError(
        err.response?.data?.message ||
          "Failed to verify payment. Please try again."
      );
    }

    setLoading(false);
  }, [location.search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const responseSuccess = verificationResponse?.success;
  const responseStatus = verificationResponse?.status;
  const responseMessage = verificationResponse?.message;
  const responseData = verificationResponse?.data;

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className="flex-1 ml-64 p-6 min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Error */}
        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <XCircle className="w-6 h-6" />
                Payment Verification Failed
              </CardTitle>
              <CardDescription className="text-red-600">
                {error}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={fetchData} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Payment Verification Result */}
        {!error && verificationResponse && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span
                  className={`p-2 rounded-full ${
                    responseSuccess
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {getStatusIcon(responseSuccess)}
                </span>
                {getStatusText(responseStatus, responseSuccess)}
              </CardTitle>
              <CardDescription>{responseMessage}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant={getStatusBadgeVariant(responseSuccess)}>
                  {responseStatus || "Unknown Status"}
                </Badge>
                {responseSuccess ? (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700"
                  >
                    Verified
                  </Badge>
                ) : (
                  <Badge variant="destructive">Not Verified</Badge>
                )}
              </div>

              {/* Details of the payment transaction */}
              {responseData && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <h3 className="font-medium flex items-center gap-2 text-gray-700">
                    <Receipt className="w-4 h-4" />
                    Payment Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {responseData.pidx && (
                      <div>
                        <p className="text-gray-500">Transaction ID (pidx)</p>
                        <p className="font-mono text-gray-900">
                          {responseData.pidx}
                        </p>
                      </div>
                    )}
                    {responseData.totalAmount && (
                      <div>
                        <p className="text-gray-500">Amount Paid</p>
                        <p className="font-semibold text-gray-900">
                          Rs. {responseData.totalAmount}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => navigate("/member/profile/fines")}
              >
                Go Back
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PaymentResponse;
