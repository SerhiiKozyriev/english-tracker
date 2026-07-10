import { Component, ElementRef, input, output, viewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  title = input.required<string>();
  modalClosed = output<void>();
  private modalEl = viewChild.required<ElementRef<HTMLDialogElement>>('modal');

  close(): void {
    this.modalEl().nativeElement.close();
  }

  onClose(): void {
    this.modalClosed.emit();
  }

  open(): void {
    this.modalEl().nativeElement.showModal();
  }
}
