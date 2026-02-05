'use client';
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/authStore";

export default function Header() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const loadFromStorage = useAuthStore((s) => s.loadFromStorage);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="border-b-2 border-pink-200 bg-gradient-to-r from-white to-pink-50 shadow-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href={user ? "/home" : "/"} className="font-bold text-2xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2 hover:scale-105 transition-transform">
          <span className="text-3xl">🎓</span>
          Exam Web
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          {user ? (
            <>
              <Link href="/home" className="px-3 py-1.5 rounded-lg hover:bg-pink-100 transition-colors font-medium text-gray-700 hover:text-pink-600">
                🏠 Trang chủ
              </Link>
              {user.role === 'teacher' && (
                <Link href="/exams/create" className="px-3 py-1.5 rounded-lg hover:bg-purple-100 transition-colors font-medium text-gray-700 hover:text-purple-600">
                  📝 Tạo đề
                </Link>
              )}
              <Link href="/exams/take" className="px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors font-medium text-gray-700 hover:text-emerald-600">
                ✏️ Làm đề
              </Link>
              <div className="flex items-center gap-3 pl-4 border-l-2 border-pink-200">
                <span className="text-gray-700 font-medium">
                  👤 {user.full_name || user.username}
                </span>
                <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full font-medium">
                  {user.role === 'teacher' ? '👨‍🏫 Giáo viên' : '👨‍🎓 Học sinh'}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-red-400 to-pink-500 rounded-lg hover:from-red-500 hover:to-pink-600 shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                >
                  🚪 Đăng xuất
                </button>
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 text-white font-medium hover:from-blue-500 hover:to-blue-700 shadow-md hover:shadow-lg transition-all transform hover:scale-105">
                🔑 Đăng nhập
              </Link>
              <Link href="/register" className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-400 to-pink-600 text-white font-medium hover:from-purple-500 hover:to-pink-700 shadow-md hover:shadow-lg transition-all transform hover:scale-105">
                ✨ Đăng ký
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
