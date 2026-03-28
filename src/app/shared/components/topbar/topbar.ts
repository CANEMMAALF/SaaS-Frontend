import { Component, Input } from '@angular/core';

export interface UserProfile {
  name: string;
  avatar: string;
}

@Component({
  selector: 'app-topbar',
  standalone: true,
  templateUrl: './topbar.html',
  styleUrl: './topbar.css'
})
export class TopbarComponent {
  @Input() user: UserProfile = {
    name: 'Usuario',
    avatar: ''
  };
}
