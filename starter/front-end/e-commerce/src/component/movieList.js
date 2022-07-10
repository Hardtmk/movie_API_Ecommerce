import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import QuantityBtn from './QuantityBtn';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Nav from './nav';
import styles from '../style/movieList.module.css';
import filterbtn from '../img/filterIcon.jpg';
import Footer from './footer';

const ProductList = () => {
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState({
    score: '',
    price: '',
    sort: '',
    release_date: '',
    adult: '',
    empty: '',
    name: '',
  });
  const [title, setTitle] = useState({ name: '' });
  const [tryBtn, setTryBtn] = useState(false);

  const navigate = useNavigate();

  const handleClick = async e => {
    e.preventDefault();

    try {
      console.log(filter.score);

      const response = await axios.get(
        `http://localhost:8000/api/v1/movies?${filter.adult}&${filter.price}&${filter.name}&${filter.score}&${filter.release_date}&${filter.empty}&${filter.sort}&title=${title.name}`
      );
      const success = response.status === 200;

      const dataArray = response.data.movies;
      setMovies(dataArray);
    } catch (error) {
      console.log(error);
    }
  };
  const secondFetch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/movies?title=${title.name}`
      );

      console.log('title的response=' + response.data.movies);
      const dataArray = response.data.movies;
      setMovies(dataArray);

      console.log(movies);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    secondFetch();
  }, [title]);
  useEffect(() => {
    handleClick();
  }, [filter]);

  const IMGPATH = 'https://image.tmdb.org/t/p/w1280';

  const handlePage = () => {
    navigate('./filter');
  };

  const handleFilter = () => {
    tryBtn == false ? setTryBtn(true) : setTryBtn(false);
  };

  const handleDate = formatDate => {
    let date = new Date(formatDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();
    let time = date.getTime();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }

    return year + '-' + month + '-' + dt;
  };

  console.log(movies.length);

  return (
    <>
      <Nav />

      <form className={styles.movieForm} onSubmit={handleClick}>
        <div className={styles.searchAndimg}>
          <TextField
            className={styles.search}
            id='outlined-basic'
            variant='outlined'
            label='Search Movie...'
            fullWidth
            type='title'
            name='name'
            value={title.name}
            onChange={e => setTitle({ name: e.target.value })}
          />
          <img
            onClick={handleFilter}
            className={styles.filterIcon}
            src={filterbtn}
            width='50px'
            height='50px'
            alt='filterIcon'
          />
        </div>
      </form>

      <div className={styles.movieList}>
        {movies?.map(movie => (
          <div className={styles.movieContent} key={movie._id}>
            <Link to={'/movie_detail/' + movie._id}>
              <img
                src={IMGPATH + movie.poster_path}
                width='200px'
                height='200px'
              />
            </Link>
            <h5>{movie.title}</h5>
            <div className={styles.priceVote}>
              <p className={styles.vote}>{movie.vote_average}</p>
              <p className={styles.price}>${movie.price}</p>
            </div>
            <p className={styles.date}>{handleDate(movie.release_date)}</p>
            <QuantityBtn productInfo={movie} />
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
};

export default ProductList;
