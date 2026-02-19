import { validateCardData, validateBankData } from "./paymentValidation";
import { validateShippingInfo } from "./shippingValidation";
import { BankData, CardData, ShippingInfo } from "store-redux/checkoutSlice";

interface OrderValidationData {
  shippingInfo: ShippingInfo;
  paymentMethod: "card" | "bank" | null;
  cardData: CardData;
  bankData: BankData;
  acceptedTerms: boolean;
}

export const validateOrderForm = (
  data: OrderValidationData
): string | null => {

  const {
    shippingInfo,
    paymentMethod,
    cardData,
    bankData,
    acceptedTerms
  } = data;

  const shippingErrors = validateShippingInfo(shippingInfo);
  if (Object.keys(shippingErrors).length > 0) {
    return "Please fill all required shipping information";
  }

  if (!paymentMethod) return "Please select a payment method";

  let paymentError: string | null = null;

  if (paymentMethod === "card") {
    paymentError = validateCardData(cardData);
  } else if (paymentMethod === "bank") {
    paymentError = validateBankData(bankData);
  }

  if (paymentError) return paymentError;

  if (!acceptedTerms) return "You must accept the Terms & Conditions";

  return null;
};
