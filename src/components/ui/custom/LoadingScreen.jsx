import { Loader2 } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <Loader2 className="h-10 w-10 animate-spin text-gray-600" />
    </div>
  );
}
