export interface IAPIResponse<T> {
  status: boolean | number;
  message: string;
  data: T | null;
  error?: string;
}
export interface INameable {
  firstName?: string;
  lastName?: string;
  name: string;
}

export interface IDropdownOption {
  label: string;
  value: string;
}

export type EnumType<T> = {
  [key in keyof T]: T[key] extends string | number ? T[key] : never;
};

export enum AttachmentType {
  Image = 'image/jpeg',
  Pdf = 'application/pdf',
}

export interface IAttachment {
  id: string;
  src: string;
  type: AttachmentType;
  name?: string;
  sizeInBytes?: number;
  url: string;
}

export interface ICoordinates {
  lat: number;
  lng: number;
}

export interface RepairRequestFormValues {
  machineryType: string;
  repairIssue: string;
  serviceCategory: string;
  urgency: string;
  notes: string;
  address: string;
  location: ICoordinates;
  attachment: IAttachment[];
}
