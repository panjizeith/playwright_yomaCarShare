function generateRandomFullName() {
  const firstNames = [
    'Panji', 'Agus', 'Siti', 'Budi', 'Dewi',
    'Ahmad', 'Nur', 'Hafiz', 'Aisyah', 'Zulkifli',
    'Somchai', 'Nattapong', 'Pimchanok', 'Suphansa', 'Anong',
    'Juan', 'Maria', 'Jose', 'Liza', 'Andres',
    'Nguyen', 'Thanh', 'Minh', 'Lan', 'Hanh'
  ];

  const lastNames = [
    'Santoso', 'Putra', 'Wati', 'Halim', 'Prasetyo',
    'Ismail', 'Abdullah', 'Razak', 'Rosli', 'Kamarudin',
    'Sukhum', 'Chaiyasit', 'Boonsri', 'Kittisak', 'Prapapan',
    'Reyes', 'Cruz', 'Garcia', 'Dela Rosa', 'Torres',
    'Tran', 'Le', 'Pham', 'Hoang', 'Vu'
  ];

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
}

function getValidUser() {
  return {
    fullName: generateRandomFullName(),
    email: `testuseryoma_${Date.now()}@mailinator.com`,
    password: "Password123!",
    confirmPassword: "Password123!"
  };
}

// Static/fixed cases
const invalidUser = {
  fullName: "", // required
  email: "invalid-email", // badly formatted
  password: "123", // too short
  confirmPassword: "321" // doesn't match
};

const mismatchedPassword = {
  fullName: generateRandomFullName(),
  email: `mismatch_${Date.now()}@mailinator.com`,
  password: "Password123!",
  confirmPassword: "Password321!"
};

module.exports = {
  getValidUser,         
  invalidUser,          
  mismatchedPassword    
};