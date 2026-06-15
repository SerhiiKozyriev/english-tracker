import { Component, ElementRef, input, viewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  title = input.required<string>();
  private modalEl = viewChild<ElementRef<HTMLDialogElement>>('modal');

  close(): void {
    this.modalEl()?.nativeElement.close();
  }

  open(): void {
    this.modalEl()?.nativeElement.showModal();
  }
}
