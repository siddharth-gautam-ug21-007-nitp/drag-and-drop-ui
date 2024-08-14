import React, { useState } from 'react';
import Canvas from './components/Canvas';
import Card from './components/Card';
import Modal from './components/Modal';
import './App.css';

function App() {
    const [cards, setCards] = useState([]);
    const [modalText, setModalText] = useState('');

    const addCard = () => {
        const newCard = {
            id: `card-${cards.length + 1}`,
            text: 'This is some dummy text for the card...',
        };
        setCards([...cards, newCard]);
    };

    const handleShowMore = (text) => {
        setModalText(text);
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Card Canvas Application</h1>
                <p>Create, drag, and connect cards with ease!</p>
            </header>

            <main>
                <div className="controls">
                    <button onClick={addCard}>Add New Card</button>
                </div>
                <Canvas>
                    {cards.map((card) => (
                        <Card key={card.id} id={card.id} text={card.text} onShowMore={handleShowMore} />
                    ))}
                </Canvas>
                {modalText && <Modal text={modalText} onClose={() => setModalText('')} />}
            </main>

            <footer className="App-footer">
                <p>© 2024 Card Canvas App. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default App;
