import { ChangeDetectorRef, Component } from '@angular/core';
import { JobsService } from './../../services/jobs.service';
import { Job } from '../../interfaces/job';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent {
  allJobs: Job[] = [];
  filteredJobs: Job[] = [];
  jobs: Job[] = [];

  totalItems = 0;
  pageSize = 10;
  pageIndex = 0;

  currentPage = 1;

  remoteControl = 'false';

  constructor(private jobsService: JobsService) {}

  ngOnInit() {
    this.fetchJobs();
  }

  fetchJobs() {
    this.jobsService.getJobs(this.currentPage).subscribe((res) => {
      this.allJobs = res.data || [];
      this.filteredJobs = [...this.allJobs];
      this.totalItems = this.filteredJobs.length;
      this.updatePageData();
    });
  }

  updatePageData() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.jobs = this.filteredJobs.slice(startIndex, endIndex);
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePageData();
  }

  filterRemoteJobs() {
    if (this.remoteControl === 'true') {
      this.filteredJobs = this.allJobs.filter((job) => job.remote);
    } else {
      this.filteredJobs = [...this.allJobs];
    }
    this.pageIndex = 0;
    this.totalItems = this.filteredJobs.length;
    this.updatePageData();
  }

  previousPage() {
    this.currentPage = this.currentPage - 1;
    this.fetchJobs();
  }

  nextPage() {
    this.currentPage = this.currentPage + 1;
    this.fetchJobs();
  }
}
