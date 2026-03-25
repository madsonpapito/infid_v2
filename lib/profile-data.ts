
export const MALE_NAMES = [
    "James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Charles",
    "Daniel", "Matthew", "Anthony", "Donald", "Mark", "Paul", "Steven", "Andrew", "Kenneth", "Joshua",
    "Kevin", "Brian", "George", "Edward", "Ronald", "Timothy", "Jason", "Jeffrey", "Ryan", "Jacob"
];

export const FEMALE_NAMES = [
    "Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen",
    "Nancy", "Lisa", "Betty", "Margaret", "Sandra", "Ashley", "Kimberly", "Emily", "Donna", "Michelle",
    "Dorothy", "Carol", "Amanda", "Melissa", "Deborah", "Stephanie", "Rebecca", "Sharon", "Laura", "Cynthia"
];

export const MALE_BIOS = [
    "Here for a good time, not a long time.",
    "Just got out of a relationship.",
    "Looking for discreet fun.",
    "Gym, Work, Sleep, Repeat.",
    "Not looking for anything serious.",
    "Let's grab a drink and see what happens.",
    "Adventure seeker.",
    "Entrepreneur. Always busy.",
    "Message me if you want to know more.",
    "Swipe right if you're fun."
];

export const FEMALE_BIOS = [
    "Just having fun.",
    "Looking for a generous man.",
    "No strings attached.",
    "Secretly here.",
    "Don't tell anyone.",
    "Wine lover 🍷",
    "Travel addict ✈️",
    "Here for the vibes.",
    "Not looking for a pen pal.",
    "Make me laugh and I'm yours."
];

export const ZODIACS = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

export const INTERESTS = [
    "Travel", "Music", "Sushi", "Gym", "Hiking", "Movies", "Photography", "Art", "Coffee", "Wine", "Dancing", "Reading", "Cooking", "Yoga", "Surfing"
];

export function getRandomProfile(gender: 'male' | 'female', index: number, overriddenName?: string) {
    const names = gender === 'male' ? MALE_NAMES : FEMALE_NAMES;
    const bios = gender === 'male' ? MALE_BIOS : FEMALE_BIOS;

    // Use explicit index mod length to ensure we cycle through but randomize locally if needed
    // Or just pure random? Pure random is better for "random system".
    // Use overridden name if provided, otherwise use explicit index
    const name = overriddenName || names[index % names.length];
    const bio = bios[Math.floor(Math.random() * bios.length)];
    const age = Math.floor(Math.random() * (35 - 19 + 1)) + 19;
    const zodiac = ZODIACS[Math.floor(Math.random() * ZODIACS.length)];
    const distance = Math.floor(Math.random() * 15) + 1;

    // Get 2 random interests
    const i1 = INTERESTS[Math.floor(Math.random() * INTERESTS.length)];
    let i2 = INTERESTS[Math.floor(Math.random() * INTERESTS.length)];
    while (i2 === i1) i2 = INTERESTS[Math.floor(Math.random() * INTERESTS.length)];

    // Avatar path construction
    // We know we have 1.jpg to 6.jpg (approx) in the folders based on earlier check.
    // Actually we have 1-6. Let's assume 1-6 safe range.
    const avatarId = (index % 6) + 1;
    // Folders are physically swapped on disk:
    // /images/female contains MALE photos
    // /images/male contains FEMALE photos
    const genderFolder = gender === 'male' ? 'female' : 'male';

    return {
        name,
        age,
        bio,
        zodiac,
        distance: `${distance} km`,
        interests: [i1, i2],
        avatar: `/images/${genderFolder}/tinder/${avatarId}.jpg`,
        verified: Math.random() > 0.3, // 70% chance verified
        identity: gender === 'male' ? "Man" : "Woman",
        lastSeen: Math.random() > 0.5 ? `${Math.floor(Math.random() * 10) + 1}h ago` : "Online"
    };
}
