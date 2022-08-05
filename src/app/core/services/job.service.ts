import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { SortPipe } from 'src/app/shared/pipes/sort.pipe';
import { environment } from 'src/environments/environment';
import { JobPostingEntity } from '../models/job.model';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private url: string;

  constructor(private http: HttpClient, private sortPipe: SortPipe) {
    this.url = environment.baseUrl + '/jobs';
  }

  addJob(request: JobPostingEntity) {
    return this.http.post<{ name: string }>(this.url + '.json', request);
  }

  editJob(request: JobPostingEntity) {
    return this.http.put<JobPostingEntity>(
      this.url + `/${request.id}` + '.json',
      request
    );
  }

  updateJob(request: JobPostingEntity) {
    return this.http
      .patch<JobPostingEntity>(this.url + `/${request.id}` + '.json', request)
      .subscribe();
  }

  getJobs() {
    return this.http
      .get<{ [key: string]: JobPostingEntity }>(this.url + '.json')
      .pipe(
        map((res) => {
          const jobsArray: JobPostingEntity[] = [];
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              jobsArray.push({ ...res[key as keyof typeof res], id: key });
            }
          }
          return this.sortPipe.transform(jobsArray);
        })
      );
  }

  deleteJob(id: string) {
    return this.http.delete<JobPostingEntity>(this.url + '/' + id + '.json');
  }
}
