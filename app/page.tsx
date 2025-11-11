import RegisterBookFormScreen from "./register-book/register-screen";

export default function Home() {
  return (
    <div className="flex flex-col gap-5 min-h-screen items-center justify-center font-sans bg-white">
      <h1 className="text-4xl font-bold text-zinc-800">
        My Book Shelf
      </h1>
      <RegisterBookFormScreen />
    </div>
  );
}
