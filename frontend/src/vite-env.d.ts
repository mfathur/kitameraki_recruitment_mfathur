/// <reference types="vite/client" />

type RouterType = {
  title: string;
  path: string;
  element: JSX.Element;
};

type Task = {
  id: string;
  title: string;
  description: string;
  optionals?: {
    [optionalField: string]: unknown;
  };
};

type PaginationMetadata = {
  page_count: int;
  total_count: int;
  page: int;
  per_page: int;
};

type FormFieldMetadata = {
  id: string;
  type: string;
  label: string;
};

type FieldRow = {
  rowIdx: number;
};
