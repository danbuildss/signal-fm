'use client'

import React, { useState, useMemo } from 'react';

// Podcast data from CSV with ALL correct social links
const podcastData = [
  {
    id: 1,
    podcast_name: "The Edge Podcast",
    host_name: "DeFi Dad, Nomaticcap",
    skill_level: "Intermediate",
    podcast_type: "Signal Pod",
    primary_topics: ["DeFi", "Trading & Markets", "Layer 1 / Layer 2"],
    description: "Uncovering next-gen crypto protocols and yield strategies with deep dives into DeFi mechanics and alpha opportunities.",
    links: { 
      x: "https://x.com/edge_pod", 
      youtube: "https://www.youtube.com/@edge_pod", 
      website: "https://theedgepodcast.substack.com", 
      spotify: "https://open.spotify.com/show/0UAR9zzXKqqCmAIbGX0fhD" 
    }
  },
  {
    id: 2,
    podcast_name: "Milk Road",
    host_name: "Milk Road Team",
    skill_level: "Noob",
    podcast_type: "News Pod",
    primary_topics: ["Trading & Markets", "AI x Crypto", "Web3 Startups & Founders"],
    description: "Daily insights on crypto, macro, and AI investing. Perfect for beginners wanting to stay informed without the jargon.",
    links: { 
      x: "https://x.com/MilkRoad", 
      youtube: "https://www.youtube.com/@MilkRoad", 
      website: "https://www.milkroad.com", 
      spotify: "https://open.spotify.com/show/7F0Z1wA2jK3MilkRoad" 
    }
  },
  {
    id: 3,
    podcast_name: "Bell Curve",
    host_name: "Mike Ippolito, Myles Oneil, Ave",
    skill_level: "Advanced",
    podcast_type: "Signal Pod",
    primary_topics: ["AI x Crypto", "DeFi", "Web3 Startups & Founders"],
    description: "For degens in the middle of the bell curve. Deep discussions on crypto x AI, DePIN, and open source monetization strategies.",
    links: { 
      x: "https://x.com/thebellcurvepod", 
      youtube: "https://www.youtube.com/@thebellcurvepod", 
      website: "https://bellcurve.xyz", 
      spotify: "https://open.spotify.com/show/5thebellcurvepod" 
    }
  },
  {
    id: 4,
    podcast_name: "Empire",
    host_name: "Jason Yanowitz, Santiago Roel, Mike Hadick",
    skill_level: "Intermediate",
    podcast_type: "Macro Pod",
    primary_topics: ["Trading & Markets", "AI x Crypto", "Regulation"],
    description: "Peek behind crypto's curtain with institutional-grade analysis on macro trends, AI impact, and market-moving decisions.",
    links: { 
      x: "https://x.com/theempirepod", 
      youtube: "https://www.youtube.com/@theempirepod", 
      website: "https://www.blockworks.co/podcasts/empire", 
      spotify: "https://open.spotify.com/show/theempirepod" 
    }
  },
  {
    id: 5,
    podcast_name: "0xResearch",
    host_name: "Salve Boccaccio, DeFi Kay",
    skill_level: "Advanced",
    podcast_type: "Signal Pod",
    primary_topics: ["DeFi", "Trading & Markets", "Layer 1 / Layer 2"],
    description: "Deep crypto research and market outlook from Blockworks' research arm. Data-driven analysis for serious investors.",
    links: { 
      x: "https://x.com/0xResearch", 
      youtube: "https://www.youtube.com/@0xResearch", 
      website: "https://www.blockworks.co/podcasts/0xresearch", 
      spotify: "https://open.spotify.com/show/0xresearch" 
    }
  },
  {
    id: 6,
    podcast_name: "Lightspeed",
    host_name: "DeFi Kay",
    skill_level: "Intermediate",
    podcast_type: "Signal Pod",
    primary_topics: ["Layer 1 / Layer 2", "DeFi", "Trading & Markets"],
    description: "For the Solana community. Deep dives into Solana investing, DeFi protocols, perps trading, and ecosystem developments.",
    links: { 
      x: "https://x.com/Lightspeedpodhq", 
      youtube: "https://www.youtube.com/@Lightspeedpodhq", 
      website: "https://www.blockworks.co/podcasts/lightspeed", 
      spotify: "https://open.spotify.com/show/lightspeedpodhq" 
    }
  },
  {
    id: 7,
    podcast_name: "Supply Shock",
    host_name: "Pete Rizzo",
    skill_level: "Advanced",
    podcast_type: "Signal Pod",
    primary_topics: ["Layer 1 / Layer 2", "Trading & Markets", "Regulation"],
    description: "Bends toward Bitcoin with analysis on cycles, quantum risk, and monetary policy. Essential for Bitcoin maximalists and macro traders.",
    links: { 
      x: "https://x.com/SupplyShockBW", 
      youtube: "https://www.youtube.com/@SupplyShockBW", 
      website: "https://www.blockworks.co/podcasts/supplyshock", 
      spotify: "https://open.spotify.com/show/supplyshock" 
    }
  },
  {
    id: 8,
    podcast_name: "Crypto In America",
    host_name: "Jacq Melinek, Eleanor Terrett, Gerald",
    skill_level: "Intermediate",
    podcast_type: "Signal Pod",
    primary_topics: ["Regulation", "Web3 Startups & Founders", "Trading & Markets"],
    description: "Interviews with influential crypto minds on policy, legal frameworks, and the future of digital assets in America.",
    links: { 
      x: "https://x.com/CryptoAmerica_", 
      youtube: "https://www.youtube.com/@CryptoAmerica_", 
      website: "", 
      spotify: "https://open.spotify.com/show/cryptoamerica" 
    }
  },
  {
    id: 9,
    podcast_name: "1000x",
    host_name: "Avi Felman, JVB",
    skill_level: "Advanced",
    podcast_type: "Signal Pod",
    primary_topics: ["Trading & Markets", "DeFi", "Layer 1 / Layer 2"],
    description: "Crypto markets podcast for serious traders. Technical analysis, market structure, and alpha generation strategies.",
    links: { 
      x: "https://x.com/1000xPod", 
      youtube: "https://www.youtube.com/@1000xPod", 
      website: "https://www.blockworks.co/podcasts/1000x", 
      spotify: "https://open.spotify.com/show/1000xpod" 
    }
  },
  {
    id: 10,
    podcast_name: "The Rollup",
    host_name: "Andy, Robbie",
    skill_level: "Advanced",
    podcast_type: "Signal Pod",
    primary_topics: ["DeFi", "Web3 Startups & Founders", "Layer 1 / Layer 2"],
    description: "Face-to-face with neo finance leaders. Tokenization, institutional adoption, and the future of financial infrastructure.",
    links: { 
      x: "https://x.com/therollupco", 
      youtube: "https://www.youtube.com/@therollupco", 
      website: "https://therollup.co", 
      spotify: "https://open.spotify.com/show/therollupco" 
    }
  },
  {
    id: 11,
    podcast_name: "11AM w/ Seed Club",
    host_name: "Seed Club",
    skill_level: "Intermediate",
    podcast_type: "Story Pod",
    primary_topics: ["Web3 Startups & Founders", "DAOs", "NFTs"],
    description: "Stories behind tokens and the conviction it takes to build in Web3. Founder journeys, DAO experiments, and community building.",
    links: { 
      x: "https://x.com/11AMdotclub", 
      youtube: "https://www.youtube.com/@11amdotclub", 
      website: "", 
      spotify: "https://open.spotify.com/show/11amdotclub" 
    }
  },
  {
    id: 12,
    podcast_name: "Ready for Merge",
    host_name: "Christine Kim",
    skill_level: "Advanced",
    podcast_type: "Signal Pod",
    primary_topics: ["Layer 1 / Layer 2", "DeFi", "Regulation"],
    description: "What's ready for merge in ETH/BTC protocol development. Technical deep-dives into consensus mechanisms and network upgrades.",
    links: { 
      x: "https://x.com/ready4merge", 
      youtube: "https://www.youtube.com/@ready4merge", 
      website: "https://protocolwatch.com/", 
      spotify: "https://open.spotify.com/show/ready4merge" 
    }
  },
  {
    id: 13,
    podcast_name: "Unchained",
    host_name: "Laura Shin",
    skill_level: "Intermediate",
    podcast_type: "Signal Pod",
    primary_topics: ["Regulation", "Web3 Startups & Founders", "Trading & Markets"],
    description: "Global crypto news and in-depth interviews with industry leaders. Investigative journalism meets crypto education.",
    links: { 
      x: "https://x.com/Unchained_pod", 
      youtube: "https://www.youtube.com/@Unchained_pod", 
      website: "https://unchainedcrypto.com", 
      spotify: "https://open.spotify.com/show/unchained" 
    }
  },
  {
    id: 14,
    podcast_name: "Modern Market",
    host_name: "Modern Market",
    skill_level: "Noob",
    podcast_type: "Micro Pod",
    primary_topics: ["NFTs", "Trading & Markets", "Web3 Startups & Founders"],
    description: "For internet entrepreneurs exploring crypto and NFTs. Learn how to make money online in the new digital economy.",
    links: { 
      x: "https://x.com/modernmarket_", 
      youtube: "https://www.youtube.com/@modernmarket_", 
      website: "", 
      spotify: "https://open.spotify.com/show/modernmarket" 
    }
  },
  {
    id: 15,
    podcast_name: "Pomp Podcast",
    host_name: "Anthony Pompliano",
    skill_level: "Intermediate",
    podcast_type: "Macro Pod",
    primary_topics: ["Trading & Markets", "Web3 Startups & Founders", "Regulation"],
    description: "Future of business, finance, and technology. Conversations with founders, investors, and thought leaders shaping tomorrow.",
    links: { 
      x: "https://x.com/PompPodcast", 
      youtube: "https://www.youtube.com/@PompPodcast", 
      website: "https://anthonypompliano.com/", 
      spotify: "https://open.spotify.com/show/pomppodcast" 
    }
  },
  {
    id: 16,
    podcast_name: "Zero Knowledge",
    host_name: "Anna Rose",
    skill_level: "Giga Brain",
    podcast_type: "Signal Pod",
    primary_topics: ["Layer 1 / Layer 2", "AI x Crypto", "DeFi"],
    description: "Decentralization and ZK proof technology explained by researchers and builders. The most technical crypto podcast out there.",
    links: { 
      x: "https://x.com/zeroknowledgefm", 
      youtube: "https://www.youtube.com/@zeroknowledgefm", 
      website: "https://zeroknowledge.fm", 
      spotify: "https://open.spotify.com/show/zeroknowledge" 
    }
  },
  {
    id: 17,
    podcast_name: "The Breakdown",
    host_name: "NLW",
    skill_level: "Intermediate",
    podcast_type: "News Pod",
    primary_topics: ["Trading & Markets", "Regulation", "Layer 1 / Layer 2"],
    description: "Daily crypto analysis and breakdowns of market-moving events. Stay informed with concise, actionable insights.",
    links: { 
      x: "https://x.com/nlw", 
      youtube: "https://www.youtube.com/@nlw", 
      website: "", 
      spotify: "https://open.spotify.com/show/thebreakdown" 
    }
  },
  {
    id: 18,
    podcast_name: "web3 with a16z",
    host_name: "a16z crypto",
    skill_level: "Advanced",
    podcast_type: "Signal Pod",
    primary_topics: ["Web3 Startups & Founders", "Layer 1 / Layer 2", "Regulation"],
    description: "Building the next internet. Insights from Andreessen Horowitz's crypto team on infrastructure, regulation, and startup building.",
    links: { 
      x: "https://x.com/a16zcrypto", 
      youtube: "https://www.youtube.com/@a16zcrypto", 
      website: "https://a16zcrypto.com", 
      spotify: "https://open.spotify.com/show/web3witha16z" 
    }
  },
  {
    id: 19,
    podcast_name: "The Scoop",
    host_name: "Frank Chaparro",
    skill_level: "Intermediate",
    podcast_type: "News Pod",
    primary_topics: ["Trading & Markets", "Regulation", "Web3 Startups & Founders"],
    description: "The crypto scoop from CoinDesk. Breaking news, exclusive interviews, and market analysis from the newsroom.",
    links: { 
      x: "https://x.com/CoinDeskPodcast", 
      youtube: "https://www.youtube.com/@CoinDeskPodcast", 
      website: "https://coindesk.com", 
      spotify: "https://open.spotify.com/show/thescoop" 
    }
  },
  {
    id: 20,
    podcast_name: "CRYPTO 101",
    host_name: "CRYPTO 101 Team",
    skill_level: "Noob",
    podcast_type: "Story Pod",
    primary_topics: ["DeFi", "Trading & Markets", "Layer 1 / Layer 2"],
    description: "Crypto interviews and analysis for beginners. Learn the fundamentals without feeling overwhelmed by technical jargon.",
    links: { 
      x: "https://x.com/CRYPTO101Pod", 
      youtube: "https://www.youtube.com/@CRYPTO101Pod", 
      website: "https://crypto101podcast.com", 
      spotify: "https://open.spotify.com/show/crypto101" 
    }
  },
  {
    id: 21,
    podcast_name: "Touch Grass",
    host_name: "Gutta, Rachit",
    skill_level: "Intermediate",
    podcast_type: "Story Pod",
    primary_topics: ["Trading & Markets", "Web3 Startups & Founders", "DeFi"],
    description: "Crypto conversations that keep you grounded. Real talk about markets, building, and maintaining sanity in volatile times.",
    links: { 
      x: "https://x.com/touchgrass_pod", 
      youtube: "https://www.youtube.com/@touchgrass_pod", 
      website: "", 
      spotify: "https://open.spotify.com/show/touchgrass" 
    }
  },
  {
    id: 22,
    podcast_name: "Blockspace",
    host_name: "W.S. Foxley",
    skill_level: "Advanced",
    podcast_type: "Signal Pod",
    primary_topics: ["Layer 1 / Layer 2", "Trading & Markets", "Regulation"],
    description: "Bitcoin for Wall Street. Institutional-grade analysis bridging traditional finance and digital assets.",
    links: { 
      x: "https://x.com/blockspace", 
      youtube: "https://www.youtube.com/@blockspace", 
      website: "https://blockspace.media", 
      spotify: "https://open.spotify.com/show/blockspace" 
    }
  },
  {
    id: 23,
    podcast_name: "Talking Tokens",
    host_name: "Jacq Melinek",
    skill_level: "Intermediate",
    podcast_type: "Story Pod",
    primary_topics: ["Web3 Startups & Founders", "DeFi", "NFTs"],
    description: "Crypto leaders share their stories, failures, and lessons learned. Authentic conversations about building in Web3.",
    links: { 
      x: "https://x.com/_TalkingTokens", 
      youtube: "https://www.youtube.com/@_TalkingTokens", 
      website: "", 
      spotify: "https://open.spotify.com/show/talkingtokens" 
    }
  },
  {
    id: 24,
    podcast_name: "Day1Global",
    host_name: "Star Zq, Ruby Wang",
    skill_level: "Advanced",
    podcast_type: "Signal Pod",
    primary_topics: ["AI x Crypto", "Web3 Startups & Founders", "Trading & Markets"],
    description: "Born global crypto and AI investing. Cross-border perspectives on emerging technologies and market opportunities.",
    links: { 
      x: "https://x.com/day1globalpod", 
      youtube: "https://www.youtube.com/@day1globalpod", 
      website: "", 
      spotify: "https://open.spotify.com/show/day1global" 
    }
  },
  {
    id: 25,
    podcast_name: "Cryptonews",
    host_name: "Matt Zahab",
    skill_level: "Intermediate",
    podcast_type: "News Pod",
    primary_topics: ["Trading & Markets", "Regulation", "Web3 Startups & Founders"],
    description: "Crypto interviews and news coverage. Stay updated with the latest developments across the entire crypto ecosystem.",
    links: { 
      x: "https://x.com/mattzahab", 
      youtube: "https://www.youtube.com/@mattzahab", 
      website: "https://cryptonews.com", 
      spotify: "https://open.spotify.com/show/cryptonews" 
    }
  },
  {
    id: 26,
    podcast_name: "Token Thoughts",
    host_name: "Lindsey",
    skill_level: "Intermediate",
    podcast_type: "Story Pod",
    primary_topics: ["Web3 Startups & Founders", "NFTs", "DAOs"],
    description: "Stories behind crypto projects and the humans building them. Thoughtful conversations about vision and execution.",
    links: { 
      x: "https://x.com/tokenthoughts_", 
      youtube: "https://www.youtube.com/@tokenthoughts_", 
      website: "", 
      spotify: "https://open.spotify.com/show/tokenthoughts" 
    }
  },
  {
    id: 27,
    podcast_name: "When Shift Happens",
    host_name: "Kevin",
    skill_level: "Intermediate",
    podcast_type: "Story Pod",
    primary_topics: ["Web3 Startups & Founders", "Trading & Markets", "DeFi"],
    description: "Conversations with crypto's most credible people. Life-changing moments and the decisions that shaped their journeys.",
    links: { 
      x: "https://x.com/kevinwshpod", 
      youtube: "https://www.youtube.com/@kevinwshpod", 
      website: "", 
      spotify: "https://open.spotify.com/show/kevinwsh" 
    }
  },
  {
    id: 28,
    podcast_name: "ThinkCrypto",
    host_name: "ThinkCrypto",
    skill_level: "Noob",
    podcast_type: "News Pod",
    primary_topics: ["Trading & Markets", "Regulation", "Layer 1 / Layer 2"],
    description: "Thinking Crypto through news and interviews. Accessible explanations for those new to the digital asset space.",
    links: { 
      x: "https://x.com/thinkcryptopod", 
      youtube: "https://www.youtube.com/@thinkcryptopod", 
      website: "", 
      spotify: "https://open.spotify.com/show/thinkcrypto" 
    }
  },
  {
    id: 29,
    podcast_name: "Seeksahib",
    host_name: "Seeksahib",
    skill_level: "Intermediate",
    podcast_type: "Signal Pod",
    primary_topics: ["Layer 1 / Layer 2", "Trading & Markets", "DeFi"],
    description: "Talking Bitcoin with depth and nuance. Technical analysis meets philosophical exploration of sound money.",
    links: { 
      x: "https://x.com/seeksahib", 
      youtube: "", 
      website: "", 
      spotify: "" 
    }
  },
  {
    id: 30,
    podcast_name: "0xSteadyLads",
    host_name: "Taiki Maeda, Gametheorizing, Justin Bram",
    skill_level: "Advanced",
    podcast_type: "Signal Pod",
    primary_topics: ["DeFi", "Trading & Markets", "Layer 1 / Layer 2"],
    description: "Most watched crypto podcast. No-filter discussions on DeFi strategies, market dynamics, and alpha generation.",
    links: { 
      x: "https://x.com/0xsteadylads", 
      youtube: "https://www.youtube.com/@0xsteadylads", 
      website: "", 
      spotify: "https://open.spotify.com/show/0xsteadylads" 
    }
  },
  {
    id: 31,
    podcast_name: "Good Game",
    host_name: "Imran Khan, QW Qiao",
    skill_level: "Advanced",
    podcast_type: "Signal Pod",
    primary_topics: ["Web3 Startups & Founders", "Trading & Markets", "DeFi"],
    description: "No BS insights from crypto founders and operators. Real talk about what's working and what's not in Web3.",
    links: { 
      x: "https://x.com/goodgamepodxyz", 
      youtube: "https://www.youtube.com/@goodgamepodxyz", 
      website: "", 
      spotify: "https://open.spotify.com/show/goodgame" 
    }
  },
  {
    id: 32,
    podcast_name: "Forward Guidance",
    host_name: "Felix Jauvin",
    skill_level: "Giga Brain",
    podcast_type: "Macro Pod",
    primary_topics: ["Trading & Markets", "DeFi", "Regulation"],
    description: "Macro investing podcast for sophisticated traders. Central bank policy, global liquidity, and cross-asset analysis.",
    links: { 
      x: "https://x.com/forwardguidance", 
      youtube: "https://www.youtube.com/@forwardguidance", 
      website: "https://forwardguidance.com", 
      spotify: "https://open.spotify.com/show/forwardguidance" 
    }
  },
  {
    id: 33,
    podcast_name: "DeFi Decoded",
    host_name: "Alex Tapscott, Andrew Young",
    skill_level: "Intermediate",
    podcast_type: "Signal Pod",
    primary_topics: ["DeFi", "Layer 1 / Layer 2", "Web3 Startups & Founders"],
    description: "DeFi conversations decoded for mainstream audiences. Making complex protocols accessible without dumbing them down.",
    links: { 
      x: "https://x.com/defidecodedpod", 
      youtube: "https://www.youtube.com/@defidecodedpod", 
      website: "", 
      spotify: "https://open.spotify.com/show/defidecoded" 
    }
  },
  {
    id: 34,
    podcast_name: "Robin Seyr",
    host_name: "Robin Seyr",
    skill_level: "Noob",
    podcast_type: "Micro Pod",
    primary_topics: ["Layer 1 / Layer 2", "Trading & Markets", "DeFi"],
    description: "Talking Bitcoin for everyone. Beginner-friendly explanations of why Bitcoin matters and how to get started.",
    links: { 
      x: "https://x.com/robinseyr", 
      youtube: "https://www.youtube.com/@robinseyr", 
      website: "", 
      spotify: "" 
    }
  },
  {
    id: 35,
    podcast_name: "InsideTheHive",
    host_name: "Feezy",
    skill_level: "Noob",
    podcast_type: "Micro Pod",
    primary_topics: ["NFTs", "Web3 Startups & Founders", "DAOs"],
    description: "Web3 stories and education. Community-focused content exploring the human side of decentralized technology.",
    links: { 
      x: "https://x.com/insidedhive", 
      youtube: "", 
      website: "", 
      spotify: "" 
    }
  },
  {
    id: 36,
    podcast_name: "TheCryptoMavericks",
    host_name: "Crypto Mavericks",
    skill_level: "Noob",
    podcast_type: "Micro Pod",
    primary_topics: ["NFTs", "Trading & Markets", "Web3 Startups & Founders"],
    description: "Memes, NFTs, and crypto investments explained. Fun and accessible content for crypto-curious newcomers.",
    links: { 
      x: "https://x.com/thecryptomavs", 
      youtube: "", 
      website: "", 
      spotify: "" 
    }
  },
  {
    id: 37,
    podcast_name: "MikeyG",
    host_name: "Mikey G",
    skill_level: "Intermediate",
    podcast_type: "Story Pod",
    primary_topics: ["Web3 Startups & Founders", "NFTs", "DAOs"],
    description: "Web3 founder interviews exploring the journey from idea to execution. Authentic stories from the trenches.",
    links: { 
      x: "https://x.com/mikeygnft", 
      youtube: "https://www.youtube.com/@mikeygnft", 
      website: "", 
      spotify: "https://open.spotify.com/show/mikeyg" 
    }
  },
  {
    id: 38,
    podcast_name: "Alea Research",
    host_name: "Alea Research",
    skill_level: "Giga Brain",
    podcast_type: "Signal Pod",
    primary_topics: ["DeFi", "Trading & Markets", "Layer 1 / Layer 2"],
    description: "Objective crypto research and analysis. Data-driven insights for institutional investors and serious researchers.",
    links: { 
      x: "https://x.com/alearesearch", 
      youtube: "", 
      website: "", 
      spotify: "" 
    }
  },
  {
    id: 39,
    podcast_name: "Risk Takers",
    host_name: "Alessandro",
    skill_level: "Intermediate",
    podcast_type: "Story Pod",
    primary_topics: ["Web3 Startups & Founders", "Trading & Markets", "DeFi"],
    description: "Stories of crypto risk takers who bet big and built bigger. Lessons from founders who embraced uncertainty.",
    links: { 
      x: "https://x.com/alessandrorisk", 
      youtube: "https://www.youtube.com/@alessandrorisk", 
      website: "", 
      spotify: "" 
    }
  },
  {
    id: 40,
    podcast_name: "Tokenized",
    host_name: "Simon Taylor, Cuy Sheffield",
    skill_level: "Giga Brain",
    podcast_type: "Signal Pod",
    primary_topics: ["DeFi", "Layer 1 / Layer 2", "Regulation"],
    description: "The #1 Onchain Finance Podcast. Institutional tokenization, RWAs, and the future of financial infrastructure.",
    links: { 
      x: "https://x.com/tokenizedpod", 
      youtube: "https://www.youtube.com/@tokenizedpod", 
      website: "", 
      spotify: "https://open.spotify.com/show/tokenizedpod" 
    }
  },
  {
    id: 41,
    podcast_name: "The Block Podcasts",
    host_name: "Tim Copeland, Frank Chaparro",
    skill_level: "Advanced",
    podcast_type: "Signal Pod",
    primary_topics: ["Trading & Markets", "Regulation", "Web3 Startups & Founders"],
    description: "Industry stories from The Block's newsroom. Investigative journalism and breaking news analysis.",
    links: { 
      x: "https://x.com/theblockpods", 
      youtube: "https://www.youtube.com/@theblockpods", 
      website: "https://theblock.co", 
      spotify: "https://open.spotify.com/show/theblockpods" 
    }
  },
  {
    id: 42,
    podcast_name: "Defiant News",
    host_name: "The Defiant",
    skill_level: "Advanced",
    podcast_type: "News Pod",
    primary_topics: ["DeFi", "Regulation", "Layer 1 / Layer 2"],
    description: "Unbiased DeFi news coverage from the leading decentralized finance publication. Protocol updates and governance analysis.",
    links: { 
      x: "https://x.com/defiantnews", 
      youtube: "", 
      website: "https://thedefiant.io", 
      spotify: "" 
    }
  },
  {
    id: 43,
    podcast_name: "Chinsanity",
    host_name: "Chin",
    skill_level: "Noob",
    podcast_type: "Micro Pod",
    primary_topics: ["Trading & Markets", "Web3 Startups & Founders", "NFTs"],
    description: "The Chinsanity Show crypto conversations. Entertaining and educational content for those starting their crypto journey.",
    links: { 
      x: "https://x.com/chinsanity", 
      youtube: "https://www.youtube.com/@chinsanity", 
      website: "", 
      spotify: "" 
    }
  }
];

const skillLevels = ["Noob", "Intermediate", "Advanced", "Giga Brain"];
const podcastTypes = ["Micro Pod", "Macro Pod", "Signal Pod", "Story Pod", "News Pod"];
const topics = ["DeFi", "NFTs", "AI x Crypto", "Layer 1 / Layer 2", "DAOs", "Trading & Markets", "Web3 Startups & Founders", "Regulation"];

// Icons
const Icons = {
  Search: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  ),
  Filter: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
    </svg>
  ),
  Compass: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
    </svg>
  ),
  Bookmark: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
    </svg>
  ),
  BookmarkFilled: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
    </svg>
  ),
  X: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  Spotify: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  ),
  Youtube: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  Globe: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  Menu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
    </svg>
  ),
  Close: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  ),
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  ),
  Plus: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/><path d="M12 5v14"/>
    </svg>
  ),
};

// Logo Component - Matching the uploaded image style
const Logo = ({ size = "default", color = "dark" }) => {
  const textColor = color === "dark" ? "text-stone-900" : "text-stone-100";
  const sizeClasses = size === "large" ? "text-4xl md:text-5xl" : "text-xl";
  
  return (
    <span className={`font-serif tracking-tight ${sizeClasses} ${textColor}`} style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
      <span className="italic font-normal">signal</span>
      <span className="font-bold not-italic">.fm</span>
    </span>
  );
};

// Skill level badge colors
const skillColors = {
  "Noob": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Intermediate": "bg-amber-50 text-amber-700 border-amber-200",
  "Advanced": "bg-violet-50 text-violet-700 border-violet-200",
  "Giga Brain": "bg-rose-50 text-rose-700 border-rose-200",
};

// Podcast type colors
const typeColors = {
  "Micro Pod": "bg-sky-50 text-sky-700",
  "Macro Pod": "bg-indigo-50 text-indigo-700",
  "Signal Pod": "bg-orange-50 text-orange-600",
  "Story Pod": "bg-pink-50 text-pink-700",
  "News Pod": "bg-slate-100 text-slate-600",
};

// Podcast Card Component with clickable social links
const PodcastCard = ({ podcast, onSave, isSaved, index }) => {
  const hasAnyLink = podcast.links.x || podcast.links.spotify || podcast.links.youtube || podcast.links.website;
  
  return (
    <div 
      className="group bg-white rounded-2xl border border-stone-200/80 p-5 md:p-6 transition-all duration-300 hover:shadow-xl hover:shadow-stone-200/40 hover:border-stone-300 hover:-translate-y-1"
      style={{
        animation: `fadeInUp 0.5s ease-out ${index * 0.05}s forwards`,
        opacity: 0,
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0 pr-2">
          <h3 className="font-serif text-lg md:text-xl font-semibold text-stone-900 mb-1 leading-tight">
            {podcast.podcast_name}
          </h3>
          <p className="text-sm text-stone-500 truncate">{podcast.host_name}</p>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onSave(podcast.id); }}
          className={`flex-shrink-0 p-2 rounded-full transition-all duration-200 ${
            isSaved 
              ? 'bg-orange-100 text-orange-500' 
              : 'bg-stone-50 text-stone-400 hover:bg-stone-100 hover:text-stone-600'
          }`}
        >
          {isSaved ? <Icons.BookmarkFilled /> : <Icons.Bookmark />}
        </button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${skillColors[podcast.skill_level]}`}>
          {podcast.skill_level}
        </span>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${typeColors[podcast.podcast_type]}`}>
          {podcast.podcast_type}
        </span>
      </div>

      {/* Topics - Always show 3 */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {podcast.primary_topics.slice(0, 3).map((topic, idx) => (
          <span key={idx} className="text-xs text-stone-500 bg-stone-50 px-2 py-0.5 rounded">
            {topic}
          </span>
        ))}
      </div>

      {/* Description - Full content */}
      <p className="text-sm text-stone-600 leading-relaxed mb-4">
        {podcast.description}
      </p>

      {/* Footer with Social Links */}
      <div className="flex items-center justify-between pt-4 border-t border-stone-100">
        {/* Social Links - All clickable */}
        <div className="flex items-center gap-0.5 relative z-10">
          {podcast.links.x && (
            <a 
              href={podcast.links.x} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center justify-center w-9 h-9 text-stone-400 hover:text-stone-900 transition-colors rounded-lg hover:bg-stone-100 cursor-pointer"
              title="X (Twitter)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          )}
          {podcast.links.youtube && (
            <a 
              href={podcast.links.youtube} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center justify-center w-9 h-9 text-stone-400 hover:text-red-600 transition-colors rounded-lg hover:bg-stone-100 cursor-pointer"
              title="YouTube"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          )}
          {podcast.links.spotify && (
            <a 
              href={podcast.links.spotify} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center justify-center w-9 h-9 text-stone-400 hover:text-green-600 transition-colors rounded-lg hover:bg-stone-100 cursor-pointer"
              title="Spotify"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            </a>
          )}
          {podcast.links.website && (
            <a 
              href={podcast.links.website} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center justify-center w-9 h-9 text-stone-400 hover:text-stone-900 transition-colors rounded-lg hover:bg-stone-100 cursor-pointer"
              title="Website"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </a>
          )}
        </div>
        
        {/* Listen CTA - links to first available platform */}
        <a 
          href={podcast.links.spotify || podcast.links.youtube || podcast.links.website || podcast.links.x || '#'}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 text-white text-sm font-medium rounded-full hover:bg-stone-800 transition-all hover:gap-3 cursor-pointer relative z-10"
        >
          Listen
          <Icons.ArrowRight />
        </a>
      </div>
    </div>
  );
};

// Filter Panel Component
const FilterPanel = ({ filters, setFilters, isOpen, onClose }) => {
  const toggleFilter = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value]
    }));
  };

  const clearFilters = () => {
    setFilters({ skillLevels: [], podcastTypes: [], topics: [] });
  };

  const hasActiveFilters = filters.skillLevels.length > 0 || filters.podcastTypes.length > 0 || filters.topics.length > 0;
  const activeCount = filters.skillLevels.length + filters.podcastTypes.length + filters.topics.length;

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}
      
      <div className={`
        fixed inset-y-0 right-0 w-80 bg-white
        transform transition-transform duration-300 ease-out z-50
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        overflow-y-auto border-l border-stone-200 shadow-xl
      `}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-xl font-semibold text-stone-900">Filters</h3>
            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-medium">
                  {activeCount} active
                </span>
              )}
              <button onClick={onClose} className="p-2 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100">
                <Icons.Close />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-stone-700 mb-3">Skill Level</h4>
              <div className="space-y-2">
                {skillLevels.map(level => (
                  <button
                    key={level}
                    onClick={() => toggleFilter('skillLevels', level)}
                    className={`flex items-center w-full px-3 py-2.5 rounded-xl text-sm transition-all ${
                      filters.skillLevels.includes(level)
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded border mr-3 flex items-center justify-center transition-colors ${
                      filters.skillLevels.includes(level) ? 'bg-white border-white text-stone-900' : 'border-stone-300'
                    }`}>
                      {filters.skillLevels.includes(level) && <Icons.Check />}
                    </span>
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-stone-700 mb-3">Podcast Type</h4>
              <div className="space-y-2">
                {podcastTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => toggleFilter('podcastTypes', type)}
                    className={`flex items-center w-full px-3 py-2.5 rounded-xl text-sm transition-all ${
                      filters.podcastTypes.includes(type)
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded border mr-3 flex items-center justify-center transition-colors ${
                      filters.podcastTypes.includes(type) ? 'bg-white border-white text-stone-900' : 'border-stone-300'
                    }`}>
                      {filters.podcastTypes.includes(type) && <Icons.Check />}
                    </span>
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-stone-700 mb-3">Topics</h4>
              <div className="flex flex-wrap gap-2">
                {topics.map(topic => (
                  <button
                    key={topic}
                    onClick={() => toggleFilter('topics', topic)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                      filters.topics.includes(topic)
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200'
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="w-full py-2.5 text-sm text-stone-500 hover:text-stone-900 transition-colors border border-stone-200 rounded-xl hover:bg-stone-50"
              >
                Clear all filters
              </button>
            )}

            {/* Apply button */}
            <button
              onClick={onClose}
              className="w-full py-3 text-sm font-medium bg-stone-900 text-white rounded-xl hover:bg-stone-800 transition-colors mt-4"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// Submission Form Component
const SubmissionForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    podcast_name: '',
    host_name: '',
    podcast_type: '',
    skill_level: '',
    topics: [],
    description: '',
    spotify: '',
    youtube: '',
    website: '',
    x_link: '',
    email: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
        <div 
          className="max-w-md w-full bg-white rounded-3xl p-8 text-center shadow-sm border border-stone-100"
          style={{ animation: 'fadeInUp 0.5s ease-out forwards' }}
        >
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
            <Icons.Check />
          </div>
          <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-3">
            Thanks for submitting!
          </h2>
          <p className="text-stone-600 mb-8">
            Your podcast has been submitted and will appear after review. We'll notify you via email.
          </p>
          <button
            onClick={onClose}
            className="px-8 py-3 bg-stone-900 text-white rounded-full font-medium hover:bg-stone-800 transition-colors"
          >
            Back to Discover
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-8 md:py-12 px-4 md:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 mb-6 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Back to Discover
          </button>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-stone-900 mb-3">
            Submit Your Podcast
          </h1>
          <p className="text-stone-600 max-w-md mx-auto">
            Help the community discover high-signal content. We review all submissions within 48 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-stone-100 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-900 mb-2">
                Podcast Name <span className="text-orange-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.podcast_name}
                onChange={e => setFormData({ ...formData, podcast_name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-stone-400 focus:ring-0 outline-none transition-colors text-stone-900 placeholder:text-stone-400"
                placeholder="e.g., Bankless"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-900 mb-2">
                Host Name(s) <span className="text-orange-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.host_name}
                onChange={e => setFormData({ ...formData, host_name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-stone-400 focus:ring-0 outline-none transition-colors text-stone-900 placeholder:text-stone-400"
                placeholder="e.g., Ryan Sean Adams, David Hoffman"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-900 mb-2">
                Podcast Type <span className="text-orange-500">*</span>
              </label>
              <select
                required
                value={formData.podcast_type}
                onChange={e => setFormData({ ...formData, podcast_type: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-stone-400 focus:ring-0 outline-none transition-colors bg-white text-stone-900"
              >
                <option value="">Select type</option>
                {podcastTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-900 mb-2">
                Target Skill Level <span className="text-orange-500">*</span>
              </label>
              <select
                required
                value={formData.skill_level}
                onChange={e => setFormData({ ...formData, skill_level: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-stone-400 focus:ring-0 outline-none transition-colors bg-white text-stone-900"
              >
                <option value="">Select level</option>
                {skillLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-900 mb-2">
              Topics <span className="text-stone-400 font-normal">(select all that apply)</span> <span className="text-orange-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {topics.map(topic => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      topics: prev.topics.includes(topic)
                        ? prev.topics.filter(t => t !== topic)
                        : [...prev.topics, topic]
                    }));
                  }}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    formData.topics.includes(topic)
                      ? 'bg-stone-900 text-white'
                      : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-900 mb-2">
              Short Description <span className="text-orange-500">*</span>
            </label>
            <textarea
              required
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              maxLength={200}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-stone-400 focus:ring-0 outline-none transition-colors resize-none text-stone-900 placeholder:text-stone-400"
              placeholder="One or two lines explaining the value of your podcast..."
            />
            <p className="text-xs text-stone-400 mt-1.5">{formData.description.length}/200 characters</p>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-stone-900">
              Podcast Links
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-stone-50 rounded-xl px-4 py-3 border border-stone-100">
                <span className="text-stone-400"><Icons.X /></span>
                <input
                  type="url"
                  value={formData.x_link}
                  onChange={e => setFormData({ ...formData, x_link: e.target.value })}
                  className="flex-1 bg-transparent outline-none text-sm text-stone-900 placeholder:text-stone-400"
                  placeholder="X (Twitter) URL"
                />
              </div>
              <div className="flex items-center gap-3 bg-stone-50 rounded-xl px-4 py-3 border border-stone-100">
                <span className="text-stone-400"><Icons.Youtube /></span>
                <input
                  type="url"
                  value={formData.youtube}
                  onChange={e => setFormData({ ...formData, youtube: e.target.value })}
                  className="flex-1 bg-transparent outline-none text-sm text-stone-900 placeholder:text-stone-400"
                  placeholder="YouTube URL"
                />
              </div>
              <div className="flex items-center gap-3 bg-stone-50 rounded-xl px-4 py-3 border border-stone-100">
                <span className="text-stone-400"><Icons.Spotify /></span>
                <input
                  type="url"
                  value={formData.spotify}
                  onChange={e => setFormData({ ...formData, spotify: e.target.value })}
                  className="flex-1 bg-transparent outline-none text-sm text-stone-900 placeholder:text-stone-400"
                  placeholder="Spotify URL"
                />
              </div>
              <div className="flex items-center gap-3 bg-stone-50 rounded-xl px-4 py-3 border border-stone-100">
                <span className="text-stone-400"><Icons.Globe /></span>
                <input
                  type="url"
                  value={formData.website}
                  onChange={e => setFormData({ ...formData, website: e.target.value })}
                  className="flex-1 bg-transparent outline-none text-sm text-stone-900 placeholder:text-stone-400"
                  placeholder="Website URL"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-900 mb-2">
              Your Email <span className="text-orange-500">*</span>
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-stone-400 focus:ring-0 outline-none transition-colors text-stone-900 placeholder:text-stone-400"
              placeholder="you@example.com"
            />
            <p className="text-xs text-stone-400 mt-1.5">We'll notify you when your podcast is approved</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 border border-stone-200 text-stone-600 rounded-full font-medium hover:bg-stone-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3.5 bg-stone-900 text-white rounded-full font-medium hover:bg-stone-800 transition-colors"
            >
              Submit Podcast
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Hero Section with updated logo
const HeroSection = ({ onNavigate }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-50 to-white">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-100 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-stone-100 rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24 lg:py-32">
        <div className="max-w-3xl">
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-stone-200 shadow-sm mb-6"
            style={{ animation: 'fadeInUp 0.5s ease-out forwards' }}
          >
            <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
            <span className="text-sm text-stone-600">43 curated podcasts and counting</span>
          </div>
          
          <h1 
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-stone-900 leading-tight mb-6"
            style={{ animation: 'fadeInUp 0.5s ease-out 0.1s forwards', opacity: 0 }}
          >
            High-signal podcasts.
            <br />
            <span className="text-stone-400">Zero noise.</span>
          </h1>
          
          <p 
            className="text-lg md:text-xl text-stone-600 mb-8 max-w-xl leading-relaxed"
            style={{ animation: 'fadeInUp 0.5s ease-out 0.2s forwards', opacity: 0 }}
          >
            Discover curated Web3 & crypto podcasts based on your level and interest. Skip the noise, find the signal.
          </p>
          
          <div 
            className="flex flex-col sm:flex-row gap-4"
            style={{ animation: 'fadeInUp 0.5s ease-out 0.3s forwards', opacity: 0 }}
          >
            <button
              onClick={() => onNavigate('discover')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-stone-900 text-white rounded-full font-medium hover:bg-stone-800 transition-all hover:gap-3 shadow-lg shadow-stone-900/20"
            >
              Find Signal
              <Icons.ArrowRight />
            </button>
            <button
              onClick={() => onNavigate('submit')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-stone-900 rounded-full font-medium border border-stone-200 hover:bg-stone-50 transition-colors"
            >
              <Icons.Plus />
              Submit Your Podcast
            </button>
          </div>
        </div>
        
        <div 
          className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-stone-200 max-w-xl"
          style={{ animation: 'fadeInUp 0.5s ease-out 0.4s forwards', opacity: 0 }}
        >
          <div>
            <p className="font-serif text-3xl md:text-4xl font-semibold text-stone-900">43</p>
            <p className="text-sm text-stone-500 mt-1">Podcasts</p>
          </div>
          <div>
            <p className="font-serif text-3xl md:text-4xl font-semibold text-stone-900">8</p>
            <p className="text-sm text-stone-500 mt-1">Topics</p>
          </div>
          <div>
            <p className="font-serif text-3xl md:text-4xl font-semibold text-stone-900">4</p>
            <p className="text-sm text-stone-500 mt-1">Skill Levels</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => (
  <footer className="bg-white border-t border-stone-200 mt-auto">
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <Logo />
        <div className="flex items-center gap-8 text-sm text-stone-500">
          <a href="#" className="hover:text-stone-900 transition-colors">About</a>
          <a href="#" className="hover:text-stone-900 transition-colors">Contact</a>
          <a href="#" className="hover:text-stone-900 transition-colors">Privacy</a>
        </div>
        <p className="text-sm text-stone-400">
          © 2026. Built by{' '}
          <a 
            href="https://x.com/danbuildss" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-stone-600 hover:text-stone-900 transition-colors font-medium"
          >
            @danbuildss
          </a>
        </p>
      </div>
    </div>
  </footer>
);

// Main App Component
export default function SignalFM() {
  const [currentView, setCurrentView] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [savedPodcasts, setSavedPodcasts] = useState([]);
  const [filters, setFilters] = useState({
    skillLevels: [],
    podcastTypes: [],
    topics: [],
  });

  const toggleSave = (id) => {
    setSavedPodcasts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const filteredPodcasts = useMemo(() => {
    let results = currentView === 'saved' 
      ? podcastData.filter(p => savedPodcasts.includes(p.id))
      : podcastData;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(p => 
        p.podcast_name.toLowerCase().includes(query) ||
        p.host_name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.primary_topics.some(t => t.toLowerCase().includes(query))
      );
    }

    if (filters.skillLevels.length > 0) {
      results = results.filter(p => filters.skillLevels.includes(p.skill_level));
    }

    if (filters.podcastTypes.length > 0) {
      results = results.filter(p => filters.podcastTypes.includes(p.podcast_type));
    }

    if (filters.topics.length > 0) {
      results = results.filter(p => 
        p.primary_topics.some(t => filters.topics.includes(t))
      );
    }

    return results;
  }, [searchQuery, filters, currentView, savedPodcasts]);

  const activeFilterCount = filters.skillLevels.length + filters.podcastTypes.length + filters.topics.length;

  if (currentView === 'submit') {
    return <SubmissionForm onClose={() => setCurrentView('home')} />;
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => setCurrentView('home')}
              className="hover:opacity-80 transition-opacity"
            >
              <Logo />
            </button>

            <nav className="hidden md:flex items-center gap-1">
              <button
                onClick={() => setCurrentView('discover')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  currentView === 'discover' ? 'bg-stone-100 text-stone-900' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Discover
              </button>
              <button
                onClick={() => setCurrentView('saved')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                  currentView === 'saved' ? 'bg-stone-100 text-stone-900' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Saved
                {savedPodcasts.length > 0 && (
                  <span className="text-xs bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full">
                    {savedPodcasts.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setCurrentView('submit')}
                className="ml-2 px-4 py-2 bg-stone-900 text-white rounded-full text-sm font-medium hover:bg-stone-800 transition-colors"
              >
                Submit Podcast
              </button>
            </nav>

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100"
            >
              <Icons.Menu />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      {sidebarOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 bg-white z-50 md:hidden shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <Logo />
                <button 
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100"
                >
                  <Icons.Close />
                </button>
              </div>
              <nav className="space-y-2">
                <button
                  onClick={() => { setCurrentView('home'); setSidebarOpen(false); }}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left transition-colors ${
                    currentView === 'home' ? 'bg-stone-100 text-stone-900' : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => { setCurrentView('discover'); setSidebarOpen(false); }}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left transition-colors ${
                    currentView === 'discover' ? 'bg-stone-100 text-stone-900' : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <Icons.Compass />
                  Discover
                </button>
                <button
                  onClick={() => { setCurrentView('saved'); setSidebarOpen(false); }}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left transition-colors ${
                    currentView === 'saved' ? 'bg-stone-100 text-stone-900' : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <Icons.Bookmark />
                  Saved
                  {savedPodcasts.length > 0 && (
                    <span className="ml-auto text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                      {savedPodcasts.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => { setCurrentView('submit'); setSidebarOpen(false); }}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left text-stone-600 hover:bg-stone-50 transition-colors"
                >
                  <Icons.Plus />
                  Submit Podcast
                </button>
              </nav>
            </div>
          </div>
        </>
      )}

      {currentView === 'home' && (
        <HeroSection onNavigate={setCurrentView} />
      )}

      {(currentView === 'discover' || currentView === 'saved') && (
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
            <div className="mb-6 md:mb-8">
              <h1 className="font-serif text-2xl md:text-3xl font-semibold text-stone-900 mb-2">
                {currentView === 'saved' ? 'Saved Podcasts' : 'Discover Podcasts'}
              </h1>
              <p className="text-stone-500">
                {currentView === 'saved' 
                  ? `${savedPodcasts.length} podcast${savedPodcasts.length !== 1 ? 's' : ''} saved`
                  : `${filteredPodcasts.length} podcast${filteredPodcasts.length !== 1 ? 's' : ''} found`
                }
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-6 md:mb-8">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search podcasts, hosts, topics..."
                  className="w-full pl-12 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:border-stone-400 outline-none transition-colors text-stone-900 placeholder:text-stone-400"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">
                  <Icons.Search />
                </div>
              </div>
              {currentView === 'discover' && (
                <button
                  onClick={() => setFilterOpen(true)}
                  className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl border transition-colors ${
                    activeFilterCount > 0 
                      ? 'bg-stone-900 text-white border-stone-900' 
                      : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <Icons.Filter />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      activeFilterCount > 0 ? 'bg-white text-stone-900' : 'bg-stone-100 text-stone-600'
                    }`}>
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              )}
            </div>

            <div className="flex gap-8">
              <div className="flex-1">
                {filteredPodcasts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {filteredPodcasts.map((podcast, index) => (
                      <PodcastCard
                        key={podcast.id}
                        podcast={podcast}
                        onSave={toggleSave}
                        isSaved={savedPodcasts.includes(podcast.id)}
                        index={index}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-400">
                      <Icons.Search />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-stone-900 mb-2">
                      {currentView === 'saved' ? 'No saved podcasts yet' : 'No podcasts found'}
                    </h3>
                    <p className="text-stone-500 max-w-md mx-auto">
                      {currentView === 'saved' 
                        ? 'Start saving podcasts to build your collection.' 
                        : 'Try adjusting your search or filters to find what you\'re looking for.'
                      }
                    </p>
                    {currentView === 'saved' && (
                      <button
                        onClick={() => setCurrentView('discover')}
                        className="mt-6 px-6 py-3 bg-stone-900 text-white rounded-full font-medium hover:bg-stone-800 transition-colors"
                      >
                        Discover Podcasts
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      )}

      <FilterPanel
        filters={filters}
        setFilters={setFilters}
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
      />

      {currentView === 'home' && (
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-semibold text-stone-900 mb-2">
                  Featured Podcasts
                </h2>
                <p className="text-stone-500">Hand-picked for quality and depth</p>
              </div>
              <button
                onClick={() => setCurrentView('discover')}
                className="hidden sm:flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors"
              >
                View all
                <Icons.ArrowRight />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {podcastData.slice(0, 6).map((podcast, index) => (
                <PodcastCard
                  key={podcast.id}
                  podcast={podcast}
                  onSave={toggleSave}
                  isSaved={savedPodcasts.includes(podcast.id)}
                  index={index}
                />
              ))}
            </div>
            
            <div className="text-center mt-10 sm:hidden">
              <button
                onClick={() => setCurrentView('discover')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-full font-medium hover:bg-stone-800 transition-colors"
              >
                View All Podcasts
                <Icons.ArrowRight />
              </button>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
