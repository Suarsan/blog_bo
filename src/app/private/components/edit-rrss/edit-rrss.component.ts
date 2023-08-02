import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/internal/operators';
import { RrssService } from 'src/app/services/rrss-services/rrss-service.service';
import { RrssConnection } from 'src/app/types/rrssConnection.type';
import { RrssType } from 'src/app/types/rrssType.type';

@Component({
  selector: 'app-edit-rrss',
  templateUrl: './edit-rrss.component.html',
  styleUrls: ['./edit-rrss.component.scss']
})
export class EditRrssComponent implements OnInit {

  saving: boolean;
  rrssConnectionName: string;
  rrssTypes: RrssType[];
  rrssConnectionForm = new FormGroup({
    name: new FormControl(),
    rrssType: new FormControl(),
    tokens: new FormControl()
  });

  constructor(private rrssService: RrssService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { 
    }
    
    ngOnInit(): void {
      this.rrssConnectionName = this.activatedRoute.snapshot.params.rrssConnectionName;
      this._getRrssConnection(this.rrssConnectionName);
      this._getRrssTypes();
    }

    private _getRrssConnection(name) {
      this.rrssService.getRrssConnection(name).pipe(
        tap((res: RrssConnection) => this._setEditPostForm(res))
      ).subscribe();
    }

    public updateRrssConnection() {
      this.saving = true;
      this.rrssService.updateRrssConnection(this.rrssConnectionForm).pipe(
        tap(res => this.router.navigate(['/rrss'])),
        catchError(err => {
          console.dir(err);
          this.saving = false;
          return EMPTY;
        })
      ).subscribe();
    }
  
    public deleteRrssConnection() {
      this.rrssService.deleteRrssConnection(this.rrssConnectionName).pipe(
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
        tap((res: RrssType[]) => this.rrssTypes = res)
      ).subscribe();
    }

    private _setEditPostForm(data) {
      this.rrssConnectionForm.patchValue({
        name: data.name,
        rrssType: data.type,
        tokens: data.tokens
      });
    }

    compareFn(c1, c2): boolean {
      return c1 && c2 ? c1.id === c2.id : c1 === c2;
    }

}
