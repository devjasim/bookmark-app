import React from 'react';

const BookMarkDetails = ({ data }) => {
  return (
    <div className='bookmark-content card'>
      <ul className='list'>
        <li>Title: {data.title}</li>
        <li>URL: {data.url}</li>
        <li>Category: {data.category}</li>
      </ul>
    </div>
  );
};

export default BookMarkDetails;
