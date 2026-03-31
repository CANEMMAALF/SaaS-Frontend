import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toggle-switch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toggle-switch.html',
  styleUrl: './toggle-switch.scss'
})
export class ToggleSwitchComponent {
  @Input() checked: boolean = false;
  @Input() disabled: boolean = false;
  @Output() toggled = new EventEmitter<boolean>();

  onToggle(event: Event): void {
    if (this.disabled) return;
    const input = event.target as HTMLInputElement;
    this.checked = input.checked;
    this.toggled.emit(this.checked);
  }
}

