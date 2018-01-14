import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[fileDrop]'
})

export class FileDropDirective {
  @Output() filesDropped = new EventEmitter<FileList>();
  @Output() filesHovered = new EventEmitter<boolean>();

  constructor() {}

  @HostListener('drop', ['$event'])

  onDrop($event) {
    $event.preventDefault();
    const transfer = $event.dataTransfer;
    this.filesDropped.emit(transfer.files);
    this.filesHovered.emit(false);
  }

  @HostListener('dragover', ['$event'])

  onDragOver($event) {
    event.preventDefault();
    this.filesHovered.emit(true);
  }

  @HostListener('dragleave', ['$event'])

  onDragLeave($event) {
    this.filesHovered.emit(false);
  }
}