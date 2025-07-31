import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-announcement',
  standalone: true,
  templateUrl: './announcement.component.html',
  imports: [NgIf]
})
/**
 * AnnouncementComponent displays win/loss/draw results.
 */
export class AnnouncementComponent {
  @Input() winner: string | null = null;
  @Input() draw: boolean = false;
}
