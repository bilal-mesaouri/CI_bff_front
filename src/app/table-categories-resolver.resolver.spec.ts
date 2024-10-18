import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { tableCategoriesResolverResolver } from './table-categories-resolver.resolver';

describe('tableCategoriesResolverResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => tableCategoriesResolverResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
