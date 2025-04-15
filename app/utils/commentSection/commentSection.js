'use client';

import { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import '../commentSection/commentSection.css';

export default function CommentSection() {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [userName, setUserName] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'comments'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedComments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(updatedComments);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const displayName = userName.trim() ? userName : 'Anonymous';

    const commentData = {
      name: displayName,
      comment,
      rating,
      timestamp: new Date(),
    };

    await addDoc(collection(db, 'comments'), commentData);

    setComment('');
    setUserName('');
    setRating(0);
  };

  const averageRating = (
    comments.reduce((sum, c) => sum + c.rating, 0) / (comments.length || 1)
  ).toFixed(1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );
  
    const formEl = document.querySelector('.form-zoom');
    if (formEl) observer.observe(formEl);
  
    return () => {
      if (formEl) observer.unobserve(formEl);
    };
  }, []);
  
  
  return (
    <div className="comment-section-container  p-4 rounded-4 mt-4 animate-on-scroll">
      <h6 className="mb-4 animate-on-scroll comment-name  rating-sub-title" style={{ textAlign: 'left' }}>
        Rating {averageRating} ⭐ ({comments.length} voters)
      </h6>
      <div className="comment-list mb-4 comment-form rating-subtitle" style={{ maxHeight: '350px', overflowY: 'auto' }}>
        {comments.map((c) => (
         <div
            key={c.id}
            className={`chat-message ${c.role === 'admin' ? 'chat-message-right' : 'chat-message-left'} mb-3`}
          >
            <div className="comment-bubble p-3 animate-on-scroll">
              <div className="d-flex justify-content-between mb-1">
              <strong className="comment-name rating-title">{c.name}</strong>
                <span className='rating-title'>{c.rating}⭐</span>
              </div>
              <p className="comment-text">{c.comment}</p>
              <small className="text-muted d-block text-end rating-subtitle">
                {c.timestamp?.toDate().toLocaleString()}
              </small>
            </div>
          </div>
        ))}
      </div>

      {/* Form Input untuk Komentar */}
      <form onSubmit={handleSubmit} className="form-zoom animate-on-scroll contract-form">
        <div className="mb-3 rating-subtitle contract-form">
          <textarea
            className="form-control"
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tulis komentar..."
          />
        </div>

        <div className="mb-3 rating-subtitle">
          <input
            type="text"
            className="form-control"
            placeholder="Nama (Optional)"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="mb-3 text-center rating-subtitle">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className="star"
              style={{
                cursor: 'pointer',
                fontSize: '2rem',
                color: star <= rating ? '#ffc107' : '#e4e5e9',
                transition: 'color 0.2s',
              }}
            >
              ★
            </span>
          ))}
        </div>

        <button type="submit" className="btn btn-candy rating-subtitle">Send</button>
      </form>

    </div>
  );
}
