import { useCallback, useEffect, useRef, useState } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

type Point = {
  x: number;
  y: number;
};

const GRID_SIZE = 20;
const INITIAL_SNAKE: Point[] = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];

const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

type Direction = keyof typeof DIRECTIONS;

const SnakeGamePage = () => {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Point>({ x: 15, y: 10 });
  const [, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const [highScore, setHighScore] = useState(() => {
    return Number(localStorage.getItem('snake-high-score')) || 0;
  });

  const directionRef = useRef<Direction>('RIGHT');
  const touchStartRef = useRef<Point | null>(null);

  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood: Point;

    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (currentSnake.some((part) => part.x === newFood.x && part.y === newFood.y));

    return newFood;
  }, []);

  const resetGame = useCallback(() => {
    const newSnake = [...INITIAL_SNAKE];

    setSnake(newSnake);
    setFood(generateFood(newSnake));
    setDirection('RIGHT');
    directionRef.current = 'RIGHT';
    setScore(0);
    setGameOver(false);
  }, [generateFood]);

  const changeDirection = useCallback((newDirection: Direction) => {
    const currentDirection = directionRef.current;

    const oppositeDirections: Record<Direction, Direction> = {
      UP: 'DOWN',
      DOWN: 'UP',
      LEFT: 'RIGHT',
      RIGHT: 'LEFT',
    };

    if (oppositeDirections[currentDirection] === newDirection) {
      return;
    }

    directionRef.current = newDirection;
    setDirection(newDirection);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          event.preventDefault();
          changeDirection('UP');
          break;

        case 'ArrowDown':
        case 's':
        case 'S':
          event.preventDefault();
          changeDirection('DOWN');
          break;

        case 'ArrowLeft':
        case 'a':
        case 'A':
          event.preventDefault();
          changeDirection('LEFT');
          break;

        case 'ArrowRight':
        case 'd':
        case 'D':
          event.preventDefault();
          changeDirection('RIGHT');
          break;

        case 'Enter':
          if (gameOver) {
            resetGame();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [changeDirection, gameOver, resetGame]);

  useEffect(() => {
    if (gameOver) return;

    const gameInterval = window.setInterval(() => {
      setSnake((currentSnake) => {
        const head = currentSnake[0];
        const currentDirection = DIRECTIONS[directionRef.current];

        const newHead = {
          x: head.x + currentDirection.x,
          y: head.y + currentDirection.y,
        };

        // Wall collision
        if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
          setGameOver(true);
          return currentSnake;
        }

        // Self collision
        const hitSelf = currentSnake.some((part) => part.x === newHead.x && part.y === newHead.y);

        if (hitSelf) {
          setGameOver(true);
          return currentSnake;
        }

        const newSnake = [newHead, ...currentSnake];

        // Food eaten
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((previous) => {
            const newScore = previous + 1;

            setHighScore((currentHighScore) => {
              if (newScore > currentHighScore) {
                localStorage.setItem('snake-high-score', String(newScore));
                return newScore;
              }

              return currentHighScore;
            });

            return newScore;
          });
          setFood(generateFood(newSnake));

          return newSnake;
        }

        newSnake.pop();

        return newSnake;
      });
    }, 130);

    return () => {
      window.clearInterval(gameInterval);
    };
  }, [food, gameOver, generateFood]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];

    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStartRef.current) return;

    const touch = event.changedTouches[0];

    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;

    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (Math.max(absX, absY) < 20) {
      touchStartRef.current = null;
      return;
    }

    if (absX > absY) {
      if (deltaX > 0) {
        changeDirection('RIGHT');
      } else {
        changeDirection('LEFT');
      }
    } else {
      if (deltaY > 0) {
        changeDirection('DOWN');
      } else {
        changeDirection('UP');
      }
    }

    touchStartRef.current = null;
  };

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100dvh-120px)] min-h-0 flex-col overflow-hidden">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between pb-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Mini Snake</h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Use arrow keys, WASD or swipe to play.</p>
          </div>

          <div className="flex gap-3">
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <p className="text-xs text-slate-500 dark:text-slate-400">Score</p>

              <p className="text-2xl font-bold text-slate-900 dark:text-white">{score}</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white-50 px-4 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <p className="text-xs text-zinc-600 dark:text-slate-400">Best</p>

              <p className="text-2xl font-bold text-slate-900 dark:text-white">{highScore}</p>
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div className="flex min-h-0 flex-1 items-center justify-center">
          <div
            className="
              relative
              aspect-square
              h-full
              max-h-full
              max-w-full
              overflow-hidden
              rounded-3xl
              border-4
              border-slate-300
              bg-slate-950
              shadow-2xl
              dark:border-slate-700
            "
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Grid */}
            <div
              className="grid h-full w-full"
              style={{
                gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
              }}
            >
              {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
                const x = index % GRID_SIZE;
                const y = Math.floor(index / GRID_SIZE);

                const isSnake = snake.some((part) => part.x === x && part.y === y);

                const isHead = snake[0]?.x === x && snake[0]?.y === y;

                const isFood = food.x === x && food.y === y;

                return (
                  <div key={`${x}-${y}`} className="border-[0.5px] border-slate-800/60">
                    {isSnake && <div className={`h-full w-full ${isHead ? 'rounded-md bg-green-400' : 'rounded-sm bg-green-500'}`} />}

                    {isFood && (
                      <div className="flex h-full w-full items-center justify-center">
                        <div className="h-[65%] w-[65%] rounded-full bg-red-500 shadow-lg shadow-red-500/40" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Game Over */}
            {gameOver && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 p-4">
                <div className="w-full max-w-xs rounded-3xl bg-white p-6 text-center shadow-2xl dark:bg-slate-900">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Game Over</h2>

                  <p className="mt-2 text-slate-500 dark:text-slate-400">Your score: {score}</p>

                  <button onClick={resetGame} className="mt-5 w-full rounded-xl bg-green-500 px-5 py-3 font-semibold text-white transition hover:bg-green-600">
                    Play Again
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex shrink-0 justify-center pt-4">
          <div className="grid grid-cols-3 gap-2">
            <div />

            <button
              type="button"
              onClick={() => changeDirection('UP')}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-300 bg-white text-xl shadow-sm transition active:scale-95 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            >
              ↑
            </button>

            <div />

            <button
              type="button"
              onClick={() => changeDirection('LEFT')}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-300 bg-white text-xl shadow-sm transition active:scale-95 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            >
              ←
            </button>

            <button
              type="button"
              onClick={() => changeDirection('DOWN')}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-300 bg-white text-xl shadow-sm transition active:scale-95 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            >
              ↓
            </button>

            <button
              type="button"
              onClick={() => changeDirection('RIGHT')}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-300 bg-white text-xl shadow-sm transition active:scale-95 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            >
              →
            </button>
          </div>
        </div>

        {/* Mobile hint */}
        <p className="shrink-0 pt-2 text-center text-xs text-slate-400 dark:text-slate-500">Swipe on the game area to move</p>
      </div>
    </DashboardLayout>
  );
};

export default SnakeGamePage;
