import {useParams} from 'react-router-dom';
import {useAppDispatch} from '../../hooks';
import {useEffect, useState} from 'react';
import {Review} from '../../types/review';
import {fetchComments} from '../../store/api-actions';
import getRussianFormatDate from '../../utils/date-util';

function splitArray<T>(array: Array<T>) : [Array<T>, Array<T>] {
  const midpoint = Math.ceil(array.length / 2);
  const firstPart = array.slice(0, midpoint);
  const secondPart = array.slice(midpoint);

  return [firstPart, secondPart];
}

export function ReviewTab(): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (id) {
      dispatch(fetchComments(id))
        .unwrap()
        .then((data) => setReviews(data))
        .catch((err) => <div>Something went wrong: {err}</div>);
    }
  }, [dispatch, id]);

  const [firstColReviews, secondColReviews] = splitArray<Review>(reviews);

  const renderColumn = (colReviews: Review[]) => (
    <div className="film-card__reviews-col">
      {colReviews.map((review) => (
        <div key={review.id} className="review">
          <blockquote className="review__quote">
            <p className="review__text">{review.comment}</p>
            <footer className="review__details">
              <cite className="review__author">{review.user}</cite>
              <time className="review__date" dateTime={review.date}>{getRussianFormatDate(review.date)}</time>
            </footer>
          </blockquote>
          <div className="review__rating">{review.rating}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="film-card__reviews film-card__row">
      {renderColumn(firstColReviews)}
      {renderColumn(secondColReviews)}
    </div>
  );
}
