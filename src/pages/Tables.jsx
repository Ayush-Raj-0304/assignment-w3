import DataTable from '../components/DataTable'

const users = [
  { name: 'John Doe', email: 'john.doe@example.com', title: 'Software Engineer', role: 'Admin', status: 'Active' },
  { name: 'Jane Smith', email: 'jane.smith@example.com', title: 'Product Manager', role: 'Member', status: 'Inactive' },
  { name: 'Mike Johnson', email: 'mike.johnson@example.com', title: 'UX Designer', role: 'Member', status: 'Active' },
  { name: 'Sarah Wilson', email: 'sarah.wilson@example.com', title: 'Data Scientist', role: 'Admin', status: 'Active' },
  { name: 'David Brown', email: 'david.brown@example.com', title: 'DevOps Engineer', role: 'Member', status: 'Inactive' },
  { name: 'Emily Davis', email: 'emily.davis@example.com', title: 'Frontend Developer', role: 'Member', status: 'Active' },
  { name: 'Michael Clark', email: 'michael.clark@example.com', title: 'Backend Developer', role: 'Member', status: 'Active' },
  { name: 'Jessica Rodriguez', email: 'jessica.rodriguez@example.com', title: 'QA Engineer', role: 'Member', status: 'Active' },
  { name: 'Chris Lee', email: 'chris.lee@example.com', title: 'Project Manager', role: 'Admin', status: 'Inactive' },
  { name: 'Amanda Martinez', email: 'amanda.martinez@example.com', title: 'Marketing Specialist', role: 'Member', status: 'Active' },
  { name: 'Robert Hernandez', email: 'robert.hernandez@example.com', title: 'Systems Analyst', role: 'Member', status: 'Active' },
  { name: 'Linda Gonzalez', email: 'linda.gonzalez@example.com', title: 'HR Manager', role: 'Admin', status: 'Active' },
]

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'title', label: 'Title' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { 
    key: 'status', 
    label: 'Status',
    render: (user) => (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
        user.status === 'Active' 
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      }`}>
        {user.status}
      </span>
    )
  },
]

export default function Tables({ theme }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Users</h1>
      <p className={`-mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
        A list of all the users in your account including their name, title, email and role.
      </p>
      <DataTable columns={columns} data={users} theme={theme} />
    </div>
  )
} 