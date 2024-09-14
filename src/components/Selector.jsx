/* eslint-disable react/prop-types */
import { Categories, LanguagesCode, CountryCode } from './Data2';

export default function Selector({ category, language, country, setCategory, setCountry, setLanguage }) {
  return (
    <div className="w-full p-4 sm:p-6 md:p-8 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 shadow-lg rounded-lg flex flex-col gap-6 sm:flex-row sm:gap-8 items-center justify-between">
      
      {/* Country Selector */}
      <div className="flex flex-col space-y-2 w-full sm:w-auto">
        <label htmlFor="countryCode" className="text-white text-lg font-semibold">Country Code:</label>
        <select
          id="countryCode"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="p-2 rounded-md border border-gray-300 shadow-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
        >
          <option value="">-- Select a Country Code --</option>
          {CountryCode.map((item) => (
            <option key={item.id} value={item.code}>
              {item.title} 
            </option>
          ))}
        </select>
      </div>

      {/* Category Selector */}
      <div className="flex flex-col space-y-2 w-full sm:w-auto">
        <label htmlFor="category" className="text-white text-lg font-semibold">Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 rounded-md border border-gray-300 shadow-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
        >
          <option value="">-- Select a Category --</option>
          {Categories.map((item) => (
            <option key={item.id} value={item.code}>
              {item.title} 
            </option>
          ))}
        </select>
      </div>

      {/* Language Selector */}
      <div className="flex flex-col space-y-2 w-full sm:w-auto">
        <label htmlFor="language" className="text-white text-lg font-semibold">Language:</label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-2 rounded-md border border-gray-300 shadow-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
        >
          <option value="">-- Select a Language --</option>
          {LanguagesCode.map((item) => (
            <option key={item.id} value={item.code}>
              {item.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
