import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { JobPostingEntity } from 'src/app/core/models/job.model';

@Component({
  selector: 'app-create-edit-job-posting',
  templateUrl: './create-edit-job-posting.component.html',
  styleUrls: ['./create-edit-job-posting.component.scss'],
})
export class CreateJobPostingComponent implements OnInit {
  newJobForm: FormGroup = new FormGroup({});
  currentUser = JSON.parse(localStorage.getItem('user')!);

  @Output() addedJob = new EventEmitter<JobPostingEntity>();
  @Output() openModal = new EventEmitter<boolean>();
  @Input()
  set object(item: any) {
    setTimeout(() => {
      if (item !== undefined) {
        this.newJobForm = this.initializeForm(item);
      }
    });
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.newJobForm = this.initializeForm(null);
  }

  initializeForm(value: any): FormGroup {
    return this.formBuilder.group({
      id: new FormControl(value?.id),
      title: new FormControl(value?.title, [Validators.required]),
      description: new FormControl(value?.description, [Validators.required]),
      offer: new FormControl(this.currentUser),
      wage: new FormControl(value?.wage),
    });
  }

  createJob() {
    this.addedJob.emit(this.newJobForm.value);
    this.openModal.emit(false);
    this.newJobForm.reset();
  }

  close() {
    this.openModal.emit(false);
  }
}
