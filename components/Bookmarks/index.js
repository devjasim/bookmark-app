import Link from 'next/link';
import React from 'react';
import AddBookMarkComponent from '../AddBookMark';
import BookMarkCard from './BookMarkCard';
import BookMarkDetails from './BookMarkDetails';

const BookMarkComponent = () => {
  const [modal, setModal] = React.useState(false);
  const [bookmarks, setBookmarks] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [bookMarkDetails, setBookmarksDetails] = React.useState(null);

  React.useEffect(() => {
    const allBookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    const allCategories = JSON.parse(localStorage.getItem('categories'));

    if(!!allBookmarks) {
      setBookmarks(allBookmarks);
    }

    if(!!allCategories) {
      setCategories(allCategories);
    }

  }, [!modal]);

  return (
    <div className='bookmark-component'>
      <div className='header'>
        <h2 className='title'>Bookmark Manager</h2>
        <div>
          <button className='add-button btn' onClick={() => setModal(true)}>
            Add Bookmark
          </button>
        </div>
      </div>
      <div className='content'>
        <div className="category">
          {(categories || []).map((item) => (
            <div key={item?.id} className="single">
              <div className="category-name">{item.name}</div>
              <div className='card'>
                {(bookmarks || []).filter((single) => single.category === item.name).map((bookmark) => (
                  <BookMarkCard
                    key={bookmark.title}
                    setBookMarkDetails={(value) => setBookmarksDetails(value)}
                    data={bookmark}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className='details'>
          {!!bookMarkDetails && <BookMarkDetails data={bookMarkDetails} />}
        </div>
      </div>
      {modal && (
        <div className='form-modal'>
          <AddBookMarkComponent
            setOpenModal={(value) => setModal(value)}
          />
        </div>
      )}
    </div>
  );
};

export default BookMarkComponent;
