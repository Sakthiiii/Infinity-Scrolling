import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Loading from './loading.gif'


function App() {
  const [photos, setPhotos] = useState([]);
  const [pageNumber, setPagenumber] = useState(1);

  const [loading,setLoading] =useState(false)

  const fetchPhoto = async (pageNumber) => {
    const Acces_key = "y4kLBDwiWzKABjT1x7oNuoZUN9Rh0ZO4KLOHwZQ9qSc";

    const res = await fetch(
      `https://api.unsplash.com/photos/?client_id=${Acces_key}&page=${pageNumber}&per_page=10`
    );

    const data = await res.json();
    console.log(data);
    setPhotos(p=>[...p,...data]);
    setLoading(true);
  };

  useEffect(() => {
    fetchPhoto(pageNumber);
  }, [pageNumber]);

  const loadmore = () =>{
    setPagenumber(prevPageNumber => prevPageNumber +1)
  }

  const pageEnd=useRef();
  let num =1 ;

  useEffect(()=>{
    if(loading){

      const observer = new IntersectionObserver(entries=> {

        if(entries[0].isIntersecting){
          num ++ ;
          loadmore();

          if(num >=10){
            observer.unobserve(pageEnd.current);
          }
        }

      },{threshold:1});
      observer.observe(pageEnd.current);
    }


  },[loading])
  return (
    <div className="App">
      <h1>Infinity scroling </h1>
      {photos.map((photo, index) => (
        <div className="photos" key={index}>
          <img src={photo.urls.small} alt="" />
          <p>{photo.user.first_name + "" + photo.user.last_name}</p>
        
          
          {/* <span>Likes :{photo.user.total_likes}</span> */}
          <p style={{color:"red"}}>Insta : {photo.user.social.instagram_username ?  photo.user.social.instagram_username : "Null"}  </p>
          {/* <p className="lo"> {photo.user.location ? photo.user.location :"Null"}</p> */}
        </div>
   
      ))}
      <div className="loading">
        <img src={Loading} alt=''/>
      </div>

      <h3>{photos.length}</h3>
      <button onClick={loadmore} ref={pageEnd}>Load More</button>
    </div>
  );
}

export default App;
