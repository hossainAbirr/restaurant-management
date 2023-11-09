import Banner from "./Banner";
import signature from '../../assets/signature.png';
import { useEffect, useState } from "react";
import axios from "axios";
import TopFood from "./TopFood";
const Home = () => {

    const [topFoods, setTopFoods] = useState([]);
    console.log(topFoods);
    useEffect(() => {
        axios.get(`https://restaurant-management-server-kappa.vercel.app/topfoods`)
            .then(res => {
                console.log(res.data);
                setTopFoods(res.data)
            })
    }, [])
    return (
        <div className="bg-[#F5F5F5]">
            <Banner></Banner>
            <div className="flex flex-col justify-center items-center py-20 px-[20%]">
                <h2 className="font-bold text-6xl">About Us</h2>
                <p className="text-center py-10">
                    Welcome to Abir&apos;s Restaurant, where culinary craftsmanship meets the warmth of home. Since our doors opened in 2023, we&apos;ve been dedicated to offering an unforgettable dining experience to our guests. Our founders, Hossain and Morshad Mondal, envisioned a gathering place that felt like an extension of the family dining room—a space where each dish is a conversation starter, and every ingredient tells a story. From our locally-sourced produce to our eclectic fusion of international cuisines, Abir Restaurant&apos;s menu is a testament to our commitment to flavor, quality, and innovation. Step into our world, and let us take you on a journey of taste that&apos;s been carefully curated to delight the senses and nourish the soul.
                </p>
                <img className="w-60" src={signature} alt="" />
            </div>


            <div>
                <h2 className="text-5xl font-bold text-center text-[#FF7518] "><span className="border-l-[10px] rounded-sm pl-1 border-[#FFD700]">C</span>ulinary Stars :
                    Our Bestselling Delights</h2>
                <p className="text-center w-3/4 mx-auto mt-10 text-[#333333]">Our Top Food selection features locally-sourced ingredients and the freshest produce of the season. From the fiery zest of our signature spicy wings to the indulgent melt of our gourmet cheeseburger, these crowd-pleasers are more than just meals; they’re a celebration of taste. So, whether you’re a first-time visitor or a regular patron, prepare your palate for the stars of our menu that have earned their place at the top</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-10 py-32">
                    {
                        topFoods.map(food => <TopFood
                            key={food._id}
                            food={food}
                        ></TopFood>)
                    }
                </div>
            </div>

            <div className="grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32">
                <div className="flex flex-col justify-between">
                    <div className="space-y-2">
                        <h2 className="text-4xl font-bold leadi lg:text-5xl">Let's talk!</h2>
                        <div className="text-gray-400">Vivamus in nisl metus? Phasellus.</div>
                    </div>
                    <img src="assets/svg/doodle.svg" alt="" className="p-6 h-52 md:h-64" />
                </div>
                <form className="space-y-6">
                    <div>
                        <label type="name" className="text-sm">Full name</label>
                        <input id="name" type="text" placeholder="" className="w-full p-3 rounded bg-gray-800" />
                    </div>
                    <div>
                        <label type="email" className="text-sm">Email</label>
                        <input id="email" type="email" className="w-full p-3 rounded bg-gray-800" />
                    </div>
                    <div>
                        <label type="message" className="text-sm">Message</label>
                        <textarea id="message" rows="3" className="w-full p-3 rounded bg-gray-800"></textarea>
                    </div>
                    <button type="submit" className="w-full p-3 text-sm font-bold tracki uppercase rounded bg-violet-400 text-gray-900">Send Message</button>
                </form>
            </div>

        </div>
    );
};

export default Home;