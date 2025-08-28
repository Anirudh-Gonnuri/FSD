import { useState, useEffect } from "react";
import axios from "axios";
import NewsCard from "./components/NewsCard";
import './App.css'
export default function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=us&apiKey=51fd68af784d43b1a3ae6ff9cf3785af"
      )
      .then((res) => {
        setNews(res.data.articles);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch news data.");
        setLoading(false);
      });
  }, []);

  const filteredNews = news.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-blue-500 to-gray-500 p-6">

      <h1 className="text-3xl font-bold text-center mb-6">News Dashboard</h1>

      <div className="mb-6 text-center">
        <input
          type="text"
          placeholder="Search news by title..."
          className="px-4 py-2 border rounded w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading && <p className="text-center text-gray-500">Loading...</p>}

      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && filteredNews.length === 0 && (
        <p className="text-center text-gray-700">No news found.</p>
      )}

      {!loading && !error && filteredNews.length > 0 && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredNews.map((article, idx) => (
            <NewsCard
              key={idx}
              title={article.title}
              description={article.description}
              url={article.url}
              image={article.urlToImage}
              author={article.author}
              publishedAt={article.publishedAt}
            />
          ))}
        </div>
      )}
    </div>
  );
}
