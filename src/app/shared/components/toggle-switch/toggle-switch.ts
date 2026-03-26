import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle-switch',
  imports: [],
  template: `
    <button [disabled]="disabled" (click)="toggle()">
      {{ checked ? 'ON' : 'OFF' }}
    </button>
  `,
})
export class ToggleSwitch {
  @Input() checked = false;
  @Input() disabled = false;
  @Output() toggled = new EventEmitter<void>();

  toggle() {
    this.toggled.emit();
  }
}
