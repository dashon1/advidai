import { 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  MousePointer, 
  DollarSign, 
  Zap,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  PauseCircle
} from 'lucide-react'
import { campaignStats, activityLog, campaigns, systemHealth, performanceData } from '../data/mockData'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}

function DataCard({ label, value, change, icon: Icon }: { label: string; value: string; change?: number; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="data-card">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono text-text-tertiary uppercase tracking-wider">{label}</span>
        <Icon className="w-5 h-5 text-text-tertiary" />
      </div>
      <div className="text-2xl font-mono font-medium text-text-primary mb-1">{value}</div>
      {change !== undefined && (
        <div className={`flex items-center gap-1 text-xs font-mono ${change >= 0 ? 'text-status-success' : 'text-status-error'}`}>
          {change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          <span>{change >= 0 ? '+' : ''}{change}% vs yesterday</span>
        </div>
      )}
    </div>
  )
}

function ActivityItem({ type, message, time }: { type: string; message: string; time: string }) {
  const icons = {
    video_generated: <CheckCircle className="w-4 h-4 text-status-success" />,
    campaign_started: <Zap className="w-4 h-4 text-accent-primary" />,
    threshold_reached: <TrendingUp className="w-4 h-4 text-status-info" />,
    campaign_paused: <PauseCircle className="w-4 h-4 text-status-warning" />,
  }
  
  return (
    <div className="flex items-start gap-3 py-3 border-b border-border-subtle last:border-0">
      <div className="mt-0.5">{icons[type as keyof typeof icons] || <Activity className="w-4 h-4 text-text-tertiary" />}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-text-primary truncate">{message}</p>
        <p className="text-xs text-text-tertiary font-mono">{time}</p>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    active: 'status-active',
    paused: 'status-paused',
    draft: 'status-draft',
    completed: 'bg-status-info/15 text-status-info border border-status-info px-3 py-1 text-xs font-semibold uppercase rounded-sm',
  }
  return <span className={styles[status as keyof typeof styles] || styles.draft}>{status}</span>
}

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Command Center</h1>
        <p className="text-text-secondary mt-1">Real-time overview of your ad campaigns</p>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DataCard 
          label="Active Campaigns" 
          value={campaignStats.activeCampaigns.toString()} 
          change={8.3}
          icon={Zap} 
        />
        <DataCard 
          label="Total Views" 
          value={formatNumber(campaignStats.totalViews)} 
          change={12.4}
          icon={Eye} 
        />
        <DataCard 
          label="Conversion Rate" 
          value={campaignStats.conversionRate + '%'} 
          change={-2.1}
          icon={MousePointer} 
        />
        <DataCard 
          label="Revenue Today" 
          value={'$' + formatNumber(campaignStats.revenueToday)} 
          change={15.7}
          icon={DollarSign} 
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <div className="card">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Activity</h3>
          <div className="space-y-1">
            {activityLog.map(item => (
              <ActivityItem key={item.id} {...item} />
            ))}
          </div>
        </div>

        {/* Performance Chart */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-text-primary">Performance (24h)</h3>
            <div className="flex gap-2">
              {['Views', 'Clicks', 'Conversions'].map(label => (
                <button key={label} className="px-3 py-1.5 text-xs font-medium text-text-secondary bg-bg-hover rounded-md hover:text-text-primary transition-colors">
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="hour" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: '#71717a', fontSize: 12, fontFamily: 'JetBrains Mono' }}
                  interval={3}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: '#71717a', fontSize: 12, fontFamily: 'JetBrains Mono' }}
                  tickFormatter={(v) => formatNumber(v)}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#282828', 
                    border: '1px solid #22d3ee',
                    borderRadius: '8px',
                    fontFamily: 'JetBrains Mono'
                  }}
                  labelStyle={{ color: '#e4e4e7' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#22d3ee" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorViews)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="data-card flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-status-success/20 flex items-center justify-center">
            <Activity className="w-5 h-5 text-status-success" />
          </div>
          <div>
            <p className="text-xs font-mono text-text-tertiary uppercase">API Uptime</p>
            <p className="text-lg font-mono text-text-primary">{systemHealth.apiUptime}%</p>
          </div>
        </div>
        <div className="data-card flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-accent-dim flex items-center justify-center">
            <Clock className="w-5 h-5 text-accent-primary" />
          </div>
          <div>
            <p className="text-xs font-mono text-text-tertiary uppercase">Queue Length</p>
            <p className="text-lg font-mono text-text-primary">{systemHealth.queueLength} jobs</p>
          </div>
        </div>
        <div className="data-card flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-status-info/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-status-info" />
          </div>
          <div>
            <p className="text-xs font-mono text-text-tertiary uppercase">Avg. Processing</p>
            <p className="text-lg font-mono text-text-primary">{systemHealth.processingSpeed}s</p>
          </div>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary">Active Campaigns</h3>
          <button className="btn-secondary h-10 px-4 text-sm">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Campaign</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Budget</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Views</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">CTR</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Conversions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.slice(0, 5).map(campaign => (
                <tr key={campaign.id} className="border-b border-border-subtle hover:bg-bg-hover transition-colors">
                  <td className="py-4 px-4">
                    <span className="text-sm font-medium text-text-primary">{campaign.name}</span>
                  </td>
                  <td className="py-4 px-4">
                    <StatusBadge status={campaign.status} />
                  </td>
                  <td className="py-4 px-4 text-right font-mono text-sm text-text-primary">
                    ${formatNumber(campaign.spent)} / ${formatNumber(campaign.budget)}
                  </td>
                  <td className="py-4 px-4 text-right font-mono text-sm text-text-primary">
                    {formatNumber(campaign.views)}
                  </td>
                  <td className="py-4 px-4 text-right font-mono text-sm text-text-primary">
                    {campaign.ctr}%
                  </td>
                  <td className="py-4 px-4 text-right font-mono text-sm text-text-primary">
                    {formatNumber(campaign.conversions)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
