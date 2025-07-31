import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// PUBLIC_INTERFACE
@Injectable({ providedIn: 'root' })
/**
 * LeaderboardService fetches leaderboard data from backend.
 */
export class LeaderboardService {
  private readonly API_URL = '/api';

  constructor(http: HttpClient) {
    this._http = http;
  }
  private _http: HttpClient;

  // PUBLIC_INTERFACE
  async getLeaderboard(): Promise<{ username: string, wins: number, games: number }[]> {
    const resp = await this._http.get<{ username: string, wins: number, games: number }[]>(`${this.API_URL}/leaderboard`).toPromise();
    return resp || [];
  }
}
