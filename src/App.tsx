import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  PieChart, 
  Settings, 
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  TrendingUp,
  TrendingDown,
  DollarSign,
  UserPlus,
  Activity
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';

// --- TypeScript Interfaces ---
interface NavItem {
  id: string;
  label: string;
  icon: React.FC<any>;
}

interface StatData {
  title: string;
  value: string;
  change: number;
  isPositive: boolean;
  icon: React.FC<any>;
}

interface Transaction {
  id: string;
  user: string;
  date: string;
  amount: number;
  status: 'Hoàn thành' | 'Đang xử lý' | 'Thất bại';
}

// --- Mock Data ---
const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Tổng quan', icon: LayoutDashboard },
  { id: 'employees', label: 'Nhân sự', icon: Users },
  { id: 'projects', label: 'Dự án', icon: Briefcase },
  { id: 'finances', label: 'Tài chính', icon: PieChart },
  { id: 'settings', label: 'Cài đặt', icon: Settings },
];

const STATS_DATA: StatData[] = [
  { title: 'Tổng Doanh Thu', value: '4.520.000.000 ₫', change: 12.5, isPositive: true, icon: DollarSign },
  { title: 'Lợi Nhuận', value: '1.250.000.000 ₫', change: 8.2, isPositive: true, icon: TrendingUp },
  { title: 'Nhân Sự Mới', value: '24', change: -2.4, isPositive: false, icon: UserPlus },
  { title: 'Dự Án Đang Chạy', value: '12', change: 15.0, isPositive: true, icon: Activity },
];

const REVENUE_DATA = [
  { month: 'T1', revenue: 400, cost: 240 },
  { month: 'T2', revenue: 300, cost: 139 },
  { month: 'T3', revenue: 200, cost: 980 },
  { month: 'T4', revenue: 278, cost: 390 },
  { month: 'T5', revenue: 189, cost: 480 },
  { month: 'T6', revenue: 239, cost: 380 },
  { month: 'T7', revenue: 349, cost: 430 },
];

const RECENT_TRANSACTIONS: Transaction[] = [
  { id: 'TRX-001', user: 'Công ty TNHH Alpha', date: '2023-10-25', amount: 12500000, status: 'Hoàn thành' },
  { id: 'TRX-002', user: 'Nguyễn Văn A', date: '2023-10-24', amount: 3400000, status: 'Đang xử lý' },
  { id: 'TRX-003', user: 'Tập đoàn Beta', date: '2023-10-23', amount: 55000000, status: 'Hoàn thành' },
  { id: 'TRX-004', user: 'Dịch vụ Cloud XYZ', date: '2023-10-22', amount: 8000000, status: 'Thất bại' },
];

// --- Components ---
const StatCard: React.FC<{ stat: StatData }> = ({ stat }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-indigo-50 rounded-lg">
        <stat.icon className="w-6 h-6 text-indigo-600" />
      </div>
      <div className={`flex items-center text-sm font-medium ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {stat.isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
        {Math.abs(stat.change)}%
      </div>
    </div>
    <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
    <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
  </div>
);

const Header: React.FC<{ toggleSidebar: () => void }> = ({ toggleSidebar }) => (
  <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-20">
    <div className="flex items-center">
      <button 
        onClick={toggleSidebar}
        className="mr-4 lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
      >
        <Menu className="h-6 w-6" />
      </button>
      <div className="relative hidden sm:block w-64 lg:w-96">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
          placeholder="Tìm kiếm thông tin..."
        />
      </div>
    </div>
    
    <div className="flex items-center space-x-4">
      <button className="relative p-2 text-gray-400 hover:text-gray-500 transition-colors rounded-full hover:bg-gray-100">
        <Bell className="h-6 w-6" />
        <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
      </button>
      
      <div className="flex items-center border-l border-gray-200 pl-4">
        <div className="flex items-center cursor-pointer">
          <img
            className="h-8 w-8 rounded-full object-cover border border-gray-200"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="User avatar"
          />
          <div className="ml-3 hidden md:block">
            <p className="text-sm font-medium text-gray-700">Trần Quản Trị</p>
            <p className="text-xs font-medium text-gray-500">Giám đốc (CEO)</p>
          </div>
        </div>
      </div>
    </div>
  </header>
);

const RecentTransactionsTable: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hoàn thành': return 'bg-green-100 text-green-800';
      case 'Đang xử lý': return 'bg-yellow-100 text-yellow-800';
      case 'Thất bại': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Giao dịch gần đây</h3>
        <button className="text-sm text-indigo-600 hover:text-indigo-900 font-medium">Xem tất cả</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã GD</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách hàng / Đối tác</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số tiền</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {RECENT_TRANSACTIONS.map((trx) => (
              <tr key={trx.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{trx.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trx.user}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trx.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(trx.amount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(trx.status)}`}>
                    {trx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function EnterpriseDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg">
              E
            </div>
            <span className="text-xl font-bold tracking-tight">ERP System</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-3 space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors group ${
                    isActive 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <item.icon className={`w-5 h-5 mr-3 flex-shrink-0 ${isActive ? 'text-indigo-200' : 'text-slate-400 group-hover:text-slate-300'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800">
          <button className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors group">
            <LogOut className="w-5 h-5 mr-3 flex-shrink-0 text-slate-400 group-hover:text-slate-300" />
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header toggleSidebar={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto focus:outline-none bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Tổng quan doanh nghiệp</h1>
              <p className="text-sm text-gray-500 mt-1">Theo dõi các chỉ số quan trọng và hoạt động gần đây của công ty.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              {STATS_DATA.map((stat, index) => (
                <StatCard key={index} stat={stat} />
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Main Chart */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">Doanh thu & Chi phí (2023)</h3>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={REVENUE_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} dx={-10} />
                      <RechartsTooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Legend verticalAlign="top" height={36} iconType="circle" />
                      <Line type="monotone" name="Doanh thu (Tỷ VNĐ)" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                      <Line type="monotone" name="Chi phí (Tỷ VNĐ)" dataKey="cost" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Secondary Chart / Metric */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">Tỉ lệ hoàn thành dự án</h3>
                <div className="h-64 w-full flex items-center justify-center">
                   <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={REVENUE_DATA.slice(0,4)} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" hide />
                      <YAxis dataKey="month" type="category" axisLine={false} tickLine={false} />
                      <RechartsTooltip cursor={{fill: 'transparent'}} />
                      <Bar dataKey="revenue" name="Tiến độ (%)" fill="#4f46e5" radius={[0, 4, 4, 0]} barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">Trung bình toàn công ty</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">78%</p>
                </div>
              </div>
            </div>

            {/* Data Table Section */}
            <RecentTransactionsTable />

          </div>
        </main>
      </div>
    </div>
  );
}