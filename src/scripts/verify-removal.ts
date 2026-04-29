import Claim from '../models/Claim';
import mongoose from 'mongoose';

async function verify() {
  console.log('Verifying Email field removal...');
  
  const hasEmailInSchema = Claim.schema.paths.email !== undefined;
  
  if (hasEmailInSchema) {
    console.error('FAIL: Email field still exists in Claim schema!');
    process.exit(1);
  } else {
    console.log('PASS: Email field is removed from Claim schema.');
    process.exit(0);
  }
}

verify();
