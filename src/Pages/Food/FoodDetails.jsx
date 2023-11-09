
import { Link, useLoaderData } from "react-router-dom";

const FoodDetails = () => {
    const food = useLoaderData();
    const { _id, photo, category, providerEmail, quantity, foodName, price, description, providerName } = food
    console.log(food);
    return (
        <section>
            <section className="p-4 lg:p-8 dark:bg-gray-800 dark:text-gray-100">
                <div className="container mx-auto space-y-12">
                    <div className="flex flex-col  overflow-hidden rounded-md shadow-sm lg:flex-row">
                        <img src={photo} alt="" className="flex-1 dark:bg-gray-500 aspect-video" />
                        <div className="flex flex-col justify-around flex-1 p-6 dark:bg-gray-900">
                            <h3 className="text-3xl font-bold">Food Name : {foodName}</h3>
                            <span className="text-lg mb-3 mt-3 uppercase dark:text-gray-400">Category : {category}</span>
                            <span className="text-lg mb-3 uppercase dark:text-gray-400">Made by : {providerName}</span>
                            <span className="text-lg mb-3 uppercase dark:text-gray-400">Origin : Bangladesh</span>
                            <span className="text-lg uppercase dark:text-gray-400">Price : {price}</span>
                            <p className="my-6 dark:text-gray-400">{description}</p>
                            <Link to={`/purchase/${_id}`} type="button" className="btn btn-warning text-white">Order Now</Link>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default FoodDetails;