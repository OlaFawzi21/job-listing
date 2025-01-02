import { ChangeDetectorRef, Component } from '@angular/core';
import { JobsService } from './../../services/jobs.service';
import { Job, JobResponse } from '../../interfaces/job';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent {
  allJobs: Job[] = [];
  jobs: Job[] = [];
  data: JobResponse;
  currentPage = 1;
  remoteControl = 'false';

  constructor(private jobsService: JobsService) {}

  ngOnInit() {
    this.fetchJobs();
  }

  fetchJobs() {
    this.jobsService.getJobs(this.currentPage).subscribe((res) => {
      this.data = res;
      this.allJobs = res.data;
      this.filterRemoteJobs();
    });
  }

  filterRemoteJobs() {
    if (this.remoteControl === 'true') {
      this.jobs = this.allJobs.filter((job) => job.remote);
    } else {
      this.jobs = [...this.allJobs];
    }
  }

  previousPage() {
    if (this.data.links.prev) {
      this.currentPage--;
      this.fetchJobs();
    }
  }

  nextPage() {
    if (this.data.links.next) {
      this.currentPage++;
      this.fetchJobs();
    }
  }
}
