// Mock Data for AdVidAI

export const campaignStats = {
  activeCampaigns: 12,
  totalViews: 2457893,
  conversionRate: 4.8,
  revenueToday: 12450,
}

export const activityLog = [
  { id: 1, type: 'video_generated', message: 'Video "Summer Sale" generated successfully', time: '2 min ago' },
  { id: 2, type: 'campaign_started', message: 'Campaign "Black Friday" started', time: '15 min ago' },
  { id: 3, type: 'threshold_reached', message: 'Campaign "Holiday Promo" reached 100K views', time: '32 min ago' },
  { id: 4, type: 'video_generated', message: 'Video "New Product Launch" generated', time: '1 hour ago' },
  { id: 5, type: 'campaign_paused', message: 'Campaign "Spring Collection" paused', time: '2 hours ago' },
]

export const campaigns = [
  { id: 1, name: 'Summer Sale 2026', status: 'active', budget: 5000, spent: 3240, views: 125400, ctr: 4.2, conversions: 342 },
  { id: 2, name: 'Black Friday Promo', status: 'active', budget: 10000, spent: 1200, views: 45000, ctr: 5.1, conversions: 89 },
  { id: 3, name: 'Holiday Collection', status: 'paused', budget: 7500, spent: 6800, views: 234500, ctr: 3.8, conversions: 567 },
  { id: 4, name: 'New Product Launch', status: 'draft', budget: 3000, spent: 0, views: 0, ctr: 0, conversions: 0 },
  { id: 5, name: 'Spring Clearance', status: 'active', budget: 4500, spent: 2100, views: 89000, ctr: 4.5, conversions: 201 },
  { id: 6, name: 'Valentine Special', status: 'completed', budget: 6000, spent: 6000, views: 312000, ctr: 5.8, conversions: 890 },
]

export const systemHealth = {
  apiUptime: 99.9,
  queueLength: 3,
  processingSpeed: 2.4,
}

export const performanceData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  views: Math.floor(Math.random() * 10000) + 5000,
  clicks: Math.floor(Math.random() * 500) + 200,
  conversions: Math.floor(Math.random() * 50) + 10,
}))

export const templates = [
  { id: 1, name: 'Product Showcase', duration: '15s', style: 'Modern', thumbnail: '/templates/showcase.jpg' },
  { id: 2, name: 'Flash Sale', duration: '10s', style: 'Energetic', thumbnail: '/templates/flash.jpg' },
  { id: 3, name: 'Testimonial', duration: '30s', style: 'Authentic', thumbnail: '/templates/testimonial.jpg' },
  { id: 4, name: 'Brand Story', duration: '60s', style: 'Cinematic', thumbnail: '/templates/brand.jpg' },
  { id: 5, name: 'Tutorial', duration: '45s', style: 'Educational', thumbnail: '/templates/tutorial.jpg' },
  { id: 6, name: 'Unboxing', duration: '20s', style: 'Casual', thumbnail: '/templates/unboxing.jpg' },
]

export const aiModels = [
  { id: 'standard', name: 'Standard', description: 'Fast generation, good quality', speed: 'Fast', quality: 'Good' },
  { id: 'premium', name: 'Premium', description: 'Balanced speed and quality', speed: 'Medium', quality: 'High' },
  { id: 'ultra', name: 'Ultra HD', description: 'Best quality, slower generation', speed: 'Slow', quality: 'Ultra' },
]

export const generationQueue = [
  { id: 1, name: 'Summer Promo v2', progress: 78, eta: '2 min' },
  { id: 2, name: 'Product Demo', progress: 45, eta: '5 min' },
  { id: 3, name: 'Brand Intro', progress: 12, eta: '8 min' },
]

export const analyticsKpis = {
  ctr: { current: 4.8, previous: 4.2, change: 14.3 },
  cvr: { current: 2.3, previous: 2.1, change: 9.5 },
  cpa: { current: 12.5, previous: 14.2, change: -12.0 },
  roas: { current: 3.4, previous: 2.9, change: 17.2 },
}

export const funnelData = [
  { stage: 'Impressions', value: 1250000 },
  { stage: 'Clicks', value: 62500 },
  { stage: 'Views', value: 45000 },
  { stage: 'Conversions', value: 1125 },
]

export const videoRankings = [
  { id: 1, name: 'Summer Flash Sale', views: 234500, ctr: 6.2, conversions: 567, trend: 'up' },
  { id: 2, name: 'Product Reveal', views: 189000, ctr: 5.8, conversions: 423, trend: 'up' },
  { id: 3, name: 'Customer Story', views: 156000, ctr: 4.9, conversions: 312, trend: 'down' },
  { id: 4, name: 'Brand Values', views: 123000, ctr: 4.5, conversions: 234, trend: 'stable' },
  { id: 5, name: 'How-To Guide', views: 98000, ctr: 4.2, conversions: 189, trend: 'up' },
]

export const userProfile = {
  name: 'Alex Chen',
  email: 'alex@company.com',
  company: 'TechCorp Inc.',
  timezone: 'UTC-8 (Pacific)',
  plan: 'Enterprise',
}

export const apiKeys = [
  { id: 1, name: 'Production Key', prefix: 'pk_live_****', created: '2026-01-15', lastUsed: '2 hours ago' },
  { id: 2, name: 'Development Key', prefix: 'pk_test_****', created: '2025-12-01', lastUsed: '5 days ago' },
]

export const usageStats = {
  apiCalls: { used: 45000, limit: 100000 },
  storage: { used: 12.5, limit: 50 },
  generations: { used: 234, limit: 500 },
}

export const billingHistory = [
  { id: 1, date: '2026-02-01', description: 'Enterprise Plan - Monthly', amount: 499, status: 'paid' },
  { id: 2, date: '2026-01-01', description: 'Enterprise Plan - Monthly', amount: 499, status: 'paid' },
  { id: 3, date: '2025-12-01', description: 'Enterprise Plan - Monthly', amount: 499, status: 'paid' },
]

// Feature-specific mock data

export const productAnalysisResults = {
  productName: 'Premium Wireless Headphones',
  category: 'Electronics / Audio',
  keyFeatures: ['Active Noise Cancellation', '40-hour Battery', 'Bluetooth 5.3', 'Premium Leather'],
  targetAudience: 'Tech enthusiasts, Music lovers, Remote workers',
  suggestedHooks: [
    'Experience silence like never before',
    '40 hours of pure audio bliss',
    'Your soundtrack, no distractions',
  ],
  colorPalette: ['#1a1a2e', '#16213e', '#0f3460', '#e94560'],
}

export const scriptTemplates = [
  {
    id: 1,
    name: 'Problem-Solution',
    hook: 'Tired of [problem]?',
    body: 'Introducing [product] - the solution you have been waiting for.',
    cta: 'Shop now and transform your experience!',
  },
  {
    id: 2,
    name: 'FOMO Creator',
    hook: 'Everyone is talking about this...',
    body: '[Product] is breaking the internet. Here is why 100,000+ customers love it.',
    cta: 'Join the movement - limited stock available!',
  },
  {
    id: 3,
    name: 'Before/After',
    hook: 'My life changed when I discovered this',
    body: 'Before [product]: struggling with [pain]. After: [benefit achieved].',
    cta: 'Your transformation starts here',
  },
]

export const digitalAvatars = [
  { id: 1, name: 'Emma', style: 'Professional', emotions: ['neutral', 'happy', 'excited', 'serious'] },
  { id: 2, name: 'Marcus', style: 'Casual', emotions: ['neutral', 'happy', 'surprised', 'thoughtful'] },
  { id: 3, name: 'Sophia', style: 'Energetic', emotions: ['neutral', 'excited', 'happy', 'urgent'] },
  { id: 4, name: 'James', style: 'Authoritative', emotions: ['neutral', 'confident', 'serious', 'approving'] },
  { id: 5, name: 'Aria', style: 'Friendly', emotions: ['neutral', 'warm', 'happy', 'encouraging'] },
  { id: 6, name: 'Leo', style: 'Trendy', emotions: ['neutral', 'cool', 'excited', 'impressed'] },
]

export const voiceLibrary = [
  { id: 1, name: 'Sarah', accent: 'American', tone: 'Warm & Friendly', preview: true },
  { id: 2, name: 'Oliver', accent: 'British', tone: 'Professional', preview: true },
  { id: 3, name: 'Mei', accent: 'Asian-American', tone: 'Energetic', preview: true },
  { id: 4, name: 'Carlos', accent: 'Latin American', tone: 'Passionate', preview: true },
  { id: 5, name: 'Nina', accent: 'European', tone: 'Sophisticated', preview: true },
  { id: 6, name: 'David', accent: 'Australian', tone: 'Casual', preview: true },
]

export const subtitleStyles = [
  { id: 1, name: 'Minimal', font: 'Inter', animation: 'fade', position: 'bottom' },
  { id: 2, name: 'Bold Impact', font: 'Impact', animation: 'pop', position: 'center' },
  { id: 3, name: 'Karaoke', font: 'Montserrat', animation: 'highlight', position: 'bottom' },
  { id: 4, name: 'Typewriter', font: 'Courier', animation: 'typewrite', position: 'bottom' },
  { id: 5, name: 'Neon Glow', font: 'Orbitron', animation: 'glow', position: 'center' },
]

export const abVariants = [
  { id: 'A', hook: 'Problem-Solution', avatar: 'Emma', voice: 'Sarah', cta: 'Shop Now', confidence: 85 },
  { id: 'B', hook: 'FOMO Creator', avatar: 'Marcus', voice: 'Oliver', cta: 'Get Yours', confidence: 78 },
  { id: 'C', hook: 'Before/After', avatar: 'Sophia', voice: 'Mei', cta: 'Transform Today', confidence: 72 },
]

export const brandKits = [
  {
    id: 1,
    name: 'Primary Brand',
    logo: 'logo-primary.svg',
    colors: ['#22d3ee', '#0f172a', '#e4e4e7'],
    fonts: { heading: 'Inter', body: 'Inter' },
  },
]

export const trendingData = {
  sounds: [
    { id: 1, name: 'Chill Vibes Beat', uses: '2.3M', trending: true },
    { id: 2, name: 'Energetic Pop', uses: '1.8M', trending: true },
    { id: 3, name: 'Corporate Upbeat', uses: '890K', trending: false },
  ],
  hashtags: [
    { id: 1, tag: '#TikTokMadeMeBuyIt', posts: '45M' },
    { id: 2, tag: '#SmallBusiness', posts: '32M' },
    { id: 3, tag: '#ProductReview', posts: '28M' },
    { id: 4, tag: '#MustHave2026', posts: '15M' },
  ],
}

export const exportFormats = [
  { id: 'tiktok', name: 'TikTok', ratio: '9:16', resolution: '1080x1920', maxDuration: '60s' },
  { id: 'reels', name: 'Instagram Reels', ratio: '9:16', resolution: '1080x1920', maxDuration: '90s' },
  { id: 'shorts', name: 'YouTube Shorts', ratio: '9:16', resolution: '1080x1920', maxDuration: '60s' },
  { id: 'stories', name: 'Stories', ratio: '9:16', resolution: '1080x1920', maxDuration: '15s' },
  { id: 'feed', name: 'Feed Post', ratio: '1:1', resolution: '1080x1080', maxDuration: '60s' },
]
