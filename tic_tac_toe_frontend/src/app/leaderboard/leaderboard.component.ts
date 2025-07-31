import { Component, OnInit } from '@angular/core';
import { LeaderboardService } from './leaderboard.service';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

/**
 * LeaderboardComponent displays scores and rankings.
 */
// PUBLIC_INTERFACE
@Component({
  selector: 'app-leaderboard',
  standalone: true,
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
  imports: [NgIf, NgFor, RouterLink],
})
export class LeaderboardComponent implements OnInit {
  leaderboard: { username: string, wins: number, games: number }[] = [];
  loading: boolean = false;

  constructor(leaderboardService: LeaderboardService) {
    this._leaderboardService = leaderboardService;
  }

  private _leaderboardService: LeaderboardService;

  // PUBLIC_INTERFACE
  async ngOnInit() {
    this.loading = true;
    this.leaderboard = await this._leaderboardService.getLeaderboard();
    this.loading = false;
  }
}
