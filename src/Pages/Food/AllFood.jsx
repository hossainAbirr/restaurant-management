import { useLoaderData } from "react-router-dom";
import Food from "./Food";
import { useEffect, useState } from "react";
import axios from "axios";
const AllFood = () => {

    const [loading, setLoading] = useState(true);
    const [allFoods, setAllFoods] = useState([])
    const [filterredFoods, setFilterredFoods] = useState([]);
    const [itemPerPage, setItemPerPage] = useState(4)
    const [currentPage, setCurrentPage] = useState(0)
    const [searchText, setSearchText] = useState('');
    const [count, setCount] = useState(0);

    const finaleSearchText = searchText;
    const { countfoods } = useLoaderData();
    console.log('all foods are here', allFoods);
    console.log(searchText);
    console.log('filterred foods are here', filterredFoods);

    useEffect(() => {
        axios.get('http://localhost:2500/foods')
            .then(res => {
                setAllFoods(res.data)
                // setLoading(false)
            })
    }, [])

    const handleSearch = () => {
        // const fanmes = allFoods.map(fname => console.log(fname.name.toLowerCase()));
        const searchedFoods = allFoods.filter(food => food?.name && food.name.toLowerCase().includes(finaleSearchText));
        console.log(searchedFoods);
        setFilterredFoods(searchedFoods);
        console.log(searchText);
    };

    const numberOfPages = Math.ceil(countfoods / itemPerPage);

    console.log(typeof countfoods, countfoods, numberOfPages, typeof numberOfPages);

    const page = [...Array(numberOfPages).keys()];

    console.log('page length', page.length);

    useEffect(() => {
        axios.get(`http://localhost:2500/pagination?page=${currentPage}&size=${itemPerPage}`)
            .then(res => {
                console.log(res.data);
                setFilterredFoods(res.data)
                setLoading(false);
            })
    }, [currentPage, itemPerPage])

    const handleChange = (e) => {
        setItemPerPage(parseInt(e.target.value))
        setCurrentPage(0);
    }
    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNextPage = () => {
        if (currentPage < page.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }
    const handleRoutePage = (currentNum) => {
        setCurrentPage(currentNum);
    }
    if (loading) {
        return <div className="h-screen flex justify-center items-center"><h1>loading...</h1></div>
    }
    return (
        <div className="max-w-7xl mx-auto py-20">
            <div className="flex justify-center py-10">
                <input onChange={e => setSearchText(e.target.value.toLowerCase())} type="search" name="search" id="1" className="input input-bordered rounded-r-sm w-1/2" />
                <button onClick={handleSearch} className="btn rounded-l-none">Search</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10">
                {
                    filterredFoods.map(food => <Food
                        key={food._id}
                        food={food}
                    ></Food>)
                }
            </div>

            <div className={`flex justify-center pt-10`}>
                <button className="btn btn-primary" onClick={handlePrevPage}>Previous</button>
                {
                    page.map(item => (
                        <button
                            className={currentPage === item ? 'btn btn-circle btn-warning' : ''}
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