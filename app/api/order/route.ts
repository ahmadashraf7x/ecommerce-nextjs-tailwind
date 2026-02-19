import { NextResponse } from "next/server";
import { ShippingInfo, PaymentMethod } from "store-redux/checkoutSlice";

type OrderRequestBody = {
    shippingInfo: ShippingInfo;
    paymentMethod: PaymentMethod;
};

export async function POST(req: Request) {
    try {
        const body: OrderRequestBody = await req.json();

        const { shippingInfo, paymentMethod, } = body;

        if (!shippingInfo || !paymentMethod) {
            return NextResponse.json(
                { message: "Invalid order data" },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            orderId: Math.floor(Math.random() * 100000),
        });
    } catch (error) {
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}