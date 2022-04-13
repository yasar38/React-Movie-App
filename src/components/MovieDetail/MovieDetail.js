import React, { useEffect } from "react";
import "./MovieDetail.scss";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncMovieOrShowDetail,
  getSelectedMovieOrShow,
  removeSelectedMovieOrShow,
} from "../../features/movies/movieSlice";

const MovieDetail = () => {
  const { imdbID } = useParams();
  const dispatch = useDispatch();
  const data = useSelector(getSelectedMovieOrShow);
  console.log(data);
  useEffect(() => {
    dispatch(fetchAsyncMovieOrShowDetail(imdbID));
    return () => {
      dispatch(removeSelectedMovieOrShow());
    };
  }, [dispatch, imdbID]);
  return (
    <div className="movie-section">
      {Object.keys(data).length === 0 ? (
        <div>...Yükleniyor</div>
      ) : (
        <>
          <div className="section-left">
            <div className="movie-title">{data.Title}</div>
            <div className="movie-rating">
              <span>
                IMDB Puanı <i className="fa fa-star"></i> : {data.imdbRating}
              </span>
              <span>
                IMDB Oyları <i className="fa fa-thumbs-up"></i> :{" "}
                {data.imdbVotes}
              </span>
              <span>
                Süresi <i className="fa fa-film"></i> : {data.Runtime}
              </span>
              <span>
                Yıl <i className="fa fa-calendar"></i> : {data.Year}
              </span>
            </div>
            <div className="movie-plot">{data.Plot}</div>
            <div className="movie-info">
              <div>
                <span>Yönetmen</span>
                <span>{data.Director}</span>
              </div>
              <div>
                <span>Aktörler</span>
                <span>{data.Actors}</span>
              </div>
              <div>
                <span>Kategori</span>
                <span>{data.Genre}</span>
              </div>
              <div>
                <span>Dil</span>
                <span>{data.Language}</span>
              </div>
              <div>
                <span>Ödüller</span>
                <span>{data.Awards}</span>
              </div>
            </div>
          </div>
          <div className="section-right">
            <img src={data.Poster} alt={data.Title} />
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
