import React from 'react';
import Modal from '../common/Modal';

const RecipeModal = ({ isOpen, onClose, recipe }) => {
  if (!recipe) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={recipe.name}>
      <div className="flex flex-col gap-6">
        <div className="rounded-xl overflow-hidden max-h-96">
          <img src={recipe.image} className="w-full h-full object-cover" alt={recipe.name} />
        </div>
        <div className="flex items-center justify-between">
          <span className="badge badge-secondary badge-lg">{recipe.category}</span>
          <span className="text-sm">Created by <span className="font-bold">@{recipe.username}</span></span>
        </div>
        <div className="bg-base-200 p-6 rounded-xl">
          <h4 className="font-bold mb-2">Instructions:</h4>
          <p className="whitespace-pre-line text-sm leading-relaxed">{recipe.description}</p>
        </div>
      </div>
    </Modal>
  );
};

export default RecipeModal;