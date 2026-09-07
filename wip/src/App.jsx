import { useState } from 'react'
import ViewSwitch from './components/ViewSwitch/ViewSwitch.jsx'
import StatsScreen from './components/StatsScreen/StatsScreen.jsx'
// import './App.css'

function App() {
  const [currentScreen, setCurrentScreen] = useState('shelf');
  const [books, setBooks] = useState([
    { id: 1, title: 'Война и мир', author: 'Лев Толстой', isRead: false },
    { id: 2, title: 'Преступление и наказание', author: 'Фёдор Достоевский', isRead: true },
    { id: 3, title: 'Мастер и Маргарита', author: 'Михаил Булгаков', isRead: false },
  ])
  const [showOnlyUnread, setShowOnlyUnread] = useState(false)
  const [pagesToday, setPagesToday] = useState(0);

  const handleAddBook = (title) => {
    const newBook = {
      id: Date.now(),
      title: title.trim(),
      author: 'Неизвестный автор',
      isRead: false,
    }
    setBooks(prev => [...prev, newBook])
  }

  const handleToggleRead = (id) => {
    setBooks(prev =>
      prev.map(book =>
        book.id === id ? { ...book, isRead: !book.isRead } : book
      )
    )
  }

  const handleDeleteBook = (id) => {
    setBooks(prev => prev.filter(book => book.id !== id))
  }

  const handleToggleFilter = () => {
    setShowOnlyUnread(prev => !prev);
  }

  return (
    <div className="app">
      <h1 className="appTitle">📚 Моя полка</h1>
      <ViewSwitch 
        currentScreen={currentScreen} 
        onChange={setCurrentScreen} 
      />
      
      {currentScreen === 'shelf' && (
        <ShelfScreen
          books={books}
          onAddBook={handleAddBook}
          onToggleRead={handleToggleRead}
          onDeleteBook={handleDeleteBook}
          showOnlyUnread={showOnlyUnread}
          onToggleFilter={handleToggleFilter}
        />
      )}
      
      {currentScreen === 'stats' && (
        <StatsScreen 
          books={books}
          pagesToday={pagesToday}
          setPagesToday={setPagesToday}
        />
      )}
    </div>
  )
}

export default App;
