import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';

import StarRating from './StarRating';

function Test(){
  const [movieRating, setMovieRating] = useState(0);
  return(
    <div>
      <StarRating maxRating={10} color='blue' onSetRating={setMovieRating}/>
      <p>this movie has {movieRating} Stars</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating />
    <StarRating size='24' color='red' />
    <Test />
  </React.StrictMode>
);
