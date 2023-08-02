import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/internal/operators';
import { RrssService } from 'src/app/services/rrss-services/rrss-service.service';
import { RrssType } from 'src/app/types/rrssType.type';

@Component({
  selector: 'app-add-rrss',
  templateUrl: './add-rrss.component.html',
  styleUrls: ['./add-rrss.component.scss']
})
export class AddRrssComponent implements OnInit {

  saving: boolean;
  rrssTypes: RrssType[];
  rrssConnectionForm = new FormGroup({
    name: new FormControl(),
    rrssType: new FormControl(),
    tokens: new FormControl()
  });

  constructor(private rrssService: RrssService,
              private router: Router) { }

  ngOnInit(): void {
    this._getRrssTypes();
  }

  public addRrss() {
    this.saving = true;
    this.rrssService.addRrssConnection(this.rrssConnectionForm).pipe(
      tap(res => this.router.navigate(['/rrss'])),
      catchError(err => {
        console.dir(err);
        this.saving = false;
        return EMPTY;
      })
    ).subscribe();
  }

  private _getRrssTypes() {
    this.rrssService.getRrssTypes().pipe(
      tap((res: RrssType[]) => this.rrssTypes = res),
      tap((res: RrssType[]) => this._setDefaultType(res))
    ).subscribe();
  }

  private _setDefaultType(data: RrssType[]) {
    this.rrssConnectionForm.patchValue({ rrssType: data[0] });
  }

  compareFn(c1, c2): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

}
