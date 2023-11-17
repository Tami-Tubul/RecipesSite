import axios from "axios";

export const addNewRecipe = (product) => {
  return axios
    .post("http://localhost:8080/api/recipe", product)
    .then((res) => res.data);
};

export const getAllProducts = () => {
  return axios.get("http://localhost:8080/api/recipe").then((res) => res.data);
};

export const deleteThisProduct = (id) => {
  axios.delete("http://localhost:8080/api/recipe/delete/" + id);
};
export const editThisProduct = (id) => {
  axios.post("http://localhost:8080/api/recipe/edit" + id);
};

export const addNewUser = (user) => {
  return axios.post("http://localhost:8080/api/user/sighin", user).then((res) => res.data);
};
export const checkUser = async ({ Username: nameUser, Password: password }) => {
  try {
    const response = await axios.post("http://localhost:8080/api/user/login", {
      Username: nameUser,
      Password: password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCategory = () => {
  return axios
    .get("http://localhost:8080/api/category")
    .then((res) => res.data);
};
export const addNewCategory = (category) => {
  return axios
    .post("http://localhost:8080/api/category", category)
    .then((res) => res.data);
};

export const getBayList = (userId) => {
  return axios
    .get("http://localhost:8080/api/bay/" + userId)
    .then((res) => res.data);
};

export const deleteBuyItemFromList = (Id) => {
  return axios.post(`http://localhost:8080/api/bay/delete/`+ Id);
};

export const addBuyItem = (bay) => {
  return axios
    .post(`http://localhost:8080/api/bay`, bay)
    .then((res) => res.data);
};

export const updateBuyList = (updateBuyList) => {
  return axios
    .post(`http://localhost:8080/api/bay/edit=${updateBuyList}`)
    .then((res) => res.data);
};


