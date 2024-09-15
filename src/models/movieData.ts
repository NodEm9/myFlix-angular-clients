export class MoviesData {
  constructor(
    public _id: string,
    public Title: string,
    public Description: string,
    public ImageUrl: string,
    public Genre: string,
    public Director: string,
    public FavoriteMovies: [],
    public isFavorite: boolean  
  ){}
} 