export default function GradientTitle({
  text,
  gradient = "from-sky-500 via-indigo-500 to-fuchsia-500"
}: {
  text: string;
  gradient?: string;
}) {
  return (
    <h1 className="text-3xl md:text-5xl font-extrabold text-center leading-tight">
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className={
            i % 2 === 0
              ? "text-gray-900 dark:text-slate-50"
              : `bg-gradient-to-r ${gradient} text-transparent bg-clip-text`
          }
        >
          {word + " "}
        </span>
      ))}
    </h1>
  );
}
