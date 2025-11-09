export const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
export const validatePassword = (pw) => typeof pw === 'string' && pw.length >= 6;