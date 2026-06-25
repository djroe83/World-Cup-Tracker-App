import React, { useState, useMemo } from "react";

const DATA_AS_OF = "Thu, June 25, 2026";

const GROUPS = {
  A: [
    { team: "Mexico", flag: "🇲🇽", P: 3, W: 3, D: 0, L: 0, GF: 6, GA: 0, GD: 6, Pts: 9 },
    { team: "South Africa", flag: "🇿🇦", P: 3, W: 1, D: 1, L: 1, GF: 2, GA: 3, GD: -1, Pts: 4 },
    { team: "South Korea", flag: "🇰🇷", P: 3, W: 1, D: 0, L: 2, GF: 2, GA: 3, GD: -1, Pts: 3 },
    { team: "Czechia", flag: "🇨🇿", P: 3, W: 0, D: 1, L: 2, GF: 2, GA: 6, GD: -4, Pts: 1 },
  ],
  B: [
    { team: "Switzerland", flag: "🇨🇭", P: 3, W: 2, D: 1, L: 0, GF: 7, GA: 3, GD: 4, Pts: 7 },
    { team: "Canada", flag: "🇨🇦", P: 3, W: 1, D: 1, L: 1, GF: 8, GA: 3, GD: 5, Pts: 4 },
    { team: "Bosnia & Herzegovina", flag: "🇧🇦", P: 3, W: 1, D: 1, L: 1, GF: 5, GA: 6, GD: -1, Pts: 4 },
    { team: "Qatar", flag: "🇶🇦", P: 3, W: 0, D: 1, L: 2, GF: 2, GA: 10, GD: -8, Pts: 1 },
  ],
  C: [
    { team: "Brazil", flag: "🇧🇷", P: 3, W: 2, D: 1, L: 0, GF: 7, GA: 1, GD: 6, Pts: 7 },
    { team: "Morocco", flag: "🇲🇦", P: 3, W: 2, D: 1, L: 0, GF: 6, GA: 3, GD: 3, Pts: 7 },
    { team: "Scotland", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", P: 3, W: 1, D: 0, L: 2, GF: 1, GA: 4, GD: -3, Pts: 3 },
    { team: "Haiti", flag: "🇭🇹", P: 3, W: 0, D: 0, L: 3, GF: 2, GA: 8, GD: -6, Pts: 0 },
  ],
  D: [
    { team: "USA", flag: "🇺🇸", P: 2, W: 2, D: 0, L: 0, GF: 6, GA: 1, GD: 5, Pts: 6 },
    { team: "Australia", flag: "🇦🇺", P: 2, W: 1, D: 0, L: 1, GF: 2, GA: 2, GD: 0, Pts: 3 },
    { team: "Paraguay", flag: "🇵🇾", P: 2, W: 1, D: 0, L: 1, GF: 2, GA: 4, GD: -2, Pts: 3 },
    { team: "Türkiye", flag: "🇹🇷", P: 2, W: 0, D: 0, L: 2, GF: 0, GA: 3, GD: -3, Pts: 0 },
  ],
  E: [
    { team: "Germany", flag: "🇩🇪", P: 2, W: 2, D: 0, L: 0, GF: 9, GA: 2, GD: 7, Pts: 6 },
    { team: "Ivory Coast", flag: "🇨🇮", P: 2, W: 1, D: 0, L: 1, GF: 2, GA: 2, GD: 0, Pts: 3 },
    { team: "Ecuador", flag: "🇪🇨", P: 2, W: 0, D: 1, L: 1, GF: 0, GA: 1, GD: -1, Pts: 1 },
    { team: "Curaçao", flag: "🇨🇼", P: 2, W: 0, D: 1, L: 1, GF: 1, GA: 7, GD: -6, Pts: 1 },
  ],
  F: [
    { team: "Netherlands", flag: "🇳🇱", P: 2, W: 1, D: 1, L: 0, GF: 7, GA: 3, GD: 4, Pts: 4 },
    { team: "Japan", flag: "🇯🇵", P: 2, W: 1, D: 1, L: 0, GF: 6, GA: 2, GD: 4, Pts: 4 },
    { team: "Sweden", flag: "🇸🇪", P: 2, W: 1, D: 0, L: 1, GF: 6, GA: 6, GD: 0, Pts: 3 },
    { team: "Tunisia", flag: "🇹🇳", P: 2, W: 0, D: 0, L: 2, GF: 1, GA: 9, GD: -8, Pts: 0 },
  ],
  G: [
    { team: "Egypt", flag: "🇪🇬", P: 2, W: 1, D: 1, L: 0, GF: 4, GA: 2, GD: 2, Pts: 4 },
    { team: "Belgium", flag: "🇧🇪", P: 2, W: 0, D: 2, L: 0, GF: 1, GA: 1, GD: 0, Pts: 2 },
    { team: "Iran", flag: "🇮🇷", P: 2, W: 0, D: 2, L: 0, GF: 2, GA: 2, GD: 0, Pts: 2 },
    { team: "New Zealand", flag: "🇳🇿", P: 2, W: 0, D: 1, L: 1, GF: 3, GA: 5, GD: -2, Pts: 1 },
  ],
  H: [
    { team: "Spain", flag: "🇪🇸", P: 2, W: 1, D: 1, L: 0, GF: 4, GA: 0, GD: 4, Pts: 4 },
    { team: "Uruguay", flag: "🇺🇾", P: 2, W: 0, D: 2, L: 0, GF: 3, GA: 3, GD: 0, Pts: 2 },
    { team: "Cabo Verde", flag: "🇨🇻", P: 2, W: 0, D: 2, L: 0, GF: 2, GA: 2, GD: 0, Pts: 2 },
    { team: "Saudi Arabia", flag: "🇸🇦", P: 2, W: 0, D: 1, L: 1, GF: 1, GA: 5, GD: -4, Pts: 1 },
  ],
  I: [
    { team: "France", flag: "🇫🇷", P: 2, W: 2, D: 0, L: 0, GF: 6, GA: 1, GD: 5, Pts: 6 },
    { team: "Norway", flag: "🇳🇴", P: 2, W: 2, D: 0, L: 0, GF: 7, GA: 3, GD: 4, Pts: 6 },
    { team: "Senegal", flag: "🇸🇳", P: 2, W: 0, D: 0, L: 2, GF: 3, GA: 6, GD: -3, Pts: 0 },
    { team: "Iraq", flag: "🇮🇶", P: 2, W: 0, D: 0, L: 2, GF: 1, GA: 7, GD: -6, Pts: 0 },
  ],
  J: [
    { team: "Argentina", flag: "🇦🇷", P: 2, W: 2, D: 0, L: 0, GF: 5, GA: 0, GD: 5, Pts: 6 },
    { team: "Austria", flag: "🇦🇹", P: 2, W: 1, D: 0, L: 1, GF: 3, GA: 3, GD: 0, Pts: 3 },
    { team: "Algeria", flag: "🇩🇿", P: 2, W: 1, D: 0, L: 1, GF: 2, GA: 4, GD: -2, Pts: 3 },
    { team: "Jordan", flag: "🇯🇴", P: 2, W: 0, D: 0, L: 2, GF: 2, GA: 5, GD: -3, Pts: 0 },
  ],
  K: [
    { team: "Colombia", flag: "🇨🇴", P: 2, W: 2, D: 0, L: 0, GF: 4, GA: 1, GD: 3, Pts: 6 },
    { team: "Portugal", flag: "🇵🇹", P: 2, W: 1, D: 1, L: 0, GF: 6, GA: 1, GD: 5, Pts: 4 },
    { team: "DR Congo", flag: "🇨🇩", P: 2, W: 0, D: 1, L: 1, GF: 1, GA: 2, GD: -1, Pts: 1 },
    { team: "Uzbekistan", flag: "🇺🇿", P: 2, W: 0, D: 0, L: 2, GF: 1, GA: 8, GD: -7, Pts: 0 },
  ],
  L: [
    { team: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", P: 2, W: 1, D: 1, L: 0, GF: 4, GA: 2, GD: 2, Pts: 4 },
    { team: "Croatia", flag: "🇭🇷", P: 2, W: 1, D: 0, L: 1, GF: 3, GA: 4, GD: -1, Pts: 3 },
    { team: "Ghana", flag: "🇬🇭", P: 2, W: 1, D: 1, L: 0, GF: 1, GA: 0, GD: 1, Pts: 4 },
    { team: "Panama", flag: "🇵🇦", P: 2, W: 0, D: 0, L: 2, GF: 0, GA: 2, GD: -2, Pts: 0 },
  ],
};

const FLAG = {};
Object.values(GROUPS).forEach((g) => g.forEach((t) => (FLAG[t.team] = t.flag)));

const MATCHES = [
  { id: 1, group: "A", md: 1, date: "Thu Jun 11", time: "3:00 PM", venue: "Estadio Azteca, Mexico City", status: "final", home: "Mexico", away: "South Africa", hs: 2, as: 0, odds: { home: -160, draw: 240, away: 420, pct: [56, 27, 17] } },
  { id: 2, group: "A", md: 1, date: "Thu Jun 11", time: "8:00 PM", venue: "Estadio Akron, Zapopan", status: "final", home: "South Korea", away: "Czechia", hs: 2, as: 1, odds: { home: 125, draw: 220, away: 210, pct: [40, 30, 30] } },
  { id: 3, group: "B", md: 1, date: "Fri Jun 12", time: "3:00 PM", venue: "BMO Field, Toronto", status: "final", home: "Canada", away: "Bosnia & Herzegovina", hs: 1, as: 1, odds: { home: -115, draw: 230, away: 320, pct: [48, 28, 24] } },
  { id: 4, group: "D", md: 1, date: "Fri Jun 12", time: "9:00 PM", venue: "SoFi Stadium, Inglewood", status: "final", home: "USA", away: "Paraguay", hs: 4, as: 1, odds: { home: -180, draw: 250, away: 480, pct: [60, 25, 15] } },
  { id: 5, group: "B", md: 1, date: "Sat Jun 13", time: "3:00 PM", venue: "Levi's Stadium, Santa Clara", status: "final", home: "Qatar", away: "Switzerland", hs: 1, as: 1, odds: { home: 420, draw: 270, away: -160, pct: [17, 27, 56] } },
  { id: 6, group: "C", md: 1, date: "Sat Jun 13", time: "6:00 PM", venue: "MetLife Stadium, East Rutherford", status: "final", home: "Brazil", away: "Morocco", hs: 1, as: 1, odds: { home: -200, draw: 280, away: 550, pct: [62, 24, 14] } },
  { id: 7, group: "C", md: 1, date: "Sat Jun 13", time: "8:00 PM", venue: "Gillette Stadium, Foxborough", status: "final", home: "Haiti", away: "Scotland", hs: 0, as: 1, odds: { home: 360, draw: 230, away: -130, pct: [21, 27, 52] } },
  { id: 8, group: "D", md: 1, date: "Sun Jun 14", time: "3:00 PM", venue: "BC Place, Vancouver", status: "final", home: "Australia", away: "Türkiye", hs: 2, as: 0, odds: { home: 150, draw: 215, away: 180, pct: [37, 30, 33] } },
  { id: 9, group: "E", md: 1, date: "Sun Jun 14", time: "4:00 PM", venue: "NRG Stadium, Houston", status: "final", home: "Germany", away: "Curaçao", hs: 7, as: 1, odds: { home: -600, draw: 600, away: 1400, pct: [82, 13, 5] } },
  { id: 10, group: "F", md: 1, date: "Sun Jun 14", time: "5:00 PM", venue: "AT&T Stadium, Arlington", status: "final", home: "Netherlands", away: "Japan", hs: 2, as: 2, odds: { home: -140, draw: 240, away: 360, pct: [53, 27, 20] } },
  { id: 11, group: "E", md: 1, date: "Sun Jun 14", time: "7:00 PM", venue: "Lincoln Financial Field, Philadelphia", status: "final", home: "Ivory Coast", away: "Ecuador", hs: 1, as: 0, odds: { home: 135, draw: 205, away: 200, pct: [39, 31, 30] } },
  { id: 12, group: "F", md: 1, date: "Sun Jun 14", time: "10:00 PM", venue: "Estadio BBVA, Monterrey", status: "final", home: "Sweden", away: "Tunisia", hs: 5, as: 1, odds: { home: -150, draw: 230, away: 380, pct: [55, 27, 18] } },
  { id: 13, group: "H", md: 1, date: "Mon Jun 15", time: "12:00 PM", venue: "Mercedes-Benz Stadium, Atlanta", status: "final", home: "Spain", away: "Cabo Verde", hs: 0, as: 0, odds: { home: -650, draw: 480, away: 2000, pct: [82, 14, 4] } },
  { id: 14, group: "G", md: 1, date: "Mon Jun 15", time: "3:00 PM", venue: "Lumen Field, Seattle", status: "final", home: "Belgium", away: "Egypt", hs: 1, as: 1, odds: { home: -170, draw: 250, away: 420, pct: [58, 26, 16] } },
  { id: 15, group: "H", md: 1, date: "Mon Jun 15", time: "6:00 PM", venue: "Hard Rock Stadium, Miami Gardens", status: "final", home: "Saudi Arabia", away: "Uruguay", hs: 1, as: 1, odds: { home: 380, draw: 250, away: -140, pct: [19, 27, 54] } },
  { id: 16, group: "G", md: 1, date: "Mon Jun 15", time: "9:00 PM", venue: "SoFi Stadium, Inglewood", status: "final", home: "Iran", away: "New Zealand", hs: 2, as: 2, odds: { home: -120, draw: 215, away: 330, pct: [49, 29, 22] } },
  { id: 17, group: "I", md: 1, date: "Tue Jun 16", time: "3:00 PM", venue: "MetLife Stadium, East Rutherford", status: "final", home: "France", away: "Senegal", hs: 3, as: 1, odds: { home: -175, draw: 250, away: 440, pct: [59, 25, 16] }, note: "Mbappé brace + Olise-led 2nd half surge" },
  { id: 18, group: "I", md: 1, date: "Tue Jun 16", time: "6:00 PM", venue: "Gillette Stadium, Foxborough", status: "final", home: "Iraq", away: "Norway", hs: 1, as: 4, odds: { home: 460, draw: 270, away: -160, pct: [16, 27, 57] }, note: "Haaland brace in Norway's return to the World Cup" },
  { id: 19, group: "J", md: 1, date: "Tue Jun 16", time: "9:00 PM", venue: "Arrowhead Stadium, Kansas City", status: "final", home: "Argentina", away: "Algeria", hs: 3, as: 0, odds: { home: -260, draw: 300, away: 650, pct: [67, 22, 11] }, kc: true, note: "Messi hat-trick — ties Klose's all-time WC goals record (16)" },
  { id: 20, group: "J", md: 1, date: "Wed Jun 17", time: "12:00 AM", venue: "Levi's Stadium, Santa Clara", status: "final", home: "Austria", away: "Jordan", hs: 3, as: 1, odds: { home: -150, draw: 230, away: 400, pct: [55, 27, 18] } },
  { id: 21, group: "K", md: 1, date: "Wed Jun 17", time: "1:00 PM", venue: "NRG Stadium, Houston", status: "final", home: "Portugal", away: "DR Congo", hs: 1, as: 1, odds: { home: -240, draw: 290, away: 600, pct: [65, 22, 13] }, note: "Ronaldo's record 6th World Cup appearance; Congo DR held firm" },
  { id: 22, group: "L", md: 1, date: "Wed Jun 17", time: "4:00 PM", venue: "AT&T Stadium, Arlington", status: "final", home: "England", away: "Croatia", hs: 4, as: 2, odds: { home: -130, draw: 240, away: 340, pct: [52, 27, 21] }, note: "Harry Kane brace, plus Bellingham & Rashford" },
  { id: 23, group: "L", md: 1, date: "Wed Jun 17", time: "7:00 PM", venue: "BMO Field, Toronto", status: "final", home: "Ghana", away: "Panama", hs: 1, as: 0 },
  { id: 24, group: "K", md: 1, date: "Wed Jun 17", time: "10:00 PM", venue: "Estadio Azteca, Mexico City", status: "final", home: "Uzbekistan", away: "Colombia", hs: 1, as: 3 },
  { id: 25, group: "A", md: 2, date: "Thu Jun 18", time: "12:00 PM", venue: "Mercedes-Benz Stadium, Atlanta", status: "final", home: "Czechia", away: "South Africa", hs: 1, as: 1, note: "Sadílek opened it, Mokoena's 2nd-half penalty leveled" },
  { id: 26, group: "B", md: 2, date: "Thu Jun 18", time: "3:00 PM", venue: "SoFi Stadium, Inglewood", status: "final", home: "Switzerland", away: "Bosnia & Herzegovina", hs: 4, as: 1, note: "Manzambi brace, Xhaka penalty" },
  { id: 27, group: "B", md: 2, date: "Thu Jun 18", time: "6:00 PM", venue: "BC Place, Vancouver", status: "final", home: "Canada", away: "Qatar", hs: 6, as: 0 },
  { id: 28, group: "A", md: 2, date: "Thu Jun 18", time: "9:00 PM", venue: "Estadio Akron, Zapopan", status: "final", home: "Mexico", away: "South Korea", hs: 1, as: 0, note: "Mexico is the first team to clinch a knockout-stage berth (2-0)" },
  { id: 29, group: "D", md: 2, date: "Fri Jun 19", time: "3:00 PM", venue: "Lumen Field, Seattle", status: "final", home: "USA", away: "Australia", hs: 2, as: 0, odds: { home: -165, draw: 250, away: 410, pct: [58, 26, 16] }, note: "Burgess own goal + Freeman header — USA clinches knockout spot (2-0)" },
  { id: 30, group: "C", md: 2, date: "Fri Jun 19", time: "6:00 PM", venue: "Gillette Stadium, Foxborough", status: "final", home: "Scotland", away: "Morocco", hs: 0, as: 1, odds: { home: 430, draw: 270, away: -136, pct: [17, 27, 56] }, note: "Morocco scored after 69 seconds and held on through relentless Scottish pressure" },
  { id: 31, group: "C", md: 2, date: "Fri Jun 19", time: "8:30 PM", venue: "Lincoln Financial Field, Philadelphia", status: "final", home: "Brazil", away: "Haiti", hs: 3, as: 0, odds: { home: -1020, draw: 950, away: 2075, pct: [88, 9, 3] }, note: "Brazil's first win — eliminates Haiti, eases pressure on Ancelotti" },
  { id: 32, group: "D", md: 2, date: "Fri Jun 19", time: "11:00 PM", venue: "Levi's Stadium, Santa Clara", status: "final", home: "Türkiye", away: "Paraguay", hs: 0, as: 1, odds: { home: 102, draw: 225, away: 290, pct: [40, 29, 31] }, note: "Paraguay's win mathematically clinched Group D's top spot for the USA" },
  { id: 33, group: "F", md: 2, date: "Sat Jun 20", time: "1:00 PM", venue: "NRG Stadium, Houston", status: "final", home: "Netherlands", away: "Sweden", hs: 5, as: 1, note: "Brobbey opened inside 5 min; Dutch masterclass tops Group F, on the brink of advancing" },
  { id: 34, group: "E", md: 2, date: "Sat Jun 20", time: "4:00 PM", venue: "BMO Field, Toronto", status: "final", home: "Germany", away: "Ivory Coast", hs: 2, as: 1, odds: { home: -210, draw: 300, away: 650, pct: [63, 23, 14] }, note: "Undav's 94th-minute winner sends Germany through and tops Group E" },
  { id: 35, group: "E", md: 2, date: "Sat Jun 20", time: "8:00 PM", venue: "Arrowhead Stadium, Kansas City", status: "final", home: "Ecuador", away: "Curaçao", hs: 0, as: 0, odds: { home: -250, draw: 290, away: 700, pct: [66, 22, 12] }, kc: true, note: "Eloy Room makes a record 15 saves; Curaçao earns its first-ever World Cup point" },
  { id: 36, group: "F", md: 2, date: "Sun Jun 21", time: "12:00 AM", venue: "Estadio BBVA, Monterrey", status: "final", home: "Tunisia", away: "Japan", hs: 0, as: 4, odds: { home: 580, draw: 320, away: -195, pct: [15, 26, 59] }, note: "1,000th World Cup match; Ueda 2G+1A, Japan eliminates Tunisia and joins Netherlands atop Group F" },
  { id: 37, group: "H", md: 2, date: "Sun Jun 21", time: "12:00 PM", venue: "Mercedes-Benz Stadium, Atlanta", status: "final", home: "Spain", away: "Saudi Arabia", hs: 4, as: 0, odds: { home: -1200, draw: 1000, away: 2500, pct: [89, 9, 2] }, note: "Yamal back in the XI and brilliant; Oyarzabal 2G. Spain finds its feet" },
  { id: 38, group: "G", md: 2, date: "Sun Jun 21", time: "3:00 PM", venue: "SoFi Stadium, Inglewood", status: "final", home: "Belgium", away: "Iran", hs: 0, as: 0, odds: { home: -235, draw: 320, away: 580, pct: [64, 23, 13] }, note: "Belgium down to 10 (Ngoy red, 66'); Beiranvand heroics. Belgium still winless" },
  { id: 39, group: "H", md: 2, date: "Sun Jun 21", time: "6:00 PM", venue: "Hard Rock Stadium, Miami Gardens", status: "final", home: "Uruguay", away: "Cabo Verde", hs: 2, as: 2, odds: { home: -225, draw: 310, away: 733, pct: [63, 24, 13] }, note: "Cabo Verde's SECOND straight shock point — 2 pts from Spain & Uruguay" },
  { id: 40, group: "G", md: 2, date: "Sun Jun 21", time: "9:00 PM", venue: "BC Place, Vancouver", status: "final", home: "New Zealand", away: "Egypt", hs: 1, as: 3, odds: { home: 449, draw: 300, away: -169, pct: [17, 27, 56] }, note: "Salah goal + assist; Egypt's first-ever World Cup win in regulation" },
  { id: 41, group: "J", md: 2, date: "Mon Jun 22", time: "1:00 PM", venue: "AT&T Stadium, Arlington", status: "final", home: "Argentina", away: "Austria", hs: 2, as: 0, odds: { home: -176, draw: 300, away: 494, pct: [58, 25, 17] }, note: "Messi scores 17th & 18th WC goals — passes Klose as all-time leading scorer; Argentina clinch Group J" },
  { id: 42, group: "I", md: 2, date: "Mon Jun 22", time: "5:00 PM", venue: "Lincoln Financial Field, Philadelphia", status: "final", home: "France", away: "Iraq", hs: 3, as: 0, odds: { home: -1200, draw: 1000, away: 2500, pct: [89, 9, 2] }, note: "Mbappé brace through a 2h15m storm delay; France clinch knockouts" },
  { id: 43, group: "I", md: 2, date: "Mon Jun 22", time: "8:00 PM", venue: "MetLife Stadium, East Rutherford", status: "final", home: "Norway", away: "Senegal", hs: 3, as: 2, odds: { home: 120, draw: 250, away: 220, pct: [40, 29, 31] }, note: "Haaland brace; Norway through. Sarr's 93rd-min goal keeps Senegal's 3rd-place hopes alive" },
  { id: 44, group: "J", md: 2, date: "Mon Jun 22", time: "11:00 PM", venue: "Levi's Stadium, Santa Clara", status: "final", home: "Jordan", away: "Algeria", hs: 1, as: 2, odds: { home: 475, draw: 320, away: -160, pct: [16, 26, 58] }, note: "Algeria's late comeback (Benbouali, Gouiri) for its first points" },
  { id: 45, group: "K", md: 2, date: "Tue Jun 23", time: "1:00 PM", venue: "NRG Stadium, Houston", status: "final", home: "Portugal", away: "Uzbekistan", hs: 5, as: 0, odds: { home: -500, draw: 600, away: 1200, pct: [80, 14, 6] }, note: "Portugal roars to life; Ronaldo & Co. take command of Group K" },
  { id: 46, group: "L", md: 2, date: "Tue Jun 23", time: "4:00 PM", venue: "Gillette Stadium, Foxborough", status: "final", home: "England", away: "Ghana", hs: 0, as: 0, odds: { home: -500, draw: 600, away: 1200, pct: [80, 14, 6] }, note: "Ghana frustrates England in a goalless stalemate" },
  { id: 47, group: "L", md: 2, date: "Tue Jun 23", time: "7:00 PM", venue: "BMO Field, Toronto", status: "final", home: "Panama", away: "Croatia", hs: 0, as: 1, odds: { home: 550, draw: 300, away: -136, pct: [15, 27, 58] }, note: "Croatia gets its first win to revive its campaign" },
  { id: 48, group: "K", md: 2, date: "Tue Jun 23", time: "10:00 PM", venue: "Estadio Akron, Zapopan", status: "final", home: "Colombia", away: "DR Congo", hs: 1, as: 0, odds: { home: -200, draw: 333, away: 550, pct: [60, 22, 18] }, note: "Colombia edges it to take control of Group K" },
  { id: 49, group: "B", md: 3, date: "Wed Jun 24", time: "3:00 PM", venue: "BC Place, Vancouver", status: "final", home: "Switzerland", away: "Canada", hs: 2, as: 1, odds: { home: 180, draw: 215, away: 150, pct: [33, 30, 37] }, note: "Switzerland top Group B; Shaqiri penalty seals it" },
  { id: 50, group: "B", md: 3, date: "Wed Jun 24", time: "3:00 PM", venue: "Lumen Field, Seattle", status: "final", home: "Bosnia & Herzegovina", away: "Qatar", hs: 3, as: 1, odds: { home: -140, draw: 250, away: 360, pct: [52, 27, 21] }, note: "Bosnia advance as one of the best third-place teams" },
  { id: 51, group: "C", md: 3, date: "Wed Jun 24", time: "6:00 PM", venue: "Hard Rock Stadium, Miami Gardens", status: "final", home: "Scotland", away: "Brazil", hs: 0, as: 3, odds: { home: 600, draw: 320, away: -240, pct: [13, 24, 63] }, note: "Brazil top Group C in style; Scotland eliminated" },
  { id: 52, group: "C", md: 3, date: "Wed Jun 24", time: "6:00 PM", venue: "Mercedes-Benz Stadium, Atlanta", status: "final", home: "Morocco", away: "Haiti", hs: 4, as: 2, odds: { home: -260, draw: 320, away: 700, pct: [66, 22, 12] }, note: "Morocco through 2nd in Group C in emphatic fashion" },
  { id: 53, group: "A", md: 3, date: "Wed Jun 24", time: "9:00 PM", venue: "Estadio Azteca, Mexico City", status: "final", home: "Czechia", away: "Mexico", hs: 0, as: 3, odds: { home: 280, draw: 250, away: -120, pct: [25, 28, 47] }, note: "Mexico sweep Group A 3-0-0 — dominant from start to finish" },
  { id: 54, group: "A", md: 3, date: "Wed Jun 24", time: "9:00 PM", venue: "Estadio BBVA, Monterrey", status: "final", home: "South Africa", away: "South Korea", hs: 1, as: 0, odds: { home: 240, draw: 230, away: -110, pct: [27, 29, 44] }, note: "South Africa's stunning 1-0 win edges out South Korea for 2nd place in Group A" },
  { id: 55, group: "E", md: 3, date: "Thu Jun 25", time: "4:00 PM", venue: "Lincoln Financial Field, Philadelphia", status: "upcoming", home: "Curaçao", away: "Ivory Coast", hs: null, as: null, odds: { home: 650, draw: 340, away: -260, pct: [12, 23, 65] }, est: true },
  { id: 56, group: "E", md: 3, date: "Thu Jun 25", time: "4:00 PM", venue: "MetLife Stadium, East Rutherford", status: "upcoming", home: "Ecuador", away: "Germany", hs: null, as: null, odds: { home: 420, draw: 290, away: -170, pct: [18, 25, 57] }, est: true },
  { id: 57, group: "F", md: 3, date: "Thu Jun 25", time: "7:00 PM", venue: "AT&T Stadium, Arlington", status: "upcoming", home: "Japan", away: "Sweden", hs: null, as: null, odds: { home: 135, draw: 230, away: 190, pct: [38, 28, 34] }, est: true },
  { id: 58, group: "F", md: 3, date: "Thu Jun 25", time: "7:00 PM", venue: "Arrowhead Stadium, Kansas City", status: "upcoming", home: "Tunisia", away: "Netherlands", hs: null, as: null, odds: { home: 650, draw: 350, away: -260, pct: [12, 22, 66] }, est: true, kc: true },
  { id: 59, group: "D", md: 3, date: "Thu Jun 25", time: "10:00 PM", venue: "SoFi Stadium, Inglewood", status: "upcoming", home: "Türkiye", away: "USA", hs: null, as: null, odds: { home: 320, draw: 260, away: -130, pct: [23, 27, 50] }, est: true },
  { id: 60, group: "D", md: 3, date: "Thu Jun 25", time: "10:00 PM", venue: "Levi's Stadium, Santa Clara", status: "upcoming", home: "Paraguay", away: "Australia", hs: null, as: null, odds: { home: 180, draw: 215, away: 150, pct: [33, 30, 37] }, est: true },
  { id: 61, group: "I", md: 3, date: "Fri Jun 26", time: "3:00 PM", venue: "Gillette Stadium, Foxborough", status: "upcoming", home: "Norway", away: "France", hs: null, as: null, odds: { home: 240, draw: 290, away: -110, pct: [27, 25, 48] }, est: true },
  { id: 62, group: "I", md: 3, date: "Fri Jun 26", time: "3:00 PM", venue: "BMO Field, Toronto", status: "upcoming", home: "Senegal", away: "Iraq", hs: null, as: null, odds: { home: -240, draw: 300, away: 650, pct: [65, 22, 13] }, est: true },
  { id: 63, group: "H", md: 3, date: "Fri Jun 26", time: "8:00 PM", venue: "NRG Stadium, Houston", status: "upcoming", home: "Cabo Verde", away: "Saudi Arabia", hs: null, as: null, odds: { home: 190, draw: 220, away: 150, pct: [34, 29, 37] }, est: true },
  { id: 64, group: "H", md: 3, date: "Fri Jun 26", time: "8:00 PM", venue: "Estadio Akron, Zapopan", status: "upcoming", home: "Uruguay", away: "Spain", hs: null, as: null, odds: { home: 270, draw: 250, away: -115, pct: [25, 28, 47] }, est: true },
  { id: 65, group: "G", md: 3, date: "Fri Jun 26", time: "11:00 PM", venue: "Lumen Field, Seattle", status: "upcoming", home: "Egypt", away: "Iran", hs: null, as: null, odds: { home: 150, draw: 220, away: 180, pct: [37, 29, 34] }, est: true },
  { id: 66, group: "G", md: 3, date: "Fri Jun 26", time: "11:00 PM", venue: "BC Place, Vancouver", status: "upcoming", home: "New Zealand", away: "Belgium", hs: null, as: null, odds: { home: 500, draw: 320, away: -200, pct: [15, 24, 61] }, est: true },
  { id: 67, group: "L", md: 3, date: "Sat Jun 27", time: "5:00 PM", venue: "MetLife Stadium, East Rutherford", status: "upcoming", home: "Panama", away: "England", hs: null, as: null, odds: { home: 700, draw: 360, away: -280, pct: [11, 21, 68] }, est: true },
  { id: 68, group: "L", md: 3, date: "Sat Jun 27", time: "5:00 PM", venue: "Lincoln Financial Field, Philadelphia", status: "upcoming", home: "Croatia", away: "Ghana", hs: null, as: null, odds: { home: -120, draw: 240, away: 320, pct: [49, 27, 24] }, est: true },
  { id: 69, group: "K", md: 3, date: "Sat Jun 27", time: "7:30 PM", venue: "Hard Rock Stadium, Miami Gardens", status: "upcoming", home: "Colombia", away: "Portugal", hs: null, as: null, odds: { home: 190, draw: 230, away: 145, pct: [34, 28, 38] }, est: true },
  { id: 70, group: "K", md: 3, date: "Sat Jun 27", time: "7:30 PM", venue: "Mercedes-Benz Stadium, Atlanta", status: "upcoming", home: "DR Congo", away: "Uzbekistan", hs: null, as: null, odds: { home: 140, draw: 220, away: 190, pct: [38, 29, 33] }, est: true },
  { id: 71, group: "J", md: 3, date: "Sat Jun 27", time: "10:00 PM", venue: "Arrowhead Stadium, Kansas City", status: "upcoming", home: "Algeria", away: "Austria", hs: null, as: null, odds: { home: 210, draw: 240, away: 130, pct: [30, 28, 42] }, est: true, kc: true },
  { id: 72, group: "J", md: 3, date: "Sat Jun 27", time: "10:00 PM", venue: "AT&T Stadium, Arlington", status: "upcoming", home: "Jordan", away: "Argentina", hs: null, as: null, odds: { home: 900, draw: 420, away: -360, pct: [9, 18, 73] }, est: true },
];

const RANKINGS = [
  { rank: 1, team: "Argentina", flag: "🇦🇷", prev: 3 },
  { rank: 2, team: "Spain", flag: "🇪🇸", prev: 2 },
  { rank: 3, team: "France", flag: "🇫🇷", prev: 1 },
  { rank: 4, team: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", prev: 4 },
  { rank: 5, team: "Portugal", flag: "🇵🇹", prev: 5 },
  { rank: 6, team: "Brazil", flag: "🇧🇷", prev: 6 },
  { rank: 7, team: "Netherlands", flag: "🇳🇱", prev: 7 },
  { rank: 8, team: "Morocco", flag: "🇲🇦", prev: 8 },
  { rank: 9, team: "Belgium", flag: "🇧🇪", prev: 9 },
  { rank: 10, team: "Germany", flag: "🇩🇪", prev: 10 },
  { rank: 11, team: "Croatia", flag: "🇭🇷", prev: 11 },
  { rank: 12, team: "Italy", flag: "🇮🇹", prev: 12, note: "did not qualify" },
  { rank: 13, team: "Colombia", flag: "🇨🇴", prev: 13 },
  { rank: 14, team: "Senegal", flag: "🇸🇳", prev: 14 },
  { rank: 15, team: "Mexico", flag: "🇲🇽", prev: 15 },
  { rank: 16, team: "United States", flag: "🇺🇸", prev: 16 },
  { rank: 17, team: "Uruguay", flag: "🇺🇾", prev: 17 },
  { rank: 18, team: "Japan", flag: "🇯🇵", prev: 18 },
  { rank: 19, team: "Switzerland", flag: "🇨🇭", prev: 19 },
  { rank: 20, team: "Denmark", flag: "🇩🇰", prev: 20, note: "did not qualify" },
  { rank: 23, team: "Ecuador", flag: "🇪🇨", prev: 23 },
  { rank: 26, team: "Australia", flag: "🇦🇺", prev: 26 },
  { rank: 27, team: "Canada", flag: "🇨🇦", prev: 27 },
  { rank: 28, team: "Norway", flag: "🇳🇴", prev: 28 },
];
const RANKINGS_AS_OF = "FIFA Men's World Ranking · June 11, 2026";

const TITLE_ODDS = [
  { team: "France", flag: "🇫🇷", pre: 700, now: 370 },
  { team: "Spain", flag: "🇪🇸", pre: 400, now: 550 },
  { team: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", pre: 600, now: 600 },
  { team: "Argentina", flag: "🇦🇷", pre: 800, now: 800 },
  { team: "Portugal", flag: "🇵🇹", pre: 1100, now: 1000 },
  { team: "Brazil", flag: "🇧🇷", pre: 800, now: 1100 },
  { team: "Germany", flag: "🇩🇪", pre: 1200, now: 1300 },
  { team: "Netherlands", flag: "🇳🇱", pre: 1600, now: 1700 },
  { team: "United States", flag: "🇺🇸", pre: 5000, now: 3000 },
  { team: "Norway", flag: "🇳🇴", pre: 3500, now: 3300 },
  { team: "Morocco", flag: "🇲🇦", pre: 6000, now: 3300 },
  { team: "Belgium", flag: "🇧🇪", pre: 2200, now: 4000 },
  { team: "Colombia", flag: "🇨🇴", pre: 4000, now: 4500 },
  { team: "Mexico", flag: "🇲🇽", pre: 6500, now: 5000 },
];
const TITLE_ODDS_NOTE = "Pre-tournament line from the December draw vs. current price (Jun 20). Pre-game/futures only — not live in-play.";

const R32 = [
  { m: 73, date: "Jun 28", venue: "Los Angeles", a: { team: "South Africa", flag: "🇿🇦", conf: true }, b: { team: "Canada", flag: "🇨🇦", conf: true } },
  // M74b: 3rd from A/B/C/D/F — Bosnia leads (4 pts, best 3rd so far), then S.Korea & Scotland (3 pts each), Sweden (likely 3rd F)
  { m: 74, date: "Jun 29", venue: "Boston", a: { team: "Germany", flag: "🇩🇪", conf: true }, b: { label: "3rd A/B/C/D/F", cands: [{ t: "Bosnia", pct: 42 }, { t: "South Korea", pct: 22 }, { t: "Scotland", pct: 14 }, { t: "Sweden", pct: 14 }] } },
  { m: 75, date: "Jun 30", venue: "Guadalajara", a: { label: "Grp F 1st", cands: [{ t: "Netherlands", pct: 55 }, { t: "Japan", pct: 45 }] }, b: { team: "Morocco", flag: "🇲🇦", conf: true } },
  { m: 76, date: "Jun 29", venue: "Houston", a: { team: "Brazil", flag: "🇧🇷", conf: true }, b: { label: "Grp F 2nd", cands: [{ t: "Japan", pct: 50 }, { t: "Netherlands", pct: 45 }, { t: "Sweden", pct: 5 }] } },
  // M77a: France & Norway both 6 pts — they play each other Jun 26, split is close
  // M77b: 3rd from C/D/F/G/H — Sweden & Aus/Par (3 pts) outrank Belgium/Cabo Verde/Uruguay (1-2 pts)
  { m: 77, date: "Jun 30", venue: "New York NJ", a: { label: "Grp I 1st", cands: [{ t: "France", pct: 55 }, { t: "Norway", pct: 45 }] }, b: { label: "3rd C/D/F/G/H", cands: [{ t: "Sweden", pct: 28 }, { t: "Australia", pct: 22 }, { t: "Paraguay", pct: 18 }, { t: "Scotland", pct: 16 }] } },
  // M78a: Ivory Coast (3 pts) vs Curaçao today; Ecuador (1 pt) faces Germany — near-certain Ivory Coast 2nd
  // M78b: Grp I 2nd is France or Norway only — Senegal (0 pts) cannot finish 2nd
  { m: 78, date: "Jun 30", venue: "Dallas", a: { label: "Grp E 2nd", cands: [{ t: "Ivory Coast", pct: 85 }, { t: "Ecuador", pct: 15 }] }, b: { label: "Grp I 2nd", cands: [{ t: "Norway", pct: 55 }, { t: "France", pct: 45 }] } },
  // M79b: 3rd from C/E/F/H/I — Sweden (3 pts) and Scotland (3 pts) lead; Ecuador/Curaçao/Senegal/Iraq (0-1 pt) very weak
  { m: 79, date: "Jul 1", venue: "Mexico City", a: { team: "Mexico", flag: "🇲🇽", conf: true }, b: { label: "3rd C/E/F/H/I", cands: [{ t: "Sweden", pct: 35 }, { t: "Scotland", pct: 22 }, { t: "Cabo Verde", pct: 22 }, { t: "Uruguay", pct: 12 }] } },
  // M80a: England & Ghana both 4 pts — Ghana 8% was far too low; England plays Panama, Ghana plays Croatia
  // M80b: 3rd from E/H/I/J/K — Austria/Algeria (3 pts if 3rd in J) dominate; Senegal (0 pts) nowhere near 30%
  { m: 80, date: "Jul 1", venue: "Atlanta", a: { label: "Grp L 1st", cands: [{ t: "England", pct: 55 }, { t: "Ghana", pct: 35 }, { t: "Croatia", pct: 10 }] }, b: { label: "3rd E/H/I/J/K", cands: [{ t: "Austria", pct: 36 }, { t: "Algeria", pct: 30 }, { t: "Cabo Verde", pct: 18 }, { t: "Uruguay", pct: 10 }] } },
  // M81b: 3rd from B/E/F/I/J — Bosnia (4 pts) is the clear frontrunner, not Ecuador (1 pt); Qatar eliminated so "Bosnia/Qatar" removed
  { m: 81, date: "Jul 1", venue: "Bay Area", us: true, a: { team: "USA", flag: "🇺🇸", conf: true }, b: { label: "3rd B/E/F/I/J", cands: [{ t: "Bosnia", pct: 45 }, { t: "Algeria", pct: 20 }, { t: "Austria", pct: 18 }, { t: "Sweden", pct: 12 }] } },
  // M82a: Egypt 65% is reasonable; Iran underrated at 10% given they play Egypt directly
  // M82b: 3rd from A/E/H/I/J — Czechia ELIMINATED (4th in A); South Korea is 3rd in A
  { m: 82, date: "Jul 1", venue: "Seattle", a: { label: "Grp G 1st", cands: [{ t: "Egypt", pct: 62 }, { t: "Iran", pct: 24 }, { t: "Belgium", pct: 14 }] }, b: { label: "3rd A/E/H/I/J", cands: [{ t: "South Korea", pct: 38 }, { t: "Austria", pct: 26 }, { t: "Algeria", pct: 22 }, { t: "Cabo Verde", pct: 10 }] } },
  // M83a: Grp K 2nd — Colombia confirmed 1st (6 pts), cannot be 2nd; Portugal (4 pts) is near-certain 2nd
  // M83b: England and Ghana both 4 pts — England at 15% for 2nd was wrong
  { m: 83, date: "Jul 2", venue: "Toronto", a: { label: "Grp K 2nd", cands: [{ t: "Portugal", pct: 88 }, { t: "DR Congo", pct: 12 }] }, b: { label: "Grp L 2nd", cands: [{ t: "Ghana", pct: 42 }, { t: "England", pct: 30 }, { t: "Croatia", pct: 28 }] } },
  // M84b: Grp J 2nd — Argentina confirmed 1st (6 pts), cannot be 2nd; it's Austria vs Algeria only
  { m: 84, date: "Jul 2", venue: "Los Angeles", a: { label: "Grp H 1st", cands: [{ t: "Spain", pct: 78 }, { t: "Uruguay", pct: 14 }, { t: "Cabo Verde", pct: 8 }] }, b: { label: "Grp J 2nd", cands: [{ t: "Austria", pct: 52 }, { t: "Algeria", pct: 48 }] } },
  // M85b: 3rd from E/F/G/I/J — Sweden (3 pts) and Belgium/Iran (2 pts from G) realistic; Senegal (0 pts) removed
  { m: 85, date: "Jul 2", venue: "Vancouver", a: { team: "Switzerland", flag: "🇨🇭", conf: true }, b: { label: "3rd E/F/G/I/J", cands: [{ t: "Sweden", pct: 32 }, { t: "Belgium", pct: 24 }, { t: "Iran", pct: 22 }, { t: "Algeria", pct: 14 }] } },
  // M86a: Argentina won Group J — confirmed, not probabilistic
  { m: 86, date: "Jul 2", venue: "Miami", a: { team: "Argentina", flag: "🇦🇷", conf: true }, b: { label: "Grp H 2nd", cands: [{ t: "Uruguay", pct: 42 }, { t: "Cabo Verde", pct: 38 }, { t: "Spain", pct: 15 }] } },
  // M87a: Colombia won Group K (6 pts) — confirmed, not probabilistic
  // M87b: 3rd from D/E/I/J/L — Senegal (0 pts) at 35% was absurd; Aus/Par loser (3 pts) and Austria/Algeria (3 pts) are the real candidates
  { m: 87, date: "Jul 3", venue: "Kansas City", kc: true, a: { team: "Colombia", flag: "🇨🇴", conf: true }, b: { label: "3rd D/E/I/J/L", cands: [{ t: "Australia", pct: 28 }, { t: "Paraguay", pct: 28 }, { t: "Austria", pct: 22 }, { t: "Algeria", pct: 14 }] } },
  // M88b: Egypt (4 pts, group leader) was underrated at 20% for 2nd; Iran plays Egypt directly so both in play
  { m: 88, date: "Jul 3", venue: "Dallas", a: { label: "Grp D 2nd", cands: [{ t: "Australia", pct: 50 }, { t: "Paraguay", pct: 50 }] }, b: { label: "Grp G 2nd", cands: [{ t: "Belgium", pct: 35 }, { t: "Iran", pct: 30 }, { t: "Egypt", pct: 25 }, { t: "New Zealand", pct: 10 }] } },
];

const R16 = [
  { m: 89, date: "Jul 4", venue: "Philadelphia", from: [74, 77] },
  { m: 90, date: "Jul 4", venue: "Houston", from: [73, 75] },
  { m: 91, date: "Jul 5", venue: "New York NJ", from: [76, 78] },
  { m: 92, date: "Jul 5", venue: "Mexico City", from: [79, 80] },
  { m: 93, date: "Jul 6", venue: "Dallas", from: [83, 84] },
  { m: 94, date: "Jul 6", venue: "Seattle", from: [81, 82], us: true },
  { m: 95, date: "Jul 7", venue: "Atlanta", from: [86, 88] },
  { m: 96, date: "Jul 7", venue: "Vancouver", from: [85, 87] },
];

const QF = [
  { m: 97, date: "Jul 9", venue: "Boston", from: [89, 90] },
  { m: 98, date: "Jul 10", venue: "Los Angeles", from: [93, 94] },
  { m: 99, date: "Jul 11", venue: "Miami", from: [91, 92] },
  { m: 100, date: "Jul 11", venue: "Kansas City", from: [95, 96], kc: true },
];

const SF = [
  { m: 101, date: "Jul 14", venue: "Dallas", from: [97, 98] },
  { m: 102, date: "Jul 15", venue: "Atlanta", from: [99, 100] },
];

const FINAL = { m: 104, date: "Jul 19", venue: "New York NJ", from: [101, 102] };

const QUALIFICATION = [
  { team: "Mexico", flag: "🇲🇽", state: "in", detail: "Won Group A 3-0-0 — perfect record, 9 pts" },
  { team: "South Africa", flag: "🇿🇦", state: "in", detail: "2nd in Group A — shock 1-0 win over South Korea clinched it" },
  { team: "Switzerland", flag: "🇨🇭", state: "in", detail: "Won Group B (7 pts), edged Canada 2-1 on MD3" },
  { team: "Canada", flag: "🇨🇦", state: "in", detail: "2nd in Group B (4 pts, GD +5)" },
  { team: "Brazil", flag: "🇧🇷", state: "in", detail: "Won Group C (7 pts), beat Scotland 3-0 on MD3" },
  { team: "Morocco", flag: "🇲🇦", state: "in", detail: "2nd in Group C (7 pts, GD +3), beat Haiti 4-2" },
  { team: "USA", flag: "🇺🇸", state: "in", detail: "Won Group D — R32 Jul 1, Bay Area" },
  { team: "Germany", flag: "🇩🇪", state: "in", detail: "Won Group E" },
  { team: "France", flag: "🇫🇷", state: "in", detail: "Clinched Group I (6 pts); plays Norway for top spot Jun 26" },
  { team: "Norway", flag: "🇳🇴", state: "in", detail: "Clinched in Group I (6 pts) on Haaland's goals" },
  { team: "Argentina", flag: "🇦🇷", state: "in", detail: "Won Group J; Messi is now all-time WC top scorer (18)" },
  { team: "Spain", flag: "🇪🇸", state: "likely", detail: "Leads Group H (4 pts); plays Uruguay in finale Jun 26" },
  { team: "Netherlands", flag: "🇳🇱", state: "likely", detail: "Top of Group F (4 pts); plays Tunisia Jun 25" },
  { team: "Japan", flag: "🇯🇵", state: "likely", detail: "Level top of Group F (4 pts); plays Sweden Jun 25" },
  { team: "Colombia", flag: "🇨🇴", state: "in", detail: "Won Group K — 6 pts, 3 wins; R32 Jul 3, Kansas City" },
  { team: "Portugal", flag: "🇵🇹", state: "in", detail: "Confirmed Group K (4 pts, GD +5); can't be overtaken by DR Congo" },
  { team: "Egypt", flag: "🇪🇬", state: "likely", detail: "Leads Group G (4 pts)" },
  { team: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", state: "likely", detail: "Top of Group L (4 pts)" },
  { team: "Bosnia & Herzegovina", flag: "🇧🇦", state: "alive", detail: "3rd in Group B (4 pts) — tracking to advance as best 3rd" },
  { team: "South Korea", flag: "🇰🇷", state: "alive", detail: "3rd in Group A (3 pts, GD −1) — awaiting best-3rd comparison" },
  { team: "Australia", flag: "🇦🇺", state: "alive", detail: "3 pts in Group D; plays Paraguay today (Jun 25) — 2nd place on the line" },
  { team: "Paraguay", flag: "🇵🇾", state: "alive", detail: "3 pts in Group D; plays Australia today (Jun 25) — 2nd place on the line" },
  { team: "Ivory Coast", flag: "🇨🇮", state: "alive", detail: "3 pts in Group E; plays Curaçao today (Jun 25) — 2nd place up for grabs" },
  { team: "Sweden", flag: "🇸🇪", state: "alive", detail: "3 pts in Group F; plays Japan today (Jun 25) — could pinch 2nd" },
  { team: "Iran", flag: "🇮🇷", state: "alive", detail: "2 pts in Group G; plays Egypt Jun 26 — winner likely advances" },
  { team: "New Zealand", flag: "🇳🇿", state: "alive", detail: "1 pt in Group G; needs a win vs Belgium Jun 26 to stay alive" },
  { team: "Cabo Verde", flag: "🇨🇻", state: "alive", detail: "Shock 2 pts; in a knockout spot as things stand; plays Jun 26" },
  { team: "Saudi Arabia", flag: "🇸🇦", state: "alive", detail: "1 pt in Group H; plays Cabo Verde Jun 26 — needs win and help" },
  { team: "Austria", flag: "🇦🇹", state: "alive", detail: "3 pts in Group J, needs a result vs Algeria Jun 27" },
  { team: "Algeria", flag: "🇩🇿", state: "alive", detail: "3 pts after comeback win; alive in Group J" },
  { team: "Ghana", flag: "🇬🇭", state: "alive", detail: "4 pts in Group L, in good shape for Jun 27" },
  { team: "Croatia", flag: "🇭🇷", state: "alive", detail: "3 pts; revived after beating Panama; plays Ghana Jun 27" },
  { team: "Uruguay", flag: "🇺🇾", state: "alive", detail: "2 pts; must get a result vs Spain Jun 26" },
  { team: "Belgium", flag: "🇧🇪", state: "alive", detail: "2 pts, winless; needs to beat New Zealand Jun 26" },
  { team: "DR Congo", flag: "🇨🇩", state: "alive", detail: "1 pt in Group K; plays Uzbekistan Jun 27 — needs a win" },
  { team: "Senegal", flag: "🇸🇳", state: "alive", detail: "0 pts but late goal keeps slim 3rd-place hope; plays Jun 26" },
  { team: "Ecuador", flag: "🇪🇨", state: "alive", detail: "1 pt in Group E; plays Germany today — needs a miracle to survive" },
  { team: "Curaçao", flag: "🇨🇼", state: "alive", detail: "1 pt in Group E; plays Ivory Coast today — long odds on advancing" },
  { team: "Iraq", flag: "🇮🇶", state: "alive", detail: "0 pts in Group I; plays Senegal Jun 26 — one of them could sneak through" },
  { team: "Scotland", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", state: "out", detail: "Eliminated — 3rd in Group C; 3 pts, GD −3" },
  { team: "Haiti", flag: "🇭🇹", state: "out", detail: "Eliminated — 4th in Group C (0 pts)" },
  { team: "Qatar", flag: "🇶🇦", state: "out", detail: "Eliminated — 4th in Group B (1 pt)" },
  { team: "Czechia", flag: "🇨🇿", state: "out", detail: "Eliminated — 4th in Group A (1 pt)" },
  { team: "Tunisia", flag: "🇹🇳", state: "out", detail: "Eliminated from Group F" },
  { team: "Türkiye", flag: "🇹🇷", state: "out", detail: "Eliminated from Group D" },
  { team: "Jordan", flag: "🇯🇴", state: "out", detail: "Eliminated from Group J (0 pts)" },
  { team: "Uzbekistan", flag: "🇺🇿", state: "out", detail: "Eliminated from Group K (0 pts)" },
  { team: "Panama", flag: "🇵🇦", state: "out", detail: "Eliminated — 0 pts in Group L; plays England Jun 27" },
];


const NOW_BRIEFING = {
  headline: "Groups D, E, and F play their decisive final matchday today.",
  body: "Yesterday wrapped up Groups A, B, and C. Mexico swept all three games. South Africa stunned South Korea to claim 2nd in Group A. Switzerland topped Group B; Brazil and Morocco both advanced from Group C with seven points. Today (June 25) Groups D, E, and F play simultaneously — the USA, Germany, and the Netherlands look set to advance, with second places and third-place wildcards still in the balance. Groups G through L follow over the next two days.",
  threads: [
    "Confirmed in the Round of 32: Mexico, South Africa, Switzerland, Canada, Brazil, Morocco, USA, Germany, France, Norway, Argentina.",
    "Surprise of MD3: South Africa 1-0 South Korea — Bafana Bafana pip the Koreans to 2nd in Group A in the final minutes.",
    "Group C: Brazil 3-0 Scotland and Morocco 4-2 Haiti — both nations through with 7 pts.",
    "USA's path: Round of 32 locked for Wed July 1, 8 PM ET at Levi's Stadium (Bay Area).",
    "History: Messi (18 WC goals) is the all-time leader. Mbappé and Haaland both in pursuit.",
  ],
};

const DAY_SUMMARIES = {
  "Thu Jun 25": "Groups D, E, and F play their simultaneous final matchday. Germany vs Ecuador and Curaçao vs Ivory Coast kick off at 4 PM ET; Japan vs Sweden and Tunisia vs Netherlands at 7 PM; USA vs Türkiye and Paraguay vs Australia at 10 PM.",
  "Wed Jun 24": "Groups A, B, and C wrapped. South Africa's 1-0 win over South Korea was the shock of the day, knocking the Koreans to 3rd. Mexico swept the group 3-0 over Czechia. Switzerland edged Canada 2-1 to top Group B; Bosnia beat Qatar 3-1. Brazil 3-0 Scotland, Morocco 4-2 Haiti — both advance from Group C.",
  "Tue Jun 23": "Matchday 2 wrapped for Groups K and L. Portugal exploded for 5-0; England held 0-0 by Ghana; Croatia revived with a narrow win.",
  "Mon Jun 22": "A day for the legends. Messi scored his 17th and 18th WC goals to pass Klose as all-time leading scorer. Mbappé brace, Haaland brace.",
  "Sun Jun 21": "Matchday 2 for Groups G and H. Spain routed Saudi Arabia 4-0; Cabo Verde drew again with Uruguay; Salah led Egypt to their first-ever WC regulation win.",
  "Sat Jun 20": "Matchday 2 for Groups E and F. Germany won it in the 94th minute; Dutch masterclass vs Sweden; Curaçao's Room made 15 saves; 1,000th WC match Japan 4-0 Tunisia.",
  "Fri Jun 19": "Matchday 2 for Groups C and D. USA 2-0 Australia clinches Group D; Brazil beats Haiti 3-0; Morocco 1-0 Scotland after 69 seconds.",
  "Thu Jun 18": "Matchday 2 for Groups A and B. Mexico clinch first — first nation through. Canada 6-0 Qatar sets up a Switzerland head-to-head.",
  "Wed Jun 17": "Matchday 1 closed. Ronaldo's record 6th WC appearance; England 4-2 Croatia; Colombia 3-1 Uzbekistan.",
  "Tue Jun 16": "Stars delivered. Messi hat-trick ties Klose (16 goals). Haaland brace on Norway's WC return. Mbappé brace for France.",
  "Mon Jun 15": "All four matches drew — the first all-draw day of these finals. Cabo Verde held Spain 0-0. Both Group G and H tied on 1 point each.",
  "Sun Jun 14": "Germany 7-1 Curaçao; Sweden 5-1 Tunisia; Netherlands vs Japan 2-2; Ivory Coast edge Ecuador.",
  "Sat Jun 13": "Brazil held 0-0 by Morocco — opening weekend's big surprise. Scotland edge Haiti 1-0.",
  "Fri Jun 12": "USA 4-1 Paraguay — Balogun brace, first US multi-goal WC game since 1930. Canada vs Bosnia 1-1.",
  "Thu Jun 11": "Opening day at the Estadio Azteca. Mexico 2-0 South Africa. South Korea 2-1 Czechia.",
};

const MATCH_DETAILS = {
  19: { watch: ["Lionel Messi (Argentina) — hat-trick vs Algeria, tying Klose's all-time World Cup record at 16 goals, on his 200th cap."], fun: ["Klose's record of 16 WC goals stood since 2014; Messi tying it at ~38 is remarkable longevity.", "Algeria's finest hour was beating West Germany in 1982 — so shocking it led FIFA to make final group games kick off simultaneously."] },
  35: { watch: ["Eloy Room (Curaçao) — 15 saves, the most in a 90-minute World Cup match since records began in 1966."], fun: ["Curaçao (population ~150,000) is the smallest nation by population ever to play at a World Cup.", "The match was played at Arrowhead Stadium in Kansas City."] },
  41: { watch: ["Lionel Messi (Argentina) — scores 17th & 18th WC goals, passes Klose as all-time leading scorer."], fun: ["Argentina are reigning champions (2022) and Messi, at ~38, is chasing an unprecedented second straight title.", "Argentina has won three World Cups (1978, 1986, 2022)."] },
  13: { watch: ["Vozinha (Cabo Verde) — eight saves to deny Spain; the goalkeeping performance of the tournament so far."], odds: ["Spain were among the heaviest favorites of the group stage (~ -650) and didn't win — the upset of the tournament."], fun: ["Cabo Verde, an Atlantic archipelago of ~525,000 people, qualified for its first-ever World Cup in 2026.", "Spain entered as reigning European champions and one of the title favorites."] },
  4:  { watch: ["Folarin Balogun (USA) — historic brace, first US World Cup multi-goal game since 1930."], fun: ["Balogun was born in New York, raised in London, and chose the USA over England in 2023.", "As co-hosts, the USA, Canada, and Mexico all qualified automatically."] },
  9:  { watch: ["Germany's attack — seven goals in one game is a statement of intent."], fun: ["Germany now owns three of the five WC matches this century in which a team scored 7+, including the infamous 7-1 over Brazil in 2014.", "Curaçao's goal was its first-ever World Cup goal."] },
  1:  { fun: ["The Estadio Azteca is the only stadium to host two World Cup finals (1970 and 1986).", "Mexico has hosted the World Cup three times (1970, 1986, 2026) — more than any other nation.", "This was the opening match of the first-ever 48-team World Cup."] },
};

const VENUES = {
  "Estadio Azteca, Mexico City": { city: "Mexico City", country: "MX", lat: 19.30, lng: -99.15 },
  "Estadio Akron, Zapopan": { city: "Guadalajara", country: "MX", lat: 20.68, lng: -103.46 },
  "Estadio BBVA, Monterrey": { city: "Monterrey", country: "MX", lat: 25.67, lng: -100.31 },
  "BMO Field, Toronto": { city: "Toronto", country: "CA", lat: 43.63, lng: -79.42 },
  "BC Place, Vancouver": { city: "Vancouver", country: "CA", lat: 49.28, lng: -123.11 },
  "SoFi Stadium, Inglewood": { city: "Los Angeles", country: "US", lat: 33.95, lng: -118.34 },
  "Levi's Stadium, Santa Clara": { city: "Bay Area", country: "US", lat: 37.40, lng: -121.97 },
  "Lumen Field, Seattle": { city: "Seattle", country: "US", lat: 47.59, lng: -122.33 },
  "Arrowhead Stadium, Kansas City": { city: "Kansas City", country: "US", lat: 39.05, lng: -94.48 },
  "NRG Stadium, Houston": { city: "Houston", country: "US", lat: 29.68, lng: -95.41 },
  "AT&T Stadium, Arlington": { city: "Dallas", country: "US", lat: 32.75, lng: -97.09 },
  "Mercedes-Benz Stadium, Atlanta": { city: "Atlanta", country: "US", lat: 33.76, lng: -84.40 },
  "Hard Rock Stadium, Miami Gardens": { city: "Miami", country: "US", lat: 25.96, lng: -80.24 },
  "Lincoln Financial Field, Philadelphia": { city: "Philadelphia", country: "US", lat: 39.90, lng: -75.17 },
  "Gillette Stadium, Foxborough": { city: "Boston", country: "US", lat: 42.09, lng: -71.26 },
  "MetLife Stadium, East Rutherford": { city: "New York / NJ", country: "US", lat: 40.81, lng: -74.07 },
};

const FLAG_COUNTRY = { US: "🇺🇸", CA: "🇨🇦", MX: "🇲🇽" };

const T = {
  pageBg: "#f4f6f9", cardBg: "#ffffff", cardBg2: "#f8fafc", inputBg: "#eef1f5",
  border: "#e2e8f0", borderMid: "#cbd5e1",
  text: "#0f172a", textMid: "#475569", textDim: "#94a3b8",
  red: "#DC1F2E", redBg: "#fff1f2", redBorder: "#fecdd3",
  blue: "#1D4ED8", blueBg: "#eff6ff", blueBorder: "#bfdbfe",
  green: "#15803d", greenBg: "#f0fdf4", greenBorder: "#bbf7d0",
  amber: "#b45309", amberBg: "#fffbeb", amberBorder: "#fde68a",
};

const fmtOdds = (n) => (n > 0 ? `+${n}` : `${n}`);

function sortGroup(rows) {
  return [...rows].sort((a, b) => b.Pts - a.Pts || b.GD - a.GD || b.GF - a.GF);
}

function splitDate(d) {
  const parts = d.split(" ");
  return { dow: parts[0], md: parts.slice(1).join(" ") };
}

function impliedPct(american) {
  const p = american > 0 ? 100 / (american + 100) : -american / (-american + 100);
  return Math.round(p * 100);
}

function Pill({ children, tone = "default" }) {
  const tones = {
    default: { bg: T.inputBg, fg: T.textMid, bd: T.border },
    live: { bg: T.redBg, fg: T.red, bd: T.redBorder },
    final: { bg: T.greenBg, fg: T.green, bd: T.greenBorder },
    upcoming: { bg: T.blueBg, fg: T.blue, bd: T.blueBorder },
    kc: { bg: T.amberBg, fg: T.amber, bd: T.amberBorder },
  };
  const t = tones[tone] || tones.default;
  return (
    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 8px", borderRadius: 999, background: t.bg, color: t.fg, border: `1px solid ${t.bd}`, whiteSpace: "nowrap" }}>{children}</span>
  );
}

function OddsBar({ pct }) {
  const [h, d, a] = pct;
  return (
    <div>
      <div style={{ display: "flex", height: 8, borderRadius: 4, overflow: "hidden", background: T.inputBg }}>
        <div style={{ width: `${h}%`, background: T.blue }} />
        <div style={{ width: `${d}%`, background: T.borderMid }} />
        <div style={{ width: `${a}%`, background: T.red }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 11, color: T.textDim }}>
        <span style={{ color: T.blue }}>{h}% home</span>
        <span>{d}% draw</span>
        <span style={{ color: T.red }}>{a}% away</span>
      </div>
    </div>
  );
}

function OddsCell({ label, val, accent }) {
  return (
    <div style={{ flex: 1, background: T.inputBg, borderRadius: 10, padding: "10px 8px", textAlign: "center", border: `1px solid ${T.border}` }}>
      <div style={{ fontSize: 10, color: T.textDim, marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 800, color: accent, fontVariantNumeric: "tabular-nums" }}>{val}</div>
    </div>
  );
}

function MatchDetail({ label, icon, items, accent }) {
  if (!items || !items.length) return null;
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
        <span style={{ fontSize: 12 }}>{icon}</span>
        <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: accent }}>{label}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {items.map((t, i) => (
          <div key={i} style={{ display: "flex", gap: 7, fontSize: 12.5, lineHeight: 1.5, color: T.textMid }}>
            <span style={{ color: accent, flexShrink: 0 }}>•</span>
            <span>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamRow({ name, flag, score, win }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0" }}>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <span style={{ fontSize: 22 }}>{flag}</span>
        <span style={{ fontSize: 16, fontWeight: win ? 700 : 500, color: win ? T.text : T.textMid }}>{name}</span>
      </div>
      {score !== null && score !== undefined && (
        <span style={{ fontSize: 22, fontWeight: 800, color: win ? T.red : T.textDim, fontVariantNumeric: "tabular-nums" }}>{score}</span>
      )}
    </div>
  );
}

function MatchCard({ m, expanded, onToggle, alwaysOpen = false }) {
  const scoreShown = m.status !== "upcoming";
  const open = alwaysOpen || expanded;
  return (
    <div
      onClick={alwaysOpen ? undefined : onToggle}
      style={{ background: T.cardBg, border: "1px solid", borderColor: open ? T.blue : T.border, borderRadius: 14, padding: "14px 16px", cursor: alwaysOpen ? "default" : "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Pill tone="default">Grp {m.group}</Pill>
          {m.status === "live" && <Pill tone="live">● Live</Pill>}
          {m.status === "final" && <Pill tone="final">Full time</Pill>}
          {m.status === "upcoming" && <Pill tone="upcoming">{m.date} · {m.time}</Pill>}
          {m.kc && <Pill tone="kc">Kansas City</Pill>}
        </div>
        {!alwaysOpen && <span style={{ fontSize: 11, color: T.textDim }}>{expanded ? "▲" : "▼"}</span>}
      </div>
      <TeamRow name={m.home} flag={FLAG[m.home]} score={scoreShown ? m.hs : null} win={scoreShown && m.hs > m.as} />
      <TeamRow name={m.away} flag={FLAG[m.away]} score={scoreShown ? m.as : null} win={scoreShown && m.as > m.hs} />
      <div style={{ marginTop: 10, fontSize: 11, color: T.textDim, display: "flex", gap: 6, alignItems: "center" }}>
        <span>📍</span><span>{m.venue}</span>
      </div>
      {open && (
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${T.border}` }}>
          {m.odds ? (
            <>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: T.textDim, marginBottom: 10 }}>
                {m.est ? "Pre-game odds · early estimate" : `Pre-game odds${m.status !== "upcoming" ? " · line at kickoff" : ""}`}
              </div>
              <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                <OddsCell label={m.home} val={fmtOdds(m.odds.home)} accent={T.blue} />
                <OddsCell label="Draw" val={fmtOdds(m.odds.draw)} accent={T.textMid} />
                <OddsCell label={m.away} val={fmtOdds(m.odds.away)} accent={T.red} />
              </div>
              <OddsBar pct={m.odds.pct} />
              {m.note && <div style={{ marginTop: 12, fontSize: 12.5, color: T.amber, lineHeight: 1.5 }}>⭐ {m.note}</div>}
            </>
          ) : (
            <div style={{ fontSize: 12.5, color: T.textDim, lineHeight: 1.5 }}>
              Matchday {m.md} · odds open closer to kickoff.
              {m.note && <div style={{ marginTop: 6, color: T.amber }}>⭐ {m.note}</div>}
            </div>
          )}
          {MATCH_DETAILS[m.id] && (
            <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${T.border}` }}>
              <MatchDetail label="Watch" icon="⭐" items={MATCH_DETAILS[m.id].watch} accent={T.blue} />
              <MatchDetail label="Odds & upset watch" icon="📊" items={MATCH_DETAILS[m.id].odds} accent={T.green} />
              <MatchDetail label="Stakes" icon="🎯" items={MATCH_DETAILS[m.id].stakes} accent={T.amber} />
              <MatchDetail label="Fun facts" icon="🎉" items={MATCH_DETAILS[m.id].fun} accent="#0284c7" />
              <MatchDetail label="Color" icon="🎭" items={MATCH_DETAILS[m.id].color} accent="#7c3aed" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function GroupTable({ letter, rows }) {
  const sorted = sortGroup(rows);
  return (
    <div style={{ background: T.cardBg, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
      <div style={{ padding: "12px 16px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", background: T.pageBg }}>
        <span style={{ fontSize: 14, fontWeight: 800, color: T.blue }}>Group {letter}</span>
        <span style={{ fontSize: 11, color: T.textDim }}>top 2 + best 3rds advance</span>
      </div>
      <div style={{ padding: "4px 8px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "20px 1fr 28px 28px 28px 36px 32px", gap: 4, padding: "6px 8px", fontSize: 10, color: T.textDim, fontWeight: 700, textTransform: "uppercase" }}>
          <span>#</span><span>Team</span><span style={{ textAlign: "center" }}>P</span>
          <span style={{ textAlign: "center" }}>W</span><span style={{ textAlign: "center" }}>D</span>
          <span style={{ textAlign: "center" }}>GD</span><span style={{ textAlign: "center" }}>Pts</span>
        </div>
        {sorted.map((r, i) => (
          <div key={r.team} style={{ display: "grid", gridTemplateColumns: "20px 1fr 28px 28px 28px 36px 32px", gap: 4, padding: "8px", alignItems: "center", borderRadius: 8, background: i < 2 ? T.greenBg : i === 2 ? T.blueBg : "transparent", borderLeft: i < 2 ? `2px solid ${T.green}` : i === 2 ? `2px solid ${T.blue}` : "2px solid transparent" }}>
            <span style={{ fontSize: 12, color: T.textDim, fontWeight: 700 }}>{i + 1}</span>
            <span style={{ display: "flex", gap: 7, alignItems: "center", fontSize: 13, fontWeight: 600, color: T.text }}>
              <span style={{ fontSize: 16 }}>{r.flag}</span>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.team}</span>
            </span>
            <span style={{ textAlign: "center", fontSize: 12, color: T.textMid }}>{r.P}</span>
            <span style={{ textAlign: "center", fontSize: 12, color: T.textMid }}>{r.W}</span>
            <span style={{ textAlign: "center", fontSize: 12, color: T.textMid }}>{r.D}</span>
            <span style={{ textAlign: "center", fontSize: 12, color: r.GD > 0 ? T.green : r.GD < 0 ? T.red : T.textMid }}>{r.GD > 0 ? `+${r.GD}` : r.GD}</span>
            <span style={{ textAlign: "center", fontSize: 14, fontWeight: 800, color: T.text }}>{r.Pts}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{ width: 3, height: 18, background: T.red, borderRadius: 2, flexShrink: 0 }} />
        <h2 style={{ margin: 0, fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: T.textMid }}>{title}</h2>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{children}</div>
    </div>
  );
}

function Empty({ children }) {
  return <div style={{ background: T.cardBg2, border: `1px dashed ${T.border}`, borderRadius: 12, padding: 18, fontSize: 13, color: T.textDim, textAlign: "center" }}>{children}</div>;
}

function RankingsView({ rankings, asOf }) {
  return (
    <div>
      <div style={{ fontSize: 12, color: T.textDim, marginBottom: 14 }}>{asOf}. Trend arrows compare to the prior FIFA update.</div>
      <div style={{ background: T.cardBg, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        {rankings.map((r, i) => {
          const diff = r.prev - r.rank;
          const dnq = r.note === "did not qualify";
          return (
            <div key={r.team} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderBottom: i < rankings.length - 1 ? `1px solid ${T.border}` : "none", opacity: dnq ? 0.45 : 1 }}>
              <span style={{ width: 26, fontSize: 15, fontWeight: 800, color: r.rank <= 3 ? T.red : T.textDim, fontVariantNumeric: "tabular-nums" }}>{r.rank}</span>
              <span style={{ fontSize: 22 }}>{r.flag}</span>
              <span style={{ flex: 1, fontSize: 15, fontWeight: 600, color: T.text }}>
                {r.team}
                {dnq && <span style={{ fontSize: 10, color: T.red, marginLeft: 8, textTransform: "uppercase" }}>DNQ</span>}
              </span>
              {!dnq && diff !== 0 && <span style={{ fontSize: 12, fontWeight: 700, color: diff > 0 ? T.green : T.red }}>{diff > 0 ? `▲ ${diff}` : `▼ ${Math.abs(diff)}`}</span>}
              {!dnq && diff === 0 && <span style={{ fontSize: 12, color: T.textDim }}>—</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TitleOddsView({ odds, note }) {
  const sorted = [...odds].sort((a, b) => impliedPct(b.now) - impliedPct(a.now));
  const maxPct = Math.max(...sorted.map((o) => impliedPct(o.now)));
  return (
    <div>
      <div style={{ fontSize: 12, color: T.textDim, marginBottom: 14 }}>{note}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {sorted.map((o) => {
          const nowP = impliedPct(o.now);
          const preP = impliedPct(o.pre);
          const moved = o.now < o.pre ? "shorter" : o.now > o.pre ? "longer" : "flat";
          const moveColor = moved === "shorter" ? T.green : moved === "longer" ? T.red : T.textDim;
          return (
            <div key={o.team} style={{ background: T.cardBg, border: `1px solid ${T.border}`, borderRadius: 12, padding: "12px 14px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 20 }}>{o.flag}</span>
                <span style={{ flex: 1, fontSize: 15, fontWeight: 700, color: T.text }}>{o.team}</span>
                <span style={{ fontSize: 16, fontWeight: 800, fontVariantNumeric: "tabular-nums", color: T.text }}>{o.now > 0 ? `+${o.now}` : o.now}</span>
              </div>
              <div style={{ display: "flex", height: 7, borderRadius: 4, overflow: "hidden", background: T.inputBg, marginBottom: 8 }}>
                <div style={{ width: `${(nowP / maxPct) * 100}%`, background: T.red }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: T.textDim }}>
                <span>Now: <strong style={{ color: T.text }}>{nowP}%</strong> implied</span>
                <span>Pre: {o.pre > 0 ? `+${o.pre}` : o.pre} ({preP}%)</span>
                <span style={{ color: moveColor, fontWeight: 700 }}>{moved === "shorter" ? "▲ shortened" : moved === "longer" ? "▼ drifted" : "— flat"}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function VenuesView({ venuesData, activeVenue, setActiveVenue, expanded, toggle }) {
  const LAT_MIN = 18, LAT_MAX = 50, LNG_MIN = -125, LNG_MAX = -78;
  const proj = (lat, lng) => ({ x: ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * 100, y: ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * 100 });
  return (
    <div>
      <div style={{ fontSize: 12, color: T.textDim, marginBottom: 14 }}>16 host stadiums across 3 countries. Tap a dot or city to see every match there.</div>
      <div style={{ position: "relative", width: "100%", paddingBottom: "62%", background: "#dde6f0", border: `1px solid ${T.border}`, borderRadius: 14, marginBottom: 12, overflow: "hidden" }}>
        {venuesData.map((v) => {
          if (!v.meta.lat) return null;
          const { x, y } = proj(v.meta.lat, v.meta.lng);
          const hasLive = v.games.some((g) => g.status === "live");
          const isActive = activeVenue === v.venue;
          const isKC = v.meta.city === "Kansas City";
          return (
            <button key={v.venue} onClick={() => setActiveVenue(isActive ? null : v.venue)} title={v.meta.city}
              style={{ position: "absolute", left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)", width: isActive ? 16 : 12, height: isActive ? 16 : 12, borderRadius: 999, background: hasLive ? T.red : isKC ? T.amber : T.blue, border: isActive ? `2px solid ${T.text}` : `2px solid ${T.cardBg}`, cursor: "pointer", padding: 0 }} />
          );
        })}
        <div style={{ position: "absolute", bottom: 8, left: 10, fontSize: 10, color: T.textMid, display: "flex", gap: 12, background: "rgba(255,255,255,0.7)", padding: "3px 8px", borderRadius: 6 }}>
          <span><span style={{ color: T.blue }}>●</span> host city</span>
          <span><span style={{ color: T.amber }}>●</span> Kansas City</span>
          <span><span style={{ color: T.red }}>●</span> live now</span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {venuesData.map((v) => {
          const isActive = activeVenue === v.venue;
          const played = v.games.filter((g) => g.status === "final").length;
          const live = v.games.some((g) => g.status === "live");
          return (
            <div key={v.venue} style={{ background: T.cardBg, border: "1px solid", borderColor: isActive ? T.blue : T.border, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
              <button onClick={() => setActiveVenue(isActive ? null : v.venue)} style={{ width: "100%", textAlign: "left", background: "transparent", border: "none", padding: "14px 16px", cursor: "pointer", color: "inherit", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                    <span style={{ fontSize: 16 }}>{FLAG_COUNTRY[v.meta.country]}</span>
                    <span style={{ fontSize: 16, fontWeight: 800, color: T.text }}>{v.meta.city}</span>
                    {live && <Pill tone="live">● Live</Pill>}
                  </div>
                  <div style={{ fontSize: 11.5, color: T.textDim }}>{v.venue.split(",")[0]}</div>
                </div>
                <div style={{ textAlign: "right", display: "flex", alignItems: "center", gap: 10 }}>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: T.text }}>{v.games.length}</div>
                    <div style={{ fontSize: 10, color: T.textDim }}>{played} done</div>
                  </div>
                  <span style={{ fontSize: 11, color: T.textDim }}>{isActive ? "▲" : "▼"}</span>
                </div>
              </button>
              {isActive && (
                <div style={{ borderTop: `1px solid ${T.border}`, padding: "8px 10px", display: "flex", flexDirection: "column", gap: 8, background: T.pageBg }}>
                  {v.games.map((g) => <MatchCard key={g.id} m={g} expanded={expanded === g.id} onToggle={() => toggle(g.id)} />)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function flagFor(name) {
  if (FLAG[name]) return FLAG[name];
  const alias = { Bosnia: "🇧🇦", "Bosnia/Qatar": "🇧🇦", "United States": "🇺🇸" };
  return alias[name] || "⚽";
}

function ForecastSlot({ slot }) {
  const [open, setOpen] = useState(false);
  if (slot.conf) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 8px", background: T.greenBg, borderLeft: `2px solid ${T.green}`, borderRadius: 5 }}>
        <span style={{ fontSize: 14 }}>{slot.flag}</span>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: T.green }}>{slot.team}</span>
        <span style={{ marginLeft: "auto", fontSize: 9, color: T.green }}>✓</span>
      </div>
    );
  }
  const cands = slot.cands || [];
  const top = cands[0];
  return (
    <div style={{ background: T.inputBg, borderLeft: `2px solid ${slot.us ? T.blue : T.border}`, borderRadius: 5, overflow: "hidden" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 6, padding: "6px 8px", background: "transparent", border: "none", cursor: "pointer", color: "inherit" }}>
        <span style={{ fontSize: 10.5, color: T.textMid, fontWeight: 600 }}>{slot.label}</span>
        {top && <span style={{ marginLeft: "auto", fontSize: 11, color: T.textMid }}>{flagFor(top.t)} {top.t} <span style={{ color: T.textDim }}>{top.pct}%</span></span>}
        <span style={{ fontSize: 8, color: T.textDim }}>{open ? "▲" : "▼"}</span>
      </button>
      {open && cands.length > 0 && (
        <div style={{ padding: "2px 8px 8px", display: "flex", flexDirection: "column", gap: 4 }}>
          {cands.map((c) => (
            <div key={c.t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 12 }}>{flagFor(c.t)}</span>
              <span style={{ fontSize: 11.5, color: T.textMid, flex: 1 }}>{c.t}</span>
              <div style={{ width: 50, height: 5, background: T.border, borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: `${c.pct}%`, height: "100%", background: T.blue }} />
              </div>
              <span style={{ fontSize: 10.5, color: T.textDim, width: 26, textAlign: "right" }}>{c.pct}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TreeMatch({ match }) {
  return (
    <div style={{ background: T.cardBg, border: `1px solid ${match.kc ? T.amberBorder : T.border}`, borderRadius: 9, padding: 7, display: "flex", flexDirection: "column", gap: 4, width: 210, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 8.5, color: T.textDim, padding: "0 2px 1px" }}>
        <span>M{match.m}</span>
        <span>{match.date} · {match.venue}{match.kc ? " ★" : ""}</span>
      </div>
      <ForecastSlot slot={match.a} />
      <ForecastSlot slot={match.b} />
    </div>
  );
}

function FutureMatch({ match, label }) {
  return (
    <div style={{ background: T.cardBg, border: `1px solid ${match.us ? T.blueBorder : match.kc ? T.amberBorder : T.border}`, borderRadius: 9, padding: 7, display: "flex", flexDirection: "column", gap: 4, width: 210, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 8.5, color: T.textDim, padding: "0 2px 1px" }}>
        <span>{label}</span>
        <span>{match.date} · {match.venue}{match.kc ? " ★" : ""}</span>
      </div>
      {match.from.map((f) => (
        <div key={f} style={{ padding: "6px 8px", background: T.inputBg, borderRadius: 5, fontSize: 10.5, color: T.textMid }}>Winner M{f}</div>
      ))}
    </div>
  );
}

function BracketColumn({ title, children }) {
  return (
    <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ fontSize: 10.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: T.textMid, textAlign: "center", marginBottom: 2 }}>{title}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{children}</div>
    </div>
  );
}

function BracketView() {
  const stateColors = {
    in: { bg: T.greenBg, fg: T.green, bd: T.greenBorder, label: "Confirmed" },
    likely: { bg: T.blueBg, fg: T.blue, bd: T.blueBorder, label: "Likely" },
    alive: { bg: T.amberBg, fg: T.amber, bd: T.amberBorder, label: "Still alive" },
    out: { bg: "#fef2f2", fg: T.red, bd: T.redBorder, label: "Eliminated" },
  };
  const grouped = ["in", "likely", "alive", "out"].map((st) => ({ st, teams: QUALIFICATION.filter((q) => q.state === st) }));
  return (
    <div>
      <div style={{ fontSize: 12, color: T.textDim, marginBottom: 14, lineHeight: 1.5 }}>
        Full bracket — scroll sideways to move through the rounds. Tap any open slot to see top candidates.
        <span style={{ color: T.green }}> ✓ green</span> = confirmed; ★ = Kansas City matches; blue = USA's path.
      </div>
      <div style={{ overflowX: "auto", paddingBottom: 12 }}>
        <div style={{ display: "flex", gap: 16, minWidth: "min-content", alignItems: "flex-start" }}>
          <BracketColumn title="Round of 32">{R32.map((m) => <TreeMatch key={m.m} match={m} />)}</BracketColumn>
          <BracketColumn title="Round of 16">{R16.map((m) => <FutureMatch key={m.m} match={m} label={`M${m.m}`} />)}</BracketColumn>
          <BracketColumn title="Quarterfinals">{QF.map((m) => <FutureMatch key={m.m} match={m} label={`QF M${m.m}`} />)}</BracketColumn>
          <BracketColumn title="Semifinals">{SF.map((m) => <FutureMatch key={m.m} match={m} label={`SF M${m.m}`} />)}</BracketColumn>
          <BracketColumn title="Final"><FutureMatch match={FINAL} label="🏆 FINAL" /></BracketColumn>
        </div>
      </div>
      <h3 style={{ fontSize: 14, fontWeight: 800, margin: "24px 0 12px", color: T.text }}>Qualification status</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {grouped.map(({ st, teams }) => {
          if (!teams.length) return null;
          const c = stateColors[st];
          return (
            <div key={st}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", color: c.fg }}>{c.label}</span>
                <span style={{ fontSize: 11, color: T.textDim }}>({teams.length})</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {teams.map((t) => (
                  <div key={t.team} style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 11px", background: c.bg, border: `1px solid ${c.bd}`, borderRadius: 8 }}>
                    <span style={{ fontSize: 17 }}>{t.flag}</span>
                    <span style={{ fontSize: 13.5, fontWeight: 700, minWidth: 96, color: T.text }}>{t.team}</span>
                    <span style={{ fontSize: 11.5, color: T.textMid, lineHeight: 1.4 }}>{t.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("now");
  const [expanded, setExpanded] = useState(null);
  const toggle = (id) => setExpanded(expanded === id ? null : id);

  const live = MATCHES.filter((m) => m.status === "live");
  const recent = MATCHES.filter((m) => m.status === "final").slice(-3).reverse();
  const next = MATCHES.filter((m) => m.status === "upcoming").slice(0, 3);
  const results = MATCHES.filter((m) => m.status === "final").reverse();

  const scheduleDays = useMemo(() => {
    const order = [];
    const map = {};
    MATCHES.forEach((m) => {
      if (!map[m.date]) { map[m.date] = []; order.push(m.date); }
      map[m.date].push(m);
    });
    return order.map((d) => ({ date: d, md: map[d][0].md, games: map[d] }));
  }, []);

  const defaultDayIdx = useMemo(() => {
    const liveIdx = scheduleDays.findIndex((d) => d.games.some((g) => g.status === "live"));
    if (liveIdx >= 0) return liveIdx;
    const lastFinal = scheduleDays.map((d) => d.games.some((g) => g.status === "final")).lastIndexOf(true);
    return lastFinal >= 0 ? lastFinal : 0;
  }, [scheduleDays]);

  const [dayIdx, setDayIdx] = useState(defaultDayIdx);
  const [activeVenue, setActiveVenue] = useState(null);

  const venuesData = useMemo(() => {
    const map = {};
    MATCHES.forEach((m) => {
      if (!map[m.venue]) map[m.venue] = [];
      map[m.venue].push(m);
    });
    const countryRank = { US: 0, CA: 1, MX: 2 };
    return Object.keys(map).map((v) => ({ venue: v, meta: VENUES[v] || { city: v, country: "US" }, games: map[v] }))
      .sort((a, b) => countryRank[a.meta.country] - countryRank[b.meta.country] || a.meta.city.localeCompare(b.meta.city));
  }, []);

  const tabs = [
    { id: "now", label: "Now & Next" },
    { id: "schedule", label: "Schedule & Odds" },
    { id: "bracket", label: "Bracket" },
    { id: "venues", label: "Venues & Map" },
    { id: "groups", label: "Group Tables" },
    { id: "rankings", label: "World Rankings" },
    { id: "title", label: "Odds to Win" },
    { id: "results", label: "Results" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: T.pageBg, color: T.text, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "20px 16px 60px" }}>
        <div style={{ marginBottom: 4, display: "flex", alignItems: "baseline", gap: 10 }}>
          <span style={{ fontSize: 28 }}>⚽</span>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 900, letterSpacing: "-0.02em", color: T.text }}>
            World Cup <span style={{ color: T.red }}>2026</span>
          </h1>
        </div>
        <div style={{ fontSize: 12, color: T.textDim, marginBottom: 18 }}>
          USA · Canada · Mexico —{" "}
          <span style={{ display: "inline-block", background: T.blueBg, color: T.blue, border: `1px solid ${T.blueBorder}`, borderRadius: 999, padding: "1px 8px", fontSize: 11, fontWeight: 600 }}>
            Data as of {DATA_AS_OF}
          </span>
        </div>

        <div style={{ display: "flex", gap: 6, marginBottom: 20, overflowX: "auto", paddingBottom: 4 }}>
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ flexShrink: 0, padding: "9px 14px", borderRadius: 999, border: "1px solid", borderColor: tab === t.id ? T.red : T.border, background: tab === t.id ? T.red : T.cardBg, color: tab === t.id ? "#ffffff" : T.textMid, fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", boxShadow: tab === t.id ? "0 2px 6px rgba(220,31,46,0.25)" : "0 1px 3px rgba(0,0,0,0.06)" }}>{t.label}</button>
          ))}
        </div>

        {tab === "now" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div style={{ background: T.cardBg, border: `1px solid ${T.border}`, borderRadius: 16, padding: "18px 16px", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", color: T.red, display: "block", marginBottom: 8 }}>State of play</span>
              <h2 style={{ margin: "0 0 10px", fontSize: 17, fontWeight: 800, lineHeight: 1.3, color: T.text }}>{NOW_BRIEFING.headline}</h2>
              <p style={{ margin: "0 0 16px", fontSize: 14, lineHeight: 1.6, color: T.textMid }}>{NOW_BRIEFING.body}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 14, borderTop: `1px solid ${T.border}` }}>
                {NOW_BRIEFING.threads.map((t, i) => {
                  const [head, ...rest] = t.split(": ");
                  return (
                    <div key={i} style={{ display: "flex", gap: 8, fontSize: 13, lineHeight: 1.5 }}>
                      <span style={{ color: T.red, flexShrink: 0, fontWeight: 700 }}>›</span>
                      <span style={{ color: T.textMid }}><strong style={{ color: T.text }}>{head}:</strong> {rest.join(": ")}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <Section title={live.length ? "Happening now" : "No live matches"}>
              {live.length ? live.map((m) => <MatchCard key={m.id} m={m} alwaysOpen />) : <Empty>No game is live right now. The next match is below.</Empty>}
            </Section>
            <Section title="Up next">
              {next.map((m) => <MatchCard key={m.id} m={m} alwaysOpen />)}
            </Section>
            <Section title="Just finished">
              {recent.map((m) => <MatchCard key={m.id} m={m} alwaysOpen />)}
            </Section>
          </div>
        )}

        {tab === "schedule" && (() => {
          const day = scheduleDays[dayIdx] || scheduleDays[0];
          const played = day.games.filter((g) => g.status !== "upcoming");
          return (
            <div>
              <div style={{ fontSize: 12, color: T.textDim, marginBottom: 12 }}>Tap a day to see its matches. Tap any match for odds + details.</div>
              <div style={{ display: "flex", gap: 6, marginBottom: 18, overflowX: "auto", paddingBottom: 6 }}>
                {scheduleDays.map((d, i) => {
                  const { dow, md } = splitDate(d.date);
                  const sel = i === dayIdx;
                  return (
                    <button key={d.date} onClick={() => setDayIdx(i)} style={{ flexShrink: 0, minWidth: 52, padding: "7px 10px", borderRadius: 12, border: "1px solid", borderColor: sel ? T.blue : T.border, background: sel ? T.blueBg : T.cardBg, cursor: "pointer", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                      <div style={{ fontSize: 9.5, fontWeight: 700, textTransform: "uppercase", color: sel ? T.blue : T.textDim }}>{dow}</div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: sel ? T.blue : T.text, whiteSpace: "nowrap" }}>{md.replace("Jun ", "").replace("Jul ", "")}</div>
                    </button>
                  );
                })}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: T.text }}>{day.date}</h3>
                <span style={{ fontSize: 10, color: T.textDim, textTransform: "uppercase" }}>MD{day.md} · {day.games.length} games</span>
              </div>
              {DAY_SUMMARIES[day.date] && (
                <div style={{ background: T.amberBg, border: `1px solid ${T.amberBorder}`, borderRadius: 12, padding: "13px 14px", marginBottom: 14 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", color: T.amber, display: "block", marginBottom: 6 }}>Day briefing</span>
                  <div style={{ fontSize: 13, lineHeight: 1.55, color: T.textMid }}>{DAY_SUMMARIES[day.date]}</div>
                  {played.length > 0 && (
                    <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${T.amberBorder}`, display: "flex", flexDirection: "column", gap: 6 }}>
                      {played.map((g) => (
                        <div key={g.id} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5 }}>
                          <span style={{ flexShrink: 0, width: 40, fontSize: 9.5, fontWeight: 700, textTransform: "uppercase", color: T.textDim }}>Final</span>
                          <span style={{ color: T.text, fontWeight: g.hs > g.as ? 700 : 500 }}>{FLAG[g.home]} {g.home}</span>
                          <span style={{ fontWeight: 800, color: T.text }}>{g.hs}–{g.as}</span>
                          <span style={{ color: T.text, fontWeight: g.as > g.hs ? 700 : 500 }}>{g.away} {FLAG[g.away]}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {day.games.map((m) => <MatchCard key={m.id} m={m} expanded={expanded === m.id} onToggle={() => toggle(m.id)} />)}
              </div>
            </div>
          );
        })()}

        {tab === "venues" && <VenuesView venuesData={venuesData} activeVenue={activeVenue} setActiveVenue={setActiveVenue} expanded={expanded} toggle={toggle} />}
        {tab === "groups" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))", gap: 14 }}>
            {Object.entries(GROUPS).map(([letter, rows]) => <GroupTable key={letter} letter={letter} rows={rows} />)}
          </div>
        )}
        {tab === "bracket" && <BracketView />}
        {tab === "rankings" && <RankingsView rankings={RANKINGS} asOf={RANKINGS_AS_OF} />}
        {tab === "title" && <TitleOddsView odds={TITLE_ODDS} note={TITLE_ODDS_NOTE} />}
        {tab === "results" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {results.map((m) => <MatchCard key={m.id} m={m} expanded={expanded === m.id} onToggle={() => toggle(m.id)} />)}
          </div>
        )}

        <div style={{ marginTop: 32, fontSize: 11, color: T.textDim, lineHeight: 1.6, textAlign: "center" }}>
          Odds are illustrative snapshots, not live sportsbook feeds. To refresh results, standings & odds, ask Claude to "update the World Cup tracker."
        </div>
      </div>
    </div>
  );
}
