import { ReactNode, SVGProps } from "react";
import { USER_ROLE, USER_STATUS } from "../constant";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};


export interface IChildren {
  children: ReactNode;
}

export interface IQueryOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  searchTerm?: string;
  fields?: string;
  categoryId?: string;
}

export type TPost = {
  _id: string;
  userId: TUser;
  title: string;
  description: string;
  images: string[];
  categoryId: TCategory;
  upVote: string[];
  upVoteSize: number;
  downVote: string[];
  isPremium: boolean;
  updatedAt: string;
  sharedForm:string;
}

export type TUser = {
  _id: string,
  email?: string,
  name?: string,
  profilePhoto?: string,
  role?: keyof typeof USER_ROLE;
  status?: keyof typeof USER_STATUS;
  isVerified?: boolean,
  following?: string[];
  followers?: string[];
  mobileNumber?: string;
  isDeleted?: boolean,
  createdAt?: Date;
  updatedAt?: Date;
}

export type TCategory = {
  _id: string;
  name: string;
  file: string;
}

export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
  disabled?: boolean;
  defaultValue?:string | undefined;
}


export type TFollow = {
  _id: string,
  email: string,
  name: string,
  profilePhoto: string
}