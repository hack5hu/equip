export interface User {
  id: number;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  password: string;
  createdBy:string;
  updatedBy:string;

  // Add other fields as needed
}

export interface QueryResult<T> extends Array<T> {}
