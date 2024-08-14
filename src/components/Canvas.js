// src/components/Canvas.js
import React from 'react';
import { useDrop } from 'react-dnd';

function Canvas({ children }) {
    const [, drop] = useDrop(() => ({ accept: 'CARD' }));

    return (
        <div ref={drop} className="canvas">
            {children}
        </div>
    );
}

export default Canvas;
