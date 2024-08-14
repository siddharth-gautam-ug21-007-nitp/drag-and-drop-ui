import React, { useState } from 'react';
import { ResizableBox } from 'react-resizable';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [draggingCard, setDraggingCard] = useState(null);
  const [dropPosition, setDropPosition] = useState(null);

  const handleAddCard = () => {
    const newCard = {
      id: Math.random().toString(36).substr(2, 9),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      x: 0,
      y: 0,
      width: 200,
      height: 100,
    };
    setCards([...cards, newCard]);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleShowMoreClick = (card) => {
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const handleDragStart = (card, event) => {
    setDraggingCard(card);
    event.dataTransfer.setData('cardId', card.id);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    const rect = event.target.getBoundingClientRect();
    setDropPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const cardId = event.dataTransfer.getData('cardId');
    const card = cards.find((c) => c.id === cardId);
    if (card) {
      setCards(
        cards.map((c) => {
          if (c.id === cardId) {
            return { ...c, x: dropPosition.x, y: dropPosition.y };
          }
          return c;
        })
      );
    }
    setDraggingCard(null);
    setDropPosition(null);
  };

  const handleResize = (card, size) => {
    setCards(
      cards.map((c) => {
        if (c.id === card.id) {
          return { ...c, width: size.width, height: size.height };
        }
        return c;
      })
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Card App</h1>
      </header>
      <main className="main">
        <div className="controls">
          <button onClick={handleAddCard}>Add Card</button>
        </div>
        <div
          className="canvas"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {cards.map((card) => (
            <ResizableBox
              key={card.id}
              className="card"
              style={{
                position: 'absolute',
                left: card.x,
                top: card.y,
              }}
              size={{ width: card.width, height: card.height }}
              onResize={(event, { size }) => handleResize(card, size)}
              onClick={() => handleCardClick(card)}
              draggable="true"
              onDragStart={(event) => handleDragStart(card, event)}
            >
              <p>{card.text.substring(0, 50)}...</p>
              <button onClick={() => handleShowMoreClick(card)}>Show more</button>
            </ResizableBox>
          ))}
        </div>
      </main>
      {popupOpen && (
        <div className="popup">
          <h2>{selectedCard.text}</h2>
          <button onClick={handlePopupClose}>Close</button>
        </div>
      )}
      <footer className="App-footer">
        <p>&copy; 2023 Card App</p>
      </footer>
    </div>
  );
}

export default App;