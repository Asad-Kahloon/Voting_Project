import { FaLock, FaBlackTie } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { MdPeopleAlt } from "react-icons/md";
import { Link } from "react-router-dom";


const SuperDashboard = () => {

    
     

  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <Link to='viewprovince' className='card'>
                <div className='card-inner'>
                    <h3>Provinces</h3>
                    <FaBlackTie className='card_icon'/>
                </div>
                <h1>300</h1>
            </Link>
            <Link to='viewdistrict' className='card'>
                <div className='card-inner'>
                    <h3>Districts</h3>
                    <BiSolidCategory className='card_icon'/>
                </div>
                <h1>12</h1>
            </Link>
            <Link to='viewconstituency' className='card'>
                <div className='card-inner'>
                    <h3>Constituencies</h3>
                    <MdPeopleAlt className='card_icon'/>
                </div>
                <h1>33</h1>
            </Link>
            <Link className='card'>
                <div className='card-inner'>
                    <h3>Votes</h3>
                    <FaLock className='card_icon'/>
                </div>
                <h1>42</h1>
            </Link>
        </div>

    </main>
  )
}

export default SuperDashboard