import { useEffect, useId, useState } from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import useTheme from '@/hooks/useTheme';

export default function ThemeToggle() {
  const id = useId();
  const [checked, setChecked] = useState<boolean>(true);
  const { setTheme } = useTheme();

  // Apply theme when checked changes
  useEffect(() => {
    setTheme(checked ? 'dark' : 'light');
  }, [checked, setTheme]);

  return (
    <div className="inline-flex items-center gap-2">
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={setChecked}
        aria-label="Toggle switch"
        className="bg-amber-950"
      />
      <Label htmlFor={id}>
        <span className="sr-only">Toggle switch</span>
        {checked ? (
          <SunIcon size={20} aria-hidden="true" />
        ) : (
          <MoonIcon size={20} aria-hidden="true" />
        )}
      </Label>
    </div>
  );
}
