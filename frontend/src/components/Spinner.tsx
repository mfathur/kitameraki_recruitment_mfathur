type Props = {
  className?: string;
};

const Spinner = ({ className }: Props) => {
  return (
    <div
      className={`border-gray-300 h-8 w-8 animate-spin rounded-full border-4 border-t-blue-500 ${className}`}
    />
  );
};

export default Spinner;
