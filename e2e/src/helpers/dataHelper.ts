export class DataHelper {

  public _baseUrl: string;
  public _favoritesPageUrl: string;
  public _ctaText: string;
  public _searchibleWordFirst: string;
  public _searchibleWordSecond: string;
  public _desiredLanguage: string;

  constructor() {
      this._baseUrl = "/";
      this._favoritesPageUrl = "/favorites";
      this._ctaText = "Please, change the filters for get the list";
      this._searchibleWordFirst = "Python";
      this._searchibleWordSecond = "Java";
      this._desiredLanguage = "JavaScript"
  };
}
