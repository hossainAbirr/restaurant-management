import { Link, useLoaderData } from "react-router-dom";
import Food from "./Food";
import { useEffect, useState } from "react";
import axios from "axios";
import Loding from "../../components/Shared/Loding";
const AllFood = () => {

    const [loading, setLoading] = useState(true);
    const [allFoods, setAllFoods] = useState([])

    const [filterredFoods, setFilterredFoods] = useState([]);

    const [isSearch, setIsSearch] = useState(false)

    const [itemPerPage, setItemPerPage] = useState(6)
    const [currentPage, setCurrentPage] = useState(0)
    const [searchText, setSearchText] = useState('');

    const finaleSearchText = searchText;
    const { countfoods } = useLoaderData();
    console.log('all foods are here', allFoods);
    console.log(searchText);
    console.log('filterred foods are here', filterredFoods);

    useEffect(() => {
        axios.get('https://restaurant-management-server-kappa.vercel.app/foods')
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
        setIsSearch(true)
        console.log(searchText);
    };

    const handleSeeAll = () => {

    }

    const numberOfPages = Math.ceil(countfoods / itemPerPage);

    console.log(typeof countfoods, countfoods, numberOfPages, typeof numberOfPages);

    const page = [...Array(numberOfPages).keys()];

    console.log('page length', page.length);

    useEffect(() => {
        axios.get(`https://restaurant-management-server-kappa.vercel.app/pagination?page=${currentPage}&size=${itemPerPage}`)
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
        return <Loding></Loding>
    }
    document.title = "All Food || Abir's Restaurant";
    return (
        <div className="max-w-7xl mx-auto py-20">
            <h1 className="text-[#FF7518] font-bold text-5xl text-center">Abir&apos;s Restaurant <br /> <span className="h-14 bg-clip-text bg-gradient-to-r from-[#FF7518] to-[#1E2875] text-transparent inline-block">All the delicious dishes you could think of</span> </h1>
            <h2 className="my-5 text-center font-medium">Looking for something specific? Use our search function to find dishes by name.</h2>

            <div className="flex justify-center py-10">
                <input onChange={e => setSearchText(e.target.value.toLowerCase())} type="search" name="search" id="1" className="input input-bordered rounded-r-sm w-1/2" />
                <button onClick={handleSearch} className="btn rounded-l-none">Search</button>
            </div>
            <div className={` justify-center pb-10 ${isSearch ? 'flex' : 'hidden'}`}>
                <Link to={`/foods`} onClick={() => setIsSearch(false)} className={`btn w-1/2`}>See All</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10">
                {
                    filterredFoods.map(food => <Food
                        key={food._id}
                        food={food}
                    ></Food>)
                }
            </div>

            <div className={`flex justify-around items-center pt-10`}>
                <button className="btn" onClick={handlePrevPage}>Previous</button>
                {
                    page.map(item => (
                        <button
                            className={currentPage === item ? 'btn btn-circle btn-warning mx-10' : 'btn btn-circle'}
                            onClick={() => {
                                handleRoutePage(item);
                            }}
                            key={item}
                        >
                            {item}
                        </button>
                    ))
                }
                <button className="btn" onClick={handleNextPage}>Next</button>

                <div className="flex flex-row gap-3 items-center">
                    <h2 className="text-xl font-medium text-[#FF7518]">Items per page</h2>
                    <select className="input input-bordered" value={itemPerPage} onChange={handleChange}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </div>
            </div>

        </div>
    );
};

export default AllFood;