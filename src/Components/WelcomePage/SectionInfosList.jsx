export default function SectionInfosList() {
    const dataImgListInfos = [
        {
            key: `1`,
            orderGridImg: 'lg:order-last',
            imgUrl: `https://7482495.fs1.hubspotusercontent-na1.net/hubfs/7482495/Julien%20folder/%5BBARA%5D%20Accueil%20evenements%20(1).png`,
            title: 'Pour nos Barathoniens !',
            subtitle: 'Il y a quoi pour moi ?',
            allLi: [
                {
                    key: `1`,
                    li: "Avec la géolocalisation, tu peux trouver les tous les bars de l'application autour de toi",
                },
                {
                    key: `2`,
                    li: 'Enregistre et suis tes évènements',
                },
                {
                    key: `3`,
                    li: "l'acces à tes tickets VIP",
                },
                {
                    key: `4`,
                    li: 'On te notifie si il y a du changements dans le programme de tes soirées',
                },
                {
                    key: '5',
                    li: "Gères l'apparence de ton app grace au DarkMode",
                },
            ],
        },
        {
            key: `2`,
            orderGridImg: 'lg:order-first',
            imgUrl: `https://7482495.fs1.hubspotusercontent-na1.net/hubfs/7482495/Julien%20folder/%5BPRO%5D%20Dashboard.jpg`,
            title: 'Pour les bars !',
            subtitle: 'Il y a quoi pour les enseignes ?',
            allLi: [
                {
                    key: `1`,
                    li: 'Un accès Multiples pour les gerants mais aussi les employés',
                },
                {
                    key: `2`,
                    li: 'Gérer plusieurs enseignes à la fois sur votre compte',
                },
                {
                    key: `3`,
                    li: 'La creation et modification de vos évènements',
                },
                {
                    key: `4`,
                    li: 'La gestion de vos évènements grace à un acces simple et rapide de ceux-ci',
                },
                {
                    key: `5`,
                    li: 'Vous pouvez demander la création de multiples tags afin de categoriser vos evenements et enseignes',
                },
            ],
        },
    ];

    return (
        <section className="relative z-10">
            {dataImgListInfos.map(({ key, orderGridImg, imgUrl, title, subtitle, allLi }) => (
                <div
                    key={key}
                    className="container mx-auto max-w-screen-xl sm:py-11 md:py-20 lg:items-center grid grid-cols-1 md:grid-cols-2 gap-10 px-4"
                >
                    <div className={orderGridImg}>
                        <div className="banner-ImgListInfos__title h4 w-100 display-sm-hard">
                            {title}
                        </div>
                        <div className="banner-ImgListInfos__img-container flex justify-center items-center">
                            <img
                                className="banner-ImgListInfos__img"
                                src={imgUrl}
                                alt=""
                                width="300"
                                height="100"
                            />
                        </div>
                    </div>
                    <div className="">
                        <div className="banner-ImgListInfos__title h4 w-100 display-md-hard">
                            {title}
                        </div>
                        <div className="sec-banner-user__card flex justify-start flex-wrap">
                            <div className="w-full">
                                <div className="sec-banner-ImgListInfos__card-content">
                                    <div className="h6 w-full">{subtitle}</div>
                                    <ul>
                                        {allLi.map(({ key, li }) => (
                                            <li key={key}>{li}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}
