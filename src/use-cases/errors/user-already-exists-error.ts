export class UserAlreadyExistsError extends Error {
  constructor() {
    super('User already exists with the same e-mail');
  }
}
