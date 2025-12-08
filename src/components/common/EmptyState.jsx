import { Inbox } from 'lucide-react';
import Card from './Card';

const EmptyState = ({ 
  icon: Icon = Inbox,
  title = 'No data found',
  message = 'There is nothing to display here yet.',
  action,
}) => {
  return (
    <Card className="p-12 text-center">
      <div className="p-4 bg-slate-800/50 rounded-full w-fit mx-auto mb-4">
        <Icon className="w-8 h-8 text-slate-500" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">
        {title}
      </h3>
      <p className="text-slate-400 mb-6 max-w-md mx-auto">
        {message}
      </p>
      {action}
    </Card>
  );
};

export default EmptyState;
