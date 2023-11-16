import axios from "axios";
const baseURL = "http://localhost:3001/api/v1/user";

export const login = async (email, password) => {
  const response = await fetch(`${baseURL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return response.json();
};

//TEST
export const updateProfile =
  (token, newFirstName, newLastName) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        "http://localhost:3001/api/v1/user",
        { firstName: newFirstName, lastName: newLastName },
        config
      );

      dispatch({ payload: data });
    } catch (error) {
      dispatch({
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//MENTOR
// export const GetProfile = async () => {
//   const token = useSelect.....

//   const response = await fetch(`${baseURL}/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${token}`
//     },
//   });

//   return response.json();
// }

// export const UpdateProfile = async (username) => {
//   const token = useSelect.....

//   const response = await fetch(`${baseURL}/login`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${token}`
//     },
//      body: JSON.stringify({
//        username,
//      }),
//   });

//   return response.json();
// }
