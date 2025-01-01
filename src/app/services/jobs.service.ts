import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobResponse } from '../interfaces/job';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  private api_url = 'https://www.arbeitnow.com/api/job-board-api';
  constructor(private http: HttpClient) {}

  getJobs(page: number): Observable<JobResponse> {
    return this.http.get<JobResponse>(`${this.api_url}?page=${page}`);
  }
}
