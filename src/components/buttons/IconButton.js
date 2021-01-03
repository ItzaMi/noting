import Edit from '../icons/Edit';
import View from '../icons/View';
import Delete from '../icons/Delete';
import Moon from '../icons/Moon';
import Sun from '../icons/Sun';

import styles from '../icons/icons.module.css';

const IconButton = ({ onClickAction, typeOfIcon, darkMode }) => {
  const checkTypeOfIcon = (typeOfIcon) => {
    switch (typeOfIcon) {
      case 'dark':
        if (darkMode) {
          return <Sun className={styles.sunIcon} />;
        } else {
          return <Moon className={styles.moonIcon} />;
        }
      case 'edit':
        return <Edit className={styles.editIcon} />;
      case 'delete':
        return <Delete className={styles.deleteIcon} />;
      case 'view':
      default:
        return <View className={styles.viewIcon} />;
    }
  };

  return (
    <button
      className={`${
        typeOfIcon === 'dark'
          ? 'w-40px h-40px flex flex-row justify-center items-center'
          : 'mr-2 h-20px'
      } ${
        typeOfIcon === 'dark' && darkMode
          ? 'bg-gray-700'
          : typeOfIcon === 'dark' && !darkMode
          ? 'bg-gray-300'
          : null
      }`}
      onClick={onClickAction}
    >
      {checkTypeOfIcon(typeOfIcon)}
    </button>
  );
};

export default IconButton;
