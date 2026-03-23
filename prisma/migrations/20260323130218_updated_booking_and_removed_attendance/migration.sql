/*
  Warnings:

  - You are about to drop the `EventAttendance` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[bookingCode]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bookingCode` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketsCount` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `EventAttendance` DROP FOREIGN KEY `EventAttendance_eventId_fkey`;

-- DropForeignKey
ALTER TABLE `EventAttendance` DROP FOREIGN KEY `EventAttendance_userId_fkey`;

-- AlterTable
ALTER TABLE `Booking` ADD COLUMN `bookingCode` VARCHAR(191) NOT NULL,
    ADD COLUMN `ticketsCount` INTEGER NOT NULL;

-- DropTable
DROP TABLE `EventAttendance`;

-- CreateIndex
CREATE UNIQUE INDEX `Booking_bookingCode_key` ON `Booking`(`bookingCode`);
