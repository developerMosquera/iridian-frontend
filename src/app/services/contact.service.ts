import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IContactArea, IContact } from '../interfaces/contact.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private urlApiContactArea = 'http://localhost:3000/contact/area';
  private urlApiContact = 'http://localhost:3000/contact';

  constructor(private readonly http: HttpClient) {}

  getAreas(): Observable<Array<IContactArea>> {
    return this.http.get<Array<IContactArea>>(this.urlApiContactArea);
  }

  postContact(data: IContact): Observable<{ status: boolean; message: string }> {
    return this.http.post<{ status: boolean; message: string }>(this.urlApiContact, data);
  }
}
