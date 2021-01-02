import Edit from '../icons/Edit';
import View from '../icons/View';
import Delete from '../icons/Delete';

import styles from '../icons/icons.module.css';

const IconButton = ({ onClickAction, typeOfIcon }) => {
  const checkTypeOfIcon = (typeOfIcon) => {
    switch (typeOfIcon) {
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
    <button className="mr-2 h-20px" onClick={onClickAction}>
      {checkTypeOfIcon(typeOfIcon)}
    </button>
  );
};

export default IconButton;
