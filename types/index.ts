export interface User {
  id: string;          
  username: string;    
  password: string;    
}


export interface LoginCredentials {
  username: string;    
  password: string;    
}


export interface Course {
  id: string;          
  name: string;        
  price: number;       
  rating: number;      
  image: string;       
  show: boolean;       
  login: boolean;      
}


export interface CourseProps extends Course {
  onDelete: (id: string) => void;  
  isDeleting?: boolean;            
}




export interface UsersResponse {
  users: User[];       
}

  
export interface CoursesResponse {
  courses: Course[];   
}



export interface UseFetchResult<T> {
  data: T | null;      // Fetched data or null if not loaded
  error: string | null; // Error message or null if no error
  loading: boolean;    // Loading state indicator
}

// ===== COMPONENT STATE TYPES =====

// Form validation state
export interface FormValidation {
  isValid: boolean;    // Whether form is valid
  errors: string[];    // Array of validation error messages
}

// Theme mode type
export type ThemeMode = 'light' | 'dark';

// ===== EVENT HANDLER TYPES =====

// Common event handler types for better type safety
export type InputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;
export type FormSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => void;
export type ButtonClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => void;
