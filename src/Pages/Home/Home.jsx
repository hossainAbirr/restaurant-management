import Banner from "./Banner";
import signature from '../../assets/signature.png';
import { useEffect, useState } from "react";
import axios from "axios";
import TopFood from "./TopFood";
const Home = () => {

    const [topFoods, setTopFoods] = useState([]);
    console.log(topFoods);
    useEffect(() => {
        axios.get(`http://localhost:2500/topfoods`)
            .then(res => {
                console.log(res.data);
                setTopFoods(res.data)
            })
    }, [])
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


            <div>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-10 my-32">
                    {
                        topFoods.map(food => <TopFood
                        key={food._id}
                        food={food}
                        ></TopFood>)
                    }
                </div>
            </div>

        </div>
    );
};

export default Home;