import { Page } from '../enums/page.enum';
import { UserType } from '../enums/user-type.enum';



export const pages: Record<UserType, Array<Page>> = {
  [UserType.Admin]: [Page.Users],
  [UserType.Teacher]: [],
  [UserType.Parent]: [],
  [UserType.Student]: []
};