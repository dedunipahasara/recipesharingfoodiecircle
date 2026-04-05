import React from 'react';
import RecipeCard from '../recipe/RecipeCard';
import UserCard from '../user/UserCard';

const SearchResults = ({ results, type = "all", onOpenRecipe }) => {
  if (results.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-bold">No results found</h3>
        <p className="opacity-60">Try searching for something else like "Pasta" or "Chef_John"</p>
      </div>
    );
  }

  const recipes = results.filter(item => item.type === 'recipe');
  const users = results.filter(item => item.type === 'user');

  return (
    <div className="space-y-10">
      {/* User Results Section */}
      {users.length > 0 && (
        <section>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            People <div className="badge badge-sm">{users.length}</div>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map(user => (
              <UserCard key={user.id} userData={user} />
            ))}
          </div>
        </section>
      )}

      {/* Recipe Results Section */}
      {recipes.length > 0 && (
        <section>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            Recipes <div className="badge badge-sm">{recipes.length}</div>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} onOpen={onOpenRecipe} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default SearchResults;