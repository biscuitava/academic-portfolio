import React, { useState, useEffect } from 'react';
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
  Award,
  Send,
  Loader2,
  // 新增图标引用
  Link as LinkIcon,
  FileCode,
  Download
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// --- Firebase Imports ---
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';

// --- Configuration ---

const firebaseConfig = {
  apiKey: "AIzaSyCV-KUuy4N4LTmTO6252mSRfkybwz1pZQ4",
  authDomain: "hongbin-guestbook.firebaseapp.com",
  projectId: "hongbin-guestbook",
  storageBucket: "hongbin-guestbook.firebasestorage.app",
  messagingSenderId: "190048677056",
  appId: "1:190048677056:web:86971f58e2aeee95fed125",
  measurementId: "G-LJ7MN3FFHR"
};

// Initialize Firebase
let db: any;
try {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (error) {
  console.warn("Firebase not initialized. Did you fill in the config?");
}

// --- Data Configuration ---
const AUTHOR = {
  name: "Hongbin Yan",
  title: "PhD Candidate at The University of Queensland",
  university: "School of Chemical Engineering",
  bio: "You are Welcome!",
  avatar: "/avatar.jpg",
  email: "hongbin.yan@uq.edu.au",
  socials: {
    github: "https://github.com/biscuitava",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    scholar: "#" 
  }
};

// 🆕 新增：论文列表数据
const PUBLICATIONS = [
  {
    id: 1,
    title: "Detoxification of copper and zinc from anaerobic digestate effluent by indigenous bacteria: Mechanisms, pathways and metagenomic analysis",
    authors: ["Hongbin Yan", "Zhiqiang Gu", " Qi Zhang"], // 你的名字会自动高亮
    venue: "Journal of Hazardous Materials",
    status: "Accepted",
    year: 2024,
    links: {
      pdf: "/1-JHM.pdf",      // PDF链接
      //code: "#",     // GitHub链接
      //project: "#"   // 项目主页链接
    },
    abstract: "The presence of organic-complexed copper and zinc in anaerobic digestate effluent (ADE) poses persistent ecological toxicity. This study investigated the detoxification performance and biotic responses of indigenous bacteria against ethylene diamine tetraacetic acid (EDTA)-complexed Cu(II) and Zn(II). Heavy metals (HMs) stress induced reactive oxygen species (ROS) generation and enhanced extracellular polymeric substances (EPS)  secretion. At a Cu(II) influent concentration of 20.0 mg⋅L 1, indigenous bacteria removed 88.2% of Cu(II) within nine days. The majority of copper and zinc sequestered by bacteria were stored in the cell envelope, with over 50% of copper and 60% of zinc being immobilized. Transmission electron microscopy mapping (TEM-mapping) revealed significant mineralization of copper and zinc on the cell wall. Proteins abundant in EPS, alongside humic acid-like substances, effectively adsorbed HMs. Indigenous bacteria exhibited the capacity to reduce cupric to the cuprous state and cupric is preferentially reduced to cuprous before reaching reducing capacity saturation. Sulfur precipitation emerges as a crucial pathway for Zn(II) removal. Metagenomic analysis indicated that indigenous bacteria upregulated genes related to HMs homeostasis, efflux, and DNA repair, enhancing its resistance to high concentrations HMs. This study provided theoretical guidance for employing bacterial consortia to eliminate HMs in complex aquatic environments."
  },
  {
    id: 2,
    title: "Elimination of copper obstacle factor in anaerobic digestion effluent for value-added utilization: Performance and resistance mechanisms of indigenous bacterial consortium",
    authors: ["Zhiqiang Gu", "Hongbin Yan", "Qi Zhang"],
    venue: "Water Research",
    status: "Accepted",
    year: 2024,
    links: {
      pdf: "/2-WR.pdf"
    },
    abstract: "The presence of excessive residual Cu(II), a high-risk heavy metal with potential toxicity and biomagnification property, substantially impede the value-added utilization of anaerobic digestion effluent (ADE). This study adapted indigenous bacterial consortium (IBCs) to eliminate Cu(II) from ADE, and their performances and resistance mechanisms against Cu(II) were analyzed. Results demonstrated that when the Cu(II) exposure concentration exceeded 7.5 mg/L, the biomass of IBCs decreased significantly, cells produced a substantial amount of ROS and EPS, at which time the intracellular Cu(II) content gradually decreased, while Cu(II) accumulation within the EPS substantially increased. The combined features of a high PN/PS ratio, a reversed Zeta potential gradient, and abundant functional groups within EPS collectively render EPS a primary diffusion barrier against Cu(II) toxicity. Mutual physiological and metagenomics analyses reveal that EPS synthesis and secretion, efflux, DNA repair along with coordination between each other were the primary resistance mechanisms of IBCs against Cu(II) toxicity. Furthermore, IBCs exhibited enhanced resistance by enriching bacteria carrying relevant resistance genes. Continuous pretreatment of actual ADE with IBCs at a 10-day hydraulic retention time (HRT) efficiently eliminated Cu(II) concentration from 5.01 mg/L to ~0.68 mg/L by day 2. This elimination remained stable for the following 8 days of operation, further validated their good Cu(II) elimination stability. Notably, supplementing IBCs with 200 mg/L polymerized ferrous sulfate significantly enhanced their settling performance. By elucidating the intricate interplay of Cu(II) toxicity and IBC resistance mechanisms, this study provides a theoretical foundation for eliminating heavy metal barriers in ADE treatment."
  },
];

const RESEARCH_LOGS = [
  {
    id: 1,
    title: "基于荧光染料的细胞染色观察",
    excerpt: "本方法用于对活细胞/死细胞或膜受损细胞的观察",
    content: [
      "本方法用于对活细胞/死细胞或膜受损细胞的观察",
      "## 操作流程",
      "1.取200 μL培养物悬液，以10000 rpm离心10 min。注意，悬液体积并不用固定在200 μL，可根据悬液中的细胞浓度按需求稀释或浓缩以保证60倍物镜下视野中细胞分布数量合适（以数的清为标准，过多数不清，过少不具备代表性），在计算时能换算得回去即可。",
      "2.弃去上清液后，将沉淀重悬在200 μL 0.85% NaCl溶液中（不使用PBS的原因是试剂盒说明书中称，PBS对染色效果有些影响）并于室温下避光孵化1h。",
      "3.孵化完成后以10000 rpm离心10 min，弃去上清液后再重悬于200 μL 0.85% NaCl溶液中。",
      "4.加入4 μL AB混合染料，在黑暗条件下孵化15分钟后，离心除去溶液中的染料，再重悬于200 μL 0.85% NaCl溶液中用于镜检。",
      "5.AB混合染料的配制：取A试剂和B试剂1：1混合，而后使用DMSO，即二甲基亚砜稀释10倍，例如，取5 μL A+5 μL B+ 90 μL DMSO。A试剂和B试剂以及配置的混合染料均需保存在-20 ℃条件下。",
      "## Note",
      "由于染料十分昂贵，而镜检时只需几μL的培养液，因此本方法是在染料试剂盒标准操作的基础上将样品采集量和混合染料的添加量减至1/5。",
      "6.镜检：在载玻片上滴加2 μL 染色后的样品，盖上1块预先制备的琼脂片后，再盖上一块盖玻片后上机镜检。使用琼脂片而非直接盖玻片的原因是，琼脂片具有孔隙，能够良好地将细胞固定住，防止其在镜检时发生流动。其中，活细胞在镜检是呈绿色荧光，死细胞/细胞膜受损的细胞将呈红色。",
      "7.琼脂片的制作方法，可参考以下网站和文献：https://biotium.com/tech-tips/tech-tip-imaging-bacteria-using-agarose-pads/, 参考文献：Measuring mRNA copy number in individual Escherichia coli cells using single-molecule fluorescent in situ hybridization. Skinner et al. 2013. Nature Protocols.",
      "![琼脂片的制作](/1.jpg)",
      "8.计数：可通过image J（即新版Fiji，可从Fijis: ImageJ, with Batterie Included下载，计数教程可参考：用imagej对细胞核自动计数（相似结构也行）_哔哩哔哩_bilibili）对活细胞及死细胞分别进行计数。",
      "细胞凋亡率=（死细胞数）/（死活细胞数+活细胞数）",
      "细胞存活率=（活细胞数）/（死活细胞数+活细胞数）"
    ],
    date: "2025-11-22",
    category: "Experimental Protocol",
    readTime: "5 min read",
    tags: ["细胞计数", "荧光染色", "活死细胞鉴别"]
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
        
        const imageMatch = paragraph.match(/^!\[(.*?)\]\((.*?)\)$/);
        if (imageMatch) {
          const alt = imageMatch[1];
          const src = imageMatch[2];
          return (
            <figure key={idx} className="my-8">
              <img 
                src={src} 
                alt={alt} 
                className="w-full rounded-lg shadow-md border border-slate-100" 
              />
              {alt && (
                <figcaption className="text-center text-slate-500 text-sm mt-2 italic">
                  {alt}
                </figcaption>
              )}
            </figure>
          );
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

// 🆕 新增组件：Publications Section
const PublicationsSection = () => (
  <div className="max-w-3xl mx-auto animate-fade-in">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Publications</h2>
      <p className="text-slate-500">Selected research papers and conference proceedings.</p>
    </div>

    <div className="space-y-8">
      {PUBLICATIONS.map((pub) => (
        <div key={pub.id} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
             <span className={`px-3 py-1 text-xs font-bold rounded-full mb-2 sm:mb-0 ${
               pub.status === 'Accepted' || pub.status === 'Published' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
             }`}>
               {pub.status}
             </span>
             <span className="text-slate-400 text-sm font-medium">{pub.venue} | {pub.year}</span>
          </div>

          <h3 className="text-xl font-serif font-bold text-slate-900 mb-3 leading-snug">
            {pub.title}
          </h3>

          <p className="text-slate-600 text-sm mb-4">
            {pub.authors.map((author, idx) => (
              <span key={idx} className={author === AUTHOR.name ? "font-bold text-slate-900" : ""}>
                {author}{idx < pub.authors.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>

          <p className="text-slate-500 text-sm leading-relaxed mb-6 border-l-2 border-slate-100 pl-4 italic">
            "{pub.abstract}"
          </p>

          <div className="flex gap-3">
            {pub.links.pdf && (
              <a href={pub.links.pdf} className="flex items-center px-3 py-1.5 bg-slate-50 text-slate-700 rounded-md text-sm hover:bg-slate-100 transition-colors">
                <Download size={16} className="mr-2" /> PDF
              </a>
            )}
            {pub.links.code && (
              <a href={pub.links.code} className="flex items-center px-3 py-1.5 bg-slate-50 text-slate-700 rounded-md text-sm hover:bg-slate-100 transition-colors">
                <FileCode size={16} className="mr-2" /> Code
              </a>
            )}
             {pub.links.project && (
              <a href={pub.links.project} className="flex items-center px-3 py-1.5 bg-slate-50 text-slate-700 rounded-md text-sm hover:bg-slate-100 transition-colors">
                <LinkIcon size={16} className="mr-2" /> Project Page
              </a>
            )}
          </div>
        </div>
      ))}
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
             <h4 className="text-slate-900 font-bold">PhD in Chemical Engineering</h4>
             <p className="text-slate-600">The University of Queensland (UQ)</p>
             <p className="text-slate-400 text-sm mt-1">2025 - Present</p>
          </div>
          <div className="pl-6 relative">
             <div className="absolute -left-[9px] top-1.5 w-4 h-4 bg-slate-200 rounded-full border-4 border-white"></div>
             <h4 className="text-slate-900 font-bold">Master of Food Science and Engineering</h4>
             <p className="text-slate-600">Nanchang University</p>
             <p className="text-slate-400 text-sm mt-1">2022 - 2025</p>
          </div>
          <div className="pl-6 relative">
             <div className="absolute -left-[9px] top-1.5 w-4 h-4 bg-slate-200 rounded-full border-4 border-white"></div>
             <h4 className="text-slate-900 font-bold">Bachelor of Food Science and Engineering</h4>
             <p className="text-slate-600">Nanchang University</p>
             <p className="text-slate-400 text-sm mt-1">2018 - 2022</p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center uppercase tracking-wider">
          <FileText size={20} className="mr-2 text-indigo-500" /> Research Interests
        </h3>
        <div className="flex flex-wrap gap-2">
          {["Microalgal technology", "Wasetewater treament", "Antibiotics pollution", "ARGs"].map(tag => (
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
            <h4 className="text-slate-900 font-bold text-sm md:text-base">Detoxification of copper and zinc from anaerobic digestate effluent by indigenous bacteria: Mechanisms, pathways and metagenomic analysis</h4>
            <p className="text-slate-600 text-sm mt-1">
              <span className="font-semibold text-slate-900">Hongbin Yan</span>, Zhiqiang Gu, Qi Zhang
            </p>
            <p className="text-indigo-600 text-xs font-semibold mt-2 uppercase">Journal of Hazardous Materials (Accepted)</p>
          </div>
          {/* Placeholder for another pub */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <h4 className="text-slate-900 font-bold text-sm md:text-base">Development of microalgae-bacteria symbiosis system for enhanced treatment of biogas slurry</h4>
            <p className="text-slate-600 text-sm mt-1">
              <span className="font-semibold text-slate-900">Hongbin Yan</span>, Rumeng Lu, Qi Zhang
            </p>
            <p className="text-indigo-600 text-xs font-semibold mt-2 uppercase">Bioresource Techonology (Accepted)</p>
          </div>
        </div>
      </section>

    </div>
  </div>
);

const GuestbookSection = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newName, setNewName] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Fetch messages
  useEffect(() => {
    if (!db) return;
    
    const q = query(
      collection(db, 'guestbook'), 
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgs);
    }, (err) => {
      console.error("Error fetching messages:", err);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!db) {
      setError("Database connection failed. Check your Firebase config.");
      return;
    }
    if (!newName.trim() || !newMessage.trim()) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'guestbook'), {
        name: newName,
        message: newMessage,
        createdAt: serverTimestamp()
      });
      setNewMessage('');
    } catch (err) {
      console.error("Error adding message:", err);
      setError("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Guestbook</h2>
        <p className="text-slate-500">Leave a message, ask a question, or just say hi!</p>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm mb-10">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
            <input 
              type="text" 
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 outline-none transition-all"
              placeholder="e.g. Alice Researcher"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
            <textarea 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 outline-none transition-all h-24 resize-none"
              placeholder="Write your message here..."
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="flex items-center justify-center w-full bg-slate-900 text-white font-medium py-2.5 rounded-lg hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? <Loader2 className="animate-spin mr-2" size={18} /> : <Send className="mr-2" size={18} />}
            {isSubmitting ? 'Sending...' : 'Sign Guestbook'}
          </button>
        </form>
      </div>

      {/* Message List */}
      <div className="space-y-6">
        {messages.length === 0 ? (
          <div className="text-center text-slate-400 py-10 italic">
            No messages yet. Be the first to write one!
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="bg-white p-6 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm mr-3">
                    {msg.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-bold text-slate-900">{msg.name}</span>
                </div>
                <span className="text-xs text-slate-400">
                  {msg.createdAt?.toDate ? formatDistanceToNow(msg.createdAt.toDate(), { addSuffix: true }) : 'Just now'}
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<'home' | 'about' | 'post' | 'guestbook' | 'publications'>('home');
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handlePostClick = (id: number) => {
    setSelectedPostId(id);
    setView('post');
    window.scrollTo(0, 0);
  };

  const handleNavClick = (targetView: 'home' | 'about' | 'guestbook' | 'publications') => {
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
            <NavLink isActive={view === 'publications'} onClick={() => handleNavClick('publications')}>
              Publications
            </NavLink>
            <NavLink isActive={view === 'about'} onClick={() => handleNavClick('about')}>
              CV & Profile
            </NavLink>
            <NavLink isActive={view === 'guestbook'} onClick={() => handleNavClick('guestbook')}>
              Guestbook
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
              onClick={() => handleNavClick('publications')}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium ${view === 'publications' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600'}`}
            >
              Publications
            </button>
            <button 
              onClick={() => handleNavClick('about')}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium ${view === 'about' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600'}`}
            >
              CV & Profile
            </button>
            <button 
              onClick={() => handleNavClick('guestbook')}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium ${view === 'guestbook' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600'}`}
            >
              Guestbook
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
                  Well come to my Channel,<br/>
                  <span className="text-slate-400 italic">Documenting Discovery.</span>
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-light">
                  Sharing experiments protocols, papers, and the journey towards a doctorate in Chemical Engineering.
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

          {view === 'publications' && (
            <PublicationsSection />
          )}

          {view === 'about' && (
            <CVSection />
          )}

          {view === 'guestbook' && (
            <GuestbookSection />
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