import type { CardData, BankData } from "store-redux/checkoutSlice";

export const validateCardData = (cardData: CardData): string | null => {
    if (!cardData.number || cardData.number.length !== 16) {
        return "Please enter a valid card number";
    }

    const cleanExpiry = cardData.expiry.replace(/\D/g, "");

    if (!cleanExpiry || cleanExpiry.length !== 4) {
        return "Please enter card expiry date";
    }

    if (!cardData.cvv || cardData.cvv.length !== 3) {
        return "Please enter CVV";
    }

    return null;
};

export const validateBankData = (bankData: BankData): string | null => {
    if (!bankData.name.trim()) {
        return "Please enter account holder name";
    }

    if (!bankData.account.trim()) {
        return "Please enter account number / IBAN";
    }

    return null;
};