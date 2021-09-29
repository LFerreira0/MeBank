import { Component } from '@angular/core';

@Component({  
  templateUrl: 'landing-page.component.html',
  styleUrls: ['landing-page.component.scss']
})
export class landingPageComponent {
  exibeTextoDestaqueh1 = false;
  exibeh2pt1 = false;
  exibeh2pt2 = false;
  exibeh2pt3 = false;

  ngOnInit() {
    this.animaTextoDestaque()
  }

  animaTextoDestaque(){
    setTimeout(()=>{                           //<<<---using ()=> syntax
      this.exibeTextoDestaqueh1 = true;
    }, 3000);

    setTimeout(()=>{                           //<<<---using ()=> syntax
      this.exibeh2pt1 = true;
    }, 4500);

    setTimeout(()=>{                           //<<<---using ()=> syntax
      this.exibeh2pt2 = true;
    }, 5500);

    setTimeout(()=>{                           //<<<---using ()=> syntax
      this.exibeh2pt3 = true;
    }, 6500);

  }
}
