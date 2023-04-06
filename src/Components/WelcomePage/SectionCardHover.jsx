export default function SectionCardHover() {
    const dataCardHover = [
        {
            key: `1`,
            imgUrl: `https://7482495.fs1.hubspotusercontent-na1.net/hubfs/7482495/Julien%20folder/illustration-saint-patrick-feuilles-trefle-rougeoyant-forme-neons-mur-briques_1314-3098.webp`,
            title: "St Patrick's Day !",
            description:
                "Dans vos meilleurs Pub Irlandais, Buvez autant de bière qu'un leprechaun.",
        },
        {
            key: `2`,
            imgUrl: `https://7482495.fs1.hubspotusercontent-na1.net/hubfs/7482495/Julien%20folder/cocktail-bibliotheque-comptoir-du-bar-lounge-boisson-relaxante_482257-24605.jpeg`,
            title: 'Soirée Cocktail',
            description:
                'Plusieurs Bar à Cocktails et meme des soirées organisées autour de multiples recettes',
        },
        {
            key: `3`,
            imgUrl: `https://7482495.fs1.hubspotusercontent-na1.net/hubfs/7482495/Julien%20folder/boite-nuit-bar-cocktails-lumineux-neon-retro-enseigne-realiste-vecteur-lettres-lumiere-bleues-fluorescentes-rougeoyantes-verre-cocktail-jaune-cadre-olive-violet-rose-illustration-mur-briques-sombres_1441-3359.webp`,
            title: 'Bar Dansant',
            description:
                "Une multitude de d'organisateurs de soirées dansantes. Faites la tourné des soirées boites ou concerts !",
        },
        {
            key: `4`,
            imgUrl: `https://m.media-amazon.com/images/I/61gwiml4VDL.jpg`,
            title: 'After Work !',
            description:
                "Trouvez vos bars préférés. Soyez au courants des évènements avenir. C'est party pour l'After-work !!",
        },
    ];

    return (
        <section className="relative z-10">
            <div className="container mx-auto max-w-screen-xl sm:py-11 md:py-20 lg:items-center grid grid-cols-1 md:grid-cols-2 gap-10 px-4">
                {dataCardHover.map(({ key, imgUrl, title, description }) => (
                    <div key={key} className="sec-card-hover__card flex justify-center flex-wrap">
                        <div className="sec-card-hover__card-container relative w-full w-100 ">
                            <div className="sec-card-hover__card-container-img  card-event__img-transition">
                                <div className="absolute top-0 bottom-0 left-0 right-0 h-full w-full z-0 color-filter opacity-20 is-dark-blue"></div>
                                <img
                                    className="card-hover__img  w-full"
                                    src={imgUrl}
                                    alt="pub"
                                    width="300"
                                    height="100"
                                />
                            </div>
                        </div>
                        <div className="card-hover__content">
                            <div className="h6 text-orange-300 w-full text-center">{title}</div>
                            <div className="pb-22 text-cyan-900 dark:text-white w-full font-bold text-center">
                                {description}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
