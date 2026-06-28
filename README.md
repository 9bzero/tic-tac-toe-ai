# Tic-Tac-Toe AI

Tic-Tac-Toe with an **unbeatable AI** powered by the Minimax algorithm — you cannot win.

## How the AI works

The AI uses **Minimax** with alpha-beta pruning to search the full game tree and always pick the optimal move. Against a perfect player, the game always ends in a draw. Against any mistake, the AI wins.

```
Minimax(board, depth, isMaximizing):
  if terminal state → return score
  if maximizing:
    return max(Minimax(child, depth+1, false)) for each move
  else:
    return min(Minimax(child, depth+1, true)) for each move
```

## Features

- Human vs AI mode
- Human vs Human mode
- Move history with undo
- Win/draw/loss score tracker
- Animated winning line highlight

## Stack

![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61dafb?style=flat&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646cff?style=flat&logo=vite&logoColor=white)

## Run locally

```bash
npm install
npm run dev
```

---

Made by [9bzero](https://github.com/9bzero)
