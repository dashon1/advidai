import { useState } from 'react'
import { TrendingUp, TrendingDown, Eye, MousePointer, DollarSign, Target, Calendar, Download, ArrowUp, ArrowDown, Minus } from 'lucide-react'
import { analyticsKpis, funnelData, videoRankings, performanceData } from '../data/mockData'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts'

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}

const dateRanges = ['Today', '7 Days', '30 Days', '90 Days', 'All Time']

function KPICard({ label, current, previous, change, prefix = '', suffix = '' }: { 
  label: string; current: number; previous: number; change: number; prefix?: string; suffix?: string 
}) {
  const isPositive = change >= 0
  const isNegative = label === 'CPA' ? change > 0 : change < 0
  
  return (
    <div className="card">
      <p className="text-xs font-mono text-text-tertiary uppercase tracking-wider mb-3">{label}</p>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-mono font-medium text-text-primary">
            {prefix}{current}{suffix}
          </p>
          <p className="text-sm text-text-tertiary mt-1">
            vs {prefix}{previous}{suffix} prev
          </p>
        </div>
        <div className={`flex items-center gap-1 px-3 py-1.5 rounded-md ${
          isNegative ? 'bg-status-error/15 text-status-error' : 'bg-status-success/15 text-status-success'
        }`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span className="font-mono text-sm">{isPositive ? '+' : ''}{change}%</span>
        </div>
      </div>
    </div>
  )
}

function FunnelChart() {
  const maxValue = funnelData[0].value
  
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-text-primary mb-6">Conversion Funnel</h3>
      <div className="space-y-4">
        {funnelData.map((stage, index) => {
          const width = (stage.value / maxValue) * 100
          const conversionRate = index > 0 ? ((stage.value / funnelData[index - 1].value) * 100).toFixed(1) : '100'
          
          return (
            <div key={stage.stage}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-text-secondary">{stage.stage}</span>
                <span className="font-mono text-sm text-text-primary">{formatNumber(stage.value)}</span>
              </div>
              <div className="relative h-10 bg-bg-surface rounded-lg overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-accent-primary to-accent-hover rounded-lg transition-all duration-500 flex items-center justify-end pr-3"
                  style={{ width: `${width}%` }}
                >
                  {index > 0 && (
                    <span className="text-xs font-mono text-bg-base font-medium">{conversionRate}%</span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function PerformanceChart() {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Performance Over Time</h3>
        <div className="flex gap-2">
          {['Views', 'Clicks', 'Conversions'].map(metric => (
            <button 
              key={metric}
              className="px-3 py-1.5 text-xs font-medium text-text-secondary bg-bg-hover rounded-md hover:text-text-primary transition-colors"
            >
              {metric}
            </button>
          ))}
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={performanceData}>
            <defs>
              <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
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
              fill="url(#colorPerf)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function TopVideosTable() {
  const TrendIcon = ({ trend }: { trend: string }) => {
    if (trend === 'up') return <ArrowUp className="w-4 h-4 text-status-success" />
    if (trend === 'down') return <ArrowDown className="w-4 h-4 text-status-error" />
    return <Minus className="w-4 h-4 text-text-tertiary" />
  }
  
  return (
    <div className="card overflow-hidden">
      <h3 className="text-lg font-semibold text-text-primary mb-6">Top Performing Videos</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Rank</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Video</th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Views</th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">CTR</th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Conversions</th>
              <th className="text-center py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Trend</th>
            </tr>
          </thead>
          <tbody>
            {videoRankings.map((video, index) => (
              <tr key={video.id} className="border-b border-border-subtle hover:bg-bg-hover transition-colors">
                <td className="py-4 px-4">
                  <span className={`w-8 h-8 rounded-md flex items-center justify-center font-mono font-bold ${
                    index === 0 ? 'bg-accent-dim text-accent-primary' : 'bg-bg-surface text-text-tertiary'
                  }`}>
                    {index + 1}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-9 bg-bg-surface rounded flex items-center justify-center">
                      <Eye className="w-4 h-4 text-text-tertiary" />
                    </div>
                    <span className="text-sm font-medium text-text-primary">{video.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-right font-mono text-sm text-text-primary">
                  {formatNumber(video.views)}
                </td>
                <td className="py-4 px-4 text-right font-mono text-sm text-text-primary">
                  {video.ctr}%
                </td>
                <td className="py-4 px-4 text-right font-mono text-sm text-text-primary">
                  {formatNumber(video.conversions)}
                </td>
                <td className="py-4 px-4 text-center">
                  <TrendIcon trend={video.trend} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function HeatmapChart() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const hours = Array.from({ length: 24 }, (_, i) => i)
  
  // Generate mock heatmap data
  const getIntensity = (day: number, hour: number) => {
    const peak = (hour >= 10 && hour <= 14) || (hour >= 18 && hour <= 22)
    const weekend = day >= 5
    let base = Math.random() * 0.5
    if (peak) base += 0.3
    if (weekend && hour >= 12) base += 0.2
    return Math.min(base, 1)
  }
  
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-text-primary mb-6">Engagement Heatmap</h3>
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="flex gap-1 mb-1 pl-12">
            {hours.filter((_, i) => i % 3 === 0).map(h => (
              <div key={h} className="w-6 text-center text-xs text-text-tertiary font-mono">
                {h}
              </div>
            ))}
          </div>
          {days.map((day, dayIndex) => (
            <div key={day} className="flex items-center gap-1 mb-1">
              <span className="w-10 text-xs text-text-tertiary">{day}</span>
              {hours.map(hour => {
                const intensity = getIntensity(dayIndex, hour)
                return (
                  <div
                    key={hour}
                    className="w-6 h-6 rounded-sm transition-colors"
                    style={{ 
                      backgroundColor: `rgba(34, 211, 238, ${intensity})` 
                    }}
                    title={`${day} ${hour}:00 - ${(intensity * 100).toFixed(0)}% engagement`}
                  />
                )
              })}
            </div>
          ))}
          <div className="flex items-center gap-2 mt-4 pl-12">
            <span className="text-xs text-text-tertiary">Low</span>
            <div className="flex gap-0.5">
              {[0.1, 0.3, 0.5, 0.7, 0.9].map(opacity => (
                <div 
                  key={opacity} 
                  className="w-6 h-4 rounded-sm"
                  style={{ backgroundColor: `rgba(34, 211, 238, ${opacity})` }}
                />
              ))}
            </div>
            <span className="text-xs text-text-tertiary">High</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Analytics() {
  const [selectedRange, setSelectedRange] = useState('30 Days')
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Analytics</h1>
          <p className="text-text-secondary mt-1">Deep-dive into your campaign performance</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary h-12 px-4 flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export
          </button>
        </div>
      </div>

      {/* Date Range Selector */}
      <div className="flex items-center gap-4 p-4 bg-bg-elevated rounded-xl">
        <Calendar className="w-5 h-5 text-text-tertiary" />
        <div className="flex gap-1">
          {dateRanges.map(range => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                selectedRange === range 
                  ? 'bg-accent-primary text-bg-base' 
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard 
          label="Click-Through Rate" 
          current={analyticsKpis.ctr.current} 
          previous={analyticsKpis.ctr.previous}
          change={analyticsKpis.ctr.change}
          suffix="%"
        />
        <KPICard 
          label="Conversion Rate" 
          current={analyticsKpis.cvr.current} 
          previous={analyticsKpis.cvr.previous}
          change={analyticsKpis.cvr.change}
          suffix="%"
        />
        <KPICard 
          label="Cost Per Acquisition" 
          current={analyticsKpis.cpa.current} 
          previous={analyticsKpis.cpa.previous}
          change={analyticsKpis.cpa.change}
          prefix="$"
        />
        <KPICard 
          label="Return on Ad Spend" 
          current={analyticsKpis.roas.current} 
          previous={analyticsKpis.roas.previous}
          change={analyticsKpis.roas.change}
          suffix="x"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FunnelChart />
        <HeatmapChart />
      </div>

      {/* Performance Chart */}
      <PerformanceChart />

      {/* Top Videos Table */}
      <TopVideosTable />
    </div>
  )
}
