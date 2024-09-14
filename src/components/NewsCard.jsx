/* eslint-disable react/prop-types */
import { useState } from "react";
import './NewsCard.css';  // Import the CSS file for custom scrollbar

const getSubstring = (text, wordLimit) => {
  return text.length > wordLimit ? text.slice(0, wordLimit) + '...' : text;
};

export default function NewsCard({ news }) {
  const [showFullTitle, setShowFullTitle] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const fallbackImage = "https://via.placeholder.com/300x200";

  // Handle malformed URLs and fix them
  let imageUrl = news.image;
  if (imageUrl) {
    const startIndex = imageUrl.indexOf("://sportscafe.in/img");
    if (startIndex !== -1) {
      imageUrl = "https://" + imageUrl.substring(startIndex + 1); // Fix malformed URL
    }
  }

  const finalImageUrl = imageUrl ? imageUrl : fallbackImage;
  const maxTitleLength = 50; // Maximum length before truncation
  const maxDescriptionLength = 200; // Maximum length before truncation

  // Determine whether the full content should be shown
  const isTitleTruncated = news.title.length > maxTitleLength;
  const isDescriptionTruncated = news.description.length > maxDescriptionLength;

  const title = showFullTitle ? news.title : getSubstring(news.title, maxTitleLength);
  const descr = showFullDescription ? news.description : getSubstring(news.description, maxDescriptionLength);

  return (
    <div className="flex flex-col max-w-[350px] w-full border border-gray-300 shadow-lg rounded-xl overflow-hidden transition duration-300 transform hover:scale-105 hover:shadow-2xl bg-white h-full">
      <div className="h-[50%] ">
        <img
          src={finalImageUrl}
          alt={news.title || "News Image"}
          className="w-full h-full object-cover rounded-t-xl cursor-pointer"
        />
      </div>
      <div className="flex flex-col gap-3 p-4 flex-grow h-[50%]">
        <h1 className="font-bold text-lg text-gray-900 leading-tight cursor-pointer">
          {title}
          {isTitleTruncated && (
            <a
              className="ml-2 underline text-blue-600 hover:text-blue-800 focus:outline-none"
              onClick={() => setShowFullTitle(!showFullTitle)}
            >
              {showFullTitle ? 'Read Less' : 'Read More'}
            </a>
          )}
        </h1>
        <div
          className="text-gray-700 text-sm overflow-y-scroll custom-scrollbar"
          style={{ maxHeight: '100px' }}
        >
          {descr}
          {isDescriptionTruncated && (
            <a
              className="ml-2 underline text-blue-600 hover:text-blue-800 focus:outline-none"
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? 'Read Less' : 'Read More'}
            </a>
          )}
        </div>
        <div className="mt-auto">
          <p className="mt-4 text-sm text-gray-600">
            <span className="font-semibold">Detailed News: </span> 
            <a 
              href={news.url}
              className="text-blue-600 hover:text-blue-800 focus:outline-none"
              target="_blank" 
              rel="noopener noreferrer"
            >
              Link
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
