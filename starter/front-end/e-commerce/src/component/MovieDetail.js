import { useParams, Link } from 'react-router-dom';
import Title from './Title';
import axios from 'axios';
import { useState, useEffect } from 'react';
import QuantityBtn from './QuantityBtn';
import styles from '../style/movieDetail.module.css';
import Nav from './nav';
import { textAlign } from '@mui/system';
import Footer from './footer';

export default function MovieDetail() {
  const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
  let params = useParams();
  console.log('params=' + params.id);
  let [movieDetail, setMovieDetail] = useState(null);

  const handleClick = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/movies');

      console.log(response);

      const dataArray = response.data.movies;
      console.log(dataArray);

      // 因爲element._id本身也是一個字符串，所以不需要把params.id轉換爲數字類型(parseInt)
      let productInfo = dataArray.find(element => {
        return element._id == params.id;
      });
      console.log(productInfo);
      setMovieDetail(productInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleClick();
  }, []);

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

  return (
    <div>
      <Nav />
      {movieDetail && (
        <div>
          <Title mainTitle={movieDetail.title} />
          <div className={styles.movieMainContent}>
            <img
              className={styles.moviePic}
              src={IMGPATH + movieDetail.poster_path}
              alt={movieDetail.title}
              height='300px'
            />

            <div className={styles.movieInfo}>
              <p>{movieDetail.overview} </p>
              <p className={styles.votes}>{movieDetail.vote_average} </p>
              <p>${movieDetail.price} </p>
              <p>{handleDate(movieDetail.release_date)}</p>
              {movieDetail.adult ? (
                <div className={styles.adultOrChild}> Adult</div>
              ) : (
                <div className={styles.adultOrChild}>Child</div>
              )}

              <QuantityBtn
                className={styles.quantityBtn}
                productInfo={movieDetail}
              />
            </div>
          </div>
          <div className={styles.centerLink}>
            <Link className={styles.homePage} to='/'>
              Back to HomePage
            </Link>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
