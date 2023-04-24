import { useState } from 'react';
import { useContext } from 'react';

import RatingSelect from './RatingSelect';

import Card from './shared/Card';
import Button from './shared/Button';

import FeedbackContext from '../context/FeedbackContext';

function FeedbackForm() {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(10);
  const [btnDiasbled, setBtnDiasbled] = useState(true);
  const [message, setMessage] = useState('');

  const { addFeedback } = useContext(FeedbackContext);

  const handleTextChange = (e) => {
    if (text === '') {
      setBtnDiasbled(true);
      setMessage('');
    } else if (text !== '' && text.trim().length <= 10) {
      setBtnDiasbled(true);
      setMessage('Text must be at least 10 characters');
    } else {
      setBtnDiasbled(false);
      setMessage('');
    }

    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim().length > 10) {
      const newFeedback = {
        text,
        rating,
      };

      addFeedback(newFeedback);

      setText('');
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>

        <RatingSelect select={(rating) => setRating(rating)} />

        <div className='input-group'>
          <input
            onChange={handleTextChange}
            type='text'
            placeholder='Write a review'
            value={text}
          />
          <Button type='submit' isDisabled={btnDiasbled}>
            Send
          </Button>
        </div>

        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  );
}
export default FeedbackForm;
