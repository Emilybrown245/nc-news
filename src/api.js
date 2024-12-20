import axios from 'axios'

const BASEURL = 'https://nc-news-lo7q.onrender.com/api';

export const getArticles = async (topic) => {
const url = topic ? `${BASEURL}/articles?topic=${topic}` : `${BASEURL}/articles`
const {data} = await axios.get(url)
return data.articles;
}
