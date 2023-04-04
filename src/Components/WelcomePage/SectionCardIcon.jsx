export default function SectionCardIcon() {
    const dataSvg = [
        {
            key: `1`,
            title: 'Tout Types de Bars',
            text: "Trouvez des bars en fonction de vos envies, bieres ou cocktails. Si vous vous sentez l'ame d'un pirate, trouvez votre bars à rhum !",
            logo: 'https://7482495.fs1.hubspotusercontent-na1.net/hubfs/7482495/Julien%20folder/beer_cup_glass_icon_141548.svg',
        },
        {
            key: `2`,
            title: 'Les Évènements !',
            text: "Des soirées halloween, etudiantes, Techno et plein d'autre organisés par les bars.",
            logo: 'https://7482495.fs1.hubspotusercontent-na1.net/hubfs/7482495/Julien%20folder/dj_turntable_icon_161376%20(1).svg',
        },
        {
            key: `3`,
            title: 'BON PLAN !!!',
            text: "tu peux reserver ton accès à la soirée via l'application ! En fonction des bars tu aura acces à differents avantages* ! (accès rapide, verre offert)*",
            logo: 'https://7482495.fs1.hubspotusercontent-na1.net/hubfs/7482495/Julien%20folder/-vip_96379.svg',
        },
    ];

    return (
        <>
            {dataSvg.map(({ key, title, text, logo }) => (
                <div key={key} className="">
                    <div className="card-icon flex justify-center flex-wrap">
                        <div className="card-icon__container-icon w-full flex align-items-center justify-center">
                            <img className="" src={logo} alt="" width="300" height="100" />
                        </div>
                        <div className="h6 txt-yellow w-full text-center text-cyan-900 dark:text-white">
                            {title}
                        </div>
                        <div className="pb-22 w-full text-center text-cyan-900 dark:text-white">{text}</div>
                    </div>
                </div>
            ))}
        </>
    );
}
