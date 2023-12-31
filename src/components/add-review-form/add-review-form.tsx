import React, {FormEvent, useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch} from '../../hooks';
import {postComment} from '../../store/api-actions';
import {AppRoute} from '../../const';

export function AddReviewForm(): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  const [rating, setRating] = useState(-1);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (commentRef.current !== null && rating !== -1) {
      dispatch(postComment({
        filmId: id as string,
        comment: commentRef.current.value,
        rating: rating
      }))
        .unwrap()
        .then(() => navigate(`${AppRoute.Film.replace(':id', id as string)}`));
    }
  };

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleSubmit}>
        <div className="rating">
          <div className="rating__stars">
            {Array.from({ length: 10 }, (_, index) => (
              <React.Fragment key={index}>
                <input
                  className="rating__input"
                  id={`star-${index + 1}`}
                  type="radio"
                  name="rating"
                  value={index + 1}
                  onChange={() => setRating(index + 1)}
                />
                <label className="rating__label" htmlFor={`star-${index + 1}`}>
                  Rating {index + 1}
                </label>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder="Review text"
            ref={commentRef}
          >
          </textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>

        </div>
      </form>
    </div>
  );
}
