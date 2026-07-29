export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  image: string;
  company?: {
    title: string;
  };
}