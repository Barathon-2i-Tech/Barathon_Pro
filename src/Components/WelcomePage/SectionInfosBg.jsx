import PropTypes from 'prop-types';
import { BannerLayout } from '../CommonComponents/SvgComponent/CommonSvg';

export default function SectionInfosBg({ title, description }) {
    return (
        <div className="relative">
            <div className="elementor-shape elementor-shape-top">
                <BannerLayout allClass={'elementor-shape-fill fill-orange-300'} />
            </div>
            <div className="banner-infos-bg__txt-container container mx-auto max-w-screen-xl px-4">
                <div className="text-center text-cyan-900">
                    <div className="">
                        <div className="h4 w-full text-center">{title}</div>
                    </div>
                    <div className="">
                        <div className="h6 ">{description}</div>
                    </div>
                </div>
            </div>
            <div className="elementor-shape bg-orange-300 elementor-shape-bottom">
                <BannerLayout allClass={'elementor-shape-fill fill-white'} />
            </div>
        </div>
    );
}

SectionInfosBg.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};
