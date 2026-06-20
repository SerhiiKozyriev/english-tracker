import { Component, ElementRef, input, viewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  private modalEl = viewChild.required<ElementRef<HTMLDialogElement>>('modal');
  title = input.required<string>();

  close(): void {
    this.modalEl().nativeElement.close();
  }

  open(): void {
    this.modalEl().nativeElement.showModal();
  }
}
