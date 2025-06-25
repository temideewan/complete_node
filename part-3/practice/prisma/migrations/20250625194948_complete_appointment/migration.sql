/*
  Warnings:

  - Added the required column `description` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "avatar" DROP NOT NULL,
ALTER COLUMN "avatar" SET DEFAULT 'http://hancockogundiyapartners.com/wp-content/uploads/2019/07/dummy-profile-pic-300x300.jpg';
