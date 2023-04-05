import { Box } from '@mui/material';
import ApplicationLogo from '../../Components/CommonComponents/SvgComponent/ApplicationLogo';
import { Link, useNavigate } from 'react-router-dom';
import { LogoAndroid } from '../../Components/CommonComponents/SvgComponent/ApplicationLogoDownload';
import { LogoApple } from '../../Components/CommonComponents/SvgComponent/ApplicationLogoDownload';

export default function EndRegisterLogin() {
    // Use this hook to programmatically navigate to another page
    const navigate = useNavigate();

    // This function is used to navigate to the home page
    // It will be called when the button is clicked
    const onHomeClick = () => {
        navigate('/');
    };

    return (
        <div className="mx-auto max-w-screen-2xl ">
            <div className="min-h-screen flex flex-col items-center justify-center sm:pt-6 sm:pt-0">
                <div className="w-full sm:max-w-lg sm:mt-6 sm:px-6 py-4 bg-white md:shadow-lg overflow-hidden sm:rounded-lg z-10">
                    <div className="z-10 flex justify-center items-center">
                        <Link href="/">
                            <ApplicationLogo className="w-28 h-28 sm:w-40 sm:h-40 fill-current z-10" />
                        </Link>
                    </div>
                    <Box m="20px">
                        <div className="w-full text-center bold flex justify-center h5 extra-bold">
                            Vous êtes inscris comme Barathonien non professionel. Téléchargez
                            l&apos;application pour utiliser accedez à votre compte !
                        </div>
                        <div className="dark:text-white mt-14">
                            <div className="w-full text-center bold flex justify-center h5 extra-bold">
                                Téléchargez Barathon
                            </div>
                            <div className="w-full flex justify-center">
                                <div className="w-full flex justify-end pr-4">
                                    <a
                                        href=""
                                        data-element-name="signUp"
                                        data-event-label="Sign up"
                                        className="hover:no-underline text-white hover-txt-yellow cursor-pointer"
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

                        <div className="flex justify-center text-white lg:text-xl">
                            <button
                                onClick={onHomeClick}
                                className="w-fit m-2 mt-6 sm:mt-12 bg-orange-300 hover:border-solid hover:border-white-900 hover:border-2 pt-2 pb-2 pr-4 pl-4 rounded-lg"
                            >
                                Accueil
                            </button>
                        </div>
                    </Box>
                </div>
            </div>
        </div>
    );
}
