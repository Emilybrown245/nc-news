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

export const getUsers = async () => {
    let url = `${BASEURL}/users`
    const {data} = await axios.get(url)
    console.log(data)
    return data.users;
}

export const updateArticleVotes = async (article_id, increment) => {
    const { data } = await axios.patch(`${BASEURL}/articles/${article_id}`, {
      inc_votes: increment,
    });
    return data.article;
  };

  export const fetchCommentsByArticleId = async (article_id) => {
    const { data } = await axios.get(`${BASEURL}/articles/${article_id}/comments`);
    return data.comments;
  };

  export const postComment = async (article_id, username, body) => {
    const { data } = await axios.post(`${BASEURL}/articles/${article_id}/comments`, {
        username,
        body,
    });
    return data.comment;
};

export const deleteComment = async (comment_id) => {
    await axios.delete(`${BASEURL}/comments/${comment_id}`);
};
  