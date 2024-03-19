import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/constants/constants';
import { ImageModel } from 'src/app/models/image.model';


@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiServerUrl = Constants.apiUrl;  
  
  constructor(private http: HttpClient) {}

  addImage(image: ImageModel): Observable<ImageModel> {
    return this.http.post<ImageModel>(`${this.apiServerUrl}/image/add`,image);
  }

  updateImage(image: ImageModel): Observable<ImageModel> {
    return this.http.put<ImageModel>(`${this.apiServerUrl}/image/update`,image);
  }

  deleteAccount(imageId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/image/delete/${imageId}`);
  }

}
