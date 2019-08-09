import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Created by <b><a href="https://www.linkedin.com/in/babaei503/" target="_blank">Saeid Babaei</a></b> 2019</span>
    <div class="socials">
      <a href="https://github.com/babaei503" target="_blank" class="ion ion-social-github"></a>
      <a href="https://www.linkedin.com/in/babaei503/" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
