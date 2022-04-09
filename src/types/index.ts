export type Status = 'idle' | 'loading' | 'succeed' | 'failed';

export type ValidationErrors = {
  errors: Record<string, string>;
  message: string;
};

export * from './task';
