import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMeme } from './Meme';

@Injectable()
export class MemesService {
    private _memesUrl = "https://mememzansi.conveyor.cloud/api/Memes";
    private _addCommentUrl = "https://mememzansi.conveyor.cloud/api/AddComment";
    private _addLikeUrl = "https://mememzansi.conveyor.cloud/api/AddLike";
    private _removeLikeUrl = "https://mememzansi.conveyor.cloud/api/RemoveLike";
    

    constructor(private http: HttpClient){}
    getMemes(): Observable<IMeme[]> {
        console.log('getting memes .....');
        return this.http.get<IMeme[]>(this._memesUrl);
    }
    addComment(id, comment){
        console.log('adding comment .....');
        return this.http.get(this._addCommentUrl + '?memeId=' + id + '&comment=' + comment);
    }
    addLike(id, liked) {
        console.log('adding like .....');
        if (liked === false ){
            return this.http.get(this._addLikeUrl + '?memeId=' + id);
        } else{
            return this.http.get(this._removeLikeUrl + '?memeId=' + id);
        }
    }
}