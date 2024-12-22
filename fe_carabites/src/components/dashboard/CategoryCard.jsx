const CategoryCard = ({ categories, onCategoryClick, selectedFilter }) => {
  return (
    <div className="my-5 flex flex-wrap gap-3">
      {/* Add the "All" button */}
      <div
        onClick={() => onCategoryClick(null)} // Pass null to reset the filter
        className={`border p-2 border-[#45c517] hover:cursor-pointer hover:bg-[#45c517] hover:text-white rounded-md inline-block w-32 text-center  text-md ${
          !selectedFilter ? 'bg-[#45c517] text-white' : 'text-[#45c517]' // Active if no filter is selected
        }`}
      >
        All
      </div>

      {categories.map((category, index) => (
        <div
          key={index}
          onClick={() => onCategoryClick(category)} // Pass category object on click
          className={`border p-2 border-[#45c517] hover:cursor-pointer hover:bg-[#45c517] hover:text-white rounded-md inline-block text-md ${
            selectedFilter && selectedFilter.name === category.name
              ? 'bg-[#45c517] text-white'  // Active style
              : 'text-[#45c517]'            // Default style
          }`}
        >
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default CategoryCard;
