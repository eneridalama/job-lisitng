import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
@Injectable({
  providedIn: 'root',
})
export class Utils {
  constructor(private messageService: MessageService) {}

  public showMessage(
    key: string,
    severity: string,
    summary: string,
    detail: string
  ) {
    this.messageService.add({
      key: key,
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
