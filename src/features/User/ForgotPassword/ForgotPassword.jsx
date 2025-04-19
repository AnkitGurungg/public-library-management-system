import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ForgotPassword = ({
  isForgotPasswordOpen,
  setIsForgotPasswordOpen,
  setIsOpenLogin,
}) => {
  return (
    <Dialog open={isForgotPasswordOpen} onOpenChange={setIsForgotPasswordOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>

        <p
          className="cursor-pointer"
          onClick={() => {
            setIsOpenLogin(true);
            setIsForgotPasswordOpen(false);
          }}
        >
          Login
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPassword;
