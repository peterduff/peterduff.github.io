import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class CodexService {

    private core = new Subject();
    private codexes = new BehaviorSubject([]);

    constructor(private http: HttpClient) {
    }

    setCore(core: any) {
        this.core.next(core);
    }

    getCore() {
        return this.core.asObservable();
    }

    httpGetCore(): Observable<any> {
        return this.http.get('/assets/dataStructures/core.json');
    }

    setCodexes(codexes: any) {
        this.codexes.next(codexes);
    }

    getCodexes() {
        return this.codexes.asObservable();
    }

    httpGetCodex(name: string): Observable<any> {
        return this.http.get('/assets/dataStructures/' + name);
    }
}
