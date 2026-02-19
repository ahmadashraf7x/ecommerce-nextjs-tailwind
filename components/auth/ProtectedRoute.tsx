import { useSelector } from "react-redux";
 import { useRouter, usePathname } from "next/navigation";
  import { useEffect } from "react"; 
  import type { RootState } from "store-redux";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user) {
      router.push(`/auth?redirect=${pathname}`);
    }
  }, [user, router, pathname]);

  if (!user) return null;

  return <>{children}</>;
}
