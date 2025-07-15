import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function ConfirmDialog({ loading, title, action, children }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title} Resume</DialogTitle>
          <DialogDescription>
            Are you sure you want to do this action?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>

          <Button
            className="cursor-pointer"
            type="button"
            variant="default"
            onClick={action}
          >
            {loading ? <Loader2 className="animate-spin" /> : title}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
