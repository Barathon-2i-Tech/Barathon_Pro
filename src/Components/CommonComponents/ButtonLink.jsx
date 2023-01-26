import PropTypes from 'prop-types';
import Link from '@mui/material/Link';

export const ButtonLink = ({ allClass, link, text, icon }) => {
    return (
        <div className={allClass}>
            <Link
                sx={{
                    color: 'inherit',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                }}
                className="break-word"
                href={link}
            >
                <div className="w-full">{icon}</div>
                <div className="w-full">{text}</div>
            </Link>
        </div>
    );
};

ButtonLink.propTypes = {
    link: PropTypes.string,
    allClass: PropTypes.string,
    text: PropTypes.string,
    icon: PropTypes.object,
};
