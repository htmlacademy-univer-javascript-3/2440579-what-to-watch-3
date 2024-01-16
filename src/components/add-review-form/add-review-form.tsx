import React, {FormEvent, useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch} from '../../hooks';
import {postComment} from '../../store/api-actions';
import {AppRoute} from '../../const';
import {validateRating, validateTextLength} from '../../utils/validators';

export function AddReviewForm(): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    setIsSubmitting(true);

    if (commentRef.current !== null) {
      const textIsValid = validateTextLength(commentRef.current.value, 50, 400);
      const ratingIsValid = validateRating(rating);
      if (!textIsValid || !ratingIsValid) {
        setIsSubmitting(false);
        return;
      }
      dispatch(postComment({
        filmId: id as string,
        comment: commentRef.current.value,
        rating: rating
      }))
        .unwrap()
        .then(() => navigate(`${AppRoute.Film.replace(':id', id as string)}`))
        .finally(() => setIsSubmitting(false));
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
                  disabled={isSubmitting}
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
            disabled={isSubmitting}
          >
          </textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit" disabled={isSubmitting}>Post</button>
          </div>

        </div>
      </form>
    </div>
  );
}
