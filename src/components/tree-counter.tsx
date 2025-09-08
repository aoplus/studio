'use client';

import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Leaf } from 'lucide-react';

interface TreeCounterProps {
  count: number;
}

export default function TreeCounter({ count }: TreeCounterProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar on component mount
    const timer = setTimeout(() => setProgress((count / 2000) * 100), 500);
    return () => clearTimeout(timer);
  }, [count]);

  return (
    <div className="mt-4 space-y-3">
        <div className="flex items-center gap-2 text-lg font-medium">
            <Leaf className="w-5 h-5 text-primary" />
            <span>{count.toLocaleString()} Trees Planted</span>
        </div>
      <Progress value={progress} className="w-full h-3" />
      <p className="text-sm text-muted-foreground">Help us reach our goal of 2,000 trees this quarter!</p>
    </div>
  );
}
