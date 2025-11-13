import dbConnect from '../lib/mongodb.js';
import { Admin } from '../lib/models.js';
import bcrypt from 'bcryptjs';

async function createAdmin() {
  try {
    await dbConnect();
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }
    
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    const admin = new Admin({
      username: 'admin',
      email: 'admin@marianne.com',
      name: 'Administrator',
      password: hashedPassword
    });
    
    await admin.save();
    console.log('Admin user created successfully');
    console.log('Username: admin');
    console.log('Password: admin123');
    
  } catch (error) {
    console.error('Error creating admin:', error);
  }
  
  process.exit(0);
}

createAdmin();