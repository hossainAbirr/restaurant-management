import { useLoaderData } from "react-router-dom";
import Food from "./Food";
import { useState } from "react";

const AllFood = () => {
    const foods = useLoaderData();
    console.log(foods);
    const [search, setSearch] = useState('');
    const [filterredFood, setFilterredFood] = useState(foods);
    const [sliceLength, setSliceLength] = useState(9);
    const [isSeeAll, setIsSeeAll] = useState(false);
    console.log(search);

    const handleSearch = () => {
        const searchedFood = foods.filter(food => food.name.includes(search.toLowerCase()));
        console.log(searchedFood);
        setFilterredFood(searchedFood);

    }

    const handleShowAll = () => {
        console.log(isSeeAll);
        if (isSeeAll) {
            setSliceLength(foods.length)
        }else{
            setSliceLength(9)
        }
    }


    return (
        <div className="max-w-7xl mx-auto py-20">
            <div className="flex justify-center py-10">
                <input onChange={e => setSearch(e.target.value)} type="search" name="search" id="1" className="input input-bordered rounded-r-sm w-1/2" />
                <button onClick={handleSearch} className="btn rounded-l-none">Search</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10">
                {
                    filterredFood.slice(0, sliceLength).map(food => <Food
                        key={food._id}
                        food={food}
                    ></Food>)
                }
            </div>
            <div className={`flex justify-center pt-10`}>
                {
                    isSeeAll ? <button onClick={() => handleShowAll(setIsSeeAll(!isSeeAll))} className="btn btn-accent">See All</button> : <button onClick={() => handleShowAll(setIsSeeAll(!isSeeAll))} className="btn btn-info">See Less</button>
                }
            </div>
        </div>
    );
};

export default AllFood;