import * as axios from "axios";

const apiUsersURL = "https://jsonplaceholder.typicode.com/users/";

const usersAPI = axios.create({
  baseURL: apiUsersURL,
  responseType: "json",
});

export const checkCredentials = async ({ login }) => {
  try {
    login = login.trim();

    const { data: users } = await usersAPI.get();

    const emailsArr = users.map(({ email }) => email);
    const userNamesArr = users.map(({ username }) => username);

    console.log(emailsArr);
    console.log(userNamesArr);

    const isAuthorised =
      emailsArr.includes(login) || userNamesArr.includes(login);

    let currentUser = {};

    if (isAuthorised) {
      currentUser = users.find(
        (user) => user.email === login || user.username === login
      );
    }

    return isAuthorised ? currentUser : null;
  } catch (error) {
    console.log(error);
  }
};

export default usersAPI;
