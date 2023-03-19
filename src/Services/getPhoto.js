import axios from "axios";

const KEY_API = '32702624-2e762d8c87a3cafce881a5f67';
const BASE_URL = 'https://pixabay.com/api/';

const number = 12

export async function getPhoto(searchValue, page) {

  const {data} = 
  await axios.get(`${BASE_URL}?key=${KEY_API}&q=${searchValue}&page=${page}&per_page=${number}
`);
  return data;
}