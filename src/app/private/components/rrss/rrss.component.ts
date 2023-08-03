import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/internal/operators';
import { RrssService } from 'src/app/services/rrss-services/rrss-service.service';
import { RrssConnection } from 'src/app/types/rrssConnection.type';
import { RrssDiffusion } from 'src/app/types/rrssDiffusion.type';

@Component({
  selector: 'app-rrss',
  templateUrl: './rrss.component.html',
  styleUrls: ['./rrss.component.scss']
})
export class RrssComponent implements OnInit {

  rrssConnections: Array<RrssConnection>;
  rrssDiffusions: Array<RrssDiffusion>;
  now = new Date();

  constructor(private rrssService: RrssService,
              private router: Router) { }

  ngOnInit(): void {
    this._getRrssAccounts();
    this._getRrssDiffusions();
  }

  public editRrssConnection(editRrssConnection) {
    this.router.navigate(['rrss-connection', editRrssConnection.name])
  }

  public deleteRrssDiffusion(rrssDiffusion) {
    this.rrssService.deleteRrssDiffusion(rrssDiffusion.name).pipe(
      tap((res: RrssDiffusion) => this._getRrssDiffusions()),
      catchError(err => {
        console.dir(err);
        return EMPTY;
      })
    ).subscribe();
  }

  private _getRrssAccounts() {
    this.rrssService.getRrssConnections().pipe(
      take(1),
      tap((res: Array<RrssConnection>) => this.rrssConnections = res)
    ).subscribe();
  }

  private _getRrssDiffusions() {
    this.rrssService.getRrssDiffusions().pipe(
      take(1),
      map((res: Array<RrssDiffusion>) => res.sort((a, b) => a.date < b.date ? 1 : a.date > b.date ? -1 : 0)),
      tap((res: Array<RrssDiffusion>) => this.rrssDiffusions = res)
    ).subscribe();
  }

}
