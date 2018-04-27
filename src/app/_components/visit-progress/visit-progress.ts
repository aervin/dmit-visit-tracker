import { Component, Input } from '@angular/core';
import { DayResult } from '../../_services/firebase.service';
import { LogService } from '../../_services/log.service';

@Component({
    selector: 'visit-progress',
    templateUrl: 'visit-progress.html'
})
export class VisitProgressComponent {
    @Input() public progressBars: DayResult[];
    @Input() public goalSet: string;

    public ngOnInit(): void {
        LogService.log(VisitProgressComponent.name, this.progressBars);
    }

    public didMeetGoal(result: string): boolean {
        try {
            return parseFloat(result) >= parseFloat(this.goalSet);
        } catch {
            return false;
        }
    }

    public didNotMeetGoal(result: string | null): boolean {
        if (result !== null) {
            return parseFloat(result) < parseFloat(this.goalSet);
        } else {
            return false;
        }
    }
}
