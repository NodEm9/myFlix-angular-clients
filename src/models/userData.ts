export class UserData {
  constructor(
    public Username: string,
    public Password: string,
    public Email: string,
    public Birthday: Date,
    public favoriteMovies?: [],
    public Role?: string
  ) { }
 }