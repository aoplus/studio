'use client';

import { useState } from 'react';
import { type Message, type CardData } from '@/lib/data';
import SignCardForm from './sign-card-form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

interface MessageListProps {
    initialMessages: Message[];
    recipientName: CardData['recipientName'];
    occasion: CardData['template']['occasion'];
}

export default function MessageList({ initialMessages, recipientName, occasion }: MessageListProps) {
    const [messages, setMessages] = useState<Message[]>(initialMessages);

    const handleAddMessage = (newMessage: Omit<Message, 'id' | 'avatarUrl'>) => {
        const newEntry: Message = {
            ...newMessage,
            id: `msg${messages.length + 1}`,
            avatarUrl: `https://i.pravatar.cc/150?u=${encodeURIComponent(newMessage.author)}`
        };
        setMessages(prev => [...prev, newEntry]);
    };

    return (
        <>
            <div className="space-y-4">
                {messages.map((message) => (
                    <div key={message.id} className="flex items-start gap-4">
                        <Avatar>
                            <AvatarImage src={message.avatarUrl} alt={message.author} />
                            <AvatarFallback>{message.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="font-bold">{message.author}</p>
                            <p className="text-muted-foreground">{message.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            <Card className="mt-8 bg-secondary/40">
                <CardContent className="p-6">
                    <SignCardForm 
                        onAddMessage={handleAddMessage}
                        recipientName={recipientName}
                        occasion={occasion}
                    />
                </CardContent>
            </Card>
        </>
    );
}
