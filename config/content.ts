interface Content {
  personalMessage: string;
  music: {
    title: string;
    subtitle: string;
    songs: {
      id: string;
      title: string;
      artist: string;
      videoId: string;
      thumbnail: string;
      isSpecial: boolean;
      specialBadge?: string;
      duration: string;
      year: number;
      genre: string;
    }[];
  };
  moments: {
    title: string;
    subtitle: string;
    photos: {
      id: number;
      src: string;
      caption: string;
      date: string;
      location: string;
    }[];
  };
  gifts: {
    title: string;
    subtitle: string;
    items: {
      id: string;
      title: string;
      icon: string;
      revealContent: string;
      color: string;
      emoji: string;
    }[];
  };
  reasons: {
    title: string;
    subtitle: string;
    items: string[];
  };
  ending: {
    title: string;
    message: string;
    finalWords: string;
  };
  credits: {
    title: string;
    items: {
      label: string;
      value: string;
      isItalic?: boolean;
    }[];
    footer: string;
  };
  branding: {
    giftTitle: string;
    giftSubtitle: string;
    authorName: string;
    authorEmoji: string;
  };
}

export const content: Content = {
  personalMessage: `I wish I could spoil you with everything you deserve today, but life has me saving every little bit right now.

So instead, I made something with my time.

It isn't expensive, but it was made with love.

Thank you for being patient with me.

Thank you for making ordinary days special.

Happy Girlfriend's Day.

I love you.`,

  music: {
    title: "🎵 Soundtrack To This Little Adventure",
    subtitle: "A playlist made just for you",
    songs: [
      {
        id: "her",
        title: "her",
        artist: "JVKE",
        videoId: "f5-IY_Ja1RM",
        thumbnail: "https://img.youtube.com/vi/f5-IY_Ja1RM/mqdefault.jpg",
        isSpecial: true,
        specialBadge: "One I think you'll love ❤️",
        duration: "3:00",
        year: 2024,
        genre: "Pop"
      },
      {
        id: "sweater-weather",
        title: "Sweater Weather",
        artist: "The Neighbourhood",
        videoId: "GCdwKhTtNNw",
        thumbnail: "https://img.youtube.com/vi/GCdwKhTtNNw/mqdefault.jpg",
        isSpecial: false,
        duration: "4:00",
        year: 2013,
        genre: "Indie Pop"
      },
      {
        id: "sailor-song",
        title: "Sailor Song",
        artist: "Gigi Perez",
        videoId: "KZGWfHdfWQs",
        thumbnail: "https://img.youtube.com/vi/KZGWfHdfWQs/mqdefault.jpg",
        isSpecial: false,
        duration: "3:31",
        year: 2024,
        genre: "Indie Pop"
      }
    ]
  },

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

  ending: {
    title: "A Love Letter",
    message: `Thank you for loving me through every season.

Life isn't always perfect...

But one thing I'll always know is how much you mean to me.`,
    finalWords: "I love you ❤️"
  },

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

  branding: {
    giftTitle: "Happy Girlfriend's Day",
    giftSubtitle: "A digital storybook of memories, music, and surprises",
    authorName: "Your Man",
    authorEmoji: "❤️"
  }
}
