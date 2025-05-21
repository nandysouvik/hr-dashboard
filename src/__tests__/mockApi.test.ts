import { api } from '../api/mockApi';

describe('Mock API', () => {
    test('getCompanies returns company list', async () => {
        const companies = await api.getCompanies();
        expect(Array.isArray(companies)).toBe(true);
        expect(companies[0]).toHaveProperty('id');
    });

    test('getLeaveBalance returns leave data for a company', async () => {
        const balance = await api.getLeaveBalance('c1');
        expect(balance).toHaveProperty('used');
        expect(balance).toHaveProperty('available');
    });
});