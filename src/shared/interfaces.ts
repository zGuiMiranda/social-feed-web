import { UUID } from "crypto";

export interface IPost {
  content: string;
  user?: number;
  id?: UUID;
}
