export class UserCreated {
  constructor(
    public readonly id: string,
    public readonly email: string,
  ) {}
}
