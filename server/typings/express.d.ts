import ModelUser from "../dev/db/models/User";

declare global {
  namespace Express {
    interface User extends ModelUser {}
  }
}
