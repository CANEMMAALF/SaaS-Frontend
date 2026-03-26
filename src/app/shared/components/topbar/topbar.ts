import { Component } from '@angular/core';

@Component({
  selector: 'app-topbar',
  standalone: true,
  templateUrl: './topbar.html',
  styleUrl: './topbar.css'
})
export class TopbarComponent {
  user = {
    name: 'Administrador',
    avatar: 'https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff' // placeholder
  };
}
