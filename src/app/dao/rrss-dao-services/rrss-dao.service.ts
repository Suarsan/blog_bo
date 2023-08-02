import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/internal/operators/map';
import { AddRrssDiffusion } from 'src/app/types/addRrssDiffusion.type';
import { AddRrssConnection } from 'src/app/types/addRrssType.type';
import { RrssConnection } from 'src/app/types/rrssConnection.type';
import { RrssDiffusion } from 'src/app/types/rrssDiffusion.type';
import { UpdateRrssConnection } from 'src/app/types/updateRrssType.type';

@Injectable({
  providedIn: 'root'
})
export class RrssDaoService {

  constructor(private apollo: Apollo) { }

  public getRrssTypes() {
    const getRrssTypes = gql`
      query getRrssTypes{
        getRrssTypes {
          id
          name
        }
      }
    `;
    return this.apollo.watchQuery({
      query: getRrssTypes
    }).valueChanges.pipe(map(result => result.data));
  }
  
  public getRrssConnections() {
    const getRrssConnections = gql`
      query getRrssConnections{
        getRrssConnections {
          id
          name
          tokens
          type{
            name
          }
        }
      }
    `;
    return this.apollo.watchQuery({
      query: getRrssConnections
    }).valueChanges.pipe(map(result => result.data));
  }
  
  public getRrssDiffusions() {
    const getRrssDiffusions = gql`
      query getRrssDiffusions{
        getRrssDiffusions {
          id
          name
          content
          uuid
          rrssConnection{
            name
            type{
              name
            }
          }
        }
      }
    `;
    return this.apollo.watchQuery({
      query: getRrssDiffusions
    }).valueChanges.pipe(map(result => result.data));
  }
  
  public getRrssConnection(name) {
    const getRrssConnection = gql`
      query getRrssConnection($name: String!){
        getRrssConnection(name: $name) {
          id
          name
          tokens
          type{
            id
            name
          }
        }
      }
    `;
    return this.apollo.watchQuery({
      query: getRrssConnection,
      variables: { name }
    }).valueChanges.pipe(map(result => result.data));
  }

  public addRrssConnection(context, name, tokens, typeId) {
    const addRrssConnectionInput = { context, name, tokens, typeId };
    const addRrssConnection = gql`
      mutation addRrssConnection($addRrssConnectionInput: AddRrssConnectionInput!){
        addRrssConnection(addRrssConnectionInput: $addRrssConnectionInput) {
          id
        }
      }
    `;
    return this.apollo.mutate<AddRrssConnection>({
      mutation: addRrssConnection,
      variables: {addRrssConnectionInput}
    }).pipe(map(result => result.data.addRrssConnection));
  }
  
  public addRrssDiffusion(context, name, content, date, rrssConnectionName) {
    const addRrssDiffusionInput = { context, name, content, date, rrssConnectionName };
    const addRrssDiffusion = gql`
      mutation addRrssDiffusion($addRrssDiffusionInput: AddRrssDiffusionInput!){
        addRrssDiffusion(addRrssDiffusionInput: $addRrssDiffusionInput) {
          id
        }
      }
    `;
    return this.apollo.mutate<AddRrssDiffusion>({
      mutation: addRrssDiffusion,
      variables: {addRrssDiffusionInput}
    }).pipe(map(result => result.data.addRrssDiffusion));
  }

  public updateRrssConnection(context, name, tokens, typeId) {
    const updateRrssConnectionInput = { context, name, tokens, typeId };
    const updateRrssConnection = gql`
      mutation updateRrssConnection($updateRrssConnectionInput: UpdateRrssConnectionInput!){
        updateRrssConnection(updateRrssConnectionInput: $updateRrssConnectionInput) {
          id
        }
      }
    `;
    return this.apollo.mutate<UpdateRrssConnection>({
      mutation: updateRrssConnection,
      variables: {updateRrssConnectionInput}
    }).pipe(map(result => result.data.updateRrssConnection));
  }

  public deleteRrssDiffusion(context, name) {
    const deleteRrssDiffusionInput = { context, name };
    const deleteRrssDiffusion = gql`
      mutation deleteRrssDiffusion($deleteRrssDiffusionInput: DeleteRrssDiffusionInput!){
        deleteRrssDiffusion(deleteRrssDiffusionInput: $deleteRrssDiffusionInput) {
          id
        }
      }
    `;
    return this.apollo.mutate<RrssDiffusion>({
      mutation: deleteRrssDiffusion,
      variables: {deleteRrssDiffusionInput}
    }).pipe(map(result => result.data));
  }

  public deleteRrssConnection(context, name) {
    const deleteRrssConnectionInput = { context, name };
    const deleteRrssConnection = gql`
      mutation deleteRrssConnection($deleteRrssConnectionInput: DeleteRrssConnectionInput!){
        deleteRrssConnection(deleteRrssConnectionInput: $deleteRrssConnectionInput) {
          id
        }
      }
    `;
    return this.apollo.mutate<RrssConnection>({
      mutation: deleteRrssConnection,
      variables: {deleteRrssConnectionInput}
    }).pipe(map(result => result.data));
  }
}
