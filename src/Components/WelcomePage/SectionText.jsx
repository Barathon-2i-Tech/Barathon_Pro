import PropTypes from 'prop-types';

export default function SectionText({ title, description }) {
    return (
        <div className="relative">
            <div className="banner-infos-bg__txt-container container mx-auto max-w-screen-xl px-4">
                <div className="text-center text-cyan-900 dark:text-white">
                    <div className="">
                        <div className="h4 w-full text-center">{title}</div>
                    </div>
                    <div className="m-auto max-w-5xl">
                        <div className="h6 ">{description}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

SectionText.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};
