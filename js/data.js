const U=id=>`assets/images/${id}.webp`;
const destinations=[
{city:"Bali",country:"Indonesia",cat:"Beach",hotels:48,from:95,img:"photo-1537996194471-e657df975ab4",tag:"Temples, rice terraces & surf"},
{city:"Paris",country:"France",cat:"City",hotels:120,from:180,img:"photo-1502602898657-3e91760cbb34",tag:"Art, cafés & the Eiffel Tower"},
{city:"Santorini",country:"Greece",cat:"Beach",hotels:36,from:210,img:"photo-1570077188670-e3a8d69ac5ff",tag:"Whitewashed cliffs & sunsets"},
{city:"Tokyo",country:"Japan",cat:"City",hotels:95,from:140,img:"photo-1540959733332-eab4deabeeaf",tag:"Neon nights & ancient shrines"},
{city:"Dubai",country:"UAE",cat:"Luxury",hotels:80,from:230,img:"photo-1512453979798-5ea266f8880c",tag:"Skyscrapers & desert safaris"},
{city:"Maldives",country:"Maldives",cat:"Luxury",hotels:24,from:420,img:"photo-1514282401047-d79a71a590e8",tag:"Overwater villas & coral reefs"},
{city:"New York",country:"USA",cat:"City",hotels:150,from:200,img:"photo-1496442226666-8d4d0e62e6e9",tag:"Broadway, parks & skyline views"},
{city:"Swiss Alps",country:"Switzerland",cat:"Adventure",hotels:42,from:260,img:"photo-1531366936337-7c912a4589a7",tag:"Snowy peaks & scenic trains"}];
const hotels=[
{name:"Azure Bay Resort",city:"Bali",rating:4.8,price:180,pop:98,img:"photo-1566073771259-6a8506099945",am:["Pool","Spa","Breakfast"],badge:"Best Seller"},
{name:"Rice Terrace Villas",city:"Bali",rating:4.6,price:120,pop:80,img:"photo-1520250497591-112f2f40a3f4",am:["Private pool","Yoga","WiFi"],badge:"Eco Stay"},
{name:"Le Petit Lumière",city:"Paris",rating:4.5,price:260,pop:85,img:"photo-1551882547-ff40c63fe5fa",am:["Bar","Breakfast","WiFi"],badge:"Romantic"},
{name:"Seine View Palace",city:"Paris",rating:4.9,price:480,pop:92,img:"photo-1455587734955-081b22074882",am:["Spa","Fine dining","Gym"],badge:"Luxury"},
{name:"Caldera Cliff Suites",city:"Santorini",rating:4.9,price:390,pop:96,img:"photo-1571896349842-33c89424de2d",am:["Infinity pool","Sunset bar","WiFi"],badge:"Top Rated"},
{name:"Shinjuku Sky Hotel",city:"Tokyo",rating:4.4,price:150,pop:75,img:"photo-1582719508461-905c673771fd",am:["Onsen","Ramen bar","WiFi"],badge:"Great Value"},
{name:"Desert Pearl Dubai",city:"Dubai",rating:4.7,price:340,pop:90,img:"photo-1542314831-068cd1dbfeeb",am:["Beach","Spa","Casino"],badge:"Luxury"},
{name:"Coral Overwater Villas",city:"Maldives",rating:4.9,price:590,pop:88,img:"photo-1564501049412-61c2a3083791",am:["Private deck","Snorkel","All-inclusive"],badge:"Dream Stay"},
{name:"Central Park Lodge",city:"New York",rating:4.3,price:220,pop:70,img:"photo-1445019980597-93fa8acb246c",am:["Gym","Rooftop","WiFi"],badge:"City Pick"},
{name:"Edelweiss Mountain Chalet",city:"Swiss Alps",rating:4.7,price:300,pop:82,img:"photo-1578683010236-d716f9a3f461",am:["Fireplace","Ski-in","Sauna"],badge:"Cosy"}];
const offers=[
{off:"20% OFF",title:"Early Bird Escape",text:"Book 45 days ahead and save on any beach stay.",code:"STACK20",pct:20,img:"photo-1507525428034-b723cf961d3e"},
{off:"$50 OFF",title:"Weekend Getaway",text:"Flat $50 off bookings of 2+ nights over weekends.",code:"WEEKEND50",flat:50,img:"photo-1469854523086-cc02fe5d8800"},
{off:"15% OFF",title:"Honeymoon Special",text:"Romantic suites with free dinner and spa credit.",code:"LOVE15",pct:15,img:"photo-1519225421980-715cb0215aed"},
{off:"25% OFF",title:"Long Stay Saver",text:"Stay 5+ nights and enjoy our biggest discount.",code:"LONG25",pct:25,min:5,img:"photo-1476514525535-07fb3b4ae5f1"}];
const features=[
["🛡️","Best Price Guarantee","Find it cheaper elsewhere and we'll match it, plus 5% off."],
["🔄","Free Cancellation","Plans change. Cancel most bookings free up to 48 hours before."],
["🎧","24/7 Human Support","Real people, not bots, ready to help in 12 languages."],
["✅","Verified Reviews","Only guests who actually stayed can leave a review."],
["💳","Secure Payments","Bank-grade encryption with flexible pay-later options."],
["🌱","Sustainable Travel","Filter eco-certified stays and offset your trip carbon."]];
const steps=[["1","Search","Choose destination, dates and guests."],["2","Compare","Filter hotels by price, rating and amenities."],["3","Book","Pay securely with instant confirmation."],["4","Enjoy","Pack up, relax and make memories."]];
const testimonials=[
{n:"Aarav Mehta",c:"Bengaluru, India",r:5,t:"Stackly found us a villa in Bali that was half the price of other sites. The booking took two minutes.",img:"photo-1507003211169-0a1dd7228f2d"},
{n:"Sophie Laurent",c:"Lyon, France",r:5,t:"The estimator showed taxes upfront, so there were no nasty surprises at checkout. Refreshing honesty.",img:"photo-1494790108377-be9c29b29330"},
{n:"Daniel Carter",c:"Austin, USA",r:4,t:"Great filters and a smooth wishlist. I planned an entire Tokyo trip from my phone on a commute.",img:"photo-1500648767791-00dcc994a43e"},
{n:"Priya Nair",c:"Kochi, India",r:5,t:"Support rebooked our flight-delayed stay at midnight with zero fuss. Truly 24/7.",img:"photo-1438761681033-6461ffad8d80"},
{n:"Liam O'Connor",c:"Dublin, Ireland",r:5,t:"The Swiss chalet was a dream. Coupon WEEKEND50 saved us enough for the scenic train.",img:"photo-1472099645785-5658abf4ff4e"},
{n:"Yuki Tanaka",c:"Osaka, Japan",r:4,t:"Clean design, fast search and honest photos. Our Santorini honeymoon matched them perfectly.",img:"photo-1544005313-94ddf0286df2"}];
const faqs=[
["Can I cancel my booking?","Most hotels allow free cancellation up to 48 hours before check-in. Look for the 'Free cancellation' label."],
["How do coupon codes work?","Copy a code from the offers section and paste it into the Booking Estimate to see your discounted total instantly."],
["Are taxes included in the price?","Nightly prices exclude taxes. Our estimator adds a transparent 12% for taxes and service fees."],
["Is my wishlist saved?","Yes. Favourites are stored in your browser, so they will be here when you return."],
["Do you support group bookings?","Absolutely. Select multiple rooms and guests, or contact support for 10+ rooms."]];
