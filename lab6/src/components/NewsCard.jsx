export default function NewsCard({ title, description, url, image, author, publishedAt }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200">
      {image && <img src={image} alt={title} className="w-full h-48 object-cover" />}
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 text-sm mb-2">{description}</p>
        <p className="text-xs text-gray-500 mb-2">
          {author || "Unknown Author"} | {new Date(publishedAt).toLocaleDateString()}
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-blue-500 hover:underline"
        >
          Read more →
        </a>
      </div>
    </div>
  );
}
