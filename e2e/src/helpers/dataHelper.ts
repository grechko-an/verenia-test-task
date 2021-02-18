export class DataHelper {

  public _baseUrl: string;
  public _favoritesPageUrl: string;
  public _ctaText: string;
  public _searchibleWordFirst: string;
  public _searchibleWordSecond: string;
  public _searchibleWordThird: string;
  public _desiredLanguage: string;
  public _validPassword: string;
  public _invalidPassword: string;
  public _indexOfFirstButton: number;
  public _indexOfFirstItem: number;
  public _numberOfAddedToFavoritesItems: number;

  constructor() {
      this._baseUrl = "/";
      this._favoritesPageUrl = "http://localhost:4200/favorites";
      this._ctaText = "Please, change the filters for get the list";
      this._searchibleWordFirst = "Python";
      this._searchibleWordSecond = "Java";
      this._searchibleWordThird = "c";
      this._desiredLanguage = "Shell";
      this._validPassword = "1234";
      this._invalidPassword = "555";
      this._indexOfFirstButton = 0;
      this._indexOfFirstItem = 0;
      this._numberOfAddedToFavoritesItems = 1;
  };
}
