import { useState, useEffect } from 'react'
import { X, Play, ChevronLeft, ChevronRight, Video } from 'lucide-react'

const explanations = {
  readiness: {
    title: 'What is your Business Readiness Score?',
    titleAr: 'ما هو مؤشر جاهزية عملك؟',
    slides: [
      { emoji:'📊', text:'Your Business Readiness Score tells you how prepared you are to start right now — based on your idea, budget, location, and experience.', textAr:'مؤشر الجاهزية يخبرك كم أنت مستعد للبدء الآن — بناءً على فكرتك وميزانيتك وموقعك وخبرتك.' },
      { emoji:'🟢', text:'A score above 70 means you have strong foundations. You are ready to take your first action this week.', textAr:'نتيجة فوق 70 تعني أن لديك أسساً قوية. أنت جاهز لاتخاذ خطوتك الأولى هذا الأسبوع.' },
      { emoji:'🟡', text:'A score between 50–70 means you can start, but you should validate your idea first before spending money.', textAr:'نتيجة بين 50-70 تعني أنك تستطيع البدء، لكن يجب التحقق من فكرتك أولاً قبل إنفاق المال.' },
      { emoji:'💡', text:'To increase your score: define your customers clearly, keep your budget realistic, and take one action at a time.', textAr:'لرفع نتيجتك: حدد عملاءك بوضوح، واجعل ميزانيتك واقعية، واتخذ خطوة واحدة في كل مرة.' },
    ]
  },
  firstAction: {
    title: 'Why is this your First Action?',
    titleAr: 'لماذا هذه هي خطوتك الأولى؟',
    slides: [
      { emoji:'🎯', text:'Your First Action is the single most important thing you can do right now. It was chosen because it costs almost nothing and gives you the most information.', textAr:'خطوتك الأولى هي أهم شيء يمكنك فعله الآن. تم اختيارها لأنها لا تكلف شيئاً تقريباً وتعطيك أكثر المعلومات.' },
      { emoji:'🧪', text:'Before spending any money, you need to know if real people will actually buy your product. This action tests demand without financial risk.', textAr:'قبل إنفاق أي أموال، تحتاج إلى معرفة ما إذا كان الناس سيشترون منتجك فعلاً. هذه الخطوة تختبر الطلب بدون خطر مالي.' },
      { emoji:'💬', text:'Talk to 10 real people. Ask: "Would you buy this? How much would you pay?" Their answers are worth more than any business plan.', textAr:'تحدث مع 10 أشخاص حقيقيين. اسأل: "هل ستشتري هذا؟ كم ستدفع؟" إجاباتهم تساوي أكثر من أي خطة عمل.' },
      { emoji:'🚀', text:'If 7 out of 10 people say YES — that is your green light to move forward with confidence.', textAr:'إذا قال 7 من أصل 10 أشخاص نعم — هذا هو ضوءك الأخضر للمضي قدماً بثقة.' },
    ]
  },
  riskScore: {
    title: 'What is your Risk Score?',
    titleAr: 'ما هو مؤشر المخاطر؟',
    slides: [
      { emoji:'🛡️', text:'Your Risk Score measures how risky your current situation is. A lower score means lower risk — which is better at the start.', textAr:'مؤشر المخاطر يقيس مدى خطورة وضعك الحالي. النتيجة الأقل تعني مخاطر أقل — وهذا أفضل في البداية.' },
      { emoji:'⚠️', text:'High risk does NOT mean you should stop. It means you should be careful — test before spending, validate before registering.', textAr:'المخاطر العالية لا تعني أنك يجب أن تتوقف. تعني أنك يجب أن تكون حذراً — اختبر قبل الإنفاق، تحقق قبل التسجيل.' },
      { emoji:'📉', text:'You can reduce your risk by: validating with real customers, keeping costs low, and taking small steps.', textAr:'يمكنك تقليل مخاطرك بـ: التحقق مع عملاء حقيقيين، وإبقاء التكاليف منخفضة، واتخاذ خطوات صغيرة.' },
      { emoji:'✅', text:'Most successful businesses started in high-risk situations. The difference is they tested and adapted quickly.', textAr:'معظم الأعمال الناجحة بدأت في ظروف عالية المخاطر. الفرق أنهم اختبروا وتكيفوا بسرعة.' },
    ]
  },
  license: {
    title: 'How do I register a business in the UAE?',
    titleAr: 'كيف أسجل عملاً تجارياً في الإمارات؟',
    slides: [
      { emoji:'📋', text:'Step 1: Validate your idea first. Do NOT register before you have paying customers. Registration costs money — validate first, register second.', textAr:'الخطوة 1: تحقق من فكرتك أولاً. لا تسجل قبل أن يكون لديك عملاء يدفعون. التسجيل يكلف مالاً — تحقق أولاً، سجل ثانياً.' },
      { emoji:'🏛️', text:'Step 2: Choose your licence type. For home businesses in Abu Dhabi, apply for a Home-Based Business licence from ADDED (Abu Dhabi Department of Economic Development).', textAr:'الخطوة 2: اختر نوع الرخصة. للأعمال المنزلية في أبوظبي، تقدم بطلب رخصة عمل منزلي من دائرة التنمية الاقتصادية.' },
      { emoji:'🍽️', text:'Step 3: For food businesses — get your Food Safety Certificate from ADAFSA first. This is required before selling any food publicly.', textAr:'الخطوة 3: لأعمال الطعام — احصل على شهادة سلامة الغذاء من أدافسا أولاً. هذا مطلوب قبل بيع أي طعام للعامة.' },
      { emoji:'💵', text:'Cost: A basic trade licence in Abu Dhabi typically costs AED 1,000–3,000. Wait until your business is making money before spending on registration.', textAr:'التكلفة: رخصة تجارية أساسية في أبوظبي تكلف عادةً 1,000-3,000 درهم. انتظر حتى يكسب عملك المال قبل الإنفاق على التسجيل.' },
    ]
  },
  funding: {
    title: 'How can I apply for funding?',
    titleAr: 'كيف أتقدم للحصول على تمويل؟',
    slides: [
      { emoji:'💰', text:'The best time to apply for funding is AFTER you have validated your idea and made your first sales. Funders want proof, not just ideas.', textAr:'أفضل وقت للتقدم للتمويل هو بعد التحقق من فكرتك وتحقيق مبيعاتك الأولى. الممولون يريدون دليلاً، وليس مجرد أفكار.' },
      { emoji:'🏆', text:'Khalifa Fund for Enterprise Development — supports UAE nationals with small business funding. Apply at khalifafund.ae after your first 10 customers.', textAr:'صندوق خليفة لتطوير المشاريع — يدعم المواطنين الإماراتيين بتمويل الأعمال الصغيرة. تقدم بطلبك بعد أول 10 عملاء.' },
      { emoji:'📄', text:'What you need: A simple business summary, 3 months of sales records, your Emirates ID, and a clear plan for how you will use the money.', textAr:'ما تحتاجه: ملخص عمل بسيط، وسجلات مبيعات لمدة 3 أشهر، وهويتك الإماراتية، وخطة واضحة لكيفية استخدام المال.' },
      { emoji:'🌟', text:'Tip: Start with the Rural Business Grant from Al Ain — it has less competition and is designed for communities like Al Qua\'a.', textAr:'نصيحة: ابدأ بمنحة الأعمال الريفية من العين — المنافسة فيها أقل وهي مصممة لمجتمعات مثل الدحدار.' },
    ]
  },
  communityFit: {
    title: 'What is Community Fit?',
    titleAr: 'ما هو مدى ملاءمة المجتمع؟',
    slides: [
      { emoji:'🏘️', text:'Community Fit measures how well your idea matches the needs and culture of people in Al Qua\'a and the surrounding area.', textAr:'مدى ملاءمة المجتمع يقيس مدى توافق فكرتك مع احتياجات وثقافة الناس في الدحدار والمنطقة المحيطة.' },
      { emoji:'🐪', text:'Al Qua\'a has unique assets: camel farming, dark skies, desert landscapes, strong family networks, and agricultural traditions. A high Community Fit means your idea uses these strengths.', textAr:'الدحدار لديها مزايا فريدة: مزارع الإبل، والسماء المظلمة، والمناظر الصحراوية، وشبكات الأسرة القوية، والتقاليد الزراعية.' },
      { emoji:'🤝', text:'In Al Qua\'a, trust is everything. People buy from people they know. A business with high Community Fit uses this trust as its biggest advantage.', textAr:'في الدحدار، الثقة هي كل شيء. الناس يشترون من أشخاص يعرفونهم. عمل بملاءمة مجتمعية عالية يستخدم هذه الثقة كأكبر ميزة له.' },
      { emoji:'📈', text:'To increase your Community Fit: offer something local people actually need, use local ingredients or skills, and serve in Arabic.', textAr:'لزيادة ملاءمتك للمجتمع: قدم شيئاً يحتاجه السكان المحليون فعلاً، واستخدم مكونات أو مهارات محلية، وقدم الخدمة باللغة العربية.' },
    ]
  },
}

export default function VideoExplainer({ topic, children, color = '#f59e0b' }) {
  const [open, setOpen] = useState(false)
  const [slide, setSlide] = useState(0)
  const [arabic, setArabic] = useState(false)
  const [playing, setPlaying] = useState(false)
  const ex = explanations[topic]
  if (!ex) return children || null

  const openModal = () => { setOpen(true); setSlide(0); setPlaying(true) }
  const close     = () => { setOpen(false); setSlide(0); setPlaying(false) }
  const next = () => setSlide(s => Math.min(s + 1, ex.slides.length - 1))
  const prev = () => setSlide(s => Math.max(s - 1, 0))

  // Auto-advance
  useEffect(() => {
    if (!open || !playing) return
    if (slide >= ex.slides.length - 1) { setPlaying(false); return }
    const t = setTimeout(next, 3500)
    return () => clearTimeout(t)
  }, [open, playing, slide])

  const current = ex.slides[slide]

  return (
    <>
      {/* Trigger button */}
      <button onClick={openModal}
        style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'5px 12px', borderRadius:99, fontSize:11, fontWeight:700, cursor:'pointer', border:'none', transition:'all 0.2s',
          background:`${color}15`, color, border:`1px solid ${color}25` }}
        title="Watch explanation">
        <Video size={12} />
        Watch Explanation 🎥
      </button>

      {/* Modal overlay */}
      {open && (
        <div style={{ position:'fixed', inset:0, zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:20, background:'rgba(0,0,0,0.85)', backdropFilter:'blur(8px)' }}
          onClick={e => { if (e.target === e.currentTarget) close() }}>

          <div style={{ width:'100%', maxWidth:520, borderRadius:24, overflow:'hidden', background:'rgba(6,2,24,0.97)', border:'1px solid rgba(245,158,11,0.3)', boxShadow:`0 0 60px rgba(245,158,11,0.15)` }}
            className="animate-scale-in">

            {/* Header */}
            <div style={{ padding:'18px 22px', borderBottom:'1px solid rgba(255,210,80,0.1)', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:4 }}>
                  <Video size={13} style={{ color:'#f59e0b' }} />
                  <span style={{ color:'rgba(253,230,138,0.5)', fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em' }}>Bedaya AI Explains</span>
                </div>
                <h3 style={{ color:'#fef9ee', fontSize:14, fontWeight:800, lineHeight:1.3 }}>
                  {arabic ? ex.titleAr : ex.title}
                </h3>
              </div>
              <div style={{ display:'flex', gap:8, flexShrink:0 }}>
                {/* Lang toggle */}
                <button onClick={() => setArabic(!arabic)}
                  style={{ padding:'5px 10px', borderRadius:8, fontSize:11, fontWeight:700, cursor:'pointer', border:'1px solid rgba(255,210,80,0.2)', background:'rgba(245,158,11,0.1)', color:'#fde68a' }}>
                  {arabic ? '🇬🇧 EN' : '🇦🇪 AR'}
                </button>
                <button onClick={close}
                  style={{ width:32, height:32, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', border:'1px solid rgba(255,255,255,0.08)', background:'rgba(255,255,255,0.05)', color:'#94a3b8' }}>
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Slide content */}
            <div style={{ padding:'32px 28px', minHeight:220, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center' }}>
              <div style={{ fontSize:64, marginBottom:20, animation:'floatY 2s ease-in-out infinite', display:'inline-block' }}
                key={slide}>
                {current.emoji}
              </div>
              <p style={{ color:'#f1ece0', fontSize:15, lineHeight:1.85, maxWidth:400, direction: arabic ? 'rtl' : 'ltr' }}
                key={`text-${slide}`}
                className="animate-fade-up">
                {arabic ? current.textAr : current.text}
              </p>
            </div>

            {/* Progress dots */}
            <div style={{ display:'flex', justifyContent:'center', gap:8, paddingBottom:8 }}>
              {ex.slides.map((_,i) => (
                <button key={i} onClick={() => { setSlide(i); setPlaying(false) }}
                  style={{ width: i===slide ? 24 : 8, height:8, borderRadius:99, border:'none', cursor:'pointer', transition:'all 0.3s',
                    background: i===slide ? '#f59e0b' : 'rgba(255,255,255,0.15)' }} />
              ))}
            </div>

            {/* Controls */}
            <div style={{ padding:'12px 22px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
              <button onClick={prev} disabled={slide===0}
                style={{ width:40, height:40, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', cursor:slide===0?'not-allowed':'pointer', border:'1px solid rgba(255,210,80,0.15)', background:'rgba(255,255,255,0.04)', color: slide===0?'rgba(255,255,255,0.2)':'#fde68a' }}>
                <ChevronLeft size={18} />
              </button>

              <button onClick={() => setPlaying(p => !p)}
                style={{ flex:1, padding:'10px', borderRadius:12, cursor:'pointer', border:'none', fontWeight:700, fontSize:13, transition:'all 0.2s',
                  background: playing ? 'rgba(239,68,68,0.15)' : 'linear-gradient(135deg,#c47010,#f59e0b)',
                  color: playing ? '#f87171' : '#1a0a00',
                  border: playing ? '1px solid rgba(239,68,68,0.25)' : 'none' }}>
                {playing ? '⏸ Pause' : '▶ Play'}
              </button>

              <button onClick={slide===ex.slides.length-1 ? close : next}
                style={{ width:40, height:40, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', border:'none', transition:'all 0.2s',
                  background: slide===ex.slides.length-1 ? 'linear-gradient(135deg,#c47010,#f59e0b)' : 'rgba(255,255,255,0.06)',
                  color: slide===ex.slides.length-1 ? '#1a0a00' : '#fde68a' }}>
                {slide===ex.slides.length-1 ? <X size={16}/> : <ChevronRight size={18}/>}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
