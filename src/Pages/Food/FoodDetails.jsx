import axios from "axios";
import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const FoodDetails = () => {
    const { user } = useContext(AuthContext)
    const food = useLoaderData();
    const { _id, photo, category, providerEmail, quantity, foodName, price, description, providerName } = food
    console.log(food);
    const buyerName = user?.email;
    const orderedFood = { photo, category, providerEmail, foodName, price, description, providerName, buyerName, quantity }
    let count = 0;

    const handleAddToCart = (id) => {
        axios.post(`http://localhost:2500/order`, orderedFood)
            .then(res => {
                console.log(res.data)
                if(res.data.acknowledged){
                    count++
                    const sendSellCount = { soldItems : count}
                    axios.patch(`http://localhost:2500/foods/${id}`, sendSellCount)
                    .then(res => {
                        console.log(res.data);
                    })
                }
            })
    }
    return (
        <section>
            {/* <div className="flex justify-between">
                <div className="flex-1">
                    <img src={photo} alt="" />
                </div>

                <div className="flex-1">
                </div>
            </div> */}
            <section className="p-4 lg:p-8 dark:bg-gray-800 dark:text-gray-100">
                <div className="container mx-auto space-y-12">
                    <div className="flex flex-col  overflow-hidden rounded-md shadow-sm lg:flex-row">
                        <img src={photo} alt="" className="flex-1 dark:bg-gray-500 aspect-video" />
                        <div className="flex flex-col justify-around flex-1 p-6 dark:bg-gray-900">
                            <h3 className="text-3xl font-bold">Food Name : {foodName}</h3>
                            <span className="text-lg mb-3 mt-3 uppercase dark:text-gray-400">Category : {category}</span>
                            <span className="text-lg mb-3 uppercase dark:text-gray-400">Provider : {providerName}</span>
                            <span className="text-lg uppercase dark:text-gray-400">Price : {price}</span>
                            <p className="my-6 dark:text-gray-400">{description}</p>
                            <button onClick={() => handleAddToCart(_id)} type="button" className="btn btn-secondary text-white">Add to cart</button>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default FoodDetails;