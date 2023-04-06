import PropTypes from 'prop-types';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';

export const ButtonDelete = ({ allClass, functionDelete }) => {
    return (
        <Button onClick={functionDelete} className={allClass}>
            <div className="w-full">
                <DeleteForeverIcon />
            </div>
            <div>Suppprimer</div>
        </Button>
    );
};

ButtonDelete.propTypes = {
    allClass: PropTypes.string,
    functionDelete: PropTypes.func,
};
