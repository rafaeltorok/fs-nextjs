import { Blog } from "./blog";

export interface User {
  id: number;
  name: string;
  username: string;
  blogs: Blog[];
}
