export class ICategories {
  id: number;
  name: string;
  description: string;
  parentCategoryName: string;
  parentCategoryId: number;

  constructor(
    name: string,
    description: string,
    parentCategoryName: string,
    parentCategoryId: number
  ) {
    this.name = name;
    this.description = description;
    this.parentCategoryName = parentCategoryName;
    this.parentCategoryId = parentCategoryId;
  }
}
