import { Link } from 'react-router-dom';
import ApplicationLogo from '../CommonComponents/SvgComponent/ApplicationLogo';

export default function HeaderWelcome() {
    return (
        <div id="main_header" className="mx-auto max-w-screen-2xl ">
            <>
                <div id="navbar ">
                    <nav className="flex justify-between">
                        <div className="logo-container mt-2 ml-6 mb-2">
                            <Link to="/">
                                <ApplicationLogo />
                            </Link>
                        </div>
                        <ul className="flex items-center text-sm lg:text-lg">
                            <li className="h-full mr-2 lg:mr-6">
                                <Link
                                    to="/login"
                                    className="h-full hover:text-white flex items-center text-white"
                                >
                                    <div className="bg-teal-700 hover:border-solid hover:border-white-900 hover:border-2 pt-2 pb-2 pr-4 pl-4 rounded-lg">
                                        Connexion
                                    </div>
                                </Link>
                            </li>
                            <li className="h-full mr-2 lg:mr-6">
                                <Link
                                    to="/register"
                                    className="h-full flex hover:text-white items-center text-white"
                                >
                                    <div className="bg-orange-300 hover:border-solid hover:border-white-900 hover:border-2 pt-2 pb-2 pr-4 pl-4 rounded-lg">
                                        S&apos;enregistrer
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </>
        </div>
    );
}
