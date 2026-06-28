# tic-tac-toe-ai

Tic-tac-toe with an unbeatable AI. You will not win. Best case is a draw.

## The AI

Uses Minimax with alpha-beta pruning. The algorithm explores every possible game state, assumes the opponent plays optimally, and picks the move that leads to the best guaranteed outcome. On a 3×3 board the game tree is small enough that this is instant.

Scores: AI win = +10, AI loss = -10, draw = 0. Depth is subtracted/added to prefer winning sooner and losing later.

## Features

- Play as X or O
- Adjustable difficulty: Easy (random moves), Medium (one-level lookahead), Hard (full Minimax)
- Move history
- Score tracker across sessions (localStorage)

## Run

```bash
npm install
npm run dev
```