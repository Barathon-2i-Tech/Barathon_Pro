import { LogoAndroid, LogoApple } from '../CommonComponents/SvgComponent/ApplicationLogoDownload';

export default function FooterWelcome() {
    return (
        <footer
            id="main_footer"
            className="bg-cyan-800 text-white pt-4 z-0 mt-0"
            data-event-label="Footer"
        >
            <div className="px-6 sm:px-4 xl:px-0 container my-0 mx-auto flex flex-col space-y-6 pb-4">
                <div className="flex flex-row  items-center justify-center sm:justify-start pb-6 mt-2 border-b border-solid border-gray6">
                    <div className="h6 sm:block font-semibold">
                        Créez votre compte Barathon.
                        <a
                            href=""
                            data-event-label="Create your own group"
                            className="inline-flex ml-4 px-4 py-2 border-2 outline-none rounded-md mt-2 sm:mt-0"
                        >
                            Commencer
                        </a>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between">
                    <div className="w-1/3 mb-3">
                        <span className="h6">Votre compte</span>
                        <ul>
                            <li className="my-1">
                                <a
                                    href=""
                                    data-element-name="footer-signUp"
                                    data-event-label="Sign up"
                                    className="ds-font-small hover:no-underline text-white hover-txt-yellow cursor-pointer"
                                >
                                    S inscrire
                                </a>
                            </li>
                            <li className="my-1">
                                <a
                                    href=""
                                    data-element-name="footer-logIn"
                                    data-event-label="Log in"
                                    className="ds-font-small hover:no-underline text-white hover-txt-yellow cursor-pointer"
                                >
                                    Se connecter
                                </a>
                            </li>
                            <li className="my-1">
                                <a
                                    href=""
                                    data-element-name="footer-help"
                                    data-event-label="Help"
                                    className="ds-font-small hover:no-underline text-white hover-txt-yellow cursor-pointer"
                                >
                                    Aide
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="w-1/3 mb-3">
                        <span className="h6">Découvrir</span>
                        <ul>
                            <li className="my-1">
                                <a
                                    href=""
                                    data-element-name="footer-BarathonPro"
                                    data-event-label="Barathon Pro"
                                    className="ds-font-small hover:no-underline text-white hover-txt-yellow cursor-pointer"
                                >
                                    Evenement
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="w-1/3 mb-3">
                        <span className="h6">Barathon</span>
                        <ul>
                            <li className="my-1">
                                <a
                                    href=""
                                    data-element-name="footer-BarathonPro"
                                    data-event-label="Barathon Pro"
                                    className="ds-font-small hover:no-underline text-white hover-txt-yellow cursor-pointer"
                                >
                                    Barathon Pro
                                </a>
                            </li>
                            <li className="my-1">
                                <a
                                    href=""
                                    data-element-name="footer-apps"
                                    data-event-label="Apps"
                                    className="ds-font-small hover:no-underline text-white hover-txt-yellow cursor-pointer"
                                >
                                    Applications
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center items-start">
                    <div>
                        <div className="mb-3">Nous suivre</div>
                        <div className="flex flex-row space-x-8 mb-6">
                            <a
                                href=""
                                aria-label="Barathon sur Facebook"
                                data-element-name="footer-facebookSocialLink"
                                data-event-label="Facebook follow us"
                            >
                                <div>
                                    <div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="27"
                                            height="27"
                                            fill="#fff"
                                            viewBox="0 0 17 17"
                                        >
                                            <path
                                                fill="#fff"
                                                d="M14.176.824H2.68A2.252 2.252 0 00.428 3.076v11.496a2.252 2.252 0 002.252 2.252h5.232v-5.84H5.934V8.706h1.978V7.028c0-.951.263-1.69.79-2.215.525-.526 1.238-.79 2.14-.79.901 0 1.485.035 1.752.1v2.029h-1.202c-.434 0-.73.092-.889.276-.158.183-.237.459-.237.826v1.452h2.253l-.3 2.278h-1.953v5.84h3.91a2.252 2.252 0 002.252-2.252V3.076A2.252 2.252 0 0014.176.824z"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                            </a>
                            <a
                                href=""
                                aria-label="Instagram"
                                data-element-name="footer-instagramSocialLink"
                                data-event-label="Instagram follow us"
                            >
                                <div>
                                    <div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="27"
                                            height="27"
                                            fill="#000"
                                            viewBox="0 0 48 48"
                                        >
                                            <path
                                                fill="#fff"
                                                fillRule="evenodd"
                                                d="M0 24C0 10.745 10.745 0 24 0s24 10.745 24 24-10.745 24-24 24S0 37.255 0 24zm24.001-12.8c-3.476 0-3.912.015-5.278.077-1.362.063-2.293.279-3.106.595a6.268 6.268 0 00-2.268 1.476 6.284 6.284 0 00-1.477 2.267c-.318.814-.534 1.745-.595 3.107-.061 1.365-.077 1.802-.077 5.278 0 3.476.016 3.911.077 5.277.063 1.362.279 2.293.595 3.106a6.271 6.271 0 001.476 2.268 6.268 6.268 0 002.267 1.477c.814.317 1.745.532 3.107.595 1.366.062 1.802.077 5.278.077 3.476 0 3.911-.015 5.276-.077 1.363-.063 2.294-.278 3.109-.595a6.263 6.263 0 002.266-1.477 6.284 6.284 0 001.477-2.267c.315-.814.53-1.745.595-3.107.061-1.365.077-1.8.077-5.277 0-3.476-.016-3.912-.077-5.278-.064-1.363-.28-2.293-.595-3.107a6.283 6.283 0 00-1.477-2.267 6.256 6.256 0 00-2.267-1.476c-.816-.316-1.747-.532-3.11-.595-1.365-.062-1.8-.077-5.277-.077h.004z"
                                                clipRule="evenodd"
                                            ></path>
                                            <path
                                                fill="#fff"
                                                fillRule="evenodd"
                                                d="M22.853 13.507H24c3.418 0 3.823.012 5.172.073 1.249.057 1.926.266 2.377.441.597.232 1.023.51 1.471.957.448.448.725.875.958 1.473.175.45.384 1.127.44 2.375.062 1.35.075 1.755.075 5.171 0 3.416-.013 3.822-.074 5.17-.057 1.249-.266 1.926-.441 2.377a3.958 3.958 0 01-.958 1.47 3.958 3.958 0 01-1.47.958c-.452.176-1.13.384-2.377.44-1.35.062-1.755.075-5.173.075s-3.823-.013-5.172-.074c-1.248-.058-1.925-.266-2.377-.442a3.964 3.964 0 01-1.472-.957 3.967 3.967 0 01-.958-1.471c-.175-.45-.384-1.128-.44-2.376-.062-1.35-.074-1.755-.074-5.173s.012-3.821.073-5.17c.057-1.249.266-1.926.441-2.377.232-.598.51-1.024.958-1.472a3.973 3.973 0 011.472-.958c.451-.176 1.129-.384 2.377-.441 1.18-.054 1.638-.07 4.024-.072v.003zm7.98 2.125a1.536 1.536 0 100 3.072 1.536 1.536 0 000-3.072zm-6.832 1.795a6.574 6.574 0 100 13.147 6.574 6.574 0 000-13.147z"
                                                clipRule="evenodd"
                                            ></path>
                                            <path
                                                fill="#fff"
                                                fillRule="evenodd"
                                                d="M24.001 19.733a4.267 4.267 0 110 8.534 4.267 4.267 0 010-8.534z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-row space-x-3 items-start sm:items-end">
                        <div>
                            <a
                                href=""
                                data-event-label="link-application-android"
                                className="ds-font-small hover:no-underline text-white hover-txt-yellow cursor-pointer"
                            >
                                <LogoAndroid />
                            </a>
                        </div>
                        <div>
                            <a
                                href=""
                                data-event-label="link-application-apple"
                                className="ds-font-small hover:no-underline text-white hover-txt-yellow cursor-pointer"
                            >
                                <LogoApple />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="ds-font-small flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 text-white pt-2">
                    <span className="text-white">2022 Barathon</span>
                    <a
                        href=""
                        data-event-label="Terms of Service"
                        className="ds-font-small hover:no-underline text-white hover-txt-yellow cursor-pointer"
                    >
                        Conditions d utilisation
                    </a>
                    <a
                        href=""
                        data-event-label="Privacy Policy"
                        className="ds-font-small hover:no-underline text-white hover-txt-yellow cursor-pointer"
                    >
                        Politique de confidentialité
                    </a>
                    <a
                        href=""
                        data-event-label="Cookie Policy"
                        className="ds-font-small hover:no-underline text-white hover-txt-yellow cursor-pointer"
                    >
                        Politique d utilisation des cookies
                    </a>
                    <a
                        href=""
                        data-event-label="Help"
                        className="ds-font-small hover:no-underline text-white hover-txt-yellow cursor-pointer"
                    >
                        Aide
                    </a>
                </div>
            </div>
        </footer>
    );
}
