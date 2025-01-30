export function Card({ className, ...props }) {
  return (
    <div 
      className={`rounded-xl border bg-card shadow ${className}`}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }) {
  return (
    <div 
      className={`p-6 pt-0 ${className}`}
      {...props}
    />
  );
}