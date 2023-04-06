import { BannerLayout } from '../CommonComponents/SvgComponent/CommonSvg';

export default function SectionInfosNumber() {
    const dataNumber = [
        {
            key: `1`,
            number: 650,
            text: 'Événements organisés en 2022',
        },
        {
            key: `2`,
            number: 1607,
            text: 'Bars proposé sur notre Applications',
        },
        {
            key: `3`,
            number: 11560,
            text: 'Téléchargements en 2022',
        },
    ];

    return (
        <div className="relative">
            <div className="elementor-shape elementor-shape-top">
                <BannerLayout allClass={'elementor-shape-fill fill-cyan-800'} />
            </div>

            <div className="banner-infos-bg__txt-container container mx-auto max-w-screen-xl px-4">
                <div className="">
                    <div className="">
                        <div className="h4 text-white w-full text-center">
                            Des évènements partout dans ta ville avec Barathon !
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {dataNumber.map(({ key, number, text }) => (
                            <div key={key} className="number-counter sm:p-10 md:p-20">
                                <div className="nums ">
                                    <div className="num-container text-white col-12 col-md-4 text-center">
                                        <div className="num h4 text-orange-300">{number}</div>
                                        <div className="title-num h6">{text}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="elementor-shape bg-cyan-800 elementor-shape-bottom">
                <BannerLayout allClass={'elementor-shape-fill fill-white'} />
            </div>
        </div>
    );
}
