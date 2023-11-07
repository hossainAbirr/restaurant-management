import Banner from "./Banner";
import signature from '../../assets/signature.png';
const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <div className="flex flex-col justify-center items-center py-20 px-[20%]">
                <h2 className="font-bold text-6xl">About Us</h2>
                <p className="text-center py-10">
                Welcome to Abir&apos;s Restaurant, where culinary craftsmanship meets the warmth of home. Since our doors opened in 2023, we&apos;ve been dedicated to offering an unforgettable dining experience to our guests. Our founders, Hossain and Morshad Mondal, envisioned a gathering place that felt like an extension of the family dining room—a space where each dish is a conversation starter, and every ingredient tells a story. From our locally-sourced produce to our eclectic fusion of international cuisines, Abir Restaurant&apos;s menu is a testament to our commitment to flavor, quality, and innovation. Step into our world, and let us take you on a journey of taste that&apos;s been carefully curated to delight the senses and nourish the soul.
                </p>
                <img className="w-60" src={signature} alt="" />
            </div>

        </div>
    );
};

export default Home;