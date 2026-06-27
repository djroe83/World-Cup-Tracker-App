import React, { useState, useMemo } from "react";

const DATA_AS_OF = "Sat, June 27, 2026 — Groups A–I all complete; J/K/L final matchday underway (5 PM, 7:30 PM, 10 PM ET)";

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
    { team: "USA", flag: "🇺🇸", P: 3, W: 2, D: 0, L: 1, GF: 8, GA: 4, GD: 4, Pts: 6 },
    { team: "Australia", flag: "🇦🇺", P: 3, W: 1, D: 1, L: 1, GF: 2, GA: 2, GD: 0, Pts: 4 },
    { team: "Paraguay", flag: "🇵🇾", P: 3, W: 1, D: 1, L: 1, GF: 2, GA: 4, GD: -2, Pts: 4 },
    { team: "Türkiye", flag: "🇹🇷", P: 3, W: 1, D: 0, L: 2, GF: 3, GA: 5, GD: -2, Pts: 3 },
  ],
  E: [
    { team: "Germany", flag: "🇩🇪", P: 3, W: 2, D: 0, L: 1, GF: 10, GA: 4, GD: 6, Pts: 6 },
    { team: "Ivory Coast", flag: "🇨🇮", P: 3, W: 2, D: 0, L: 1, GF: 4, GA: 2, GD: 2, Pts: 6 },
    { team: "Ecuador", flag: "🇪🇨", P: 3, W: 1, D: 1, L: 1, GF: 2, GA: 2, GD: 0, Pts: 4 },
    { team: "Curaçao", flag: "🇨🇼", P: 3, W: 0, D: 1, L: 2, GF: 1, GA: 9, GD: -8, Pts: 1 },
  ],
  F: [
    { team: "Netherlands", flag: "🇳🇱", P: 3, W: 2, D: 1, L: 0, GF: 10, GA: 4, GD: 6, Pts: 7 },
    { team: "Japan", flag: "🇯🇵", P: 3, W: 1, D: 2, L: 0, GF: 7, GA: 3, GD: 4, Pts: 5 },
    { team: "Sweden", flag: "🇸🇪", P: 3, W: 1, D: 1, L: 1, GF: 7, GA: 7, GD: 0, Pts: 4 },
    { team: "Tunisia", flag: "🇹🇳", P: 3, W: 0, D: 0, L: 3, GF: 2, GA: 12, GD: -10, Pts: 0 },
  ],
  G: [
    { team: "Belgium", flag: "🇧🇪", P: 3, W: 1, D: 2, L: 0, GF: 6, GA: 2, GD: 4, Pts: 5 },
    { team: "Egypt", flag: "🇪🇬", P: 3, W: 1, D: 2, L: 0, GF: 5, GA: 3, GD: 2, Pts: 5 },
    { team: "Iran", flag: "🇮🇷", P: 3, W: 0, D: 3, L: 0, GF: 3, GA: 3, GD: 0, Pts: 3 },
    { team: "New Zealand", flag: "🇳🇿", P: 3, W: 0, D: 1, L: 2, GF: 4, GA: 10, GD: -6, Pts: 1 },
  ],
  H: [
    { team: "Spain", flag: "🇪🇸", P: 3, W: 2, D: 1, L: 0, GF: 5, GA: 0, GD: 5, Pts: 7 },
    { team: "Cabo Verde", flag: "🇨🇻", P: 3, W: 0, D: 3, L: 0, GF: 2, GA: 2, GD: 0, Pts: 3 },
    { team: "Uruguay", flag: "🇺🇾", P: 3, W: 0, D: 2, L: 1, GF: 3, GA: 4, GD: -1, Pts: 2 },
    { team: "Saudi Arabia", flag: "🇸🇦", P: 3, W: 0, D: 2, L: 1, GF: 1, GA: 5, GD: -4, Pts: 2 },
  ],
  I: [
    { team: "France", flag: "🇫🇷", P: 3, W: 3, D: 0, L: 0, GF: 10, GA: 2, GD: 8, Pts: 9 },
    { team: "Norway", flag: "🇳🇴", P: 3, W: 2, D: 0, L: 1, GF: 8, GA: 7, GD: 1, Pts: 6 },
    { team: "Senegal", flag: "🇸🇳", P: 3, W: 1, D: 0, L: 2, GF: 8, GA: 6, GD: 2, Pts: 3 },
    { team: "Iraq", flag: "🇮🇶", P: 3, W: 0, D: 0, L: 3, GF: 1, GA: 12, GD: -11, Pts: 0 },
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
  { id: 55, group: "E", md: 3, date: "Thu Jun 25", time: "4:00 PM", venue: "Lincoln Financial Field, Philadelphia", status: "final", home: "Curaçao", away: "Ivory Coast", hs: 0, as: 2, odds: { home: 650, draw: 340, away: -260, pct: [12, 23, 65] }, note: "Pépé brace (7', 64') — Ivory Coast through as Group E runners-up" },
  { id: 56, group: "E", md: 3, date: "Thu Jun 25", time: "4:00 PM", venue: "MetLife Stadium, East Rutherford", status: "final", home: "Ecuador", away: "Germany", hs: 2, as: 1, odds: { home: 420, draw: 290, away: -170, pct: [18, 25, 57] }, note: "Angulo 7', Plata 77' (Ecu); Germany consolation — Ecuador shock the world and advance as best-3rd candidate (4 pts)" },
  { id: 57, group: "F", md: 3, date: "Thu Jun 25", time: "7:00 PM", venue: "AT&T Stadium, Arlington", status: "final", home: "Japan", away: "Sweden", hs: 1, as: 1, odds: { home: 135, draw: 230, away: 190, pct: [38, 28, 34] }, note: "Maeda 56' (Jpn), Elanga 62' (Swe) — both advance; Sweden through as best-3rd team (4 pts)" },
  { id: 58, group: "F", md: 3, date: "Thu Jun 25", time: "7:00 PM", venue: "Arrowhead Stadium, Kansas City", status: "final", home: "Tunisia", away: "Netherlands", hs: 1, as: 3, odds: { home: 650, draw: 350, away: -260, pct: [12, 22, 66] }, kc: true, note: "OG Skhiri 3', Brobbey 7', van Hecke 62' (Ned); Mastouri 54' (Tun) — Netherlands win Group F with 7 pts" },
  { id: 59, group: "D", md: 3, date: "Thu Jun 25", time: "10:00 PM", venue: "SoFi Stadium, Inglewood", status: "final", home: "Türkiye", away: "USA", hs: 3, as: 2, odds: { home: 320, draw: 260, away: -130, pct: [23, 27, 50] }, note: "Trusty 3' (USA); Arda Güler 10', Yılmaz 31' (Tur); S. Berhalter 49' (USA); Kaan Ayhan 90+8' (Tur) — dramatic stoppage-time winner; USA still advance as Group D champions" },
  { id: 60, group: "D", md: 3, date: "Thu Jun 25", time: "10:00 PM", venue: "Levi's Stadium, Santa Clara", status: "final", home: "Paraguay", away: "Australia", hs: 0, as: 0, odds: { home: 180, draw: 215, away: 150, pct: [33, 30, 37] }, note: "Cagey goalless draw — Australia advance 2nd in Group D; Paraguay finish 3rd (4 pts, GD −2) as best-3rd candidate" },
  { id: 61, group: "I", md: 3, date: "Fri Jun 26", time: "3:00 PM", venue: "Gillette Stadium, Foxborough", status: "final", home: "Norway", away: "France", hs: 1, as: 4, odds: { home: 240, draw: 290, away: -110, pct: [27, 25, 48] }, note: "Dembélé hat-trick 7', 20', 32' (second-fastest in WC history); Aasgaard 26' (Nor); Doué 90+' — France win Group I with 9 pts" },
  { id: 62, group: "I", md: 3, date: "Fri Jun 26", time: "3:00 PM", venue: "BMO Field, Toronto", status: "final", home: "Senegal", away: "Iraq", hs: 5, as: 0, odds: { home: -240, draw: 300, away: 650, pct: [65, 22, 13] }, note: "H. Diarra 4', I. Sarr 56', Pape Gueye 59' & 71', Ndiaye 82' — Senegal 5-0 rout keeps best-3rd hopes alive; Iraq finish 4th (0 pts)" },
  { id: 63, group: "H", md: 3, date: "Fri Jun 26", time: "8:00 PM", venue: "NRG Stadium, Houston", status: "final", home: "Cabo Verde", away: "Saudi Arabia", hs: 0, as: 0, odds: { home: 190, draw: 220, away: 150, pct: [34, 29, 37] }, note: "Goalless stalemate sends Cabo Verde through as Group H runners-up (3 pts, 3 draws) — historic feat for the 530k-population Atlantic islands" },
  { id: 64, group: "H", md: 3, date: "Fri Jun 26", time: "8:00 PM", venue: "Estadio Akron, Zapopan", status: "final", home: "Uruguay", away: "Spain", hs: 0, as: 1, odds: { home: 270, draw: 250, away: -115, pct: [25, 28, 47] }, note: "Álex Baena 42' (crossed into box, Muslera fumbled in) — Spain top Group H 7 pts; Uruguay eliminated (2 pts, GD −1)" },
  { id: 65, group: "G", md: 3, date: "Fri Jun 26", time: "11:00 PM", venue: "Lumen Field, Seattle", status: "final", home: "Egypt", away: "Iran", hs: 1, as: 1, odds: { home: 150, draw: 220, away: 180, pct: [37, 29, 34] }, note: "Saber 5' (deflected off Beiranvand); Rezaeian 14' (EGY) — Iran thought they won it (Khalilzadeh 90+3') but VAR overturned for offside. Egypt advance 2nd — first time ever past group stage in WC history" },
  { id: 66, group: "G", md: 3, date: "Fri Jun 26", time: "11:00 PM", venue: "BC Place, Vancouver", status: "final", home: "New Zealand", away: "Belgium", hs: 1, as: 5, odds: { home: 500, draw: 320, away: -200, pct: [15, 24, 61] }, note: "Trossard 28' & 50'; De Bruyne 66'; Just 84' (NZL); Lukaku 86'; Saelemaekers 90+' — Belgium overtake Egypt on GD to win Group G; De Bruyne scores in his international farewell" },
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
  // M74b: Paraguay confirmed — Sweden (F3rd) goes to M77, Bosnia (B3rd) goes to M81; Paraguay (D3rd, 4 pts) is next best from A/B/C/D/F pool
  { m: 74, date: "Jun 29", venue: "Boston", a: { team: "Germany", flag: "🇩🇪", conf: true }, b: { team: "Paraguay", flag: "🇵🇾", conf: true } },
  { m: 75, date: "Jun 30", venue: "Guadalajara", a: { team: "Netherlands", flag: "🇳🇱", conf: true }, b: { team: "Morocco", flag: "🇲🇦", conf: true } },
  { m: 76, date: "Jun 29", venue: "Houston", a: { team: "Brazil", flag: "🇧🇷", conf: true }, b: { team: "Japan", flag: "🇯🇵", conf: true } },
  // M77a: France won Group I (9 pts) — confirmed
  // M77b: Sweden confirmed — after Paraguay (D3rd) goes to M74, Sweden (F3rd, 4 pts GD 0) is best remaining from C/D/F/G/H pool
  { m: 77, date: "Jun 30", venue: "New York NJ", a: { team: "France", flag: "🇫🇷", conf: true }, b: { team: "Sweden", flag: "🇸🇪", conf: true } },
  // M78a: Ivory Coast confirmed 2nd in Group E
  // M78b: Norway finished 2nd in Group I — confirmed
  { m: 78, date: "Jun 30", venue: "Dallas", a: { team: "Ivory Coast", flag: "🇨🇮", conf: true }, b: { team: "Norway", flag: "🇳🇴", conf: true } },
  // M79b: Ecuador confirmed — after Sweden (F3rd) goes to M77, Ecuador (E3rd, 4 pts GD 0) is best remaining from C/E/F/H/I pool
  { m: 79, date: "Jul 1", venue: "Mexico City", a: { team: "Mexico", flag: "🇲🇽", conf: true }, b: { team: "Ecuador", flag: "🇪🇨", conf: true } },
  // M80a: Group L 1st — England (4 pts) slight favorite over Ghana (4 pts) heading into today's games
  // M80b: 3rd from E/H/I/J/K — Ecuador (E3rd) goes to M79; Senegal (I3rd, 3 pts GD+2) now leads; J3rd (Austria or Algeria, 3 pts) also in pool
  { m: 80, date: "Jul 1", venue: "Atlanta", a: { label: "Grp L 1st", cands: [{ t: "England", pct: 52 }, { t: "Ghana", pct: 38 }, { t: "Croatia", pct: 10 }] }, b: { label: "3rd E/H/I/J/K", cands: [{ t: "Senegal", pct: 48 }, { t: "Austria", pct: 28 }, { t: "Algeria", pct: 24 }] } },
  // M81b: Bosnia confirmed — B3rd (4 pts GD-1) fills this slot after Sweden (F3rd) goes to M77 and Ecuador (E3rd) goes to M79
  { m: 81, date: "Jul 1", venue: "Bay Area", us: true, a: { team: "USA", flag: "🇺🇸", conf: true }, b: { team: "Bosnia & Herzegovina", flag: "🇧🇦", conf: true } },
  // M82a: Belgium confirmed Group G winner (5 pts, GD+4, overtook Egypt on final day 5-1 vs NZ)
  // M82b: 3rd from A/E/H/I/J — Ecuador (E3rd) goes to M79, Senegal (I3rd) likely to M80; South Korea (A3rd, 3 pts GD-1) leads this pool; J3rd (Austria or Algeria) also in play
  { m: 82, date: "Jul 1", venue: "Seattle", a: { team: "Belgium", flag: "🇧🇪", conf: true }, b: { label: "3rd A/E/H/I/J", cands: [{ t: "South Korea", pct: 44 }, { t: "Austria", pct: 32 }, { t: "Algeria", pct: 24 }] } },
  // M83a: Grp K 2nd — Colombia confirmed 1st (6 pts), cannot be 2nd; Portugal (4 pts) is near-certain 2nd
  // M83b: England and Ghana both 4 pts — England at 15% for 2nd was wrong
  { m: 83, date: "Jul 2", venue: "Toronto", a: { label: "Grp K 2nd", cands: [{ t: "Portugal", pct: 88 }, { t: "DR Congo", pct: 12 }] }, b: { label: "Grp L 2nd", cands: [{ t: "Ghana", pct: 42 }, { t: "England", pct: 30 }, { t: "Croatia", pct: 28 }] } },
  // M84a: Spain confirmed Group H winner (7 pts)
  // M84b: Grp J 2nd — Argentina confirmed 1st (6 pts), cannot be 2nd; it's Austria vs Algeria only
  { m: 84, date: "Jul 2", venue: "Los Angeles", a: { team: "Spain", flag: "🇪🇸", conf: true }, b: { label: "Grp J 2nd", cands: [{ t: "Austria", pct: 52 }, { t: "Algeria", pct: 48 }] } },
  // M85b: 3rd from E/F/G/I/J — Sweden (F3rd)→M77, Ecuador (E3rd)→M79, Senegal (I3rd) likely→M80; Iran (G3rd, 3 pts GD 0) leads remaining pool; J3rd also in mix
  { m: 85, date: "Jul 2", venue: "Vancouver", a: { team: "Switzerland", flag: "🇨🇭", conf: true }, b: { label: "3rd E/F/G/I/J", cands: [{ t: "Iran", pct: 52 }, { t: "Austria", pct: 28 }, { t: "Algeria", pct: 20 }] } },
  // M86a: Argentina won Group J — confirmed, not probabilistic
  // M86b: Cabo Verde confirmed Group H runner-up (3 pts, 3 draws) — historic
  { m: 86, date: "Jul 2", venue: "Miami", a: { team: "Argentina", flag: "🇦🇷", conf: true }, b: { team: "Cabo Verde", flag: "🇨🇻", conf: true } },
  // M87a: Colombia won Group K (6 pts) — confirmed, not probabilistic
  // M87b: 3rd from D/E/I/J/L — Paraguay (D3rd)→M74, Ecuador (E3rd)→M79, Senegal (I3rd)→M80; J3rd or L3rd fills this slot (Croatia 3rd in L if they lose today? or J loser)
  { m: 87, date: "Jul 3", venue: "Kansas City", kc: true, a: { team: "Colombia", flag: "🇨🇴", conf: true }, b: { label: "3rd D/E/I/J/L", cands: [{ t: "Austria", pct: 40 }, { t: "Algeria", pct: 36 }, { t: "Croatia", pct: 24 }] } },
  // M88b: Egypt confirmed 2nd in Group G (5 pts, GD+2; Belgium won group on better GD +4)
  { m: 88, date: "Jul 3", venue: "Dallas", a: { team: "Australia", flag: "🇦🇺", conf: true }, b: { team: "Egypt", flag: "🇪🇬", conf: true } },
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
  { team: "USA", flag: "🇺🇸", state: "in", detail: "Won Group D (6 pts) — R32 Jul 1, Bay Area vs Bosnia & Herzegovina; lost 2-3 to Turkey on MD3 in a drama-filled final group game" },
  { team: "Germany", flag: "🇩🇪", state: "in", detail: "Won Group E (6 pts) despite shock 1-2 loss to Ecuador on MD3" },
  { team: "France", flag: "🇫🇷", state: "in", detail: "Won Group I (9 pts, GD +8) — Dembélé first-half hat-trick (7', 20', 32') in 4-1 win over Norway; R32 Jun 30, New York NJ" },
  { team: "Norway", flag: "🇳🇴", state: "in", detail: "2nd in Group I (6 pts) — lost 1-4 to France; Haaland scoreless in MD3; R32 Jun 30, Dallas vs Ivory Coast" },
  { team: "Argentina", flag: "🇦🇷", state: "in", detail: "Won Group J; Messi is now all-time WC top scorer (18)" },
  { team: "Spain", flag: "🇪🇸", state: "in", detail: "Won Group H (7 pts, GD +5) — Álex Baena 42' sealed 1-0 win over Uruguay; R32 Jul 2, Los Angeles vs Group J runner-up (Austria or Algeria)" },
  { team: "Netherlands", flag: "🇳🇱", state: "in", detail: "Won Group F (7 pts) — beat Tunisia 3-1 on MD3; R32 Jun 30, Guadalajara vs Morocco" },
  { team: "Japan", flag: "🇯🇵", state: "in", detail: "2nd in Group F (5 pts) — drew 1-1 with Sweden on MD3; R32 Jun 29, Houston vs Brazil" },
  { team: "Colombia", flag: "🇨🇴", state: "in", detail: "Won Group K — 6 pts, 3 wins; R32 Jul 3, Kansas City" },
  { team: "Portugal", flag: "🇵🇹", state: "in", detail: "Confirmed Group K (4 pts, GD +5); can't be overtaken by DR Congo" },
  { team: "Egypt", flag: "🇪🇬", state: "in", detail: "2nd in Group G (5 pts) — drew 1-1 with Iran (Saber 5'; VAR drama at end); R32 Jul 3, Dallas vs Australia. First time Egypt has EVER advanced past the World Cup group stage" },
  { team: "Belgium", flag: "🇧🇪", state: "in", detail: "Won Group G (5 pts, GD +4) — 5-1 rout of New Zealand (Trossard ×2, De Bruyne, Lukaku, Saelemaekers) overtook Egypt on final day; R32 Jul 1, Seattle vs 3rd-place team" },
  { team: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", state: "likely", detail: "Top of Group L (4 pts)" },
  { team: "Bosnia & Herzegovina", flag: "🇧🇦", state: "in", detail: "3rd in Group B (4 pts, GD −1) — confirmed best-3rd qualifier; R32 Jul 1 Bay Area vs USA" },
  { team: "South Korea", flag: "🇰🇷", state: "alive", detail: "3rd in Group A (3 pts, GD −1) — awaiting best-3rd comparison" },
  { team: "Australia", flag: "🇦🇺", state: "in", detail: "2nd in Group D (4 pts, GD 0) — drew 0-0 with Paraguay on MD3; advance to R32 Jul 3, Dallas" },
  { team: "Paraguay", flag: "🇵🇾", state: "in", detail: "3rd in Group D (4 pts, GD −2) — confirmed best-3rd qualifier; R32 Jun 29 Boston vs Germany" },
  { team: "Ivory Coast", flag: "🇨🇮", state: "in", detail: "2nd in Group E (6 pts) — Pépé brace vs Curaçao on MD3 sealed 2nd place" },
  { team: "Sweden", flag: "🇸🇪", state: "in", detail: "3rd in Group F (4 pts, GD 0) — confirmed best-3rd qualifier; R32 Jun 30 New York NJ vs France" },
  { team: "Iran", flag: "🇮🇷", state: "alive", detail: "3rd in Group G (3 pts, GD 0) — all three games drawn; thought they won vs Egypt (Khalilzadeh 90+3') but VAR ruled offside; alive as best-3rd candidate" },
  { team: "New Zealand", flag: "🇳🇿", state: "out", detail: "Eliminated — 4th in Group G (1 pt, GD −6); lost 1-5 to Belgium on final day (Elijah Just 84' was only consolation)" },
  { team: "Cabo Verde", flag: "🇨🇻", state: "in", detail: "2nd in Group H (3 pts, 3 draws) — drew vs Spain, Uruguay, Saudi Arabia; R32 Jul 2, Miami vs Argentina. First-ever World Cup, pop. 530k — one of the tournament's great stories" },
  { team: "Saudi Arabia", flag: "🇸🇦", state: "out", detail: "Eliminated — 4th in Group H (2 pts, GD −4); drew 0-0 with Cabo Verde on final day; beaten 4-0 by Spain. Exit despite 2-time WC winner ambitions under Mancini" },
  { team: "Austria", flag: "🇦🇹", state: "alive", detail: "3 pts in Group J, needs a result vs Algeria Jun 27" },
  { team: "Algeria", flag: "🇩🇿", state: "alive", detail: "3 pts after comeback win; alive in Group J" },
  { team: "Ghana", flag: "🇬🇭", state: "alive", detail: "4 pts in Group L, in good shape for Jun 27" },
  { team: "Croatia", flag: "🇭🇷", state: "alive", detail: "3 pts; revived after beating Panama; plays Ghana Jun 27" },
  { team: "Uruguay", flag: "🇺🇾", state: "out", detail: "Eliminated — 3rd in Group H (2 pts, GD −1); lost 0-1 to Spain (Álex Baena 42'); two-time WC champions exit in group stage" },
  { team: "DR Congo", flag: "🇨🇩", state: "alive", detail: "1 pt in Group K; plays Uzbekistan Jun 27 — needs a win" },
  { team: "Senegal", flag: "🇸🇳", state: "alive", detail: "3rd in Group I (3 pts, GD +2) — 5-0 rout of Iraq (Diarra, Sarr, Gueye×2, Ndiaye); alive as best-3rd candidate" },
  { team: "Ecuador", flag: "🇪🇨", state: "in", detail: "3rd in Group E (4 pts, GD 0) — confirmed best-3rd qualifier; R32 Jul 1 Mexico City vs Mexico" },
  { team: "Curaçao", flag: "🇨🇼", state: "out", detail: "Eliminated — 4th in Group E (1 pt, GD −8)" },
  { team: "Iraq", flag: "🇮🇶", state: "out", detail: "Eliminated — 4th in Group I (0 pts, GD −11); lost 0-5 to Senegal on final day" },
  { team: "Scotland", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", state: "out", detail: "Eliminated — 3rd in Group C; 3 pts, GD −3" },
  { team: "Haiti", flag: "🇭🇹", state: "out", detail: "Eliminated — 4th in Group C (0 pts)" },
  { team: "Qatar", flag: "🇶🇦", state: "out", detail: "Eliminated — 4th in Group B (1 pt)" },
  { team: "Czechia", flag: "🇨🇿", state: "out", detail: "Eliminated — 4th in Group A (1 pt)" },
  { team: "Tunisia", flag: "🇹🇳", state: "out", detail: "Eliminated — 4th in Group F (0 pts, GD −10)" },
  { team: "Türkiye", flag: "🇹🇷", state: "out", detail: "Eliminated from Group D — beat USA 3-2 (Kaan Ayhan 90+8') but finish 4th with 3 pts; too little, too late" },
  { team: "Jordan", flag: "🇯🇴", state: "out", detail: "Eliminated from Group J (0 pts)" },
  { team: "Uzbekistan", flag: "🇺🇿", state: "out", detail: "Eliminated from Group K (0 pts)" },
  { team: "Panama", flag: "🇵🇦", state: "out", detail: "Eliminated — 0 pts in Group L; plays England Jun 27" },
];


const GROUP_SCENARIOS = [
  {
    group: "J", date: "Sat Jun 27",
    teams: [
      { team: "Argentina", flag: "🇦🇷", fate: "in", note: "Confirmed group winners (6 pts, Messi record 18 WC goals)" },
      { team: "Austria", flag: "🇦🇹", fate: "controls", note: "Win vs Algeria → 6 pts, 2nd place secured" },
      { team: "Algeria", flag: "🇩🇿", fate: "controls", note: "Win vs Austria → 6 pts, 2nd place secured" },
      { team: "Jordan", flag: "🇯🇴", fate: "out", note: "Eliminated — 0 pts, cannot advance" },
    ],
  },
  {
    group: "K", date: "Sat Jun 27",
    teams: [
      { team: "Colombia", flag: "🇨🇴", fate: "in", note: "Confirmed group winners (6 pts)" },
      { team: "Portugal", flag: "🇵🇹", fate: "in", note: "Confirmed through — DR Congo cannot catch (4 pts guaranteed)" },
      { team: "DR Congo", flag: "🇨🇩", fate: "needs", note: "Win vs Uzbekistan + become best 3rd — long odds" },
      { team: "Uzbekistan", flag: "🇺🇿", fate: "out", note: "Eliminated — 0 pts" },
    ],
  },
  {
    group: "L", date: "Sat Jun 27",
    teams: [
      { team: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", fate: "controls", note: "Win vs Panama → top 2 confirmed (7 pts)" },
      { team: "Ghana", flag: "🇬🇭", fate: "controls", note: "Win vs Croatia → top 2 confirmed (7 pts)" },
      { team: "Croatia", flag: "🇭🇷", fate: "controls", note: "Win vs Ghana → 6 pts, through regardless of England result" },
      { team: "Panama", flag: "🇵🇦", fate: "out", note: "Eliminated — 0 pts" },
    ],
  },
];

const NOW_BRIEFING = {
  headline: "Groups A–I complete — Belgium stuns, Egypt makes history, Cabo Verde face Messi. Final group day: J/K/L today.",
  body: "The group stage drama peaked overnight: Belgium — who hadn't won in two games — exploded with a 5-1 win over New Zealand to overtake Egypt on goal difference and win Group G. De Bruyne scored in what is almost certainly his last international game. Even more emotional: Egypt advance to the knockout rounds of a World Cup for the FIRST TIME IN THEIR HISTORY — drawing 1-1 with Iran, with Iran's stoppage-time winner cruelly ruled out by VAR. Now the final matchday: all six games of Groups J, K, and L play today (Jun 27). England and Ghana have both already secured spots; the rest is wide open.",
  threads: [
    "Belgium 5-1 New Zealand (Trossard 28' & 50', De Bruyne 66', Lukaku 86', Saelemaekers 90+') — De Bruyne goes out on a high in his final international. Belgium win Group G on GD (+4 vs Egypt's +2). R32: Belgium vs best-3rd in Seattle, Jul 1.",
    "Egypt 1-1 Iran (Saber 5', Rezaeian 14') — Iran's Khalilzadeh scored in the 90+3' to win it, but VAR overturned the goal for offside. Ezatolahi then hit the crossbar in the final seconds. Egypt advance 2nd in Group G — their FIRST knockout stage appearance in World Cup history. R32: Egypt vs Australia, Jul 3 Dallas.",
    "Cabo Verde 0-0 Saudi Arabia & Spain 1-0 Uruguay (Baena 42') — Cabo Verde (pop. 530k) through on 3 draws, now face Argentina and Messi in Miami Jul 2. Spain top Group H 7 pts, 0 GA. Uruguay — 2× World Cup champions — exit in groups.",
    "Confirmed in the Round of 32 (22 of 32): Mexico, South Africa, Switzerland, Canada, Brazil, Morocco, USA, Germany, Ivory Coast, Netherlands, Japan, Sweden, France, Norway, Argentina, Colombia, Portugal, Australia, Spain, Cabo Verde, Belgium, Egypt.",
    "TODAY (Jun 27): Group L 5 PM ET — Panama vs England (MetLife), Croatia vs Ghana (Lincoln Financial); Group K 7:30 PM ET — Colombia vs Portugal (Miami), DR Congo vs Uzbekistan (Atlanta); Group J 10 PM ET — Algeria vs Austria (Arrowhead KC), Jordan vs Argentina (AT&T Arlington).",
  ],
};

const DAY_SUMMARIES = {
  "Fri Jun 26": "Group I: France 4-1 Norway (Dembélé hat-trick 7', 20', 32'; Aasgaard 26'; Doué 90+'). Senegal 5-0 Iraq. Group H: Spain 1-0 Uruguay (Baena 42'), Cabo Verde 0-0 Saudi Arabia — Spain top, Cabo Verde through on 3 draws. Group G (11 PM): Belgium 5-1 New Zealand (Trossard 28' & 50', De Bruyne 66', Lukaku 86', Saelemaekers 90+'), Egypt 1-1 Iran (Saber 5', Rezaeian 14'; Iran's Khalilzadeh goal overturned by VAR 90+3') — Belgium win group GD tiebreaker; Egypt advance to knockouts for first time in their history.",
  "Sat Jun 27": "Group L (5 PM ET): Panama vs England; Croatia vs Ghana. Group K (7:30 PM ET): Colombia vs Portugal; DR Congo vs Uzbekistan. Group J (10 PM ET): Algeria vs Austria; Jordan vs Argentina.",
  "Thu Jun 25": "Group E and F completed early; Group D late drama. Ecuador stunned Germany 2-1 (Angulo 7', Plata 77'); Ivory Coast beat Curaçao 2-0 (Pépé brace). Netherlands 3-1 Tunisia; Japan 1-1 Sweden — all three Group F teams advance. Late: Turkey 3-2 USA (Trusty 3'; Arda Güler 10', Yılmaz 31'; S. Berhalter 49'; Kaan Ayhan 90+8') — wild finish at SoFi; USA still group winners. Paraguay 0-0 Australia — Australia through 2nd.",
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
  // ── Past matches with notable context ──────────────────────────────────────
  1:  { fun: ["The Estadio Azteca is the only stadium to host two World Cup finals (1970 and 1986).", "Mexico has hosted the World Cup three times (1970, 1986, 2026) — more than any other nation.", "This was the opening match of the first-ever 48-team World Cup."] },
  4:  { watch: ["Folarin Balogun (USA) — historic brace, first US World Cup multi-goal game since 1930."], fun: ["Balogun was born in New York, raised in London, and chose the USA over England in 2023.", "As co-hosts, the USA, Canada, and Mexico all qualified automatically."] },
  9:  { watch: ["Germany's attack — seven goals in one game is a statement of intent."], fun: ["Germany now owns three of the five WC matches this century in which a team scored 7+, including the infamous 7-1 over Brazil in 2014.", "Curaçao's goal was its first-ever World Cup goal."] },
  13: { watch: ["Vozinha (Cabo Verde) — eight saves to deny Spain; the goalkeeping performance of the tournament so far."], odds: ["Spain were among the heaviest favorites of the group stage (~-650) and didn't win — the upset of the tournament so far."], fun: ["Cabo Verde, an Atlantic archipelago of ~530,000 people, qualified for its first-ever World Cup in 2026.", "Vozinha is 40 years old — one of the oldest goalkeepers ever to play at a World Cup. His mother's emotional US visa journey became the tournament's biggest human-interest story.", "Spain entered as reigning European champions (Euro 2024) and one of the title favorites."] },
  19: { watch: ["Lionel Messi (Argentina) — hat-trick vs Algeria, tying Klose's all-time World Cup record at 16 goals, on his 200th cap."], fun: ["Klose's record of 16 WC goals stood since 2014; Messi tying it at ~38 is remarkable longevity.", "Algeria's finest hour was beating West Germany in 1982 — so shocking it led FIFA to make final group games kick off simultaneously."] },
  35: { watch: ["Eloy Room (Curaçao) — 15 saves, the most in a 90-minute World Cup match since records began in 1966."], fun: ["Curaçao (population ~150,000) is the smallest nation by population ever to play at a World Cup.", "Room also made 9 saves to hold Switzerland in the Caribbean qualifiers. He is a genuine World Cup legend from a micro-nation."] },
  41: { watch: ["Lionel Messi (Argentina) — scores 17th & 18th WC goals, passes Klose as all-time leading scorer."], fun: ["Argentina are reigning champions (2022) and Messi, at ~38, is chasing an unprecedented second straight title.", "Argentina has won three World Cups (1978, 1986, 2022). Messi's 2022 title in Qatar was widely regarded as the greatest individual World Cup performance ever."] },

  // ── Group D MD3 result: Turkey 3-2 USA ──────────────────────────────────────
  59: {
    watch: [
      "Arda Güler (Turkey, Real Madrid) — 21-year-old phenom who delivered in the big moment. He scored Turkey's equalizer (10') with a curling finish after a swift counter, then was the creative force all game. Won the Champions League Revelation of the Season award in 2025-26.",
      "Kaan Ayhan (Turkey) — the unsung hero. His 90+8' header from a set piece completed the most dramatic comeback of the group stage. A moment that will be remembered for years.",
      "Sebastian Berhalter (USA) — son of head coach Gregg Berhalter, scored the 49th-minute equalizer from a set-piece — one of the most surreal subplot moments of this World Cup.",
      "Auston Trusty (USA, Sheffield United) — center-back who gave the USA a dream 3rd-minute lead with a headed goal. Trusty has become a reliable contributor on set pieces.",
    ],
    fun: [
      "Turkey's 3-2 win was their first-ever win over the USA at a World Cup — and Turkey's first win of this tournament after 0 pts in their first two games.",
      "Sebastian Berhalter became one of the few players in World Cup history to score with his own father on the touchline as head coach. Gregg Berhalter named him in the XI despite the personal optics — and he delivered.",
      "Kaan Ayhan's goal came in the 98th minute — one of the latest decisive goals in World Cup group stage history. The stadium (which seats 70,000) was predominantly USMNT fans; the silence after the final whistle was deafening.",
      "Hakan Şükür scored after just 10.8 seconds against South Korea in the 2002 World Cup third-place match — the fastest goal in World Cup history. Turkey's tradition of dramatic WC moments continues.",
      "Istanbul, Turkey's largest city (15+ million people), is the only major city in the world straddling two continents — the Bosphorus strait divides the European and Asian sides.",
      "SoFi Stadium (Inglewood, CA) cost $5.5 billion to build — the most expensive stadium ever constructed. It will host the 2028 Los Angeles Olympic opening ceremony.",
    ],
    color: [
      "The USA came into this game as comfortable favorites despite Turkey being eliminated. Resting key players and going 3-2 down in stoppage time is a story Berhalter will have to manage carefully heading into the knockout rounds.",
      "Turkey got the win they craved — but exit the tournament 4th in Group D with 3 pts. Arda Güler's display showed exactly why Real Madrid treasure him, even if the outcome means little in terms of their World Cup campaign.",
    ],
  },

  // ── Group D MD3 result: Paraguay 0-0 Australia ──────────────────────────────
  60: {
    watch: [
      "Julio Enciso (Paraguay, Brighton) — carried Paraguay's attack without the suspended Almirón but couldn't find a breakthrough. His 35-yard thunderbolt vs Man City in 2022-23 remains one of the Premier League's great goals — he couldn't replicate the magic here.",
      "Mat Ryan (Australia, Real Sociedad) — veteran goalkeeper was largely untested in a cautious game. Australia's most-capped 'keeper; his leadership kept the backline disciplined.",
      "Jackson Irvine (Australia, St. Pauli) — tireless captain set the tactical tone, helping Australia see out the goalless draw they needed to advance.",
    ],
    fun: [
      "Miguel Almirón's absence loomed large — he became the first player ever sent off under FIFA's new 'mouth-covering' rule (suspended for covering his mouth while speaking to a Turkish player in the previous game). The rule was introduced to stop hidden verbal abuse.",
      "Paraguay is one of only two landlocked countries in South America (the other is Bolivia). Both of their opponents in the group stage — USA and Australia — border the world's two largest oceans.",
      "Paraguay's official languages are Spanish and Guaraní — one of the few countries in the world where an indigenous language has equal official status. About half the population speaks Guaraní as their primary language.",
      "Australia becomes the first team in history to reach consecutive World Cup knockout rounds while co-hosting (as a non-host) — having reached the QF in Qatar 2022. Back-to-back knockouts for the first time ever.",
      "Jordan Bos had the best chance of the game in the 90th minute — his shot went narrowly wide. One touch differently and Paraguay would have been through instead of Australia.",
      "Both sides were managed by South Americans: Paraguay's Gustavo Alfaro (Argentine) and Australia's Tony Popovic (Melbourne-born of Croatian heritage). Two defensive tacticians produced the draw both needed.",
    ],
    color: [
      "The tactical setup was almost perfectly self-defeating: Australia wanted a draw, Paraguay needed a win but feared conceding. The result — 0 shots on target in 90 minutes — was the most predictable 'event' of the group stage.",
      "Australia now face a R32 game on July 3 in Dallas. Paraguay sit in the best-3rd race at 4 pts, GD −2 — weaker than Sweden, Ecuador and Bosnia but there are 12 groups, so 8 advance as best-3rds.",
    ],
  },

  // ── Group I MD3 result: Norway 1-4 France ───────────────────────────────────
  61: {
    watch: [
      "Ousmane Dembélé (France) — the reigning Ballon d'Or winner stole the show entirely. Three goals in 32 minutes — one of the great individual performances in modern World Cup history. Dembélé barely featured in headlines before today; after this he leads the Golden Boot race (4 goals).",
      "Thelo Aasgaard (Norway) — scored Norway's consolation at ~26' to briefly make it 2-1. The young midfielder is one of the tournament's breakout players.",
      "Désiré Doué (France) — a stunning header in stoppage time completed the 4-1 rout, adding a 4th French goal to cement their group dominance.",
      "Erling Haaland (Norway) — kept quiet by French defensive organisation. Went scoreless in a match where Norway needed him most. Still a 4-goal tournament but France's pressing neutered him.",
    ],
    fun: [
      "Dembélé's first-half hat-trick (7', 20', 32') was the second-fastest in World Cup history — the fastest was Sándor Kocsis for Hungary in 1954. The last first-half WC hat-trick before this was Oleg Salenko for Russia vs Cameroon in 1994.",
      "Dembélé is the reigning Ballon d'Or winner (2025). He had a famously troubled early career — injury after injury at Barcelona kept him from fulfilling his potential. This tournament, he appears to have found consistency at the highest level.",
      "France's 10 goals in 3 games (GD +8) is the best group-stage record in the 2026 tournament so far. A French win here put them firmly in the conversation as tournament favourites.",
      "Norway last played at a World Cup in 1998 — where they famously beat eventual winners Brazil 2-1 in the group stage. Their R32 next match is vs Ivory Coast in Dallas — a very winnable tie.",
      "Erling Haaland was born in Leeds, England in July 2000 — his father Alfie Haaland played for Manchester City at the time. He broke the Premier League single-season goals record (36 goals) in 2022-23.",
    ],
    color: [
      "This was the tournament's great set-piece matchup that didn't deliver the expected duel: Haaland-Mbappé was billed as the striker showdown of the group stage, but Dembélé — not Mbappé — stole the spotlight entirely. Mbappé assisted the first goal and was influential, but Dembélé was the man.",
      "Norway head to Dallas and a R32 against Ivory Coast on June 30 — a match they will be confident of winning. Haaland will want to respond with goals.",
    ],
  },

  // ── Group I MD3 result: Senegal 5-0 Iraq ────────────────────────────────────
  62: {
    watch: [
      "Habib Diarra (Senegal) — opened the scoring in the 4th minute from a goalbound header. A young midfielder who came through Strasbourg's academy and was recently sold to a top European club.",
      "Ismaïla Sarr (Senegal) — fired in the second goal (56') from Lamine Camara's cut-back. The electric Aston Villa winger was Senegal's best player on the day.",
      "Pape Gueye (Senegal) — supersub with two goals (59', 71') within 12 minutes of coming on. His brace turned a win into a statement.",
      "Iliman Ndiaye (Senegal) — capped a stunning second half with Senegal's fifth (82'), charging 20 yards and thumping in. France's Dembélé may be the name of the day, but Senegal's depth was the story.",
    ],
    fun: [
      "Senegal's 5-0 win gives them GD +2 on the tournament, putting them in credible contention for one of the 8 best-3rd spots. With Bosnia (4 pts), Sweden (4 pts), Ecuador (4 pts) and Paraguay (4 pts) taking the top four 3rd-place slots, Senegal at 3 pts need Group G/H/J/K/L 3rds to score fewer points than them.",
      "Senegal are the reigning Africa Cup of Nations champions — they won their first-ever AFCON title in Cameroon 2022 (played in January), beating Egypt on penalties in the final. Sadio Mané missed his penalty — and then scored the decisive one to win it.",
      "Iraq are appearing at only their second-ever World Cup. Their first was Mexico 1986 — where they lost all three group games. This 2026 appearance ends a 40-year wait, and they depart without a win.",
      "Iraq played 10-men for much of the game after an early red card, which contributed to the heavy scoreline.",
      "Dakar, Senegal's capital, is the westernmost capital city on the African mainland — geographically closer to South America than to many African capitals.",
    ],
    color: [
      "Senegal entered MD3 with 0 pts and 0 hope of topping the group — but a 5-goal swing gives them GD +2 and a legitimate best-3rd case. Their fate now depends on what the 3rd-place teams in other groups score over the coming days.",
      "This was the performance of a squad that knows how good it is. If Senegal advance, they go into the R32 as one of the most dangerous 3rd-place teams ever.",
    ],
  },

  // ── Group H MD3 result: Cabo Verde 0-0 Saudi Arabia ────────────────────────
  63: {
    watch: [
      "Vozinha (Cabo Verde, 40) — another clean sheet. Three goalless matches in a row (vs Spain, Uruguay by proxy, and now Saudi Arabia) from a 40-year-old goalkeeper who plays semi-pro football in Portugal. His mother Ana Cândida — who needed a viral GoFundMe to afford the US visa bond — was watching in Houston. One of sport's great human stories played out to its conclusion.",
      "Firas Al-Buraikan (Saudi Arabia) — Saudi Arabia's primary attacking threat was unable to find a way past Vozinha. A disappointing end to a campaign that promised more after their 2022 win over Argentina.",
    ],
    fun: [
      "Cabo Verde join the Round of 32 as Group H runners-up (3 pts, 3 draws). Their opponent: Argentina and Lionel Messi — the reigning world champions. July 2, Miami.",
      "Vozinha became the oldest outfield player or goalkeeper to keep three clean sheets at a World Cup in his nation's first-ever World Cup appearance — a feat that may never be replicated.",
      "Saudi Arabia's Vision 2030 plan includes hosting the 2034 World Cup. Their group-stage exit — despite Roberto Mancini, hundreds of millions in Pro League investment, and ambitions of global football relevance — is a significant setback.",
      "Cabo Verde's culture is built on saudade — the Portuguese-influenced concept of melancholy longing and resilience. Their qualification story, Vozinha's age, and his mother's visa journey embodied saudade's more joyful face: hardship ending in triumph.",
    ],
    color: [
      "Saudi Arabia needed Uruguay to lose AND to win themselves — Spain's victory in Guadalajara at exactly the same time meant Cabo Verde were through the moment Baena scored at 42'. The NRG Stadium game became almost academic after half time.",
      "This was Cabo Verde's third draw in a row at a World Cup — they came in as a nation of 530,000 people; they leave the group stage having never lost. Whatever happens next against Argentina, they have already written one of the great World Cup underdog chapters.",
    ],
  },

  // ── Group H MD3 result: Uruguay 0-1 Spain (Baena 42') ──────────────────────
  64: {
    watch: [
      "Álex Baena (Spain, Villarreal) — scored the only goal of the game in the 42nd minute, meeting a cross inside the area and firing a shot that Fernando Muslera fumbled into his own net. Baena had a quiet tournament to this point but delivered the decisive moment to send Spain through as group winners.",
      "Lamine Yamal (Spain, Barcelona) — another impressive shift from the 18-year-old. His creative play down the right continued to torture Uruguay's defence throughout.",
      "Fernando Muslera (Uruguay, Galatasaray) — the veteran goalkeeper's error on Baena's shot proved costly. At 38, this was almost certainly his last World Cup match.",
    ],
    fun: [
      "Spain finish Group H with 5 goals scored and 0 conceded — the only team in the 2026 World Cup to go through the group stage without conceding. Three wins including a 4-0 demolition of Saudi Arabia.",
      "Uruguay exit as two-time World Cup champions (1930, 1950) in the group stage. For a nation of 3.4 million with more cup-per-capita success than almost any other, this is a painful defeat.",
      "Marcelo Bielsa's Uruguay never found a way to break down Spain's structured defence. 'El Loco' built his reputation on relentless pressing and attacking football — this campaign ended without a win.",
      "Spain are unbeaten in their last 11 meetings with Uruguay. Their World Cup encounters: 2-2 in 1950, 0-0 in 1990, and now 1-0 in 2026.",
      "Darwin Núñez (Uruguay) went quiet throughout — Rodri and the Spanish midfield nullified his usual directness. Núñez had scored 4 goals in the first two group matches but was held scoreless in this decisive game.",
    ],
    color: [
      "This was Guadalajara's biggest game of the tournament — the Estadio Akron was split between pro-Uruguay Latin American fans and Spanish travelling support. Baena's goal silenced the noise.",
      "Spain are now in the Round of 32 (Jul 2, Los Angeles) against the winner of Algeria vs Austria from Group J. A tough but winnable tie for the defending European champions.",
    ],
  },

  // ── Group G MD3 result: Egypt 1-1 Iran (VAR drama) ──────────────────────────
  65: {
    watch: [
      "Saber (Egypt) — bundled in the opening goal after Beiranvand, Iran's goalkeeper, fumbled Mohamed Salah's powerful 5th-minute shot. A scrambled goal that set Egypt on the path to historic qualification.",
      "Ramin Rezaeian (Iran) — replied instantly, firing into the roof of the net at 14' to level. Iran's right-back was the unlikely match-leveller who gave his side a fighting chance all game.",
      "Shojae Khalilzadeh (Iran) — thought he had won it in the 90+3' with a header into the roof of the net — scenes of jubilation on the Iran bench. But VAR reviewed for over two minutes and ruled him marginally offside. The cruelest possible exit for Iran.",
      "Alireza Ezatolahi (Iran) — in the dying seconds, with the disallowed goal the last chance, rattled the crossbar from six yards. Iran fell agonisingly short of one of the greatest World Cup dramatic endings.",
    ],
    fun: [
      "Egypt advance to the knockout rounds of the World Cup for the FIRST TIME IN THEIR HISTORY. They appeared in 1934, 1990, and 2018 — never making it out of the group stage. For 107 million Egyptians, this is a historic milestone.",
      "Iran's VAR disallowed goal will be remembered as one of the most heartbreaking moments in their football history. The Iranian FA had already flagged issues with travel and visa logistics for the tournament — this VAR call added another layer of painful tournament trauma.",
      "Mehdi Taremi (Iran's captain) said before the tournament their US preparation had been 'a disaster' due to logistical disruptions. On the pitch, he battled hard throughout but couldn't find the winner Iran desperately needed.",
      "Lumen Field in Seattle had a raucous atmosphere for what turned out to be a dramatic and politically charged game between two historic nations.",
      "Egypt's history at the World Cup makes this particularly remarkable: they won the 1934 tournament's first round (against Hungary) before eventually being eliminated, and didn't return until 1990. Their knockout-stage debut in 2026 is a generational achievement.",
    ],
    color: [
      "Egypt go into the R32 (Jul 3, Dallas vs Australia) with momentum and a nation of 107 million behind them. Salah, still searching for a goal in this game, will want to deliver in the knockouts.",
      "Iran's exit — especially with the disallowed goal — will be controversial. They were arguably the better team in the second half. Their best-3rd hopes are alive (3 pts, GD 0) but they need results elsewhere to go their way.",
    ],
  },

  // ── Group G MD3 result: New Zealand 1-5 Belgium (De Bruyne farewell) ─────────
  66: {
    watch: [
      "Leandro Trossard (Belgium, Arsenal) — the unlikely hero of Belgium's tournament-saving performance. Two goals (28', 50') in BC Place — a brace that turned the tide and, combined with Egypt's draw, put Belgium ahead on goal difference. Trossard had been one of Belgium's quieter performers until this game.",
      "Kevin De Bruyne (Belgium, Man City) — scored in the 66th minute in what was almost certainly his last international appearance. The greatest midfielder of his generation, who announced before the tournament this World Cup would be his last. He walked off to a standing ovation from the Vancouver crowd.",
      "Romelu Lukaku (Belgium) — added the 4th goal (86') with typical penalty-box predatory instinct. Belgium's all-time leading scorer, who had been quiet in earlier matches, delivering when it truly mattered.",
      "Alexis Saelemaekers (Belgium) — completed the 5-1 rout in stoppage time, confirming Belgium's stunning goal difference turnaround.",
      "Elijah Just (New Zealand) — scored a late consolation in the 84th minute but the match was long since over. New Zealand's best moment was during the 2026 group stage overall — three competitive performances despite the final elimination.",
    ],
    fun: [
      "Belgium went into this game with 1 goal in 2 matches (their weakest output since 2002). They scored 5 — the biggest single-game turnaround of the 2026 group stage. They won Group G on goal difference (+4 vs Egypt's +2).",
      "Kevin De Bruyne's international career ends with a goal in his final game. He won 6 Premier League titles, 1 Champions League, and was a 2026 World Cup group-stage qualifier. His legacy as one of the best midfielders in football history is secure.",
      "Belgium were ranked #1 in the FIFA world rankings for a record 68 consecutive months (2018-2022) without winning a major trophy. This 'Golden Generation's' final WC was almost a group-stage disaster — rescued by 90 minutes of brilliance.",
      "New Zealand end their World Cup with 1 point — the same return as 2010 South Africa (3 draws, 0 wins). They leave with pride but without the victory that would have made this historic.",
      "BC Place in Vancouver is the host stadium of the 2026 World Cup final on July 19. The city of Vancouver will get to see the very best of the tournament — Belgium have now ensured they experienced it first with the best performance of the night.",
    ],
    color: [
      "The scenes at BC Place at full time — De Bruyne holding the ball, saluting the crowd, Belgium players embracing — were some of the most emotional of the tournament. A 'Golden Generation' goes out alive rather than in shame.",
      "Belgium face a 3rd-place team in the Round of 32 on July 1 in Seattle — in the very stadium where Egypt drew 1-1 with Iran hours before. The football symmetry is striking.",
    ],
  },

  // ── Saturday June 27: Group L (5 PM ET) ────────────────────────────────────
  67: {
    watch: [
      "Harry Kane (England, Bayern Munich) — the captain who scored in MD1 (a brace) and sits at 2 WC goals. England's all-time leading scorer with 70+ international goals. A World Cup title is the only major honour that has eluded him.",
      "Jude Bellingham (England, Real Madrid) — scored vs Croatia in MD1. One of the world's best all-round midfielders at just 22 — European champion with Real Madrid in 2024.",
    ],
    stakes: [
      "England can clinch 1st in Group L with any positive result. A loss, combined with Ghana winning, could see them knocked to 2nd.",
      "Panama (0 pts, already eliminated) play their last World Cup game. They are looking for their first-ever World Cup win.",
    ],
    fun: [
      "Panama qualified for the World Cup for the first time in 2018 (Russia) — their debut was a 6-1 loss to England. Harry Kane scored a hat-trick that day. This is a very different Panama, but it sets the historical context.",
      "England won their one and only World Cup in 1966 — at home at Wembley, beating West Germany 4-2 after extra time. Geoff Hurst's hat-trick is the most famous performance in English football history.",
      "The Panama Canal — one of the world's greatest engineering achievements — connects the Atlantic and Pacific Oceans through a 77 km waterway. Over 14,000 ships use it every year.",
      "'It's Coming Home' — Three Lions, the anthem of English football optimism written in 1996 by Baddiel, Skinner and the Lightning Seeds — is played before almost every England match. England fans have waited 60+ years for another World Cup.",
      "Panama has about 4.5 million people and qualified for this World Cup through CONCACAF. Their captain is Roman Torres, though the squad is now younger.",
    ],
    color: [
      "England have been erratic — impressive 4-2 vs Croatia, then a flat 0-0 vs Ghana. Manager Gareth Southgate's slow buildup style divides English fans who expect more from the talent available.",
    ],
  },

  // ── Saturday June 27: Group L (5 PM ET) ────────────────────────────────────
  68: {
    watch: [
      "Luka Modrić (Croatia) — still there at ~40 years old, the 2018 Ballon d'Or winner and Real Madrid legend. This is almost certainly his last World Cup match. His vision and passing range don't decline the way pace does.",
      "Jordan Ayew or Thomas Partey (Ghana) — Ghana's creative leaders, trying to hold off Croatia and reach a 3rd World Cup knockout round.",
    ],
    stakes: [
      "Ghana (4 pts) and Croatia (3 pts) are fighting for 1st or 2nd in Group L. A Croatia win likely sends them through over Ghana; a Ghana draw may be enough depending on the England-Panama score.",
      "This is almost certainly Modrić's final World Cup appearance — a legendary send-off for one of the greatest midfielders of all time.",
    ],
    fun: [
      "Croatia finished runners-up at the 2018 World Cup (lost 2-4 to France in the final) and 3rd in 2022 (beat Brazil on penalties in the QF). A remarkable record for a nation of just 4 million people.",
      "Luka Modrić won the 2018 Ballon d'Or — ending an 11-year monopoly by Messi and Ronaldo. He also won 6 UEFA Champions League titles with Real Madrid.",
      "Ghana are famous for their 2010 World Cup quarterfinal run — when Luis Suárez illegally handled the ball on the line in the 120th minute to deny Ghana a semifinal goal, and Asamoah Gyan missed the resulting penalty. Ghana lost on penalties. Suárez celebrated; Ghana was heartbroken. The football world has not forgotten.",
      "Croatia's national identity was reborn in 1991 when they declared independence from Yugoslavia. Football was central to the national narrative — Davor Šuker's team finishing 3rd at France 1998 is a founding myth of modern Croatian football.",
      "Ghana's 'Black Stars' nickname comes from the black star on the national flag — a Pan-African symbol of African unity adopted from Marcus Garvey's Black Star Line.",
    ],
    color: [
      "This could be Modrić's final World Cup game. He may be 40 but he still plays with intelligence, precision and leadership that younger players can't match. Croatia without Modrić's control is a different team entirely.",
    ],
  },

  // ── Saturday June 27: Group K (7:30 PM ET) ─────────────────────────────────
  69: {
    watch: [
      "Cristiano Ronaldo (Portugal) — making his record 6th World Cup appearance, at ~41. Still prolific at club level in Saudi Arabia. Portugal need goals; Ronaldo needs records. His goals tally for Portugal stands at 133+.",
      "Luis Díaz (Colombia, Liverpool) — explosive, unpredictable winger who regularly sets Champions League nights alight. Colombia's most threatening attacker and one of the tournament's most exciting players.",
      "Bruno Fernandes (Portugal, Man United) — Portugal's creative hub and set-piece specialist. His range of passing and ability to appear from deep make him extremely difficult to track.",
    ],
    stakes: [
      "Colombia are confirmed Group K winners (6 pts) and have nothing to lose — they may rotate. Their Round of 32 opponent (Jul 3, Kansas City) is now set.",
      "Portugal (4 pts, confirmed 2nd in Group K) are also already through. This is a dead rubber for standings — both teams may rotate heavily.",
    ],
    fun: [
      "Cristiano Ronaldo holds the record for most World Cup appearances (6), most international goals (133+), most international appearances (200+), and most international tournaments played. He is almost certainly playing in his final World Cup group stage game.",
      "Colombia's Luis Díaz was born in Barrancas, a small town in northern Colombia — his father Manucho was kidnapped in 2023 (later freed), in a story that drew global attention. Díaz played on during the crisis.",
      "Portugal's Estadio da Luz (Lisbon, 65,000 seats) hosted the 2004 Euro final where Greece famously beat hosts Portugal 1-0 — one of the biggest upsets in tournament history. Portugal have never won a World Cup.",
      "Colombia reached the 2014 World Cup quarterfinals, with James Rodríguez winning the Golden Boot — 6 goals in 5 games including a stunning volley vs Uruguay rated one of the best WC goals ever.",
      "Ronaldo's Al-Nassr teammate in Riyadh is none other than Sadio Mané. Saudi Pro League has become a retirement destination for world superstars, redefining football's financial geography.",
    ],
    color: [
      "This match has 'dead rubber' written all over it — but Ronaldo doesn't understand that concept. Even in meaningless games, he plays with intensity. Expect him to chase personal milestones.",
    ],
  },

  // ── Saturday June 27: Group K (7:30 PM ET) ─────────────────────────────────
  70: {
    watch: [
      "Cédric Bakambu (DR Congo) — the striker who scored their only goal in the group stage. DR Congo need him to deliver a performance that might make them the most competitive best-3rd team.",
    ],
    stakes: [
      "DR Congo (1 pt) need a win to have any realistic chance of advancing as a best-3rd team. Even then, they'd need a favorable combination of other results.",
      "Uzbekistan (0 pts) are already eliminated. Their first World Cup appearance ends here.",
    ],
    fun: [
      "Uzbekistan are appearing in their first-ever World Cup. They qualified through the AFC (Asian Football Confederation) after a strong qualification campaign. A historic debut regardless of results.",
      "DR Congo (formerly Zaire) were the first sub-Saharan African nation to qualify for the World Cup — at West Germany 1974. That team's match vs Brazil is remembered partly because a Zaire player ran up and kicked the ball away during a free kick.",
      "Kinshasa (DR Congo's capital) is one of Africa's most populous cities — over 17 million people in Greater Kinshasa, one of the fastest-growing urban areas on Earth.",
      "Uzbekistan's capital, Tashkent, is one of the largest cities in Central Asia and was a key stop on the ancient Silk Road trading route between China, Persia, and Europe.",
    ],
    color: [
      "A largely dead rubber on the surface, but for Uzbekistan — playing their first-ever World Cup match — every 90 minutes is history being written.",
    ],
  },

  // ── Saturday June 27: Group J (10 PM ET) ───────────────────────────────────
  71: {
    watch: [
      "Riyad Mahrez (Algeria, Al-Ahli) — the experienced winger and former PL champion (with Man City) brings silk and guile to Algeria's attack. At 35, this is almost certainly his last World Cup.",
      "Marcel Sabitzer or Christoph Baumgartner (Austria) — Austria's most creative players will need to deliver to avoid the most heartbreaking group-stage exit.",
    ],
    stakes: [
      "Algeria (3 pts) and Austria (3 pts) meet in a winner-takes-all knockout decider. The winner advances 2nd in Group J; the loser is eliminated. Jordan are already out.",
      "Argentina are already confirmed 1st with 6 pts and will likely rotate heavily.",
    ],
    fun: [
      "Algeria's most famous football moment: beating West Germany in the 1982 World Cup group stage (2-1) — only the second time a European team had been beaten by an African side at the World Cup. FIFA changed the rules to make final group games simultaneous after West Germany and Austria played an infamous 'friendly' result to both qualify over Algeria.",
      "Austria finished 2nd at the 1954 World Cup — their best-ever finish. Coach Ernst Ocwirk's 'Wunderteam' was one of the most celebrated sides of that era.",
      "Algeria won the Africa Cup of Nations in 1990 and 2019. Their 2019 triumph — going unbeaten through the entire tournament — was led by Riyad Mahrez.",
      "The Austria-Algeria rivalry in World Cups: 1982's 'Disgrace of Gijón' — where West Germany and Austria played out a 1-0 result that suited both teams to advance over Algeria — is one of the most controversial moments in World Cup history. It led to FIFA's rule that all final group games must be simultaneous.",
    ],
    color: [
      "Winner-take-all for 2nd place in Group J. One team's tournament ends in tears; the other goes to the Round of 32. Maximum pressure, maximum drama.",
    ],
  },

  // ── Saturday June 27: Group J (10 PM ET) ───────────────────────────────────
  72: {
    watch: [
      "Lionel Messi (Argentina) — 18 World Cup goals, all-time record. Playing in what may be his final World Cup group stage match. Will he push the record higher, or save energy for the knockouts? Even a cameo from the bench is a gift to watch.",
    ],
    stakes: [
      "Argentina are confirmed 1st and will rest key players. Jordan (0 pts) are already eliminated.",
      "The match is in Arlington, Texas — home of AT&T Stadium (Jerry World), one of the USA's most spectacular venues.",
    ],
    fun: [
      "Jordan are appearing in their first-ever World Cup. A remarkable achievement for a nation of ~10 million with limited football infrastructure. Despite losing all three games, the qualification itself is historic.",
      "Messi's 18 World Cup goals have come across 4 tournaments (2006-2026). He scored just 1 goal in his first two World Cups combined — then 10 in 2022 alone. Age has only made him more decisive.",
      "Argentina's anthem, 'Aurora,' has no official lyrics — the official version is purely instrumental. Yet fans sing their own words at every match, creating one of world football's most emotional pre-match atmospheres.",
      "Jordan shares a border with Israel, Syria, Iraq, Saudi Arabia, and Egypt — a geopolitically loaded neighbourhood. Football qualification unified the country in a rare moment of pure national joy.",
    ],
    color: [
      "A World Cup curtain-raiser for Argentina's knockout run — expect Scaloni to use this to rest Messi, De Paul, and Álvarez while testing fringe players. Argentina already have their eyes on the prize.",
    ],
  },
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

function VenueMap({ venuesData, activeVenue, setActiveVenue }) {
  const LAT_MIN = 18, LAT_MAX = 50, LNG_MIN = -125, LNG_MAX = -65;
  const VW = 600, VH = 320;
  const px = (lat, lng) => [
    Math.round(((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * VW),
    Math.round(((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * VH),
  ];
  const poly = (...coords) => coords.map(([la, ln]) => px(la, ln).join(",")).join(" ");

  // Simplified country outlines (approximate coastlines + borders)
  const US = poly(
    [49,-124.7],[49,-95],[48,-88],[46,-84],[43,-79],[45,-75.5],[47.5,-67.5],
    [44.5,-67],[42,-70],[40.5,-74],[38.9,-75.2],[37,-76],[35.2,-75.5],[33.8,-78],[31.5,-81],
    [28.5,-80.5],[25.8,-80.1],[24.5,-81.8],[27.9,-82.4],
    [30,-87],[29.9,-89.7],[29.7,-93.8],[29,-95],[26,-97.2],
    [27.8,-99.7],[29.7,-104.7],[31.7,-106.5],[31.3,-111],[32.5,-117.2],
    [34.4,-120.5],[37.8,-122.5],[42,-124.2],[46.2,-124],[48.5,-124.7],
  );
  const MX = poly(
    [32.5,-117.2],[31.3,-111],[31.7,-106.5],[29.7,-104.7],[27.8,-99.7],[25.9,-97.3],
    [22.3,-97.9],[19.2,-96.1],[18,-95],[18,-104],
    [20.6,-105.2],[22.9,-109.9],[27,-114],[30,-115.5],
  );
  const CA = poly(
    [50,-125],[50,-65],[48,-67],[47.5,-67.5],
    [45,-75.5],[43,-79],[46,-84],[48,-88],[49,-95],[49,-124.7],
  );
  const US_MX_BORDER = poly([32.5,-117.2],[31.3,-111],[31.7,-106.5],[29.7,-104.7],[27.8,-99.7],[25.9,-97.3]);
  const US_CA_BORDER = poly([49,-124.7],[49,-95],[48,-88],[46,-84],[43,-79],[45,-75.5],[47.5,-67.5]);

  return (
    <div style={{ marginBottom: 12, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden", position: "relative" }}>
      <svg viewBox={`0 0 ${VW} ${VH}`} style={{ width: "100%", display: "block" }} aria-hidden="true">
        {/* Ocean */}
        <rect width={VW} height={VH} fill="#b8d4e8" />
        {/* Canada (southern strip) */}
        <polygon points={CA} fill="#d0dfc8" />
        {/* USA */}
        <polygon points={US} fill="#e8e2d4" />
        {/* Mexico */}
        <polygon points={MX} fill="#e0d8c8" />
        {/* Gulf of Mexico tint */}
        <ellipse cx="360" cy="268" rx="82" ry="38" fill="#b8d4e8" opacity="0.7" />
        {/* Great Lakes */}
        <ellipse cx="415" cy="43" rx="26" ry="13" fill="#b8d4e8" />
        <ellipse cx="456" cy="64" rx="13" ry="9" fill="#b8d4e8" />
        <ellipse cx="432" cy="77" rx="13" ry="6" fill="#b8d4e8" />
        <ellipse cx="478" cy="57" rx="10" ry="6" fill="#b8d4e8" />
        {/* Country borders */}
        <polyline points={US_CA_BORDER} fill="none" stroke="#aaa" strokeWidth="0.8" />
        <polyline points={US_MX_BORDER} fill="none" stroke="#aaa" strokeWidth="0.8" />
        {/* Venue dots */}
        {venuesData.map((v) => {
          if (!v.meta.lat || !v.meta.lng) return null;
          const [cx, cy] = px(v.meta.lat, v.meta.lng);
          const isKC = v.meta.city === "Kansas City";
          const hasLive = v.games.some((g) => g.status === "live");
          const isActive = activeVenue === v.venue;
          return (
            <g key={v.venue} style={{ cursor: "pointer" }} onClick={() => setActiveVenue(isActive ? null : v.venue)}>
              {isActive && <circle cx={cx} cy={cy} r={13} fill={T.blue} opacity={0.2} />}
              <circle cx={cx} cy={cy} r={isActive ? 9 : 7} fill={hasLive ? T.red : isKC ? T.amber : T.blue} stroke="#fff" strokeWidth={2} />
              <title>{v.meta.city}</title>
            </g>
          );
        })}
      </svg>
      <div style={{ position: "absolute", bottom: 8, left: 10, fontSize: 10, color: T.textMid, display: "flex", gap: 12, background: "rgba(255,255,255,0.85)", padding: "3px 8px", borderRadius: 6 }}>
        <span><span style={{ color: T.blue }}>●</span> host city</span>
        <span><span style={{ color: T.amber }}>●</span> Kansas City</span>
        <span><span style={{ color: T.red }}>●</span> live now</span>
      </div>
    </div>
  );
}

function VenuesView({ venuesData, activeVenue, setActiveVenue, expanded, toggle }) {
  return (
    <div>
      <div style={{ fontSize: 12, color: T.textDim, marginBottom: 14 }}>16 host stadiums across 3 countries. Tap a dot or city to see every match there.</div>
      <VenueMap venuesData={venuesData} activeVenue={activeVenue} setActiveVenue={setActiveVenue} />
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

function GroupScenarioCard({ scenario }) {
  const [open, setOpen] = useState(false);
  const fateConfig = {
    in:       { icon: "✓", label: "Through",       bg: T.greenBg, fg: T.green, bd: T.greenBorder },
    controls: { icon: "◈", label: "Controls fate", bg: T.blueBg,  fg: T.blue,  bd: T.blueBorder },
    needs:    { icon: "~", label: "Needs help",    bg: T.amberBg, fg: T.amber, bd: T.amberBorder },
    out:      { icon: "✗", label: "Eliminated",    bg: "#f8fafc", fg: T.textDim, bd: T.border },
  };
  const summary = scenario.teams.map((t) => fateConfig[t.fate].icon).join(" ");
  return (
    <div style={{ background: T.cardBg, border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", textAlign: "left", background: "transparent", border: "none", padding: "11px 14px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 800, color: T.red }}>Group {scenario.group}</span>
          <span style={{ fontSize: 11, color: T.textDim }}>{scenario.date}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, letterSpacing: "0.12em", color: T.textMid }}>{summary}</span>
          <span style={{ fontSize: 12, color: T.textDim }}>{open ? "▲" : "▼"}</span>
        </div>
      </button>
      {open && (
        <div style={{ borderTop: `1px solid ${T.border}` }}>
          {scenario.teams.map((t, i) => {
            const c = fateConfig[t.fate];
            return (
              <div key={t.team} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", background: c.bg, borderTop: i > 0 ? `1px solid ${T.border}` : "none" }}>
                <span style={{ fontSize: 16 }}>{t.flag}</span>
                <span style={{ fontSize: 13, fontWeight: 700, minWidth: 98, color: T.text }}>{t.team}</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: c.fg, minWidth: 16 }}>{c.icon}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: c.fg, minWidth: 82 }}>{c.label}</span>
                <span style={{ fontSize: 11.5, color: T.textMid, lineHeight: 1.4, flex: 1 }}>{t.note}</span>
              </div>
            );
          })}
        </div>
      )}
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
      <h3 style={{ fontSize: 14, fontWeight: 800, margin: "24px 0 6px", color: T.text }}>Group run-in scenarios</h3>
      <div style={{ fontSize: 12, color: T.textDim, marginBottom: 12, display: "flex", gap: 14, flexWrap: "wrap" }}>
        <span><strong style={{ color: T.green }}>✓</strong> Through</span>
        <span><strong style={{ color: T.blue }}>◈</strong> Controls own fate (win = through)</span>
        <span><strong style={{ color: T.amber }}>~</strong> Needs help</span>
        <span><strong style={{ color: T.textDim }}>✗</strong> Eliminated</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
        {GROUP_SCENARIOS.map((s) => <GroupScenarioCard key={s.group} scenario={s} />)}
      </div>
      <h3 style={{ fontSize: 14, fontWeight: 800, margin: "0 0 12px", color: T.text }}>Qualification status</h3>
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
        {tab === "rankings" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <RankingsView rankings={RANKINGS} asOf={RANKINGS_AS_OF} />
            <div>
              <h3 style={{ fontSize: 14, fontWeight: 800, margin: "0 0 12px", color: T.text }}>Odds to Win the World Cup</h3>
              <TitleOddsView odds={TITLE_ODDS} note={TITLE_ODDS_NOTE} />
            </div>
          </div>
        )}
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
