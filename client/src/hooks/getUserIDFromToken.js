import {jwtDecode} from 'jwt-decode';


export const getUserIDFromToken = () => {
  const token = window.localStorage.getItem("token");
  if (token) {
      const decoded = jwtDecode(token);
      return decoded.id; // Ensure the token has the expected 'id' property
  }
  return null;
};
