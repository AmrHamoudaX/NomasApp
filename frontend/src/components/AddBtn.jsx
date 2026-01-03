function AddBtn({ handleQuantity }) {
  return (
    <button
      className="bg-gray-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
      onClick={handleQuantity}
    >
      Add
    </button>
  );
}

export { AddBtn };
