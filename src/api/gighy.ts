const giphySearch = async (term: string) => {
  const res = await fetch(
    `https://api.giphy.com/v1/gifs/search?q=${term}&api_key=nPJNlVceWHERWCSDBW5XMo1p90l7l9ie&limit=6`
  );
  const giphys = await res.json();
  return giphys;
};

export { giphySearch };
