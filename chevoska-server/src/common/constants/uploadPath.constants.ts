import * as path from "path";

export class UploadPath {
  static globalUsersStoragePath = path.join(
    process.env.STORAGE_DIR ||
      path.join(__dirname, "..", "..", "..", "public/"),
    "uploads/users"
  );
  static localUsersStoragePath = "uploads/users";

  static globalStreamsStoragePath = path.join(
    process.env.STORAGE_DIR ||
      path.join(__dirname, "..", "..", "..", "public/"),
    "uploads/streams"
  );
  static localStreamsStoragePath = "uploads/streams";
}

/*dev:
      - /var/ovp/uploads:/usr/src/app/public/uploads
      - STORAGE_DIR=/var/ovp
prod:
      - /var/ovp/uploads:/usr/src/app/public/uploads
      - STORAGE_DIR=/usr/src/app/public/*/
