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

  static globalStoragePath = path.join(
    process.env.STORAGE_DIR ||
      path.join(__dirname, "..", "..", "..", "public/"),
    "uploads"
  );

  static globalImagesPath = path.join(
    process.env.STORAGE_DIR ||
      path.join(__dirname, "..", "..", "..", "public/"),
    "images"
  );
}
