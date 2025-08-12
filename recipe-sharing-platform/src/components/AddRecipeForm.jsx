import { useState } from 'react';

function AddRecipeForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = 'Title is required';
    
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
    if (!valid) return;

    setSubmitting(true);
    try {
      // Create a new recipe object. 
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

      // Clear form
      setTitle('');
      setIngredients('');
      setInstructions('');
      setErrors({});
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Add a New Recipe</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100"
            placeholder="e.g. Homemade Pancakes"
            aria-invalid={errors.title ? 'true' : 'false'}
          />
          {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
        </div>

        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Ingredients</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows="4"
            className="mt-1 block w-full p-2 border rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100"
            placeholder="List ingredients"
            aria-invalid={errors.ingredients ? 'true' : 'false'}
          />
          {errors.ingredients && <p className="text-sm text-red-600 mt-1">{errors.ingredients}</p>}
        </div>

        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Preparation Steps</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows="6"
            className="mt-1 block w-full p-2 border rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100"
            placeholder="Write steps, one per line"
            aria-invalid={errors.instructions ? 'true' : 'false'}
          />
          {errors.instructions && <p className="text-sm text-red-600 mt-1">{errors.instructions}</p>}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-[#ff5b04] text-white rounded-md hover:bg-[#e65100] disabled:opacity-60"
        >
          {submitting ? 'Adding...' : 'Add Recipe'}
        </button>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          Tip: separate ingredients with new lines or commas.
        </p>
      </div>
    </form>
  );
}

export default AddRecipeForm;