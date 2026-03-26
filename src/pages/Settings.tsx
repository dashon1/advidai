import { useState } from 'react'
import { User, Key, CreditCard, Link2, Users, Eye, EyeOff, Copy, Check, Trash2, Plus } from 'lucide-react'
import { userProfile, apiKeys, usageStats, billingHistory } from '../data/mockData'

const tabs = [
  { id: 'account', label: 'Account', icon: User },
  { id: 'api', label: 'API Keys', icon: Key },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'integrations', label: 'Integrations', icon: Link2 },
  { id: 'team', label: 'Team', icon: Users },
]

function AccountSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Profile Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-text-secondary mb-2">Full Name</label>
            <input 
              type="text" 
              defaultValue={userProfile.name}
              className="w-full h-12 px-4 bg-bg-surface border border-border rounded-lg text-text-primary focus:border-accent-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-2">Email</label>
            <input 
              type="email" 
              defaultValue={userProfile.email}
              className="w-full h-12 px-4 bg-bg-surface border border-border rounded-lg text-text-primary focus:border-accent-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-2">Company</label>
            <input 
              type="text" 
              defaultValue={userProfile.company}
              className="w-full h-12 px-4 bg-bg-surface border border-border rounded-lg text-text-primary focus:border-accent-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-2">Timezone</label>
            <select className="w-full h-12 px-4 bg-bg-surface border border-border rounded-lg text-text-primary focus:border-accent-primary focus:outline-none">
              <option>{userProfile.timezone}</option>
              <option>UTC-5 (Eastern)</option>
              <option>UTC+0 (GMT)</option>
              <option>UTC+1 (CET)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-border">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Notifications</h3>
        <div className="space-y-4">
          {['Campaign alerts', 'Weekly reports', 'Video generation complete', 'Budget warnings'].map(item => (
            <label key={item} className="flex items-center justify-between p-4 bg-bg-surface rounded-lg cursor-pointer">
              <span className="text-text-secondary">{item}</span>
              <div className="w-12 h-6 bg-accent-primary rounded-full p-1 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full ml-auto" />
              </div>
            </label>
          ))}
        </div>
      </div>

      <button className="btn-primary">Save Changes</button>
    </div>
  )
}

function APIKeysSettings() {
  const [showKey, setShowKey] = useState<number | null>(null)
  const [copied, setCopied] = useState<number | null>(null)

  const handleCopy = (id: number) => {
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">API Keys</h3>
          <p className="text-sm text-text-secondary mt-1">Manage your API access credentials</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Create Key
        </button>
      </div>

      <div className="space-y-4">
        {apiKeys.map(key => (
          <div key={key.id} className="p-4 bg-bg-surface border border-border rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-medium text-text-primary">{key.name}</p>
                <p className="text-xs text-text-tertiary">Created {key.created}</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setShowKey(showKey === key.id ? null : key.id)}
                  className="p-2 text-text-tertiary hover:text-text-primary transition-colors"
                >
                  {showKey === key.id ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                <button 
                  onClick={() => handleCopy(key.id)}
                  className="p-2 text-text-tertiary hover:text-text-primary transition-colors"
                >
                  {copied === key.id ? <Check className="w-5 h-5 text-status-success" /> : <Copy className="w-5 h-5" />}
                </button>
                <button className="p-2 text-status-error hover:text-status-error/80 transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <code className="flex-1 px-4 py-2 bg-bg-base rounded-lg font-mono text-sm text-text-secondary">
                {showKey === key.id ? 'pk_live_abc123xyz789...' : key.prefix}
              </code>
              <span className="text-xs text-text-tertiary">Last used: {key.lastUsed}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function BillingSettings() {
  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <div className="p-6 bg-gradient-to-br from-accent-dim to-bg-elevated border border-accent-primary/30 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-accent-primary uppercase tracking-wider mb-1">Current Plan</p>
            <p className="text-2xl font-bold text-text-primary">{userProfile.plan}</p>
            <p className="text-sm text-text-secondary mt-1">$499/month - Unlimited video generations</p>
          </div>
          <button className="btn-secondary">Upgrade Plan</button>
        </div>
      </div>

      {/* Usage Stats */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Usage This Month</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-bg-surface border border-border rounded-lg">
            <p className="text-xs text-text-tertiary uppercase mb-2">API Calls</p>
            <p className="text-lg font-mono text-text-primary mb-2">
              {usageStats.apiCalls.used.toLocaleString()} / {usageStats.apiCalls.limit.toLocaleString()}
            </p>
            <div className="h-2 bg-bg-active rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent-primary rounded-full"
                style={{ width: `${(usageStats.apiCalls.used / usageStats.apiCalls.limit) * 100}%` }}
              />
            </div>
          </div>
          <div className="p-4 bg-bg-surface border border-border rounded-lg">
            <p className="text-xs text-text-tertiary uppercase mb-2">Storage</p>
            <p className="text-lg font-mono text-text-primary mb-2">
              {usageStats.storage.used} GB / {usageStats.storage.limit} GB
            </p>
            <div className="h-2 bg-bg-active rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent-primary rounded-full"
                style={{ width: `${(usageStats.storage.used / usageStats.storage.limit) * 100}%` }}
              />
            </div>
          </div>
          <div className="p-4 bg-bg-surface border border-border rounded-lg">
            <p className="text-xs text-text-tertiary uppercase mb-2">Video Generations</p>
            <p className="text-lg font-mono text-text-primary mb-2">
              {usageStats.generations.used} / {usageStats.generations.limit}
            </p>
            <div className="h-2 bg-bg-active rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent-primary rounded-full"
                style={{ width: `${(usageStats.generations.used / usageStats.generations.limit) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Billing History</h3>
        <div className="bg-bg-surface border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">Date</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">Description</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-text-secondary uppercase">Amount</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-text-secondary uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {billingHistory.map(item => (
                <tr key={item.id} className="border-b border-border-subtle">
                  <td className="py-4 px-4 font-mono text-sm text-text-primary">{item.date}</td>
                  <td className="py-4 px-4 text-sm text-text-secondary">{item.description}</td>
                  <td className="py-4 px-4 text-right font-mono text-sm text-text-primary">${item.amount}</td>
                  <td className="py-4 px-4 text-right">
                    <span className="status-active">{item.status}</span>
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

function IntegrationsSettings() {
  const integrations = [
    { id: 1, name: 'TikTok Ads', description: 'Connect your TikTok Ads Manager', connected: true },
    { id: 2, name: 'Meta Business', description: 'Sync with Facebook & Instagram Ads', connected: true },
    { id: 3, name: 'Google Ads', description: 'Export to Google Ads campaigns', connected: false },
    { id: 4, name: 'Shopify', description: 'Import products from your store', connected: false },
    { id: 5, name: 'Zapier', description: 'Automate workflows with 5000+ apps', connected: false },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">Integrations</h3>
        <p className="text-sm text-text-secondary mt-1">Connect external platforms and services</p>
      </div>

      <div className="space-y-4">
        {integrations.map(integration => (
          <div key={integration.id} className="p-4 bg-bg-surface border border-border rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-bg-active rounded-lg flex items-center justify-center">
                <Link2 className="w-6 h-6 text-text-tertiary" />
              </div>
              <div>
                <p className="font-medium text-text-primary">{integration.name}</p>
                <p className="text-sm text-text-tertiary">{integration.description}</p>
              </div>
            </div>
            <button className={integration.connected ? 'btn-secondary h-10 px-4' : 'btn-primary h-10 px-4'}>
              {integration.connected ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function TeamSettings() {
  const teamMembers = [
    { id: 1, name: 'Alex Chen', email: 'alex@company.com', role: 'Owner' },
    { id: 2, name: 'Sarah Kim', email: 'sarah@company.com', role: 'Admin' },
    { id: 3, name: 'Mike Johnson', email: 'mike@company.com', role: 'Editor' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Team Members</h3>
          <p className="text-sm text-text-secondary mt-1">Manage your team access</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Invite Member
        </button>
      </div>

      <div className="space-y-4">
        {teamMembers.map(member => (
          <div key={member.id} className="p-4 bg-bg-surface border border-border rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-accent-dim rounded-full flex items-center justify-center">
                <span className="text-accent-primary font-semibold">{member.name[0]}</span>
              </div>
              <div>
                <p className="font-medium text-text-primary">{member.name}</p>
                <p className="text-sm text-text-tertiary">{member.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <select className="h-10 px-4 bg-bg-elevated border border-border rounded-lg text-text-secondary text-sm">
                <option>{member.role}</option>
                <option>Admin</option>
                <option>Editor</option>
                <option>Viewer</option>
              </select>
              {member.role !== 'Owner' && (
                <button className="p-2 text-status-error hover:text-status-error/80 transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState('account')

  const renderContent = () => {
    switch (activeTab) {
      case 'account': return <AccountSettings />
      case 'api': return <APIKeysSettings />
      case 'billing': return <BillingSettings />
      case 'integrations': return <IntegrationsSettings />
      case 'team': return <TeamSettings />
      default: return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Settings</h1>
        <p className="text-text-secondary mt-1">Manage your account and preferences</p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-accent-dim text-accent-primary' 
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="card">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}
