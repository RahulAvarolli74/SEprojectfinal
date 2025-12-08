import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from './Button';
import Card from './Card';

const ErrorState = ({ 
  title = 'Something went wrong',
  message = 'An error occurred while loading this content.',
  onRetry,
}) => {
  return (
    <Card className="p-12 text-center">
      <div className="p-4 bg-red-500/20 rounded-full w-fit mx-auto mb-4">
        <AlertTriangle className="w-8 h-8 text-red-400" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">
        {title}
      </h3>
      <p className="text-slate-400 mb-6 max-w-md mx-auto">
        {message}
      </p>
      {onRetry && (
        <Button onClick={onRetry} icon={RefreshCw}>
          Try Again
        </Button>
      )}
    </Card>
  );
};

export default ErrorState;
