export interface CardTemplate {
  id: string;
  title: string;
  imageUrl: string;
  occasion: 'Birthday' | 'Thank You' | 'Farewell' | 'Congratulations' | 'Other';
  aiHint: string;
}

export interface Message {
  id: string;
  author: string;
  avatarUrl: string;
  text: string;
}

export interface CardData {
  slug: string;
  template: CardTemplate;
  recipientName: string;
  senderNote: string;
  messages: Message[];
}

export const cardTemplates: CardTemplate[] = [
  { id: '1', title: 'Floral Birthday', occasion: 'Birthday', imageUrl: 'https://picsum.photos/400/500', aiHint: 'birthday flowers' },
  { id: '2', title: 'Modern Thank You', occasion: 'Thank You', imageUrl: 'https://picsum.photos/400/501', aiHint: 'modern abstract' },
  { id: '3', title: 'Adventure Awaits', occasion: 'Farewell', imageUrl: 'https://picsum.photos/400/502', aiHint: 'mountain landscape' },
  { id: '4', title: 'Golden Confetti', occasion: 'Congratulations', imageUrl: 'https://picsum.photos/400/503', aiHint: 'gold confetti' },
  { id: '5', title: 'Simple Celebration', occasion: 'Birthday', imageUrl: 'https://picsum.photos/400/504', aiHint: 'colorful balloons' },
  { id: '6', title: 'Minimalist Gratitude', occasion: 'Thank You', imageUrl: 'https://picsum.photos/400/505', aiHint: 'minimalist design' },
  { id: '7', title: 'Bon Voyage', occasion: 'Farewell', imageUrl: 'https://picsum.photos/400/506', aiHint: 'vintage map' },
  { id: '8', title: 'You Did It!', occasion: 'Congratulations', imageUrl: 'https://picsum.photos/400/507', aiHint: 'fireworks celebration' },
];

export const featuredTemplates = cardTemplates.slice(0, 4);

export const sampleCard: CardData = {
    slug: 'celebrating-alex-123',
    template: cardTemplates[0],
    recipientName: 'Alex',
    senderNote: 'Happy Birthday, Alex! Hope you have a fantastic day. We all wanted to pitch in and send some love your way!',
    messages: [
        { id: 'msg1', author: 'Sarah', avatarUrl: 'https://i.pravatar.cc/150?u=sarah', text: 'Happy birthday Alex! Wishing you all the best.' },
        { id: 'msg2', author: 'Mike', avatarUrl: 'https://i.pravatar.cc/150?u=mike', text: 'Have a great one, Alex! Cheers to another year.' },
        { id: 'msg3', author: 'Chloe', avatarUrl: 'https://i.pravatar.cc/150?u=chloe', text: 'So excited to celebrate with you! Happy Birthday!' },
    ]
};
