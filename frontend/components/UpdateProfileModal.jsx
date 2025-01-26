// const UpdateProfileModal = ({ modalOpen, setModalOpen }) => {
//   return <div>UpdateProfileModal</div>;
// };
// export default UpdateProfileModal;

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

const UpdateProfileModal = ({ modalOpen, setModalOpen }) => {
  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <div>
          {/* Add form fields here */}
          <p className="text-gray-600">Update your profile information.</p>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setModalOpen(false)}>
            Close
          </Button>
          <Button>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileModal;
