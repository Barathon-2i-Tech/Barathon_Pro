import BannerWelcome from '../Components/WelcomePage/BannerWelcome.jsx';
import SectionText from '../Components/WelcomePage/SectionText.jsx';
import SectionCardIcon from '../Components/WelcomePage/SectionCardIcon.jsx';
import SectionInfosNumber from '../Components/WelcomePage/SectionInfosNumber';
import SectionCardHover from '../Components/WelcomePage/SectionCardHover';
import SectionInfosBg from '../Components/WelcomePage/SectionInfosBg';
import SectionInfosList from '../Components/WelcomePage/SectionInfosList';
import FooterWelcome from '../Components/WelcomePage/FooterWelcome';
import HeaderWelcome from '../Components/WelcomePage/HeaderWelcome.jsx';
import '../css/WelcomePage/BannerWelcome.css';
import '../css/WelcomePage/GlobalWelcome.css';
import '../css/WelcomePage/SectionCardIcon.css';
import '../css/WelcomePage/SectionInfos.css';
import '../css/WelcomePage/SectionCardHover.css';
import '../css/WelcomePage/SectionInfosList.css';
import '../css/WelcomePage/TypoCustom.css';

export default function Welcome() {
    return (
        <>
            <div className="relative items-top sm:pt-0 overflow-hidden">
                <div className="text-white z-40 fixed w-full bg-cyan-800 bg-opacity-90">
                    <HeaderWelcome />
                </div>

                <div className="sec-banner relative">
                    <div className="background-banner absolute top-0 bottom-0 left-0 right-0 h-full w-full z-0 color-filter is-opacity-5 is-dark-blue"></div>
                    <BannerWelcome />
                </div>

                <div className="sec-banner-text relative  mt-20">
                    <SectionText
                        title={'Title'}
                        description={
                            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries PageMaker including versions of Lorem Ipsum.'
                        }
                    />
                </div>
                <div className="relative">
                    <section className="sec-cards-icons container mx-auto max-w-screen-xl py-20 lg:items-center grid grid-cols-1 md:grid-cols-3 gap-10 px-4">
                        <SectionCardIcon />
                    </section>
                </div>
                <div className="sec-banner-infos relative bg-cyan-800 mt-20">
                    <SectionInfosNumber number={'300'} description={'Description'} />
                </div>
                <div className="sec-card-hover relative mt-20">
                    <SectionCardHover />
                </div>

                <div className="sec-banner-infos relative bg-orange-300 mt-20">
                    <SectionInfosBg
                        title={'TITLE'}
                        description={
                            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.'
                        }
                    />
                </div>

                <div className="sec-banner-ImgListInfos relative mt-20">
                    <SectionInfosList />
                </div>
                <div className="footerWelcome relative">
                    <FooterWelcome />
                </div>
            </div>
        </>
    );
}

