import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import slide1 from '../../../../assets/Image/slide1.jpg'
import slide2 from '../../../../assets/Image/slide2.jpg'
import slide3 from '../../../../assets/Image/slide3.jpg'
import slide4 from '../../../../assets/Image/slide4.jpg'
import slide5 from '../../../../assets/Image/slide5.jpg'
const Slider = () => {
    return (
        <>
            <div className="carousel w-full lg:h-[500px]">
                <div id="item1" className="carousel-item w-full relative">
                    <img src={slide1} className="w-full" />
                    <div className='text-white absolute top-1/2 left-1/2' style={{ transform: "translate(-50%, -50%)"}}>
                        <h1 className='text-4xl lg:ml-36'>English Spoken Language</h1>
                        <p>English is the most spoken language in the world and the third most spoken native language in the world, after Standard Chinese and Spanish. It is the most widely learned second language and is either the official language or one of the official languages in 59 sovereign states.</p>
                    </div>
                </div>
                <div id="item2" className="carousel-item w-full relative">
                    <img src={slide2} className="w-full" />
                    <div className='text-secondary absolute top-1/2 left-1/2' style={{ transform: "translate(-50%, -50%)"}}>
                        <h1 className='text-4xl lg:ml-36'>French Spoken Language</h1>
                        <p>This article is about the French language, its history and evolution. It covers information on the number of people who use it as their first or second language, its origin, development of different dialects in France and outside France (Canada), phonology, grammar etc.</p>
                    </div>
                </div>
                <div id="item3" className="carousel-item w-full relative">
                    <img src={slide3} className="w-full" />
                    <div className='text-white absolute top-1/2 left-1/2' style={{ transform: "translate(-50%, -50%)"}}>
                        <h1 className='text-4xl lg:ml-36'>Turkey Spoken Language</h1>
                        <p>Turkish ( ; also 'Turkish of Turkey') is the most widely spoken of the Turkic languages, with around 80 to 90 million speakers. It is the national language of Turkey and Northern Cyprus. Significant smaller groups of Turkish speakers also exist in Germany, Austria, Bulgaria, North Macedonia, Greece, Cyprus, other parts of Europe, the Caucasus, and some parts of Central Asia, Iraq, and Syria.</p>
                    </div>
                </div>
                <div id="item4" className="carousel-item w-full relative">
                    <img src={slide4} className="w-full" />
                    <div className='text-white absolute top-1/2 left-1/2' style={{ transform: "translate(-50%, -50%)"}}>
                        <h1 className='text-4xl lg:ml-36'>Chinese Spoken Language</h1>
                        <p>Chinese ( especially when referring to written Chinese) is a group of languages spoken natively by the ethnic Han Chinese majority and many minority ethnic groups in Greater China. About 1.3 billion people (or approximately 16% of the world's population) speak a variety of Chinese as their first language. Chinese languages form the Sinitic branch of the Sino-Tibetan languages family.</p>
                    </div>
                </div>
                <div id="item5" className="carousel-item w-full relative">
                    <img src={slide5} className="w-full" />
                    <div className='text-white absolute top-1/2 left-1/2' style={{ transform: "translate(-50%, -50%)"}}>
                        <h1 className='text-4xl lg:ml-36'>Arabia Spoken Language</h1>
                        <p>Arabic is the official language of Saudi Arabia, and the mother tongue for most of Saudi’s natives. The classical version of Arabic is hardly used in regular conversations and is mainly found in the Quran and other classical works, poetry, and is used by religious scholars. Classical Arabian is considered an exclusive.</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-center w-full py-2 gap-2">
                <a href="#item1" className="btn btn-xs">1</a>
                <a href="#item2" className="btn btn-xs">2</a>
                <a href="#item3" className="btn btn-xs">3</a>
                <a href="#item4" className="btn btn-xs">4</a>
                <a href="#item5" className="btn btn-xs">5</a>
            </div>
        </>
    );
};

export default Slider;