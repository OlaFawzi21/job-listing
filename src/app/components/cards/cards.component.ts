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
  searchControl = '';

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
    let filteredJobs = [...this.allJobs];

    // Filter by remote jobs if remoteControl is 'true'
    if (this.remoteControl === 'true') {
      filteredJobs = filteredJobs.filter((job) => job.remote);
    }

    // Filter by search term if searchControl is not empty
    if (this.searchControl.trim()) {
      const searchTerm = this.searchControl.trim().toLowerCase();
      filteredJobs = filteredJobs.filter((job) =>
        job.title.toLowerCase().includes(searchTerm)
      );
    }

    // Assign the filtered jobs to this.jobs
    this.jobs = filteredJobs;
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

  reset() {
    this.searchControl = '';
  }
}
