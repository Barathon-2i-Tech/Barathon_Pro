import PropTypes from 'prop-types';

export const Loader = ({ allClass }) => {
    return (
        <div id="loader" className={allClass}>
            <span></span>
        </div>
    );
};

Loader.propTypes = {
    allClass: PropTypes.string,
};
