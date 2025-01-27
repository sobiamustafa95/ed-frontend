import { Typography } from '@/components/Typography';
import { cn } from '@/lib/utils';
import { useSidebarContext } from '@/provider/SidebarProvider';

export interface IOptionText {
  name: string;
  selected?: boolean;
  className?: string;
}

const OptionText = ({ name, selected, className }: IOptionText) => {
  const { sidebarExpand } = useSidebarContext();
  if (!sidebarExpand) {
    return null;
  }

  return (
    <Typography
      className={cn(
        'font-normal capitalize hover:text-white',
        {
          'text-white': selected,
        },
        className,
      )}
    >
      {name}
    </Typography>
  );
};

export default OptionText;
