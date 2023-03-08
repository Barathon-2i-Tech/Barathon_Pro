import { LogoAndroid, LogoApple } from '../CommonComponents/SvgComponent/ApplicationLogoDownload';

export default function BannerWelcome() {
    return (
        <section className="relative z-10">
            <div className="container mx-auto max-w-screen-xl py-44 lg:items-center grid grid-cols-1 md:grid-cols-2 gap-10 px-4">
                <div className="">
                    <div className="">
                        <h1 className="text-white">Bienvenue chez Barathon !</h1>
                    </div>
                    <div className="">
                        <div className="banner-welcome__description h6 text-white pb-22 mt-3">
                            Barathon regroupe les bars autour de vous et ceux-ci vous propose une
                            multitude d evenements ! Découvrez Barathon et explorez tous les
                            evenements des bars autour de vous.
                        </div>
                    </div>
                    <div className="text-white display-desktop-hard mt-14">
                        <div className="banner-welcome__dl-title w-full text-center bold flex justify-center h5 extra-bold">
                            Téléchargez Barathon
                        </div>
                        <div className="w-full flex justify-center">
                            <div className="w-full flex justify-end pr-4">
                                <a
                                    href=""
                                    data-element-name="signUp"
                                    data-event-label="Sign up"
                                    className="banner-welcome__dl hover:no-underline text-white hover-txt-yellow cursor-pointer"
                                >
                                    <LogoAndroid />
                                </a>
                            </div>
                            <div className="w-full flex justify-start pl-4">
                                <a
                                    href=""
                                    data-element-name="signUp"
                                    data-event-label="Sign up"
                                    className="banner-welcome__dl hover:no-underline text-white hover-txt-yellow cursor-pointer"
                                >
                                    <LogoApple />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div>
                        <div className="banner-welcome__app flex justify-center">
                            <div>
                                <img
                                    className="banner-welcome__img"
                                    src="https://7482495.fs1.hubspotusercontent-na1.net/hubfs/7482495/Julien%20folder/%5BBARA%5D%20Accueil%20(1).png"
                                    alt=""
                                    width="300"
                                    height="100"
                                />
                            </div>
                            <div className="mt-20">
                                <img
                                    className="banner-welcome__img"
                                    src="https://7482495.fs1.hubspotusercontent-na1.net/hubfs/7482495/Julien%20folder/%5BBARA%5D%20carte%20evenements.png"
                                    alt=""
                                    width="300"
                                    height="100"
                                />
                            </div>
                            <div className="mt-40">
                                <img
                                    className="banner-welcome__img"
                                    src="https://7482495.fs1.hubspotusercontent-na1.net/hubfs/7482495/Julien%20folder/%5BBARA%5D%20Accueil%20evenements%20(1).png"
                                    alt=""
                                    width="300"
                                    height="100"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="text-white display-mobile-hard">
                        <div className="banner-welcome__dl-title w-full text-center bold flex justify-center h5 extra-bold">
                            Téléchargez Barathon
                        </div>
                        <div className="flex justify-center">
                            <div className="flex justify-end pr-4">
                                <a
                                    href=""
                                    data-element-name="signUp"
                                    data-event-label="Sign up"
                                    className="banner-welcome__dl hover:no-underline text-white hover-txt-yellow cursor-pointer"
                                >
                                    <LogoAndroid />
                                </a>
                            </div>
                            <div className="flex justify-start pl-4">
                                <a
                                    href=""
                                    data-element-name="signUp"
                                    data-event-label="Sign up"
                                    className="banner-welcome__dl hover:no-underline text-white hover-txt-yellow cursor-pointer"
                                >
                                    <LogoApple />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
