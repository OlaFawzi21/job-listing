import { Component, Input } from '@angular/core';
import { Job } from '../../interfaces/job';
import { TimeagoPipe } from 'ngx-timeago';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers: [TimeagoPipe],
})
export class CardComponent {
  @Input() job: Job;
}
