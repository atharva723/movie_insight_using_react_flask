export function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-semibold mb-3">Support</h3>
          <p className="text-white/70">support@yourapp.com</p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <p className="text-white/70">contact@yourapp.com</p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">About</h3>
          <p className="text-white/70">
            AI-powered movie discovery platform.
          </p>
        </div>
      </div>

      <p className="text-center text-white/40 mt-12 text-sm">
        © {new Date().getFullYear()} Movie Insight
      </p>
    </footer>
  );
}
