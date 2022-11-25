export default function SectionCardIcon() {
    const dataSvg = [
        {
            key: `1`,
            title: 'title',
            text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
            logo: 'https://7482495.fs1.hubspotusercontent-na1.net/hubfs/7482495/Julien%20folder/beer_cup_glass_icon_141548.svg',
        },
        {
            key: `2`,
            title: 'title',
            text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
            logo: 'https://7482495.fs1.hubspotusercontent-na1.net/hubfs/7482495/Julien%20folder/dj_turntable_icon_161376%20(1).svg',
        },
        {
            key: `3`,
            title: 'title',
            text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
            logo: 'https://7482495.fs1.hubspotusercontent-na1.net/hubfs/7482495/Julien%20folder/-vip_96379.svg',
        },
    ];

    return (
        <>
            {dataSvg.map(({ key, title, text, logo }) => (
                <div key={key} className="">
                    <div className="card-icon flex justify-center flex-wrap">
                        <div className="card-icon__container-icon w-full flex align-items-center justify-center">
                            <img
                                className=""
                                src={logo}
                                alt=""
                                width="300"
                                height="100"
                            />
                        </div>
                        <div className="h6 txt-yellow w-full text-center text-cyan-900">
                            {title}
                        </div>
                        <div className="pb-22 w-full text-center text-cyan-900">{text}</div>
                    </div>
                </div>
            ))}
        </>
    );
}