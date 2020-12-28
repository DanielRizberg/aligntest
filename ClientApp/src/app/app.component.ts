import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { image } from 'src/api/models';
import { imageService } from 'src/api/imageService';
import { interval, timer } from 'rxjs';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {


isSlideLeft:boolean=false;
isSlideRight:boolean=false;
  currentImages: image[];
  viewImage: image;
  constructor(private imageService: imageService) { }
  ngOnInit(): void {
    timer(0,30000).subscribe(x => {
      this.getData();
    })

  }
  title = 'ClientApp';


  private getData() {
    this.imageService.getImages().subscribe(x => {
      this.currentImages = [...x.images];
      this.setviewImage();
    });
  }

  getImageUrl(image: image) {
    if (!image) {
      return null;
    }
    return `https://picsum.photos/id/${image.id}/${image.width}/${image.height}`
  }
  moveleft() {
    this.isSlideLeft=true;
    let first = this.currentImages.shift();
    this.currentImages.push(first);
    this.setviewImage();
    setTimeout(()=> this.isSlideLeft=false,5000)
   
  }
  private setviewImage() {
    this.viewImage = this.currentImages[2];
  }

  moveRight() {
    this.isSlideRight=true;
    let last = this.currentImages.pop();
    this.currentImages.unshift(last);
    this.setviewImage();
    setTimeout(()=> this.isSlideRight=false,3000)
  }
}
