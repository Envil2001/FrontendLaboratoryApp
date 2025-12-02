'use client';
import WordSearch from '@/app/components/WordSearch';

export default function GamePage() {
  const sampleWords = [
    'REACT', 'NEXT', 'HTML', 'CSS', 'JS',
    'TAILWIND', 'FIREBASE', 'GITHUB', 'CODE', 'APP'
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Game: Word Search</h1>
      <p className="text-gray-600 mb-8">
        Find all the words hidden in the letter grid.
      </p>

      <div className="bg-white p-6 rounded-xl shadow-lg border">
        <WordSearch 
          gridSize={12}
          words={sampleWords}
        />
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-bold mb-2">How to play:</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Click the first letter of the word.</li>
          <li>Continue clicking neighbouring letters in a straight line.</li>
          <li>Words can be horizontal, vertical, or diagonal.</li>
          <li>If your selection matches a word, it will stay highlighted.</li>
          <li>Find all words to finish the game.</li>
        </ul>
      </div>
    </div>
  );
}
