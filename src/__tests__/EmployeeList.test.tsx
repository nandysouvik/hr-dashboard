import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { EmployeeList } from '../components/EmployeeList';
import { AppProvider } from '../context/AppContext';

// Mock API response
jest.mock('../../api/mockApi', () => ({
    api: {
        getEmployees: jest.fn(() =>
            Promise.resolve({
                data: [
                    { id: 'e1', name: 'Alice', department: 'HR', designation: 'Manager', status: 'active' },
                ],
                total: 1,
            })
        ),
    },
}));

describe('EmployeeList', () => {
    test('displays employee after fetching', async () => {
        render(
            <AppProvider>
                <EmployeeList />
            </AppProvider>
        );

        expect(screen.getByText(/loading employees/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('Alice')).toBeInTheDocument();
        });
    });
});