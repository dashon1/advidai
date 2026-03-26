import { useState } from 'react'
import { 
  Upload, 
  Wand2, 
  Image, 
  FileText, 
  User2, 
  Mic2, 
  Type, 
  Palette,
  Music,
  Hash,
  Sparkles,
  Play,
  Clock,
  ChevronRight,
  Check
} from 'lucide-react'
import { 
  productAnalysisResults, 
  scriptTemplates, 
  digitalAvatars, 
  voiceLibrary, 
  subtitleStyles,
  trendingData,
  brandKits,
  generationQueue
} from '../data/mockData'

const steps = [
  { id: 1, label: 'Product', icon: Image },
  { id: 2, label: 'Script', icon: FileText },
  { id: 3, label: 'Avatar', icon: User2 },
  { id: 4, label: 'Voice', icon: Mic2 },
  { id: 5, label: 'Style', icon: Type },
]

// Feature 1: AI Product Analyzer
function ProductAnalyzer({ onComplete }: { onComplete: () => void }) {
  const [uploaded, setUploaded] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [analyzed, setAnalyzed] = useState(false)

  const handleUpload = () => {
    setUploaded(true)
    setAnalyzing(true)
    setTimeout(() => {
      setAnalyzing(false)
      setAnalyzed(true)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">AI Product Analyzer</h3>
        <p className="text-sm text-text-secondary">Upload a product image and let AI extract key information</p>
      </div>

      {!uploaded ? (
        <button 
          onClick={handleUpload}
          className="w-full h-48 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-3 hover:border-accent-primary hover:bg-accent-dim/50 transition-all group"
        >
          <Upload className="w-10 h-10 text-text-tertiary group-hover:text-accent-primary transition-colors" />
          <span className="text-text-secondary group-hover:text-text-primary">Click to upload product image</span>
          <span className="text-xs text-text-tertiary">PNG, JPG up to 10MB</span>
        </button>
      ) : analyzing ? (
        <div className="w-full h-48 bg-bg-surface border border-border rounded-xl flex flex-col items-center justify-center gap-3">
          <div className="w-10 h-10 border-2 border-accent-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-text-secondary">Analyzing product...</span>
        </div>
      ) : analyzed && (
        <div className="bg-bg-surface border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 bg-bg-active rounded-lg flex items-center justify-center">
              <Image className="w-8 h-8 text-text-tertiary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-text-primary">{productAnalysisResults.productName}</h4>
              <p className="text-sm text-text-tertiary">{productAnalysisResults.category}</p>
            </div>
            <Check className="w-6 h-6 text-status-success" />
          </div>

          <div>
            <p className="text-xs text-text-tertiary uppercase tracking-wider mb-2">Key Features</p>
            <div className="flex flex-wrap gap-2">
              {productAnalysisResults.keyFeatures.map((f, i) => (
                <span key={i} className="px-3 py-1 bg-bg-hover text-text-secondary text-xs rounded-md">{f}</span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-text-tertiary uppercase tracking-wider mb-2">Suggested Hooks</p>
            <ul className="space-y-2">
              {productAnalysisResults.suggestedHooks.map((h, i) => (
                <li key={i} className="text-sm text-text-secondary flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent-primary" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs text-text-tertiary uppercase tracking-wider mb-2">Detected Colors</p>
            <div className="flex gap-2">
              {productAnalysisResults.colorPalette.map((c, i) => (
                <div key={i} className="w-8 h-8 rounded-md border border-border" style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={onComplete}
        disabled={!analyzed}
        className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue to Script
      </button>
    </div>
  )
}

// Feature 2: Smart Script Engine
function ScriptEngine({ onComplete }: { onComplete: () => void }) {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [customScript, setCustomScript] = useState('')

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">Smart Script Engine</h3>
        <p className="text-sm text-text-secondary">Choose a template or write your own script</p>
      </div>

      <div className="space-y-3">
        {scriptTemplates.map(template => (
          <button
            key={template.id}
            onClick={() => setSelectedTemplate(template.id)}
            className={`w-full p-4 text-left rounded-xl border transition-all ${
              selectedTemplate === template.id 
                ? 'border-accent-primary bg-accent-dim' 
                : 'border-border hover:border-border-strong hover:bg-bg-hover'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-semibold text-text-primary">{template.name}</span>
              {selectedTemplate === template.id && <Check className="w-5 h-5 text-accent-primary" />}
            </div>
            <p className="text-sm text-accent-primary mb-1">{template.hook}</p>
            <p className="text-sm text-text-secondary mb-1">{template.body}</p>
            <p className="text-sm text-status-success">{template.cta}</p>
          </button>
        ))}
      </div>

      <div>
        <p className="text-xs text-text-tertiary uppercase tracking-wider mb-2">Or write custom</p>
        <textarea
          value={customScript}
          onChange={(e) => setCustomScript(e.target.value)}
          placeholder="Write your own script..."
          className="w-full h-32 p-4 bg-bg-surface border border-border rounded-xl text-text-primary placeholder:text-text-tertiary focus:border-accent-primary focus:outline-none resize-none"
        />
      </div>

      <button 
        onClick={onComplete}
        disabled={!selectedTemplate && !customScript}
        className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue to Avatar
      </button>
    </div>
  )
}

// Feature 3: Digital Human Studio
function AvatarStudio({ onComplete }: { onComplete: () => void }) {
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null)
  const [selectedEmotion, setSelectedEmotion] = useState('neutral')

  const currentAvatar = digitalAvatars.find(a => a.id === selectedAvatar)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">Digital Human Studio</h3>
        <p className="text-sm text-text-secondary">Select an AI avatar for your video</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {digitalAvatars.map(avatar => (
          <button
            key={avatar.id}
            onClick={() => setSelectedAvatar(avatar.id)}
            className={`p-4 rounded-xl border transition-all ${
              selectedAvatar === avatar.id 
                ? 'border-accent-primary bg-accent-dim' 
                : 'border-border hover:border-border-strong hover:bg-bg-hover'
            }`}
          >
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-bg-active flex items-center justify-center">
              <User2 className="w-8 h-8 text-text-tertiary" />
            </div>
            <p className="font-medium text-text-primary text-center">{avatar.name}</p>
            <p className="text-xs text-text-tertiary text-center">{avatar.style}</p>
          </button>
        ))}
      </div>

      {currentAvatar && (
        <div>
          <p className="text-xs text-text-tertiary uppercase tracking-wider mb-2">Select Emotion</p>
          <div className="flex flex-wrap gap-2">
            {currentAvatar.emotions.map(emotion => (
              <button
                key={emotion}
                onClick={() => setSelectedEmotion(emotion)}
                className={`px-4 py-2 text-sm rounded-lg border transition-all ${
                  selectedEmotion === emotion 
                    ? 'border-accent-primary bg-accent-dim text-accent-primary' 
                    : 'border-border text-text-secondary hover:border-border-strong'
                }`}
              >
                {emotion}
              </button>
            ))}
          </div>
        </div>
      )}

      <button 
        onClick={onComplete}
        disabled={!selectedAvatar}
        className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue to Voice
      </button>
    </div>
  )
}

// Feature 4: Voice Library
function VoiceSelector({ onComplete }: { onComplete: () => void }) {
  const [selectedVoice, setSelectedVoice] = useState<number | null>(null)
  const [playing, setPlaying] = useState<number | null>(null)

  const handlePlay = (id: number) => {
    setPlaying(id)
    setTimeout(() => setPlaying(null), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">Voice Library</h3>
        <p className="text-sm text-text-secondary">Choose a voice for narration</p>
      </div>

      <div className="space-y-3">
        {voiceLibrary.map(voice => (
          <div
            key={voice.id}
            onClick={() => setSelectedVoice(voice.id)}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              selectedVoice === voice.id 
                ? 'border-accent-primary bg-accent-dim' 
                : 'border-border hover:border-border-strong hover:bg-bg-hover'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-bg-active flex items-center justify-center">
                  <Mic2 className="w-6 h-6 text-text-tertiary" />
                </div>
                <div>
                  <p className="font-medium text-text-primary">{voice.name}</p>
                  <p className="text-sm text-text-tertiary">{voice.accent} - {voice.tone}</p>
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); handlePlay(voice.id) }}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  playing === voice.id 
                    ? 'bg-accent-primary text-bg-base' 
                    : 'bg-bg-hover text-text-secondary hover:text-text-primary'
                }`}
              >
                <Play className="w-5 h-5" fill={playing === voice.id ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={onComplete}
        disabled={!selectedVoice}
        className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue to Style
      </button>
    </div>
  )
}

// Feature 5: Dynamic Subtitle Engine
function SubtitlePicker({ onComplete }: { onComplete: () => void }) {
  const [selectedStyle, setSelectedStyle] = useState<number | null>(null)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">Dynamic Subtitle Engine</h3>
        <p className="text-sm text-text-secondary">Choose a subtitle style</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {subtitleStyles.map(style => (
          <button
            key={style.id}
            onClick={() => setSelectedStyle(style.id)}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedStyle === style.id 
                ? 'border-accent-primary bg-accent-dim' 
                : 'border-border hover:border-border-strong hover:bg-bg-hover'
            }`}
          >
            <div className="h-16 bg-bg-active rounded-lg mb-3 flex items-end justify-center pb-2">
              <span className="text-xs text-text-primary font-medium px-2 py-1 bg-bg-base/80 rounded">
                Sample Text
              </span>
            </div>
            <p className="font-medium text-text-primary">{style.name}</p>
            <p className="text-xs text-text-tertiary">{style.font} - {style.animation}</p>
          </button>
        ))}
      </div>

      <button 
        onClick={onComplete}
        disabled={!selectedStyle}
        className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Generate Video
      </button>
    </div>
  )
}

// Feature 7: Brand Kit
function BrandKitPanel() {
  const kit = brandKits[0]
  
  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="w-5 h-5 text-accent-primary" />
        <h3 className="font-semibold text-text-primary">Brand Kit</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-xs text-text-tertiary uppercase mb-2">Logo</p>
          <div className="w-full h-16 bg-bg-surface border border-border rounded-lg flex items-center justify-center">
            <span className="text-accent-primary font-bold">BRAND LOGO</span>
          </div>
        </div>
        
        <div>
          <p className="text-xs text-text-tertiary uppercase mb-2">Colors</p>
          <div className="flex gap-2">
            {kit.colors.map((c, i) => (
              <div key={i} className="flex-1 h-8 rounded border border-border" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
        
        <div>
          <p className="text-xs text-text-tertiary uppercase mb-2">Typography</p>
          <p className="text-sm text-text-secondary">Heading: {kit.fonts.heading}</p>
          <p className="text-sm text-text-secondary">Body: {kit.fonts.body}</p>
        </div>
      </div>
    </div>
  )
}

// Feature 8: Trend Integration
function TrendPanel() {
  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <Hash className="w-5 h-5 text-accent-primary" />
        <h3 className="font-semibold text-text-primary">Trending Now</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-xs text-text-tertiary uppercase mb-2 flex items-center gap-1">
            <Music className="w-3 h-3" /> Sounds
          </p>
          <div className="space-y-2">
            {trendingData.sounds.slice(0, 3).map(sound => (
              <div key={sound.id} className="flex items-center justify-between p-2 bg-bg-surface rounded-lg">
                <span className="text-sm text-text-secondary">{sound.name}</span>
                <span className="text-xs text-text-tertiary font-mono">{sound.uses}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <p className="text-xs text-text-tertiary uppercase mb-2">Hashtags</p>
          <div className="flex flex-wrap gap-2">
            {trendingData.hashtags.map(tag => (
              <span key={tag.id} className="px-2 py-1 bg-accent-dim text-accent-primary text-xs rounded">
                {tag.tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Generation Queue
function QueuePanel() {
  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-accent-primary" />
        <h3 className="font-semibold text-text-primary">Generation Queue</h3>
      </div>
      
      <div className="space-y-3">
        {generationQueue.map(job => (
          <div key={job.id} className="p-3 bg-bg-surface rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-text-primary">{job.name}</span>
              <span className="text-xs text-text-tertiary font-mono">{job.eta}</span>
            </div>
            <div className="h-1.5 bg-bg-active rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent-primary rounded-full transition-all"
                style={{ width: `${job.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Generate() {
  const [currentStep, setCurrentStep] = useState(1)

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <ProductAnalyzer onComplete={() => setCurrentStep(2)} />
      case 2: return <ScriptEngine onComplete={() => setCurrentStep(3)} />
      case 3: return <AvatarStudio onComplete={() => setCurrentStep(4)} />
      case 4: return <VoiceSelector onComplete={() => setCurrentStep(5)} />
      case 5: return <SubtitlePicker onComplete={() => setCurrentStep(1)} />
      default: return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Video Generator</h1>
        <p className="text-text-secondary mt-1">Create AI-powered TikTok ad videos</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-2 p-4 bg-bg-elevated rounded-xl">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <button
              onClick={() => setCurrentStep(step.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                currentStep === step.id 
                  ? 'bg-accent-primary text-bg-base' 
                  : currentStep > step.id 
                    ? 'bg-status-success/20 text-status-success' 
                    : 'text-text-tertiary hover:text-text-secondary'
              }`}
            >
              <step.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{step.label}</span>
            </button>
            {index < steps.length - 1 && (
              <ChevronRight className="w-4 h-4 text-text-tertiary mx-1" />
            )}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <div className="card">
            {renderStep()}
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-1">
          <div className="card aspect-[9/16] flex flex-col items-center justify-center">
            <div className="w-full h-full bg-bg-surface rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 to-transparent" />
              <div className="text-center">
                <Wand2 className="w-12 h-12 text-text-tertiary mx-auto mb-3" />
                <p className="text-text-secondary text-sm">Video Preview</p>
                <p className="text-text-tertiary text-xs mt-1">Complete all steps to generate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Side Panels */}
        <div className="lg:col-span-1 space-y-6">
          <BrandKitPanel />
          <TrendPanel />
          <QueuePanel />
        </div>
      </div>
    </div>
  )
}
