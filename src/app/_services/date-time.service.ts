import { Injectable } from '@angular/core';

@Injectable()
export class DateTimeService {
    public timestampToDisplayDate(stamp: string): string {
        const d: Date = new Date(stamp);
        return d.toLocaleDateString();
    }
}