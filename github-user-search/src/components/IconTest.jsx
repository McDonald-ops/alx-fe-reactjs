import * as GiIcons from 'react-icons/gi';

function IconTest() {
  // Get all the exported names from the GiIcons object
  const iconNames = Object.keys(GiIcons);
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">React Icons GI Available Icons</h1>
      <p className="mb-4">Total icons found: {iconNames.length}</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {iconNames.slice(0, 20).map((iconName) => {
          const IconComponent = GiIcons[iconName];
          return (
            <div key={iconName} className="border p-2 flex flex-col items-center">
              {typeof IconComponent === 'function' && (
                <IconComponent size={24} className="mb-2 text-blue-500" />
              )}
              <span className="text-xs text-center break-all">{iconName}</span>
            </div>
          );
        })}
      </div>
      {iconNames.length > 20 && (
        <p className="mt-4 text-sm text-gray-500">
          Showing first 20 of {iconNames.length} icons
        </p>
      )}
    </div>
  );
}

export default IconTest;