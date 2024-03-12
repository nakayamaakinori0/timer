export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <header>
      <div>
        <h1>Timer</h1>
        {children}
      </div>
    </header>
  );
}
