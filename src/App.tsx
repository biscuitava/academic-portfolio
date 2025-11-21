import React, { useState } from 'react';
import { 
  BookOpen, 
  Github, 
  Twitter, 
  Linkedin, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Search,
  Menu,
  X,
  ChevronRight,
  Tag,
  GraduationCap,
  Mail,
  FileText,
  Award
} from 'lucide-react';

// --- Data Configuration ---
const AUTHOR = {
  name: "Hongbin Yan",
  title: "PhD Candidate at The University of Queensland",
  university: "School of Information Technology and Electrical Engineering (ITEE)",
  bio: "Exploring the frontiers of Artificial Intelligence and Data Science. My research focuses on deep learning optimization and computer vision. Documenting my experiments, paper readings, and life at UQ.",
  // Using a generic avatar placeholder, replace with your real photo
  avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Hongbin",
  email: "hongbin.yan@uq.edu.au", // Example email
  socials: {
    github: "https://github.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    scholar: "#" // Google Scholar link placeholder
  }
};

const RESEARCH_LOGS = [
  {
    id: 1,
    title: "Paper Accepted at CVPR 2025: A New Approach to Vision Transformers",
    excerpt: "I am thrilled to share that our latest work on efficient vision transformers has been accepted to CVPR 2025! In this post, I break down the core contributions and the challenges we overcame during the rebuttal phase.",
    content: [
      "The journey to CVPR 2025 has been long but rewarding. Our paper, 'EfficientViT: Rethinking Attention Mechanisms', proposes a novel way to reduce the computational complexity of transformers in vision tasks.",
      "## The Problem",
      "Standard self-attention mechanisms scale quadratically with image size. This limits the application of high-resolution image processing in real-time scenarios.",
      "## Our Solution",
      "We introduced a sparse attention mechanism that focuses only on semantically relevant regions. This reduced the FLOPs by 40% while maintaining comparable accuracy to the state-of-the-art (SOTA).",
      "## Future Work",
      "Next, we plan to extend this architecture to video understanding tasks. I will be presenting this work in June. See you there!"
    ],
    date: "2025-02-28",
    category: "Publication",
    readTime: "5 min read",
    tags: ["Computer Vision", "Deep Learning", "Conference"]
  },
  {
    id: 2,
    title: "Lab Log #42: Debugging Gradient Explosion in RNNs",
    excerpt: "Spent the entire week wrestling with unstable gradients in my recurrent models. Here is a detailed log of what went wrong, how I diagnosed it using gradient clipping, and the final fix.",
    content: [
      "Research is 1% inspiration and 99% debugging. This week was a testament to that.",
      "## Symptoms",
      "During the training of my sequence prediction model, the loss would decrease normally for the first 10 epochs and then suddenly spike to NaN. It was frustrating to say the least.",
      "## Diagnosis",
      "I plotted the gradient norms for each layer. It turned out that the recurrent weights were accumulating values > 1.0, causing the gradients to explode exponentially over long sequences.",
      "## The Fix",
      "Implementing `torch.nn.utils.clip_grad_norm_` immediately stabilized the training. I also switched from standard RNNs to LSTMs (again), which naturally handle long-term dependencies better."
    ],
    date: "2024-11-15",
    category: "Experiment Log",
    readTime: "8 min read",
    tags: ["Debugging", "PyTorch", "RNN"]
  },
  {
    id: 3,
    title: "Literature Review: The State of Multimodal LLMs",
    excerpt: "A comprehensive summary of recent papers reading regarding GPT-4V, Gemini, and LLaVA. How are we bridging the gap between text and visual understanding?",
    content: [
      "Large Language Models (LLMs) are no longer just about text. The integration of visual encoders is the next big frontier.",
      "## Alignment Strategies",
      "Most current approaches use a projection layer to map visual embeddings into the LLM's token space. However, is this the most efficient way? Recent papers suggest that cross-attention might offer better granularity.",
      "## Instruction Tuning",
      "Visual instruction tuning datasets are becoming the bottleneck. We need higher quality, diverse data rather than just larger quantities.",
      "I have compiled a list of 20 essential papers on this topic in my Notion, linked below."
    ],
    date: "2024-10-02",
    category: "Literature Review",
    readTime: "15 min read",
    tags: ["LLM", "Multimodal", "Survey"]
  },
  {
    id: 4,
    title: "Life at UQ: St Lucia Campus & Jacaranda Season",
    excerpt: "Taking a break from the lab to appreciate the beautiful purple Jacarandas blooming across the campus. A photo essay of my first semester in Brisbane.",
    content: [
      "They say if a Jacaranda flower falls on your head, you'll fail your exams. Luckily, as a PhD student, I don't have exams—only deadlines!",
      "## The Great Court",
      "The sandstone architecture of the Great Court is stunning. It's my favorite place to sit with a coffee and read papers (or just pretend to read while watching the ibis birds steal sandwiches).",
      "Brisbane's weather has been treating me well. The balance between intense research work and the laid-back Aussie lifestyle is exactly what I needed."
    ],
    date: "2024-09-20",
    category: "Life @ UQ",
    readTime: "4 min read",
    tags: ["UQ", "Brisbane", "Lifestyle"]
  }
];

// --- Components ---

const NavLink = ({ children, isActive, onClick }: { children: React.ReactNode, isActive: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
      isActive 
        ? 'text-slate-900 border-b-2 border-slate-900' 
        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-md'
    }`}
  >
    {children}
  </button>
);

const SocialIcon = ({ icon: Icon, href }: { icon: any, href: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noreferrer"
    className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all duration-300"
  >
    <Icon size={20} />
  </a>
);

const BlogPostCard = ({ post, onClick }: { post: any, onClick: () => void }) => (
  <article 
    className="group cursor-pointer bg-white rounded-xl p-6 sm:p-8 mb-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300"
    onClick={onClick}
  >
    <div className="flex items-center space-x-2 mb-4">
      <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
        {post.category}
      </span>
      <span className="text-slate-400 text-xs flex items-center">
        <Calendar size={12} className="mr-1" /> {post.date}
      </span>
    </div>
    
    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mb-3 group-hover:text-indigo-700 transition-colors">
      {post.title}
    </h3>
    
    <p className="text-slate-600 leading-relaxed mb-4 line-clamp-3 font-light">
      {post.excerpt}
    </p>
    
    <div className="flex items-center text-indigo-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
      Read Article <ChevronRight size={16} className="ml-1" />
    </div>
  </article>
);

const PostDetail = ({ post, onBack }: { post: any, onBack: () => void }) => (
  <div className="animate-fade-in max-w-3xl mx-auto">
    <button 
      onClick={onBack}
      className="group flex items-center text-slate-500 hover:text-slate-900 mb-8 transition-colors"
    >
      <div className="bg-white border border-slate-200 p-2 rounded-full mr-3 group-hover:border-slate-900 transition-colors">
        <ArrowLeft size={16} />
      </div>
      <span className="text-sm font-medium">Back to Research Logs</span>
    </button>

    <header className="mb-10">
      <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-slate-500">
        <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-medium">
          {post.category}
        </span>
        <span className="flex items-center">
          <Calendar size={14} className="mr-1.5" /> {post.date}
        </span>
        <span className="flex items-center">
          <Clock size={14} className="mr-1.5" /> {post.readTime}
        </span>
      </div>
      
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight mb-8">
        {post.title}
      </h1>

      <div className="flex items-center space-x-4 border-t border-b border-slate-100 py-6">
        <img src={AUTHOR.avatar} alt={AUTHOR.name} className="w-12 h-12 rounded-full bg-slate-100 object-cover" />
        <div>
          <p className="text-slate-900 font-medium">{AUTHOR.name}</p>
          <p className="text-slate-500 text-sm">PhD Student @ UQ</p>
        </div>
      </div>
    </header>

    <div className="prose prose-slate prose-lg max-w-none">
      {post.content.map((paragraph: string, idx: number) => {
        if (paragraph.startsWith('## ')) {
          return <h2 key={idx} className="text-2xl font-bold text-slate-800 mt-10 mb-4">{paragraph.replace('## ', '')}</h2>;
        }
        return <p key={idx} className="text-slate-600 leading-8 mb-6 text-lg font-light">{paragraph}</p>;
      })}
    </div>

    <div className="mt-12 pt-8 border-t border-slate-100">
      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Keywords</h4>
      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag: string) => (
          <span key={tag} className="flex items-center bg-slate-50 text-slate-600 px-3 py-1 rounded-md text-sm hover:bg-slate-100 transition-colors cursor-default">
            <Tag size={12} className="mr-1.5 opacity-50" /> {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const CVSection = () => (
  <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 sm:p-12 border border-slate-100 shadow-sm">
    {/* Profile Header */}
    <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8 mb-12 border-b border-slate-100 pb-12">
      <img src={AUTHOR.avatar} alt={AUTHOR.name} className="w-32 h-32 rounded-full shadow-lg mb-6 md:mb-0 object-cover bg-indigo-50" />
      <div className="text-center md:text-left flex-1">
        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">{AUTHOR.name}</h2>
        <p className="text-indigo-600 font-medium mb-1 flex items-center justify-center md:justify-start">
          <GraduationCap size={18} className="mr-2" /> {AUTHOR.title}
        </p>
        <p className="text-slate-500 text-sm mb-4">{AUTHOR.university}</p>
        <p className="text-slate-600 leading-relaxed mb-6">
          {AUTHOR.bio}
        </p>
        <div className="flex space-x-4 justify-center md:justify-start">
          <SocialIcon icon={Github} href={AUTHOR.socials.github} />
          <SocialIcon icon={Twitter} href={AUTHOR.socials.twitter} />
          <SocialIcon icon={Linkedin} href={AUTHOR.socials.linkedin} />
          <a href={`mailto:${AUTHOR.email}`} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all">
             <Mail size={20} />
          </a>
        </div>
      </div>
    </div>

    {/* Academic Content */}
    <div className="space-y-10">
      
      <section>
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center uppercase tracking-wider">
          <BookOpen size={20} className="mr-2 text-indigo-500" /> Education
        </h3>
        <div className="space-y-6 pl-2 border-l-2 border-indigo-50 ml-2">
          <div className="pl-6 relative">
             <div className="absolute -left-[9px] top-1.5 w-4 h-4 bg-indigo-500 rounded-full border-4 border-white shadow-sm"></div>
             <h4 className="text-slate-900 font-bold">PhD in Computer Science</h4>
             <p className="text-slate-600">The University of Queensland (UQ)</p>
             <p className="text-slate-400 text-sm mt-1">2024 - Present</p>
          </div>
          <div className="pl-6 relative">
             <div className="absolute -left-[9px] top-1.5 w-4 h-4 bg-slate-200 rounded-full border-4 border-white"></div>
             <h4 className="text-slate-900 font-bold">Master of Science (CS)</h4>
             <p className="text-slate-600">Previous University Name</p>
             <p className="text-slate-400 text-sm mt-1">2021 - 2023</p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center uppercase tracking-wider">
          <FileText size={20} className="mr-2 text-indigo-500" /> Research Interests
        </h3>
        <div className="flex flex-wrap gap-2">
          {["Computer Vision", "Deep Learning", "Optimization", "Generative AI", "Robotics", "Data Mining"].map(tag => (
            <span key={tag} className="px-3 py-1 bg-slate-50 text-slate-700 border border-slate-100 rounded-md text-sm font-medium">
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center uppercase tracking-wider">
          <Award size={20} className="mr-2 text-indigo-500" /> Selected Publications
        </h3>
        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <h4 className="text-slate-900 font-bold text-sm md:text-base">EfficientViT: Rethinking Attention Mechanisms for Vision</h4>
            <p className="text-slate-600 text-sm mt-1">
              <span className="font-semibold text-slate-900">Hongbin Yan</span>, Co-Author A, Co-Author B
            </p>
            <p className="text-indigo-600 text-xs font-semibold mt-2 uppercase">CVPR 2025 (Accepted)</p>
          </div>
          {/* Placeholder for another pub */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <h4 className="text-slate-900 font-bold text-sm md:text-base">A Survey on Multimodal Large Language Models</h4>
            <p className="text-slate-600 text-sm mt-1">
              Co-Author X, <span className="font-semibold text-slate-900">Hongbin Yan</span>
            </p>
            <p className="text-slate-500 text-xs font-semibold mt-2 uppercase">Under Review</p>
          </div>
        </div>
      </section>

    </div>
  </div>
);

export default function App() {
  const [view, setView] = useState<'home' | 'about' | 'post'>('home');
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handlePostClick = (id: number) => {
    setSelectedPostId(id);
    setView('post');
    window.scrollTo(0, 0);
  };

  const handleNavClick = (targetView: 'home' | 'about') => {
    setView(targetView);
    setSelectedPostId(null);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const selectedPost = RESEARCH_LOGS.find(p => p.id === selectedPostId);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 z-50 h-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer group" 
            onClick={() => handleNavClick('home')}
          >
            <div className="w-8 h-8 bg-slate-900 text-white flex items-center justify-center rounded-lg font-serif font-bold text-lg group-hover:bg-indigo-600 transition-colors">
              H
            </div>
            <span className="font-serif font-bold text-xl tracking-tight">Hongbin.Yan</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink isActive={view === 'home' && !selectedPostId} onClick={() => handleNavClick('home')}>
              Research Logs
            </NavLink>
            <NavLink isActive={view === 'about'} onClick={() => handleNavClick('about')}>
              CV & Profile
            </NavLink>
            <div className="w-px h-4 bg-slate-200 mx-2"></div>
            <a href="#" className="p-2 text-slate-400 hover:text-indigo-600 transition-colors" aria-label="Search">
              <Search size={20} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-100 shadow-lg p-4 flex flex-col space-y-2 animate-fade-in-down">
            <button 
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium ${view === 'home' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600'}`}
            >
              Research Logs
            </button>
            <button 
              onClick={() => handleNavClick('about')}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium ${view === 'about' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600'}`}
            >
              CV & Profile
            </button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          
          {/* View Switcher */}
          {view === 'home' && (
            <>
              {/* Hero Section */}
              <section className="mb-16 text-center max-w-3xl mx-auto animate-fade-in">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wide mb-6">
                   <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                   Open to Research Collaboration
                </div>
                <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight">
                  Researching Intelligence,<br/>
                  <span className="text-slate-400 italic">Documenting Discovery.</span>
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-light">
                  Welcome to my academic portfolio. I am a PhD Candidate at the University of Queensland, sharing my experiments, paper reviews, and the journey towards a doctorate in AI.
                </p>
              </section>

              {/* Post Grid */}
              <div className="grid gap-6 max-w-3xl mx-auto">
                {RESEARCH_LOGS.map(post => (
                  <BlogPostCard key={post.id} post={post} onClick={() => handlePostClick(post.id)} />
                ))}
              </div>
              
              {/* Load More (Mock) */}
              <div className="mt-12 text-center">
                <button className="px-8 py-3 bg-white border border-slate-200 text-slate-600 font-medium rounded-full hover:border-slate-900 hover:text-slate-900 transition-all duration-300 shadow-sm hover:shadow hover:-translate-y-0.5">
                  Browse Archived Logs
                </button>
              </div>
            </>
          )}

          {view === 'post' && selectedPost && (
            <PostDetail post={selectedPost} onBack={() => handleNavClick('home')} />
          )}

          {view === 'about' && (
            <CVSection />
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-100 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="font-serif font-bold text-lg text-slate-900">Hongbin Yan</p>
            <p className="text-slate-500 text-sm mt-1">© 2024 The University of Queensland</p>
          </div>
          
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="text-slate-400 hover:text-slate-900 text-sm font-medium transition-colors">Google Scholar</a>
            <a href="#" className="text-slate-400 hover:text-slate-900 text-sm font-medium transition-colors">ResearchGate</a>
            <a href="#" className="text-slate-400 hover:text-slate-900 text-sm font-medium transition-colors">ORCID</a>
          </div>

          <div className="flex space-x-4">
            <SocialIcon icon={Github} href={AUTHOR.socials.github} />
            <SocialIcon icon={Twitter} href={AUTHOR.socials.twitter} />
            <SocialIcon icon={Linkedin} href={AUTHOR.socials.linkedin} />
          </div>
        </div>
      </footer>
    </div>
  );
}