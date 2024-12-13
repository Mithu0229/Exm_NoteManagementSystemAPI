import { Pipe, PipeTransform, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'timeLeft',
  pure: false  // Important: Set to false to allow the pipe to update in real-time
})
export class TimeLeftPipe implements PipeTransform, OnDestroy {

  private intervalId: any;
  private timeLeft: string = '';

  constructor(private cdr: ChangeDetectorRef) { }

  transform(value: any): string {
    if (!value) {
      return '';
    }

    // Calculate initial time left
    this.calculateTimeLeft(value);

    // Update time left every second
    this.startTimeUpdater(value);

    return this.timeLeft;
  }

  // Calculate time left and update the pipe's timeLeft property
  private calculateTimeLeft(value: any): void {
    const now = new Date();
    const targetDate = new Date(value);
    const diffInMs = targetDate.getTime() - now.getTime();

    if (diffInMs <= 0) {
      this.timeLeft = 'Expired';
      return;
    }

    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

    let timeLeft = '';
    if (days > 0) {
      timeLeft += `${days} day${days > 1 ? 's' : ''} `;
    }
    if (hours > 0) {
      timeLeft += `${hours} hour${hours > 1 ? 's' : ''} `;
    }
    if (minutes > 0) {
      timeLeft += `${minutes} minute${minutes > 1 ? 's' : ''} `;
    }
    if (seconds > 0) {
      timeLeft += `${seconds} second${seconds > 1 ? 's' : ''}`;
    }

    this.timeLeft = timeLeft.trim();
  }

  // Start the interval to update the time left every second
  private startTimeUpdater(value: any): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      this.calculateTimeLeft(value);
      this.cdr.detectChanges(); // Manually trigger change detection
    }, 1000);  // Update every second
  }

  // Clean up the interval when the pipe is destroyed
  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
