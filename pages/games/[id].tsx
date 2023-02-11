import React from 'react';

interface GameProps {
  name: string;
}

const Game = (props: GameProps) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  );
}