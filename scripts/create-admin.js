import dotenv from 'dotenv';
import readline from 'readline';

// Load environment variables FIRST
dotenv.config({ path: '.env' });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function createAdmin() {
  try {
    console.log('=== Admin Account Creation ===\n');
    
    // Dynamic imports after env is loaded
    const { default: dbConnect } = await import('../lib/mongodb.js');
    const { Admin } = await import('../lib/models.js');
    const { default: bcrypt } = await import('bcryptjs');
    
    await dbConnect();
    console.log('✓ Connected to MongoDB\n');
    
    const username = await question('Enter admin username (default: admin): ') || 'admin';
    const email = await question('Enter admin email (default: admin@ces.com): ') || 'admin@ces.com';
    const name = await question('Enter admin full name (default: Administrator): ') || 'Administrator';
    const password = await question('Enter admin password (default: admin123): ') || 'admin123';
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      console.log(`\n⚠️  L'utilisateur admin "${username}" existe déjà.`);
      const answer = await question('Voulez-vous réinitialiser/mettre à jour son mot de passe ? (o/N) : ');
      if (answer.toLowerCase() === 'o' || answer.toLowerCase() === 'y' || answer.toLowerCase() === 'oui' || answer.toLowerCase() === 'yes') {
        const newPassword = await question('Nouveau mot de passe (défaut: admin123) : ') || 'admin123';
        existingAdmin.password = await bcrypt.hash(newPassword, 12);
        if (email) existingAdmin.email = email;
        if (name) existingAdmin.name = name;
        await existingAdmin.save();
        console.log('\n✓ Mot de passe mis à jour avec succès !');
        console.log('Identifiant :', username);
        console.log('Mot de passe : [MODIFIÉ ET HACHÉ AVEC SUCCÈS]');
      }
      rl.close();
      process.exit(0);
    }
    
    // Create admin user
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const admin = new Admin({
      username,
      email,
      name,
      password: hashedPassword
    });
    
    await admin.save();
    console.log('\n✓ Admin user created successfully!');
    console.log('\nCredentials:');
    console.log('Username:', username);
    console.log('Password: [ENREGISTRÉ ET HACHÉ EN BASE]');
    console.log('\n⚠️  Conservez bien vos identifiants en lieu sûr !');
    
  } catch (error) {
    console.error('\n❌ Error creating admin:', error.message);
  }
  
  rl.close();
  process.exit(0);
}

createAdmin();