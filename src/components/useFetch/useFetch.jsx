import axios from 'axios';
import React, { useEffect, useState } from 'react'
export default function useFetch(url) {
    const [data, setData] = useState([{}]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const getData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(url);
        setData(data);
        setError('');
        
      }catch(err){
        
          setError(err.message);
      }finally{
        setLoading(false);
      }
  
    }
    useEffect(() => {
      getData();
    }, []);
  return {data,setData, error, loading};
}
