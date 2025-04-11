import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() modalId!: string;
  @Input() title!: string;
  @ViewChild('modalElement', { static: true }) modalElement!: ElementRef;

  modalInstance: any;

  async open() {
    const { Modal } = await import('bootstrap');
    if (!this.modalInstance) {
      this.modalInstance = new Modal(this.modalElement.nativeElement);
    }
    this.modalInstance.show();
  }
  isVisible: boolean = false;

  show(): void {
    this.isVisible = true;
  }

  hide(): void {
    this.isVisible = false;
  }

  confirm(): void {
    this.hide();
  }

  close() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }
}
