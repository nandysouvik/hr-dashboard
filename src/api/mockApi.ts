// Simulated data for 2 companies

export type Company = { id: string; name: string };
export type Employee = {
    id: string;
    name: string;
    department: string;
    designation: string;
    status: 'active' | 'on leave';
};
export type LeaveBalance = { used: number; available: number };
export type Announcement = {
    id: string;
    author: string;
    content: string;
    timestamp: string;
    companyId: string;
};

const companies: Company[] = [
    { id: 'c1', name: 'Company One' },
    { id: 'c2', name: 'Company Two' },
];

const employees: Record<string, Employee[]> = {
    c1: [
        { id: 'e1', name: 'Alice', department: 'HR', designation: 'Manager', status: 'active' },
        { id: 'e2', name: 'Bob', department: 'IT', designation: 'Developer', status: 'on leave' },
        { id: 'e3', name: 'Charlie', department: 'Finance', designation: 'Analyst', status: 'active' },
        { id: 'e4', name: 'David', department: 'Marketing', designation: 'Executive', status: 'active' },
        { id: 'e5', name: 'Eva', department: 'HR', designation: 'Recruiter', status: 'active' },
        // more employees for pagination demo
    ],
    c2: [
        { id: 'e6', name: 'Fiona', department: 'IT', designation: 'Developer', status: 'active' },
        { id: 'e7', name: 'George', department: 'Finance', designation: 'Manager', status: 'on leave' },
        { id: 'e8', name: 'Hannah', department: 'HR', designation: 'Assistant', status: 'active' },
    ],
};

const leaveBalances: Record<string, LeaveBalance> = {
    c1: { used: 5, available: 15 },
    c2: { used: 2, available: 18 },
};

const announcements: Announcement[] = [
    {
        id: 'a1',
        author: 'Alice',
        content: 'Company One will have a holiday next Monday.',
        timestamp: '2025-05-20T10:00:00Z',
        companyId: 'c1',
    },
    {
        id: 'a2',
        author: 'George',
        content: 'Please submit your reports by Friday.',
        timestamp: '2025-05-19T14:00:00Z',
        companyId: 'c2',
    },
];

// Simulate API delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const api = {
    getCompanies: async (): Promise<Company[]> => {
        await delay(500);
        return companies;
    },
    getEmployees: async (companyId: string, page: number, pageSize: number): Promise<{ data: Employee[]; total: number }> => {
        await delay(700);
        const all = employees[companyId] || [];
        const start = (page - 1) * pageSize;
        const data = all.slice(start, start + pageSize);
        return { data, total: all.length };
    },
    getLeaveBalance: async (companyId: string): Promise<LeaveBalance> => {
        await delay(500);
        return leaveBalances[companyId] || { used: 0, available: 0 };
    },
    getAnnouncements: async (companyId: string): Promise<Announcement[]> => {
        await delay(500);
        return announcements.filter(a => a.companyId === companyId);
    },
};
