export default function Spinner({ size = 16 ,className = "" }) {
  return (
    <div className="flex items-center justify-center ">
      <div
        className={`border-4 border-blue-600 border-t-transparent rounded-full animate-spin ${className}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderWidth: `${size / 8}px`,
        }}
      ></div>
    </div>
  );
}
