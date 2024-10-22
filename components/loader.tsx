function Loader() {
  return (
    <div className="mb-4 text-right">
      <div className="inline-block  p-2 rounded-lg bg-muted">
      <div className="flex space-x-1 justify-start"> {/* justify-start siirtää pisteet vasemmalle bubblen sisällä */}
          <span
            className="w-2 h-2 rounded-full bg-current animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></span>
          <span
            className="w-2 h-2 rounded-full bg-current animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></span>
          <span
            className="w-2 h-2 rounded-full bg-current animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></span>
        </div>
      </div>
    </div>
  );
}
export default Loader;
