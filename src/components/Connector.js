// src/components/Connector.js
import React from 'react';
import { ArcherContainer, ArcherElement } from 'react-archer';

function Connector({ fromId, toId }) {
    return (
        <ArcherContainer strokeColor="black">
            <ArcherElement id={fromId}>
                <div />
            </ArcherElement>
            <ArcherElement id={toId}>
                <div />
            </ArcherElement>
        </ArcherContainer>
    );
}

export default Connector;
