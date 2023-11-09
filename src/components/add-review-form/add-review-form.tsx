import React, {useState} from 'react';

export function AddReviewForm(): JSX.Element {
  const [review, setReview] = useState(
    {
      rating: '',
      text: '',
    }
  );

  return (
    <div className="add-review">
      <form action="#" className="add-review__form">
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
                  onChange={(evt) => setReview({
                    ...review,
                    rating: evt.target.value,
                  })}
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
            onChange={(evt) => setReview({
              ...review,
              text: evt.target.value,
            })}
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
