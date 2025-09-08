import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { CardTemplate as CardTemplateType } from '@/lib/data';

interface CardTemplateProps {
  template: CardTemplateType;
}

export default function CardTemplate({ template }: CardTemplateProps) {
  return (
    <Link href={`/cards/${template.id}/create`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
        <CardContent className="p-0">
          <Image
            src={template.imageUrl}
            data-ai-hint={template.aiHint}
            alt={template.title}
            width={400}
            height={500}
            className="aspect-[4/5] w-full object-cover"
          />
          <div className="p-4">
            <h3 className="font-bold font-headline">{template.title}</h3>
            <p className="text-sm text-muted-foreground">{template.occasion}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
