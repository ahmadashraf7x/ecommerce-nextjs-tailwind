import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PaymentMethod = "card" | "bank" | null;

export type ShippingInfo = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
};

export type CardData = {
  number: string;
  expiry: string;
  cvv: string;
};

export type BankData = {
  name: string;
  account: string;
};

type CheckoutState = {
  shippingInfo: ShippingInfo;
  paymentMethod: PaymentMethod;
  cardData: CardData;
  bankData: BankData;
  acceptedTerms: boolean;
  submitAttempted: boolean,

};

const initialState: CheckoutState = {
  shippingInfo: {
    fullName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    address: "",
  },
  paymentMethod: null,
  cardData: {
    number: "",
    expiry: "",
    cvv: "",
  },
  bankData: {
    name: "",
    account: "",
  },
  acceptedTerms: false,

  submitAttempted: false,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setShippingInfo(state, action: PayloadAction<ShippingInfo>) {
      state.shippingInfo = action.payload;
    },
    setPaymentMethod(state, action: PayloadAction<PaymentMethod>) {
      state.paymentMethod = action.payload;
    },
    setCardData(state, action: PayloadAction<CardData>) {
      state.cardData = action.payload;
    },
    setBankData(state, action: PayloadAction<BankData>) {
      state.bankData = action.payload;
    },
    setAcceptedTerms(state, action: PayloadAction<boolean>) {
      state.acceptedTerms = action.payload;
    },
    resetCheckout() {
      return initialState;
    },
    setSubmitAttempted(state, action: PayloadAction<boolean>) {
      state.submitAttempted = action.payload;
    }

  },
});

export const {
  setShippingInfo,
  setPaymentMethod,
  setCardData,
  setBankData,
  setAcceptedTerms,
  resetCheckout,
  setSubmitAttempted,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
