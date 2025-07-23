import React from 'react';
import './styles/ReviewsSection.css';

const reviews = [
  { id: 1, author: 'Іван П.', text: 'Дуже професійний персонал і швидке обслуговування!' },
  { id: 2, author: 'Олена К.', text: 'Прекрасна клініка! Завжди звертаюся саме сюди.' },
  { id: 3, author: 'Марія С.', text: 'Дякую лікарям за турботу та підтримку.' },
];

const ReviewsSection = () => {
  return (
    <section className="reviews-section bg-white py-5">
      <div className="container">
        <h2 className="text-center mb-4">Відгуки наших пацієнтів</h2>
        <div className="row g-4">
          {reviews.map((review) => (
            <div className="col-12 col-md-4" key={review.id}>
              <div className="review-card p-4 shadow-sm h-100 bg-light rounded">
                <p className="fst-italic">"{review.text}"</p>
                <p className="fw-bold text-end mb-0">— {review.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
