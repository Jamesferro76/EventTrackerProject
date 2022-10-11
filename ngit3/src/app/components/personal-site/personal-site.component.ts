import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-personal-site',
  templateUrl: './personal-site.component.html',
  styleUrls: ['./personal-site.component.css']
})
export class PersonalSiteComponent implements OnInit {

  email: string="jamesferromusic@gmail.com"
  address: string="East Islip, Ny";
  picture: string="https://i.postimg.cc/15j0wWm1/PXL-20220918-203457507.jpg";
  // "https://marketplace.canva.com/Foblk/MAEItxFoblk/1/tl/canva-happy-man-icon-MAEItxFoblk.png";

  projectsBool: boolean=true;
  descriptionBool: boolean=true;
  experienceBool: boolean=false;

  image1: string="https://i.postimg.cc/vTPKWWB2/Screen-Shot-2022-10-04-at-8-52-54-AM.png";
  image2: string="https://i.postimg.cc/tCK58rLt/Screen-Shot-2022-10-04-at-8-55-43-AM.png";
  image3: string="https://i.postimg.cc/DwQqH7Qn/Screen-Shot-2022-10-04-at-8-59-27-AM.png";
  image4: string="https://i.postimg.cc/0jW8bKqP/Screen-Shot-2022-10-07-at-11-22-34-AM.png";
  backgroundImage: string="https://img.freepik.com/free-vector/gradient-pastel-sky-background_23-2148917404.jpg";
  bannerImage: string="https://i0.wp.com/zeevector.com/wp-content/uploads/Cute-Pastel-Background.png?fit=1937%2C1341&ssl=1";

  siteIcon: string="https://static.vecteezy.com/system/resources/previews/003/731/316/original/web-icon-line-on-white-background-image-for-web-presentation-logo-icon-symbol-free-vector.jpg";

  link11: string= "http://34.238.32.159:8080/Intersteller/#/home";
  link12: string="https://github.com/Jamesferro76/FinalProject";

  link21: string="http://34.238.32.159:8080/it3/#/home";
  link22: string= "https://github.com/Jamesferro76/EventTrackerProject";

  link31: string="http://34.238.32.159:8080/InsideScoop/logout.do";
  link32: string= "https://github.com/Jamesferro76/MidtermProjectJames";

  link41: string="http://34.238.32.159:8080/MVCFilmSite/Index.html";
  link42: string= "https://github.com/Rift131/SpringMVCFilmCRUD";

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  projectsToggle(){
    this.projectsBool=true;
    this.descriptionBool=false;
    this.experienceBool=false;
  }
  descriptionToggle(){
    this.projectsBool=false;
    this.descriptionBool=true;
    this.experienceBool=false;
  }
  experienceToggle(){
    this.projectsBool=false;
    this.descriptionBool=false;
    this.experienceBool=true;
  }



}
