import { useLoaderData } from "react-router-dom";
import Food from "./Food";
import { useEffect, useState } from "react";
import axios from "axios";

const AllFood = () => {

    const foods = useLoaderData();
    console.log(foods);
    const [search, setSearch] = useState('');
    const [filterredFood, setFilterredFood] = useState(foods);
    const [sliceLength, setSliceLength] = useState(9);
    const [isSeeAll, setIsSeeAll] = useState(false);
    const [itemPerPage, setItemPerPage] = useState(4)
    const [currentPage, setCurrentPage] = useState(0)
    // const [count, setCount] = useState(8)

    const count = foods.length
    console.log(search);
    console.log(count, itemPerPage);

    // useEffect(() => {
    //     axios.get('http://localhost:2500/countproducts')
    //     .then(res => {
    //         console.log(res.data);
    //         setCount(res.data)
    //     })
    // },[])

    const handleSearch = () => {
        const searchedFood = foods.filter(food => food.name.toLowerCase().includes(search.toLowerCase()));
        console.log(searchedFood);
        setFilterredFood(searchedFood);

    }
    // const handleShowAll = () => {
    //     console.log(isSeeAll);
    //     if (isSeeAll) {
    //         setSliceLength(foods.length)
    //     } else {
    //         setSliceLength(9)
    //     }
    // }
    const numberOfPages = Math.ceil(count / itemPerPage);
    console.log(numberOfPages);
    const page = [...Array(numberOfPages).keys()];

    console.log(page);

    // useEffect(() => {
    //     axios.get(`http://localhost:2500/pagination?page=${currentPage}&size=${itemPerPage}`)
    //         .then(res => {
    //             console.log(res.data);
    //             setFilterredFood(res.data)
    //         })
    // }, [currentPage, itemPerPage])

    const handleChange = (e) => {
        setItemPerPage(parseInt(e.target.value))
        setCurrentPage(0);
    }
    const handleNextPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handlePrevPage = () => {
        if (currentPage < page.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }
    const handleRoutePage = (currentNum) => {
        setCurrentPage(currentNum);
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
                {/* {
                    isSeeAll ? <button onClick={() => handleShowAll(setIsSeeAll(!isSeeAll))} className="btn btn-accent">See All</button> : <button onClick={() => handleShowAll(setIsSeeAll(!isSeeAll))} className="btn btn-info">See Less</button>
                } */}
                <button className="btn btn-primary" onClick={handlePrevPage}>Previous</button>
                {
                    page.map(item => (
                        <button
                            className={currentPage === item ? 'bg-orange-500' : ''}
                            onClick={() => {
                                handleRoutePage(item);
                            }}
                            key={item}
                        >
                            {item}
                        </button>
                    ))
                }
                <button className="btn btn-secondary" onClick={handleNextPage}>Next</button>
                <select value={itemPerPage} onChange={handleChange}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            </div>

        </div>
    );
};

export default AllFood;