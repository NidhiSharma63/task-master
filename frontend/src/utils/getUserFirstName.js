// it takes email and returns user first name letter

export const getUserFirstName = (email) => {
  return email?.[0]?.toUpperCase();
};
