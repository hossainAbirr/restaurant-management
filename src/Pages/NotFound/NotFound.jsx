
import error404 from '../../assets/error404.gif'
import { Link } from 'react-router-dom';
const NotFound = () => {
    return (
        <div className='flex justify-center flex-col items-center h-screen bg-black'>
            <img src={error404} alt="" />
            <p className="text-2xl text-white font-semibold md:text-3xl">Sorry, we couldn&apos;t find this page.</p>
			<p className="mt-4 mb-8 text-white dark:text-gray-400">But dont worry, you can find plenty of other things on our homepage.</p>
            <button className='btn'><Link to='/'>Go Back Home</Link></button>
            <div className=''>
            </div>
        </div>
    );
};

export default NotFound;