import { Component } from '@angular/core';
import { BoardComponent } from './board/board.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { NgIf } from '@angular/common';

/**
 * GameComponent handles the overall game session, board status, and link to leaderboard.
*/
// PUBLIC_INTERFACE
@Component({
  selector: 'app-game',
  standalone: true,
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  imports: [BoardComponent, AnnouncementComponent, NgIf],
})
export class GameComponent {
  newGameStarted: boolean = false;
  winner: string | null = null;
  draw: boolean = false;

  // PUBLIC_INTERFACE
  startGame() {
    this.newGameStarted = true;
    this.winner = null;
    this.draw = false;
  }

  // PUBLIC_INTERFACE
  handleGameEnd(event: { winner: string | null, draw: boolean }) {
    this.winner = event.winner;
    this.draw = event.draw;
    this.newGameStarted = false;
  }
}
