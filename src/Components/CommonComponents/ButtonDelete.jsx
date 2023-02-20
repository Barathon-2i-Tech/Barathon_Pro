import PropTypes from 'prop-types';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const ButtonDelete = ({ allClass, functionDelete }) => {
    return (
        <button onClick={functionDelete} className={allClass}>
            <div className="w-full">
                <DeleteForeverIcon />
            </div>
            <div>Suppprimer</div>
        </button>
    );
};

ButtonDelete.propTypes = {
    allClass: PropTypes.string,
    functionDelete: PropTypes.func,
};
