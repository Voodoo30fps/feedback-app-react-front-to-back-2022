import { v4 as uuidv4 } from 'uuid';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { useState } from 'react';
import { Fragment } from 'react';

import Header from './components/Header';

import FeedbackList from './components/FeedbackList';
import FeedbackStats from './components/FeedbackStats';
import FeedbackForm from './components/FeedbackForm';

import FeedbackData from './data/FeedbackData';

import AboutIconLink from './components/AboutIconLink';

import AboutPage from './components/pages/AboutPage';

import { FeedbackProvider } from './context/FeedbackContext';

function App() {
  const [feedback, setFeedback] = useState(FeedbackData);

  const deleteFeedback = (id) => {
    if (window.confirm('Are you seure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id != id));
    }
  };

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    console.log(newFeedback);

    setFeedback([newFeedback, ...feedback]);
  };

  return (
    <FeedbackProvider>
      <Router>
        <Header />

        <div className='container'>
          <Routes>
            <Route
              exact
              path='/'
              element={
                <Fragment>
                  <FeedbackForm handleAdd={addFeedback} />
                  <FeedbackStats />
                  <FeedbackList handleDelete={deleteFeedback} />
                </Fragment>
              }
            />

            <Route path='/about' element={<AboutPage />} />
          </Routes>

          <AboutIconLink />
        </div>
      </Router>
    </FeedbackProvider>
  );
}

export default App;
