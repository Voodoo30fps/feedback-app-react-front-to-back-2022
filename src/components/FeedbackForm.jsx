import { useState } from 'react';

import Card from './shared/Card';
import Button from './shared/Button';

function FeedbackForm() {
  const [text, setText] = useState('');
  const [btnDiasbled, setBtnDiasbled] = useState(true);
  const [message, setMessage] = useState('');

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

  return (
    <Card>
      <form>
        <h2>How would you rate your service with us?</h2>

        {/* @todo - rating select component */}

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
