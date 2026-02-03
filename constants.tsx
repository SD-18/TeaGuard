import { TranslationSet, Language } from './types';

export const translations: Record<Language, any> = {
  en: {
    navHome: "Home",
    navAnalyze: "Analyzer",
    navGuide: "Guide",
    navAbout: "About",
    heroTag: "Assam's #1 Agri-Tech Tool",
    heroTitle: "Protect Your Harvest With AI Precision.",
    heroSubtitle: "Deploy cutting-edge machine learning to identify tea leaf diseases instantly.",
    btnStart: "Start Analysis",
    statsAccuracy: "Diagnostic Accuracy",
    statsSamples: "Trained Samples",
    statsLatency: "Processing Speed",
    statsFocus: "Regional Focus",
    // Analyzer Specific
    labTitle: "Tea Leaf Diagnostic Lab",
    labSubtitle: "Precision Diagnostics • Sustainable Management • Better Yields",
    uploadPrompt: "Click to upload tea leaf",
    runBtn: "Run Diagnostics",
    analyzingBtn: "Analyzing Sample...",
    scanAnother: "Scan Another Leaf",
    readyMsg: "Ready for diagnostics",
    mlInference: "Running ML Inference",
    confidenceScore: "Confidence Score",
    recommendedActions: "Recommended Actions",
    heatmapLabel: "Heatmap Generated",
    severityLabel: "Severity",
    treatmentDB: {
      "Blister_Blight": [
        "Prune infected shoots and destroy them outside the garden to prevent spore spread.",
        "Improve air circulation by thinning the tea bush canopy to reduce micro-climate humidity.",
        "Apply copper-based fungicides only on localized infected patches to minimize chemical use.",
        "Avoid applying heavy nitrogenous fertilizers during peak monsoon periods."
      ],
      "Tea_Mosquito_Bug": [
        "Conduct early morning monitoring for necrotic spots on fresh succulent shoots.",
        "Utilize neem-based formulations as a natural deterrent for young nymphs.",
        "Remove alternative hosts like 'Mikania micrantha' from the surrounding area.",
        "Focus spraying only on affected blocks to maintain ecological balance."
      ],
      "Leaf_Red_Rust": [
        "Improve garden drainage to eliminate waterlogging conditions favored by algae.",
        "Apply a balanced potash fertilizer to strengthen the plant's natural immunity.",
        "Manually remove heavy algal crusts from the main stems during the dormant season."
      ],
      "Healthy_leaves": [
        "Maintain existing irrigation and organic fertilization schedules.",
        "Continue weekly monitoring to ensure early detection of future pest arrivals."
      ]
    },
    infoTag: "Knowledge Base",
    infoTitle: "Expert Guides for Successful Harvests.",
    viewResources: "View All Resources",
    readArticle: "Read Article",
    guides: [
      {
        title: "Recognizing Blister Blight",
        desc: "Small yellowish spots on tea leaves that expand into translucent patches.",
        img: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=400"
      },
      {
        title: "Red Spider Mite Detection",
        desc: "Look for tiny reddish specks on the underside of leaves and faint webbing.",
        img: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&q=80&w=400"
      },
      {
        title: "Soil pH Management",
        desc: "Assam tea thrives in acidic soil (pH 4.5-5.5). Regular testing is vital.",
        img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=400"
      }
    ]
  },
  as: {
    navHome: "গৃহ",
    navAnalyze: "বিশ্লেষণ",
    navGuide: "নিৰ্দেশিকা",
    navAbout: "বিষয়ে",
    heroTag: "অসমৰ প্ৰথম কৃষি-প্ৰযুক্তি সঁজুলি",
    heroTitle: "অসমৰ খেতি সুৰক্ষিত কৰক।",
    heroSubtitle: "চাহ পাতৰ ৰোগসমূহ তৎক্ষণাত চিনাক্ত কৰিবলৈ অত্যাধুনিক মেচিন লাৰ্নিং ব্যৱহাৰ কৰক।",
    btnStart: "বিশ্লেষণ আৰম্ভ কৰক",
    statsAccuracy: "নিদানিক শুদ্ধতা",
    statsSamples: "প্ৰশিক্ষিত নমুনা",
    statsLatency: "সংস্কৰণৰ গতি",
    statsFocus: "আঞ্চলিক গুৰুত্ব",
    // Analyzer Specific
    labTitle: "চাহ পাত নিদান পৰীক্ষাগাৰ",
    labSubtitle: "স pol সঠিক নিদান • বহনক্ষম ব্যৱস্থাপনা • উন্নত উৎপাদন",
    uploadPrompt: "চাহ পাত আপলোড কৰিবলৈ ক্লিক কৰক",
    runBtn: "পৰীক্ষা আৰম্ভ কৰক",
    analyzingBtn: "বিশ্লেষণ কৰি থকা হৈছে...",
    scanAnother: "অন্য এটা পাত স্কেন কৰক",
    readyMsg: "নিদানৰ বাবে সাজু",
    mlInference: "ML ইনফাৰেন্স চলি আছে",
    confidenceScore: "বিশ্বাসযোগ্যতাৰ স্কোৰ",
    recommendedActions: "পৰামৰ্শ দিয়া পদক্ষেপ",
    heatmapLabel: "হীটমেপ সৃষ্টি কৰা হৈছে",
    severityLabel: "তীব্ৰতা",
    treatmentDB: {
      "Blister_Blight": [
        "সংক্ৰমিত ডালবোৰ কাটি বাগিচাৰ বাহিৰত ধ্বংস কৰক যাতে বীজাণু বিয়পিব নোৱাৰে।",
        "আদ্ৰতা হ্ৰাস কৰিবলৈ চাহ গছৰ ডালবোৰ পাতল কৰি বায়ু চলাচল উন্নত কৰক।",
        "ৰাসায়নিক ব্যৱহাৰ কম কৰিবলৈ কেৱল সংক্ৰমিত অংশত তাম-ভিত্তিক ভেঁকুৰনাশক প্ৰয়োগ কৰক।",
        "অধিক বৰষুণৰ সময়ত গধুৰ নাইট্ৰজেনযুক্ত সাৰ প্ৰয়োগ কৰাৰ পৰা বিৰত থাকক।"
      ],
      "Tea_Mosquito_Bug": [
        "কোমল ডালত হোৱা ক’লা দাগবোৰৰ বাবে পুৱাই নিৰীক্ষণ কৰক।",
        "কীট-পতংগৰ বাবে প্ৰাকৃতিক প্ৰতিৰোধক হিচাপে নিম-ভিত্তিক দৰব ব্যৱহাৰ কৰক।",
        "চৰিওফালৰ পৰা 'মিাকানিয়া মিক্ৰান্থা' (পানী লতা) ৰ দৰে অপতৃণ আঁতৰাওক।",
        "পাৰিপাৰ্শ্বিক ভাৰসাম্য ৰক্ষাৰ বাবে কেৱল আক্ৰান্ত অঞ্চলতহে দৰব ছটিয়াব।"
      ],
      "Leaf_Red_Rust": [
        "শেলাইৰ বাবে অনুকূল জলমগ্ন অৱস্থা দূৰ কৰিবলৈ বাগিচাৰ পানী নিষ্কাশন ব্যৱস্থা উন্নত কৰক।",
        "গছজোপাৰ প্ৰাকৃতিক ৰোগ প্ৰতিৰোধ ক্ষমতা শক্তিশালী কৰিবলৈ পটাছ সাৰ প্ৰয়োগ কৰক।",
        "শীতকালত মূল কাণ্ডৰ পৰা শেলাইৰ তৰপবোৰ হাতেৰে আঁতৰাই পেলাওক।"
      ],
      "Healthy_leaves": [
        "বৰ্তমানৰ জলসিঞ্চন আৰু জৈৱিক সাৰ প্ৰয়োগৰ সময়সূচী বজাই ৰাখক।",
        "ভৱিষ্যতে কীট-পতংগৰ আগমন আগতীয়াকৈ ধৰা পেলাবলৈ সাপ্তাহিক নিৰীক্ষণ অব্যাহত ৰাখক।"
      ]
    },
    infoTag: "জ্ঞান ভাণ্ডাৰ",
    infoTitle: "সফল চপোৱাৰ বাবে বিশেষজ্ঞৰ নিৰ্দেশিকা।",
    viewResources: "সকলো সম্পদ চাওক",
    readArticle: "প্ৰবন্ধটো পঢ়ক",
    guides: [
      {
        title: "ব্লীষ্টাৰ ব্লাইট চিনাক্তকৰণ",
        desc: "চাহ পাতত সৰু হালধীয়া দাগ যিবোৰ ক্ৰমান্বয়ে স্বচ্ছ টুকুৰালৈ বিস্তাৰিত হয়।",
        img: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=400"
      },
      {
        title: "ৰঙা মকৰা পোক ধৰা পেলোৱা",
        desc: "পাতৰ তলৰ ফালে সৰু ৰঙা ফুট আৰু পাতল মকৰা জালৰ উপস্থিতি পৰীক্ষা কৰক।",
        img: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&q=80&w=400"
      },
      {
        title: "মাটিৰ pH ব্যৱস্থাপনা",
        desc: "অসমৰ চাহ আম্লিক মাটিত (pH ৪.৫-৫.৫) ভাল হয়। নিয়মীয়া পৰীক্ষা অতি প্ৰয়োজনীয়।",
        img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=400"
      }
    ]
  }
};