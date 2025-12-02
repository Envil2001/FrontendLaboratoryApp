'use client';

import { useState, useEffect } from 'react';

function buildAlphabetFromWords(words) {
  const base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const chars = new Set(base.split(''));
  words.forEach((w) => {
    const upper = w.toUpperCase();
    for (const ch of upper) {
      if (ch.trim() === '') continue;
      chars.add(ch);
    }
  });
  return Array.from(chars).join('');
}

function createBoard(gridSize, words) {
  if (!Array.isArray(words)) words = [];
  const upperWords = words.map((w) => w.toUpperCase());
  const letters = buildAlphabetFromWords(upperWords);
  const board = Array.from({ length: gridSize }, () =>
    Array.from({ length: gridSize }, () => null),
  );

  upperWords.forEach((word) => {
    const len = word.length;
    if (len === 0 || len > gridSize) return;

    let placed = false;
    let attempts = 0;

    while (!placed && attempts < 100) {
      const direction = Math.floor(Math.random() * 3);
      let row;
      let col;

      if (direction === 0) {
        row = Math.floor(Math.random() * gridSize);
        col = Math.floor(Math.random() * (gridSize - len + 1));
      } else if (direction === 1) {
        row = Math.floor(Math.random() * (gridSize - len + 1));
        col = Math.floor(Math.random() * gridSize);
      } else {
        row = Math.floor(Math.random() * (gridSize - len + 1));
        col = Math.floor(Math.random() * (gridSize - len + 1));
      }

      let canPlace = true;

      for (let i = 0; i < len; i++) {
        let r = row;
        let c = col;
        if (direction === 0) c = col + i;
        if (direction === 1) r = row + i;
        if (direction === 2) {
          r = row + i;
          c = col + i;
        }

        const current = board[r][c];
        if (current !== null && current !== word[i]) {
          canPlace = false;
          break;
        }
      }

      if (canPlace) {
        for (let i = 0; i < len; i++) {
          let r = row;
          let c = col;
          if (direction === 0) c = col + i;
          if (direction === 1) r = row + i;
          if (direction === 2) {
            r = row + i;
            c = col + i;
          }
          board[r][c] = word[i];
        }
        placed = true;
      }

      attempts++;
    }
  });

  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (board[r][c] === null) {
        const randomLetter =
          letters[Math.floor(Math.random() * letters.length)];
        board[r][c] = randomLetter;
      }
    }
  }

  return board;
}

const WordSearch = ({ gridSize = 10, words = [] }) => {
  const rawWords = Array.isArray(words) ? words : [];
  const normalizedWords = rawWords
    .map((w) => (w ?? '').toString().trim())
    .filter((w) => w.length > 0);

  const upperWords = normalizedWords.map((w) => w.toUpperCase());
  const storageKeyId = `${gridSize}_${upperWords.join('|')}`;
  const STORAGE_KEY = `wordsearch_state_${storageKeyId}`;

  const [board, setBoard] = useState(() => {
    if (typeof window === 'undefined') return [];
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.board && parsed.board.length) {
          return parsed.board;
        }
      } catch (e) {}
    }
    return createBoard(gridSize, normalizedWords);
  });

  const [found, setFound] = useState(() => {
    if (typeof window === 'undefined') return [];
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.found || [];
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [foundCells, setFoundCells] = useState(() => {
    if (typeof window === 'undefined') return [];
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.foundCells || [];
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [selected, setSelected] = useState([]);

  const [config, setConfig] = useState({
    bgColor: '#ffffff',
    textColor: '#000000',
    borderColor: '#cccccc',
    borderWidth: 1,
    fontSize: '16px',
    cellSize: 40,
    highlightColor: '#ffeb3b',
    foundColor: '#4caf50',
    lineWidth: 2,
  });

  const gameComplete =
    upperWords.length > 0 && found.length === upperWords.length;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!board.length) return;
    const gameState = {
      board,
      found,
      foundCells,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  }, [board, found, foundCells, STORAGE_KEY]);

  const isValidSelection = (row, col) => {
    if (selected.length === 0) return true;

    const last = selected[selected.length - 1];
    const dr = row - last.row;
    const dc = col - last.col;

    if (Math.abs(dr) > 1 || Math.abs(dc) > 1 || (dr === 0 && dc === 0)) {
      return false;
    }

    if (selected.length === 1) return true;

    const first = selected[0];
    const second = selected[1];

    const dirRow = Math.sign(second.row - first.row);
    const dirCol = Math.sign(second.col - first.col);

    const newDirRow = Math.sign(row - first.row);
    const newDirCol = Math.sign(col - first.col);

    if (dirRow !== newDirRow || dirCol !== newDirCol) {
      return false;
    }

    return row === last.row + dirRow && col === last.col + dirCol;
  };

  const checkWord = () => {
    if (selected.length < 2) {
      setSelected([]);
      return;
    }

    let word = '';
    selected.forEach((pos) => {
      word += board[pos.row][pos.col];
    });

    const upperWord = word.toUpperCase();
    const reversed = upperWord.split('').reverse().join('');

    const matched =
      upperWords.find((w) => w === upperWord) ??
      upperWords.find((w) => w === reversed);

    if (matched) {
      setFound((prev) =>
        prev.includes(matched) ? prev : [...prev, matched],
      );
      setFoundCells((prev) => [...prev, ...selected]);
      setSelected([]);
    } else {
      setTimeout(() => setSelected([]), 300);
    }
  };

  const handleCellClick = (row, col) => {
    if (gameComplete) return;

    const isAlreadyFound = foundCells.some(
      (pos) => pos.row === row && pos.col === col,
    );
    if (isAlreadyFound) return;

    const index = selected.findIndex(
      (pos) => pos.row === row && pos.col === col,
    );

    if (index !== -1) {
      if (index === selected.length - 1 && selected.length >= 2) {
        checkWord();
        return;
      }
      setSelected(selected.slice(0, index + 1));
      return;
    }

    if (selected.length > 0 && !isValidSelection(row, col)) {
      if (selected.length >= 2) {
        checkWord();
      } else {
        setSelected([]);
      }
      setSelected([{ row, col }]);
      return;
    }

    setSelected([...selected, { row, col }]);
  };

  const resetGame = () => {
    const newBoard = createBoard(gridSize, normalizedWords);
    setBoard(newBoard);
    setSelected([]);
    setFound([]);
    setFoundCells([]);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  const renderCell = (row, col) => {
    const cellLetter = board[row]?.[col] ?? '';

    const isSelected = selected.some(
      (pos) => pos.row === row && pos.col === col,
    );
    const isFound = foundCells.some(
      (pos) => pos.row === row && pos.col === col,
    );

    const cellStyle = {
      width: `${config.cellSize}px`,
      height: `${config.cellSize}px`,
      backgroundColor: isFound
        ? config.foundColor
        : isSelected
        ? config.highlightColor
        : config.bgColor,
      color: isFound ? '#ffffff' : config.textColor,
      border: `${config.borderWidth}px solid ${config.borderColor}`,
      fontSize: config.fontSize,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: gameComplete ? 'default' : 'pointer',
      userSelect: 'none',
      fontWeight: isFound ? 'bold' : 'normal',
    };

    return (
      <div
        key={`${row}-${col}`}
        style={cellStyle}
        onClick={() => handleCellClick(row, col)}
        className="transition-colors duration-150 select-none"
      >
        {cellLetter}
      </div>
    );
  };

  if (!board.length) {
    return <div className="p-8 text-center">Loading game...</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Word Search</h2>

      {gameComplete && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg border border-green-200">
          <p className="font-bold text-lg">
            Congratulations! You have found all words!
          </p>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        <div>
          <div
            className="inline-grid gap-0 border-2 border-gray-300 rounded overflow-hidden"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, ${config.cellSize}px)`,
              borderWidth: config.lineWidth,
            }}
          >
            {board.map((row, rowIndex) =>
              row.map((_, colIndex) => renderCell(rowIndex, colIndex)),
            )}
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              New Game
            </button>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="mb-6">
            <h3 className="font-bold mb-2">Words to find:</h3>
            <div className="flex flex-wrap gap-2">
              {upperWords.map((word, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded ${
                    found.includes(word)
                      ? 'bg-green-100 text-green-800 line-through'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {word}
                </span>
              ))}
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Found: {found.length} / {upperWords.length}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold mb-3">Appearance settings:</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Background color:</label>
                <input
                  type="color"
                  value={config.bgColor}
                  onChange={(e) =>
                    setConfig({ ...config, bgColor: e.target.value })
                  }
                  className="w-full h-8 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Text color:</label>
                <input
                  type="color"
                  value={config.textColor}
                  onChange={(e) =>
                    setConfig({ ...config, textColor: e.target.value })
                  }
                  className="w-full h-8 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Cell size: {config.cellSize}px
                </label>
                <input
                  type="range"
                  min="20"
                  max="60"
                  value={config.cellSize}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      cellSize: parseInt(e.target.value, 10),
                    })
                  }
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Border width: {config.borderWidth}px
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={config.borderWidth}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      borderWidth: parseInt(e.target.value, 10),
                    })
                  }
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Font size:</label>
                <select
                  value={config.fontSize}
                  onChange={(e) =>
                    setConfig({ ...config, fontSize: e.target.value })
                  }
                  className="w-full px-2 py-1 border rounded"
                >
                  <option value="12px">Small</option>
                  <option value="16px">Medium</option>
                  <option value="20px">Large</option>
                  <option value="24px">Extra large</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-3 bg-blue-50 rounded-lg text-sm">
        <p className="font-medium mb-1">How to play:</p>
        <p>Click letters one by one to select a word.</p>
        <p>Words can be horizontal, vertical, or diagonal.</p>
        <p>
          When you are done, click the last selected letter again to check the
          word.
        </p>
        <p>
          If it is a valid word from the dictionary, it will stay highlighted
          and be crossed out in the list.
        </p>
        <p>If not, the selection will disappear.</p>
      </div>
    </div>
  );
};

export default WordSearch;
