import { useState, useRef, useCallback } from 'react';
import Book3D from './Book3D';

interface BookData {
  id: number;
  title: string;
  author: string;
  coverImage: string;
  spineColor: string;
  textColor: string;
  status?: 'currently-reading' | 'will-read';
  rating: number; // 1-5
  overview: string;
}

const booksData: BookData[] = [
  {
    id: 1,
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    coverImage: '/book-covers/sapiens.png',
    spineColor: '#fefcfb',
    textColor: '#1a1a2e',
    status: 'currently-reading',
    rating: 5,
    overview: 'A brief history of humankind, exploring how Homo sapiens came to dominate the world through cognitive, agricultural, and scientific revolutions.',
  },
  {
    id: 2,
    title: 'Atomic Habits',
    author: 'James Clear',
    coverImage: '/book-covers/atomic-habits.png',
    spineColor: '#fefcfb',
    textColor: '#1a1a1a',
    rating: 5,
    overview: 'Tiny changes, remarkable results. A proven framework for improving every day through the compound effect of small habits.',
  },
  {
    id: 3,
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    coverImage: '/book-covers/the-alchemist.png',
    spineColor: '#f17623',
    textColor: '#ffffff',
    rating: 4,
    overview: 'A magical fable about following your dreams. Santiago, a shepherd boy, journeys to find treasure and discovers the true meaning of life.',
  },
  {
    id: 4,
    title: '48 Laws of Power',
    author: 'Robert Greene',
    coverImage: '/book-covers/48-laws-of-popwer.png',
    spineColor: '#e33d31',
    textColor: '#ffffff',
    status: 'currently-reading',
    rating: 4,
    overview: 'A masterful guide to understanding power dynamics through historical examples and timeless strategies for gaining influence.',
  },
  {
    id: 5,
    title: 'Psychology of Money',
    author: 'Morgan Housel',
    coverImage: '/book-covers/the-psychology-of-money.png',
    spineColor: '#fefcfb',
    textColor: '#1a1a1a',
    rating: 5,
    overview: 'Timeless lessons on wealth, greed, and happiness. How behavior matters more than knowledge in financial success.',
  },
  {
    id: 6,
    title: '21 Lessons',
    author: 'Yuval Noah Harari',
    coverImage: '/book-covers/21-lessons-for-21st-century.png',
    spineColor: '#b8b6c1',
    textColor: '#1a1a1a',
    status: 'will-read',
    rating: 4,
    overview: 'Explores the most pressing issues of our present: technology, truth, justice, and how to navigate an uncertain future.',
  },
  {
    id: 7,
    title: 'Courage to be Disliked',
    author: 'Ichiro Kishimi',
    coverImage: '/book-covers/the-courage-to-be-disliked.png',
    spineColor: '#fefcfb',
    textColor: '#1a1a1a',
    rating: 5,
    overview: 'A liberating dialogue on Adlerian psychology. Learn to free yourself from the expectations of others and live authentically.',
  },
  {
    id: 8,
    title: 'Tentacles',
    author: 'Roland Smith',
    coverImage: '/book-covers/tentacles.png',
    spineColor: '#203e4f',
    textColor: '#38bdf8',
    rating: 3,
    overview: 'An adventure thriller following Marty and his mysterious uncle as they search for a giant squid in the deep ocean.',
  },
  {
    id: 9,
    title: '5 AM Club',
    author: 'Robin Sharma',
    coverImage: '/book-covers/5-am-club.jpg',
    spineColor: '#ffffff',
    textColor: '#1a1a1a',
    status: 'will-read',
    rating: 4,
    overview: 'Own your morning, elevate your life. A revolutionary morning routine to maximize productivity and activate your best self.',
  },
  {
    id: 10,
    title: 'Deep Work',
    author: 'Cal Newport',
    coverImage: '/book-covers/dseep-work.jpg',
    spineColor: '#ffffff',
    textColor: '#1a1a1a',
    status: 'will-read',
    rating: 5,
    overview: 'Rules for focused success in a distracted world. Learn to cultivate intense concentration for meaningful work.',
  },
  {
    id: 11,
    title: 'Eat That Frog',
    author: 'Brian Tracy',
    coverImage: '/book-covers/eat-that-frog.jpg',
    spineColor: '#7bbe47',
    textColor: '#ffffff',
    rating: 4,
    overview: '21 ways to stop procrastinating and get more done. Tackle your most challenging task first thing each day.',
  },
  {
    id: 12,
    title: 'Win Friends',
    author: 'Dale Carnegie',
    coverImage: '/book-covers/how-to-win-and-influence-people.jpg',
    spineColor: '#bd0621',
    textColor: '#fef3c7',
    rating: 5,
    overview: 'The timeless classic on human relations. Fundamental techniques for handling people and winning them to your way of thinking.',
  },
  {
    id: 13,
    title: 'Ikigai',
    author: 'Héctor García',
    coverImage: '/book-covers/ikigai.jpg',
    spineColor: '#d8e5f1',
    textColor: '#c44536',
    rating: 4,
    overview: 'The Japanese secret to a long and happy life. Discover your purpose and find joy in everyday moments.',
  },
  {
    id: 14,
    title: 'Subconscious Mind',
    author: 'Joseph Murphy',
    coverImage: '/book-covers/power-of-your-subconsious-min.jpg',
    spineColor: '#fdfdfd',
    textColor: '#1a1a1a',
    status: 'currently-reading',
    rating: 4,
    overview: 'Unlock the extraordinary power within you. Techniques to harness your subconscious for health, wealth, and success.',
  },
  {
    id: 15,
    title: 'Naval Ravikant',
    author: 'Eric Jorgenson',
    coverImage: '/book-covers/the-almanack-of-naval-ravikant.jpg',
    spineColor: '#ffffff',
    textColor: '#0ea5e9',
    status: 'will-read',
    rating: 5,
    overview: 'A guide to wealth and happiness. Wisdom from the angel investor and philosopher on building a meaningful life.',
  },
  {
    id: 16,
    title: 'Richest Man in Babylon',
    author: 'George S. Clason',
    coverImage: '/book-covers/the-richest-man-in-babylon.webp',
    spineColor: '#f4ab40',
    textColor: '#1a1a1a',
    rating: 5,
    overview: 'Timeless financial wisdom through parables of ancient Babylon. The classic guide to acquiring wealth and keeping it.',
  },
  {
    id: 17,
    title: 'The Secret',
    author: 'Rhonda Byrne',
    coverImage: '/book-covers/the-secret.jpg',
    spineColor: '#d08643',
    textColor: '#ffffff',
    rating: 3,
    overview: 'The law of attraction revealed. Learn how your thoughts can shape your reality and manifest your desires.',
  },
  {
    id: 18,
    title: 'Thinking Fast & Slow',
    author: 'Daniel Kahneman',
    coverImage: '/book-covers/thinking-fast-and-slow.jpg',
    spineColor: '#fdfdfd',
    textColor: '#f97316',
    status: 'will-read',
    rating: 5,
    overview: 'A groundbreaking exploration of the two systems that drive how we think—intuitive and deliberate—and their impact on decisions.',
  },
];

const BOOKS_PER_ROW_DESKTOP = 9;
const BOOKS_PER_ROW_TABLET = 6;
const BOOKS_PER_ROW_MOBILE = 3;

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3 h-3 ${star <= rating ? 'text-yellow-400' : 'text-gray-600'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const BookShelf = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleHover = useCallback((index: number, hovered: boolean) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }

    if (hovered) {
      setHoveredIndex(index);
    } else {
      leaveTimeoutRef.current = setTimeout(() => {
        setHoveredIndex((current) => (current === index ? null : current));
      }, 30);
    }
  }, []);

  const getMarginLeft = (indexInRow: number, globalIndex: number) => {
    if (indexInRow === 0) return 0;

    const baseMargin = -100;

    if (hoveredIndex !== null && globalIndex === hoveredIndex + 1) {
      return baseMargin + 130;
    }

    return baseMargin;
  };

  const createRows = (booksPerRow: number) => {
    const rows: BookData[][] = [];
    for (let i = 0; i < booksData.length; i += booksPerRow) {
      rows.push(booksData.slice(i, i + booksPerRow));
    }
    return rows;
  };

  const renderBookRow = (
    books: BookData[],
    rowIndex: number,
    booksPerRow: number,
    isLastRow: boolean
  ) => {
    return (
      <div key={rowIndex} className="flex flex-row items-center justify-center">
        {books.map((book, indexInRow) => {
          const globalIndex = rowIndex * booksPerRow + indexInRow;
          const isHovered = hoveredIndex === globalIndex;
          const isAnyHovered = hoveredIndex !== null;
          const isBlurred = isAnyHovered && !isHovered;

          return (
            <div
              key={book.id}
              className="relative transition-all duration-300"
              style={{
                marginLeft: getMarginLeft(indexInRow, globalIndex),
                zIndex: isHovered ? 100 : books.length - indexInRow,
                transition: 'margin-left 500ms ease, z-index 0ms, filter 300ms ease',
                filter: isBlurred ? 'blur(2px) brightness(0.7)' : 'none',
              }}
            >
              {/* Book info tooltip - position changes based on row */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 w-56 p-3 rounded-lg bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 shadow-xl transition-all duration-300 ${
                  isHovered ? 'opacity-100 visible' : 'opacity-0 invisible'
                } ${isLastRow ? 'bottom-full mb-2' : 'top-full mt-2'}`}
                style={{ zIndex: 200 }}
              >
                {/* Arrow - points down for top tooltip, up for bottom tooltip */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-transparent ${
                    isLastRow
                      ? 'top-full border-t-8 border-t-gray-900/95'
                      : '-top-2 border-b-8 border-b-gray-900/95'
                  }`}
                />

                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="text-white font-semibold text-sm line-clamp-1 flex-1">
                    {book.title}
                  </h4>
                  {book.status && (
                    <span
                      className={`shrink-0 px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wide ${
                        book.status === 'currently-reading'
                          ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                          : 'bg-gradient-to-r from-indigo-600 to-purple-500 text-white'
                      }`}
                    >
                      {book.status === 'currently-reading' ? 'Reading' : 'Will Read'}
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-xs mb-2">{book.author}</p>
                <StarRating rating={book.rating} />
                <p className="text-gray-300 text-xs mt-2 line-clamp-3 leading-relaxed">
                  {book.overview}
                </p>
              </div>

              <Book3D
                coverImage={book.coverImage}
                title={book.title}
                spineColor={book.spineColor}
                textColor={book.textColor}
                isHovered={isHovered}
                onHover={(hovered) => handleHover(globalIndex, hovered)}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-12 py-8 pl-20 w-full overflow-hidden">
      {/* Desktop: 6 books per row */}
      <div className="hidden xl:flex flex-col gap-12">
        {createRows(BOOKS_PER_ROW_DESKTOP).map((row, i, arr) =>
          renderBookRow(row, i, BOOKS_PER_ROW_DESKTOP, i === arr.length - 1)
        )}
      </div>

      {/* Tablet: 4 books per row */}
      <div className="hidden md:flex xl:hidden flex-col gap-12">
        {createRows(BOOKS_PER_ROW_TABLET).map((row, i, arr) =>
          renderBookRow(row, i, BOOKS_PER_ROW_TABLET, i === arr.length - 1)
        )}
      </div>

      {/* Mobile: 3 books per row */}
      <div className="flex md:hidden flex-col gap-10 pl-30">
        {createRows(BOOKS_PER_ROW_MOBILE).map((row, i, arr) =>
          renderBookRow(row, i, BOOKS_PER_ROW_MOBILE, i === arr.length - 1)
        )}
      </div>
    </div>
  );
};

export default BookShelf;
