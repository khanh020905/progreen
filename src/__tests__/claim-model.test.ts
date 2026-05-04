import mongoose from 'mongoose';
import Claim from '../models/Claim';

describe('Claim Model Schema', () => {
  it('should not have an email field in the schema', () => {
    // This should FAIL if the email field is present in the schema
    expect(Claim.schema.paths.email).toBeUndefined();
  });

  it('should have structured address fields in the schema', () => {
    expect(Claim.schema.paths.province).toBeDefined();
    expect(Claim.schema.paths.district).toBeDefined();
    expect(Claim.schema.paths.ward).toBeDefined();
    expect(Claim.schema.paths.streetAddress).toBeDefined();
  });
});
