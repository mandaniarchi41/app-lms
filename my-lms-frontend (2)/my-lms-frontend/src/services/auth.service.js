// Mock user data
const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'student'
  },
  {
    id: 2,
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin'
  }
];

class AuthService {
  async login(email, password) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = mockUsers.find(
      u => u.email === email && u.password === password
    );

    if (user) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }

    throw new Error('Invalid email or password');
  }

  async signup(userData) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create new user
    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      role: 'student'
    };

    mockUsers.push(newUser);
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  async logout() {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  }

  async getCurrentUser() {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const userJson = localStorage.getItem('user');
    if (!userJson) return null;

    const user = JSON.parse(userJson);
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

export default new AuthService(); 