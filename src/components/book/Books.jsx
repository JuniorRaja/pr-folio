import "./Books.css";

const Books = () => {
  const books = [
    { id: 1, image: '/book-covers/sapiens.png', class: 'book1' },
    { id: 2, image: '/book-covers/atomic-habits.png', class: 'book2' },
    { id: 3, image: '/book-covers/the-alchemist.png', class: 'book3' },
    { id: 4, image: '/book-covers/48-laws-of-popwer.png', class: 'book4' },
    { id: 5, image: '/book-covers/the-psychology-of-money.png', class: 'book5' },
    { id: 6, image: '/book-covers/21-lessons-for-21st-century.png', class: 'book6' },
    { id: 7, image: '/book-covers/the-courage-to-be-disliked.png', class: 'book7' },
    { id: 8, image: '/book-covers/tentacles.png', class: 'book8' }
  ];

  return (
    <div className="outerDiv">
      {books.map((book) => (
        <div key={book.id} className={`book-item ${book.class}_${book.id}`}>
          <a className="bookPerspective">
            <div className={`bookRotateWrapper ${book.class}`}>
              <div className="bookGuideSplit">
                <div className="bookBind"></div>
                <div className="bookFace" style={{backgroundImage: `url(${book.image})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                </div>
              </div>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default Books;
