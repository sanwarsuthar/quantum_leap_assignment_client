import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const NotFound = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    useEffect(() => {
      if(token){
        navigate("/")
      }else{
        navigate("/login");
      }
    },[])
  return (
    <></>
  )
}

export default NotFound
