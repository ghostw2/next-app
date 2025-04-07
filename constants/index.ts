export const SignInDefaultValues = {
  email: "",
  password: "",
};
export const SignUpDefaultValues = {
  name: "New User",
  email: "",
  password: "",
  confirmPassword: "",
};
export const ShippingAddressDefaultValues = {
  fullName: "",
  streetAdress: "",
  city: "",
  postalCode: "",
  country: "",
  lat: "",
  lng: "",
  phoneNumber: "",
};
export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
  ? process.env.PAYMENT_METHODS.split(", ")
  : ["PayPal", "Stripe", "CashOnDelivery"];
export const DEAFULT_PAYMENT_METHOD = process.env.DEFAULT_PAYMENT_METHOD;
