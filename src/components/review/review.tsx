type ReviewProps = {
  text: string;
  author: string;
  date: string;
  rating: number;
}

export default function Review(props: ReviewProps): JSX.Element {
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{props.text}</p>

        <footer className="review__details">
          <cite className="review__author">{props.author}</cite>
          <time className="review__date" dateTime="2016-12-20">{props.date}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{props.rating}</div>
    </div>
  );
}
