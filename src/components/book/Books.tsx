import "./Books.css";

interface Book {
  id: number;
  image: string;
  class: string;
  status?: string;
}

const Books: React.FC = () => {
  const books: Book[] = [
    { id: 1, image: '/book-covers/sapiens.png', class: 'book1' , status: 'currently-reading'},
    { id: 2, image: '/book-covers/atomic-habits.png', class: 'book2' },
    { id: 3, image: '/book-covers/the-alchemist.png', class: 'book3' },
    { id: 4, image: '/book-covers/48-laws-of-popwer.png', class: 'book4', status: 'currently-reading' },
    { id: 5, image: '/book-covers/the-psychology-of-money.png', class: 'book5' },
    { id: 6, image: '/book-covers/21-lessons-for-21st-century.png', class: 'book6', status: 'will-read' },
    { id: 7, image: '/book-covers/the-courage-to-be-disliked.png', class: 'book7' },
    { id: 8, image: '/book-covers/tentacles.png', class: 'book8' },
    { id: 9, image: '/book-covers/5-am-club.jpg', class: 'book9', status: 'will-read' },
    { id: 10, image: '/book-covers/dseep-work.jpg', class: 'book10' , status: 'will-read'},
    { id: 11, image: '/book-covers/eat-that-frog.jpg', class: 'book11' },
    { id: 12, image: '/book-covers/how-to-win-and-influence-people.jpg', class: 'book12' },
    { id: 13, image: '/book-covers/ikigai.jpg', class: 'book13' },
    { id: 14, image: '/book-covers/power-of-your-subconsious-min.jpg', class: 'book14', status: 'currently-reading' },
    { id: 15, image: '/book-covers/the-almanack-of-naval-ravikant.jpg', class: 'book15', status: 'will-read' },
    { id: 16, image: '/book-covers/the-richest-man-in-babylon.webp', class: 'book16' },
    { id: 17, image: '/book-covers/the-secret.jpg', class: 'book17' },
    { id: 18, image: '/book-covers/thinking-fast-and-slow.jpg', class: 'book18', status: 'will-read' }
  ];

  return (
    <div className="outerDiv">
      {books.map((book) => (
        <div key={book.id} className={`book-item ${book.class}_${book.id}`}>
          {book.status && (
            <div className={`reading-status ${book.status}`}>
              {book.status === 'currently-reading' ? 'Currently Reading' : 'Will Read'}
            </div>
          )}
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