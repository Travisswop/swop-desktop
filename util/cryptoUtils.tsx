// utils/cryptoUtils.js
import CryptoJS from "crypto-js";

// Function to encrypt data
export const encryptData = (data: any) => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(data),
    process.env.NEXT_PUBLIC_ENCRYPT_KEY as string
  ).toString();
};

// Function to decrypt data
export const decryptData = (ciphertext: any) => {
  const bytes = CryptoJS.AES.decrypt(
    ciphertext,
    process.env.NEXT_PUBLIC_ENCRYPT_KEY as string
  );
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
