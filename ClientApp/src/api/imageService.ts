import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { image, imageRequest, imageResponse } from './models';
import { map } from 'rxjs/operators/map'
@Injectable()
export class imageService {
    /**
     *
     */
    public usedImages: image[] = [];
    constructor(private httpClient: HttpClient) {

    }
    getImages() {
        if (this.usedImages.length === 100) {
            this.usedImages = [];
        }
        let request: imageRequest = {
            forbiddenKeys: this.usedImages.map(x => x.id),
            numElements: 5
        }
        return this.httpClient.post('image/getRandom', request).pipe(map(x => {
            let response = x as imageResponse;
            this.usedImages.push(...response.images);

            return response;
        }))
    }
}