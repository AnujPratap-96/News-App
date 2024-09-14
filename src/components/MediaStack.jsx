/* eslint-disable no-unused-vars */
import { useState } from "react";
import Selector from "./Selector";
import NewsCard from "./NewsCard";

const API_KEY = `7ab3edde98933910154738becb33fa85`;
const url = `https://api.mediastack.com/v1/news`;

function MediaStack() {
  const [state, setState] = useState({
    news: [],
    loading: false,
    error: null,
  });
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");

  async function GetData(category, country, language) {
    try {
      setState({ ...state, loading: true, error: null }); // Set loading state before fetching
      const response = await fetch(
        `${url}?access_key=${API_KEY}&categories=${category}&countries=${country}&language=${language}`
      );
      const data = await response.json();
      setState({ news: data.data, loading: false, error: null });
    
    } catch (err) {
      setState({ ...state, loading: false, error: err.message });
    }
  }

  const { news, loading, error } = state;

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 py-5 flex flex-col gap-10 bg-gray-100 min-h-screen">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 text-center mb-6">
        Get Your News Here
      </h1>
      {/* Selector component */}
      <Selector
        country={country}
        language={language}
        category={category}
        setCategory={setCategory}
        setCountry={setCountry}
        setLanguage={setLanguage}
      />
      
      {/* Get Data Button */}
      <button
        onClick={() => GetData(category, country, language)}
        className="bg-blue-500 text-white rounded-lg shadow-lg transition hover:bg-blue-600 min-w-[250px] sm:min-w-[300px] mx-auto p-2 px-5"
      >
        Get Data
      </button>

      {/* Status messages */}
      <div className="text-center">
        {loading && <h1 className="text-xl sm:text-2xl font-semibold text-gray-700">Loading The Data...</h1>}
        {error && <h1 className="text-xl sm:text-2xl font-semibold text-red-500">Something Went Wrong: {error}</h1>}
        {!loading && news.length === 0 && (
          <h1 className="text-lg sm:text-xl font-medium text-gray-600">
            No news articles found for the selected options.
          </h1>
        )}
      </div>

      {/* News Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mx-auto max-w-[1200px]">
        {!loading &&
          news.length > 0 &&
          news.map((newsItem, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
              <NewsCard news={newsItem} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default MediaStack;
