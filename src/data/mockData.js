// ── AI Agents ──────────────────────────────────────────────────────────────

export const agents = [
  {
    id: 'strategist',
    name: 'Business Strategist',
    emoji: '🧠',
    color: '#6366f1',
    colorLight: 'rgba(99,102,241,0.12)',
    role: 'Startup Mentor',
    tagline: 'Turns your idea into a clear roadmap.',
    capabilities: [
      'Validates your business idea against real market signals',
      'Builds a simple, actionable 90-day roadmap',
      'Suggests improvements before you spend money',
      'Evaluates new business ideas objectively',
      'Helps you decide: Continue, Improve, Pause, or Stop',
    ],
    mockResponse: (idea) =>
      `Your idea — "${idea}" — shows real potential in the Al Qua'a region. The local market is underserved and community trust runs deep, which works in your favour. My recommendation: start extremely small. One product, one customer group, one week of testing. Do not build a full business before you know people will actually pay. Your roadmap: Week 1 — test with 10 people. Week 2 — refine based on feedback. Week 3 — sell your first unit. This is how strong local businesses are born.`,
  },
  {
    id: 'finance',
    name: 'Finance Advisor',
    emoji: '💰',
    color: '#10b981',
    colorLight: 'rgba(16,185,129,0.12)',
    role: 'Financial Advisor',
    tagline: 'Keep costs low. Revenue first.',
    capabilities: [
      'Estimates realistic startup costs in AED',
      'Suggests smart pricing based on your community',
      'Estimates your break-even point',
      'Warns before you make expensive early decisions',
      'Tells you when it is smart to invest',
    ],
    mockResponse: (idea) =>
      `For "${idea}", I recommend keeping your initial investment under AED 500. Most first-time founders in rural areas overspend before validating demand — this is the #1 financial mistake. Estimated startup cost: AED 200–400 for materials and testing. Suggested price point: AED 25–45 per unit based on local purchasing power. You need to sell just 10–15 units to break even. Do not register, brand, or scale until you have 3 paying customers.`,
  },
  {
    id: 'marketing',
    name: 'Marketing Expert',
    emoji: '📣',
    color: '#f59e0b',
    colorLight: 'rgba(245,158,11,0.12)',
    role: 'Marketing Specialist',
    tagline: 'Your story is your strongest brand.',
    capabilities: [
      'Suggests business names that feel local and memorable',
      'Creates your first launch message in simple words',
      'Reviews your advertisements before you publish',
      'Identifies your first real customers by name type',
      'Helps you build trust before building a brand',
    ],
    mockResponse: (idea) =>
      `For "${idea}", your best marketing tool is personal trust — not social media ads. In Al Qua'a, people buy from people they know. Start by telling your story to 10 neighbours, relatives, or community members. Your first message should be simple: "I make [product] from [local ingredient]. Can I give you a sample?" A name suggestion: something that ties your product to your location — it builds instant community pride and recognition.`,
  },
  {
    id: 'legal',
    name: 'Legal Counsel',
    emoji: '⚖️',
    color: '#ef4444',
    colorLight: 'rgba(239,68,68,0.12)',
    role: 'Compliance Educator',
    tagline: 'Know the rules before you play the game.',
    disclaimer: 'This is educational guidance only and does not replace official legal advice. Always consult a licensed legal professional for your specific situation.',
    capabilities: [
      'Explains what licenses are needed in plain language',
      'Describes basic UAE business registration steps',
      'Warns about common legal oversights for beginners',
      'Explains food safety, permits, and compliance basics',
      'Breaks down requirements so they are not overwhelming',
    ],
    mockResponse: (idea) =>
      `For "${idea}", you do not need to register a full company to test your idea. In the UAE, you can begin with informal testing — sampling and feedback — before any formal registration. When you are ready to sell publicly, you will likely need a trade licence from the relevant emirate authority and, for food products, a food safety permit from Abu Dhabi Agriculture and Food Safety Authority (ADAFSA). These steps come after validation, not before. Start testing first.`,
  },
  {
    id: 'growth',
    name: 'Growth & Opportunities',
    emoji: '🚀',
    color: '#8b5cf6',
    colorLight: 'rgba(139,92,246,0.12)',
    role: 'Opportunity Advisor',
    tagline: 'There is always a door open. Find it.',
    capabilities: [
      'Finds funding programs you may qualify for',
      'Identifies startup events near Al Ain and Abu Dhabi',
      'Recommends useful training and certifications',
      'Connects you with mentorship and support networks',
      'Identifies government support for rural founders',
    ],
    mockResponse: (idea) =>
      `"${idea}" is eligible for several support programmes. The Khalifa Fund for Enterprise Development supports small and rural businesses with funding and mentorship. Abu Dhabi's food entrepreneur programme has helped local producers scale. I also recommend the Food Safety Certificate from ADAFSA — it builds trust and is required before selling publicly. Attending an SME event in Al Ain would connect you to buyers, investors, and partners who specifically look for authentic rural products.`,
  },
]

// ── First Action Examples ──────────────────────────────────────────────────

export const firstActionExamples = {
  default: {
    founderSummary:
      'You are a first-time founder with a local idea, limited starting capital, and strong community roots. That is a powerful combination. You do not need experience — you need one small action.',
    ideaSummary:
      'Your idea has clear local demand and a real gap in the market. Customers exist. The question is not whether this can work — it is how fast you can learn.',
    communityFit:
      'Al Qua\'a is an underserved market with strong community trust. Residents prefer local, familiar products and services. Your proximity and cultural knowledge are your biggest competitive advantages.',
    readinessScore: 72,
    communityFitScore: 85,
    riskScore: 38,
    confidenceScore: 78,
    firstAction: 'Prepare 5 samples and ask 10 people if they would buy it.',
    whyItMatters:
      'Before spending money, you need real human feedback — not assumptions. Ten honest conversations will teach you more than a full business plan. This action costs almost nothing and tells you everything.',
    steps: [
      'Prepare 5 small samples of your product or write a 1-paragraph description of your service.',
      'List 10 people you know: family, neighbours, or community members.',
      'Visit or message each person individually — do not post on a group.',
      'Ask: "Would you buy this? How much would you pay? What would make it better?"',
      'Write down every answer in a notebook or voice note.',
      'Count how many said yes and how much they would pay.',
      'Return to Bedaya AI and enter what you learned.',
    ],
    afterAction:
      'Once 7 or more people say yes and agree on a price, you are ready to make your first real sale. Bedaya AI will unlock your AI Startup Team to help you take the next step.',
  },
  desserts: {
    founderSummary:
      'You are building a homemade food business in Al Qua\'a — one of the most trusted categories in rural communities. People here value freshness and local sourcing. You already have what most founders spend years building: community trust.',
    ideaSummary:
      'Homemade desserts are a high-demand, low-cost business with strong repeat purchase potential. The challenge is not making the product — it is letting the right people know it exists.',
    communityFit:
      'Homemade food businesses thrive in close-knit communities like Al Qua\'a. Weddings, family gatherings, and celebrations create consistent seasonal demand. Word-of-mouth is your most powerful distribution channel.',
    readinessScore: 80,
    communityFitScore: 92,
    riskScore: 22,
    confidenceScore: 88,
    firstAction: 'Prepare 5 samples of your best dessert and give them to 10 community members to try.',
    whyItMatters:
      'Testing with real people costs almost nothing and gives you feedback that is worth thousands. If 7 out of 10 people ask where they can buy more — that is your launch signal.',
    steps: [
      'Choose your best 1 or 2 dessert items — do not try to offer everything yet.',
      'Prepare 5 small samples (small containers or plates are fine).',
      'Choose 10 people: neighbours, relatives, family friends, or community members.',
      'Give each person a sample with a simple note: "I am testing a new homemade dessert. Please try it and tell me honestly — would you pay for this?"',
      'Ask three questions: Would you buy it? How much would you pay? What would make it better?',
      'Record every answer — even the critical ones. Especially the critical ones.',
      'Count your yeses, note the price range people mentioned, and come back to Bedaya AI.',
    ],
    afterAction:
      "If 7+ people say yes, you have a validated product. Your next step will be making your first real sale — and Bedaya AI's Finance Agent will help you price it right.",
  },
  camelMilk: {
    founderSummary:
      'You are building on a powerful local asset: camel milk — one of the UAE\'s most culturally significant and export-ready products. Al Qua\'a\'s agricultural roots make you a credible, authentic producer.',
    ideaSummary:
      'Camel milk chocolate and products are growing fast in regional and international markets. Starting locally with a premium positioning is the smartest entry point. Authenticity is your brand.',
    communityFit:
      'There is strong pride and interest in camel-derived products across the region. Local buyers, hotels, and health-conscious consumers are actively seeking genuine, locally produced camel milk products.',
    readinessScore: 75,
    communityFitScore: 88,
    riskScore: 30,
    confidenceScore: 82,
    firstAction: 'Produce 10 small chocolate bars using local camel milk and ask 10 buyers for honest feedback.',
    whyItMatters:
      'Camel milk chocolate requires a tested recipe before any investment in packaging or branding. Getting feedback on taste, texture, and price from real people validates your product before you spend.',
    steps: [
      'Source a small quantity of fresh local camel milk — start with 1 litre.',
      'Produce 10 small test samples of your chocolate product.',
      'Identify 10 testers: mix of family, health-conscious community members, and 2–3 local shop owners.',
      'Ask each tester: taste, texture, price they would pay, and where they would buy it.',
      'Pay special attention to feedback from the shop owners — they are your first B2B channel.',
      'Note the most-requested improvements and the highest price people accepted.',
      'Return to Bedaya AI with your feedback to unlock your next step.',
    ],
    afterAction:
      'With positive taste-test results and a clear price point, you are ready to produce your first small batch for sale. The Finance Agent will help you price it to cover costs and earn a profit.',
  },
}

// ── Risk Analysis ──────────────────────────────────────────────────────────

export const riskExamples = [
  {
    keywords: ['brand', 'logo', 'design', 'marketing spend', 'advertis'],
    riskLevel: 'High',
    riskColor: '#ef4444',
    mistake: 'Spending on branding before validating customer demand',
    why: 'Most first-time founders invest in logos, websites, and branding before they know whether anyone will actually buy. This is one of the most common reasons new businesses run out of money before their first sale.',
    safer: 'Spend less than AED 100 testing your idea with real people first. A simple poster, a WhatsApp message, or a handwritten sign is enough to test.',
    firstStep: 'Create one simple description of your product or service and ask 10 potential customers if they would pay for it. Record their responses.',
  },
  {
    keywords: ['register', 'license', 'company', 'trade licence', 'legal'],
    riskLevel: 'High',
    riskColor: '#ef4444',
    mistake: 'Registering a business before testing the idea',
    why: 'Business registration costs money and time. If you register before you know the idea works, you may end up with a licensed business that has no customers.',
    safer: 'Test your idea first. In the UAE, you can sample, gather feedback, and even do informal trades before registering. Registration comes after validation.',
    firstStep: 'Talk to 10 potential customers before spending a single dirham on legal setup. If demand is confirmed, then explore the right licence type for your business category.',
  },
  {
    keywords: ['delivery', 'deliver', 'ship', 'logistics'],
    riskLevel: 'Medium',
    riskColor: '#f59e0b',
    mistake: 'Adding delivery before your core product is proven',
    why: 'Delivery adds cost, complexity, and risk. If your core product is not yet validated, adding delivery multiplies your problems rather than your reach.',
    safer: 'Sell locally, in person, first. When you have 10 regular customers and a consistent product, then introduce delivery as an added service.',
    firstStep: 'Focus on your first 10 in-person sales. Ask customers: "Would you pay extra for delivery?" If 7 say yes, delivery becomes your next smart investment.',
  },
  {
    keywords: ['online', 'instagram', 'social media', 'website', 'app'],
    riskLevel: 'Medium',
    riskColor: '#f59e0b',
    mistake: 'Launching online before building local trust',
    why: 'Online presence without a proven product leads to wasted effort and sometimes public negative feedback that is hard to recover from. Trust is built in person first.',
    safer: 'Build your reputation locally, then move online. Your first 10 satisfied customers become your online reputation through word of mouth and simple testimonials.',
    firstStep: 'Create a simple WhatsApp status or message to your contacts. No website needed yet. Measure the response before investing in a full online presence.',
  },
  {
    keywords: ['hire', 'employee', 'staff', 'partner', 'team'],
    riskLevel: 'High',
    riskColor: '#ef4444',
    mistake: 'Hiring staff before the business has consistent revenue',
    why: 'Salaries are a fixed cost. Taking on employees before you have reliable income creates financial pressure that can force the business to close prematurely.',
    safer: 'Handle everything yourself until you have more orders than you can manage alone for 3 consecutive weeks. That is the right signal to consider help.',
    firstStep: 'Identify which tasks take the most time. Can a family member help informally? Can you use a simple tool to save time? Delay hiring until revenue is steady.',
  },
]

export const getRiskAnalysis = (decision) => {
  const lower = decision.toLowerCase()
  const match = riskExamples.find((r) =>
    r.keywords.some((k) => lower.includes(k))
  )
  return (
    match || {
      riskLevel: 'Low',
      riskColor: '#10b981',
      mistake: 'Acting without a clear first step',
      why: 'Moving forward without a defined action often leads to scattered effort and no measurable progress.',
      safer: 'Break this decision into the smallest possible first step. What is the one thing you can do in the next 24 hours to learn more?',
      firstStep: 'Write down exactly what you want to achieve, then ask yourself: what is the very first thing I need to know? Find out that one thing first.',
    }
  )
}

// ── Board Meeting Opinions ─────────────────────────────────────────────────

export const getBoardOpinions = (pitch) => [
  {
    agent: agents[0],
    question: 'Does it fit the business goal?',
    opinion: `"${pitch}" is a reasonable expansion idea. Strategically, it makes sense only if your core product is already proven and your first customers are satisfied. Expanding too early stretches your focus and increases failure risk. My recommendation: confirm you have 10 happy customers first.`,
    vote: 'Wait',
    voteColor: '#f59e0b',
  },
  {
    agent: agents[1],
    question: 'Can the founder afford it?',
    opinion: `This decision carries financial risk. Adding "${pitch}" will require upfront investment before any additional revenue is confirmed. Without a clear break-even plan, this could consume your working capital. I recommend calculating exact costs before committing.`,
    vote: 'Improve First',
    voteColor: '#f59e0b',
  },
  {
    agent: agents[2],
    question: 'Will customers value it?',
    opinion: `From a marketing perspective, "${pitch}" could appeal to your community — but only if they already trust your brand. New customers rarely pay a premium for something they have not heard of. Test this as a small add-on before making it a core feature.`,
    vote: 'Proceed Now',
    voteColor: '#10b981',
  },
  {
    agent: agents[3],
    question: 'Are there legal or compliance concerns?',
    opinion: `Depending on the nature of "${pitch}", there may be regulatory considerations. For example, adding food delivery in the UAE requires compliance with Abu Dhabi food handling transport rules. Verify requirements before launch to avoid fines or forced closures.`,
    vote: 'Wait',
    voteColor: '#f59e0b',
  },
  {
    agent: agents[4],
    question: 'Will it help future growth?',
    opinion: `Long-term, "${pitch}" aligns with the growth direction of community-focused businesses in rural UAE. However, sustainable growth comes from a strong foundation. Rushing this step could limit your ability to access funding later. Build the base first, then expand.`,
    vote: 'Wait',
    voteColor: '#f59e0b',
  },
]

// ── Opportunities ──────────────────────────────────────────────────────────

export const opportunities = [
  {
    id: 1,
    category: 'Funding',
    emoji: '💰',
    color: '#10b981',
    colorLight: 'rgba(16,185,129,0.12)',
    title: 'Khalifa Fund for Enterprise Development',
    type: 'Funding Programme',
    whyItHelps:
      'Supports UAE nationals starting small and micro businesses, including rural and agricultural ventures. Offers low-interest loans and free business mentoring.',
    action: 'Prepare a simple one-page business summary describing your idea and expected first month revenue before applying.',
  },
  {
    id: 2,
    category: 'Funding',
    emoji: '🏛️',
    color: '#6366f1',
    colorLight: 'rgba(99,102,241,0.12)',
    title: 'Rural Business Grant – Al Ain',
    type: 'Government Grant',
    whyItHelps:
      'Provides seed funding for small businesses in rural communities including Al Qua\'a. Prioritises food, agriculture, and community services.',
    action: 'Validate your idea with 10 potential customers first, then apply with real feedback data to strengthen your application.',
  },
  {
    id: 3,
    category: 'Certification',
    emoji: '📜',
    color: '#f59e0b',
    colorLight: 'rgba(245,158,11,0.12)',
    title: 'Food Safety Certificate – ADAFSA',
    type: 'Certification',
    whyItHelps:
      'Required for anyone selling homemade food products publicly in Abu Dhabi. Builds customer trust and protects you legally.',
    action: 'Complete this certification before your first public sale. The process is straightforward and affordable.',
  },
  {
    id: 4,
    category: 'Training',
    emoji: '🌟',
    color: '#8b5cf6',
    colorLight: 'rgba(139,92,246,0.12)',
    title: 'Stargazing Tourism Workshop',
    type: 'Training Workshop',
    whyItHelps:
      'Al Qua\'a is one of the darkest sky zones in the UAE, making it ideal for astronomy tourism. This workshop helps founders turn that into a structured experience guests will pay for.',
    action: 'Attend before launching any tourism service. The workshop also connects you with tourism authorities who can promote your experience.',
  },
  {
    id: 5,
    category: 'Mentorship',
    emoji: '🤝',
    color: '#ec4899',
    colorLight: 'rgba(236,72,153,0.12)',
    title: 'SME Mentorship Programme – Abu Dhabi',
    type: 'Mentorship',
    whyItHelps:
      'Pairs first-time founders with experienced business mentors in the UAE. Especially valuable if you are starting without any business background.',
    action: 'Apply in the first 30 days after validating your idea. Mentors are most helpful when you have a real product to discuss.',
  },
  {
    id: 6,
    category: 'Event',
    emoji: '🎯',
    color: '#60a5fa',
    colorLight: 'rgba(96,165,250,0.12)',
    title: 'Al Ain SME Expo',
    type: 'Startup Event',
    whyItHelps:
      'Annual event connecting small business founders with investors, buyers, and support organisations across Al Ain and the Eastern Region.',
    action: 'Attend even before your business is ready. Listening to other founders and meeting investors will accelerate your learning.',
  },
  {
    id: 7,
    category: 'Training',
    emoji: '📚',
    color: '#f97316',
    colorLight: 'rgba(249,115,22,0.12)',
    title: 'ADCCI Business Starter Programme',
    type: 'Training',
    whyItHelps:
      'Abu Dhabi Chamber of Commerce offers free business training for first-time founders, covering pricing, customer service, and legal basics.',
    action: 'Enrol within your first 3 months. The programme is free and can be done online or in Al Ain.',
  },
  {
    id: 8,
    category: 'Government',
    emoji: '🇦🇪',
    color: '#14b8a6',
    colorLight: 'rgba(20,184,166,0.12)',
    title: 'Tamm – Abu Dhabi Government Services',
    type: 'Government Support',
    whyItHelps:
      'The official digital platform for starting and licensing a business in Abu Dhabi. Simplifies the registration process for first-time founders.',
    action: 'Visit the Tamm platform after you have validated your idea and are ready to make your first official sale.',
  },
]

// ── Dashboard Mock Data ────────────────────────────────────────────────────

export const dashboardData = {
  businessIdea: 'Camel Milk Chocolate – Al Qua\'a',
  founderName: 'Founder',
  scores: {
    readiness: 72,
    communityFit: 85,
    risk: 38,
    confidence: 78,
  },
  firstActionStatus: 'In Progress',
  aiTeamStatus: 'Ready',
  nextAction: 'Prepare 5 samples and ask 10 people for feedback.',
  recommendedOpportunity: opportunities[0],
}

// ── Business Idea Examples ─────────────────────────────────────────────────

export const ideaExamples = [
  'Camel milk chocolate from Al Qua\'a',
  'Stargazing tourism experience',
  'Desert coffee truck',
  'Rural grocery delivery service',
  'Farm equipment rental',
  'Local handmade products',
  'Night photography guide service',
  'Homemade traditional desserts',
]

export const getFirstActionResult = (formData) => {
  const lower = (formData.idea || '').toLowerCase()
  if (lower.includes('dessert') || lower.includes('cake') || lower.includes('sweet') || lower.includes('food') || lower.includes('cook'))
    return firstActionExamples.desserts
  if (lower.includes('camel') || lower.includes('milk') || lower.includes('chocolate'))
    return firstActionExamples.camelMilk
  return firstActionExamples.default
}

// ── Strengths & Weaknesses ─────────────────────────────────────────────────

export const getStrengthsWeaknesses = (session) => {
  const { resources, idea } = session
  const strengths = []
  const weaknesses = []

  if (resources?.experience === 'experienced') strengths.push('Existing business experience')
  else weaknesses.push('Limited business experience — learning as you go')

  if (resources?.budget >= 1000) strengths.push('Healthy starting budget')
  else if (resources?.budget > 0) weaknesses.push('Limited budget — keep costs very low')

  if (resources?.hasCustomers === 'yes') strengths.push('Already has potential customers')
  else weaknesses.push('No validated customers yet')

  if (idea?.type === 'product') strengths.push('Physical product — easy to sample and test')
  if (idea?.type === 'service') strengths.push('Service business — low startup cost')

  strengths.push('Strong local community roots in Al Qua\'a')
  strengths.push('Low-cost market entry opportunity')
  weaknesses.push('No formal business registration yet')

  return {
    strengths: strengths.slice(0, 4),
    weaknesses: weaknesses.slice(0, 3),
  }
}

// ── Per-agent detailed responses ───────────────────────────────────────────

export const getAgentResponse = (agentId, question, idea, session) => {
  const budget  = session?.resources?.budget  || '500'
  const loc     = session?.about?.location    || "Al Qua'a"
  const expLvl  = session?.resources?.experience || 'beginner'

  const responses = {
    strategist: {
      default: `For "${idea}", the key strategic principle is: validate before you invest. Start with the smallest possible version of your idea and test it with 10 real people this week. Your 90-day roadmap: Week 1–2 → test with samples. Week 3–4 → refine based on feedback. Month 2 → make your first paid sale. Month 3 → decide whether to grow or pivot. Do not register, brand, or invest heavily until you have at least 3 paying customers.`,
      model: `Your business model for "${idea}" should start as a direct-to-customer model. Sell personally — door to door, WhatsApp, local market — before thinking about shops or online platforms. This keeps costs at zero and lets you refine the product based on real feedback. Once you have 10 regular customers, you can consider wholesale to local shops.`,
      milestone: `Your first 4 milestones: (1) 10 people test your product and give feedback this week. (2) 3 people pay you money within 30 days. (3) 10 paying customers within 60 days. (4) Enough revenue to cover your costs by month 3. Celebrate each milestone — they are evidence that your idea works.`,
      validate: `For "${idea}" in ${loc}, validation means: 10 honest conversations with people who might buy. Ask them: Would you buy this? How much would you pay? What would stop you? Do this before spending any money. If 7 out of 10 say yes and agree on a price — you have a validated idea. That is your green light.`,
    },
    finance: {
      default: `For "${idea}" with AED ${budget} budget: Keep your initial investment under 40% of your budget — that is AED ${Math.round(budget*0.4)}. Use the rest as a safety buffer. Estimated startup cost: AED ${Math.round(budget*0.3)}–${Math.round(budget*0.45)} for materials and testing. Suggested price: AED 25–45 per unit based on ${loc} purchasing power. You need 10–15 sales to break even. Do not spend on branding, packaging, or registration until you have 3 paying customers.`,
      cost: `Startup cost breakdown for "${idea}": Materials/ingredients: AED ${Math.round(budget*0.3)}. Packaging (simple): AED ${Math.round(budget*0.08)}. Transport for testing: AED ${Math.round(budget*0.05)}. Total minimum: AED ${Math.round(budget*0.43)}. This leaves you AED ${Math.round(budget*0.57)} buffer. Never spend your full budget in month one.`,
      price: `Pricing for "${idea}": Research what similar products cost locally. Start at the middle of the market — not the cheapest (looks low quality) and not the most expensive (no trust yet). If your cost per unit is AED 15, price it at AED 30–35. That gives you a 100% margin to cover your time and reinvest. Always test your price with 5 people before committing.`,
      breakeven: `Break-even for "${idea}": If you invest AED ${budget} and your profit per sale is AED 20, you need ${Math.ceil(budget/20)} sales to break even. At 2 sales per week, that is ${Math.ceil(Math.ceil(budget/20)/2)} weeks. Set a goal: break even within 60 days. If you cannot see a path to break-even within 90 days, reconsider your pricing or costs.`,
    },
    marketing: {
      default: `For "${idea}" in ${loc}: Your best marketing is trust, not advertising. In close-knit communities, people buy from people they know. Step 1: Tell your story to 20 people personally — not on social media. Step 2: Give samples to 5 community leaders or respected families. Step 3: Ask every happy customer to tell 3 friends. This word-of-mouth approach costs AED 0 and builds the kind of trust that Instagram ads cannot buy.`,
      name: `Business name ideas for "${idea}": (1) Use your location — "Al Qua'a Sweets" or "Desert Hearts Chocolate". (2) Use your heritage — something that sounds local and proud. (3) Use your family name if you are known in the community — it builds instant trust. Avoid generic names like "Best Quality Products". Your name should make people think of home.`,
      customers: `Your first customers for "${idea}" are: (1) Your extended family and their networks. (2) Neighbours and community members who already know and trust you. (3) Local shops that sell complementary products. (4) Visitors and tourists passing through ${loc}. Start with people who already trust you — they are your easiest first sale and your best word-of-mouth marketers.`,
      launch: `Launch plan for "${idea}" with zero budget: Week 1 — prepare 10 samples and personally deliver them to 10 people. Week 2 — follow up with each person and ask for feedback and referrals. Week 3 — take your first paid order. Week 4 — post a simple WhatsApp status with a photo and price. Do not launch on Instagram until you have 10 happy customers who can comment and validate you.`,
    },
    legal: {
      default: `For "${idea}" in the UAE: You do not need to register before testing your idea. In the UAE, informal testing — giving samples, collecting feedback, and small informal trades — does not require a licence. When you are ready to sell publicly, you will need a trade licence from Abu Dhabi Department of Economic Development (ADDED). For food products, you also need a food safety permit from ADAFSA. These steps come after your first 10 sales, not before.`,
      license: `Licence requirements for "${idea}" in Abu Dhabi: (1) Trade Licence from ADDED — required before public selling. Cost: approximately AED 1,000–3,000 depending on activity type. (2) Food Safety Certificate from ADAFSA — required for food businesses. (3) For home-based businesses, Abu Dhabi has a Home-Based Business permit. Always verify current requirements directly with ADDED as regulations change.`,
      food: `Selling food from home in Abu Dhabi: Yes, it is possible through the Home-Based Business programme. Requirements include a food safety certificate, a health inspection of your food preparation area, and specific packaging and labelling requirements. ADAFSA provides training courses. Complete these before your first public sale to avoid fines. Do NOT sell at public markets or to shops without the proper permits.`,
      register: `When to register your business: Register after you have (1) validated your idea with real paying customers, (2) confirmed your pricing covers costs and time, and (3) committed to continuing for at least 6 months. Registering too early wastes money on a business that may pivot. Registering too late means selling without protection. For most founders in ${loc}, the right time is after your 10th paying customer.`,
    },
    growth: {
      default: `For "${idea}" in ${loc}: Three growth opportunities you can access right now — (1) Khalifa Fund for Enterprise Development: supports rural UAE businesses with funding and mentorship. Apply after your first 10 customers. (2) Food Safety Certificate from ADAFSA: required to sell publicly and builds customer trust. (3) Al Ain SME Expo: connect with buyers and investors who specifically look for authentic rural products. Start with the certification — it opens doors to everything else.`,
      funding: `Funding options for "${idea}": (1) Khalifa Fund — UAE nationals, up to AED 3 million, requires a business plan. (2) Abu Dhabi SME Hub grants — for early-stage businesses. (3) Crowdfunding via Beehive or Eureeca platforms. (4) Family and community investment — often the fastest and cheapest source for a first-time founder. For your stage, community investment and Khalifa Fund are the most realistic paths.`,
      scale: `Scaling "${idea}" after your first 10 customers: (1) Partner with one local shop to sell your product — this multiplies your reach without more of your time. (2) Attend one local market or event per month. (3) Train a family member to help with production. (4) Apply for a small business grant to fund the next level. Scale slowly — doubling customers before doubling capacity is the rule.`,
      events: `Events and opportunities in the Al Ain region for "${idea}": Al Ain Food Festival, Al Ain Oasis Market, Abu Dhabi Date Festival (if agricultural), Emirates Heritage Village events, Al Ain SME Expo. Attend as a visitor first — observe what sells, talk to vendors, understand what buyers want. Then apply to participate in the next cycle.`,
    },
  }

  const agentRes = responses[agentId]
  if (!agentRes) return agents.find(a=>a.id===agentId)?.mockResponse(idea) || 'Response unavailable.'

  const lower = question.toLowerCase()
  if (agentId === 'strategist') {
    if (lower.includes('model') || lower.includes('business model')) return agentRes.model
    if (lower.includes('milestone') || lower.includes('goal')) return agentRes.milestone
    if (lower.includes('validat')) return agentRes.validate
  }
  if (agentId === 'finance') {
    if (lower.includes('cost') || lower.includes('spend') || lower.includes('start')) return agentRes.cost
    if (lower.includes('pric')) return agentRes.price
    if (lower.includes('break') || lower.includes('even')) return agentRes.breakeven
  }
  if (agentId === 'marketing') {
    if (lower.includes('name') || lower.includes('brand')) return agentRes.name
    if (lower.includes('customer') || lower.includes('who')) return agentRes.customers
    if (lower.includes('launch') || lower.includes('start') || lower.includes('no budget') || lower.includes('zero')) return agentRes.launch
  }
  if (agentId === 'legal') {
    if (lower.includes('licen') || lower.includes('permit') || lower.includes('register')) return agentRes.license
    if (lower.includes('food') || lower.includes('home') || lower.includes('sell')) return agentRes.food
    if (lower.includes('when')) return agentRes.register
  }
  if (agentId === 'growth') {
    if (lower.includes('fund') || lower.includes('money') || lower.includes('grant')) return agentRes.funding
    if (lower.includes('scal') || lower.includes('grow') || lower.includes('expand') || lower.includes('after')) return agentRes.scale
    if (lower.includes('event') || lower.includes('attend') || lower.includes('market')) return agentRes.events
  }

  return agentRes.default
}

// ── Board Meeting Final ────────────────────────────────────────────────────

export const getBoardFinal = (pitch, votes) => {
  const proceedCount = votes.filter(v => v === 'Proceed Now').length
  const waitCount    = votes.filter(v => v === 'Wait').length

  if (proceedCount >= 3) return {
    decision: 'Proceed Now',
    color: '#34d399',
    score: Math.round(60 + proceedCount * 8),
    pros: ['Strong strategic alignment', 'Affordable at current stage', 'Customers are likely to respond positively'],
    cons: ['Requires careful execution', 'Monitor cash flow closely'],
    riskLevel: 'Low',
    reason: `The board majority supports moving forward with "${pitch}". Ensure you have a clear plan and measurable milestone before starting.`,
  }
  if (waitCount >= 3) return {
    decision: 'Wait',
    color: '#fbbf24',
    score: Math.round(40 + proceedCount * 8),
    pros: ['Concept has long-term potential', 'Market exists for this'],
    cons: ['Timing is not right yet', 'Core product needs more validation', 'Financial risk is too high now'],
    riskLevel: 'Medium',
    reason: `The board recommends waiting on "${pitch}". Validate your core product for 30 more days, then revisit with real sales data.`,
  }
  return {
    decision: 'Improve First',
    color: '#818cf8',
    score: 65,
    pros: ['The idea has merit', 'Board sees future potential'],
    cons: ['Execution plan needs refinement', 'Some legal considerations must be resolved first'],
    riskLevel: 'Medium',
    reason: `The board suggests improving the plan for "${pitch}" before committing resources. Address the concerns raised and come back with a clearer strategy.`,
  }
}
