let articles = [];

const getArticles = async () => {
  const res = await fetch(`/api/v1/supply/get-articles`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await res.json();
  articles.push(...data.data);
};

getArticles();