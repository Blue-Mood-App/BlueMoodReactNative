import axios from "axios";

//action creator
const setNewUser = (auth) => ({
  type: "SET_NEW_USER",
  auth,
});

//thunk
//post request to '/api/register'
export const newUser =
  (firstName, lastName, email, password, confirmPassword) =>
  async (dispatch) => {
    try {
      const res = await axios.post("/auth/signup", {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });
    } catch (err) {
      console.error(err);
    }
  };

//reducer
export default function authenticateReducer(state = {}, action) {
  switch (action.type) {
    case "SET_NEW_USER":
      return action.auth;
    default:
      return state;
  }
}
