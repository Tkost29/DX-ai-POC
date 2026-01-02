import "./globals.css";
import { Sidebar } from "../components/Sidebar";
import { AppProvider } from "../lib/store";

export const metadata = {
  title: "Sky DX PoC",
  description: "社内情報横断AI要約・意思決定支援（プロトタイプ）",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <AppProvider>
          <div className="shell">
            <Sidebar />
            <main className="main">{children}</main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
