import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to handle it in the caller
  }
};

export const comparePassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to handle it in the caller
  }
};
