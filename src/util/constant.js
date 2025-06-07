export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const PASSWORD_REGEX =  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&]).{10,}/;

export const FIRST_LAST_NAME_REGEX = /^[A-Za-z']+$/;
export const TAX_CODE_REGEX = /^[A-Z]{6}[0-9]{2}[A-Z]{1}[0-9]{2}[A-Z]{1}[0-9]{3}[A-Z]{1}$/;
export const IBAN_NUMBER_REGEX =/^[A-Z]{2}[0-9]{2}[A-Z0-9]{13,30}$/;
export const PHONE_NUMBER_REGEX =/^[0-9][0-9]{7,14}$/;
export const VAT_CODE_REGEX = /^\d{11}$/;