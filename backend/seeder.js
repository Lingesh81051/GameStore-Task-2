// backend/seeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

// Load environment variables (adjust path if needed)
dotenv.config({ path: './backend/.env' });

const sampleProducts = [
  {
    name: 'GTA V',
    description: 'Grand Theft Auto V is an action-adventure video game developed by Rockstar North and published by Rockstar Games. It was released on September 17, 2013 for Windows. Players complete missions—linear scenarios with set objectives—to progress through the story. Outside of the missions, players may freely roam the open world. Composed of the San Andreas open countryside area, including the fictional Blaine County, and the fictional city of Los Santos, the world is much larger in area than earlier entries in the series.',
    price: 19.99,
    countInStock: 10,
    image: '/images/games/gta v.jpg',
    categories: ['Action', 'Adventure', 'Trending Games', 'Top Sellers'],
    trailer: 'https://www.youtube.com/embed/N-xHcvug3WI?si=-oD706m00h_-7ZnA',
    developer: 'Rockstar Games',
    releaseDate: new Date('2013-09-17'),
    platform: 'PC, PS4, Xbox One',
    ratings: 4.8
  },
  {
    name: 'Tom Clancy\'s Splinter Cell: Blacklist',
    description: 'Tom Clancy’s Splinter Cell is an action,stealth video game. Developed and published by CyberConnect2 Co. Ltd./BANDAI NAMCO Entertainment. It was released on Feburary 18, 2003 for Windows. Infiltrate terrorists’ positions, acquire critical intelligence by any means necessary, execute with extreme prejudice, and exit without a trace! You are Sam Fisher, a highly trained secret operative of the NSA’s secret arm: Third Echelon.',
    price: 29.99,
    countInStock: 5,
    image: '/images/games/splinter cell.jpg',
    categories: ['Action', 'Adventure', 'New Releases', 'Featured Discounts', 'Top Sellers', 'Most popular'],
    trailer: 'https://www.youtube.com/embed/wYGoFH6bWXg?si=0YEyrnRUejuXP8QX',
    developer: 'Ubisoft',
    releaseDate: new Date('2013-08-20'),
    platform: 'PC, PS3, Xbox 360',
    ratings: 4.3
  },
  {
    name: 'The Last Of Us Part 1',
    description: 'This is a description for Sample Product 2',
    price: 29.99,
    countInStock: 5,
    image: '/images/games/tlou 1.jpg',
    categories: ['Action', 'Adventure', 'New Releases', 'Featured Discounts', 'Top Sellers', 'Most popular'],
    trailer: 'https://www.youtube.com/embed/CxVyuE2Nn_w?si=3Qy4npWvFvNVjwUS',
    developer: 'Naughty Dog',
    releaseDate: new Date('2013-06-14'),
    platform: 'PS3, PS4',
    ratings: 4.9
  },
  {
    name: 'Prince of Persia: The Two Thrones',
    description: 'This is a description for Sample Product 2',
    price: 29.99,
    countInStock: 5,
    image: '/images/games/prince of persia.jpg',
    categories: ['Action', 'Adventure', 'New Releases', 'Featured Discounts'],
    trailer: 'https://www.youtube.com/embed/UTE4lU-Of0c?si=mpDVVg8xRF4nMXl1',
    developer: 'Ubisoft',
    releaseDate: new Date('2005-11-16'),
    platform: 'PC, PS2, Xbox',
    ratings: 4.5
  },
  {
    name: 'Red Dead Redemption 2',
    description: 'This is a description for Sample Product 2',
    price: 29.99,
    countInStock: 5,
    image: '/images/games/rdr2.jpeg',
    categories: ['Action', 'Adventure', 'Most Played', 'Trending Games'],
    trailer: 'https://www.youtube.com/embed/gmA6MrX81z4?si=O4E2HALHnxRtFnHK',
    developer: 'Rockstar Games',
    releaseDate: new Date('2018-10-26'),
    platform: 'PC, PS4, Xbox One',
    ratings: 4.7
  },
  {
    name: 'Sekiro Shadow Die Twice',
    description: 'This is a description for Sample Product 2',
    price: 29.99,
    countInStock: 5,
    image: '/images/games/sekiro.jpg',
    categories: ['Action', 'Adventure', 'Most popular'],
    trailer: 'https://www.youtube.com/embed/rXMX4YJ7Lks?si=Q8gMitrl_pRmbb_r',
    developer: 'FromSoftware',
    releaseDate: new Date('2019-03-22'),
    platform: 'PC, PS4, Xbox One',
    ratings: 4.6
  },
  {
    name: 'Ghost of Tsushima',
    description: 'This is a description for Sample Product 2',
    price: 29.99,
    countInStock: 5,
    image: '/images/games/got.jpg',
    categories: ['Action', 'Adventure', 'Top Sellers', 'New Releases'],
    trailer: 'https://www.youtube.com/embed/EzWBNwhb870?si=srytelOW-N5RzY4S',
    developer: 'Sucker Punch Productions',
    releaseDate: new Date('2020-07-17'),
    platform: 'PS4, PS5',
    ratings: 4.8
  },
  {
    name: 'God of War 2018',
    description: 'This is a description for Sample Product 2',
    price: 29.99,
    countInStock: 5,
    image: '/images/games/god of war.jpg',
    categories: ['Action', 'Adventure', 'Trending Games', 'Featured Discounts'],
    trailer: 'https://www.youtube.com/embed/RQK_40a0XUY?si=HrqgbuNco7BHHnVm',
    developer: 'Santa Monica Studio',
    releaseDate: new Date('2018-04-20'),
    platform: 'PS4, PS5, PC',
    ratings: 4.9
  },
  {
    name: "Uncharted 4: A Thief's End",
    description: 'This is a description for Sample Product 2',
    price: 29.99,
    countInStock: 5,
    image: '/images/games/uncharted.jpg',
    categories: ['Action', 'Adventure', 'New Releases'],
    trailer: 'https://www.youtube.com/embed/xeMA3O9pfiY?si=JY9uegwtR5woZhEg',
    developer: 'Naughty Dog',
    releaseDate: new Date('2016-05-10'),
    platform: 'PS4',
    ratings: 4.7
  },
  {
    name: 'Manor Lords',
    description: 'This is a description for Sample Product 2',
    price: 29.99,
    countInStock: 5,
    image: '/images/games/manor lords.jpg',
    categories: ['Action', 'Adventure', 'Trending Games', 'Most Played'],
    trailer: 'https://www.youtube.com/embed/hhk4HAxLhq8?si=hr5zdmcVkijcAv7u',
    developer: 'WolfEye Studios',
    releaseDate: new Date('2022-03-01'),
    platform: 'PC',
    ratings: 4.2
  },
  {
    name: 'Tomb Raider 2013',
    description: 'This is a description for Sample Product 2',
    price: 29.99,
    countInStock: 5,
    image: '/images/games/tomb raider.jpg',
    categories: ['Action', 'Adventure', 'Featured Discounts'],
    trailer: 'https://www.youtube.com/embed/nFBrgeSjj-0?si=LxLk5ycYxl3aZpcp',
    developer: 'Crystal Dynamics',
    releaseDate: new Date('2013-03-05'),
    platform: 'PC, PS3, Xbox 360',
    ratings: 4.4
  },
  {
    name: "Assassin's Creed",
    description: 'This is a description for Sample Product 2',
    price: 29.99,
    countInStock: 5,
    image: '/images/games/assassin creed.jpg',
    categories: ['Action', 'Adventure', 'Trending Games', 'Top Sellers'],
    trailer: 'https://www.youtube.com/embed/9ILkoZC5vnI?si=w8uHFnZ0CpUzO_TK',
    developer: 'Ubisoft',
    releaseDate: new Date('2007-11-13'),
    platform: 'PC, PS3, Xbox 360',
    ratings: 4.3
  },
  {
    name: 'Watch Dogs 1',
    description: 'This is a description for Sample Product 2',
    price: 29.99,
    countInStock: 5,
    image: '/images/games/watch dogs.jpg',
    categories: ['Action', 'Adventure', 'Trending Games', 'Most popular'],
    trailer: 'https://www.youtube.com/embed/PFko4Kut39s?si=lb-amrmpjvVi2pv-',
    developer: 'Ubisoft',
    releaseDate: new Date('2014-05-27'),
    platform: 'PC, PS4, Xbox One',
    ratings: 4.2
  },
  {
    name: 'Heavy Rain',
    description: 'This is a description for Sample Product 2',
    price: 29.99,
    countInStock: 5,
    image: '/images/games/heavy rain.jpg',
    categories: ['Action', 'Adventure', 'New Releases'],
    trailer: 'https://www.youtube.com/embed/e4NvqmZ_SiE?si=FWLUf_9pX1Xsdm_7',
    developer: 'Quantic Dream',
    releaseDate: new Date('2010-02-23'),
    platform: 'PC, PS3, PS4',
    ratings: 4.1
  },
  {
    name: "Marvel's Spiderman",
    description: 'This is a description for Sample Product 3',
    price: 39.99,
    countInStock: 15,
    image: '/images/games/marvel spiderman.jpg',
    categories: ['Action', 'Adventure', 'Trending Games', 'Featured Discounts'],
    trailer: 'https://www.youtube.com/embed/1E051WtpyWg?si=otEmh2eZ78MjsSpz',
    developer: "Insomniac Games",
    releaseDate: new Date('2018-09-07'),
    platform: 'PS4, PS5, PC',
    ratings: 4.8
  },
  {
    name: "Prototype 1",
    description: 'This is a description for Sample Product 3',
    price: 39.99,
    countInStock: 15,
    image: '/images/games/prototype.jpg',
    categories: ['Action', 'Adventure', 'Most Played', 'Fighting', 'Stealth', 'Survival'],
    trailer: 'https://www.youtube.com/embed/Nc3XptLacMM?si=XQR5-tYUN2WzSIOq',
    developer: 'Radical Entertainment',
    releaseDate: new Date('2009-05-20'),
    platform: 'PC, PS3, Xbox 360',
    ratings: 4.0
  },
  {
    name: "The Callisto Protocol",
    description: 'This is a description for Sample Product 3',
    price: 39.99,
    countInStock: 15,
    image: '/images/games/the callisto protocol.jpg',
    categories: ['Action', 'Adventure', 'Most popular','Most Played', 'Fighting', 'Stealth', 'Survival'],
    trailer: 'https://www.youtube.com/embed/IT7swHyN8FQ?si=I59hvuSX-cazEBiT',
    developer: 'Striking Distance Studios',
    releaseDate: new Date('2020-12-10'),
    platform: 'PC, PS5, Xbox Series X',
    ratings: 3.9
  },
  {
    name: "Prey 2017",
    description: 'This is a description for Sample Product 3',
    price: 39.99,
    countInStock: 15,
    image: '/images/games/prey.jpg',
    categories: ['Action', 'Adventure', 'Trending Games', 'Featured Discounts', 'RPG', 'First-person shooter', 'Shooter', 'Most popular'],
    trailer: 'https://www.youtube.com/embed/LNHZ9WAertc?si=PYaayRAAgYO6nlJL',
    developer: 'Arkane Studios',
    releaseDate: new Date('2017-05-05'),
    platform: 'PC, PS4, Xbox One',
    ratings: 4.4
  },
  {
    name: "Death Stranding 1",
    description: 'This is a description for Sample Product 3',
    price: 39.99,
    countInStock: 15,
    image: '/images/games/death stranding 1.png',
    categories: ['Action', 'Adventure', 'Trending Games', 'Featured Discounts', 'RPG', 'First-person shooter', 'Shooter', 'Most Played'],
    trailer: 'https://www.youtube.com/embed/tCI396HyhbQ?si=ZfYSi5V9sJ-8ZIYw',
    developer: 'Kojima Productions',
    releaseDate: new Date('2019-11-08'),
    platform: 'PC, PS4, PS5',
    ratings: 4.5
  },
  {
    name: "Black Myth: Wukong",
    description: 'This is a description for Sample Product 3',
    price: 39.99,
    countInStock: 15,
    image: '/images/games/black myth wukong.jpg',
    categories: ['Action', 'Adventure', 'Trending Games', 'Featured Discounts', 'RPG', 'First-person shooter', 'Shooter', 'Most Played', 'Top Sellers'],
    trailer: 'https://www.youtube.com/embed/pnSsgRJmsCc?si=4e55ZKoEuaRwm90p',
    developer: 'Game Science',
    releaseDate: new Date('2022-12-01'),
    platform: 'PC',
    ratings: 4.6
  },
  {
    name: "Counter-Strike: Global Offensive",
    description: 'This is a description for Sample Product 3',
    price: 0,
    countInStock: 15,
    image: '/images/games/cs go.jpg',
    categories: ['Action', 'Trending Games', 'Free Games', 'RPG', 'First-person shooter', 'Shooter', 'Most Played', 'Top Sellers', 'Tactical role-playing'],
    trailer: 'https://www.youtube.com/embed/edYCtaNueQY?si=6kZfoWChVEAugimi',
    developer: 'Valve',
    releaseDate: new Date('2012-08-21'),
    platform: 'PC, PS4, Xbox One',
    ratings: 4.7
  },
  {
    name: "Fall Guys",
    description: 'This is a description for Sample Product 3',
    price: 0,
    countInStock: 15,
    image: '/images/games/fall guys.jpg',
    categories: ['Adventure', 'Free Games', 'RPG', 'Most Played', 'Top Sellers', 'Real-time strategy', 'Massively multiplayer online role-playing'],
    trailer: 'https://www.youtube.com/embed/AyADwdiW7rQ?si=um-Vdbg57aZ0SYgW',
    developer: 'Mediatonic',
    releaseDate: new Date('2020-08-04'),
    platform: 'PC, PS4, PS5',
    ratings: 4.3
  },
  {
    name: "Sifu",
    description: 'This is a description for Sample Product 3',
    price: 0,
    countInStock: 15,
    image: '/images/games/sifu.jpg',
    categories: ['Action', 'Adventure', 'Free Games', 'RPG', 'Fighting'],
    trailer: 'https://www.youtube.com/embed/1FQ1YO3Ks2U?si=WSSnoN1UQQa0tdqB',
    developer: 'Sloclap',
    releaseDate: new Date('2022-02-08'),
    platform: 'PC, PS5',
    ratings: 4.5
  },
  {
    name: "Rocket League",
    description: 'This is a description for Sample Product 3',
    price: 0,
    countInStock: 15,
    image: '/images/games/rocket league.jpg',
    categories: ['Action', 'Adventure', 'Trending Games', 'Featured Discounts', 'RPG', 'Sports', 'Shooter', 'Most Played'],
    trailer: 'https://www.youtube.com/embed/Ig5XAB552no?si=VqAXkTE5tTBbaEV2',
    developer: 'Psyonix',
    releaseDate: new Date('2015-07-07'),
    platform: 'PC, PS4, Xbox One, Switch',
    ratings: 4.6
  },
  {
    name: "World War Z",
    description: 'This is a description for Sample Product 3',
    price: 0,
    countInStock: 15,
    image: '/images/games/world war z.jpg',
    categories: ['Action', 'Adventure', 'Free Games', 'RPG', 'First-person shooter', 'Shooter', 'Most Played', 'Top Sellers', 'Tactical role-playing'],
    trailer: 'https://www.youtube.com/embed/YZ3Dx4tfirE?si=UtzXGO2p7FvXK6L2',
    developer: 'Saber Interactive',
    releaseDate: new Date('2019-03-28'),
    platform: 'PC, PS4, Xbox One',
    ratings: 4.2
  },
  {
    name: "Marvel Rivals",
    description: 'This is a description for Sample Product 3',
    price: 0,
    countInStock: 15,
    image: '/images/games/marvel rivals.jpg',
    categories: ['Action', 'Free Games', 'RPG', 'First-person shooter', 'Shooter', 'Most Played'],
    trailer: 'https://www.youtube.com/embed/-b0veB7q9P4?si=O75RdNpmdvAuodBW',
    developer: 'Kung Fu Factory',
    releaseDate: new Date('2021-09-15'),
    platform: 'PC, PS5, Xbox Series X',
    ratings: 4.1
  },
  {
    name: "Destiny 2",
    description: 'This is a description for Sample Product 3',
    price: 0,
    countInStock: 15,
    image: '/images/games/destiny 2.jpg',
    categories: ['Action', 'Adventure', 'Free Games', 'RPG', 'First-person shooter', 'Shooter', 'Massively multiplayer online role-playing'],
    trailer: 'https://www.youtube.com/embed/jn1dML6RC5w?si=Bh3k0nsd0ewUL2jH',
    developer: 'Bungie',
    releaseDate: new Date('2017-09-06'),
    platform: 'PC, PS4, Xbox One',
    ratings: 4.5
  }
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected for seeding.');
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log('Sample products added successfully.');
    process.exit();
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
    process.exit(1);
  });
