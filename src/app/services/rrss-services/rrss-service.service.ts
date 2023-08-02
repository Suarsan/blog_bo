import { Injectable, isDevMode } from '@angular/core';
import { map, tap } from 'rxjs/internal/operators';
import { RrssDaoService } from 'src/app/dao/rrss-dao-services/rrss-dao.service';
import { UserStorageService } from '../user-storage-service/user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RrssService {

  constructor(private rrssDaoService: RrssDaoService,
              private userStorageService: UserStorageService) { }

  public getRrssTypes() {
    return this.rrssDaoService.getRrssTypes().pipe(
      tap(res => isDevMode() ? console.dir(res) : null),
      map(res => res['getRrssTypes'])
    );
  }
  
  public getRrssConnections() {
    return this.rrssDaoService.getRrssConnections().pipe(
      tap(res => isDevMode() ? console.dir(res) : null),
      map(res => res['getRrssConnections'])
    );
  }
  
  public getRrssDiffusions() {
    return this.rrssDaoService.getRrssDiffusions().pipe(
      tap(res => isDevMode() ? console.dir(res) : null),
      map(res => res['getRrssDiffusions'])
    );
  }
  
  public getRrssConnection(name) {
    return this.rrssDaoService.getRrssConnection(name).pipe(
      tap(res => isDevMode() ? console.dir(res) : null),
      map(res => res['getRrssConnection'])
    );
  }
  
  public addRrssConnection(rrssConnectionForm) {
    return this.rrssDaoService.addRrssConnection(
      this.userStorageService.getContext().context,
      rrssConnectionForm.get('name').value,
      rrssConnectionForm.get('tokens').value,
      rrssConnectionForm.get('rrssType').value.id,
    ).pipe(
      tap(res => isDevMode() ? console.dir(res) : null),
      map(res => res['addRrssConnection'])
    );
  }

  public addRrssDiffusion(rrssDiffusionForm) {
    return this.rrssDaoService.addRrssDiffusion(
      this.userStorageService.getContext().context,
      rrssDiffusionForm.get('name').value,
      rrssDiffusionForm.get('content').value,
      rrssDiffusionForm.get('date').value,
      rrssDiffusionForm.get('rrssConnection').value.name,
    ).pipe(
      tap(res => isDevMode() ? console.dir(res) : null),
      map(res => res['addRrssDiffusion'])
    );
  }
  
  public updateRrssConnection(rrssConnectionForm) {
    return this.rrssDaoService.updateRrssConnection(
      this.userStorageService.getContext().context,
      rrssConnectionForm.get('name').value,
      rrssConnectionForm.get('tokens').value,
      rrssConnectionForm.get('rrssType').value.id
    ).pipe(
      tap(res => isDevMode() ? console.dir(res) : null),
      map(res => res['updateRrssConnection'])
    );
  }
  
  public deleteRrssConnection(name) {
    return this.rrssDaoService.deleteRrssConnection(
      this.userStorageService.getContext().context,
      name
    ).pipe(
      tap(res => isDevMode() ? console.dir(res) : null),
      map(res => res['deleteRrssConnection'])
    );
  }
  public deleteRrssDiffusion(name) {
    return this.rrssDaoService.deleteRrssDiffusion(
      this.userStorageService.getContext().context,
      name
    ).pipe(
      tap(res => isDevMode() ? console.dir(res) : null),
      map(res => res['deleteRrssDiffusion'])
    );
  }

}
