import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Search from './components/search'
import './App.scss'

function App() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [pageNumber, setpageNumber] = useState(1);
  const [lastPageNumber, setLastpageNumber] = useState();
  const handleFirstPage = () => {
    setpageNumber(prevCount => prevCount - prevCount + 1 );
  };
  const handleLastPage = () => {
    setpageNumber(prevCount => prevCount - prevCount + lastPageNumber );
  };
  const handleIncrement = () => {
    setpageNumber(prevCount => prevCount + 1);
  };

  //Create handleDecrement event handler
  const handleDecrement = () => {
    setpageNumber(prevCount => prevCount - 1);
  };

  const getData = async() => {
      const res = await axios.get(`https://jsonmock.hackerrank.com/api/movies/search/?page=${pageNumber < 1 ? '1' : pageNumber  }`)
      const data = res.data;
          const movieTitles = data.data.map((movieTitle) => 
          movieTitle.Title)
          const page = <div className="pagenumber">Page Number: {data.page}</div>;
          setLastpageNumber(data.total_pages);
          const Movies = 
          <tbody>
          {data.data.map((movie) => 
          <tr key={movie.imdbID}>
              <td>{movie.Title}</td>
              <td>{movie.Year}</td>
              <td>{movie.imdbID}</td>
          </tr>)}
          </tbody>
          setData2(<Search movieTitles={movieTitles} />)
          setData([ Movies, page ])
    }
      useEffect(() => {
        getData();
      })

   return (
    
    <div className="page-wrapper">
        <>
        {data2}
        <h1>Our Movies</h1>
        <div className="table">
      <table>     
          <thead>
            <tr>
              <th>Title</th>
              <th>Year</th>
              <th>IimdbID</th>
            </tr>
        </thead>
        {data}
      </table>
      </div>
      </>
      <button onClick={handleFirstPage}>First</button>
      <button  onClick={pageNumber > 1 ? handleDecrement: null}>Previous</button>
      <button  onClick={pageNumber < lastPageNumber ? handleIncrement : null}>Next</button>
      <button onClick={handleLastPage}>Last</button>
    </div>
  );
}

export default App;
