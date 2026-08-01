// ✨ All editable content lives here
// This is the heart of your gift - customize everything below

export interface Song {
  id: string
  title: string
  artist: string
  videoId: string
  thumbnail: string
  isSpecial: boolean
  specialBadge?: string
  duration?: string
  year?: number
  genre?: string
}

export interface Photo {
  id: number
  src: string
  caption: string
  date?: string
  location?: string
}

export interface Gift {
  id: string
  title: string
  icon: string
  revealContent: string
  color?: string
  emoji?: string
}

export interface Credit {
  label: string
  value: string
  isItalic?: boolean
}

export interface Content {
  personalMessage: string
  music: {
    title: string
    subtitle: string
    songs: Song[]
  }
  moments: {
    title: string
    subtitle: string
    photos: Photo[]
  }
  gifts: {
    title: string
    subtitle: string
    items: Gift[]
  }
  reasons: {
    title: string
    subtitle: string
    items: string[]
  }
  ending: {
    title?: string
    message: string
    finalWords: string
  }
  credits: {
    title: string
    items: Credit[]
    footer: string
  }
  branding: {
    giftTitle: string
    giftSubtitle: string
    authorName: string
    authorEmoji: string
  }
}

export const content: Content = {
  // 💌 Personal Message - The heart of the experience
  personalMessage: `I wish I could spoil you with everything you deserve today, but life has me saving every little bit right now.

So instead, I made something with my time.

It isn't expensive, but it was made with love.

Thank you for being patient with me.

Thank you for making ordinary days special.

Happy Girlfriend's Day.

I love you.`,

  // 🎵 Music Section - The soundtrack to your story
  music: {
    title: "🎵 Soundtrack To This Little Adventure",
    subtitle: "A playlist made just for you",
    songs: [
      {
        id: "perfect",
        title: "Perfect",
        artist: "Ed Sheeran",
        videoId: "f5-IY_Ja1RM",
        thumbnail: "https://img.youtube.com/vi/f5-IY_Ja1RM/mqdefault.jpg",
        isSpecial: true,
        specialBadge: "One I think you'll love ❤️",
        duration: "4:23",
        year: 2017,
        genre: "Pop"
      },
      {
        id: "all-of-me",
        title: "All of Me",
        artist: "John Legend",
        videoId: "KZGWfHdfWQs",
        thumbnail: "https://img.youtube.com/vi/KZGWfHdfWQs/mqdefault.jpg",
        isSpecial: false,
        duration: "4:29",
        year: 2013,
        genre: "R&B"
      },
      {
        id: "thinking-out-loud",
        title: "Thinking Out Loud",
        artist: "Ed Sheeran",
        videoId: "GCdwKhTtNNw",
        thumbnail: "https://img.youtube.com/vi/GCdwKhTtNNw/mqdefault.jpg",
        isSpecial: false,
        duration: "4:41",
        year: 2014,
        genre: "Pop"
      }
    ]
  },

  // 📸 Moments Section - Captured memories
  moments: {
    title: "✨ Moments I Fell In Love With You",
    subtitle: "A collection of my favorite memories",
    photos: [
      {
        id: 1,
        src: "https://res.cloudinary.com/dfsvnaslv/image/upload/v1785578559/file_0000000073fc71f48c68c57d7f98df41_j1etrz.png",
        caption: "That smile.",
        date: "Summer 2025",
        location: "📍 Our first date"
      },
      {
        id: 2,
        src: "https://res.cloudinary.com/dfsvnaslv/image/upload/v1785578559/file_00000000709871f8bf88c7be726d25e2_xs3avv.png",
        caption: "My favorite person.",
        date: "Spring 2025",
        location: "📍 City lights"
      },
      {
        id: 3,
        src: "https://res.cloudinary.com/dfsvnaslv/image/upload/v1785578567/IMG_20260531_161009_luw1pp.jpg",
        caption: "One of my favorite moments.",
        date: "May 2025",
        location: "📍 Sunset walk"
      },
      {
        id: 4,
        src: "https://res.cloudinary.com/dfsvnaslv/image/upload/v1785578642/file_00000000eb6871f48455947c5e60b387_obaqvb.png",
        caption: "You make everything brighter.",
        date: "Winter 2025",
        location: "📍 Cozy cafe"
      },
      {
        id: 5,
        src: "https://res.cloudinary.com/dfsvnaslv/image/upload/v1785578559/file_00000000c0a071f88af3567cae64b91e_ylblji.png",
        caption: "My favorite view.",
        date: "Fall 2025",
        location: "📍 Nature escape"
      }
    ]
  },

  // 🎁 Gifts Section - Surprises waiting to be opened
  gifts: {
    title: "🎁 Your Gifts Are Waiting",
    subtitle: "Tap to unwrap each surprise",
    items: [
      {
        id: "future-date",
        title: "Future Shopping Date",
        icon: "🛍️",
        revealContent: "On this date, you get to choose something you've always wanted, and I will buy it for you.",
        color: "from-rose-400 to-pink-500",
        emoji: "💝"
      },
      {
        id: "snack-bouquet",
        title: "Snack Bouquet",
        icon: "🍫",
        revealContent: "This coupon can be redeemed for a giant snack bouquet filled with your favorite chocolates, sweets, drinks, and treats.",
        color: "from-amber-400 to-orange-500",
        emoji: "🧁"
      },
      {
        id: "yes-day",
        title: "Yes Day Coupon",
        icon: "💗",
        revealContent: "For one whole day, your answer is automatically YES. Today is your day.",
        color: "from-purple-400 to-pink-500",
        emoji: "✨"
      }
    ]
  },

  // 💕 Reasons Section - Why I love you
  reasons: {
    title: "💕 Reasons I Love You",
    subtitle: "Tap each card to see the reason",
    items: [
      "Your smile",
      "Your kindness",
      "Your laugh",
      "Your heart",
      "The way you care",
      "The way you support me",
      "Your strength",
      "Your beauty"
    ]
  },

  // 🌅 Ending Scene - The final message
  ending: {
    title: "A Love Letter",
    message: `Thank you for loving me through every season.

Life isn't always perfect...

But one thing I'll always know is how much you mean to me.`,
    finalWords: "I love you ❤️"
  },

  // 🎬 Credits - Movie-style ending
  credits: {
    title: "❤️ The End ❤️",
    items: [
      { label: "Directed by", value: "Your Man ❤️" },
      { label: "", value: "Created with love.", isItalic: true },
      { label: "Produced for", value: "The most amazing girl." },
      { label: "Special thanks", value: "For making life brighter." }
    ],
    footer: "Made with love • 2025"
  },

  // 🏷️ Branding - Your personal touch
  branding: {
    giftTitle: "Happy Girlfriend's Day",
    giftSubtitle: "A digital storybook of memories, music, and surprises",
    authorName: "Your Man",
    authorEmoji: "❤️"
  }
}

// Helper function to get all photo URLs
export const getPhotoUrls = () => content.moments.photos.map(p => p.src)

// Helper function to get all song video IDs
export const getVideoIds = () => content.music.songs.map(s => s.videoId)

// Helper function to get special song
export const getSpecialSong = () => content.music.songs.find(s => s.isSpecial)

// Helper function to get total gifts count
export const getGiftsCount = () => content.gifts.items.length

// Helper function to get total photos count
export const getPhotosCount = () => content.moments.photos.length

// Export type for component usage
export type SongType = typeof content.music.songs[0]
export type PhotoType = typeof content.moments.photos[0]
export type GiftType = typeof content.gifts.items[0]
