var damage = {
  // Size Light Medium Heavy Incapacitating Dead
  –4: [1, 2 ,3, 4, 5+]
  –3: [1–2, 3–4 ,5–6, 7–8, 9+]
  –2: [1–3, 4–6 ,7–9, 10–12, 13+]
  –1: [1–5, 6–10, 11–15, 16–20, 21+]
  0 : [1–6, 7–12, 13–18, 19–24, 25+]
  +1: [1–7, 8–14, 15–21, 22–28, 29+]
  +2: [1–7, 8–14, 15–21, 22–28, 29+]
  +3: [1–8, 9–16, 17–24, 25–32, 33+]
  // Each further +1 size adds +1 to each wound range. For every 5 + size points by
// which the Damage Total exceeds the Soak Total, the wound level increases by one.
}

var armor = {
  Material: Prot Load Prot Load Cost,
  'Quilted': 1 2 n/a n/a Inexp.,
  'Fur': 1 2 n/a n/a Inexp.,
  'Heavy Leather': 2 3 n/a n/a Inexp.,
  'Metal Reinf Leather': 2 2 4 4 Std.,
  'Leather Scale': 3 3 5 5 Std.,
  'Metal Scale': 4 4 7 7 Std.,
  'Chain Mail': 6 4 9 6 Exp.,
}


weapons = {
  Melee Weapons Table
  Ability Init Atk Dfn Dam Str Load Cost,
  Dodge Brawl 0 n/a 0 n/a n/a 0 n/a,
  Fist Brawl 0 0 0 0 n/a 0 n/a,
  Kick Brawl –1 0 –1 +3 n/a 0 n/a,
  Gauntlet Brawl 0 0 +1 +2 –3 0 Inexp.,
  Bludgeon* Brawl 0 +2 0 +2 –2 1 Inexp.,
  Dagger Brawl 0 +2 0 +3 –3 0 Inexp.,
  Knife Brawl 0 +1 0 +2 –6 0 Inexp.,
  Axe Single +1 +4 0 +6 0 1 Std.,
  Club Single +1 +2 +1 +3 –2 1 Inexp.,
  Hatchet Single 0 +3 0 +4 –2 1 Inexp.,
  Lance Single +2 +4 0 +5 0 2 Std.,
  Mace** Single +1 +3 0 +8 0 2 Std.,
  Mace and Chain Single +2 +3 0 +7 0 2 Std.,
  Spear, Short Single +2 +2 0 +5 –1 1 Inexp.,
  Sword, Short Single +1 +3 +1 +5 –1 1 Std.,
  Sword, Long Single +2 +4 +1 +6 0 1 Exp.,
  Shield, Buckler Single 0 0 +1 0 –2 1 Std.,
  Shield, Round Single 0 0 +2 0 –1 2 Inexp.,
  Shield, Heater Single 0 0 +3 0 0 2 Std.,
  Cudgel Great +1 +4 +1 +7 +1 2 Inexp.,
  Farm Implement Great +1 +3 +1 +5 0 2 Inexp.,
  Flail Great +1 +3 +1 +8 0 2 Inexp.,
  Pole Arm Great +3 +4 +1 +8 0 2 Std.,
  Pole Axe Great +1 +5 0 +11 +1 2 Std.,
  Spear, Long*** Great +3 +3 +1 +7 0 3 Inexp.,
  Sword, Great Great +2 +5 +2 +9 +1 2 Exp.,
  Staff Great +2 +3 +3 +2 –1 2 Inexp.,
  Warhammer Great 0 +6 0 +12 +2 3 Std.,
}
// * Any improvised bashing weapon such as a rock or hand tool
// ** Includes spiked clubs, military hammers, and other bashing weapons
// *** Includes the lance, if used dismounted.
// Ability: The Weapon Ability needed to use this weapon.
// Init: The modifier to Initiative.
// Atk: The modifier to Attack.
// Dfn: The modifier to Defense.
// Dam: The modifier to Damage.
// Str: The minimum strength score needed to use the weapon. The minimum strength
// requirements for a weapon and a shield must be met separately.
// Load: The contribution that the weapon makes to Encumbrance (page 178).
// Cost: A general indication of the cost of the weapon. More expensive weapons are better


Axe, Throwing Thrown 0 +2 0 +6 5 0 1 Std.
Javelin Thrown 0 +2 0 +5 10 0 1 Std.
Knife Thrown 0 +1 0 +2 5 –2 0 Inexp.
Sling* Thrown –3 +1 0 +4 20 –3 0 Inexp.
Stone Thrown 0 +1 0 +2 5 –1 1 Inexp.
Bow, Long* Bow –2 +4 0 +8 30 +2 2 Exp.
Bow, Short* Bow –1 +3 0 +6 15 –1 2 Std.
// * Requires two free hands to load and fire.
// Ability: The Weapon Ability needed to use this weapon.
// Init: The modifier to Initiative.
// Atk: The modifier to Attack.
// Dfn: The modifier to Defense.
// Dam: The modifier to Damage.
// Range: The range increment for the weapon, in paces.
// Str: The minimum strength score needed to use the weapon. The minimum strength
// requirements for a weapon and a shield must be met separately.
// Load: The contribution that the weapon makes to Encumbrance (page 178). For bows and
// the sling, this includes the load of appropriate ammunition.
// Cost: A general indication of the cost of the weapon. More expensive weapons are better.

var penelty = {
  Light: –1,
  Medium: –3,
  Heavy: –5,
  Incapacitated: 'The character may not undertake any actions'
}

var woundRecovery = {
  Wound Level Interval Stable Ease Factor Improvement Ease Factor
  Light One week 4 10
  Medium One month 6 12
  Heavy One season 9 15
  Incapacitated See below
}