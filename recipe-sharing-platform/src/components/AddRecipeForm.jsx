import { useState } from 'react';
import { FaUtensils, FaCheck, FaTimes, FaPlus, FaFile, FaList, FaInfoCircle } from 'react-icons/fa';

function AddRecipeForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = 'Recipe title is required';
    
    const ingList = ingredients
      .split(/\n|,/)
      .map(s => s.trim())
      .filter(Boolean);
    if (ingList.length < 2) e.ingredients = 'Please provide at least 2 ingredients';
    const instrList = instructions
      .split(/\n/)
      .map(s => s.trim())
      .filter(Boolean);
    if (instrList.length === 0) e.instructions = 'Please provide preparation steps';
    return { valid: Object.keys(e).length === 0, errors: e, ingList, instrList };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { valid, errors: vErrors, ingList, instrList } = validate();
    setErrors(vErrors);
    
    if (!valid) {
      // Scroll to first error
      const firstErrorField = document.querySelector('.border-red-500');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstErrorField.focus();
      }
      return;
    }

    setSubmitting(true);
    try {
      // Create a new recipe object
      const newRecipe = {
        id: Date.now(),
        title: title.trim(),
        summary: (ingList.slice(0, 3).join(', ') + '...') || '',
        image: `https://via.placeholder.com/1200x800?text=${encodeURIComponent(title.trim())}`,
        ingredients: ingList,
        instructions: instrList,
      };

      // Call parent handler
      onAdd && onAdd(newRecipe);

      // Show success message
      setShowSuccess(true);
      
      // Clear form after submission
      setTimeout(() => {
        setTitle('');
        setIngredients('');
        setInstructions('');
        setErrors({});
        setShowSuccess(false);
      }, 3000);
    } finally {
      setSubmitting(false);
    }
  };

  // Input field with label and error handling
  const FormInput = ({ id, label, value, onChange, placeholder, type = 'text', error, icon: Icon, ...props }) => (
    <div className="mb-6">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${error ? 'text-red-500' : 'text-gray-400'}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-${Icon ? '10' : '4'} py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 hover:border-gray-300'}`}
          {...props}
          // eslint-disable-next-line no-unused-vars
          onFocus={(e) => {
            if (error) {
              const newErrors = { ...errors };
              delete newErrors[id];
              setErrors(newErrors);
            }
          }}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <FaTimes className="w-5 h-5 text-red-500" />
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1.5 flex items-center">
            <FaTimes className="w-4 h-4 mr-1" /> {error}
          </p>}
    </div>
  );

  // Textarea with label and error handling
  const FormTextarea = ({ id, label, value, onChange, placeholder, error, icon: Icon, rows = 4, ...props }) => (
    <div className="mb-6">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className={`absolute top-3 left-3 flex items-center pointer-events-none ${error ? 'text-red-500' : 'text-gray-400'}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={`w-full px-${Icon ? '10' : '4'} py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 hover:border-gray-300'}`}
          {...props}
          // eslint-disable-next-line no-unused-vars
          onFocus={(e) => {
            if (error) {
              const newErrors = { ...errors };
              delete newErrors[id];
              setErrors(newErrors);
            }
          }}
        />
        {error && (
          <div className="absolute top-3 right-3 flex items-center">
            <FaTimes className="w-5 h-5 text-red-500" />
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1.5 flex items-center">
            <FaTimes className="w-4 h-4 mr-1" /> {error}
          </p>}
    </div>
  );

  return (
    <div className="w-full">
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg shadow-lg flex items-center z-50 animate-fade-in-down">
          <FaCheck className="w-6 h-6 mr-3 text-green-500" />
          <div>
            <h3 className="font-medium">Recipe Added Successfully!</h3>
            <p className="text-sm mt-0.5">Your recipe is now available.</p>
          </div>
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
        {/* Form Header */}
        <div className="bg-amber-50 px-6 py-5 border-b border-amber-100">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <FaUtensils className="w-5 h-5 mr-2 text-amber-500" />
            Add a New Recipe
          </h2>
          <p className="text-gray-600 mt-1 text-sm">Share your culinary creations with the world</p>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-2">
            {/* Title */}
            <FormInput
              id="title"
              label="Recipe Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a descriptive title for your recipe"
              error={errors.title}
            />

            {/* Ingredients */}
            <FormTextarea
              id="ingredients"
              label="Ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="List ingredients, separated by new lines or commas (e.g., 2 cups of flour, 1 teaspoon of salt)"
              rows={4}
              error={errors.ingredients}
            />

            {/* Instructions */}
            <FormTextarea
              id="instructions"
              label="Preparation Steps"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Write your preparation steps, one per line"
              rows={6}
              error={errors.instructions}
            />

            {/* Form Tips */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-blue-800 flex items-center mb-2">
                <FaInfoCircle className="w-4 h-4 mr-1.5" />
                Recipe Tips
              </h4>
              <ul className="text-xs text-blue-700 space-y-1.5">
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 mr-2"></span>
                  <span>Be specific with ingredient quantities (e.g., 2 cups of flour, not just "flour")</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 mr-2"></span>
                  <span>Include preparation and cooking times in your instructions</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 mr-2"></span>
                  <span>Separate ingredients with commas or new lines</span>
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className={`w-full px-6 py-3.5 font-medium rounded-lg transition-all duration-200 flex items-center justify-center ${submitting ? 'bg-gray-300 text-gray-700 cursor-not-allowed shadow-sm' : 'bg-amber-500 text-white hover:bg-amber-600 shadow hover:shadow-md transform hover:-translate-y-0.5'}`}
              >
                {submitting ? (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Adding Recipe...
                  </div>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Publish Recipe
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddRecipeForm;