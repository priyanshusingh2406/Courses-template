import React, {useState} from 'react';
import './App.css';
import { apiUrl, filterData } from './data';
import Navbar from './components/Navbar';
import Filter from './components/Filter';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import Cards from './components/Cards';
import Spinner from './components/Spinner';

function App() {

  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(filterData[0].title)

  async function fetchData(){
    setLoading(true);
    try{
      let response = await fetch(apiUrl);
      let output = await response.json();

      setCourses(output.data);
    }
    catch(error){
      toast.error("Problem in fetching the data from URL");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [])


  return (
    <div className='min-h-screen flex flex-col bg-blue-400'>
      
     <div>
     <Navbar/>
     </div>

     <div className='bg-blue-400'>
     <div>
       <Filter filterData={filterData} 
        category={category}
        setCategory={setCategory}
       />
      </div>
    
       <div className='w-11/12 max-w-[1200px] mx-auto flex justify-center items-center min-h-[50vh] flex-wrap'>
        {
           loading ? (<Spinner/>) : (<Cards courses={courses} category={category} />)
        }
      </div>
     </div>

      
      
    </div>
  );
}

export default App;
