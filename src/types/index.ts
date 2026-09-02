/** Shared application types. Domain models come from `@prisma/client`. */

export type ApiSuccess<T> = { data: T };
export type ApiError = { error: { message: string; fields?: Record<string, string[]> } };
export type ApiResult<T> = ApiSuccess<T> | ApiError;

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  perPage: number;
  pageCount: number;
}

export type NavItem = {
  label: string;
  href: string;
  icon?: string;
};
