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

  jobs: Job[] = [];
  totalItems = 0;
  pageSize = 10;
  pageIndex = 0;

  currentPage = 1;

  filteredJobs: any;

  remoteControl = 'false';

  constructor(private jobsService: JobsService) {}

  ngOnInit() {
    this.fetchJobs();
  }

  fetchJobs() {
    this.jobsService.getJobs(this.currentPage).subscribe((res) => {
      this.allJobs = res.data || [];
      this.totalItems = this.allJobs.length;
      this.updatePageData();
    });
  }

  updatePageData() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.jobs = this.allJobs.slice( startIndex, endIndex );
    this.filterRemoteJobs();
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
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

  filterRemoteJobs() {
    if (this.remoteControl == 'true') {
      this.allJobs = this.allJobs.filter((job) => job.remote);
      this.pageIndex = 0;
      this.totalItems = this.allJobs.length;
      this.updatePageData();
    } else {
      this.fetchJobs();
      return;
    }
  }
}
