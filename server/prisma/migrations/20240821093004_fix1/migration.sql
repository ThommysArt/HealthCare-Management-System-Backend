-- AlterTable
ALTER TABLE "User" ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "lastLogin" SET DEFAULT CURRENT_TIMESTAMP;
