import ButtonLoader from '../loaders/ButtonLoader';

const Button = ({ text, onClickAction, type }) => {
  return (
    <button
      className={`py-2 px-5 w-full text-white transition-colors duration-200 ease-in-out
        ${
          type === 'save'
            ? 'bg-gray-700 hover:bg-gray-900 dark:bg-gray-600 dark:hover:bg-gray-900'
            : 'bg-blue-700 hover:bg-blue-900'
        } ${type === 'loading' && 'flex flex-row justify-center'}`}
      onClick={onClickAction}
    >
      {type === 'loading' ? <ButtonLoader /> : text}
    </button>
  );
};

export default Button;
