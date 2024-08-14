// src/components/Card.js
import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { ResizableBox } from 'react-resizable';

function Card({ id, text, onShowMore }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'CARD',
        item: { id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <ResizableBox width={200} height={100}>
            <div ref={drag} className="card" style={{ opacity: isDragging ? 0.5 : 1 }}>
                <p>{isExpanded ? text : `${text.slice(0, 50)}...`}</p>
                <button onClick={() => onShowMore(text)}>Show more</button>
            </div>
        </ResizableBox>
    );
}

export default Card;
