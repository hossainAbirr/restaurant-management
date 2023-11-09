
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import banner1 from '../../assets/banner1.jpg'
import banner3 from '../../assets/banner3.jpg'
import banner4 from '../../assets/banner4.jpg'
const Banner = () => {
    const sliderImg = [banner1, banner3, banner4,]
    return (
        <div className='h-[700px] relative z-0'>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                autoplay={
                    {
                        delay: 2000,

                    }
                }
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {
                    sliderImg.map((img, idx) => <SwiperSlide
                        key={idx}
                    >
                        <div className='h-[700px] text-white' style={{ backgroundImage: `url(${img})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                            <div className='w-full h-full flex items-center bg-gradient-to-r from-[#84028482] to-[#ffc0cb58]'>
                                <div className='lg:ml-32 '>
                                    <h1 className='text-6xl mb-5 text-[#FF7518] font-bold'>Savor the Moment <br />
                                        at Abir&apos;s Restaurant</h1>

                                    <p className='w-1/2 font-medium'>Experience a symphony of flavors with our expertly crafted dishes. From the sizzle of prime steaks to the zest of fresh salads, indulge in a dining adventure that tantalizes your taste buds. Join us for a meal that&apos;s more than just food—it&apos;s a memory in the making.</p>
                                    <button className='btn btn-secondary mt-5'>See All Dishes</button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Banner;