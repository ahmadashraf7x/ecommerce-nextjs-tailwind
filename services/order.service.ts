import { ShippingInfo, PaymentMethod } from "store-redux/checkoutSlice";

type SubmitOrderPayload = {
    shippingInfo: ShippingInfo;
    paymentMethod: PaymentMethod;

};

export async function submitOrder(payload: SubmitOrderPayload) {
    const response = await fetch("/api/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error("Order submission failed");
    }

    return response.json();
}