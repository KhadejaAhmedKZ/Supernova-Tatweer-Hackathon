import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { X, ChevronLeft, ChevronRight, Video, Pause, Play } from 'lucide-react'

const SLIDES = {
  readiness: {
    title:   'What is your Business Readiness Score?',
    titleAr: 'ما هو مؤشر جاهزية عملك؟',
    color: '#f59e0b',
    slides: [
      { emoji:'📊', en:'Your Business Readiness Score shows how prepared you are to start — based on your idea, budget, location, and experience.', ar:'مؤشر الجاهزية يخبرك كم أنت مستعد للبدء — بناءً على فكرتك وميزانيتك وموقعك وخبرتك.' },
      { emoji:'🟢', en:'A score above 70 means strong foundations. You are ready to take your first action this week.', ar:'نتيجة فوق 70 تعني أسساً قوية. أنت جاهز لاتخاذ خطوتك الأولى هذا الأسبوع.' },
      { emoji:'🟡', en:'A score between 50–70 means you can start, but validate your idea before spending money.', ar:'نتيجة 50-70 تعني أنك تستطيع البدء، لكن تحقق من فكرتك قبل إنفاق المال.' },
      { emoji:'💡', en:'To increase your score: define your customers, keep costs realistic, and take one step at a time.', ar:'لرفع نتيجتك: حدد عملاءك، وابقِ التكاليف واقعية، واتخذ خطوة واحدة في كل مرة.' },
    ],
  },
  firstAction: {
    title:   'Why is this your First Action?',
    titleAr: 'لماذا هذه هي خطوتك الأولى؟',
    color: '#fbbf24',
    slides: [
      { emoji:'🎯', en:'Your First Action was chosen because it costs almost nothing and gives you the most useful information before spending.', ar:'تم اختيار خطوتك الأولى لأنها لا تكلف تقريباً شيئاً وتعطيك أكثر المعلومات قبل الإنفاق.' },
      { emoji:'🧪', en:'Before spending money, you need to know if real people will actually buy. This action tests demand with zero financial risk.', ar:'قبل الإنفاق، تحتاج معرفة ما إذا كان الناس سيشترون فعلاً. هذه الخطوة تختبر الطلب بلا خطر مالي.' },
      { emoji:'💬', en:'Talk to 10 real people. Ask: "Would you buy this? How much would you pay?" Their answers are worth more than any business plan.', ar:'تحدث مع 10 أشخاص. اسأل: "هل ستشتري هذا؟ كم ستدفع؟" إجاباتهم تساوي أكثر من أي خطة عمل.' },
      { emoji:'🚀', en:'If 7 out of 10 say YES — that is your green light to move forward with confidence.', ar:'إذا قال 7 من أصل 10 نعم — هذا هو ضوءك الأخضر للمضي قدماً بثقة.' },
    ],
  },
  riskScore: {
    title:   'What is your Risk Score?',
    titleAr: 'ما هو مؤشر المخاطر؟',
    color: '#fb923c',
    slides: [
      { emoji:'🛡️', en:'Your Risk Score measures how risky your current situation is. A lower score means lower risk — better at the start.', ar:'مؤشر المخاطر يقيس مدى خطورة وضعك الحالي. النتيجة الأقل تعني مخاطر أقل — أفضل في البداية.' },
      { emoji:'⚠️', en:'High risk does NOT mean stop. It means be careful — test before spending, validate before registering.', ar:'المخاطر العالية لا تعني التوقف. تعني الحذر — اختبر قبل الإنفاق، وتحقق قبل التسجيل.' },
      { emoji:'📉', en:'You can reduce risk by: testing with real customers, keeping costs low, and taking small steps.', ar:'يمكنك تقليل مخاطرك بـ: الاختبار مع عملاء حقيقيين، وإبقاء التكاليف منخفضة، واتخاذ خطوات صغيرة.' },
      { emoji:'✅', en:'Most successful businesses started in high-risk situations. They tested quickly and adapted fast.', ar:'معظم الأعمال الناجحة بدأت في ظروف عالية المخاطر. اختبروا بسرعة وتكيفوا بسرعة.' },
    ],
  },
  communityFit: {
    title:   'What is Community Fit?',
    titleAr: 'ما هو مدى ملاءمة المجتمع؟',
    color: '#a78bfa',
    slides: [
      { emoji:'🏘️', en:"Community Fit measures how well your idea matches the needs and culture of people in Al Qua'a.", ar:'مدى ملاءمة المجتمع يقيس كيف تتوافق فكرتك مع احتياجات وثقافة الناس في الدحدار.' },
      { emoji:'🐪', en:"Al Qua'a has unique assets: camel farming, dark skies, desert landscapes, and strong family networks. High Community Fit uses these.", ar:'الدحدار لديها مزايا فريدة: مزارع الإبل، والسماء المظلمة، والمناظر الصحراوية، وشبكات الأسرة القوية.' },
      { emoji:'🤝', en:'In Al Qua\'a, people buy from people they know. Community trust is your biggest competitive advantage.', ar:'في الدحدار، الناس يشترون من أشخاص يعرفونهم. الثقة المجتمعية هي أكبر ميزة تنافسية لديك.' },
      { emoji:'📈', en:'To increase Community Fit: offer what locals need, use local ingredients or skills, and serve in Arabic.', ar:'لزيادة ملاءمتك: قدم ما يحتاجه السكان المحليون، واستخدم مكونات محلية، وقدم الخدمة بالعربية.' },
    ],
  },
  license: {
    title:   'How do I register a business in the UAE?',
    titleAr: 'كيف أسجل عملاً تجارياً في الإمارات؟',
    color: '#34d399',
    slides: [
      { emoji:'📋', en:'Step 1: Validate your idea first. Do NOT register before you have paying customers. Registration costs money — validate first.', ar:'الخطوة 1: تحقق من فكرتك أولاً. لا تسجل قبل أن يكون لديك عملاء يدفعون. التسجيل يكلف مالاً.' },
      { emoji:'🏛️', en:'Step 2: Choose your licence type. For home businesses in Abu Dhabi, apply for a Home-Based Business licence from ADDED.', ar:'الخطوة 2: اختر نوع الرخصة. للأعمال المنزلية في أبوظبي، تقدم بطلب رخصة عمل منزلي من دائرة التنمية الاقتصادية.' },
      { emoji:'🍽️', en:'Step 3: For food businesses — get your Food Safety Certificate from ADAFSA before selling publicly.', ar:'الخطوة 3: لأعمال الطعام — احصل على شهادة سلامة الغذاء من أدافسا قبل البيع للعامة.' },
      { emoji:'💵', en:'Cost: A basic trade licence in Abu Dhabi costs AED 1,000–3,000. Wait until your business earns money first.', ar:'التكلفة: رخصة تجارية أساسية في أبوظبي تكلف 1,000-3,000 درهم. انتظر حتى يكسب عملك المال أولاً.' },
    ],
  },
  funding: {
    title:   'How can I apply for funding?',
    titleAr: 'كيف أتقدم للحصول على تمويل؟',
    color: '#f59e0b',
    slides: [
      { emoji:'💰', en:'The best time to apply for funding is AFTER you have validated your idea and made your first sales. Funders want proof.', ar:'أفضل وقت للتقدم للتمويل هو بعد التحقق من فكرتك وتحقيق مبيعاتك الأولى. الممولون يريدون دليلاً.' },
      { emoji:'🏆', en:'Khalifa Fund for Enterprise Development — supports UAE nationals with small business funding. Apply after your first 10 customers.', ar:'صندوق خليفة لتطوير المشاريع — يدعم المواطنين الإماراتيين. تقدم بطلبك بعد أول 10 عملاء.' },
      { emoji:'📄', en:'What you need: A simple business summary, 3 months of sales records, your Emirates ID, and a plan for using the funds.', ar:'ما تحتاجه: ملخص عمل بسيط، وسجلات مبيعات لمدة 3 أشهر، وهويتك الإماراتية، وخطة لاستخدام المال.' },
      { emoji:'🌟', en:"Tip: Start with the Rural Business Grant from Al Ain — less competition, designed for communities like Al Qua'a.", ar:'نصيحة: ابدأ بمنحة الأعمال الريفية من العين — المنافسة فيها أقل وهي مصممة لمجتمعات مثل الدحدار.' },
    ],
  },
}

// ── Modal rendered via portal directly into document.body ──────────────────
function Modal({ ex, onClose }) {
  const [slide,   setSlide]   = useState(0)
  const [arabic,  setArabic]  = useState(false)
  const [playing, setPlaying] = useState(true)
  const [visible, setVisible] = useState(false)

  // Mount animation
  useEffect(() => { requestAnimationFrame(() => setVisible(true)) }, [])

  // Auto-advance
  useEffect(() => {
    if (!playing) return
    if (slide >= ex.slides.length - 1) { setPlaying(false); return }
    const t = setTimeout(() => setSlide(s => s + 1), 3800)
    return () => clearTimeout(t)
  }, [slide, playing, ex.slides.length])

  // Close on Escape
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleClose = useCallback(() => {
    setVisible(false)
    setTimeout(onClose, 280)
  }, [onClose])

  const next = () => { setSlide(s => Math.min(s + 1, ex.slides.length - 1)); setPlaying(false) }
  const prev = () => { setSlide(s => Math.max(s - 1, 0)); setPlaying(false) }
  const cur  = ex.slides[slide]

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) handleClose() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        background: visible ? 'rgba(0,0,0,0.82)' : 'rgba(0,0,0,0)',
        backdropFilter: visible ? 'blur(10px)' : 'blur(0px)',
        transition: 'background 0.28s ease, backdrop-filter 0.28s ease',
      }}
    >
      <div style={{
        width: '100%', maxWidth: 500,
        borderRadius: 24, overflow: 'hidden',
        background: 'rgba(6,2,24,0.98)',
        border: `1px solid ${ex.color}40`,
        boxShadow: `0 0 80px ${ex.color}20, 0 32px 64px rgba(0,0,0,0.6)`,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.96)',
        opacity: visible ? 1 : 0,
        transition: 'transform 0.3s cubic-bezier(0.34,1.2,0.64,1), opacity 0.28s ease',
      }}>

        {/* Header */}
        <div style={{ padding:'18px 20px 16px', borderBottom:`1px solid ${ex.color}18`, display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:12 }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:5 }}>
              <Video size={13} style={{ color: ex.color }} />
              <span style={{ color:`${ex.color}99`, fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.09em' }}>
                Bedaya AI Explains
              </span>
            </div>
            <h3 style={{ color:'#fef9ee', fontSize:14, fontWeight:800, lineHeight:1.35, margin:0 }}>
              {arabic ? ex.titleAr : ex.title}
            </h3>
          </div>
          <div style={{ display:'flex', gap:8, flexShrink:0 }}>
            <button onClick={() => setArabic(a => !a)} style={{
              padding:'5px 10px', borderRadius:8, fontSize:11, fontWeight:700,
              cursor:'pointer', border:`1px solid ${ex.color}25`,
              background:`${ex.color}12`, color: ex.color,
            }}>
              {arabic ? '🇬🇧 EN' : '🇦🇪 AR'}
            </button>
            <button onClick={handleClose} style={{
              width:30, height:30, borderRadius:9,
              display:'flex', alignItems:'center', justifyContent:'center',
              cursor:'pointer', border:'1px solid rgba(255,255,255,0.08)',
              background:'rgba(255,255,255,0.05)', color:'#94a3b8',
            }}>
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Slide */}
        <div style={{ padding:'36px 28px 28px', textAlign:'center', minHeight:220 }}>
          <div key={`emoji-${slide}`} style={{ fontSize:68, marginBottom:22, display:'inline-block',
            animation:'floatY 2.5s ease-in-out infinite' }}>
            {cur.emoji}
          </div>
          <p key={`text-${slide}`} style={{
            color:'#f1ece0', fontSize:15, lineHeight:1.85, margin:0,
            direction: arabic ? 'rtl' : 'ltr',
            animation:'fadeUp 0.35s ease both',
          }}>
            {arabic ? cur.ar : cur.en}
          </p>
        </div>

        {/* Progress dots */}
        <div style={{ display:'flex', justifyContent:'center', gap:7, paddingBottom:4 }}>
          {ex.slides.map((_, i) => (
            <button key={i} onClick={() => { setSlide(i); setPlaying(false) }} style={{
              width: i === slide ? 22 : 7, height: 7, borderRadius: 99,
              border: 'none', cursor: 'pointer', transition: 'all 0.3s',
              background: i === slide ? ex.color : 'rgba(255,255,255,0.15)',
            }} />
          ))}
        </div>

        {/* Slide counter */}
        <p style={{ textAlign:'center', color:'rgba(255,255,255,0.2)', fontSize:11, marginTop:6 }}>
          {slide + 1} / {ex.slides.length}
        </p>

        {/* Controls */}
        <div style={{ padding:'12px 20px 20px', display:'flex', gap:10, alignItems:'center' }}>
          <button onClick={prev} disabled={slide === 0} style={{
            width:40, height:40, borderRadius:12, flexShrink:0,
            display:'flex', alignItems:'center', justifyContent:'center',
            cursor: slide === 0 ? 'not-allowed' : 'pointer',
            border:`1px solid ${slide === 0 ? 'rgba(255,255,255,0.06)' : ex.color+'30'}`,
            background:`${ex.color}0a`,
            color: slide === 0 ? 'rgba(255,255,255,0.15)' : ex.color,
            transition:'all 0.2s',
          }}>
            <ChevronLeft size={18} />
          </button>

          <button onClick={() => setPlaying(p => !p)} style={{
            flex:1, padding:'11px', borderRadius:12, cursor:'pointer',
            border:'none', fontWeight:700, fontSize:13, transition:'all 0.2s',
            background: playing ? `${ex.color}18` : `linear-gradient(135deg,${ex.color}cc,${ex.color})`,
            color: playing ? ex.color : '#1a0a00',
            border: `1px solid ${ex.color}30`,
            display:'flex', alignItems:'center', justifyContent:'center', gap:6,
          }}>
            {playing ? <><Pause size={14} /> Pause</> : <><Play size={14} /> Play</>}
          </button>

          <button
            onClick={slide === ex.slides.length - 1 ? handleClose : next}
            style={{
              width:40, height:40, borderRadius:12, flexShrink:0,
              display:'flex', alignItems:'center', justifyContent:'center',
              cursor:'pointer', border:'none', transition:'all 0.2s',
              background: slide === ex.slides.length - 1
                ? `linear-gradient(135deg,${ex.color}cc,${ex.color})`
                : `${ex.color}18`,
              color: slide === ex.slides.length - 1 ? '#1a0a00' : ex.color,
              border:`1px solid ${ex.color}30`,
            }}>
            {slide === ex.slides.length - 1 ? <X size={15} /> : <ChevronRight size={18} />}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Trigger button ─────────────────────────────────────────────────────────
export default function VideoExplainer({ topic, color }) {
  const [open, setOpen] = useState(false)
  const ex = SLIDES[topic]
  if (!ex) return null

  const btnColor = color || ex.color

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          display:'inline-flex', alignItems:'center', gap:5,
          padding:'4px 11px', borderRadius:99, fontSize:11, fontWeight:700,
          cursor:'pointer', transition:'all 0.2s',
          background:`${btnColor}12`, color: btnColor,
          border:`1px solid ${btnColor}28`,
        }}
        title={`Watch: ${ex.title}`}
      >
        <Video size={11} />
        Watch Explanation 🎥
      </button>

      {/* Portal renders the modal directly into document.body —
          escapes any backdrop-filter stacking context */}
      {open && createPortal(
        <Modal ex={ex} onClose={() => setOpen(false)} />,
        document.body
      )}
    </>
  )
}
