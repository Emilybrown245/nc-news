import axios from 'axios'

const BASEURL = 'https://nc-news-lo7q.onrender.com/api';

export const getArticles = async (topic, sort_by, order) => {
    let url = `${BASEURL}/articles`

const params = [];

if (topic) params.push(`topic=${topic}`);
if (sort_by) params.push(`sort_by=${sort_by}`);
if (order) params.push(`order=${order}`);
if (params.length > 0) url += `?${params.join('&')}`;


    const {data} = await axios.get(url)
  
    return Array.isArray(data.articles) ? data.articles : [];


}


