import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/internal/operators';
import { RrssService } from 'src/app/services/rrss-services/rrss-service.service';
import { RrssConnection } from 'src/app/types/rrssConnection.type';
import { RrssType } from 'src/app/types/rrssType.type';

@Component({
  selector: 'app-add-rrss-diffusion',
  templateUrl: './add-rrss-diffusion.component.html',
  styleUrls: ['./add-rrss-diffusion.component.scss']
})
export class AddRrssDiffusionComponent implements OnInit {

  saving: boolean;
  rrssConnections: RrssConnection[];
  rrssDiffusionForm = new FormGroup({
    name: new FormControl(),
    content: new FormControl(),
    date: new FormControl(),
    rrssConnection: new FormControl()
  });

  constructor(private rrssService: RrssService,
              private router: Router) { }

  ngOnInit(): void {
    this._getRrssConnections();
  }

  public addDiffusion() {
    this.saving = true;
    this.rrssService.addRrssDiffusion(this.rrssDiffusionForm).pipe(
      tap(res => this.router.navigate(['/rrss'])),
      catchError(err => {
        console.dir(err);
        this.saving = false;
        return EMPTY;
      })
    ).subscribe();
  }

  private _getRrssConnections() {
    this.rrssService.getRrssConnections().pipe(
      tap((res: RrssConnection[]) => this.rrssConnections = res),
      tap((res: RrssConnection[]) => this._setDefaultType(res))
    ).subscribe();
  }

  private _setDefaultType(data: RrssType[]) {
    this.rrssDiffusionForm.patchValue({ rrssConnection: data[0] });
  }

  compareFn(c1, c2): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

}
