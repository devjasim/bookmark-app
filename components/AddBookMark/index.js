import React from 'react';

const AddBookMarkComponent = ({ setOpenModal }) => {
  const closeModal = () => {
    setOpenModal(false);
  };

  const [addCategory, setAddCategory] = React.useState(false);
  const [newCategory, setNewCategory] = React.useState('');
  const [existingCategories, setExistingCategories] = React.useState([]);

  const [titleValid, setTitleValid] = React.useState(true);
  const [urlValid, setUrlValid] = React.useState(true);

  const [state, setState] = React.useReducer(
    (value, change) => ({ ...value, ...change }),
    {
      title: '',
      url: '',
      category: '',
    }
  );

  function validateURL(str) {
    var pattern = new RegExp(
      '^(https?:\\/\\/)?' + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + '((\\d{1,3}\\.){3}\\d{1,3}))' + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + '(\\?[;&a-z\\d%_.~+=-]*)?' + '(\\#[-a-z\\d_]*)?$','i'
    );
    return !!pattern.test(str);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.title.length > 30) setTitleValid(false);
    if (!validateURL(state.url)) setUrlValid(false);

    if (titleValid && urlValid && !!state.category) {
      const data = {
        id: '_' + Math.random().toString(36).substr(2, 9),
        ...state,
      };
     
			const categories = JSON.parse(localStorage.getItem("bookmarks"));

			let allData = [{ ...data }];

			if (!!categories) {
				allData = [...categories, data];
			}

			try {
				localStorage.setItem("bookmarks", JSON.stringify(allData));
      	closeModal();
			} catch (error) {
				console.log("ERR")
			}
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ [name]: value });
    if (name === 'title') {
      if (value.length < 30)  {
				setTitleValid(true)
			} else {
				setTitleValid(false);
			}
    }

    if (name === 'url') {
      if (!validateURL(state.url)) {
				setUrlValid(false)
			 } else {
				setUrlValid(true);
			}
    }
  };

  const handleChangeCategory = (e) => {
    const { name, value } = e.target;
    if (name === 'newCategory') {
      setNewCategory(value);
    }
  };

  const handleAddCategory = () => {
		if(!newCategory) return;
    const data = {
      id: '_' + Math.random().toString(36).substr(2, 9),
      ...state,
      name: newCategory,
    };
    let allData = [{ ...data }];

    if (!!existingCategories) {
      allData = [...existingCategories, data];
    }

    try {
      if (allData.length) {
        localStorage.setItem('categories', JSON.stringify(allData));
      }
      setAddCategory(false);
      setNewCategory('');
    } catch (err) {
      console.log('Failed');
    }
  };

  React.useEffect(() => {
    const categories = JSON.parse(localStorage.getItem('categories'));
    setExistingCategories(categories);
  }, [addCategory]);

  return (
    <div className='bookmark-form-component'>
      <h2>Add Bookmarks</h2>
      <form>
        <input
          placeholder='Title'
          value={state.title}
          onChange={handleInputChange}
          name='title'
        />
        {(!state.title || !titleValid) && (
          <span>{!titleValid ? 'Max 30 characters' : 'Required'}</span>
        )}
        <input
          placeholder='URL'
          type='url'
          value={state.url}
          onChange={handleInputChange}
          name='url'
        />
        {(!state.url || !urlValid) && (
          <span>{!urlValid ? 'URL is not valid' : 'Required'}</span>
        )}
        {addCategory ? (
					<div>
						<div className='new-category'>
							<input
								onChange={handleChangeCategory}
								name='newCategory'
								value={newCategory}
								placeholder="New Category Name"
							/>
							<button type='button' onClick={handleAddCategory}>
								Add
							</button>
						</div>
						{!newCategory && (
							<span>Required</span>
						)}
					</div>
        ) : (
          <>
            <div className='category'>
              <select
                placeholder='Category'
                name='category'
                value={state.category}
                onChange={handleInputChange}
              >
								<option value="Default">Select Category</option>
                {existingCategories?.length && (
                existingCategories.map((item) => (
                  <option key={item.id} defaultChecked={null} value={item.name}>
                    {item.name}
                  </option>
                )))}
              </select>
              <div
                onClick={() => setAddCategory(true)}
                className='add-category'
              >
                <small>+</small>
              </div>
            </div>
            {!state.category && <span>Required</span>}
          </>
        )}
        <div>
          <button onClick={closeModal} className='btn' type='button'>
            Cancel
          </button>
          <button className='btn' onClick={handleSubmit}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookMarkComponent;
