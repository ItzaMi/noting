const Button = ({ text, onClickAction, type }) => {
  return (
    <button
      className={`py-2 px-5 w-full text-white transition-colors duration-200 ease-in-out +
        ${
          type === 'save'
            ? 'bg-gray-700 hover:bg-gray-900'
            : 'bg-blue-700 hover:bg-blue-900'
        }`}
      onClick={onClickAction}
    >
      {text}
    </button>
  );
};

export default Button;
