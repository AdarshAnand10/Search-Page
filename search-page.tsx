import React, { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';

// Sample blog post data (replace with actual data source)
const BLOG_POSTS = [
  {
    id: 1,
    title: 'Introduction to React Hooks',
    content: 'React Hooks revolutionized how we write functional components...',
    author: 'John Doe',
    category: 'Programming',
    date: '2024-01-15'
  },
  {
    id: 2,
    title: 'Machine Learning Basics',
    content: 'Machine learning is transforming how we approach complex problems...',
    author: 'Jane Smith',
    category: 'Technology',
    date: '2024-02-20'
  },
  {
    id: 3,
    title: 'Web Design Trends in 2024',
    content: 'Modern web design is focusing on minimalism and user experience...',
    author: 'Mike Johnson',
    category: 'Design',
    date: '2024-03-10'
  },
  {
    id: 4,
    title: 'Advanced React Performance',
    content: 'Optimizing React applications for maximum efficiency...',
    author: 'John Doe',
    category: 'Programming',
    date: '2024-04-05'
  }
];

const SearchPage = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(BLOG_POSTS);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');

  // Filtering logic
  useEffect(() => {
    let results = BLOG_POSTS;

    // Search term filtering
    if (searchTerm) {
      results = results.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filtering
    if (selectedCategory) {
      results = results.filter(post => post.category === selectedCategory);
    }

    // Author filtering
    if (selectedAuthor) {
      results = results.filter(post => post.author === selectedAuthor);
    }

    setFilteredPosts(results);
  }, [searchTerm, selectedCategory, selectedAuthor]);

  // Get unique categories and authors for filtering
  const categories = [...new Set(BLOG_POSTS.map(post => post.category))];
  const authors = [...new Set(BLOG_POSTS.map(post => post.author))];

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedAuthor('');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white shadow-lg rounded-lg p-6">
        {/* Search Input */}
        <div className="relative mb-6">
          <input 
            type="text" 
            placeholder="Search blog posts..." 
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          />
        </div>

        {/* Filtering Options */}
        <div className="flex flex-wrap gap-4 mb-6">
          {/* Category Filter */}
          <select 
            className="flex-grow p-2 border rounded-lg"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Author Filter */}
          <select 
            className="flex-grow p-2 border rounded-lg"
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
          >
            <option value="">All Authors</option>
            {authors.map(author => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>

          {/* Reset Filters Button */}
          {(searchTerm || selectedCategory || selectedAuthor) && (
            <button 
              onClick={resetFilters}
              className="flex items-center bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
            >
              <X className="mr-2" size={20} />
              Reset Filters
            </button>
          )}
        </div>

        {/* Search Results */}
        <div>
          {filteredPosts.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              No posts found matching your search criteria.
            </div>
          ) : (
            filteredPosts.map(post => (
              <div 
                key={post.id} 
                className="border-b last:border-b-0 py-4 hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {post.title}
                </h2>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>{post.author}</span>
                  <span>{post.category}</span>
                  <span>{post.date}</span>
                </div>
                <p className="text-gray-700">
                  {post.content.substring(0, 150)}...
                </p>
              </div>
            ))
          )}
        </div>

        {/* Results Summary */}
        <div className="text-center text-gray-500 mt-4">
          {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''} found
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
