export interface INavigationButtonItem {
  title: string;
  descriptions: string;
  link: string;
  imageUrl: string;
  imageAlt: string;
}

export interface INavigationButton {
  headerLabel: string;
  items: INavigationButtonItem[];
}
