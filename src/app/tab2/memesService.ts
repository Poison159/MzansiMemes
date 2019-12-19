import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMeme } from './Meme';

@Injectable()
export class MemesService {
    private _memesUrl = "https://mememzansi.conveyor.cloud/api/Memes";

    constructor(private http: HttpClient){}
    getMemes(): Observable<IMeme[]> {
        console.log('getting memes .....');
        return this.http.get<IMeme[]>(this._memesUrl);
    }
}