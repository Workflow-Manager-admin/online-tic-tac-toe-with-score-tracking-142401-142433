import { Component, EventEmitter, Output } from '@angular/core';
import { NgFor } from '@angular/common';

/**
 * BoardComponent renders the tic tac toe grid and handles move logic.
 */
// PUBLIC_INTERFACE
@Component({
  selector: 'app-board',
  standalone: true,
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  imports: [NgFor],
})
export class BoardComponent {
  @Output() gameEnd = new EventEmitter<{ winner: string | null, draw: boolean }>();

  board: string[] = Array(9).fill('');
  currentPlayer: 'X' | 'O' = 'X';
  moves: number = 0;
  gameOver: boolean = false;

  // PUBLIC_INTERFACE
  cellClick(index: number) {
    if (this.board[index] !== '' || this.gameOver) return;
    this.board[index] = this.currentPlayer;
    this.moves++;
    if (this.checkWinner(this.currentPlayer)) {
      this.gameEnd.emit({ winner: this.currentPlayer, draw: false });
      this.gameOver = true;
    } else if (this.moves === 9) {
      this.gameEnd.emit({ winner: null, draw: true });
      this.gameOver = true;
    } else {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  // PUBLIC_INTERFACE
  resetBoard() {
    this.board = Array(9).fill('');
    this.currentPlayer = 'X';
    this.moves = 0;
    this.gameOver = false;
  }

  // PUBLIC_INTERFACE
  private checkWinner(player: 'X' | 'O'): boolean {
    const wins = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6],            // diagonals
    ];
    return wins.some(indices => indices.every(idx => this.board[idx] === player));
  }
}
