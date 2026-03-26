import { useState } from 'react'
import { Plus, Search, Filter, MoreVertical, Play, Pause, Trash2, Copy, Eye, MousePointer, TrendingUp } from 'lucide-react'
import { campaigns, abVariants, exportFormats } from '../data/mockData'

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}

const tabs = ['All', 'Active', 'Paused', 'Completed', 'Draft']

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: 'status-active',
    paused: 'status-paused',
    draft: 'status-draft',
    completed: 'bg-status-info/15 text-status-info border border-status-info px-3 py-1 text-xs font-semibold uppercase rounded-sm',
  }
  return <span className={styles[status] || styles.draft}>{status}</span>
}

function CampaignCard({ campaign }: { campaign: typeof campaigns[0] }) {
  const [showMenu, setShowMenu] = useState(false)
  
  return (
    <div className="card group relative">
      {/* Thumbnail */}
      <div className="aspect-video bg-bg-active rounded-md mb-4 flex items-center justify-center overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/20 to-transparent" />
        <Play className="w-12 h-12 text-text-tertiary group-hover:text-accent-primary transition-colors" />
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-bg-base/80 rounded text-xs font-mono text-text-primary">
          0:15
        </div>
      </div>

      {/* Content */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-text-primary mb-1">{campaign.name}</h3>
          <StatusBadge status={campaign.status} />
        </div>
        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 text-text-tertiary hover:text-text-primary transition-colors"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-8 w-40 bg-bg-elevated border border-border rounded-lg shadow-glow-default z-10">
              <button className="w-full px-4 py-2 text-sm text-left text-text-secondary hover:text-text-primary hover:bg-bg-hover flex items-center gap-2">
                <Play className="w-4 h-4" /> Resume
              </button>
              <button className="w-full px-4 py-2 text-sm text-left text-text-secondary hover:text-text-primary hover:bg-bg-hover flex items-center gap-2">
                <Copy className="w-4 h-4" /> Duplicate
              </button>
              <button className="w-full px-4 py-2 text-sm text-left text-status-error hover:bg-bg-hover flex items-center gap-2">
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border-subtle">
        <div>
          <p className="text-xs text-text-tertiary mb-1 flex items-center gap-1">
            <Eye className="w-3 h-3" /> Views
          </p>
          <p className="font-mono text-sm text-text-primary">{formatNumber(campaign.views)}</p>
        </div>
        <div>
          <p className="text-xs text-text-tertiary mb-1 flex items-center gap-1">
            <MousePointer className="w-3 h-3" /> CTR
          </p>
          <p className="font-mono text-sm text-text-primary">{campaign.ctr}%</p>
        </div>
        <div>
          <p className="text-xs text-text-tertiary mb-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Conv
          </p>
          <p className="font-mono text-sm text-text-primary">{formatNumber(campaign.conversions)}</p>
        </div>
      </div>

      {/* Budget Bar */}
      <div className="mt-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-text-tertiary">Budget</span>
          <span className="font-mono text-text-secondary">${formatNumber(campaign.spent)} / ${formatNumber(campaign.budget)}</span>
        </div>
        <div className="h-1.5 bg-bg-active rounded-full overflow-hidden">
          <div 
            className="h-full bg-accent-primary rounded-full transition-all"
            style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}

// Feature 9: Multi-Platform Export
function ExportModal({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState('tiktok')
  
  return (
    <div className="fixed inset-0 bg-bg-base/80 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-bg-elevated border border-border rounded-xl p-6 w-full max-w-md shadow-glow-strong" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-semibold text-text-primary mb-4">Export Video</h2>
        <p className="text-text-secondary text-sm mb-6">Select platform format for export</p>
        
        <div className="space-y-3 mb-6">
          {exportFormats.map(format => (
            <button
              key={format.id}
              onClick={() => setSelected(format.id)}
              className={`w-full p-4 rounded-lg border text-left transition-all ${
                selected === format.id 
                  ? 'border-accent-primary bg-accent-dim' 
                  : 'border-border hover:border-border-strong hover:bg-bg-hover'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-text-primary">{format.name}</p>
                  <p className="text-xs text-text-tertiary mt-1">
                    {format.ratio} - {format.resolution} - Max {format.maxDuration}
                  </p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selected === format.id ? 'border-accent-primary' : 'border-border'
                }`}>
                  {selected === format.id && <div className="w-2.5 h-2.5 rounded-full bg-accent-primary" />}
                </div>
              </div>
            </button>
          ))}
        </div>
        
        <div className="flex gap-3">
          <button onClick={onClose} className="btn-secondary flex-1">Cancel</button>
          <button className="btn-primary flex-1">Export</button>
        </div>
      </div>
    </div>
  )
}

// Feature 6: A/B Video Variants Panel
function ABVariantsPanel() {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-text-primary mb-4">A/B Video Variants</h3>
      <p className="text-sm text-text-secondary mb-4">AI-generated variants for testing</p>
      
      <div className="space-y-3">
        {abVariants.map(variant => (
          <div key={variant.id} className="p-4 bg-bg-surface border border-border-subtle rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="w-8 h-8 rounded-md bg-accent-dim text-accent-primary font-bold flex items-center justify-center">
                {variant.id}
              </span>
              <span className="text-xs font-mono text-status-success">{variant.confidence}% match</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-text-tertiary">Hook:</span>
                <span className="text-text-secondary ml-1">{variant.hook}</span>
              </div>
              <div>
                <span className="text-text-tertiary">Avatar:</span>
                <span className="text-text-secondary ml-1">{variant.avatar}</span>
              </div>
              <div>
                <span className="text-text-tertiary">Voice:</span>
                <span className="text-text-secondary ml-1">{variant.voice}</span>
              </div>
              <div>
                <span className="text-text-tertiary">CTA:</span>
                <span className="text-text-secondary ml-1">{variant.cta}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="btn-secondary w-full mt-4 h-10">Generate More Variants</button>
    </div>
  )
}

export default function Campaigns() {
  const [activeTab, setActiveTab] = useState('All')
  const [showExport, setShowExport] = useState(false)
  
  const filteredCampaigns = activeTab === 'All' 
    ? campaigns 
    : campaigns.filter(c => c.status.toLowerCase() === activeTab.toLowerCase())

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Campaigns</h1>
          <p className="text-text-secondary mt-1">Manage your video ad campaigns</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowExport(true)} className="btn-secondary h-12 px-6">
            Export
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            New Campaign
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
          <input 
            type="text"
            placeholder="Search campaigns..."
            className="w-full h-12 pl-12 pr-4 bg-bg-elevated border border-border rounded-lg text-text-primary placeholder:text-text-tertiary focus:border-accent-primary focus:outline-none transition-colors"
          />
        </div>
        <button className="h-12 px-4 bg-bg-elevated border border-border rounded-lg text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-bg-elevated rounded-lg w-fit">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab 
                ? 'bg-accent-primary text-bg-base' 
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Campaigns Grid */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCampaigns.map(campaign => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>

        {/* Sidebar - A/B Variants */}
        <div className="lg:col-span-1">
          <ABVariantsPanel />
        </div>
      </div>

      {/* Export Modal */}
      {showExport && <ExportModal onClose={() => setShowExport(false)} />}
    </div>
  )
}
