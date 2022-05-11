import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Core} from "../models/core";
import {Codex} from "../models/codex";

@Injectable({
    providedIn: 'root'
})
export class CodexService {

    private core = new Subject<Core>();
    private codexes = new BehaviorSubject<Codex[]>([]);

    constructor(private http: HttpClient) {
    }

    setCore(core: Core): void {
        this.core.next(core);
    }

    getCore(): Observable<Core> {
        return this.core.asObservable();
    }

    httpGetCore(): Observable<Core> {
        return this.http.get<Core>('/assets/dataStructures/core.json');
    }

    setCodexes(codexes: Codex[]): void {
        this.codexes.next(codexes);
    }

    getCodexes(): Observable<Codex[]> {
        return this.codexes.asObservable();
    }

    httpGetCodex(name: string): Observable<Codex> {
        return this.http.get<Codex>('/assets/dataStructures/' + name);
    }
}
