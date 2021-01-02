const Button = ({ text, onClickAction, type }) => {
  return (
    <button
      className="py-2 px-5 w-full bg-gray-700 text-white hover:bg-gray-900 transition-colors duration-200 ease-in-out"
      onClick={onClickAction}
    >
      {text}
    </button>
  );
};

export default Button;
