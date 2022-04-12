import { toDateString, toDateTimeString } from './util';

const now = new Date();
const currentDate = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate(),
  now.getHours(),
  now.getMinutes(),
  now.getSeconds(),
);

const pastDate = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate() - 7,
  now.getHours(),
  now.getMinutes(),
  now.getSeconds(),
);

const pastDate12 = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate() - 14,
  now.getHours(),
  now.getMinutes(),
  now.getSeconds(),
);

const realizationInputJson = {
  query: '', // query
  // keyword: '판결\t법원\t재판',
  keyword: '',
  page: 1,
  sizePerPage: 10, // size
  to: toDateTimeString(currentDate), // endDate
  from: toDateTimeString(pastDate), // startDate
  searchUnit: 'cluster',
  sortOrder: 'DESC',
  clusterSalience: 0,
  categoryList: [
    '경제',
    '사회',
    '정치',
    'IT/과학',
    '세계',
    '생활/문화',
    '스포츠',
  ],
  sourceList: [
    '경향신문',
    '국민일보',
    '동아일보',
    '서울신문',
    '조선일보',
    '중앙일보',
    '한겨레',
    '한국일보',
    '세계일보',
    'KBS',
    'MBC',
    'SBS',
    'JTBC',
    'TV조선',
    '채널A',
    'MBN',
    'YTN',
    '연합뉴스TV',
    '매일경제',
    '한국경제',
    '서울경제',
    '헤럴드경제',
    '머니투데이',
    '뉴시스',
    '뉴스1',
    '연합뉴스',
  ],
  searchTargetList: ['title', 'content'],
  straightSelection: 100,
  // pressScope: 2,
  score: 0,
  recommendSize: 100, //200
  datewiseSize: 1000,
  relevantSize: 1000, //1000
  strictMode: true,
  photoArticle: 'article', // photo, article, all
  spamArticle: 'article', // spam, article, all
  boxArticle: 'article', // box, article, all
  botArticle: 'article', // bot, article, all
  recommendType: 'freq', // freq, weight, score
  status: 0, // -1: reset 0: normal 1: extended search 2: retrieve required
  sortField: 'cluster_time', // cluster_time, score
  timeAggs: false, // false: burstiness
  scoreMode: 'Total', // Max, Avg}
  summaryLength: 20,
  titleSearch: true,
  interval: 'day',
  phraseOption: 'substring', ///////////////////////////
  sumOption: 'textrank',
  // searchPriority: "relevance",
};

const categories = [
  { name: '경제', text: '경제', active: true },
  { name: '사회', text: '사회', active: true },
  { name: '정치', text: '정치', active: true },
  { name: 'IT/과학', text: 'IT/과학', active: true },
  { name: '세계', text: '세계', active: true },
  { name: '생활/문화', text: '생활/문화', active: true },
  { name: '스포츠', text: '스포츠', active: true },
];

const sources = [
  { name: '경향신문', text: '경향신문', active: true },
  { name: '국민일보', text: '국민일보', active: true },
  { name: '동아일보', text: '동아일보', active: true },
  { name: '서울신문', text: '서울신문', active: true },
  { name: '조선일보', text: '조선일보', active: true },
  { name: '중앙일보', text: '중앙일보', active: true },
  { name: '한겨레', text: '한겨레', active: true },
  { name: '한국일보', text: '한국일보', active: true },
  { name: '세계일보', text: '세계일보', active: true },
  { name: 'KBS', text: 'KBS', active: true },
  { name: 'MBC', text: 'MBC', active: true },
  { name: 'SBS', text: 'SBS', active: true },
  { name: 'JTBC', text: 'JTBC', active: true },
  { name: 'TV조선', text: 'TV조선', active: true },
  { name: '채널A', text: '채널A', active: true },
  { name: 'MBN', text: 'MBN', active: true },
  { name: 'YTN', text: 'YTN', active: true },
  { name: '연합뉴스TV', text: '연합뉴스TV', active: true },
  { name: '매일경제', text: '매일경제', active: true },
  { name: '한국경제', text: '한국경제', active: true },
  { name: '서울경제', text: '서울경제', active: true },
  { name: '헤럴드경제 ', text: '헤럴드경제', active: true },
  { name: '머니투데이 ', text: '머니투데이', active: true },
  { name: '뉴시스', text: '뉴시스', active: true },
  { name: '뉴스1', text: '뉴스1', active: true },
  { name: '연합뉴스', text: '연합뉴스', active: true },

  // { name: '조선일보', text: '조선일보', active: true },
  // { name: 'MBN', text: 'MBN', active: true },
  // { name: 'YTN', text: 'YTN', active: true },
  // { name: '연합뉴스TV', text: '연합뉴스TV', active: true },
  // { name: '매일경제', text: '매일경제', active: true },
  // { name: '한국경제', text: '한국경제', active: true },
  // { name: '서울경제', text: '서울경제', active: true },
  // { name: '헤럴드경제', text: '헤럴드경제', active: true },
  // { name: '머니투데이', text: '머니투데이', active: true },
  // { name: '뉴시스', text: '뉴시스', active: true },
  // { name: '뉴스1', text: '뉴스1', active: true },
  // { name: '연합뉴스', text: '연합뉴스', active: true },
  { name: '이데일리', text: '이데일리', active: true }, /////////
  { name: '아시아경제', text: '아시아경제', active: true }, //////////
  { name: '조선비즈', text: '조선비즈', active: true }, ///////
  { name: 'SBS BIZ', text: 'SBS BIZ', active: true }, /////////
  { name: '데일리안', text: '데일리안', active: true }, ///////
  { name: '한국경제TV', text: '한국경제TV', active: true }, /////////
  { name: '파이낸셜뉴스', text: '파이낸셜뉴스', active: true }, //////////
  { name: '연합인포맥스', text: '연합인포맥스', active: true }, //////
];

export { realizationInputJson, categories, sources };
