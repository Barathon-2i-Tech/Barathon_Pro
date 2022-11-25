export default function SectionInfosList() {
    const dataImgListInfos = [
        {
            key: `1`,
            orderGridImg: 'lg:order-last',
            imgUrl: `https://7482495.fs1.hubspotusercontent-na1.net/hubfs/7482495/Julien%20folder/phone-user-event.png`,
            title: 'Devenez Barathonien et decouvrez toutes les soirées disponibles !',
            subtitle: '136 Bars Participants',
            allLi: [
                {
                    key: `1`,
                    li: 'the first li',
                },
                {
                    key: `2`,
                    li: 'the second li',
                },
            ],
        },
        {
            key: `2`,
            orderGridImg: 'lg:order-first',
            imgUrl: `https://7482495.fs1.hubspotusercontent-na1.net/hubfs/7482495/Julien%20folder/%5BPRO%5D%20Dashboard.jpg`,
            title: 'Vous etes un Bar ? Créez votre profile pro !',
            subtitle: '136 Bars Participants',
            allLi: [
                {
                    key: `1`,
                    li: 'the first li of the second item',
                },
                {
                    key: `2`,
                    li: 'the second li of the second item',
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
