import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlinePencilAlt, HiOutlineTrash, HiOutlinePlus, HiOutlineEye } from 'react-icons/hi';
import { HiOutlineSparkles } from 'react-icons/hi2';
import useRecipeStore from '../../store/useRecipeStore';
import useAuthStore from '../../store/useAuthStore';
import Swal from 'sweetalert2';

const MyList = () => {
  const navigate = useNavigate();
  const { recipes, deleteRecipe } = useRecipeStore();
  const { user } = useAuthStore();

  const myRecipes = recipes.filter(
    (r) => String(r.userId) === String(user?.id)
  );

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Remove Recipe?',
      text: "This entry will be permanently deleted from your collection.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1A1A1A',
      cancelButtonColor: '#E5E7EB',
      confirmButtonText: 'Yes, remove it',
      cancelButtonText: 'Cancel',
      buttonsStyling: true,
      customClass: {
        confirmButton: 'rounded-xl px-6 py-2 font-bold text-xs uppercase tracking-widest',
        cancelButton: 'rounded-xl px-6 py-2 font-bold text-xs uppercase tracking-widest text-gray-500'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRecipe(id);
        Swal.fire({
          title: 'Removed',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false
        });
      }
    });
  };

  return (
    <div className="xl:ml-72 min-h-screen bg-[#FAFAFA] px-6 md:px-10 py-8 animate-fadeIn">
      
      {/* COMPACT HEADER */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6 mb-10">
        <div>
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary mb-1 block flex items-center gap-2">
            <HiOutlineSparkles size={12} /> Private Collection
          </span>
          <h1 className="text-3xl font-serif italic text-gray-900 leading-tight">
            My <span className="not-italic font-black">Kitchen</span>
          </h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
            {myRecipes.length} Entries Documented
          </p>
        </div>

        <Link 
          to="/add-recipe" 
          className="flex items-center gap-2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
        >
          <HiOutlinePlus size={16}/> Create New Entry
        </Link>
      </header>

      {/* LIST CONTAINER */}
      {myRecipes.length > 0 ? (
        <div className="grid gap-4 max-w-4xl">
          {myRecipes.map((recipe) => (
            <div key={recipe.id} className="group flex flex-col md:flex-row items-center gap-6 p-4 bg-white rounded-[2rem] border border-gray-50 shadow-sm hover:shadow-md transition-all duration-300">

              {/* COMPACT IMAGE */}
              <div className="relative shrink-0 overflow-hidden rounded-2xl w-full md:w-28 h-28">
                <img
                  src={recipe.image}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt={recipe.name}
                />
              </div>

              {/* INFO */}
              <div className="flex-1 text-center md:text-left">
                <span className="text-[8px] font-black uppercase text-primary tracking-[0.2em] mb-1 block">
                  {recipe.category}
                </span>
                <h2 className="font-serif italic text-xl text-gray-800 leading-tight group-hover:text-primary transition-colors">
                  {recipe.name}
                </h2>
                <p className="text-[10px] text-gray-400 mt-1 font-medium">
                  Added on {new Date(recipe.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* ELEGANT ACTIONS */}
              <div className="flex gap-2 items-center bg-gray-50/50 p-2 rounded-2xl border border-gray-100">
                <Link
                  to={`/recipe/${recipe.id}`}
                  className="p-2.5 text-gray-400 hover:text-black transition-colors"
                  title="Preview"
                >
                  <HiOutlineEye size={20} />
                </Link>

                <button
                  onClick={() => navigate(`/edit-recipe/${recipe.id}`)}
                  className="p-2.5 bg-white rounded-xl shadow-sm text-gray-500 hover:text-blue-500 hover:shadow transition-all"
                  title="Edit Entry"
                >
                  <HiOutlinePencilAlt size={18} />
                </button>

                <button
                  onClick={() => handleDelete(recipe.id)}
                  className="p-2.5 bg-white rounded-xl shadow-sm text-gray-500 hover:text-red-500 hover:shadow transition-all"
                  title="Remove"
                >
                  <HiOutlineTrash size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center bg-white rounded-[3rem] border border-dashed border-gray-200 max-w-4xl">
           <p className="text-gray-400 italic font-serif">Your culinary archive is currently empty.</p>
           <Link to="/add-recipe" className="text-[9px] font-black uppercase tracking-widest text-primary mt-4 inline-block hover:underline">
             + Start your first entry
           </Link>
        </div>
      )}
    </div>
  );
};

export default MyList;