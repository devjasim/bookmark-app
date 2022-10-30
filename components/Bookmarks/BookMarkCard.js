import Link from 'next/link';
import React from 'react';

const BookMarkCard = ({ data, setBookMarkDetails }) => {
  const openLink = (url) => {
    window.open(url, '_blank').focus();
  }

  return (
    <div className='bookmark-list-card'>
      <div onClick={() => openLink(data.url)} className="title">
          {data.title}
      </div>
      <div>
        <button onClick={() => setBookMarkDetails(data)} className='btn'>
          Details
        </button>
      </div>
    </div>
  );
};

export default BookMarkCard;
