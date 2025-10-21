// ✅ /test/__mocks__/firebase-admin.ts

// Mock Firebase Auth methods
const mockVerifyIdToken = jest.fn();
const mockGetUser = jest.fn();
const mockSetCustomUserClaims = jest.fn();

// auth() must be callable and return an object with mock methods
const mockAuth = jest.fn(() => ({
  verifyIdToken: mockVerifyIdToken,
  getUser: mockGetUser,
  setCustomUserClaims: mockSetCustomUserClaims,
}));

// firestore() mock for database usage
const mockFirestore = jest.fn(() => ({
  collection: jest.fn().mockReturnThis(),
  doc: jest.fn().mockReturnThis(),
  set: jest.fn(),
  get: jest.fn().mockResolvedValue({ exists: true, data: () => ({}) }),
}));

// Main admin mock
const mockAdmin: any = {
  apps: [],
  initializeApp: jest.fn(),
  credential: { cert: jest.fn() },
  auth: mockAuth, // ✅ critical: function returning mock auth object
  firestore: mockFirestore,
};

export default mockAdmin;